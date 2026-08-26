"use client";

import { useState, type FormEvent } from "react";

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

    setStatus("sending");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: String(formData.get("from_name") ?? "").trim(),
          email: String(formData.get("reply_to") ?? "").trim(),
          message: String(formData.get("message") ?? "").trim(),
          company: String(formData.get("company") ?? "").trim(),
        }),
      });

      if (!response.ok) throw new Error("Message delivery failed");

      form.reset();
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  const statusMessage = {
    idle: "Delivered securely through EmailJS. No email app required.",
    sending: "Sending your message…",
    sent: "Message sent. I’ll get back to you soon.",
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
