"use client";

import { Button } from "@/components/ui/Button";
import { FormSuccess } from "./FormSuccess";
import { useFakeSubmit } from "./useFakeSubmit";

/** "Register Interest" form shown on each event page. */
export function InterestForm({ eventTitle }: { eventTitle: string }) {
  const { status, onSubmit, reset } = useFakeSubmit();

  if (status === "done") {
    return (
      <FormSuccess title="You're on the list!" onReset={reset}>
        Thanks for registering your interest in {eventTitle}. We&apos;ll email you the details closer to the date.
      </FormSuccess>
    );
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-4">
      <input type="hidden" name="event" value={eventTitle} />
      <div>
        <label htmlFor="i-name" className="field-label">
          Name <span className="text-forest-600">*</span>
        </label>
        <input id="i-name" name="name" required autoComplete="name" className="field" />
      </div>
      <div>
        <label htmlFor="i-email" className="field-label">
          Email <span className="text-forest-600">*</span>
        </label>
        <input id="i-email" name="email" type="email" required autoComplete="email" className="field" />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="i-phone" className="field-label">
            Phone
          </label>
          <input id="i-phone" name="phone" type="tel" autoComplete="tel" className="field" />
        </div>
        <div>
          <label htmlFor="i-people" className="field-label">
            People
          </label>
          <input id="i-people" name="people" type="number" min={1} max={10} defaultValue={1} className="field" />
        </div>
      </div>
      <Button type="submit" size="lg" arrow disabled={status === "sending"} className="mt-1 w-full">
        {status === "sending" ? "Sending…" : "Register Interest"}
      </Button>
    </form>
  );
}
