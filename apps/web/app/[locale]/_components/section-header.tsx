interface SectionHeaderProps {
  /**
   * A word to be displayed on top of the title.
   */
  label: string;
  /**
   * Main title of the section.
   */
  title: string;
  /**
   * Description of the section.
   */
  description: string;
}

/**
 * Unified headers for homepage sections.
 */
export default function SectionHeader({
  label,
  title,
  description,
}: SectionHeaderProps) {
  return (
    <header className="flex flex-col gap-3 border-b px-4 py-8 md:px-6 md:py-12">
      <span className="font-mono text-xs font-medium tracking-widest text-muted-foreground uppercase">
        {label}
      </span>
      <h1 className="font-stabil-grotesk text-4xl leading-none font-bold tracking-tight md:text-6xl">
        {title}
      </h1>
      <p className="max-w-2xl text-sm text-muted-foreground md:text-base">
        {description}
      </p>
    </header>
  );
}
