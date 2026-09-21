"use client";

import { useEffect, useRef } from "react";

interface ContactGridProps {
  className?: string;
  cellSize?: number;
  maxPulses?: number;
  tone?: "light" | "dark";
}

interface Point {
  x: number;
  y: number;
}

interface Pulse {
  path: Point[];
  segmentIndex: number;
  segmentDistance: number;
  speed: number;
  phase: "spawn" | "travel" | "fade";
  phaseElapsedMilliseconds: number;
  color: string;
}

interface Burst {
  x: number;
  y: number;
  ageMilliseconds: number;
  maximumRadius: number;
}

const SPAWN_DURATION_MILLISECONDS = 260;
const FADE_DURATION_MILLISECONDS = 320;
const BURST_DURATION_MILLISECONDS = 420;
const TRAIL_LENGTH_PIXELS = 140;
const TRAIL_SAMPLE_COUNT = 16;
const HEAD_RADIUS = 3;
const PULSE_PALETTES = {
  light: ["#0052ff", "#1f5eff", "#4d7dff"],
  dark: ["#4d7dff", "#8aaaff", "#b9ccff"],
} as const;

const randomInRange = (minimum: number, maximum: number) =>
  minimum + Math.random() * (maximum - minimum);

const randomInteger = (minimum: number, maximum: number) =>
  Math.floor(randomInRange(minimum, maximum + 1));

const hexToRgbChannels = (hexColor: string) => {
  const colorValue = parseInt(hexColor.slice(1), 16);

  return `${(colorValue >> 16) & 255} ${(colorValue >> 8) & 255} ${colorValue & 255}`;
};

