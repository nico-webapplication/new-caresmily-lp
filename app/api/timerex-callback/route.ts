// src/app/api/timerex-callback/route.ts
import { NextRequest, NextResponse } from "next/server";
import { upsertMeetingMemo } from "@/lib/bownow";

export async function POST(req: NextRequest) {
  const booking = await req.json();           // guest.email, start, end, event_url…
  await upsertMeetingMemo(
    booking.guest.email,
    `面談確定 ${booking.start} – ${booking.event_url}`
  );
  return NextResponse.json({ ok: true });
}
