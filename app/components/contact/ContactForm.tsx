"use client";

import { useEffect, useId, useRef, useState, type FocusEvent, type FormEvent, type ReactNode } from "react";
import { Check, Send } from "lucide-react";
import { profile } from "@/lib/content";
import { Label, Panel } from "../ui/primitives";

const NEEDS = ["Internship or job", "School or personal project", "Collaboration", "Question", "Other"] as const;
const MESSAGE_MIN = 10;
const MESSAGE_MAX = 1000;
const COOLDOWN_S = 30;
const ENDPOINT = "https://api.web3forms.com/submit";
// Inlined at build time. Missing → the form falls back to a mailto: link.
const ACCESS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_KEY;

type Values = { name: string; email: string; need: string; timeline: string; message: string };
type Field = keyof Values;
type Errors = Partial<Record<Field, string>>;
type Status = "idle" | "sending" | "success" | "error" | "mailto";

const EMPTY: Values = { name: "", email: "", need: "", timeline: "", message: "" };
const REQUIRED: Field[] = ["name", "email", "need", "message"];
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function validate(v: Values): Errors {
  const e: Errors = {};
  if (!v.name.trim()) e.name = "Please enter your name";
  if (!v.email.trim()) e.email = "Please enter your email";
  else if (!EMAIL_RE.test(v.email.trim())) e.email = "Please enter a valid email";
  if (!v.need) e.need = "Please choose what you need";
  const len = v.message.trim().length;
  if (!len) e.message = "Please write a message";
  else if (len < MESSAGE_MIN) e.message = `Please write at least ${MESSAGE_MIN} characters`;
  return e;
}

const subjectFor = (v: Values) => `Portfolio message: ${v.need} from ${v.name.trim()}`;

function mailtoHref(v: Values) {
  const body = [
    `Name: ${v.name.trim()}`,
    `Email: ${v.email.trim()}`,
    `What I need: ${v.need}`,
    `Timeline: ${v.timeline.trim() || "Not given"}`,
    "",
    v.message.trim(),
  ].join("\n");
  return `mailto:${profile.email}?subject=${encodeURIComponent(subjectFor(v))}&body=${encodeURIComponent(body)}`;
}

