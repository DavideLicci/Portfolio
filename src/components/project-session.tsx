import type { SessionLine } from "@/content/projects";

type ProjectSessionProps = {
  lines: SessionLine[];
  title: string;
  className?: string;
};

// Finestra di terminale con l'output reale di una partita.
export function ProjectSession({ lines, title, className = "" }: ProjectSessionProps) {
  return (
    <div
      className={`overflow-hidden rounded-xl border border-line bg-[#070a10] shadow-2xl shadow-black/40 ${className}`}
    >
      <div className="flex items-center gap-2 border-b border-line bg-surface px-4 py-3">
        <span aria-hidden className="size-3 rounded-full bg-[#ff5f57]" />
        <span aria-hidden className="size-3 rounded-full bg-[#febc2e]" />
        <span aria-hidden className="size-3 rounded-full bg-[#28c840]" />
        <span className="ml-2 truncate font-mono text-xs text-muted">{title}</span>
      </div>
      {/* Il JetBrains Mono di Google Fonts non ha i caratteri dei riquadri (╔═║): qui servono
          i monospace di sistema, che li hanno della stessa larghezza delle lettere. */}
      <pre className="overflow-x-auto p-4 text-[0.7rem] leading-[1.3] sm:p-5 sm:text-xs">
        <code className="[font-family:'Cascadia_Mono',Consolas,Menlo,'DejaVu_Sans_Mono','Liberation_Mono','Courier_New',monospace]">
          {lines.map((line, index) => (
            <span
              key={index}
              className={
                line.kind === "input"
                  ? "my-2 block text-accent"
                  : line.kind === "art"
                    ? "block text-muted"
                    : "block text-fg"
              }
            >
              {line.kind === "input" ? `> ${line.text}` : line.text}
            </span>
          ))}
        </code>
      </pre>
    </div>
  );
}
