export default function FilmGrain() {
  return (
    <>
      <div
        className="pointer-events-none fixed -inset-[10%] z-[9998] opacity-15 md:opacity-20 mix-blend-overlay film-grain-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 150 150' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "150px 150px",
          contain: "strict",
        }}
      />
      <style>{`
        @media (prefers-reduced-motion: no-preference) {
          .film-grain-overlay {
            /* Desktop/Tablets: Slowed to 1.5s steps(3) to minimize GPU compositing overhead */
            animation: grain-flicker 1.5s steps(3) infinite;
            will-change: transform;
          }
        }
        
        @media (max-width: 768px) {
          .film-grain-overlay {
            /* Mobile: Disable infinite animation to preserve battery and prevent lag */
            animation: none !important;
            opacity: 0.1;
          }
        }

        @keyframes grain-flicker {
          0%   { transform: translate(0, 0); }
          33%  { transform: translate(-1.5%, 1.5%); }
          66%  { transform: translate(1.5%, -1%); }
          100% { transform: translate(-1%, 1%); }
        }
      `}</style>
    </>
  );
}
