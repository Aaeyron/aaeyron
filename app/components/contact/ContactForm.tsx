"use client";

import { useEffect, useId, useRef, useState, type FormEvent, type ReactNode } from "react";
import { Check, Send } from "lucide-react";
import { profile } from "@/lib/content";
import { buttonClass } from "../ui/ButtonLink";
import { CornerMarks, Label, Panel } from "../ui/primitives";

const MESSAGE_MIN = 10;
const MESSAGE_MAX = 1000;
const COOLDOWN_S = 30;
const ENDPOINT = "https://api.web3forms.com/submit";
// Inlined at build time. Missing → the form falls back to a mailto: link.
const ACCESS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_KEY;

type Values = { firstName: string; lastName: string; email: string; phone: string; subject: string; message: string };
type Field = keyof Values;
type Errors = Partial<Record<Field, string>>;
type Status = "idle" | "sending" | "success" | "error" | "mailto";

const EMPTY: Values = { firstName: "", lastName: "", email: "", phone: "", subject: "", message: "" };
const REQUIRED: Field[] = ["firstName", "lastName", "email", "subject", "message"];
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function validate(v: Values): Errors {
  const e: Errors = {};
  if (!v.firstName.trim()) e.firstName = "Please enter your first name";
  if (!v.lastName.trim()) e.lastName = "Please enter your last name";
  if (!v.email.trim()) e.email = "Please enter your email";
  else if (!EMAIL_RE.test(v.email.trim())) e.email = "Please enter a valid email";
  if (!v.subject.trim()) e.subject = "Please enter a subject";
  const len = v.message.trim().length;
  if (!len) e.message = "Please write a message";
  else if (len < MESSAGE_MIN) e.message = `Please write at least ${MESSAGE_MIN} characters`;
  return e;
}

const fullName = (v: Values) => `${v.firstName.trim()} ${v.lastName.trim()}`;
const subjectFor = (v: Values) => `Portfolio message: ${v.subject.trim()} from ${fullName(v)}`;

function mailtoHref(v: Values) {
  const body = [
    `Name: ${fullName(v)}`,
    `Email: ${v.email.trim()}`,
    `Phone: ${v.phone.trim() || "Not given"}`,
    "",
    v.message.trim(),
  ].join("\n");
  return `mailto:${profile.email}?subject=${encodeURIComponent(subjectFor(v))}&body=${encodeURIComponent(body)}`;
}

function FieldLabel({ htmlFor, optional, children }: { htmlFor: string; optional?: boolean; children: ReactNode }) {
  return (
    <label htmlFor={htmlFor} className="mb-2 flex items-center gap-2">
      <Label className="field-label">{children}</Label>
      {optional && <span className="font-mono text-xs text-muted">Optional</span>}
    </label>
  );
}

/** Small corner marks just outside a field's border. Decorative, never in the way of taps. */
function FieldFrame({ children }: { children: ReactNode }) {
  return (
    <div className="field-frame">
      <CornerMarks inset="-4px" />
      {children}
    </div>
  );
}

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="mt-2 flex items-center gap-2 text-sm font-medium text-ink">
      <span aria-hidden className="size-1.5 shrink-0 bg-ink" />
      {message}
    </p>
  );
}

// Same black/white "ink" button as the home hero's "See my work"; while sending/cooling down
// (aria-disabled) it stays dimmed and doesn't invert on hover.
const sendBtn = buttonClass(
  "ink",
  "shrink-0 rounded-none! aria-disabled:opacity-50 aria-disabled:hover:bg-ink aria-disabled:hover:text-bg aria-disabled:active:translate-y-0",
);

