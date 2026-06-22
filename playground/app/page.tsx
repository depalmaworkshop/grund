import {
  color,
  typography,
  spacing,
  sizing,
  breakpoints,
  radius,
  prominence,
  motion,
  zIndex,
  fluid,
  iconography,
  toast,
  modal,
  button,
  input,
  select,
  generated,
  generatedStatus,
} from "@grund/tokens";
import {
  TokenSection,
  StatusLegend,
  summarize,
  type Visual,
  type StatusMap,
  type Counts,
} from "./_components/TokenView";
import { SchemeToggle } from "./_components/SchemeToggle";
import { ButtonShowcase } from "./_components/ButtonShowcase";
import { OptionsPopoverDemo } from "./_components/OptionsPopoverDemo";

type Section = {
  title: string;
  data: unknown;
  visual?: Visual;
  note?: string;
  basePath?: string[];
};

// The DTCG substrate output (generated from tokens/*.json via Style Dictionary)
// — the first slice on the new pipeline: the popover seed. basePath aligns each
// slice with the dotted keys in generatedStatus.
const GENERATED_SECTIONS: Section[] = [
  { title: "Colour", data: generated.color, visual: "color", basePath: ["color"] },
  { title: "Spacing", data: generated.space, visual: "spacing", basePath: ["space"] },
  { title: "Radius", data: generated.radius, visual: "radius", basePath: ["radius"] },
  { title: "Type & elevation", data: { font: generated.font, shadow: generated.shadow } },
  { title: "Popover component tokens", data: generated.popover, basePath: ["popover"] },
  { title: "Button component tokens", data: generated.button, basePath: ["button"] },
];

// Foundations + component token groups, in the order they appear in tokens.ts.
const SECTIONS: Section[] = [
  { title: "Color", data: color, visual: "color" },
  { title: "Typography", data: typography },
  { title: "Spacing", data: spacing, visual: "spacing" },
  { title: "Sizing", data: sizing },
  { title: "Breakpoints", data: breakpoints },
  { title: "Radius", data: radius, visual: "radius" },
  { title: "Prominence (shadows / elevation)", data: prominence },
  { title: "Motion", data: motion },
  { title: "Z-Index", data: zIndex },
  { title: "Fluid", data: fluid },
  { title: "Iconography", data: iconography },
];

const COMPONENT_SECTIONS: Section[] = [
  { title: "Toast", data: toast },
  { title: "Modal", data: modal },
  { title: "Button", data: button },
  { title: "Input", data: input },
  { title: "Select", data: select },
];

function sumCounts(sections: Section[], statusMap?: StatusMap): Counts {
  return sections.reduce<Counts>(
    (acc, s) => {
      const c = summarize(s.data, statusMap, s.basePath ?? []);
      return {
        total: acc.total + c.total,
        set: acc.set + c.set,
        candidate: acc.candidate + c.candidate,
        placeholder: acc.placeholder + c.placeholder,
        todo: acc.todo + c.todo,
        draft: acc.draft + c.draft,
      };
    },
    { total: 0, set: 0, candidate: 0, placeholder: 0, todo: 0, draft: 0 }
  );
}

export default function Page() {
  const gen = sumCounts(GENERATED_SECTIONS, generatedStatus as StatusMap);
  const hand = sumCounts([...SECTIONS, ...COMPONENT_SECTIONS]);
  const total = gen.total + hand.total;
  const defined =
    gen.set + gen.candidate + gen.placeholder + hand.set + hand.candidate + hand.placeholder;

  return (
    <main className="mx-auto max-w-4xl px-6 py-12">
      <header className="mb-8 border-b border-border pb-8">
        <div className="mb-2 flex items-start justify-between gap-4">
          <p className="text-[13px] font-medium uppercase tracking-widest text-muted">
            Grund · Design System
          </p>
          <SchemeToggle />
        </div>
        <h1 className="text-3xl font-bold tracking-tight">Token Gallery</h1>
        <p className="mt-3 max-w-2xl text-muted">
          A live render of the tokens in <code className="font-mono text-[13px]">src/tokens.ts</code>{" "}
          and the generated DTCG substrate. Each token carries a status so the
          maturity of the system is visible at a glance.
        </p>
        <p className="mt-4 text-sm">
          <span className="font-semibold">{defined}</span> of{" "}
          <span className="font-semibold">{total}</span> tokens carry a value ·{" "}
          <span className="font-semibold text-amber-600 dark:text-amber-400">
            {total - defined} still TODO
          </span>
        </p>
        <div className="mt-5">
          <StatusLegend />
        </div>
      </header>

      <SectionGroup
        label="DTCG substrate (generated)"
        sections={GENERATED_SECTIONS}
        statusMap={generatedStatus as StatusMap}
        note="Generated from tokens/*.json by Style Dictionary → src/tokens.css (--gds-* vars, light + dark) + src/tokens.generated.ts. The popover + button slots are now populated — colours as candidate (harvested from the live sites, under review), convergent structural values as set. Everything below is still hand-authored, migrating one category at a time."
      />

      <SectionGroup label="Foundations (hand-authored)" sections={SECTIONS} />

      <SectionGroup
        label="Component tokens (hand-authored)"
        sections={COMPONENT_SECTIONS}
        note="Component-layer token sets. These reference foundation/semantic values."
      />

      <div className="mt-12">
        <h2 className="mb-1 text-xl font-bold tracking-tight">Components</h2>
        <p className="mb-4 text-[13px] text-muted">
          Real React components consuming the <code className="font-mono">--gds-*</code>{" "}
          tokens. Try the colour-scheme toggle — they move with it.
        </p>
        <ShowcaseCard>
          <ButtonShowcase />
        </ShowcaseCard>
      </div>

      <div className="mt-12">
        <h2 className="mb-1 text-xl font-bold tracking-tight">Patterns</h2>
        <p className="mb-4 text-[13px] text-muted">
          Content-less compositions. The Share / options-popover Pattern: a ghost
          Button trigger opens a floating, dismissable menu of option rows.
        </p>
        <ShowcaseCard>
          <OptionsPopoverDemo />
        </ShowcaseCard>
      </div>
    </main>
  );
}

function SectionGroup({
  label,
  sections,
  note,
  statusMap,
}: {
  label: string;
  sections: Section[];
  note?: string;
  statusMap?: StatusMap;
}) {
  return (
    <div className="mt-12 first:mt-0">
      <h2 className="mb-1 text-xl font-bold tracking-tight">{label}</h2>
      {note && <p className="mb-4 text-[13px] text-muted">{note}</p>}
      <div className="mt-4 grid gap-5">
        {sections.map((s) => (
          <TokenSection
            key={s.title}
            title={s.title}
            data={s.data}
            visual={s.visual}
            note={s.note}
            statusMap={statusMap}
            basePath={s.basePath}
          />
        ))}
      </div>
    </div>
  );
}

function ShowcaseCard({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-border bg-surface/40 p-5">{children}</div>
  );
}
