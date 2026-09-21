export type RandomNumberGenerator = () => number;

export function createRandomNumberGenerator(
  seed: number,
): RandomNumberGenerator {
  let state = seed >>> 0;

  return () => {
    state = (state + 0x6d2b79f5) >>> 0;
    let value = state;

    value = Math.imul(value ^ (value >>> 15), value | 1);
    value ^= value + Math.imul(value ^ (value >>> 7), value | 61);

    return ((value ^ (value >>> 14)) >>> 0) / 4294967296;
  };
}

interface Noun {
  singular: string;
  plural: string;
}

interface Verb {
  base: string;
  past: string;
  presentParticiple: string;
  thirdPerson: string;
}

const createNoun = (singular: string, plural = `${singular}s`): Noun => ({
  singular,
  plural,
});

const createVerb = (
  base: string,
  past: string,
  presentParticiple: string,
  thirdPerson: string,
): Verb => ({
  base,
  past,
  presentParticiple,
  thirdPerson,
});

const NOUNS: readonly Noun[] = [
  createNoun("thread"),
  createNoun("message"),
  createNoun("draft"),
  createNoun("inbox", "inboxes"),
  createNoun("mailbox", "mailboxes"),
  createNoun("user"),
  createNoun("account"),
  createNoun("session"),
  createNoun("token"),
  createNoun("workspace"),
  createNoun("payment"),
  createNoun("invoice"),
  createNoun("customer"),
  createNoun("receipt"),
  createNoun("charge"),
  createNoun("refund"),
  createNoun("embedding"),
  createNoun("vector"),
  createNoun("query", "queries"),
  createNoun("document"),
  createNoun("summary", "summaries"),
  createNoun("job"),
  createNoun("task"),
  createNoun("event"),
  createNoun("webhook"),
  createNoun("schedule"),
  createNoun("meeting"),
  createNoun("reminder"),
  createNoun("contact"),
  createNoun("attachment"),
  createNoun("label"),
  createNoun("rule"),
  createNoun("filter"),
  createNoun("policy", "policies"),
  createNoun("request"),
  createNoun("response"),
  createNoun("frame"),
  createNoun("image"),
  createNoun("tensor"),
  createNoun("batch", "batches"),
  createNoun("waypoint"),
  createNoun("lane"),
  createNoun("vehicle"),
  createNoun("sensor"),
  createNoun("pose"),
  createNoun("tile"),
  createNoun("segment"),
  createNoun("cluster"),
  createNoun("node"),
  createNoun("pod"),
  createNoun("service"),
  createNoun("deployment"),
  createNoun("bucket"),
  createNoun("region"),
  createNoun("metric"),
  createNoun("trace"),
  createNoun("span"),
  createNoun("record"),
  createNoun("result"),
  createNoun("snapshot"),
  createNoun("checkpoint"),
  createNoun("prompt"),
  createNoun("completion"),
  createNoun("agent"),
  createNoun("tool"),
  createNoun("intent"),
  createNoun("signature"),
];

const VERBS: readonly Verb[] = [
  createVerb("fetch", "fetched", "fetching", "fetches"),
  createVerb("load", "loaded", "loading", "loads"),
  createVerb("parse", "parsed", "parsing", "parses"),
  createVerb("build", "built", "building", "builds"),
  createVerb("compile", "compiled", "compiling", "compiles"),
  createVerb("encode", "encoded", "encoding", "encodes"),
  createVerb("decode", "decoded", "decoding", "decodes"),
  createVerb("embed", "embedded", "embedding", "embeds"),
  createVerb("rank", "ranked", "ranking", "ranks"),
  createVerb("score", "scored", "scoring", "scores"),
  createVerb("triage", "triaged", "triaging", "triages"),
  createVerb("schedule", "scheduled", "scheduling", "schedules"),
  createVerb("retry", "retried", "retrying", "retries"),
  createVerb("resolve", "resolved", "resolving", "resolves"),
  createVerb("validate", "validated", "validating", "validates"),
  createVerb("normalize", "normalized", "normalizing", "normalizes"),
  createVerb("merge", "merged", "merging", "merges"),
  createVerb("flatten", "flattened", "flattening", "flattens"),
  createVerb("transform", "transformed", "transforming", "transforms"),
  createVerb("compute", "computed", "computing", "computes"),
  createVerb("predict", "predicted", "predicting", "predicts"),
  createVerb("evaluate", "evaluated", "evaluating", "evaluates"),
  createVerb("render", "rendered", "rendering", "renders"),
  createVerb("sync", "synced", "syncing", "syncs"),
  createVerb("detect", "detected", "detecting", "detects"),
  createVerb("track", "tracked", "tracking", "tracks"),
  createVerb("filter", "filtered", "filtering", "filters"),
  createVerb("reduce", "reduced", "reducing", "reduces"),
  createVerb("apply", "applied", "applying", "applies"),
  createVerb("dispatch", "dispatched", "dispatching", "dispatches"),
  createVerb("publish", "published", "publishing", "publishes"),
  createVerb("persist", "persisted", "persisting", "persists"),
  createVerb("hydrate", "hydrated", "hydrating", "hydrates"),
  createVerb("serialize", "serialized", "serializing", "serializes"),
  createVerb("index", "indexed", "indexing", "indexes"),
  createVerb("cache", "cached", "caching", "caches"),
  createVerb("paginate", "paginated", "paginating", "paginates"),
  createVerb("summarize", "summarized", "summarizing", "summarizes"),
  createVerb("classify", "classified", "classifying", "classifies"),
  createVerb("extract", "extracted", "extracting", "extracts"),
  createVerb("enqueue", "enqueued", "enqueuing", "enqueues"),
  createVerb("resample", "resampled", "resampling", "resamples"),
  createVerb("calibrate", "calibrated", "calibrating", "calibrates"),
  createVerb("archive", "archived", "archiving", "archives"),
  createVerb("deduplicate", "deduplicated", "deduplicating", "deduplicates"),
];

const ADJECTIVES = [
  "pending",
  "active",
  "stale",
  "cached",
  "primary",
  "remote",
  "latest",
  "sorted",
  "unique",
  "visible",
  "recent",
  "archived",
  "unread",
  "starred",
  "expired",
  "valid",
  "missing",
  "failed",
  "partial",
  "nested",
  "raw",
  "parsed",
  "ranked",
  "dirty",
] as const;

const TS_MODULES = [
  "@stamp/core",
  "@stamp/agents",
  "@stamp/mail",
  "node:crypto",
  "node:fs/promises",
  "zod",
  "react",
  "next/server",
  "openai",
  "@aws-sdk/client-s3",
  "pg",
  "ioredis",
  "drizzle-orm",
  "kysely",
  "bullmq",
  "date-fns",
  "motion/react",
  "@tanstack/react-query",
  "hono",
  "express",
] as const;

const CPP_FLOATS = ["double", "float"] as const;

const COMMENTS = [
  "{V} each {N} before it reaches the queue.",
  "skip {Ns} that were already {Ved} in a previous run.",
  "TODO: {V} {Ns} in a background job instead of inline.",
  "retry with exponential backoff before giving up on the {N}.",
  "cache the {Adj} {N} so repeated lookups stay cheap.",
  "the {N} is immutable once it has been {Ved}.",
  "NOTE: {Ving} is idempotent, so calling this twice is safe.",
  "normalize timestamps to UTC so the cache key stays stable.",
  "fall back to the {Adj} {N} when the upstream call times out.",
  "keep this in sync with the schema in migrations/.",
  "batch {Ns} by {N2} to cut round trips to the database.",
  "return early when there is nothing left to {V}.",
  "FIXME: this leaks a handle when the {N} is closed twice.",
  "only {Adj} {Ns} are visible to the caller.",
  "{Ving} {Ns} took 42ms at p99 after this change.",
  "stream the {N} back to the client as soon as the first chunk lands.",
  "each {N} owns exactly one {N2}; never share them across workers.",
  "guard against an empty {N} list before {Ving}.",
  "trim whitespace here; the {N} parser is strict about it.",
  "every {N} is {Ved} exactly once, even if the worker restarts.",
  "prefer the {Adj} {N} unless the caller asked for a specific one.",
  "see RFC 5322 for the full grammar of message headers.",
  "this path is hot; avoid allocating inside the loop.",
  "debounce so a burst of {Ns} only {Vs} once.",
  "sort by score, then by recency, so ties are deterministic.",
  "bail out if the {N} has already been {Ved}.",
  "the model is small enough to run on the edge; keep it that way.",
  "measure before optimizing: most {Ns} never hit this branch.",
  "HACK: the upstream API returns {Ns} out of order on Mondays.",
  "{Ving} happens off the main thread to keep scrolling smooth.",
  "map each {N} to its {N2} once and reuse the lookup table.",
  "this mirrors the {Adj} {N} logic in the mobile client.",
] as const;

