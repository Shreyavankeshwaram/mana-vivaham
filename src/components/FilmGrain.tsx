export default function FilmGrain() {
  return (
    <>
      <div 
        className="pointer-events-none fixed -inset-[10%] z-[9998] opacity-15 md:opacity-20 mix-blend-overlay film-grain-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 150 150' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "150px 150px",
        }}
      />
      <style>{`
        .film-grain-overlay {
          animation: grain-flicker 0.4s steps(4) infinite;
          will-change: transform;
        }

        @keyframes grain-flicker {
          0%, 100% { transform: translate(0, 0); }
          10% { transform: translate(-1%, -1%); }
          20% { transform: translate(-2%, 1%); }
          30% { transform: translate(1%, -2%); }
          40% { transform: translate(-1%, 3%); }
          50% { transform: translate(-2%, 1%); }
          60% { transform: translate(3%, -1%); }
          70% { transform: translate(2%, 1%); }
          80% { transform: translate(-3%, -2%); }
          90% { transform: translate(1%, 2%); }
        }
      `}</style>
    </>
  );
}