function FieldLabel({ htmlFor, optional, children }: { htmlFor: string; optional?: boolean; children: ReactNode }) {
  return (
    <label htmlFor={htmlFor} className="mb-2 flex items-center gap-2">
      <Label className="font-semibold text-ink">{children}</Label>
      {optional && <span className="font-mono text-xs text-muted">Optional</span>}
    </label>
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

const primaryBtn =
  "inline-flex min-h-11 items-center justify-center gap-2 border border-accent bg-accent px-5 text-[0.9375rem] font-medium whitespace-nowrap text-on-accent transition-[background-color,transform] duration-200 ease-out hover:bg-[color-mix(in_srgb,var(--accent)_82%,black)] active:translate-y-px disabled:opacity-50 disabled:hover:bg-accent disabled:active:translate-y-0";
const secondaryBtn =
  "inline-flex min-h-11 items-center justify-center gap-2 border border-line-strong bg-transparent px-5 text-[0.9375rem] font-medium whitespace-nowrap text-ink hover:border-accent hover:text-accent-text active:translate-y-px";

/** "Send a message" form for the Contact page. Sends through Web3Forms. */
export default function ContactForm() {
  const uid = useId();
  const id = (f: string) => `${uid}-${f}`;

  const [values, setValues] = useState<Values>(EMPTY);
  const [touched, setTouched] = useState<Partial<Record<Field, boolean>>>({});
  const [status, setStatus] = useState<Status>("idle");
  const [cooldown, setCooldown] = useState(0);
  const honeypot = useRef<HTMLInputElement>(null);
  const successHeading = useRef<HTMLHeadingElement>(null);
  const focusNameNext = useRef(false);

  const errors = validate(values);
  const shown = (f: Field) => (touched[f] ? errors[f] : undefined);

  // Simple rate limit: no new send for 30s after a successful one.
  useEffect(() => {
    if (cooldown <= 0) return;
    const t = setTimeout(() => setCooldown((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [cooldown]);

  // Move focus to the result so keyboard and screen reader users land on it.
  useEffect(() => {
    if (status === "success") successHeading.current?.focus();
    if (status === "idle" && focusNameNext.current) {
      focusNameNext.current = false;
      document.getElementById(id("name"))?.focus();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  const set = (f: Field) => (e: { target: { value: string } }) => setValues((v) => ({ ...v, [f]: e.target.value }));
  const touch = (f: Field) => () => setTouched((t) => ({ ...t, [f]: true }));

  // The chip group counts as "blurred" only when focus leaves the whole group.
  const onNeedBlur = (e: FocusEvent<HTMLFieldSetElement>) => {
    if (!e.currentTarget.contains(e.relatedTarget as Node | null)) touch("need")();
  };

  const finishSuccess = () => {
    setValues(EMPTY);
    setTouched({});
    setStatus("success");
    setCooldown(COOLDOWN_S);
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status === "sending" || cooldown > 0) return;

    setTouched({ name: true, email: true, need: true, message: true });
    const firstInvalid = REQUIRED.find((f) => errors[f]);
    if (firstInvalid) {
      document.getElementById(id(firstInvalid === "need" ? "need-0" : firstInvalid))?.focus();
      return;
    }

    // Bots fill the hidden field: pretend it worked, send nothing.
    if (honeypot.current?.value) return finishSuccess();

    if (!ACCESS_KEY) {
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
          name: values.name.trim(),
          email,
          need: values.need,
          timeline: values.timeline.trim() || "Not given",
          message: values.message.trim(),
          botcheck: "",
        }),
      });
      const data = (await res.json().catch(() => null)) as { success?: boolean } | null;
      if (!res.ok || !data?.success) throw new Error("Send failed");
      finishSuccess();
    } catch {
      setStatus("error"); // entered text is kept
    }
  };

  const sendAnother = () => {
    focusNameNext.current = true;
    setStatus("idle");
  };

  const describedBy = (...ids: (string | false | undefined)[]) => ids.filter(Boolean).join(" ") || undefined;
  const emailLink = (
    <a href={`mailto:${profile.email}`} className="link break-all">
      {profile.email}
    </a>
  );

  return (
    <div data-reveal>
      <Label index="02" className="mb-5">
        Send a message
      </Label>
      <Panel className="contact-form p-5 sm:p-8">
        {status === "success" ? (
          <div className="flex flex-col items-start gap-5 py-4">
            <span aria-hidden className="grid size-11 place-items-center border border-accent bg-accent text-on-accent">
              <Check size={20} aria-hidden />
            </span>
            <div>
              <h2 ref={successHeading} tabIndex={-1} className="h3">
                Message sent.
              </h2>
              <p className="mt-2 text-muted">I will reply to your email soon.</p>
            </div>
            <button type="button" onClick={sendAnother} className={secondaryBtn}>
              Send another
            </button>
          </div>
        ) : (
          <form noValidate onSubmit={onSubmit} className="grid gap-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="min-w-0">
                <FieldLabel htmlFor={id("name")}>Name</FieldLabel>
                <input
                  id={id("name")}
                  type="text"
                  autoComplete="name"
                  placeholder="Your name"
                  className="field"
                  value={values.name}
                  onChange={set("name")}
                  onBlur={touch("name")}
                  aria-required="true"
                  aria-invalid={!!shown("name")}
                  aria-describedby={describedBy(shown("name") && id("name-error"))}
                />
                <FieldError id={id("name-error")} message={shown("name")} />
              </div>

              <div className="min-w-0">
                <FieldLabel htmlFor={id("email")}>Email</FieldLabel>
                <input
                  id={id("email")}
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  className="field"
                  value={values.email}
                  onChange={set("email")}
                  onBlur={touch("email")}
                  aria-required="true"
                  aria-invalid={!!shown("email")}
                  aria-describedby={describedBy(shown("email") && id("email-error"))}
                />
                <FieldError id={id("email-error")} message={shown("email")} />
              </div>
            </div>

            <fieldset
              role="radiogroup"
              aria-labelledby={id("need-label")}
              aria-required="true"
              aria-invalid={!!shown("need")}
              aria-describedby={describedBy(shown("need") && id("need-error"))}
              className="min-w-0"
              onBlur={onNeedBlur}
            >
              <legend id={id("need-label")} className="mb-2">
                <Label className="font-semibold text-ink">What do you need?</Label>
              </legend>
              <div className="flex flex-wrap gap-2">
                {NEEDS.map((need, i) => {
                  const checked = values.need === need;
                  return (
                    <label
                      key={need}
                      className={`chip min-h-11 cursor-pointer px-3 leading-[1.6] has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-accent ${
                        checked ? "chip-accent" : "text-ink hover:border-ink"
                      }`}
                    >
                      <input
                        id={id(`need-${i}`)}
                        type="radio"
                        name={id("need")}
                        value={need}
                        checked={checked}
                        onChange={set("need")}
                        className="sr-only"
                      />
                      {checked && <Check size={13} aria-hidden />}
                      {need}
                    </label>
                  );
                })}
              </div>
              <FieldError id={id("need-error")} message={shown("need")} />
            </fieldset>

            <div className="min-w-0">
              <FieldLabel htmlFor={id("timeline")} optional>
                Timeline
              </FieldLabel>
              <input
                id={id("timeline")}
                type="text"
                placeholder="For example: next month"
                maxLength={100}
                className="field"
                value={values.timeline}
                onChange={set("timeline")}
              />
            </div>

            <div className="min-w-0">
              <FieldLabel htmlFor={id("message")}>Message</FieldLabel>
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

            <div className="mt-2">
              <button type="submit" disabled={status === "sending" || cooldown > 0} className={primaryBtn}>
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
            </div>
          </form>
        )}

        {/* Announces the result. Errors and the mailto note are also shown here. */}
        <div role="status" aria-live="polite">
          {status === "success" && <span className="sr-only">Message sent. I will reply to your email soon.</span>}
          {status === "error" && (
            <p className="mt-6 border border-ink p-4 text-sm">
              Could not send. Please try again or email me directly at {emailLink}.
            </p>
          )}
          {status === "mailto" && (
            <p className="mt-6 border border-line-strong p-4 text-sm text-muted">
              Your email app should open with your message filled in. If it does not, email me at {emailLink}.
            </p>
          )}
        </div>
      </Panel>
    </div>
  );
}