const ERROR_MESSAGES = [
  "failed to {V} {N}",
  "{N} not found",
  "invalid {N} id",
  "timeout while {Ving} {N}",
  "{N} is {Adj}; refusing to {V}",
  "could not {V} {N}: upstream unavailable",
  "missing {N} for {N2}",
] as const;

const INFO_MESSAGES = [
  "{Ving} {Ns}",
  "{N} {Ved} successfully",
  "{Ved} {n} {Ns} in {ms}ms",
  "no {Adj} {Ns} to {V}",
  "{N} {Adj}; skipping",
  "retrying {N} ({n}/5)",
  "flushed {n} {Ns}",
] as const;

const SUBJECTS = [
  "Re: Q3 planning notes",
  "Invoice #4821 is ready",
  "Your flight is confirmed",
  "Intro: Archit <> Priya",
  "Board update — September",
  "Welcome to Stamp",
  "Standup moved to 10:15",
  "Following up on the demo",
  "Offer letter attached",
  "Re: HD map tile schema",
  "Weekly metrics digest",
  "Can you review this PR?",
] as const;

const NAMES = [
  "Priya",
  "Daniel",
  "Mei",
  "Jonah",
  "Sofia",
  "Arjun",
  "Leila",
  "Marcus",
] as const;

interface Field {
  name: string;
  snakeCase: string;
  typescript: string;
  python: string;
  rust: string;
  go: string;
  swift: string;
  sql: string;
}

type FieldTypes = [
  typescript: string,
  python: string,
  rust: string,
  go: string,
  swift: string,
  sql: string,
];

const createField = (
  name: string,
  [typescript, python, rust, go, swift, sql]: FieldTypes,
): Field => ({
  name,
  snakeCase: name.replace(
    /[A-Z]/g,
    (character) => `_${character.toLowerCase()}`,
  ),
  typescript,
  python,
  rust,
  go,
  swift,
  sql,
});

const STRING_FIELD_TYPES: FieldTypes = [
  "string",
  "str",
  "String",
  "string",
  "String",
  "text",
];
const INTEGER_FIELD_TYPES: FieldTypes = [
  "number",
  "int",
  "u32",
  "int",
  "Int",
  "integer",
];
const FLOAT_FIELD_TYPES: FieldTypes = [
  "number",
  "float",
  "f32",
  "float64",
  "Double",
  "real",
];
const BOOLEAN_FIELD_TYPES: FieldTypes = [
  "boolean",
  "bool",
  "bool",
  "bool",
  "Bool",
  "boolean",
];
const TIME_FIELD_TYPES: FieldTypes = [
  "Date",
  "datetime",
  "DateTime<Utc>",
  "time.Time",
  "Date",
  "timestamptz",
];

const FIELDS: readonly Field[] = [
  createField("status", STRING_FIELD_TYPES),
  createField("subject", STRING_FIELD_TYPES),
  createField("body", STRING_FIELD_TYPES),
  createField("currency", STRING_FIELD_TYPES),
  createField("source", STRING_FIELD_TYPES),
  createField("ownerId", ["string", "str", "Uuid", "string", "UUID", "uuid"]),
  createField("threadId", ["string", "str", "Uuid", "string", "UUID", "uuid"]),
  createField("score", FLOAT_FIELD_TYPES),
  createField("confidence", FLOAT_FIELD_TYPES),
  createField("amount", [
    "number",
    "int",
    "i64",
    "int64",
    "Int",
    "numeric(12, 2)",
  ]),
  createField("retries", INTEGER_FIELD_TYPES),
  createField("priority", INTEGER_FIELD_TYPES),
  createField("version", ["number", "int", "u64", "int64", "Int", "bigint"]),
  createField("archived", BOOLEAN_FIELD_TYPES),
  createField("unread", BOOLEAN_FIELD_TYPES),
  createField("startsAt", TIME_FIELD_TYPES),
  createField("endsAt", TIME_FIELD_TYPES),
  createField("checksum", [
    "string",
    "bytes",
    "[u8; 32]",
    "[]byte",
    "Data",
    "bytea",
  ]),
  createField("labels", [
    "string[]",
    "list[str]",
    "Vec<String>",
    "[]string",
    "[String]",
    "text[]",
  ]),
];

const capitalize = (value: string) =>
  value ? value[0].toUpperCase() + value.slice(1) : value;
const pascalCase = (...parts: string[]) => parts.map(capitalize).join("");
const camelCase = (first: string, ...rest: string[]) =>
  first + pascalCase(...rest);
const snakeCase = (...parts: string[]) => parts.join("_");
const kebabCase = (...parts: string[]) => parts.join("-");
const upperSnakeCase = (...parts: string[]) => parts.join("_").toUpperCase();

class CodeGenerator {
  readonly random: RandomNumberGenerator;
  readonly width: number;
  private unusedComments: number[] = [];

  constructor(random: RandomNumberGenerator, width: number) {
    this.random = random;
    this.width = width;
  }

  pick<T>(items: readonly T[]): T {
    return items[Math.floor(this.random() * items.length)];
  }

  chance(probability: number): boolean {
    return this.random() < probability;
  }

  integer(minimum: number, maximum: number): number {
    return minimum + Math.floor(this.random() * (maximum - minimum + 1));
  }

  sampleDistinct<T>(items: readonly T[], count: number): T[] {
    const pool = [...items];
    const samples: T[] = [];

    while (samples.length < count && pool.length) {
      samples.push(pool.splice(Math.floor(this.random() * pool.length), 1)[0]);
    }

    return samples;
  }

  noun(): Noun {
    return this.pick(NOUNS);
  }

  verb(): Verb {
    return this.pick(VERBS);
  }

  adjective(): string {
    return this.pick(ADJECTIVES);
  }

  name(): string {
    return this.pick(NAMES);
  }

  milliseconds(): number {
    return this.pick([8, 12, 17, 24, 31, 42, 58, 73, 96, 120, 184, 250]);
  }

  version(): string {
    return `${this.integer(0, 3)}.${this.integer(0, 14)}.${this.integer(0, 9)}`;
  }

  hex(length: number): string {
    let value = "";

    for (let index = 0; index < length; index++) {
      value += "0123456789abcdef"[this.integer(0, 15)];
    }

    return value;
  }

  fillTemplate(template: string): string {
    const noun = this.noun();
    let secondNoun = this.noun();

    while (secondNoun === noun) secondNoun = this.noun();

    const verb = this.verb();
    const adjective = this.adjective();

    return template
      .replaceAll("{N2}", secondNoun.singular)
      .replaceAll("{Ns}", noun.plural)
      .replaceAll("{N}", noun.singular)
      .replaceAll("{Ved}", verb.past)
      .replaceAll("{Ving}", verb.presentParticiple)
      .replaceAll("{Vs}", verb.thirdPerson)
      .replaceAll("{V}", verb.base)
      .replaceAll("{Adj}", adjective)
      .replaceAll("{n}", String(this.integer(2, 480)))
      .replaceAll("{ms}", String(this.milliseconds()));
  }

  comment(): string {
    if (!this.unusedComments.length) {
      this.unusedComments = COMMENTS.map((_, index) => index);
    }

    const commentIndex = Math.floor(this.random() * this.unusedComments.length);
    const [templateIndex] = this.unusedComments.splice(commentIndex, 1);

    return capitalize(this.fillTemplate(COMMENTS[templateIndex]));
  }

  errorMessage(): string {
    return this.fillTemplate(this.pick(ERROR_MESSAGES));
  }

  infoMessage(): string {
    return this.fillTemplate(this.pick(INFO_MESSAGES));
  }

  camelFn(): string {
    const verb = this.verb();
    const noun = this.noun();

    return camelCase(verb.base, this.chance(0.5) ? noun.plural : noun.singular);
  }

  snakeFn(): string {
    const verb = this.verb();
    const noun = this.noun();

    return snakeCase(verb.base, this.chance(0.5) ? noun.plural : noun.singular);
  }

