"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, FormEvent, ReactNode } from "react";
import emailjs from "@emailjs/browser";
import SectionShell from "@/components/hud/SectionShell";

interface FormData {
  name: string;
  email: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

interface ContactItem {
  icon: ReactNode;
  label: string;
  value: string;
  href: string | null;
  color: string;
}

const githubIcon = (
  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
  </svg>
);

const linkedinIcon = (
  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const mailIcon = (
  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
);

const pinIcon = (
  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

const contactInfo: ContactItem[] = [
  { icon: mailIcon, label: "Email", value: "antariksh.mankar43@gmail.com", href: "mailto:antariksh.mankar43@gmail.com", color: "#00f0ff" },
  { icon: linkedinIcon, label: "LinkedIn", value: "antariksh-mankar", href: "https://www.linkedin.com/in/antariksh-mankar/", color: "#8b5cf6" },
  { icon: pinIcon, label: "Location", value: "Gandhinagar, Gujarat, India", href: null, color: "#f59e0b" },
];

const socials = [
  { name: "GitHub", url: "https://github.com/space0032", icon: githubIcon },
  { name: "LinkedIn", url: "https://www.linkedin.com/in/antariksh-mankar/", icon: linkedinIcon },
];

const ContactSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [formData, setFormData] = useState<FormData>({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"success" | "error" | "config" | null>(null);

  const validateEmail = (email: string): boolean => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!validateEmail(formData.email)) newErrors.email = "Please enter a valid email";
    if (!formData.message.trim()) newErrors.message = "Message is required";
    else if (formData.message.trim().length < 10) newErrors.message = "Message must be at least 10 characters";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    const SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
    const TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
    const PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;
    if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
      setSubmitStatus("config");
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const templateParams = {
        from_name: formData.name,
        reply_to: formData.email,
        message: formData.message,
      };
      await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY);
      setSubmitStatus("success");
      setFormData({ name: "", email: "", message: "" });
      setErrors({});
    } catch (error) {
      console.error("EmailJS Error:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (field: keyof FormData, value: string) => {
    setFormData({ ...formData, [field]: value });
    if (errors[field]) setErrors({ ...errors, [field]: undefined });
  };

  const errorMsg = (id: string, msg?: string) =>
    msg ? (
      <motion.p
        id={id}
        className="mt-1.5 ml-1 font-mono text-xs text-accent-rose"
        initial={{ opacity: 0, y: -5 }}
        animate={{ opacity: 1, y: 0 }}
      >
        ! {msg}
      </motion.p>
    ) : null;

  return (
    <SectionShell ref={ref} id="contact" index={6} code="TRANSMISSION" name="Comms" accent="#00f0ff">
      <div className="grid gap-12 lg:grid-cols-5">
        {/* Left — comms info */}
        <motion.div
          className="space-y-4 lg:col-span-2"
          initial={{ opacity: 0, x: -30 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="hud-label mb-6 flex items-center gap-2 text-text-muted">
            <span className="status-dot" style={{ color: "#00f0ff" }} />
            Establish Link
          </div>

          {contactInfo.map((item, index) => {
            const isLink = !!item.href;
            const Wrapper = isLink ? "a" : "div";
            return (
              <motion.div key={item.label} initial={{ opacity: 0, x: -20 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ delay: 0.3 + index * 0.1 }}>
                <Wrapper
                  href={item.href || undefined}
                  target={item.label === "LinkedIn" ? "_blank" : undefined}
                  rel={item.label === "LinkedIn" ? "noopener noreferrer" : undefined}
                  className={`hud-panel group flex items-center justify-between p-4 transition-colors hover:border-white/20 ${isLink ? "cursor-pointer" : ""}`}
                >
                  <div className="flex min-w-0 items-center gap-4">
                    <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center" style={{ color: item.color }}>
                      {item.icon}
                    </span>
                    <div className="min-w-0">
                      <div className="hud-label text-text-muted/70">{item.label}</div>
                      <div className="truncate text-sm font-medium text-text-primary transition-colors group-hover:text-accent-cyan">{item.value}</div>
                    </div>
                  </div>
                  {isLink ? (
                    <span className="hud-label text-text-muted/50 transition-colors group-hover:text-accent-cyan">&gt;</span>
                  ) : (
                    <span className="status-dot" style={{ color: item.color }} />
                  )}
                </Wrapper>
              </motion.div>
            );
          })}

          <motion.div className="flex gap-3 pt-2" initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} transition={{ delay: 0.7 }}>
            {socials.map((social) => (
              <motion.a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="hud-panel flex h-11 w-11 items-center justify-center text-text-secondary transition-colors hover:text-accent-cyan"
                whileHover={{ scale: 1.1, y: -3 }}
                whileTap={{ scale: 0.9 }}
                aria-label={social.name}
              >
                {social.icon}
              </motion.a>
            ))}
          </motion.div>

          <motion.div className="flex justify-center pt-6" initial={{ opacity: 0, scale: 0.8 }} animate={isInView ? { opacity: 1, scale: 1 } : {}} transition={{ delay: 0.9 }}>
            <div className="relative h-36 w-36 overflow-hidden rounded-full">
              <div className="absolute inset-0 rounded-full border border-white/10" />
              <div className="absolute inset-5 rounded-full border border-white/10" />
              <div className="absolute inset-10 rounded-full border border-white/10" />
              <div className="radar-sweep" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="status-dot" style={{ color: "#00f0ff", width: 12, height: 12 }} />
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Right — transmission form */}
        <motion.div
          className="lg:col-span-3"
          initial={{ opacity: 0, x: 30 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="hud-panel p-8">
            <div className="mb-7 flex items-center justify-between">
              <div className="hud-label flex items-center gap-2 text-text-muted">
                <span className="status-dot" style={{ color: "#00f0ff" }} />
                Transmission Channel
              </div>
              <span className="hud-label text-text-muted/70">CH-06</span>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="contact-name" className="hud-label mb-2 flex items-center gap-2 text-text-muted">
                  <span className="text-accent-cyan">&gt;</span> operator_name
                </label>
                <input
                  id="contact-name"
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  placeholder="your_name"
                  required
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? "contact-name-error" : undefined}
                  className={`hud-input px-4 py-3 text-sm ${errors.name ? "!border-accent-rose/60" : ""}`}
                />
                {errorMsg("contact-name-error", errors.name)}
              </div>

              <div>
                <label htmlFor="contact-email" className="hud-label mb-2 flex items-center gap-2 text-text-muted">
                  <span className="text-accent-cyan">&gt;</span> return_frequency
                </label>
                <input
                  id="contact-email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  placeholder="you@station.com"
                  required
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? "contact-email-error" : undefined}
                  className={`hud-input px-4 py-3 text-sm ${errors.email ? "!border-accent-rose/60" : ""}`}
                />
                {errorMsg("contact-email-error", errors.email)}
              </div>

              <div>
                <label htmlFor="contact-message" className="hud-label mb-2 flex items-center gap-2 text-text-muted">
                  <span className="text-accent-cyan">&gt;</span> transmission_body
                </label>
                <textarea
                  id="contact-message"
                  value={formData.message}
                  onChange={(e) => handleChange("message", e.target.value)}
                  rows={5}
                  placeholder="// encrypt your message here..."
                  required
                  aria-invalid={!!errors.message}
                  aria-describedby={errors.message ? "contact-message-error" : undefined}
                  className={`hud-input resize-none px-4 py-3 text-sm ${errors.message ? "!border-accent-rose/60" : ""}`}
                />
                {errorMsg("contact-message-error", errors.message)}
              </div>

              <motion.button
                type="submit"
                disabled={isSubmitting}
                className="flex w-full cursor-pointer items-center justify-center gap-2 bg-gradient-to-r from-accent-cyan to-accent-violet px-6 py-4 font-mono text-xs font-bold uppercase tracking-widest text-bg-primary transition-shadow hover:shadow-lg hover:shadow-accent-cyan/20 disabled:cursor-not-allowed disabled:opacity-50"
                whileHover={!isSubmitting ? { scale: 1.01, y: -2 } : {}}
                whileTap={!isSubmitting ? { scale: 0.99 } : {}}
              >
                {isSubmitting ? (
                  <>
                    <motion.div
                      className="h-4 w-4 rounded-full border-2 border-bg-primary border-t-transparent"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    />
                    Transmitting...
                  </>
                ) : (
                  <>
                    Transmit Message
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                  </>
                )}
              </motion.button>

              {submitStatus === "success" && (
                <motion.div
                  role="status"
                  className="flex items-center gap-2 border border-accent-emerald/30 bg-accent-emerald/10 p-4 font-mono text-sm text-accent-emerald"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  Transmission received — I&apos;ll respond shortly.
                </motion.div>
              )}
              {submitStatus === "error" && (
                <motion.div
                  role="alert"
                  className="flex items-center gap-2 border border-accent-rose/30 bg-accent-rose/10 p-4 font-mono text-sm text-accent-rose"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  Signal lost — please try again.
                </motion.div>
              )}
              {submitStatus === "config" && (
                <motion.div
                  role="alert"
                  className="flex items-center gap-2 border border-accent-amber/30 bg-accent-amber/10 p-4 font-mono text-sm text-accent-amber"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  Uplink not configured — set NEXT_PUBLIC_EMAILJS_* or email me directly.
                </motion.div>
              )}
            </form>
          </div>
        </motion.div>
      </div>
    </SectionShell>
  );
};

export default ContactSection;
