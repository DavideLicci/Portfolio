"use client";

import { Check, CircleAlert, LoaderCircle, Send } from "lucide-react";
import { useState, type FormEvent } from "react";
import type { Dictionary } from "@/i18n/dictionaries";
import { primaryButton } from "./buttons";

type FormDict = Dictionary["contact"]["form"];
type Field = "name" | "email" | "message";
type Status = "idle" | "sending" | "success" | "error";

const FIELDS: Field[] = ["name", "email", "message"];
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Chiave pubblica di Web3Forms: inoltra i messaggi alla tua email senza mostrarla nella pagina.
const WEB3FORMS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_KEY;

function isValid(field: Field, value: string) {
  const text = value.trim();
  if (field === "email") return EMAIL_PATTERN.test(text);
  if (field === "message") return text.length >= 10;
  return text.length > 0;
}

export function ContactForm({ dict }: { dict: FormDict }) {
  const [errors, setErrors] = useState<Partial<Record<Field, string>>>({});
  const [status, setStatus] = useState<Status>("idle");
  const [feedback, setFeedback] = useState("");

  function validate(field: Field, value: string) {
    const valid = isValid(field, value);
    setErrors((current) => ({ ...current, [field]: valid ? undefined : dict.errors[field] }));
    return valid;
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const values = Object.fromEntries(
      FIELDS.map((field) => [field, String(data.get(field) ?? "").trim()]),
    ) as Record<Field, string>;

    const firstInvalid = FIELDS.filter((field) => !validate(field, values[field]))[0];
    if (firstInvalid) {
      (form.elements.namedItem(firstInvalid) as HTMLElement | null)?.focus();
      return;
    }

    // Campo trappola: le persone non lo vedono, i bot di spam spesso lo compilano.
    if (data.get("botcheck")) {
      form.reset();
      setStatus("success");
      setFeedback(dict.success);
      return;
    }

    if (!WEB3FORMS_KEY) {
      setStatus("error");
      setFeedback(dict.notConfigured);
      return;
    }

    setStatus("sending");
    setFeedback("");
    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject: dict.subject,
          from_name: "Portfolio",
          ...values,
        }),
      });
      const result = (await response.json()) as { success?: boolean };
      if (!response.ok || !result.success) throw new Error("Web3Forms rejected the message");

      form.reset();
      setStatus("success");
      setFeedback(dict.success);
    } catch {
      setStatus("error");
      setFeedback(dict.error);
    }
  }

  const sending = status === "sending";

  return (
    <form
      noValidate
      data-spotlight
      onSubmit={handleSubmit}
      className="space-y-5 rounded-xl border border-line bg-surface p-5 sm:p-7"
    >
      <TextField
        field="name"
        label={dict.name}
        placeholder={dict.namePlaceholder}
        autoComplete="name"
        error={errors.name}
        onValidate={validate}
      />
      <TextField
        field="email"
        type="email"
        label={dict.email}
        placeholder={dict.emailPlaceholder}
        autoComplete="email"
        error={errors.email}
        onValidate={validate}
      />
      <TextField
        field="message"
        label={dict.message}
        placeholder={dict.messagePlaceholder}
        error={errors.message}
        onValidate={validate}
        multiline
      />

      <input
        type="checkbox"
        name="botcheck"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden
        className="hidden"
      />

      <button type="submit" disabled={sending} className={`${primaryButton} w-full sm:w-auto`}>
        {sending ? (
          <LoaderCircle className="size-4 animate-spin" aria-hidden />
        ) : (
          <Send className="size-4" aria-hidden />
        )}
        {sending ? dict.sending : dict.submit}
      </button>

      <div role="status" aria-live="polite" className="min-h-6">
        {feedback && (
          <p
            className={`flex items-start gap-2 text-sm ${status === "success" ? "text-accent" : "text-danger"}`}
          >
            {status === "success" ? (
              <Check className="mt-0.5 size-4 shrink-0" aria-hidden />
            ) : (
              <CircleAlert className="mt-0.5 size-4 shrink-0" aria-hidden />
            )}
            {feedback}
          </p>
        )}
      </div>
    </form>
  );
}

type TextFieldProps = {
  field: Field;
  label: string;
  placeholder: string;
  error?: string;
  type?: "text" | "email";
  autoComplete?: string;
  multiline?: boolean;
  onValidate: (field: Field, value: string) => boolean;
};

function TextField({
  field,
  label,
  placeholder,
  error,
  type = "text",
  autoComplete,
  multiline = false,
  onValidate,
}: TextFieldProps) {
  const id = `contact-${field}`;
  const errorId = `${id}-error`;
  const inputClass =
    "w-full rounded-lg border border-line-strong bg-bg px-4 py-3 text-base text-fg transition-colors placeholder:text-muted/60 hover:border-muted focus-visible:border-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40 aria-[invalid=true]:border-danger";

  const shared = {
    id,
    name: field,
    placeholder,
    required: true,
    "aria-invalid": error ? true : undefined,
    "aria-describedby": error ? errorId : undefined,
    onBlur: (event: { currentTarget: { value: string } }) =>
      onValidate(field, event.currentTarget.value),
    // Una volta mostrato l'errore, sparisce appena il campo diventa valido.
    onChange: (event: { currentTarget: { value: string } }) => {
      if (error) onValidate(field, event.currentTarget.value);
    },
  };

  return (
    <div>
      <label htmlFor={id} className="mb-2 block font-mono text-sm text-fg">
        {label}
      </label>
      {multiline ? (
        <textarea {...shared} rows={5} maxLength={5000} className={`${inputClass} resize-y`} />
      ) : (
        <input {...shared} type={type} autoComplete={autoComplete} className={inputClass} />
      )}
      {error && (
        <p id={errorId} className="mt-2 flex items-center gap-1.5 text-sm text-danger">
          <CircleAlert className="size-4 shrink-0" aria-hidden />
          {error}
        </p>
      )}
    </div>
  );
}