  pascalFn(): string {
    const verb = this.verb();
    const noun = this.noun();

    return pascalCase(
      verb.base,
      this.chance(0.5) ? noun.plural : noun.singular,
    );
  }

  type(): string {
    const firstNoun = this.noun();
    if (this.chance(0.45)) {
      return pascalCase(firstNoun.singular);
    }

    let secondNoun = this.noun();
    while (secondNoun === firstNoun) secondNoun = this.noun();

    return pascalCase(firstNoun.singular, secondNoun.singular);
  }

  ident(): string {
    return this.noun().singular;
  }

  plural(): string {
    return this.noun().plural;
  }

  field(): string {
    return this.pick(FIELDS).name;
  }

  snakeField(): string {
    return this.pick(FIELDS).snakeCase;
  }

  fields(count: number): Field[] {
    return this.sampleDistinct(FIELDS, count);
  }

  moduleName(): string {
    return kebabCase(
      this.noun().plural,
      this.pick(["service", "worker", "router", "store", "utils", "model"]),
    );
  }
}

type CodeBlockBuilder = (generator: CodeGenerator) => string[];

const buildTypescriptBlock: CodeBlockBuilder = (generator) => {
  const variant = generator.integer(0, 4);
  const lines: string[] = [];
  const primaryType = generator.type();
  const secondaryType = generator.type();
  const functionName = generator.camelFn();
  const collectionName = generator.plural();
  const itemName = collectionName
    .replace(/ies$/, "y")
    .replace(/(x|ch)es$/, "$1")
    .replace(/s$/, "");

  if (variant === 0) {
    lines.push(`// ${generator.moduleName()}.ts`);
    lines.push(
      `import { ${primaryType}, ${secondaryType} } from "${generator.pick(TS_MODULES)}";`,
    );
    if (generator.chance(0.6)) {
      lines.push(
        `import { ${generator.camelFn()} } from "./${generator.moduleName()}";`,
      );
    }
    lines.push("");
    lines.push(`export interface ${primaryType}Options {`);

    for (const optionName of generator.sampleDistinct(
      ["limit", "cursor", "signal", "includeArchived", "timeoutMs"],
      generator.integer(2, 3),
    )) {
      const optionType =
        optionName === "signal"
          ? "AbortSignal"
          : optionName === "cursor"
            ? "string"
            : optionName.startsWith("include")
              ? "boolean"
              : "number";
      lines.push(`  ${optionName}?: ${optionType};`);
    }

    lines.push("}");
    lines.push("");
    lines.push(`// ${generator.comment()}`);
    lines.push(`export async function ${functionName}(`);
    lines.push(`  ${collectionName}: ${primaryType}[],`);
    lines.push(`  options: ${primaryType}Options = {},`);
    lines.push(`): Promise<${secondaryType}[]> {`);
    lines.push(
      `  const { limit = ${generator.pick([20, 50, 100])}, signal } = options;`,
    );
    lines.push(`  const results = await Promise.all(`);
    lines.push(
      `    ${collectionName}.map((${itemName}) => ${generator.camelFn()}(${itemName}, { signal })),`,
    );
    lines.push(`  );`);

    const sortKey = generator.pick(["score", "updatedAt", "priority"]);
    lines.push(`  return results`);
    lines.push(
      `    .filter((r) => r.${generator.pick(["score", "confidence"])} > ${generator.pick(["0.35", "0.5", "0.72"])})`,
    );
    lines.push(`    .sort((a, b) => b.${sortKey} - a.${sortKey})`);
    lines.push(`    .slice(0, limit);`);
    lines.push("}");
  } else if (variant === 1) {
    const componentName = pascalCase(
      itemName,
      generator.pick(["List", "Card", "Row", "Panel"]),
    );
    lines.push(`"use client";`);
    lines.push("");
    lines.push(`import { useMemo, useState } from "react";`);
    lines.push(`import { motion } from "motion/react";`);
    lines.push(
      `import type { ${primaryType} } from "${generator.pick(TS_MODULES)}";`,
    );
    lines.push("");
    lines.push(`interface ${componentName}Props {`);
    lines.push(`  ${collectionName}: ${primaryType}[];`);
    lines.push(`  onSelect?: (${itemName}: ${primaryType}) => void;`);
    lines.push("}");
    lines.push("");

    const titleKey = generator.pick(["subject", "title", "name"]);
    lines.push(
      `export function ${componentName}({ ${collectionName}, onSelect }: ${componentName}Props) {`,
    );
    lines.push(`  const [query, setQuery] = useState("");`);
    lines.push(`  const visible = useMemo(`);
    lines.push(
      `    () => ${collectionName}.filter((${itemName}) => ${itemName}.${titleKey}.toLowerCase().includes(query)),`,
    );
    lines.push(`    [${collectionName}, query],`);
    lines.push(`  );`);
    lines.push("");
    lines.push(`  return (`);
    lines.push(`    <ul className="divide-y divide-ink-100">`);
    lines.push(`      {visible.map((${itemName}) => (`);
    lines.push(
      `        <motion.li key={${itemName}.id} layout onClick={() => onSelect?.(${itemName})}>`,
    );
    lines.push(
      `          <span className="font-medium">{${itemName}.${titleKey}}</span>`,
    );
    lines.push(`        </motion.li>`);
    lines.push(`      ))}`);
    lines.push(`    </ul>`);
    lines.push(`  );`);
    lines.push("}");
  } else if (variant === 2) {
    lines.push(`import { NextResponse } from "next/server";`);
    lines.push(`import { z } from "zod";`);
    lines.push(
      `import { ${functionName} } from "@/lib/${generator.moduleName()}";`,
    );
    lines.push("");
    lines.push(`const Body = z.object({`);
    lines.push(`  ${generator.field()}: z.string().min(1),`);
    lines.push(
      `  ${generator.field()}: z.number().int().positive().optional(),`,
    );
    lines.push(
      `  ${generator.field()}: z.enum([${generator
        .sampleDistinct(ADJECTIVES, 3)
        .map((adjective) => `"${adjective}"`)
        .join(", ")}]),`,
    );
    lines.push(`});`);
    lines.push("");
    lines.push(`export async function POST(req: Request) {`);
    lines.push(`  const parsed = Body.safeParse(await req.json());`);
    lines.push(`  if (!parsed.success) {`);
    lines.push(
      `    return NextResponse.json({ error: "${generator.errorMessage()}" }, { status: 400 });`,
    );
    lines.push(`  }`);
    lines.push(`  // ${generator.comment()}`);
    lines.push(`  const result = await ${functionName}(parsed.data);`);
    lines.push(`  return NextResponse.json(result, { status: 200 });`);
    lines.push("}");
  } else if (variant === 3) {
    const className = pascalCase(
      itemName,
      generator.pick(["Store", "Client", "Queue", "Cache", "Indexer"]),
    );
    const dependencyName = generator.pick(["db", "redis", "client", "bus"]);
    lines.push(`export class ${className} {`);
    lines.push(
      `  private readonly ${collectionName} = new Map<string, ${primaryType}>();`,
    );
    lines.push(
      `  private ${generator.pick(["dirty", "closed", "warm"])} = false;`,
    );
    lines.push("");
    lines.push(
      `  constructor(private readonly ${dependencyName}: ${secondaryType}) {}`,
    );
    lines.push("");
    lines.push(
      `  async ${generator.verb().base}(id: string): Promise<${primaryType} | undefined> {`,
    );
    lines.push(`    const hit = this.${collectionName}.get(id);`);
    lines.push(`    if (hit) return hit;`);
    lines.push(
      `    const fresh = await this.${dependencyName}.${generator.camelFn()}(id);`,
    );
    lines.push(`    if (fresh) this.${collectionName}.set(id, fresh);`);
    lines.push(`    return fresh ?? undefined;`);
    lines.push(`  }`);
    lines.push("");
    lines.push(`  // ${generator.comment()}`);
    lines.push(`  ${generator.camelFn()}(): number {`);
    lines.push(`    let total = 0;`);
    lines.push(
      `    for (const ${itemName} of this.${collectionName}.values()) total += ${itemName}.${generator.pick(["amount", "score", "retries"])};`,
    );
    lines.push(`    return total;`);
    lines.push(`  }`);
    lines.push("}");
  } else {
    const constantName = upperSnakeCase(
      generator.pick(["max", "default", "min"]),
      generator.noun().singular,
      generator.pick(["ttl", "limit", "size"]),
    );
    const [firstField, secondField] = generator.sampleDistinct(
      FIELDS.filter((field) => field.name !== "status"),
      2,
    );
    lines.push(
      `export const ${constantName} = ${generator.pick(["60_000", "5 * 60 * 1000", "1_024", "250", "32"])};`,
    );
    lines.push("");
    lines.push(
      `export type ${primaryType}Status = ${generator
        .sampleDistinct(ADJECTIVES, 3)
        .map((adjective) => `"${adjective}"`)
        .join(" | ")};`,
    );
    lines.push("");
    lines.push(`export interface ${primaryType} {`);
    lines.push(`  id: string;`);
    lines.push(`  status: ${primaryType}Status;`);
    lines.push(`  ${firstField.name}: ${firstField.typescript};`);
    lines.push(`  ${secondField.name}?: ${secondField.typescript};`);
    lines.push(`  createdAt: Date;`);
    lines.push(`  updatedAt: Date;`);
    lines.push(`}`);
    lines.push("");
    lines.push(
      `export function ${generator.camelFn()}(input: ${primaryType}, now = Date.now()): boolean {`,
    );
    lines.push(
      `  return now - input.${generator.pick(["updatedAt", "createdAt"])}.getTime() > ${constantName};`,
    );
    lines.push("}");
    lines.push("");
    lines.push(
      `export const ${generator.camelFn()} = (${collectionName}: ${primaryType}[]) =>`,
    );
    lines.push(
      `  ${collectionName}.reduce<Record<string, ${primaryType}[]>>((acc, ${itemName}) => {`,
    );
    lines.push(
      `    (acc[${itemName}.${generator.pick(["ownerId", "status", "source"])}] ??= []).push(${itemName});`,
    );
    lines.push(`    return acc;`);
    lines.push(`  }, {});`);
  }

  return lines;
};

