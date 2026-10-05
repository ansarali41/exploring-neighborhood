import { CheckCircle2 } from "lucide-react";
import type { ReactNode } from "react";

export function FormSuccess({ title, children, onReset }: { title: string; children: ReactNode; onReset?: () => void }) {
  return (
    <div role="status" className="flex flex-col items-center py-8 text-center">
      <span className="inline-flex size-16 items-center justify-center rounded-full bg-leaf-100 text-forest-600">
        <CheckCircle2 size={34} aria-hidden="true" />
      </span>
      <h3 className="mt-5 text-2xl font-bold">{title}</h3>
      <p className="mt-2 max-w-sm text-muted">{children}</p>
      {onReset && (
        <button type="button" onClick={onReset} className="mt-6 cursor-pointer text-sm font-semibold text-forest-600 hover:underline">
          Send another
        </button>
      )}
    </div>
  );
}
