import ButtonLink from "./components/ui/ButtonLink";
import CopyEmailButton from "./components/ui/CopyEmailButton";
import { Kbd, SectionHeader, Tag } from "./components/ui/primitives";

// Phase 1: temporary design-system preview. Replaced by the real home page in Phase 2.
const swatches = [
  ["bg", "Background"],
  ["surface", "Surface"],
  ["ink", "Ink"],
  ["muted", "Muted"],
  ["line", "Line"],
  ["accent", "Accent"],
  ["accent-ink", "Accent text"],
] as const;

export default function Home() {
  return (
    <div className="container-x section">
      <SectionHeader as="h1" index="00" label="Design system preview" title={<>Proof, <em>not</em> promises.</>}>
        <p className="measure">
          Temporary page for Phase 1. It shows the tokens, type scale and primitives every page will use. Press{" "}
          <Kbd>Ctrl K</Kbd> to try the command menu.
        </p>
      </SectionHeader>

      <div className="grid-12 gap-y-12">
        <section className="col-span-4 sm:col-span-8 lg:col-span-6" aria-labelledby="type">
          <h2 id="type" className="label mb-6">Type</h2>
          <p className="display">Display serif</p>
          <p className="h2 mt-4">Heading two, Instrument Serif</p>
          <p className="h3 mt-4">Heading three, Geist semibold</p>
          <p className="measure mt-4">
            Body copy in Geist at 17px with a 1.65 line height. The reading width is capped at 65 characters so long
            paragraphs stay comfortable on wide screens.
          </p>
          <p className="label mt-4">Mono label · May 2026</p>
        </section>

        <section className="col-span-4 sm:col-span-8 lg:col-span-5 lg:col-start-8" aria-labelledby="colour">
          <h2 id="colour" className="label mb-6">Colour</h2>
          <ul className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-2">
            {swatches.map(([token, name]) => (
              <li key={token} className="rounded-md border border-line p-2">
                <span className="block h-12 rounded-sm border border-line" style={{ background: `var(--${token})` }} />
                <span className="mt-2 block text-sm">{name}</span>
                <span className="font-mono text-xs text-muted">--{token}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="col-span-4 sm:col-span-8 lg:col-span-12" aria-labelledby="ui">
          <h2 id="ui" className="label mb-6">Primitives</h2>
          <div className="flex flex-wrap items-center gap-3">
            <ButtonLink href="/projects">Primary button</ButtonLink>
            <ButtonLink href="/about" variant="secondary">Secondary</ButtonLink>
            <CopyEmailButton variant="secondary" />
            <Tag>React</Tag>
            <Tag>Django</Tag>
            <a href="#type" className="link">Text link</a>
          </div>
        </section>
      </div>
    </div>
  );
}