const buildPythonBlock: CodeBlockBuilder = (generator) => {
  const variant = generator.integer(0, 3);
  const lines: string[] = [];
  const className = generator.type();
  const functionName = generator.snakeFn();
  const collectionName = generator.plural();
  const itemName = collectionName
    .replace(/ies$/, "y")
    .replace(/(x|ch)es$/, "$1")
    .replace(/s$/, "");

  if (variant === 0) {
    lines.push(`from __future__ import annotations`);
    lines.push("");
    lines.push(`from dataclasses import dataclass, field`);
    lines.push(`from typing import Iterable`);
    lines.push("");
    lines.push("");

    const [firstField, secondField, thirdField] = generator.fields(3);
    lines.push(`@dataclass(frozen=True)`);
    lines.push(`class ${className}:`);
    lines.push(`    id: str`);
    lines.push(`    ${firstField.snakeCase}: ${firstField.python}`);
    lines.push(`    ${secondField.snakeCase}: ${secondField.python}`);
    lines.push(
      `    ${thirdField.snakeCase}: ${thirdField.python} | None = None`,
    );
    lines.push(`    tags: list[str] = field(default_factory=list)`);
    lines.push("");
    lines.push("");
    lines.push(
      `def ${functionName}(${collectionName}: Iterable[${className}], threshold: float = ${generator.pick(["0.5", "0.35", "0.8"])}) -> list[${className}]:`,
    );
    lines.push(`    """${generator.comment()}"""`);
    lines.push(
      `    kept = [${itemName} for ${itemName} in ${collectionName} if ${itemName}.score >= threshold]`,
    );
    lines.push(
      `    return sorted(kept, key=lambda ${itemName}: (-${itemName}.score, ${itemName}.${generator.snakeField()}))`,
    );
  } else if (variant === 1) {
    const modelName = pascalCase(
      generator.noun().singular,
      generator.pick(["Encoder", "Head", "Net", "Classifier"]),
    );
    lines.push(`import torch`);
    lines.push(`import torch.nn as nn`);
    lines.push(`import torch.nn.functional as F`);
    lines.push("");
    lines.push("");
    lines.push(`class ${modelName}(nn.Module):`);
    lines.push(
      `    def __init__(self, dim: int = ${generator.pick([256, 384, 512, 768])}, heads: int = ${generator.pick([4, 8, 12])}):`,
    );
    lines.push(`        super().__init__()`);
    lines.push(`        self.proj = nn.Linear(dim, dim)`);
    lines.push(
      `        self.attn = nn.MultiheadAttention(dim, heads, batch_first=True)`,
    );
    lines.push(`        self.norm = nn.LayerNorm(dim)`);
    lines.push(
      `        self.dropout = nn.Dropout(${generator.pick(["0.1", "0.05", "0.2"])})`,
    );
    lines.push("");
    lines.push(
      `    def forward(self, x: torch.Tensor, mask: torch.Tensor | None = None) -> torch.Tensor:`,
    );
    lines.push(`        # ${generator.comment()}`);
    lines.push(`        h = self.proj(x)`);
    lines.push(
      `        attended, _ = self.attn(h, h, h, key_padding_mask=mask)`,
    );
    lines.push(`        return self.norm(x + self.dropout(attended))`);
    lines.push("");
    lines.push("");
    lines.push(
      `def ${generator.snakeFn()}(logits: torch.Tensor, targets: torch.Tensor) -> torch.Tensor:`,
    );
    lines.push(
      `    return F.cross_entropy(logits, targets, label_smoothing=${generator.pick(["0.1", "0.05"])})`,
    );
  } else if (variant === 2) {
    lines.push(`import asyncio`);
    lines.push(`import httpx`);
    lines.push(`from fastapi import APIRouter, Depends, HTTPException`);
    lines.push("");
    lines.push(
      `router = APIRouter(prefix="/${collectionName}", tags=["${collectionName}"])`,
    );
    lines.push("");
    lines.push("");
    lines.push(`@router.get("/{${itemName}_id}")`);
    lines.push(
      `async def ${functionName}(${itemName}_id: str, db: Session = Depends(get_db)) -> ${className}:`,
    );
    lines.push(`    ${itemName} = await db.get(${className}, ${itemName}_id)`);
    lines.push(`    if ${itemName} is None:`);
    lines.push(
      `        raise HTTPException(status_code=404, detail="${generator.errorMessage()}")`,
    );
    lines.push(`    # ${generator.comment()}`);
    lines.push(
      `    async with httpx.AsyncClient(timeout=${generator.pick(["5.0", "10.0", "2.5"])}) as client:`,
    );
    lines.push(
      `        resp = await client.post(settings.${upperSnakeCase(generator.noun().singular, "url")}, json=${itemName}.model_dump())`,
    );
    lines.push(`        resp.raise_for_status()`);
    lines.push(`    return ${itemName}`);
  } else {
    lines.push(`import cv2`);
    lines.push(`import numpy as np`);
    lines.push("");
    lines.push("");
    lines.push(
      `def ${generator.snakeFn()}(frame: np.ndarray, k: int = ${generator.pick([3, 5, 7])}) -> np.ndarray:`,
    );
    lines.push(`    """${generator.comment()}"""`);
    lines.push(`    gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)`);
    lines.push(`    blurred = cv2.GaussianBlur(gray, (k, k), 0)`);
    lines.push(
      `    edges = cv2.Canny(blurred, ${generator.pick([50, 75, 100])}, ${generator.pick([150, 200, 250])})`,
    );
    lines.push(
      `    contours, _ = cv2.findContours(edges, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)`,
    );
    lines.push(`    mask = np.zeros_like(gray)`);
    lines.push(
      `    cv2.drawContours(mask, contours, -1, 255, thickness=cv2.FILLED)`,
    );
    lines.push(`    return mask`);
    lines.push("");
    lines.push("");
    lines.push(
      `def ${generator.snakeFn()}(points: np.ndarray, pose: np.ndarray) -> np.ndarray:`,
    );
    lines.push(
      `    homogeneous = np.hstack([points, np.ones((points.shape[0], 1))])`,
    );
    lines.push(`    return (pose @ homogeneous.T).T[:, :3]`);
  }

  return lines;
};

