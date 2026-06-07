"use client";

import { useState } from "react";

export default function FloatingWhatsApp({ data }: { data?: any }) {
  const [showWelcome, setShowWelcome] = useState(false);

  // Extract phone, remove spaces and any non-numeric characters except +
  const rawPhone = data?.phone || "+91 9391158480";
  const cleanPhone = rawPhone.replace(/[^\d+]/g, "");
  const whatsappUrl = `https://wa.me/${cleanPhone.replace("+", "")}`;

  const handleWhatsAppClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    setShowWelcome(true);

    const message = encodeURIComponent(
      "Hi Mana Vivaham, welcome! I would like to share my event details and discuss booking."
    );
    const targetUrl = `${whatsappUrl}?text=${message}`;

    setTimeout(() => {
      window.open(targetUrl, "_blank", "noopener,noreferrer");
      setShowWelcome(false);
    }, 700);
  };

  return (
    <div className="mv-whatsapp-float fixed bottom-5 right-5 md:bottom-8 md:right-8 z-[120]">
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleWhatsAppClick}
        aria-label="Chat with Mana Vivaham on WhatsApp"
        title="Chat on WhatsApp"
        className="relative flex h-14 w-14 md:h-16 md:w-16 items-center justify-center rounded-full border-2 border-white bg-[#25D366] text-white shadow-[0_12px_32px_rgba(20,72,53,0.34)] transition-all duration-500 hover:-translate-y-1 hover:scale-105 hover:bg-[#1fbe5b] hover:shadow-[0_18px_42px_rgba(20,72,53,0.44)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A880] focus-visible:ring-offset-4"
      >
        <span className="absolute inset-1 rounded-full border border-white/25" />
        <svg
          viewBox="0 0 32 32"
          aria-hidden="true"
          className="relative h-7 w-7 md:h-8 md:w-8 fill-white"
        >
          <path d="M19.11 17.63c-.28-.14-1.65-.81-1.9-.9-.25-.09-.43-.14-.62.14-.18.28-.71.9-.87 1.08-.16.18-.32.21-.6.07-.28-.14-1.16-.43-2.2-1.38-.81-.73-1.35-1.63-1.51-1.9-.16-.28-.02-.43.12-.57.13-.13.28-.33.42-.49.14-.16.18-.28.28-.46.09-.18.05-.35-.02-.49-.07-.14-.62-1.49-.85-2.04-.22-.54-.45-.47-.62-.48h-.53c-.18 0-.46.07-.71.35-.25.28-.95.93-.95 2.27s.98 2.63 1.12 2.81c.14.18 1.92 2.92 4.64 4.1.65.28 1.16.45 1.56.58.65.21 1.25.18 1.72.11.52-.08 1.65-.67 1.88-1.32.23-.65.23-1.2.16-1.32-.07-.11-.25-.18-.53-.32Z" />
          <path d="M16.02 5.33c-5.87 0-10.64 4.76-10.64 10.61 0 1.86.49 3.68 1.42 5.29L5.33 26.7l5.6-1.47a10.7 10.7 0 0 0 5.09 1.3h.01c5.87 0 10.64-4.76 10.64-10.61 0-2.83-1.11-5.48-3.11-7.48a10.6 10.6 0 0 0-7.54-3.11Zm0 19.41h-.01a8.83 8.83 0 0 1-4.5-1.23l-.32-.19-3.32.87.89-3.24-.21-.33a8.78 8.78 0 0 1-1.36-4.68c0-4.88 3.98-8.85 8.87-8.85 2.36 0 4.58.91 6.25 2.58a8.77 8.77 0 0 1 2.6 6.26c0 4.88-3.98 8.85-8.89 8.85Z" />
        </svg>
        <span className="absolute right-1 top-1 h-2.5 w-2.5 rounded-full border border-white bg-[#DCF8C6]" />
      </a>
      {showWelcome && (
        <div className="absolute bottom-[calc(100%+10px)] right-0 whitespace-nowrap rounded-full bg-[#9E2F2A] px-4 py-2 text-[10px] uppercase tracking-[0.16em] text-white shadow-lg">
          Welcome! Redirecting to owner...
        </div>
      )}

      <style jsx>{`
        .mv-whatsapp-float {
          animation: mv-whatsapp-float 3.6s ease-in-out infinite;
        }

        @keyframes mv-whatsapp-float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
        }

        @media (prefers-reduced-motion: reduce) {
          .mv-whatsapp-float {
            animation: none;
          }
        }
      `}</style>
    </div>
  );
}
