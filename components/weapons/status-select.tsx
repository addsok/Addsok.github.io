"use client";

import { setProgressAction } from "@/lib/actions";
import { toast } from "sonner";
import { useTransition } from "react";

export function StatusSelect({ camoId, current }: { camoId: string; current: string }) {
  const [pending, start] = useTransition();

  return (
    <select
      className="input"
      defaultValue={current || "locked"}
      disabled={pending}
      onChange={(e) => {
        start(async () => {
          const res = await setProgressAction(camoId, e.target.value as any);
          if (res?.error) toast.error(res.error);
          else toast.success("Progress updated");
        });
      }}
    >
      <option value="locked">Locked</option>
      <option value="in_progress">In Progress</option>
      <option value="completed">Completed</option>
    </select>
  );
}