const buildRustBlock: CodeBlockBuilder = (generator) => {
  const variant = generator.integer(0, 2);
  const lines: string[] = [];
  const typeName = generator.type();
  const functionName = generator.snakeFn();
  const collectionName = generator.plural();
  const itemName = collectionName
    .replace(/ies$/, "y")
    .replace(/(x|ch)es$/, "$1")
    .replace(/s$/, "");

  if (variant === 0) {
    lines.push(`use std::collections::HashMap;`);
    lines.push(`use serde::{Deserialize, Serialize};`);
    lines.push("");

    const [firstField, secondField] = generator.fields(2);
    lines.push(`#[derive(Debug, Clone, Serialize, Deserialize)]`);
    lines.push(`pub struct ${typeName} {`);
    lines.push(`    pub id: Uuid,`);
    lines.push(`    pub ${firstField.snakeCase}: ${firstField.rust},`);
    lines.push(
      `    pub ${secondField.snakeCase}: Option<${secondField.rust}>,`,
    );
    lines.push(`    pub tags: Vec<String>,`);
    lines.push(`}`);
    lines.push("");

    const comparisonField = firstField.snakeCase;
    lines.push(`impl ${typeName} {`);
    lines.push(`    /// ${generator.comment()}`);
    lines.push(
      `    pub fn ${generator.pick(["matches", "same_as", "supersedes", "overlaps"])}(&self, other: &${typeName}) -> bool {`,
    );
    lines.push(
      `        self.id == other.id && self.${comparisonField} == other.${comparisonField}`,
    );
    lines.push(`    }`);
    lines.push(`}`);
    lines.push("");
    lines.push(
      `pub fn ${functionName}(${collectionName}: &[${typeName}]) -> HashMap<String, Vec<&${typeName}>> {`,
    );
    lines.push(
      `    let mut groups: HashMap<String, Vec<&${typeName}>> = HashMap::new();`,
    );
    lines.push(`    for ${itemName} in ${collectionName} {`);
    lines.push(`        for tag in &${itemName}.tags {`);
    lines.push(
      `            groups.entry(tag.clone()).or_default().push(${itemName});`,
    );
    lines.push(`        }`);
    lines.push(`    }`);
    lines.push(`    groups`);
    lines.push(`}`);
  } else if (variant === 1) {
    lines.push(`use anyhow::{Context, Result};`);
    lines.push(`use tokio::sync::mpsc;`);
    lines.push(`use tracing::{info, warn};`);
    lines.push("");
    lines.push(
      `pub async fn ${functionName}(pool: &PgPool, mut rx: mpsc::Receiver<${typeName}>) -> Result<()> {`,
    );
    lines.push(
      `    let mut buffer = Vec::with_capacity(${generator.pick([64, 128, 256])});`,
    );
    lines.push(`    while let Some(${itemName}) = rx.recv().await {`);
    lines.push(`        buffer.push(${itemName});`);
    lines.push(`        if buffer.len() < buffer.capacity() {`);
    lines.push(`            continue;`);
    lines.push(`        }`);
    lines.push(`        // ${generator.comment()}`);
    lines.push(`        ${generator.snakeFn()}(pool, &buffer)`);
    lines.push(`            .await`);
    lines.push(
      `            .with_context(|| format!("${generator.errorMessage()} ({} items)", buffer.len()))?;`,
    );
    lines.push(
      `        info!(count = buffer.len(), "${generator.infoMessage()}");`,
    );
    lines.push(`        buffer.clear();`);
    lines.push(`    }`);
    lines.push(`    if !buffer.is_empty() {`);
    lines.push(
      `        warn!("flushing {} remaining ${collectionName}", buffer.len());`,
    );
    lines.push(`    }`);
    lines.push(`    Ok(())`);
    lines.push(`}`);
  } else {
    const errorName = pascalCase(generator.noun().singular, "Error");
    lines.push(`#[derive(Debug, thiserror::Error)]`);
    lines.push(`pub enum ${errorName} {`);
    lines.push(
      `    #[error("${generator.fillTemplate("{N} {id} not found")}")]`,
    );
    lines.push(`    NotFound { id: Uuid },`);
    lines.push(`    #[error("${generator.errorMessage()}: {0}")]`);
    lines.push(`    Upstream(#[from] reqwest::Error),`);
    lines.push(
      `    #[error("${generator.fillTemplate("timed out while {Ving} {N}")}")]`,
    );
    lines.push(`    Timeout,`);
    lines.push(`}`);
    lines.push("");

    const [returnField] = generator.sampleDistinct(
      FIELDS.filter((field) => field.name !== "status"),
      1,
    );
    const [successStatus, firstErrorStatus, secondErrorStatus] =
      generator.sampleDistinct(ADJECTIVES, 3);
    lines.push(
      `pub fn ${functionName}(state: &${typeName}) -> Result<${returnField.rust}, ${errorName}> {`,
    );
    lines.push(`    match state.status.as_str() {`);
    lines.push(
      `        "${successStatus}" => Ok(state.${returnField.snakeCase}.clone()),`,
    );
    lines.push(
      `        "${firstErrorStatus}" | "${secondErrorStatus}" => Err(${errorName}::Timeout),`,
    );
    lines.push(`        _ => Err(${errorName}::NotFound { id: state.id }),`);
    lines.push(`    }`);
    lines.push(`}`);
  }

  return lines;
};

const buildGoBlock: CodeBlockBuilder = (generator) => {
  const variant = generator.integer(0, 1);
  const lines: string[] = [];
  const typeName = generator.type();
  const functionName = generator.pascalFn();
  const collectionName = generator.plural();
  const itemName = collectionName
    .replace(/ies$/, "y")
    .replace(/(x|ch)es$/, "$1")
    .replace(/s$/, "");
  const packageName = generator.noun().singular;

  lines.push(`package ${packageName}`);
  lines.push("");

  if (variant === 0) {
    lines.push(`import (`);
    lines.push(`\t"context"`);
    lines.push(`\t"encoding/json"`);
    lines.push(`\t"net/http"`);
    lines.push(`\t"time"`);
    lines.push(`)`);
    lines.push("");

    const goField = generator.pick(
      FIELDS.filter((field) => field.name.length <= 9),
    );
    lines.push(`type ${typeName} struct {`);
    lines.push(`\tID        string    \`json:"id"\``);
    lines.push(
      `\t${capitalize(goField.name).padEnd(9)} ${goField.go.padEnd(9)} \`json:"${goField.snakeCase}"\``,
    );
    lines.push(`\tCreatedAt time.Time \`json:"created_at"\``);
    lines.push(`}`);
    lines.push("");
    lines.push(
      `// ${functionName} ${generator.fillTemplate("{Vs} the {N} for the current request.")}`,
    );
    lines.push(
      `func (s *Server) ${functionName}(w http.ResponseWriter, r *http.Request) {`,
    );
    lines.push(
      `\tctx, cancel := context.WithTimeout(r.Context(), ${generator.pick([2, 5, 10])}*time.Second)`,
    );
    lines.push(`\tdefer cancel()`);
    lines.push("");
    lines.push(
      `\t${collectionName}, err := s.store.${generator.pascalFn()}(ctx, r.URL.Query().Get("${generator.snakeField()}"))`,
    );
    lines.push(`\tif err != nil {`);
    lines.push(
      `\t\thttp.Error(w, "${generator.errorMessage()}", http.StatusInternalServerError)`,
    );
    lines.push(`\t\treturn`);
    lines.push(`\t}`);
    lines.push(`\tw.Header().Set("Content-Type", "application/json")`);
    lines.push(`\t_ = json.NewEncoder(w).Encode(${collectionName})`);
    lines.push(`}`);
  } else {
    lines.push(`import (`);
    lines.push(`\t"context"`);
    lines.push(`\t"fmt"`);
    lines.push(`\t"sync"`);
    lines.push(`)`);
    lines.push("");
    lines.push(`// ${generator.comment()}`);
    lines.push(
      `func ${functionName}(ctx context.Context, ${collectionName} []${typeName}, workers int) error {`,
    );
    lines.push(`\tjobs := make(chan ${typeName})`);
    lines.push(`\terrs := make(chan error, workers)`);
    lines.push(`\tvar wg sync.WaitGroup`);
    lines.push("");
    lines.push(`\tfor i := 0; i < workers; i++ {`);
    lines.push(`\t\twg.Add(1)`);
    lines.push(`\t\tgo func() {`);
    lines.push(`\t\t\tdefer wg.Done()`);

    const verb = generator.verb();
    lines.push(`\t\t\tfor ${itemName} := range jobs {`);
    lines.push(
      `\t\t\t\tif err := ${camelCase(verb.base, itemName)}(ctx, ${itemName}); err != nil {`,
    );
    lines.push(
      `\t\t\t\t\terrs <- fmt.Errorf("${verb.base} ${itemName} %s: %w", ${itemName}.ID, err)`,
    );
    lines.push(`\t\t\t\t}`);
    lines.push(`\t\t\t}`);
    lines.push(`\t\t}()`);
    lines.push(`\t}`);
    lines.push(`\tfor _, ${itemName} := range ${collectionName} {`);
    lines.push(`\t\tjobs <- ${itemName}`);
    lines.push(`\t}`);
    lines.push(`\tclose(jobs)`);
    lines.push(`\twg.Wait()`);
    lines.push(`\tclose(errs)`);
    lines.push(`\treturn <-errs`);
    lines.push(`}`);
  }

  return lines;
};

