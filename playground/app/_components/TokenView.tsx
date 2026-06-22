import type { ReactNode } from "react";

// -----------------------------------------------------------------------------
// Value classification — tokens.ts mixes raw values, [value, css-var] tuples,
// Tailwind class strings, nested objects, and 'TODO' placeholders. The generated
// DTCG tokens add resolved strings. These helpers let the gallery render every
// shape truthfully and label each token's maturity on two axes.
// -----------------------------------------------------------------------------

export type Visual = "color" | "spacing" | "radius" | "none";

// Two dimensions of maturity:
//   token — is the slot itself decided?   confirmed | draft
//   value — is the value defined?          set | placeholder | todo
export type TokenStatus = "confirmed" | "draft";
export type ValueStatus = "set" | "placeholder" | "todo";
export type Status = { token: TokenStatus; value: ValueStatus };
export type StatusMap = Record<string, Status>;

const isTodo = (v: unknown): boolean => v === "TODO";
const isHex = (v: unknown): v is string =>
  typeof v === "string" && /^#([0-9a-f]{3,8})$/i.test(v);
const isLength = (v: unknown): v is string =>
  typeof v === "string" && /^-?\d*\.?\d+(px|rem|em|%)$/.test(v);
const firstLength = (arr: readonly unknown[]): string | undefined =>
  arr.find((x): x is string => isLength(x));

const isLeaf = (v: unknown): boolean =>
  v === null || typeof v !== "object" || Array.isArray(v);

// Explicit status from the generated map, else derived. Derivation is
// deliberately conservative: a `TODO` literal is `todo`; ANY other hand-authored
// value is `placeholder` (it exists but hasn't been confirmed). `set` is never
// derived — a value is only SET when a token explicitly says so.
function leafStatus(
  path: string[],
  value: unknown,
  statusMap?: StatusMap
): Status {
  const explicit = statusMap?.[path.join(".")];
  if (explicit) return explicit;
  const todo = isTodo(value) || (Array.isArray(value) && isTodo(value[0]));
  return { token: "confirmed", value: todo ? "todo" : "placeholder" };
}

// -----------------------------------------------------------------------------
// Counting (per-section header + page summary)
// -----------------------------------------------------------------------------

export type Counts = {
  total: number;
  set: number;
  placeholder: number;
  todo: number;
  draft: number;
};

export function summarize(
  value: unknown,
  statusMap?: StatusMap,
  path: string[] = []
): Counts {
  if (isLeaf(value)) {
    const s = leafStatus(path, value, statusMap);
    return {
      total: 1,
      set: s.value === "set" ? 1 : 0,
      placeholder: s.value === "placeholder" ? 1 : 0,
      todo: s.value === "todo" ? 1 : 0,
      draft: s.token === "draft" ? 1 : 0,
    };
  }
  return Object.entries(value as Record<string, unknown>).reduce<Counts>(
    (acc, [k, v]) => {
      const c = summarize(v, statusMap, [...path, k]);
      return {
        total: acc.total + c.total,
        set: acc.set + c.set,
        placeholder: acc.placeholder + c.placeholder,
        todo: acc.todo + c.todo,
        draft: acc.draft + c.draft,
      };
    },
    { total: 0, set: 0, placeholder: 0, todo: 0, draft: 0 }
  );
}

// -----------------------------------------------------------------------------
// Status atoms + legend
// -----------------------------------------------------------------------------

const VALUE_STYLE: Record<ValueStatus, string> = {
  set: "bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-600/20 dark:bg-emerald-500/10 dark:text-emerald-400 dark:ring-emerald-400/20",
  placeholder: "bg-sky-100 text-sky-700 dark:bg-sky-500/15 dark:text-sky-400",
  todo: "bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-400",
};

function ValuePill({ status }: { status: ValueStatus }) {
  return (
    <span
      className={`rounded-full px-2 py-0.5 text-[11px] font-medium ${VALUE_STYLE[status]}`}
    >
      {status.toUpperCase()}
    </span>
  );
}

// Token (slot) status as a lowercase tag — distinct in case + style from the
// UPPERCASE value pill, so the two axes read as two.
const TOKEN_STYLE: Record<TokenStatus, string> = {
  confirmed: "bg-slate-200 text-slate-700 dark:bg-slate-700/60 dark:text-slate-200",
  draft: "bg-violet-100 text-violet-700 dark:bg-violet-500/15 dark:text-violet-300",
};

function TokenTag({ token }: { token: TokenStatus }) {
  return (
    <span
      className={`rounded px-1.5 py-0.5 text-[10px] font-medium lowercase ${TOKEN_STYLE[token]}`}
    >
      {token}
    </span>
  );
}

export function StatusLegend() {
  return (
    <div className="space-y-2 text-[13px] text-muted">
      <div className="flex flex-wrap items-center gap-x-5 gap-y-1">
        <span className="font-medium text-foreground/70">Token (the slot)</span>
        <span className="flex items-center gap-2">
          <TokenTag token="confirmed" /> slot decided
        </span>
        <span className="flex items-center gap-2">
          <TokenTag token="draft" /> slot still tentative
        </span>
      </div>
      <div className="flex flex-wrap items-center gap-x-5 gap-y-1">
        <span className="font-medium text-foreground/70">Value</span>
        <span className="flex items-center gap-2">
          <ValuePill status="set" /> confirmed / final
        </span>
        <span className="flex items-center gap-2">
          <ValuePill status="placeholder" /> provisional, will change
        </span>
        <span className="flex items-center gap-2">
          <ValuePill status="todo" /> not yet defined
        </span>
      </div>
    </div>
  );
}

