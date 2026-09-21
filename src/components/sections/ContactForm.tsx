"use client";

import { CheckCircle2, Loader2, Send, XCircle } from "lucide-react";
import { type FormEvent, useId, useRef, useState } from "react";
import { profile } from "@/content/profile";
import { button } from "@/components/ui/buttons";

type Status =
  | { state: "idle" }
  | { state: "submitting" }
  | { state: "success" }
  | { state: "error"; message: string };

type FieldName = "name" | "email" | "message";
type FieldErrors = Partial<Record<FieldName, string>>;

const EMAIL_PATTERN =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const FIELD_CLASS_NAME =
  "w-full rounded-xl border bg-ink-900/70 px-4 py-3 text-[15px] text-paper outline-none transition-[border-color,box-shadow] placeholder:text-ink-500 focus:border-brand-400 focus:ring-4 focus:ring-brand-500/20";
const VALID_FIELD_CLASS_NAME = "border-white/10";
const INVALID_FIELD_CLASS_NAME = "border-rose-400/70";
const LABEL_CLASS_NAME = "mb-1.5 block text-sm font-medium text-ink-300";

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="mt-1.5 text-sm text-rose-300">
      {message}
    </p>
  );
}

export function ContactForm() {
  const formId = useId();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<Status>({ state: "idle" });

  const nameInputRef = useRef<HTMLInputElement>(null);
  const emailInputRef = useRef<HTMLInputElement>(null);
  const messageInputRef = useRef<HTMLTextAreaElement>(null);

  const resetForm = () => {
    setName("");
    setEmail("");
    setMessage("");
    setErrors({});
    setStatus({ state: "idle" });
  };

  const validateFields = (): FieldErrors => {
    const nextErrors: FieldErrors = {};

    if (!name.trim()) nextErrors.name = "Enter your name.";
    if (!EMAIL_PATTERN.test(email.trim().toLowerCase())) {
      nextErrors.email = "Enter a valid email address so I can reply.";
    }
    if (!message.trim()) nextErrors.message = "Add a short message.";

    return nextErrors;
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    const nextErrors = validateFields();
    setErrors(nextErrors);

    if (nextErrors.name) return nameInputRef.current?.focus();
    if (nextErrors.email) return emailInputRef.current?.focus();
    if (nextErrors.message) return messageInputRef.current?.focus();

    setStatus({ state: "submitting" });

    try {
      const response = await fetch("/api/sendEmail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, description: message }),
      });
      const responseBody = (await response.json()) as { success?: boolean };

      if (response.ok && responseBody.success) {
        setStatus({ state: "success" });
      } else {
        throw new Error("bad response");
      }
    } catch {
      setStatus({
        state: "error",
        message: `Couldn’t send just now. Email me directly at ${profile.email}.`,
      });
    }
  };

  const isSubmitting = status.state === "submitting";
  const clearError = (fieldName: FieldName) =>
    setErrors((currentErrors) =>
      currentErrors[fieldName]
        ? { ...currentErrors, [fieldName]: undefined }
        : currentErrors,
    );

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="rounded-[var(--radius-card-lg)] border border-white/10 bg-white/[0.04] p-6 shadow-[0_30px_80px_-30px_rgb(0_0_0/0.6)] backdrop-blur-sm sm:p-8"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor={`${formId}-name`} className={LABEL_CLASS_NAME}>
            Name
          </label>
          <input
            ref={nameInputRef}
            id={`${formId}-name`}
            name="name"
            type="text"
            autoComplete="name"
            value={name}
            onChange={(event) => {
              setName(event.target.value);
              clearError("name");
            }}
            placeholder="Ada Lovelace…"
            aria-invalid={errors.name ? true : undefined}
            aria-describedby={errors.name ? `${formId}-name-error` : undefined}
            className={`${FIELD_CLASS_NAME} ${
              errors.name ? INVALID_FIELD_CLASS_NAME : VALID_FIELD_CLASS_NAME
            }`}
          />
          <FieldError id={`${formId}-name-error`} message={errors.name} />
        </div>
        <div>
          <label htmlFor={`${formId}-email`} className={LABEL_CLASS_NAME}>
            Email
          </label>
          <input
            ref={emailInputRef}
            id={`${formId}-email`}
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            spellCheck={false}
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
              clearError("email");
            }}
            placeholder="you@example.com…"
            aria-invalid={errors.email ? true : undefined}
            aria-describedby={
              errors.email ? `${formId}-email-error` : undefined
            }
            className={`${FIELD_CLASS_NAME} ${
              errors.email ? INVALID_FIELD_CLASS_NAME : VALID_FIELD_CLASS_NAME
            }`}
          />
          <FieldError id={`${formId}-email-error`} message={errors.email} />
        </div>
      </div>
      <div className="mt-4">
        <label htmlFor={`${formId}-message`} className={LABEL_CLASS_NAME}>
          Message
        </label>
        <textarea
          ref={messageInputRef}
          id={`${formId}-message`}
          name="message"
          rows={5}
          autoComplete="off"
          value={message}
          onChange={(event) => {
            setMessage(event.target.value);
            clearError("message");
          }}
          placeholder="What are you building, or what should we talk about?…"
          aria-invalid={errors.message ? true : undefined}
          aria-describedby={
            errors.message ? `${formId}-message-error` : undefined
          }
          className={`${FIELD_CLASS_NAME} resize-y ${
            errors.message ? INVALID_FIELD_CLASS_NAME : VALID_FIELD_CLASS_NAME
          }`}
        />
        <FieldError id={`${formId}-message-error`} message={errors.message} />
      </div>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <button
          type="submit"
          disabled={isSubmitting}
          className={`${button.primary} ${button.sizes.md} flex-1`}
        >
          {isSubmitting ? (
            <Loader2 className="size-4 animate-spin" aria-hidden="true" />
          ) : (
            <Send className="size-4" aria-hidden="true" />
          )}
          {isSubmitting ? "Sending…" : "Send message"}
        </button>
        <button
          type="button"
          onClick={resetForm}
          disabled={isSubmitting}
          className={`${button.ghostDark} ${button.sizes.md}`}
        >
          Clear
        </button>
      </div>

      <div aria-live="polite" className="min-h-6">
        {status.state === "success" && (
          <p className="mt-4 flex items-start gap-2 rounded-xl bg-emerald-400/10 px-3.5 py-3 text-sm text-emerald-200">
            <CheckCircle2
              className="mt-0.5 size-4 shrink-0"
              aria-hidden="true"
            />
            Message sent. I’ll reply within a few days.
          </p>
        )}
        {status.state === "error" && (
          <p className="mt-4 flex items-start gap-2 rounded-xl bg-rose-400/10 px-3.5 py-3 text-sm text-rose-200">
            <XCircle className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
            {status.message}
          </p>
        )}
      </div>
    </form>
  );
}