const buildSqlBlock: CodeBlockBuilder = (generator) => {
  const variant = generator.integer(0, 2);
  const lines: string[] = [];
  const tableName = generator.plural();
  const relatedTableName = generator.plural();
  const relatedId = `${relatedTableName
    .replace(/ies$/, "y")
    .replace(/(x|ch)es$/, "$1")
    .replace(/s$/, "")}_id`;

  if (variant === 0) {
    const [firstField, secondField] = generator.sampleDistinct(
      FIELDS.filter(
        (field) => field.name !== "status" && !field.name.endsWith("Id"),
      ),
      2,
    );
    lines.push(`-- ${generator.comment()}`);
    lines.push(`CREATE TABLE IF NOT EXISTS ${tableName} (`);
    lines.push(`  id           uuid PRIMARY KEY DEFAULT gen_random_uuid(),`);
    lines.push(
      `  ${relatedId.padEnd(12)} uuid NOT NULL REFERENCES ${relatedTableName}(id) ON DELETE CASCADE,`,
    );
    lines.push(
      `  ${firstField.snakeCase.padEnd(12)} ${firstField.sql} NOT NULL,`,
    );
    lines.push(`  ${secondField.snakeCase.padEnd(12)} ${secondField.sql},`);
    lines.push(
      `  status       text NOT NULL CHECK (status IN (${generator
        .sampleDistinct(ADJECTIVES, 3)
        .map((status) => `'${status}'`)
        .join(", ")})),`,
    );
    lines.push(`  created_at   timestamptz NOT NULL DEFAULT now(),`);
    lines.push(`  updated_at   timestamptz NOT NULL DEFAULT now()`);
    lines.push(`);`);
    lines.push("");
    lines.push(
      `CREATE INDEX ${snakeCase(tableName, relatedId, "idx")} ON ${tableName} (${relatedId}, created_at DESC);`,
    );
  } else if (variant === 1) {
    const groupColumn = generator.pick([
      "owner_id",
      "status",
      "source",
      "currency",
      "region",
    ]);
    const averageColumn = generator.pick(["score", "amount", "confidence"]);
    const columnPadding = generator.width >= 64 ? 32 : 0;
    const formatColumn = (expression: string, alias: string) =>
      `  ${expression.padEnd(columnPadding)} AS ${alias},`;

    lines.push(`SELECT`);
    lines.push(formatColumn(`o.${groupColumn}`, groupColumn));
    lines.push(formatColumn("COUNT(t.id)", "total"));
    lines.push(
      formatColumn(
        `AVG(t.${averageColumn})::numeric(8, 3)`,
        `avg_${averageColumn}`,
      ),
    );
    lines.push(`  ${"MAX(t.created_at)".padEnd(columnPadding)} AS last_seen`);
    lines.push(`FROM ${tableName} t`);
    lines.push(`JOIN ${relatedTableName} o ON o.id = t.${relatedId}`);
    lines.push(`WHERE t.status = '${generator.adjective()}'`);
    lines.push(
      `  AND t.created_at > now() - interval '${generator.pick(["7 days", "30 days", "24 hours"])}'`,
    );
    lines.push(`GROUP BY o.${groupColumn}`);
    lines.push(`HAVING COUNT(t.id) > ${generator.integer(1, 20)}`);
    lines.push(`ORDER BY total DESC`);
    lines.push(`LIMIT ${generator.pick([10, 25, 50, 100])};`);
  } else {
    lines.push(`WITH ranked AS (`);
    lines.push(`  SELECT`);
    lines.push(`    id,`);
    lines.push(`    ${relatedId},`);
    lines.push(
      `    ROW_NUMBER() OVER (PARTITION BY ${relatedId} ORDER BY created_at DESC) AS rn`,
    );
    lines.push(`  FROM ${tableName}`);
    lines.push(`  WHERE status <> '${generator.adjective()}'`);
    lines.push(`)`);
    lines.push(`UPDATE ${tableName} t`);
    lines.push(`SET status = '${generator.adjective()}', updated_at = now()`);
    lines.push(`FROM ranked r`);
    lines.push(`WHERE r.id = t.id AND r.rn > ${generator.integer(1, 5)};`);
  }

  return lines;
};

const buildShellBlock: CodeBlockBuilder = (generator) => {
  const variant = generator.integer(0, 2);
  const lines: string[] = [];
  const serviceName = kebabCase(
    "stamp",
    generator.pick(["api", "worker", "web", "agent", "indexer"]),
  );

  if (variant === 0) {
    const verb = generator.verb();
    const noun = generator.noun();
    const branchName = `feat/${kebabCase(verb.base, noun.plural)}`;
    const commitMessage = generator.fillTemplate(
      generator.pick([
        "{V} {Adj} {Ns} in one pass",
        "stop {Ving} {Ns} twice",
        "{V} {Ns} lazily",
        "handle {Adj} {Ns} when {Ving}",
        "speed up {Ving} for large {Ns}",
      ]),
    );
    const changeType = generator.pick(["feat", "fix", "perf", "refactor"]);

    lines.push(`$ git switch -c ${branchName}`);
    lines.push(`$ npm run typecheck && npm run lint`);
    lines.push(
      `$ git commit -am "${changeType}(${noun.plural}): ${commitMessage}"`,
    );
    lines.push(
      `[${branchName} ${generator.hex(7)}] ${changeType}(${noun.plural}): ${commitMessage}`,
    );
    lines.push(
      ` ${generator.integer(2, 9)} files changed, ${generator.integer(20, 400)} insertions(+), ${generator.integer(3, 120)} deletions(-)`,
    );
    lines.push(`$ docker build -t ${serviceName}:${generator.version()} .`);
    lines.push(`$ kubectl -n stamp rollout status deploy/${serviceName}`);
    lines.push(`deployment "${serviceName}" successfully rolled out`);
    lines.push(`$ kubectl -n stamp get pods -l app=${serviceName}`);
    lines.push(
      `NAME                          READY   STATUS    RESTARTS   AGE`,
    );

    for (let index = 0; index < 3; index++) {
      lines.push(
        `${`${serviceName}-${generator.hex(9)}-${generator.hex(5)}`.padEnd(30)}1/1     Running   0          ${generator.integer(2, 59)}m`,
      );
    }
  } else if (variant === 1) {
    const urlVariable = upperSnakeCase(
      generator.pick(["database", "postgres", "redis", "queue"]),
      "url",
    );
    const limitVariable = upperSnakeCase(
      generator.noun().singular,
      "batch_size",
    );

    lines.push(`#!/usr/bin/env bash`);
    lines.push(`set -euo pipefail`);
    lines.push("");
    lines.push(`# ${generator.comment()}`);
    lines.push(
      `export ${urlVariable}="\${${urlVariable}:-postgres://localhost:5432/stamp}"`,
    );
    lines.push(
      `export ${limitVariable}="\${${limitVariable}:-${generator.pick([64, 128, 500])}}"`,
    );
    lines.push("");
    lines.push(`for f in migrations/*.sql; do`);
    lines.push(`  echo "applying $(basename "$f")"`);
    lines.push(`  psql "$${urlVariable}" -v ON_ERROR_STOP=1 -f "$f"`);
    lines.push(`done`);
    lines.push("");
    lines.push(
      `python -m ${generator.snakeFn()} --batch "$${limitVariable}" \\`,
    );
    lines.push(
      `  --since "$(date -u -d '${generator.pick(["1 day", "6 hours", "1 week"])} ago' +%FT%TZ)"`,
    );
    lines.push(`echo "done in \${SECONDS}s"`);
  } else {
    lines.push(`FROM node:22-alpine AS build`);
    lines.push(`WORKDIR /app`);
    lines.push(`COPY package*.json ./`);
    lines.push(`RUN npm ci --ignore-scripts`);
    lines.push(`COPY . .`);
    lines.push(`RUN npm run build`);
    lines.push("");
    lines.push(`FROM node:22-alpine`);
    lines.push(`WORKDIR /app`);
    lines.push(
      `ENV NODE_ENV=production PORT=${generator.pick([3000, 8080, 4000])}`,
    );
    lines.push(`COPY --from=build /app/.next/standalone ./`);
    lines.push(`COPY --from=build /app/public ./public`);
    lines.push(`# ${generator.comment()}`);
    lines.push(`USER node`);
    lines.push(`CMD ["node", "server.js"]`);
  }

  return lines;
};

