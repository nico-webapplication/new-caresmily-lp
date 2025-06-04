// src/app/api/timerex-webhook/route.ts
import crypto from "crypto";
import { NextRequest, NextResponse } from "next/server";
import { upsertMeetingMemo } from "@/lib/bownow";

function verify(req: NextRequest, raw: string) {
  const sig = req.headers.get("x-timerex-authorization") || "";
  const expected = crypto
    .createHmac("sha256", process.env.TIMEREX_WEBHOOK_SECRET!)
    .update(raw)
    .digest("hex");
  return crypto.timingSafeEqual(Buffer.from(sig), Buffer.from(expected));
}

export async function POST(req: NextRequest) {
  const raw = await req.text();
  if (!verify(req, raw)) return new NextResponse("bad sig", { status: 401 });

  const evt = JSON.parse(raw);               // type, payload
  if (evt.type === "booking.confirmed") {
    const p = evt.payload;
    await upsertMeetingMemo(
      p.guest.email,
      `面談確定 ${p.start} – ${p.event_url}`
    );
  } else if (evt.type === "booking.cancelled") {
    await upsertMeetingMemo(evt.payload.guest.email, "面談キャンセル");
  }
  return NextResponse.json({ received: true });
}
