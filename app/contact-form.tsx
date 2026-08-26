"use client";

import { useState, type FormEvent } from "react";
import emailjs from "@emailjs/browser";

const SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID ?? "";
const TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID ?? "";
const PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY ?? "";

const ArrowUpRight = () => (
  <svg aria-hidden="true" viewBox="0 0 20 20" className="icon">
    <path d="M5 15 15 5M7 5h8v8" fill="none" stroke="currentColor" strokeWidth="1.5" />
  </svg>
);

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function sendMessage(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    const company = String(formData.get("company") ?? "").trim();
    if (company) {
      form.reset();
      setStatus("sent");
      return;
    }

    const name = String(formData.get("from_name") ?? "").trim();
    const email = String(formData.get("reply_to") ?? "").trim();
    const message = String(formData.get("message") ?? "").trim();

    if (name.length < 2 || !email.includes("@") || message.length < 10) {
      setStatus("error");
      return;
    }

    if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
      setStatus("error");
      return;
    }

    setStatus("sending");

    try {
      console.log("[Contact] Sending via EmailJS:", { SERVICE_ID, TEMPLATE_ID, hasKey: !!PUBLIC_KEY });
      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        { from_name: name, reply_to: email, message, to_name: "Antariksh Mankar" },
        { publicKey: PUBLIC_KEY },
      );

      form.reset();
      setStatus("sent");
    } catch (err) {
      console.error("[Contact] EmailJS error:", err);
      setStatus("error");
    }
  }

  const statusMessage = {
    idle: "Delivered securely through EmailJS. No email app required.",
    sending: "Sending your message…",
    sent: "Message sent. I'll get back to you soon.",
    error: "Something went wrong. Please use the direct email link.",
  }[status];

  return (
    <form className="contact-form" onSubmit={sendMessage}>
      <div className="form-row">
        <label>
          <span>01 / Name</span>
          <input name="from_name" type="text" autoComplete="name" placeholder="Your name" minLength={2} required />
        </label>
        <label>
          <span>02 / Email</span>
          <input name="reply_to" type="email" autoComplete="email" placeholder="you@example.com" required />
        </label>
      </div>
      <label>
        <span>03 / Message</span>
        <textarea name="message" rows={6} placeholder="Tell me about the opportunity, project, or problem…" minLength={10} required />
      </label>
      <label className="form-honeypot" aria-hidden="true">
        <span>Company</span>
        <input name="company" type="text" tabIndex={-1} autoComplete="off" />
      </label>
      <div className="form-submit-row">
        <small className={`form-status form-status-${status}`} aria-live="polite">{statusMessage}</small>
        <button className="button button-primary" type="submit" disabled={status === "sending"}>
          {status === "sending" ? "Sending…" : "Send message"} <ArrowUpRight />
        </button>
      </div>
    </form>
  );
}
