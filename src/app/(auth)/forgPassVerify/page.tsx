export const dynamic = "force-dynamic";

import { Suspense } from "react";
import VerifyEmailClient from "@/components/admin/forgPassVerifyEmail";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <VerifyEmailClient />
    </Suspense>
  );
}
