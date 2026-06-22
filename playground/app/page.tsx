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
} from "@grund/tokens";
import { TokenSection, countLeaves, type Visual } from "./_components/TokenView";

// Foundations + component token groups, in the order they appear in tokens.ts.
const SECTIONS: {
  title: string;
  data: unknown;
  visual?: Visual;
  note?: string;
}[] = [
  { title: "Color", data: color, visual: "color", note: "Primitive palette is real (slate + Tailwind bases); brand colours and several semantic roles are TODO." },
  { title: "Typography", data: typography },
  { title: "Spacing", data: spacing, visual: "spacing", note: "Full Tailwind scale — [rem, px, css-var]." },
  { title: "Sizing", data: sizing },
  { title: "Breakpoints", data: breakpoints },
  { title: "Radius", data: radius, visual: "radius" },
  { title: "Prominence (shadows / elevation)", data: prominence },
  { title: "Motion", data: motion },
  { title: "Z-Index", data: zIndex },
  { title: "Fluid", data: fluid },
  { title: "Iconography", data: iconography },
];

const COMPONENT_SECTIONS: { title: string; data: unknown }[] = [
  { title: "Toast", data: toast },
  { title: "Modal", data: modal },
  { title: "Button", data: button },
  { title: "Input", data: input },
  { title: "Select", data: select },
];

function totalTodos(groups: { data: unknown }[]) {
  return groups.reduce(
    (acc, g) => {
      const c = countLeaves(g.data);
      return { total: acc.total + c.total, todo: acc.todo + c.todo };
    },
    { total: 0, todo: 0 }
  );
}

export default function Page() {
  const all = [...SECTIONS, ...COMPONENT_SECTIONS];
  const { total, todo } = totalTodos(all);

  return (
    <main className="mx-auto max-w-4xl px-6 py-12">
      <header className="mb-10 border-b border-border pb-8">
        <p className="mb-2 text-[13px] font-medium uppercase tracking-widest text-muted">
          Grund · Design System
        </p>
        <h1 className="text-3xl font-bold tracking-tight">Token Gallery</h1>
        <p className="mt-3 max-w-2xl text-muted">
          A live render of the current tokens in <code className="font-mono text-[13px]">src/tokens.ts</code>.
          What&rsquo;s defined vs. still a placeholder, straight from source — the
          front door for the Grund design system.
        </p>
        <p className="mt-4 text-sm">
          <span className="font-semibold">{total - todo}</span> of{" "}
          <span className="font-semibold">{total}</span> token values defined ·{" "}
          <span className="font-semibold text-amber-600 dark:text-amber-400">
            {todo} remaining (TODO)
          </span>
        </p>
      </header>

      <SectionGroup label="Foundations" sections={SECTIONS} />

      <SectionGroup
        label="Component tokens"
        sections={COMPONENT_SECTIONS}
        note="Component-layer token sets. These reference foundation/semantic values."
      />

      {/* Stub homes for the layers Grund will grow into. */}
      <div className="mt-12">
        <h2 className="mb-4 text-xl font-bold tracking-tight">Components</h2>
        <StubCard>
          Real React components (Button first) will render here once built — the
          interactive counterpart to the component tokens above.
        </StubCard>
      </div>

      <div className="mt-12">
        <h2 className="mb-4 text-xl font-bold tracking-tight">Patterns</h2>
        <StubCard>
          Content-less compositions (the Share / options-popover Pattern first)
          will be exercised here once built.
        </StubCard>
      </div>
    </main>
  );
}

function SectionGroup({
  label,
  sections,
  note,
}: {
  label: string;
  sections: { title: string; data: unknown; visual?: Visual; note?: string }[];
  note?: string;
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
          />
        ))}
      </div>
    </div>
  );
}

function StubCard({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-dashed border-border bg-surface/30 p-5 text-sm text-muted">
      {children}
    </div>
  );
}
