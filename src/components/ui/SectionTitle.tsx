export function SectionTitle({ eyebrow, title, body }: { eyebrow?: string; title: string; body?: string }) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      {eyebrow ? <div className="mb-3 text-xs uppercase tracking-[0.34em] text-cyan-200/72">{eyebrow}</div> : null}
      <h2 className="text-4xl font-semibold leading-tight text-white md:text-5xl">{title}</h2>
      {body ? <p className="mt-4 text-base leading-7 text-white/62 md:text-lg">{body}</p> : null}
    </div>
  );
}