/** Draws animated pulses that travel along the contact section grid. */
export function ContactGrid({
  className,
  cellSize = 48,
  maxPulses = 7,
  tone = "light",
}: ContactGridProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const colors = PULSE_PALETTES[tone];
    const burstColorChannels = hexToRgbChannels(colors[0]);

    let width = 0;
    let height = 0;
    let pixelRatio = 1;
    let animationFrameId = 0;
    let running = false;
    let visible = true;
    let previousFrameTime = 0;
    let spawnDelayRemaining = 400;

    const pulses: Pulse[] = [];
    const bursts: Burst[] = [];

    const resizeCanvas = () => {
      const bounds = canvas.getBoundingClientRect();
      width = Math.max(1, Math.floor(bounds.width));
      height = Math.max(1, Math.floor(bounds.height));
      pixelRatio = Math.min(2, window.devicePixelRatio || 1);
      canvas.width = Math.floor(width * pixelRatio);
      canvas.height = Math.floor(height * pixelRatio);
    };

    const snapToGridStrokeCenter = (gridIndex: number) =>
      gridIndex * cellSize + 0.5;

    const buildPulsePath = (): Point[] => {
      const columnCount = Math.floor(width / cellSize);
      const rowCount = Math.floor(height / cellSize);
      if (columnCount < 3 || rowCount < 3) return [];

      let column = Math.round(
        columnCount * (0.5 + (Math.random() - 0.5) * 0.8),
      );
      let row = Math.round(rowCount * (0.5 + (Math.random() - 0.5) * 0.8));
      const path: Point[] = [
        {
          x: snapToGridStrokeCenter(column),
          y: snapToGridStrokeCenter(row),
        },
      ];

      const segmentCount = randomInteger(2, 5);
      let horizontal = Math.random() < 0.5;

      for (let segmentIndex = 0; segmentIndex < segmentCount; segmentIndex++) {
        const segmentLength = randomInteger(1, 5);

        if (horizontal) {
          const direction =
            column < 2
              ? 1
              : column > columnCount - 2
                ? -1
                : Math.random() < 0.5
                  ? -1
                  : 1;
          column = Math.min(
            columnCount,
            Math.max(0, column + direction * segmentLength),
          );
        } else {
          const direction =
            row < 2
              ? 1
              : row > rowCount - 2
                ? -1
                : Math.random() < 0.5
                  ? -1
                  : 1;
          row = Math.min(
            rowCount,
            Math.max(0, row + direction * segmentLength),
          );
        }

        const nextPoint = {
          x: snapToGridStrokeCenter(column),
          y: snapToGridStrokeCenter(row),
        };
        const previousPoint = path[path.length - 1];

        if (
          nextPoint.x !== previousPoint.x ||
          nextPoint.y !== previousPoint.y
        ) {
          path.push(nextPoint);
        }

        horizontal = !horizontal;
      }

      return path.length > 1 ? path : [];
    };

    const spawnPulse = () => {
      const path = buildPulsePath();
      if (!path.length) return;

      pulses.push({
        path,
        segmentIndex: 0,
        segmentDistance: 0,
        speed: randomInRange(380, 680),
        phase: "spawn",
        phaseElapsedMilliseconds: 0,
        color: colors[randomInteger(0, colors.length - 1)],
      });
    };

    const getSegmentLength = (pulse: Pulse, segmentIndex: number) => {
      const start = pulse.path[segmentIndex];
      const end = pulse.path[segmentIndex + 1];

      return Math.abs(end.x - start.x) + Math.abs(end.y - start.y);
    };

    const getPulseHead = (pulse: Pulse): Point => {
      const start = pulse.path[pulse.segmentIndex];
      const end = pulse.path[pulse.segmentIndex + 1] ?? start;
      const segmentLength =
        getSegmentLength(
          pulse,
          Math.min(pulse.segmentIndex, pulse.path.length - 2),
        ) || 1;
      const progress = Math.min(1, pulse.segmentDistance / segmentLength);

      return {
        x: start.x + (end.x - start.x) * progress,
        y: start.y + (end.y - start.y) * progress,
      };
    };

    const getPulseTrail = (pulse: Pulse, head: Point): Point[] => {
      const points: Point[] = [head];
      let remainingLength = TRAIL_LENGTH_PIXELS;
      let currentPosition = head;

      for (
        let pathIndex = pulse.segmentIndex;
        pathIndex >= 0 && remainingLength > 0;
        pathIndex--
      ) {
        const segmentStart = pulse.path[pathIndex];
        const distance =
          Math.abs(currentPosition.x - segmentStart.x) +
          Math.abs(currentPosition.y - segmentStart.y);

        if (distance >= remainingLength) {
          const progress = remainingLength / distance;

          points.push({
            x:
              currentPosition.x +
              (segmentStart.x - currentPosition.x) * progress,
            y:
              currentPosition.y +
              (segmentStart.y - currentPosition.y) * progress,
          });
          break;
        }

        points.push(segmentStart);
        remainingLength -= distance;
        currentPosition = segmentStart;
      }

      return points;
    };

    const resamplePath = (points: Point[], sampleCount: number): Point[] => {
      const segmentLengths: number[] = [];
      let totalLength = 0;

      for (let index = 0; index < points.length - 1; index++) {
        const distance =
          Math.abs(points[index + 1].x - points[index].x) +
          Math.abs(points[index + 1].y - points[index].y);

        segmentLengths.push(distance);
        totalLength += distance;
      }

      if (totalLength === 0) return [points[0]];

      const sampledPoints: Point[] = [points[0]];
      let targetDistance = totalLength / sampleCount;
      let traversedDistance = 0;

      for (let index = 0; index < segmentLengths.length; index++) {
        while (
          targetDistance <= traversedDistance + segmentLengths[index] &&
          sampledPoints.length < sampleCount
        ) {
          const progress =
            (targetDistance - traversedDistance) / (segmentLengths[index] || 1);

          sampledPoints.push({
            x:
              points[index].x +
              (points[index + 1].x - points[index].x) * progress,
            y:
              points[index].y +
              (points[index + 1].y - points[index].y) * progress,
          });
          targetDistance += totalLength / sampleCount;
        }

        traversedDistance += segmentLengths[index];
      }

      sampledPoints.push(points[points.length - 1]);

      return sampledPoints;
    };

    const drawPulse = (pulse: Pulse) => {
      const head = getPulseHead(pulse);
      const colorChannels = hexToRgbChannels(pulse.color);
      let opacity = 1;
      let headRadius = HEAD_RADIUS;

      if (pulse.phase === "spawn") {
        const progress = Math.min(
          1,
          pulse.phaseElapsedMilliseconds / SPAWN_DURATION_MILLISECONDS,
        );
        opacity = progress;
        headRadius = 0.8 + (HEAD_RADIUS - 0.8) * progress;

        context.beginPath();
        context.arc(head.x, head.y, 2 + 10 * progress, 0, Math.PI * 2);
        context.strokeStyle = `rgb(${colorChannels} / ${(
          0.7 *
          (1 - progress)
        ).toFixed(3)})`;
        context.lineWidth = 1.4;
        context.stroke();
      } else if (pulse.phase === "fade") {
        const progress = Math.min(
          1,
          pulse.phaseElapsedMilliseconds / FADE_DURATION_MILLISECONDS,
        );
        opacity = 1 - progress;
        headRadius = HEAD_RADIUS * (1 - progress * 0.6);
      }

      const trail = resamplePath(
        getPulseTrail(pulse, head),
        TRAIL_SAMPLE_COUNT,
      );

      for (let index = 0; index < trail.length - 1; index++) {
        const trailOpacity = 1 - index / (trail.length - 1);

        context.beginPath();
        context.moveTo(trail[index].x, trail[index].y);
        context.lineTo(trail[index + 1].x, trail[index + 1].y);
        context.strokeStyle = `rgb(${colorChannels} / ${(
          opacity *
          0.95 *
          trailOpacity *
          trailOpacity
        ).toFixed(3)})`;
        context.lineWidth = 1 + 1.8 * trailOpacity;
        context.lineCap = index === trail.length - 2 ? "round" : "butt";
        context.stroke();
      }

      const glowRadius = headRadius * 5;
      const glowGradient = context.createRadialGradient(
        head.x,
        head.y,
        0,
        head.x,
        head.y,
        glowRadius,
      );
      glowGradient.addColorStop(
        0,
        `rgb(${colorChannels} / ${(0.55 * opacity).toFixed(3)})`,
      );
      glowGradient.addColorStop(1, `rgb(${colorChannels} / 0)`);
      context.fillStyle = glowGradient;
      context.beginPath();
      context.arc(head.x, head.y, glowRadius, 0, Math.PI * 2);
      context.fill();

      context.beginPath();
      context.arc(head.x, head.y, headRadius, 0, Math.PI * 2);
      context.fillStyle = `rgb(${colorChannels} / ${opacity.toFixed(3)})`;
      context.fill();
    };

    const drawBurst = (burst: Burst) => {
      const progress = Math.min(
        1,
        burst.ageMilliseconds / BURST_DURATION_MILLISECONDS,
      );
      const easedProgress = 1 - (1 - progress) * (1 - progress);

      context.beginPath();
      context.arc(
        burst.x,
        burst.y,
        1.5 + burst.maximumRadius * easedProgress,
        0,
        Math.PI * 2,
      );
      context.strokeStyle = `rgb(${burstColorChannels} / ${(
        0.6 *
        (1 - progress)
      ).toFixed(3)})`;
      context.lineWidth = 1.2;
      context.stroke();
    };

    const advancePulse = (pulse: Pulse, elapsedMilliseconds: number) => {
      pulse.phaseElapsedMilliseconds += elapsedMilliseconds;

      if (pulse.phase === "spawn") {
        if (pulse.phaseElapsedMilliseconds >= SPAWN_DURATION_MILLISECONDS) {
          pulse.phase = "travel";
          pulse.phaseElapsedMilliseconds = 0;
        }

        return true;
      }

      if (pulse.phase === "fade") {
        return pulse.phaseElapsedMilliseconds < FADE_DURATION_MILLISECONDS;
      }

      let remainingDistance = (pulse.speed * elapsedMilliseconds) / 1000;

      while (remainingDistance > 0) {
        const segmentLength = getSegmentLength(pulse, pulse.segmentIndex);
        const segmentDistanceRemaining = segmentLength - pulse.segmentDistance;

        if (remainingDistance < segmentDistanceRemaining) {
          pulse.segmentDistance += remainingDistance;
          remainingDistance = 0;
        } else {
          remainingDistance -= segmentDistanceRemaining;
          pulse.segmentIndex++;
          pulse.segmentDistance = 0;

          if (pulse.segmentIndex >= pulse.path.length - 1) {
            pulse.segmentIndex = pulse.path.length - 2;
            pulse.segmentDistance = getSegmentLength(pulse, pulse.segmentIndex);
            pulse.phase = "fade";
            pulse.phaseElapsedMilliseconds = 0;

            const endpoint = pulse.path[pulse.path.length - 1];
            bursts.push({
              x: endpoint.x,
              y: endpoint.y,
              ageMilliseconds: 0,
              maximumRadius: 7,
            });

            return true;
          }

          const corner = pulse.path[pulse.segmentIndex];
          bursts.push({
            x: corner.x,
            y: corner.y,
            ageMilliseconds: 0,
            maximumRadius: 5,
          });
        }
      }

      return true;
    };

    const renderFrame = (currentTime: number) => {
      if (!visible) {
        running = false;
        return;
      }

      const elapsedMilliseconds = Math.min(
        48,
        previousFrameTime ? currentTime - previousFrameTime : 16,
      );
      previousFrameTime = currentTime;

      spawnDelayRemaining -= elapsedMilliseconds;

      if (spawnDelayRemaining <= 0 && pulses.length < maxPulses) {
        spawnPulse();

        const spawnDensity = Math.min(
          3,
          Math.max(0.6, (width * height) / 700_000),
        );
        spawnDelayRemaining = randomInRange(300, 900) / spawnDensity;
      }

      for (let index = pulses.length - 1; index >= 0; index--) {
        if (!advancePulse(pulses[index], elapsedMilliseconds)) {
          pulses.splice(index, 1);
        }
      }

      for (let index = bursts.length - 1; index >= 0; index--) {
        bursts[index].ageMilliseconds += elapsedMilliseconds;

        if (bursts[index].ageMilliseconds >= BURST_DURATION_MILLISECONDS) {
          bursts.splice(index, 1);
        }
      }

      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
      context.clearRect(0, 0, width, height);

      for (const burst of bursts) drawBurst(burst);
      for (const pulse of pulses) drawPulse(pulse);

      animationFrameId = requestAnimationFrame(renderFrame);
    };

    const ensureAnimationRunning = () => {
      if (running) return;

      running = true;
      previousFrameTime = 0;
      animationFrameId = requestAnimationFrame(renderFrame);
    };

    resizeCanvas();

    const resizeObserver = new ResizeObserver(resizeCanvas);
    resizeObserver.observe(canvas);

    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible) ensureAnimationRunning();
      },
      { threshold: 0 },
    );
    intersectionObserver.observe(canvas);

    const handleVisibilityChange = () => {
      if (document.hidden) {
        cancelAnimationFrame(animationFrameId);
        running = false;
      } else if (visible) {
        ensureAnimationRunning();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [cellSize, maxPulses, tone]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`block h-full w-full ${className ?? ""}`}
    />
  );
}
