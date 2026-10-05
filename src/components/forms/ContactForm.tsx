"use client";

import { ChevronDown } from "lucide-react";
import { interestOptions } from "@/data/volunteer";
import { Button } from "@/components/ui/Button";
import { FormSuccess } from "./FormSuccess";
import { useFakeSubmit } from "./useFakeSubmit";

export function ContactForm({ defaultInterest }: { defaultInterest?: string }) {
  const { status, onSubmit, reset } = useFakeSubmit();

  if (status === "done") {
    return (
      <FormSuccess title="Thank you!" onReset={reset}>
        Your message is on its way. We&apos;ll get back to you as soon as we can.
      </FormSuccess>
    );
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-5 sm:grid-cols-2">
      <div>
        <label htmlFor="c-name" className="field-label">
          Name <span className="text-forest-600">*</span>
        </label>
        <input id="c-name" name="name" required autoComplete="name" className="field" />
      </div>
      <div>
        <label htmlFor="c-email" className="field-label">
          Email <span className="text-forest-600">*</span>
        </label>
        <input id="c-email" name="email" type="email" required autoComplete="email" className="field" />
      </div>
      <div>
        <label htmlFor="c-phone" className="field-label">
          Phone <span className="font-normal text-muted">(optional)</span>
        </label>
        <input id="c-phone" name="phone" type="tel" autoComplete="tel" className="field" />
      </div>
      <div>
        <label htmlFor="c-org" className="field-label">
          Organisation <span className="font-normal text-muted">(optional)</span>
        </label>
        <input id="c-org" name="organisation" autoComplete="organization" className="field" />
      </div>
      <div className="sm:col-span-2">
        <label htmlFor="c-interest" className="field-label">
          What are you interested in?
        </label>
        <div className="relative">
          <select id="c-interest" name="interest" defaultValue={defaultInterest ?? ""} className="field appearance-none pr-11">
            <option value="" disabled>
              Choose a topic
            </option>
            {interestOptions.map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
          <ChevronDown size={18} aria-hidden="true" className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 text-muted" />
        </div>
      </div>
      <div className="sm:col-span-2">
        <label htmlFor="c-message" className="field-label">
          Message <span className="text-forest-600">*</span>
        </label>
        <textarea id="c-message" name="message" required rows={5} className="field resize-y" />
      </div>
      <div className="sm:col-span-2">
        <Button type="submit" size="lg" arrow disabled={status === "sending"} className="w-full sm:w-auto">
          {status === "sending" ? "Sending…" : "Send message"}
        </Button>
      </div>
    </form>
  );
}
