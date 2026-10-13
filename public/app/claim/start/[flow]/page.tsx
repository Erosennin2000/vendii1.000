"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useDraft } from "@/lib/draft";
import { prefillFromQuery } from "@/lib/prefill";
import type { FlowType } from "@/lib/domain/types";

/** Entry point from the landing page. Resumes an unfinished draft of the same kind, otherwise starts clean. */
export default function StartClaim({ params }: { params: { flow: string } }) {
  const { draft, ready, reset, update } = useDraft();
  const router = useRouter();

  useEffect(() => {
    if (!ready) return;
    const flow: FlowType = params.flow === "estate" ? "estate" : "own";
    const handedOver = prefillFromQuery(window.location.search);
    if (handedOver) {
      // Arrived from the website with a name: start a fresh check with it filled in.
      reset(flow);
      update(handedOver);
    } else if (draft.flowType !== flow || draft.filedIds.length > 0) reset(flow);
    router.replace("/claim/name");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ready]);

  return <div className="center-note"><span className="spin" /></div>;
}
