"use client";

import { volunteerRoles } from "@/data/volunteer";
import { Button } from "@/components/ui/Button";
import { FormSuccess } from "./FormSuccess";
import { useFakeSubmit } from "./useFakeSubmit";

export function VolunteerForm() {
  const { status, onSubmit, reset } = useFakeSubmit();

  if (status === "done") {
    return (
      <FormSuccess title="Welcome aboard!" onReset={reset}>
        Thanks for offering your time. We&apos;ll be in touch about upcoming volunteer opportunities.
      </FormSuccess>
    );
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-5 sm:grid-cols-2">
      <div>
        <label htmlFor="v-name" className="field-label">
          Name <span className="text-forest-600">*</span>
        </label>
        <input id="v-name" name="name" required autoComplete="name" className="field" />
      </div>
      <div>
        <label htmlFor="v-email" className="field-label">
          Email <span className="text-forest-600">*</span>
        </label>
        <input id="v-email" name="email" type="email" required autoComplete="email" className="field" />
      </div>
      <div className="sm:col-span-2">
        <label htmlFor="v-phone" className="field-label">
          Phone <span className="font-normal text-muted">(optional)</span>
        </label>
        <input id="v-phone" name="phone" type="tel" autoComplete="tel" className="field" />
      </div>
      <fieldset className="sm:col-span-2">
        <legend className="field-label">I&apos;d like to help as a…</legend>
        <div className="mt-1 grid gap-2 sm:grid-cols-2">
          {volunteerRoles.map((role) => (
            <label
              key={role.title}
              className="flex cursor-pointer items-center gap-3 rounded-lg border border-line bg-white px-4 py-3 text-[15px] transition has-[:checked]:border-forest-600 has-[:checked]:bg-leaf-100"
            >
              <input type="checkbox" name="roles" value={role.title} className="size-4 accent-forest-600" />
              {role.title}
            </label>
          ))}
        </div>
      </fieldset>
      <div className="sm:col-span-2">
        <label htmlFor="v-message" className="field-label">
          Tell us a little about yourself
        </label>
        <textarea id="v-message" name="message" rows={4} className="field resize-y" placeholder="Your interests, skills and availability" />
      </div>
      <div className="sm:col-span-2">
        <Button type="submit" size="lg" arrow disabled={status === "sending"} className="w-full sm:w-auto">
          {status === "sending" ? "Sending…" : "Become a Volunteer"}
        </Button>
      </div>
    </form>
  );
}
