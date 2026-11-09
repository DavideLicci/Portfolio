type MascotBubbleProps = {
  message: string | null;
  // "up": nuvoletta sopra la mascotte (desktop); "side": accanto, nel flusso della pagina (mobile)
  placement: "up" | "side";
  className?: string;
};

export function MascotBubble({ message, placement, className = "" }: MascotBubbleProps) {
  const visible = Boolean(message);

  return (
    <div role="status" aria-live="polite" className={className}>
      <p
        className={`relative rounded-xl border border-line bg-surface px-3 py-2 font-mono text-xs leading-snug text-fg shadow-lg shadow-black/40 transition-[opacity,translate] duration-300 ${
          visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-1 opacity-0"
        }`}
      >
        {message ?? " "}
        <span
          aria-hidden
          className={`absolute size-2.5 rotate-45 border-line bg-surface ${
            placement === "up"
              ? "-bottom-[6px] left-6 border-r border-b"
              : "top-1/2 -left-[6px] -translate-y-1/2 border-b border-l"
          }`}
        />
      </p>
    </div>
  );
}