const buildCppBlock: CodeBlockBuilder = (generator) => {
  const variant = generator.integer(0, 1);
  const lines: string[] = [];
  const typeName = generator.type();
  const functionName = generator.camelFn();
  const collectionName = generator.plural();
  const itemName = collectionName
    .replace(/ies$/, "y")
    .replace(/(x|ch)es$/, "$1")
    .replace(/s$/, "");

  if (variant === 0) {
    lines.push(`#include <algorithm>`);
    lines.push(`#include <optional>`);
    lines.push(`#include <vector>`);
    lines.push("");
    lines.push(
      `#include "hdmap/${snakeCase(generator.noun().singular, generator.pick(["graph", "index", "tile"]))}.h"`,
    );
    lines.push("");
    lines.push(`namespace hdmap {`);
    lines.push("");
    lines.push(`// ${generator.comment()}`);
    lines.push(
      `std::optional<${typeName}> ${functionName}(const std::vector<${typeName}>& ${collectionName}, const Pose& pose) {`,
    );
    lines.push(`  auto best = ${collectionName}.end();`);

    const floatingPointType = generator.pick(CPP_FLOATS);
    lines.push(
      `  ${floatingPointType} bestDist = std::numeric_limits<${floatingPointType}>::max();`,
    );
    lines.push(
      `  for (auto it = ${collectionName}.begin(); it != ${collectionName}.end(); ++it) {`,
    );
    lines.push(
      `    const auto d = it->centerline.distanceTo(pose.position());`,
    );
    lines.push(
      `    if (d < bestDist && it->${generator.pick(["isDrivable", "isActive", "isVisible"])}()) {`,
    );
    lines.push(`      bestDist = d;`);
    lines.push(`      best = it;`);
    lines.push(`    }`);
    lines.push(`  }`);
    lines.push(`  if (best == ${collectionName}.end()) return std::nullopt;`);
    lines.push(`  return *best;`);
    lines.push(`}`);
    lines.push("");
    lines.push(`}  // namespace hdmap`);
  } else {
    lines.push(`#pragma once`);
    lines.push("");
    lines.push(`#include <memory>`);
    lines.push(`#include <string>`);
    lines.push(`#include <unordered_map>`);
    lines.push("");
    lines.push(`template <typename Key, typename Value>`);
    lines.push(`class ${pascalCase(itemName, "Cache")} {`);
    lines.push(` public:`);
    lines.push(
      `  explicit ${pascalCase(itemName, "Cache")}(size_t capacity) : capacity_(capacity) {}`,
    );
    lines.push("");
    lines.push(`  // ${generator.comment()}`);
    lines.push(
      `  std::shared_ptr<Value> ${generator.verb().base}(const Key& key) const {`,
    );
    lines.push(`    auto it = entries_.find(key);`);
    lines.push(`    return it == entries_.end() ? nullptr : it->second;`);
    lines.push(`  }`);
    lines.push("");
    lines.push(
      `  void ${generator.verb().base}(const Key& key, std::shared_ptr<Value> value) {`,
    );
    lines.push(`    if (entries_.size() >= capacity_) evictOldest();`);
    lines.push(`    entries_[key] = std::move(value);`);
    lines.push(`  }`);
    lines.push("");
    lines.push(` private:`);
    lines.push(`  void evictOldest();`);
    lines.push(`  size_t capacity_;`);
    lines.push(`  std::unordered_map<Key, std::shared_ptr<Value>> entries_;`);
    lines.push(`};`);
  }

  return lines;
};

const buildSwiftBlock: CodeBlockBuilder = (generator) => {
  const variant = generator.integer(0, 1);
  const lines: string[] = [];
  const typeName = generator.type();
  const collectionName = generator.plural();
  const itemName = collectionName
    .replace(/ies$/, "y")
    .replace(/(x|ch)es$/, "$1")
    .replace(/s$/, "");

  if (variant === 0) {
    lines.push(`import Foundation`);
    lines.push("");

    const [firstField, secondField, thirdField] = generator.fields(3);
    lines.push(`struct ${typeName}: Codable, Identifiable, Hashable {`);
    lines.push(`    let id: UUID`);
    lines.push(`    let ${firstField.name}: ${firstField.swift}`);
    lines.push(`    let ${secondField.name}: ${secondField.swift}?`);
    lines.push(`    var ${thirdField.name}: ${thirdField.swift}`);
    lines.push(`}`);
    lines.push("");
    lines.push(`actor ${pascalCase(itemName, "Store")} {`);
    lines.push(`    private var ${collectionName}: [UUID: ${typeName}] = [:]`);
    lines.push(`    private let session: URLSession`);
    lines.push("");
    lines.push(
      `    init(session: URLSession = .shared) { self.session = session }`,
    );
    lines.push("");
    lines.push(`    /// ${generator.comment()}`);
    lines.push(
      `    func ${generator.camelFn()}() async throws -> [${typeName}] {`,
    );
    lines.push(
      `        let (data, _) = try await session.data(from: Endpoint.${collectionName}.url)`,
    );
    lines.push(
      `        let decoded = try JSONDecoder().decode([${typeName}].self, from: data)`,
    );

    const sortKey = generator.pick(["createdAt", "score", "priority"]);
    lines.push(
      `        for ${itemName} in decoded { ${collectionName}[${itemName}.id] = ${itemName} }`,
    );
    lines.push(
      `        return decoded.sorted { $0.${sortKey} > $1.${sortKey} }`,
    );
    lines.push(`    }`);
    lines.push(`}`);
  } else {
    const viewName = pascalCase(
      itemName,
      generator.pick(["Row", "Card", "DetailView"]),
    );
    lines.push(`import SwiftUI`);
    lines.push("");
    lines.push(`struct ${viewName}: View {`);
    lines.push(`    let ${itemName}: ${typeName}`);
    lines.push(`    @State private var expanded = false`);
    lines.push("");
    lines.push(`    var body: some View {`);
    lines.push(`        VStack(alignment: .leading, spacing: 6) {`);
    lines.push(
      `            Text(${itemName}.${generator.pick(["subject", "title", "name"])})`,
    );
    lines.push(`                .font(.headline)`);
    lines.push(
      `            Text(${itemName}.${generator.pick(["createdAt", "startsAt"])}, style: .relative)`,
    );
    lines.push(`                .font(.caption)`);
    lines.push(`                .foregroundStyle(.secondary)`);
    lines.push(`            if expanded {`);
    lines.push(
      `                Text(${itemName}.${generator.pick(["body", "summary"])}).lineLimit(${generator.integer(2, 6)})`,
    );
    lines.push(`            }`);
    lines.push(`        }`);
    lines.push(`        .padding(${generator.pick([12, 14, 16])})`);
    lines.push(
      `        .background(.background, in: RoundedRectangle(cornerRadius: ${generator.pick([12, 14, 16])}))`,
    );
    lines.push(
      `        .onTapGesture { withAnimation(.snappy) { expanded.toggle() } }`,
    );
    lines.push(`    }`);
    lines.push(`}`);
  }

  return lines;
};

