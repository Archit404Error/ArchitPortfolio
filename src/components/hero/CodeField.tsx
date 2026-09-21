"use client";

import { useEffect, useRef } from "react";
import { generateCode } from "./code-generator";

interface CodeFieldProps {
  className?: string;
  highlightRadius?: number;
  baseColor?: string;
  accentColor?: string;
  shieldSelector?: string;
}

interface Rgb {
  r: number;
  g: number;
  b: number;
}

interface Bounds {
  left: number;
  top: number;
  right: number;
  bottom: number;
}

const FONT_SIZE = 12;
const LINE_HEIGHT = 18;
const DECAY = 0.9;
const MIN_HEAT = 0.015;
const TARGET_PANE_WIDTH = 38;
const PANE_GUTTER_COLUMNS = 2;
const SHIELD_PADDING = 12;
const SHIELD_REFRESH_MILLISECONDS = 400;
const CODE_SEED = 0x5ee0_1d;

function hexToRgb(hexColor: string): Rgb {
  const colorValue = parseInt(hexColor.replace("#", ""), 16);

  return {
    r: (colorValue >> 16) & 255,
    g: (colorValue >> 8) & 255,
    b: colorValue & 255,
  };
}

function mixColors(firstColor: Rgb, secondColor: Rgb, amount: number): string {
  const red = Math.round(
    firstColor.r + (secondColor.r - firstColor.r) * amount,
  );
  const green = Math.round(
    firstColor.g + (secondColor.g - firstColor.g) * amount,
  );
  const blue = Math.round(
    firstColor.b + (secondColor.b - firstColor.b) * amount,
  );

  return `rgb(${red} ${green} ${blue})`;
}

function smoothstep(progress: number): number {
  const clampedProgress = Math.min(1, Math.max(0, progress));

  return clampedProgress * clampedProgress * (3 - 2 * clampedProgress);
}

