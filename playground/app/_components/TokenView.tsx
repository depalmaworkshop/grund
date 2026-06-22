import type { ReactNode } from "react";

// -----------------------------------------------------------------------------
// Value classification — tokens.ts mixes raw values, [value, css-var] tuples,
// Tailwind class strings, nested objects, and 'TODO' placeholders. These helpers
// let the gallery render every shape truthfully.
// -----------------------------------------------------------------------------

export type Visual = "color" | "spacing" | "radius" | "none";

const isTodo = (v: unknown): boolean => v === "TODO";
const isHex = (v: unknown): v is string =>
  typeof v === "string" && /^#([0-9a-f]{3,8})$/i.test(v);
const isLength = (v: unknown): v is string =>
  typeof v === "string" && /^-?\d*\.?\d+(px|rem|em|%)$/.test(v);

// First length-like entry in a tuple, e.g. ['0.5rem', 'var(--gds-radius-lg)'].
const firstLength = (arr: readonly unknown[]): string | undefined =>
  arr.find((x): x is string => isLength(x));

// -----------------------------------------------------------------------------
// Counting (for the per-section status line + the page-level TODO summary)
// -----------------------------------------------------------------------------

export type Count = { total: number; todo: number };

export function countLeaves(value: unknown): Count {
  if (value === null || value === undefined) return { total: 1, todo: 0 };
  if (Array.isArray(value)) return { total: 1, todo: isTodo(value[0]) ? 1 : 0 };
  if (typeof value === "object") {
    return Object.values(value as Record<string, unknown>).reduce<Count>(
      (acc, v) => {
        const c = countLeaves(v);
        return { total: acc.total + c.total, todo: acc.todo + c.todo };
      },
      { total: 0, todo: 0 }
    );
  }
  return { total: 1, todo: isTodo(value) ? 1 : 0 };
}

// -----------------------------------------------------------------------------
// Small visual atoms
// -----------------------------------------------------------------------------

function TodoBadge() {
  return (
    <span className="rounded-full bg-amber-100 px-2 py-0.5 text-[11px] font-medium text-amber-700 dark:bg-amber-500/15 dark:text-amber-400">
      TODO
    </span>
  );
}

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
        <span className="inline-flex items-center gap-2 align-middle">
          <span
            aria-hidden
            className="inline-block h-3 shrink-0 rounded-sm bg-sky-400/70"
            style={{ width: `min(${len}, 320px)` }}
          />
        </span>
      );
  }
  return null;
}

// -----------------------------------------------------------------------------
// Render a single leaf value (string / number / tuple)
// -----------------------------------------------------------------------------

function LeafValue({ value, visual }: { value: unknown; visual: Visual }) {
  if (isTodo(value) || (Array.isArray(value) && isTodo(value[0])))
    return <TodoBadge />;

  const text = Array.isArray(value)
    ? value.map((v) => String(v)).join("  ·  ")
    : String(value);

  return (
    <span className="flex items-center gap-2.5">
      <Preview value={value} visual={visual} />
      <Mono>{text}</Mono>
    </span>
  );
}

// -----------------------------------------------------------------------------
// Recursive token tree
// -----------------------------------------------------------------------------

const isLeaf = (v: unknown): boolean =>
  v === null ||
  typeof v !== "object" ||
  Array.isArray(v); // tuples are treated as leaves

export function TokenNode({
  data,
  visual,
  depth = 0,
}: {
  data: unknown;
  visual: Visual;
  depth?: number;
}) {
  if (isLeaf(data)) return <LeafValue value={data} visual={visual} />;

  const entries = Object.entries(data as Record<string, unknown>);

  return (
    <div className={depth === 0 ? "" : "mt-1"}>
      {entries.map(([key, value]) => {
        if (isLeaf(value)) {
          return (
            <div
              key={key}
              className="flex items-baseline justify-between gap-4 border-b border-border/60 py-1.5 last:border-0"
            >
              <span className="font-mono text-[13px] text-muted">{key}</span>
              <LeafValue value={value} visual={visual} />
            </div>
          );
        }
        return (
          <div key={key} className="mt-3">
            <div className="mb-1 text-[12px] font-semibold uppercase tracking-wide text-muted">
              {key}
            </div>
            <div className="border-l-2 border-border pl-3">
              <TokenNode data={value} visual={visual} depth={depth + 1} />
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
}: {
  title: string;
  note?: string;
  data: unknown;
  visual?: Visual;
}) {
  const { total, todo } = countLeaves(data);
  return (
    <section className="rounded-xl border border-border bg-surface/40 p-5">
      <header className="mb-3 flex items-baseline justify-between gap-4">
        <h2 className="text-lg font-semibold">{title}</h2>
        <span className="shrink-0 text-[12px] text-muted">
          {todo > 0 ? (
            <>
              {total - todo}/{total} defined ·{" "}
              <span className="text-amber-600 dark:text-amber-400">
                {todo} TODO
              </span>
            </>
          ) : (
            <>{total} defined</>
          )}
        </span>
      </header>
      {note && <p className="mb-3 text-[13px] text-muted">{note}</p>}
      <TokenNode data={data} visual={visual} />
    </section>
  );
}