/** "Send Me a Message" form for the Contact page. Sends through Web3Forms. */
export default function ContactForm() {
  const uid = useId();
  const id = (f: string) => `${uid}-${f}`;

  const [values, setValues] = useState<Values>(EMPTY);
  const [touched, setTouched] = useState<Partial<Record<Field, boolean>>>({});
  const [status, setStatus] = useState<Status>("idle");
  const [cooldown, setCooldown] = useState(0);
  const honeypot = useRef<HTMLInputElement>(null);

  const errors = validate(values);
  const shown = (f: Field) => (touched[f] ? errors[f] : undefined);
  // The note shows during the cooldown only; typing again also hides it (see `set`).
  const showSent = status === "success" && cooldown > 0;
  const busy = status === "sending" || cooldown > 0;

  // Simple rate limit: no new send for 30s after a successful one.
  useEffect(() => {
    if (cooldown <= 0) return;
    const t = setTimeout(() => setCooldown((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [cooldown]);

  const set = (f: Field) => (e: { target: { value: string } }) => {
    setValues((v) => ({ ...v, [f]: e.target.value }));
    if (status === "success") setStatus("idle"); // starting a new message hides the confirmation
  };
  const touch = (f: Field) => () => setTouched((t) => ({ ...t, [f]: true }));

  const finishSuccess = () => {
    setValues(EMPTY);
    setTouched({});
    setStatus("success");
    setCooldown(COOLDOWN_S);
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (busy) return;

    setTouched(Object.fromEntries(REQUIRED.map((f) => [f, true])));
    const firstInvalid = REQUIRED.find((f) => errors[f]);
    if (firstInvalid) {
      document.getElementById(id(firstInvalid))?.focus();
      return;
    }

    // Bots fill the hidden field: pretend it worked, send nothing.
    if (honeypot.current?.value) return finishSuccess();

    // Debug: the key is public by design (NEXT_PUBLIC_ is inlined into the browser bundle).
    console.log("[contact] Web3Forms key:", ACCESS_KEY || "(missing)", "endpoint:", ENDPOINT);

    if (!ACCESS_KEY) {
      console.warn("[contact] NEXT_PUBLIC_WEB3FORMS_KEY is not set at build time; opening mailto instead.");
      window.location.href = mailtoHref(values);
      setStatus("mailto");
      return;
    }

    setStatus("sending");
    try {
      const email = values.email.trim();
      const res = await fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: ACCESS_KEY,
          subject: subjectFor(values),
          from_name: "Portfolio contact form",
          replyto: email,
          name: fullName(values),
          firstName: values.firstName.trim(),
          lastName: values.lastName.trim(),
          email,
          phone: values.phone.trim() || "Not given",
          topic: values.subject.trim(),
          message: values.message.trim(),
          botcheck: "",
        }),
      });
      const data = (await res.json().catch(() => null)) as { success?: boolean; message?: string } | null;
      console.log("[contact] Web3Forms response:", res.status, data);
      if (!res.ok || !data?.success) throw new Error(data?.message || `HTTP ${res.status}`);
      finishSuccess();
    } catch (err) {
      console.error("[contact] Web3Forms send failed:", err);
      setStatus("error"); // entered text is kept
    }
  };

  const describedBy = (...ids: (string | false | undefined)[]) => ids.filter(Boolean).join(" ") || undefined;
  const emailLink = (
    <a href={`mailto:${profile.email}`} className="link break-all">
      {profile.email}
    </a>
  );

  /** A single-line text input with label, corner marks and inline error. */
  const textField = (
    f: Field,
    label: string,
    props: { type?: string; inputMode?: "email" | "tel" | "text"; autoComplete?: string; placeholder: string; optional?: boolean },
  ) => (
    <div className="min-w-0">
      <FieldLabel htmlFor={id(f)} optional={props.optional}>
        {label}
      </FieldLabel>
      <FieldFrame>
        <input
          id={id(f)}
          type={props.type ?? "text"}
          inputMode={props.inputMode}
          autoComplete={props.autoComplete}
          placeholder={props.placeholder}
          maxLength={200}
          className="field"
          value={values[f]}
          onChange={set(f)}
          {...(props.optional
            ? {}
            : {
                onBlur: touch(f),
                "aria-required": true,
                "aria-invalid": !!shown(f),
                "aria-describedby": describedBy(shown(f) && id(`${f}-error`)),
              })}
        />
      </FieldFrame>
      {!props.optional && <FieldError id={id(`${f}-error`)} message={shown(f)} />}
    </div>
  );

  return (
    <div data-reveal className="min-w-0">
      {/* Big form panel: card shadow only (no lift while typing), corner marks, and a
          technical annotation on the top border. */}
      <Panel className="contact-form card p-5 sm:p-7">
        <span aria-hidden className="annot right-5 top-0 -translate-y-1/2 sm:right-7">
          Form · Ref 02
        </span>
        <h2 className="h3">Send Me a Message</h2>
        <p className="mt-2 text-muted">Fill out the form below and I’ll get back to you within 24 hours.</p>

        <form noValidate onSubmit={onSubmit} className="mt-7 grid gap-5">
          <div className="grid gap-5 sm:grid-cols-2">
            {textField("firstName", "First name", { autoComplete: "given-name", placeholder: "Your first name" })}
            {textField("lastName", "Last name", { autoComplete: "family-name", placeholder: "Your last name" })}
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            {textField("email", "Email", { type: "email", inputMode: "email", autoComplete: "email", placeholder: "you@example.com" })}
            {textField("phone", "Phone", { type: "tel", inputMode: "tel", autoComplete: "tel", placeholder: "Your phone number", optional: true })}
          </div>
          {textField("subject", "Subject", { placeholder: "What is this about?" })}

          <div className="min-w-0">
            <FieldLabel htmlFor={id("message")}>Message</FieldLabel>
            <FieldFrame>
              <textarea
                id={id("message")}
                rows={6}
                maxLength={MESSAGE_MAX}
                placeholder="Tell me what you need and any details I should know."
                className="field"
                value={values.message}
                onChange={set("message")}
                onBlur={touch("message")}
                aria-required="true"
                aria-invalid={!!shown("message")}
                aria-describedby={describedBy(shown("message") && id("message-error"), id("message-count"))}
              />
            </FieldFrame>
            <div className="flex items-start justify-between gap-4">
              <FieldError id={id("message-error")} message={shown("message")} />
              <p id={id("message-count")} className="mt-2 ml-auto shrink-0 font-mono text-xs text-muted tabular-nums">
                {values.message.length}/{MESSAGE_MAX}
                <span className="sr-only"> characters</span>
              </p>
            </div>
          </div>

          {/* Honeypot: hidden from people and screen readers, filled in by bots. */}
          <div aria-hidden className="sr-only">
            <label htmlFor={id("botcheck")}>Leave this empty</label>
            <input ref={honeypot} id={id("botcheck")} type="text" name="botcheck" tabIndex={-1} autoComplete="off" />
          </div>

          {/* Send button, with the "sent" note beside it (stacked under 640px). aria-disabled
              (not disabled) during sending/cooldown, so keyboard focus stays on the button. */}
          <div className="mt-5 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
            <button type="submit" aria-disabled={busy} className={sendBtn}>
              <CornerMarks inset="-4px" />
              {status === "sending" ? (
                "Sending..."
              ) : cooldown > 0 ? (
                `Please wait ${cooldown}s`
              ) : (
                <>
                  Send message
                  <Send size={16} aria-hidden />
                </>
              )}
            </button>

            {/* Always mounted so the note is announced when it appears. */}
            <div role="status" aria-live="polite" className="min-w-0">
              {showSent && (
                <p className="flex items-start gap-2 text-ink">
                  <Check size={18} aria-hidden className="mt-1 shrink-0" />
                  <span>Message sent. I will reply within 24 hours.</span>
                </p>
              )}
            </div>
          </div>
        </form>

        {/* Announces and shows errors and the mailto note. */}
        <div role="status" aria-live="polite">
          {status === "error" && (
            <p className="mt-8 border border-ink p-4 text-sm">
              Could not send. Please try again or email me directly at {emailLink}.
            </p>
          )}
          {status === "mailto" && (
            <p className="mt-8 border border-line-strong p-4 text-sm text-muted">
              Your email app should open with your message filled in. If it does not, email me at {emailLink}.
            </p>
          )}
        </div>
      </Panel>
    </div>
  );
}