export function CodeField({
  className,
  highlightRadius = 135,
  baseColor = "#cfc8ba",
  accentColor = "#0052ff",
  shieldSelector = "[data-codefield-shield]",
}: CodeFieldProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d", { alpha: true });
    if (!context) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const finePointer = window.matchMedia("(pointer: fine)").matches;

    const baseRgb = hexToRgb(baseColor);
    const accentRgb = hexToRgb(accentColor);
    const baseStyle = mixColors(baseRgb, baseRgb, 0);

    let width = 0;
    let height = 0;
    let pixelRatio = 1;
    let columnCount = 0;
    let rowCount = 0;
    let cellWidth = 8;
    let glyphs: string[] = [];
    let heatLevels = new Float32Array(0);
    let hotCellIndexes = new Set<number>();
    let baseLayer: HTMLCanvasElement | null = null;
    let animationFrameId = 0;
    let running = false;
    let hasInteracted = false;
    let isVisible = true;
    let fontFamily = "ui-monospace, monospace";
    let shieldBounds: Bounds[] = [];
    let lastShieldRefresh = -Infinity;

    const pointer = { x: -1e4, y: -1e4, active: false };
    const ambientMotion = { progress: 0.35 };

    const getFontString = () => `500 ${FONT_SIZE}px ${fontFamily}`;

    const buildGlyphGrid = () => {
      const totalCellCount = columnCount * rowCount;
      glyphs = new Array<string>(totalCellCount).fill(" ");

      const paneCount = Math.max(
        1,
        Math.round(columnCount / TARGET_PANE_WIDTH),
      );
      const paneWidth = Math.max(
        24,
        Math.floor(
          (columnCount - PANE_GUTTER_COLUMNS * (paneCount - 1)) / paneCount,
        ),
      );
      const signaturePane = Math.floor((paneCount - 1) / 2);

      for (let paneIndex = 0; paneIndex < paneCount; paneIndex++) {
        const startingColumn = paneIndex * (paneWidth + PANE_GUTTER_COLUMNS);
        const codeLines = generateCode(
          CODE_SEED ^ Math.imul(paneIndex + 1, 0x9e3779b1),
          {
            width: paneWidth,
            minimumLines: rowCount,
            includeSignature: paneIndex === signaturePane,
            compact: true,
          },
        );

        for (let rowIndex = 0; rowIndex < rowCount; rowIndex++) {
          const line = codeLines[rowIndex] ?? "";
          const visibleCharacterCount = Math.min(
            line.length,
            paneWidth,
            columnCount - startingColumn,
          );

          for (
            let columnIndex = 0;
            columnIndex < visibleCharacterCount;
            columnIndex++
          ) {
            glyphs[rowIndex * columnCount + startingColumn + columnIndex] =
              line[columnIndex];
          }
        }
      }
    };

    const paintCell = (
      targetContext: CanvasRenderingContext2D,
      cellIndex: number,
      color: string,
    ) => {
      const character = glyphs[cellIndex];
      if (character === " ") return;

      const columnIndex = cellIndex % columnCount;
      const rowIndex = (cellIndex - columnIndex) / columnCount;

      targetContext.fillStyle = color;
      targetContext.fillText(
        character,
        columnIndex * cellWidth + cellWidth / 2,
        rowIndex * LINE_HEIGHT + LINE_HEIGHT / 2,
      );
    };

    // Cache static glyphs so each frame repaints only heated cells.
    const renderBaseLayer = () => {
      baseLayer = document.createElement("canvas");
      baseLayer.width = Math.max(1, Math.floor(width * pixelRatio));
      baseLayer.height = Math.max(1, Math.floor(height * pixelRatio));

      const layerContext = baseLayer.getContext("2d");
      if (!layerContext) return;

      layerContext.scale(pixelRatio, pixelRatio);
      layerContext.font = getFontString();
      layerContext.textAlign = "center";
      layerContext.textBaseline = "middle";

      for (let index = 0; index < glyphs.length; index++) {
        paintCell(layerContext, index, baseStyle);
      }
    };

    const composeCanvas = () => {
      context.setTransform(1, 0, 0, 1, 0, 0);
      context.clearRect(0, 0, canvas.width, canvas.height);
      if (baseLayer) context.drawImage(baseLayer, 0, 0);

      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
      context.font = getFontString();
      context.textAlign = "center";
      context.textBaseline = "middle";

      for (const cellIndex of hotCellIndexes) {
        const columnIndex = cellIndex % columnCount;
        const rowIndex = (cellIndex - columnIndex) / columnCount;

        context.clearRect(
          columnIndex * cellWidth,
          rowIndex * LINE_HEIGHT,
          cellWidth,
          LINE_HEIGHT,
        );
        paintCell(
          context,
          cellIndex,
          mixColors(baseRgb, accentRgb, smoothstep(heatLevels[cellIndex])),
        );
      }
    };

    const refreshShieldBounds = () => {
      const canvasBounds = canvas.getBoundingClientRect();
      const nextShieldBounds: Bounds[] = [];

      document
        .querySelectorAll<HTMLElement>(shieldSelector)
        .forEach((element) => {
          const elementBounds = element.getBoundingClientRect();
          if (elementBounds.width === 0 || elementBounds.height === 0) {
            return;
          }

          nextShieldBounds.push({
            left: elementBounds.left - canvasBounds.left - SHIELD_PADDING,
            top: elementBounds.top - canvasBounds.top - SHIELD_PADDING,
            right: elementBounds.right - canvasBounds.left + SHIELD_PADDING,
            bottom: elementBounds.bottom - canvasBounds.top + SHIELD_PADDING,
          });
        });

      shieldBounds = nextShieldBounds;
    };

    const isShielded = (
      horizontalPosition: number,
      verticalPosition: number,
    ) => {
      for (const bounds of shieldBounds) {
        if (
          horizontalPosition >= bounds.left &&
          horizontalPosition <= bounds.right &&
          verticalPosition >= bounds.top &&
          verticalPosition <= bounds.bottom
        ) {
          return true;
        }
      }

      return false;
    };

    const resizeCanvas = () => {
      const bounds = canvas.getBoundingClientRect();
      width = Math.max(1, Math.floor(bounds.width));
      height = Math.max(1, Math.floor(bounds.height));
      pixelRatio = Math.min(2, window.devicePixelRatio || 1);
      canvas.width = Math.floor(width * pixelRatio);
      canvas.height = Math.floor(height * pixelRatio);

      fontFamily =
        getComputedStyle(canvas).fontFamily || "ui-monospace, monospace";
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
      context.font = getFontString();
      cellWidth = Math.max(6, context.measureText("M").width + 1.5);

      columnCount = Math.ceil(width / cellWidth);
      rowCount = Math.ceil(height / LINE_HEIGHT);
      heatLevels = new Float32Array(columnCount * rowCount);
      hotCellIndexes = new Set();

      buildGlyphGrid();
      renderBaseLayer();
      refreshShieldBounds();
      composeCanvas();
    };

    const applyHeat = (
      centerX: number,
      centerY: number,
      radius: number,
      strength: number,
    ) => {
      const minimumColumn = Math.max(
        0,
        Math.floor((centerX - radius) / cellWidth),
      );
      const maximumColumn = Math.min(
        columnCount - 1,
        Math.ceil((centerX + radius) / cellWidth),
      );
      const minimumRow = Math.max(
        0,
        Math.floor((centerY - radius) / LINE_HEIGHT),
      );
      const maximumRow = Math.min(
        rowCount - 1,
        Math.ceil((centerY + radius) / LINE_HEIGHT),
      );
      const radiusSquared = radius * radius;

      for (let rowIndex = minimumRow; rowIndex <= maximumRow; rowIndex++) {
        const cellCenterY = rowIndex * LINE_HEIGHT + LINE_HEIGHT / 2;

        for (
          let columnIndex = minimumColumn;
          columnIndex <= maximumColumn;
          columnIndex++
        ) {
          const cellIndex = rowIndex * columnCount + columnIndex;
          if (glyphs[cellIndex] === " ") continue;

          const cellCenterX = columnIndex * cellWidth + cellWidth / 2;
          const horizontalDistance = cellCenterX - centerX;
          const verticalDistance = cellCenterY - centerY;
          const distanceSquared =
            horizontalDistance * horizontalDistance +
            verticalDistance * verticalDistance;

          if (distanceSquared > radiusSquared) continue;
          if (shieldBounds.length && isShielded(cellCenterX, cellCenterY)) {
            continue;
          }

          const heat = (1 - distanceSquared / radiusSquared) * strength;

          if (heat > heatLevels[cellIndex]) {
            heatLevels[cellIndex] = heat;
            hotCellIndexes.add(cellIndex);
          }
        }
      }
    };

    const renderFrame = (currentTime: number) => {
      if (!isVisible) {
        running = false;
        return;
      }

      if (currentTime - lastShieldRefresh > SHIELD_REFRESH_MILLISECONDS) {
        lastShieldRefresh = currentTime;
        refreshShieldBounds();
      }

      const useAmbientMotion = !hasInteracted && !prefersReducedMotion;

      if (useAmbientMotion) {
        ambientMotion.progress += 0.0042;
        const ambientX =
          width * (0.5 + 0.42 * Math.sin(ambientMotion.progress * 0.9));
        const ambientY =
          height * (0.5 + 0.36 * Math.sin(ambientMotion.progress * 1.7 + 1.2));

        applyHeat(ambientX, ambientY, highlightRadius * 0.8, 0.7);
      }

      if (pointer.active) {
        applyHeat(pointer.x, pointer.y, highlightRadius, 1);
      }

      for (const cellIndex of hotCellIndexes) {
        heatLevels[cellIndex] *= DECAY;

        if (heatLevels[cellIndex] < MIN_HEAT) {
          heatLevels[cellIndex] = 0;
          hotCellIndexes.delete(cellIndex);
        }
      }

      composeCanvas();

      if (hotCellIndexes.size > 0 || pointer.active || useAmbientMotion) {
        animationFrameId = requestAnimationFrame(renderFrame);
      } else {
        running = false;
      }
    };

    const ensureRunning = () => {
      if (running) return;

      running = true;
      lastShieldRefresh = -Infinity;
      animationFrameId = requestAnimationFrame(renderFrame);
    };

    const handlePointerMove = (event: PointerEvent) => {
      const bounds = canvas.getBoundingClientRect();
      const pointerX = event.clientX - bounds.left;
      const pointerY = event.clientY - bounds.top;
      const isInside =
        pointerX >= 0 &&
        pointerY >= 0 &&
        pointerX <= bounds.width &&
        pointerY <= bounds.height;

      pointer.x = pointerX;
      pointer.y = pointerY;
      pointer.active = isInside;

      if (isInside && (event.pointerType === "mouse" || finePointer)) {
        hasInteracted = true;
      }

      ensureRunning();
    };

    const handlePointerLeave = () => {
      pointer.active = false;
    };

    const handleTouchMove = (event: TouchEvent) => {
      const touch = event.touches[0];
      if (!touch) return;

      const bounds = canvas.getBoundingClientRect();
      pointer.x = touch.clientX - bounds.left;
      pointer.y = touch.clientY - bounds.top;
      pointer.active =
        pointer.x >= 0 &&
        pointer.y >= 0 &&
        pointer.x <= bounds.width &&
        pointer.y <= bounds.height;

      ensureRunning();
    };

    const handleTouchEnd = () => {
      pointer.active = false;
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        cancelAnimationFrame(animationFrameId);
        running = false;
      } else {
        ensureRunning();
      }
    };

    resizeCanvas();
    ensureRunning();

    const resizeObserver = new ResizeObserver(resizeCanvas);
    resizeObserver.observe(canvas);

    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        if (isVisible) ensureRunning();
      },
      { threshold: 0 },
    );
    intersectionObserver.observe(canvas);

    document.fonts?.ready.then(() => resizeCanvas()).catch(() => {});

    window.addEventListener("pointermove", handlePointerMove, {
      passive: true,
    });
    window.addEventListener("pointerdown", handlePointerMove, {
      passive: true,
    });
    window.addEventListener("touchmove", handleTouchMove, {
      passive: true,
    });
    window.addEventListener("touchend", handleTouchEnd, {
      passive: true,
    });
    document.addEventListener("pointerleave", handlePointerLeave);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerdown", handlePointerMove);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
      document.removeEventListener("pointerleave", handlePointerLeave);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [highlightRadius, baseColor, accentColor, shieldSelector]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`font-mono block h-full w-full ${className ?? ""}`}
    />
  );
}
