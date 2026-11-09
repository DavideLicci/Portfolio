import { useId } from "react";
import "./mascot.css";

export type MascotState =
  | "idle"
  | "wave"
  | "walk"
  | "point"
  | "think"
  | "talk"
  | "celebrate"
  | "sleep";

type MascotFigureProps = {
  state: MascotState;
  className?: string;
};

const INK = "#241c18";
const SKIN = "#f7d9c4";
const HAIR = "#2b211d";
const SWEATER = "#1e1e1e";
const PANTS = "#3a4232";
const SHOE = "#f2f2f2";
const METAL = "#aab0b6";

// Mini Davide: un rig 2D in SVG. Ogni parte (testa, braccia, gambe, occhi, bocche)
// è un gruppo con il proprio perno; le animazioni stanno in mascot.css e partono
// da data-state. Coordinate nel viewBox 100×140, piedi a y≈128.
export function MascotFigure({ state, className }: MascotFigureProps) {
  const filterId = `mascot-ink-${useId().replace(/[^a-zA-Z0-9_-]/g, "")}`;

  return (
    <svg
      viewBox="0 0 100 140"
      className={`mascot ${className ?? ""}`}
      data-state={state}
      aria-hidden
      focusable="false"
    >
      <defs>
        {/* Leggera irregolarità sulle linee, per un tratto meno "vettoriale". */}
        <filter id={filterId} x="-10%" y="-10%" width="120%" height="120%">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="1" seed="4" />
          <feDisplacementMap in="SourceGraphic" scale="0.9" />
        </filter>
      </defs>

      <ellipse className="m-shadow" cx="50" cy="129" rx="21" ry="3.2" fill="#000" opacity="0.28" />

      <g className="m-figure" filter={`url(#${filterId})`} stroke={INK} strokeLinecap="round" strokeLinejoin="round">
        {/* Gambe: perno all'anca */}
        <g className="m-leg-l">
          <path d="M38 100h11v20.5q0 3-3 3h-5q-3 0-3-3z" fill={PANTS} strokeWidth="1.4" />
          <rect x="38.8" y="107.5" width="4.4" height="5.2" rx="0.9" fill="#323929" strokeWidth="0.8" />
          <path d="M34.5 123.6q0-3.2 4-3.2h8.2q3 0 3 3.2v2.2q0 2-2 2h-11.4q-1.8 0-1.8-2z" fill={SHOE} strokeWidth="1.4" />
          <path d="M35 125.2h14.6" stroke="#c9c9c9" strokeWidth="0.8" />
        </g>
        <g className="m-leg-r">
          <path d="M51 100h11v20.5q0 3-3 3h-5q-3 0-3-3z" fill={PANTS} strokeWidth="1.4" />
          <rect x="56.8" y="107.5" width="4.4" height="5.2" rx="0.9" fill="#323929" strokeWidth="0.8" />
          <path d="M50.5 123.6q0-3.2 3-3.2h8.2q4 0 4 3.2v2.2q0 2-1.8 2h-11.4q-2 0-2-2z" fill={SHOE} strokeWidth="1.4" />
          <path d="M50.4 125.2h14.6" stroke="#c9c9c9" strokeWidth="0.8" />
        </g>

        {/* Busto: maglione nero con colletto della maglietta bianca */}
        <g className="m-torso">
          <path
            d="M33 84q2-6.2 9-6.6h16q7 .4 9 6.6l3 15.2q.8 4-3 4H33q-3.8 0-3-4z"
            fill={SWEATER}
            strokeWidth="1.4"
          />
          <path d="M32.6 99.6h34.8" stroke="#3b3b3b" strokeWidth="0.9" />
          <path d="M36 101.2v1.4M40 101.2v1.4M44 101.2v1.4M48 101.2v1.4M52 101.2v1.4M56 101.2v1.4M60 101.2v1.4M64 101.2v1.4" stroke="#3b3b3b" strokeWidth="0.6" />
          <path d="M41.6 78.2q8.4 6 16.8 0" fill="none" stroke="#3a3a3a" strokeWidth="1.2" />
          <path d="M43.4 77.8q6.6 3.8 13.2 0" fill="none" stroke={SHOE} strokeWidth="2" />
          <path d="M40 88l1.6 1.4M58 91l1.6 1.4M45 95l1.4 1.2M55 85l1.4 1.2" stroke="#383838" strokeWidth="0.7" />
        </g>

        {/* Testa: perno sul collo */}
        <g className="m-head">
          <ellipse cx="23.6" cy="55" rx="3.6" ry="5" fill={SKIN} strokeWidth="1.3" />
          <ellipse cx="76.4" cy="55" rx="3.6" ry="5" fill={SKIN} strokeWidth="1.3" />
          <ellipse cx="50" cy="51" rx="27" ry="25.6" fill={SKIN} strokeWidth="1.5" />

          {/* Ricci: cerchi sovrapposti, il contorno di ognuno disegna il riccio */}
          <g fill={HAIR} stroke="#140e0b" strokeWidth="0.9">
            <circle cx="25" cy="42" r="7.4" />
            <circle cx="75" cy="42" r="7.4" />
            <circle cx="24.5" cy="32" r="8" />
            <circle cx="75.5" cy="32" r="8" />
            <circle cx="31" cy="22.5" r="9.5" />
            <circle cx="69" cy="22.5" r="9.5" />
            <circle cx="43" cy="16.5" r="10.5" />
            <circle cx="57" cy="16.5" r="10.5" />
            <circle cx="50" cy="13" r="8" />
            <circle cx="36" cy="31" r="9" />
            <circle cx="64" cy="31" r="9" />
            <circle cx="50" cy="27" r="10" />
            <circle cx="31.5" cy="40.5" r="6" />
            <circle cx="68.5" cy="40.5" r="6" />
            <circle cx="40.5" cy="38.5" r="6.2" />
            <circle cx="59.5" cy="38.5" r="6.2" />
            <circle cx="50" cy="37.5" r="6" />
          </g>
          <g fill="none" stroke="#5c483d" strokeWidth="0.8">
            <path d="M28 30q2-3 4 0t-2 3" />
            <path d="M44 13q2-3 4 0t-2 3" />
            <path d="M60 20q2-3 4 0t-2 3" />
            <path d="M70 34q2-3 4 0t-2 3" />
            <path d="M47 33q2-3 4 0t-2 3" />
            <path d="M36 36q1.6-2.4 3.2 0" />
            <path d="M62 37q1.6-2.4 3.2 0" />
          </g>

          <g className="m-brows" fill="none" stroke={HAIR} strokeWidth="1.4">
            <path d="M35 46.4q4-1.9 8-.4" />
            <path d="M57 46q4-1.5 8 .4" />
          </g>

          {/* Occhi: aperti (sbattono), felici (^ ^) e chiusi (sonno) */}
          <g className="m-eyes">
            <g className="m-pupils">
              <ellipse cx="40" cy="56.4" rx="3.5" ry="4.3" fill={INK} stroke="none" />
              <ellipse cx="60" cy="56.4" rx="3.5" ry="4.3" fill={INK} stroke="none" />
              <circle cx="41.2" cy="54.8" r="1.2" fill="#fff" stroke="none" />
              <circle cx="61.2" cy="54.8" r="1.2" fill="#fff" stroke="none" />
            </g>
          </g>
          <g className="m-eyes-happy" fill="none" strokeWidth="1.5">
            <path d="M36.6 57.6q3.4-4.4 6.8 0" />
            <path d="M56.6 57.6q3.4-4.4 6.8 0" />
          </g>
          <g className="m-eyes-closed" fill="none" strokeWidth="1.4">
            <path d="M36.4 56.4q3.6 2.6 7.2 0" />
            <path d="M56.4 56.4q3.6 2.6 7.2 0" />
          </g>

          {/* Occhiali tondi in metallo */}
          <g fill="#ffffff" fillOpacity="0.1" stroke={METAL} strokeWidth="1.3">
            <circle cx="40" cy="56" r="7.6" />
            <circle cx="60" cy="56" r="7.6" />
            <path d="M47.5 55q2.5-2 5 0" fill="none" />
            <path d="M32.4 54.6l-8.2-1.6M67.6 54.6l8.2-1.6" fill="none" />
          </g>

          <ellipse cx="32.5" cy="64.6" rx="3.2" ry="1.8" fill="#f2a59c" opacity="0.55" stroke="none" />
          <ellipse cx="67.5" cy="64.6" rx="3.2" ry="1.8" fill="#f2a59c" opacity="0.55" stroke="none" />
          <path d="M49.2 61.6q.8.9 1.6 0" fill="none" stroke="#c48a74" strokeWidth="1" />

          {/* Bocche: sorriso, aperta, pensierosa, "o" del sonno */}
          <path className="m-mouth-smile" d="M46 66q4 3.4 8 0" fill="none" strokeWidth="1.3" />
          <path className="m-mouth-open" d="M46.2 65.4q3.8 6 7.6 0z" fill="#7a2e2a" strokeWidth="1.2" />
          <path className="m-mouth-flat" d="M46.8 67.2q3.2-1.2 6.4.4" fill="none" strokeWidth="1.3" />
          <ellipse className="m-mouth-o" cx="50" cy="67" rx="1.5" ry="1.8" fill="#7a2e2a" strokeWidth="1" />
        </g>

        {/* Braccia dopo la testa, così la mano sul mento resta davanti */}
        <g className="m-arm-l">
          <rect x="30" y="81" width="8" height="17.5" rx="4" fill={SWEATER} strokeWidth="1.4" />
          <path d="M30.6 95.4h6.8" stroke="#3b3b3b" strokeWidth="0.8" />
          <circle cx="34" cy="100.2" r="3.7" fill={SKIN} strokeWidth="1.3" />
        </g>
        <g className="m-arm-r">
          <rect x="62" y="81" width="8" height="17.5" rx="4" fill={SWEATER} strokeWidth="1.4" />
          <path d="M62.6 95.4h6.8" stroke="#3b3b3b" strokeWidth="0.8" />
          <rect className="m-finger" x="65" y="101.5" width="2.2" height="5" rx="1.1" fill={SKIN} strokeWidth="1" />
          <circle cx="66" cy="100.2" r="3.7" fill={SKIN} strokeWidth="1.3" />
        </g>

      </g>

      {/* Effetti, fuori dal filtro per restare nitidi */}
      <g className="m-fx m-fx-wave" stroke="#7cc36b" strokeWidth="1.6" strokeLinecap="round" fill="none">
        <path d="M84 50l4-3" />
        <path d="M86 56l5-.6" />
        <path d="M82 44l2-4" />
      </g>
      <g className="m-fx m-fx-point" stroke="#7cc36b" strokeWidth="1.6" strokeLinecap="round" fill="none">
        <path d="M91 78l4-3" />
        <path d="M93 84h5" />
        <path d="M91 90l4 3" />
      </g>
      <g className="m-fx m-fx-think" fill="#e6edf3" stroke={INK} strokeWidth="0.8">
        <circle cx="74" cy="13" r="2.4" />
        <circle cx="81" cy="8" r="2.8" />
        <circle cx="89" cy="4" r="3.2" />
      </g>
      <g className="m-fx m-fx-zzz" fill="#94a3b8" fontFamily="ui-monospace, monospace" fontWeight="700">
        <text x="74" y="26" fontSize="8">z</text>
        <text x="80" y="18" fontSize="10">z</text>
        <text x="87" y="9" fontSize="12">Z</text>
      </g>
      <g className="m-fx m-fx-spark" fill="#7cc36b" stroke="none">
        <path d="M12 30l1.6 4 4 1.6-4 1.6-1.6 4-1.6-4-4-1.6 4-1.6z" />
        <path d="M88 26l1.4 3.4 3.4 1.4-3.4 1.4-1.4 3.4-1.4-3.4-3.4-1.4 3.4-1.4z" />
        <path d="M84 70l1 2.6 2.6 1-2.6 1-1 2.6-1-2.6-2.6-1 2.6-1z" />
      </g>
    </svg>
  );
}
