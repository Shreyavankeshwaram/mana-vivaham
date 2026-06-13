"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import { urlForImage } from "@/sanity/lib/image";

const navLinks = [
  { label: "Home", url: "#morph-wrapper" },
  { label: "Stories", url: "#premium-slides-wrapper" },
  { label: "Portfolio", url: "#selected-works-wrapper" },
  { label: "Films", url: "#cinematic-slideshow-wrapper" },
  { label: "About", url: "#cinematic-storytelling-wrapper" },
  { label: "Blog", url: "https://rvrpro.in/blog/", external: true },
  { label: "Contact", url: "#contact-wrapper" },
];

const PremiumNav = ({ data }: { data?: any }) => {
  const brandName = data?.brandName || "MACHARLA";
  const ctaText = data?.ctaText || "Inquire Now";
  const ownerEmail = "manavivaham@gmail.com";
  const [scrolled, setScrolled] = useState(false);
  const [navVisible, setNavVisible] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeUrl, setActiveUrl] = useState(navLinks[0].url);
  const [showWelcome, setShowWelcome] = useState(false);
  const [inquiryOpen, setInquiryOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    eventDate: "",
    message: "",
  });
  const [isSending, setIsSending] = useState(false);
  const [sendStatus, setSendStatus] = useState<"" | "success" | "error">("");
  const [sendError, setSendError] = useState<string>("");
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      setScrolled(currentY > 50);
      const scrollingUp = currentY < lastScrollY.current;
      const nearTop = currentY < 64;
      setNavVisible(scrollingUp || nearTop);
      lastScrollY.current = currentY;

      const markerY = currentY + Math.min(window.innerHeight * 0.35, 240);
      let nextActiveUrl = navLinks[0].url;
      let nearestSectionTop = Number.NEGATIVE_INFINITY;

      navLinks.forEach((link) => {
        if (link.external) return;
        const section = document.querySelector<HTMLElement>(link.url);
        const sectionTop = section ? section.getBoundingClientRect().top + currentY : null;
        if (sectionTop !== null && sectionTop <= markerY && sectionTop > nearestSectionTop) {
          nearestSectionTop = sectionTop;
          nextActiveUrl = link.url;
        }
      });

      setActiveUrl(nextActiveUrl);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (
    event: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>,
    url: string,
  ) => {
    event.preventDefault();
    const section = document.querySelector<HTMLElement>(url);
    if (!section) return;

    setMenuOpen(false);
    setActiveUrl(url);
    window.history.replaceState(null, "", url);

    const handledByLenis = !window.dispatchEvent(new CustomEvent("mana:navigate", {
      cancelable: true,
      detail: { target: url, offset: -96 },
    }));

    if (!handledByLenis) section.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const onFieldChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const onInquirySend = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSending(true);
    setSendStatus("");
    setSendError("");
    const subject = `New Website Inquiry - ${formData.name || "Prospect"}`;
    const body = [
      "New inquiry received from the website:",
      "",
      `Name: ${formData.name}`,
      `Phone: ${formData.phone}`,
      `Email: ${formData.email}`,
      `Event Date: ${formData.eventDate || "Not provided"}`,
      "",
      "Message:",
      formData.message || "No message provided",
    ].join("\n");
    try {
      const response = await fetch("/api/inquire", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
          eventDate: formData.eventDate || "Not provided",
          message: formData.message || "No message provided",
        }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        // SMTP not configured yet — open mailto as reliable fallback
        if (response.status === 503) {
          setSendStatus("error");
          const mailtoUrl = `mailto:${ownerEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
          window.location.href = mailtoUrl;
          return;
        }
        setSendError(result?.error || "Send failed");
        throw new Error(result.error || "Send failed");
      }

      setSendStatus("success");
      setFormData({
        name: "",
        phone: "",
        email: "",
        eventDate: "",
        message: "",
      });
      setTimeout(() => setInquiryOpen(false), 800);
    } catch {
      setSendStatus("error");
      if (!sendError) setSendError("SMTP auth failed. Please check GMAIL_USER / GMAIL_APP_PASSWORD.");
      const mailtoUrl = `mailto:${ownerEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      window.location.href = mailtoUrl;
    } finally {
      setIsSending(false);
    }
  };

  return (
    <nav
      className="fixed top-3 md:top-6 left-0 right-0 z-[100] flex justify-center w-full px-3 md:px-0 pointer-events-none"
    >
      <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: navVisible ? 0 : -140, opacity: navVisible ? 1 : 0 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className={`
          relative w-full max-w-[1080px] md:w-auto px-4 md:px-8 py-3 md:py-3.5 flex items-center justify-between md:justify-start gap-4 md:gap-8 pointer-events-auto
          transition-all duration-500 rounded-full
          ${scrolled
            ? "bg-white/80 backdrop-blur-2xl border border-black/5 shadow-[0_8px_32px_rgba(0,0,0,0.08)] scale-95"
            : "bg-white/90 md:bg-white/10 backdrop-blur-xl border border-black/5 md:border-white/10 scale-100"
          }
        `}
      >
        <button
          type="button"
          onClick={() => setShowWelcome((prev) => !prev)}
          className="text-[11px] font-playfair italic tracking-[0.2em] uppercase text-[#8B1E2D]"
        >
          {brandName}
        </button>

        <div className="hidden md:block h-3 w-px bg-black/10" />

        <div className="hidden md:flex items-center gap-6 text-[10px] uppercase tracking-[0.25em]">
          {navLinks.map((link: any) => (
            <a
              key={link.label}
              href={link.url}
              onClick={link.external ? undefined : (event) => scrollToSection(event, link.url)}
              target={link.external ? "_blank" : undefined}
              rel={link.external ? "noopener noreferrer" : undefined}
              aria-current={activeUrl === link.url ? "page" : undefined}
              className={`relative group transition-colors duration-300 ${
                activeUrl === link.url ? "text-black" : "text-black/60 hover:text-black"
              }`}
            >
              {link.label}
              <span className={`absolute -bottom-0.5 left-0 h-px bg-[#8B1E2D] transition-all duration-400 ${
                activeUrl === link.url ? "w-full" : "w-0 group-hover:w-full"
              }`} />
            </a>
          ))}
        </div>

        <div className="hidden md:block h-3 w-px bg-black/10" />

        <button
          type="button"
          onClick={() => setInquiryOpen(true)}
          className="
          hidden md:block
          text-[10px] uppercase tracking-[0.25em] px-4 py-2 rounded-full
          border border-black/20 text-black/70
          hover:bg-[#8B1E2D] hover:text-white hover:border-[#8B1E2D]
          transition-all duration-400 font-medium
        ">
          {ctaText}
        </button>

        <button
          type="button"
          aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
          className="md:hidden flex h-9 w-9 items-center justify-center rounded-full border border-black/15 bg-white/50 text-[#8B1E2D]"
        >
          {menuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </button>

        {menuOpen && (
          <div className="absolute left-0 right-0 top-[calc(100%+8px)] md:hidden rounded-[18px] border border-black/5 bg-white/95 p-3 shadow-[0_12px_36px_rgba(0,0,0,0.12)] backdrop-blur-2xl">
            <div className="flex flex-col">
              {navLinks.map((link: any) => (
                <a
                  key={link.label}
                  href={link.url}
                  onClick={link.external ? undefined : (event) => scrollToSection(event, link.url)}
                  target={link.external ? "_blank" : undefined}
                  rel={link.external ? "noopener noreferrer" : undefined}
                  aria-current={activeUrl === link.url ? "page" : undefined}
                  className={`border-b border-black/5 px-3 py-3 text-[10px] uppercase tracking-[0.24em] last:border-b-0 ${
                    activeUrl === link.url ? "text-[#8B1E2D]" : "text-black/65"
                  }`}
                >
                  {link.label}
                </a>
              ))}
              <button
                type="button"
                onClick={() => {
                  setMenuOpen(false);
                  setInquiryOpen(true);
                }}
                className="mt-2 rounded-full border border-[#8B1E2D]/25 px-4 py-3 text-[10px] uppercase tracking-[0.24em] text-[#8B1E2D]"
              >
                {ctaText}
              </button>
            </div>
          </div>
        )}
      </motion.div>

      {showWelcome && (
        <div className="absolute top-[calc(100%+8px)] left-1/2 -translate-x-1/2 rounded-full border border-[#8B1E2D]/20 bg-white/95 px-4 py-2 text-[10px] uppercase tracking-[0.2em] text-[#8B1E2D] shadow-md">
          Welcome
        </div>
      )}

      {inquiryOpen && (
        <div className="fixed inset-0 z-[160] flex items-center justify-center bg-black/40 p-4 pointer-events-auto">
          <div className="w-full max-w-xl rounded-2xl border border-black/10 bg-[#F8F2E6] p-5 md:p-7 shadow-2xl">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg md:text-xl font-serif text-[#8B1E2D]">Inquire Now</h3>
              <button
                type="button"
                onClick={() => setInquiryOpen(false)}
                className="rounded-full border border-black/20 p-2 text-black/60"
                aria-label="Close inquiry form"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <form onSubmit={onInquirySend} className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={onFieldChange}
                placeholder="Your Name"
                className="w-full rounded-lg border border-black/15 bg-white px-3 py-2.5 text-sm"
              />
              <input
                type="tel"
                name="phone"
                required
                value={formData.phone}
                onChange={onFieldChange}
                placeholder="Phone Number"
                className="w-full rounded-lg border border-black/15 bg-white px-3 py-2.5 text-sm"
              />
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={onFieldChange}
                placeholder="Email Address"
                className="w-full rounded-lg border border-black/15 bg-white px-3 py-2.5 text-sm"
              />
              <input
                type="date"
                name="eventDate"
                value={formData.eventDate}
                onChange={onFieldChange}
                className="w-full rounded-lg border border-black/15 bg-white px-3 py-2.5 text-sm"
              />
              <textarea
                name="message"
                rows={4}
                value={formData.message}
                onChange={onFieldChange}
                placeholder="Tell us about your event"
                className="md:col-span-2 w-full rounded-lg border border-black/15 bg-white px-3 py-2.5 text-sm"
              />
              <div className="md:col-span-2 flex justify-end">
                <button
                  type="submit"
                  disabled={isSending}
                  className="rounded-full bg-[#8B1E2D] px-5 py-2.5 text-xs uppercase tracking-[0.2em] text-white disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isSending ? "Sending..." : "Send"}
                </button>
              </div>
              {sendStatus === "success" && (
                <p className="md:col-span-2 text-right text-xs text-green-700">
                  Sent successfully. Owner will receive client details.
                </p>
              )}
              {sendStatus === "error" && (
                <p className="md:col-span-2 text-right text-xs text-amber-700">
                  Direct send failed. {sendError || "Opening your mail app as fallback."}
                </p>
              )}
            </form>
          </div>
        </div>
      )}
    </nav>
  );
};

export default PremiumNav;