function StatusCounts({ counts }: { counts: Counts }) {
  const parts: string[] = [];
  if (counts.set) parts.push(`${counts.set} set`);
  if (counts.placeholder) parts.push(`${counts.placeholder} placeholder`);
  if (counts.todo) parts.push(`${counts.todo} todo`);
  if (counts.draft) parts.push(`${counts.draft} draft`);
  return (
    <span className="shrink-0 text-[12px] text-muted">{parts.join(" · ")}</span>
  );
}

// -----------------------------------------------------------------------------
// Value rendering
// -----------------------------------------------------------------------------

function Mono({ children }: { children: ReactNode }) {
  return (
    <code className="font-mono text-[13px] text-foreground/80">{children}</code>
  );
}

function Preview({ value, visual }: { value: unknown; visual: Visual }) {
  if (visual === "color" && isHex(value)) {
    return (
      <span
        aria-hidden
        className="inline-block size-5 shrink-0 rounded border border-border align-middle"
        style={{ background: value }}
      />
    );
  }
  if (visual === "radius") {
    const len = Array.isArray(value) ? firstLength(value) : isLength(value) ? value : undefined;
    if (len)
      return (
        <span
          aria-hidden
          className="inline-block size-7 shrink-0 border-2 border-foreground/40 bg-foreground/5 align-middle"
          style={{ borderRadius: len }}
        />
      );
  }
  if (visual === "spacing") {
    const len = Array.isArray(value) ? firstLength(value) : isLength(value) ? value : undefined;
    if (len)
      return (
        <span
          aria-hidden
          className="inline-block h-3 shrink-0 rounded-sm bg-sky-400/70 align-middle"
          style={{ width: `min(${len}, 320px)` }}
        />
      );
  }
  return null;
}

function LeafValue({
  path,
  value,
  visual,
  statusMap,
}: {
  path: string[];
  value: unknown;
  visual: Visual;
  statusMap?: StatusMap;
}) {
  const status = leafStatus(path, value, statusMap);
  const hasValue = status.value !== "todo";
  const text = Array.isArray(value)
    ? value.map((v) => String(v)).join("  ·  ")
    : String(value);

  return (
    <span className="flex items-center gap-2.5">
      {hasValue && (
        <>
          <Preview value={value} visual={visual} />
          <Mono>{text}</Mono>
        </>
      )}
      <TokenTag token={status.token} />
      <ValuePill status={status.value} />
    </span>
  );
}

// -----------------------------------------------------------------------------
// Recursive token tree
// -----------------------------------------------------------------------------

export function TokenNode({
  data,
  visual,
  statusMap,
  path = [],
  depth = 0,
}: {
  data: unknown;
  visual: Visual;
  statusMap?: StatusMap;
  path?: string[];
  depth?: number;
}) {
  if (isLeaf(data))
    return <LeafValue path={path} value={data} visual={visual} statusMap={statusMap} />;

  const entries = Object.entries(data as Record<string, unknown>);

  return (
    <div className={depth === 0 ? "" : "mt-1"}>
      {entries.map(([key, value]) => {
        const childPath = [...path, key];
        if (isLeaf(value)) {
          return (
            <div
              key={key}
              className="flex items-baseline justify-between gap-4 border-b border-border/60 py-1.5 last:border-0"
            >
              <span className="font-mono text-[13px] text-muted">{key}</span>
              <LeafValue path={childPath} value={value} visual={visual} statusMap={statusMap} />
            </div>
          );
        }
        return (
          <div key={key} className="mt-3">
            <div className="mb-1 text-[12px] font-semibold uppercase tracking-wide text-muted">
              {key}
            </div>
            <div className="border-l-2 border-border pl-3">
              <TokenNode
                data={value}
                visual={visual}
                statusMap={statusMap}
                path={childPath}
                depth={depth + 1}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}

// -----------------------------------------------------------------------------
// Section card
// -----------------------------------------------------------------------------

export function TokenSection({
  title,
  note,
  data,
  visual = "none",
  statusMap,
  basePath = [],
}: {
  title: string;
  note?: string;
  data: unknown;
  visual?: Visual;
  statusMap?: StatusMap;
  basePath?: string[];
}) {
  const counts = summarize(data, statusMap, basePath);
  return (
    <section className="rounded-xl border border-border bg-surface/40 p-5">
      <header className="mb-3 flex items-baseline justify-between gap-4">
        <h2 className="text-lg font-semibold">{title}</h2>
        <StatusCounts counts={counts} />
      </header>
      {note && <p className="mb-3 text-[13px] text-muted">{note}</p>}
      <TokenNode data={data} visual={visual} statusMap={statusMap} path={basePath} />
    </section>
  );
}
