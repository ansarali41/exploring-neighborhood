"use client";

import { useState, type FormEvent } from "react";

/**
 * Front-end only submit handler.
 * TODO(backend): replace the timeout with a real request (Server Action / API route / form service).
 */
export function useFakeSubmit() {
  const [status, setStatus] = useState<"idle" | "sending" | "done">("idle");

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("sending");
    setTimeout(() => setStatus("done"), 700);
  };

  return { status, onSubmit, reset: () => setStatus("idle") };
}
