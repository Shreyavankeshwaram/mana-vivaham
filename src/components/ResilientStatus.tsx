"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, RefreshCcw, CheckCircle } from "lucide-react";
import { resilientRequest } from "@/utils/apiResilience";

export default function ResilientStatus() {
  const [status, setStatus] = useState<"idle" | "loading" | "retrying" | "error" | "success">("idle");
  const [message, setMessage] = useState("");
  const [retryInfo, setRetryInfo] = useState({ attempt: 0, delay: 0 });

  const triggerTestRequest = async () => {
    setStatus("loading");
    setMessage("Sending request to Gemini...");

    try {
      // Mocking a request to a potentially failing endpoint
      // For demo purposes, we'll use a simulated URL
      await resilientRequest(
        "https://api.mock-gemini.ai/v1/generate",
        {
          method: "POST",
          body: JSON.stringify({ prompt: "Hello", model: "gemini-3-flash-agent" }),
        },
        {
          maxRetries: 3,
          backupModel: "gemini-pro",
          onRetry: (attempt, delay) => {
            setStatus("retrying");
            setRetryInfo({ attempt, delay });
            setMessage(`Capacity exhausted. Retrying in ${Math.round(delay / 1000)}s...`);
          },
        }
      );

      setStatus("success");
      setMessage("Request completed successfully!");
    } catch (error: any) {
      setStatus("error");
      setMessage(error.message || "Final request failure. Please check logs.");
    }
  };

  return (
    <div className="fixed bottom-10 right-10 z-[100] flex flex-col items-end gap-4">
      <AnimatePresence>
        {status !== "idle" && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className={`px-6 py-4 rounded-2xl shadow-2xl backdrop-blur-xl border flex items-center gap-4 max-w-xs md:max-w-md ${
              status === "error" ? "bg-red-500/10 border-red-500/20" : 
              status === "success" ? "bg-green-500/10 border-green-500/20" :
              "bg-white/10 border-white/10"
            }`}
          >
            {status === "loading" && <RefreshCcw className="w-5 h-5 animate-spin text-blue-400" />}
            {status === "retrying" && <RefreshCcw className="w-5 h-5 animate-spin text-orange-400" />}
            {status === "error" && <AlertTriangle className="w-5 h-5 text-red-400" />}
            {status === "success" && <CheckCircle className="w-5 h-5 text-green-400" />}

            <div className="flex flex-col">
              <span className={`text-xs font-bold uppercase tracking-widest ${
                status === "retrying" ? "text-orange-400" : "text-white/80"
              }`}>
                {status === "retrying" ? `Retry Attempt ${retryInfo.attempt}` : status}
              </span>
              <p className="text-sm text-white/60 leading-tight mt-1">{message}</p>
            </div>

            {status === "success" && (
              <button 
                onClick={() => setStatus("idle")}
                className="ml-4 text-white/40 hover:text-white transition-colors"
              >
                ✕
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={triggerTestRequest}
        className="px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full text-[10px] tracking-[0.3em] uppercase text-white transition-all backdrop-blur-md"
      >
        Simulate Resilient Request
      </button>
    </div>
  );
}