const buildYamlBlock: CodeBlockBuilder = (generator) => {
  const variant = generator.integer(0, 1);
  const lines: string[] = [];
  const serviceName = kebabCase(
    "stamp",
    generator.pick(["api", "worker", "web", "agent", "indexer"]),
  );

  if (variant === 0) {
    lines.push(`apiVersion: apps/v1`);
    lines.push(`kind: Deployment`);
    lines.push(`metadata:`);
    lines.push(`  name: ${serviceName}`);
    lines.push(`  namespace: stamp`);
    lines.push(`spec:`);
    lines.push(`  replicas: ${generator.pick([2, 3, 4, 6])}`);
    lines.push(`  selector:`);
    lines.push(`    matchLabels: { app: ${serviceName} }`);
    lines.push(`  template:`);
    lines.push(`    spec:`);
    lines.push(`      containers:`);
    lines.push(`        - name: ${serviceName}`);
    lines.push(
      `          image: ghcr.io/stamp/${serviceName}:${generator.version()}`,
    );
    lines.push(
      `          ports: [{ containerPort: ${generator.pick([3000, 8080, 4000])} }]`,
    );
    lines.push(`          resources:`);
    lines.push(
      `            requests: { cpu: "${generator.pick([250, 500])}m", memory: "${generator.pick([256, 512])}Mi" }`,
    );
    lines.push(
      `            limits: { cpu: "${generator.pick([1, 2])}", memory: "${generator.pick([1, 2])}Gi" }`,
    );
    lines.push(`          env:`);
    lines.push(
      `            - name: ${upperSnakeCase(generator.noun().singular, "url")}`,
    );
    lines.push(
      `              valueFrom: { secretKeyRef: { name: ${serviceName}-secrets, key: ${kebabCase(generator.noun().singular, "url")} } }`,
    );
  } else {
    lines.push(`name: ci`);
    lines.push(`on:`);
    lines.push(`  push: { branches: [main] }`);
    lines.push(`  pull_request:`);
    lines.push(`jobs:`);
    lines.push(`  test:`);
    lines.push(`    runs-on: ubuntu-latest`);
    lines.push(`    steps:`);
    lines.push(`      - uses: actions/checkout@v4`);
    lines.push(`      - uses: actions/setup-node@v4`);
    lines.push(`        with: { node-version: 22, cache: npm }`);
    lines.push(`      - run: npm ci`);
    lines.push(`      - run: npm run typecheck`);
    lines.push(`      - run: npm run lint`);
    lines.push(`      # ${generator.comment()}`);
    lines.push(
      `      - run: npm test -- --shard=\${{ matrix.shard }}/${generator.pick([2, 3, 4])}`,
    );
  }

  return lines;
};

const buildJsonBlock: CodeBlockBuilder = (generator) => {
  const lines: string[] = [];
  const itemName = generator.noun().singular;
  const senderName = generator.name();

  lines.push(`{`);
  lines.push(`  "id": "${itemName}_${generator.hex(12)}",`);
  lines.push(`  "object": "${itemName}",`);
  lines.push(`  "status": "${generator.adjective()}",`);
  lines.push(`  "subject": "${generator.pick(SUBJECTS)}",`);
  lines.push(
    `  "from": { "name": "${senderName}", "address": "${senderName.toLowerCase()}@example.com" },`,
  );
  lines.push(`  "score": ${(0.4 + generator.random() * 0.59).toFixed(3)},`);
  lines.push(
    `  "labels": [${generator
      .sampleDistinct(ADJECTIVES, 2)
      .map((adjective) => `"${adjective}"`)
      .join(", ")}],`,
  );
  lines.push(
    `  "created_at": "2025-${String(generator.integer(1, 12)).padStart(2, "0")}-${String(generator.integer(1, 28)).padStart(2, "0")}T${String(generator.integer(0, 23)).padStart(2, "0")}:${String(generator.integer(0, 59)).padStart(2, "0")}:00Z",`,
  );
  lines.push(
    `  "metadata": { "source": "${generator.pick(["imap", "gmail", "graph", "webhook"])}", "retries": ${generator.integer(0, 3)} }`,
  );
  lines.push(`}`);

  return lines;
};

const buildBiographyBlock: CodeBlockBuilder = () => [
  "// archit.ts — hello, world",
  'import { Founder, Engineer } from "@stamp/core";',
  "",
  "export const archit: Founder & Engineer = {",
  '  name: "Archit Mehta",',
  '  role: "CEO @ Stamp (YC W25)",',
  '  education: "CS + Applied Math @ Cornell",',
  '  previously: ["Stripe", "Apple", "Johnson & Johnson"],',
  '  interests: ["AGI", "LLMs", "agents", "computer vision"],',
  "  building: () => new AISecretary({ triage: true, write: true, learn: true }),",
  "};",
  "",
  "while (true) {",
  "  learn();",
  "  build();",
  "  ship();",
  "}",
  "",
  "export default archit;",
];

const CODE_BLOCK_BUILDERS: readonly {
  builder: CodeBlockBuilder;
  weight: number;
}[] = [
  { builder: buildTypescriptBlock, weight: 5 },
  { builder: buildPythonBlock, weight: 4 },
  { builder: buildRustBlock, weight: 3 },
  { builder: buildGoBlock, weight: 2 },
  { builder: buildSqlBlock, weight: 3 },
  { builder: buildShellBlock, weight: 3 },
  { builder: buildCppBlock, weight: 2 },
  { builder: buildSwiftBlock, weight: 2 },
  { builder: buildYamlBlock, weight: 2 },
  { builder: buildJsonBlock, weight: 1 },
];

const TAB_SPACES = "    ";

function wrapCodeLine(line: string, width: number): string[] {
  const expandedLine = line.replaceAll("\t", TAB_SPACES);
  if (expandedLine.length <= width) return [expandedLine];

  const indentation = expandedLine.match(/^\s*/)?.[0].length ?? 0;
  const continuationIndent = " ".repeat(
    Math.min(indentation + 4, Math.floor(width / 2)),
  );
  const wrappedLines: string[] = [];
  let remainingLine = expandedLine;
  let isFirstLine = true;

  while (remainingLine.length > width) {
    let cutIndex = remainingLine.lastIndexOf(" ", width);

    if (
      cutIndex <=
      (isFirstLine ? indentation : continuationIndent.length) + 8
    ) {
      cutIndex = width;
    }

    wrappedLines.push(remainingLine.slice(0, cutIndex).trimEnd());
    remainingLine =
      continuationIndent + remainingLine.slice(cutIndex).trimStart();
    isFirstLine = false;
  }

  wrappedLines.push(remainingLine);

  return wrappedLines;
}

export interface GenerateOptions {
  width: number;
  minimumLines: number;
  includeSignature?: boolean;
  compact?: boolean;
}

function tightenIndentation(line: string): string {
  return line.replace(/^ +/, (indentation) =>
    " ".repeat(Math.min(6, Math.ceil(indentation.length / 2))),
  );
}

/** Produces deterministic code while avoiding consecutive language repeats. */
export function generateCode(seed: number, options: GenerateOptions): string[] {
  const {
    width,
    minimumLines,
    includeSignature = false,
    compact = false,
  } = options;
  const generator = new CodeGenerator(createRandomNumberGenerator(seed), width);
  const lines: string[] = [];
  const totalWeight = CODE_BLOCK_BUILDERS.reduce(
    (sum, entry) => sum + entry.weight,
    0,
  );
  let previousBuilder: CodeBlockBuilder | null = null;
  let signatureIndex = includeSignature ? generator.integer(0, 2) : -1;
  let blockIndex = 0;

  while (lines.length < minimumLines) {
    let selectedBuilder: CodeBlockBuilder;

    if (blockIndex === signatureIndex) {
      selectedBuilder = buildBiographyBlock;
      signatureIndex = -1;
    } else {
      let remainingWeight = generator.random() * totalWeight;
      selectedBuilder = CODE_BLOCK_BUILDERS[0].builder;

      for (const entry of CODE_BLOCK_BUILDERS) {
        remainingWeight -= entry.weight;

        if (remainingWeight <= 0) {
          selectedBuilder = entry.builder;
          break;
        }
      }

      if (selectedBuilder === previousBuilder) continue;
    }

    previousBuilder = selectedBuilder;
    blockIndex++;

    for (const rawLine of selectedBuilder(generator)) {
      for (const wrappedLine of wrapCodeLine(rawLine, width)) {
        if (compact) {
          if (!wrappedLine.trim()) continue;
          lines.push(tightenIndentation(wrappedLine));
        } else {
          lines.push(wrappedLine);
        }
      }
    }

    if (!compact) {
      const gapLineCount = generator.integer(1, 2);

      for (let index = 0; index < gapLineCount; index++) {
        lines.push("");
      }
    }
  }

  return lines;
}
