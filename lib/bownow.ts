import { headers } from "next/headers";

export async function upsertMeetingMemo(email: string, memo: string) {
  // 1) BowNow アクセストークン取得
  const tokenRes = await fetch("https://api.bownow.jp/v1/oauth2/token", {
    method: "POST",
    headers: {
      "Tracking-ID": process.env.BOWNOW_TRACKING_ID!,
      "Client-Token": process.env.BOWNOW_CLIENT_TOKEN!,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ api_key: process.env.BOWNOW_API_KEY }),
  });
  const { access_token } = await tokenRes.json();

  // 2) メール一致でリード検索
  const leadsRes = await fetch("https://api.bownow.jp/v1/leads/search", {
    method: "POST",
    headers: {
      "Tracking-ID": process.env.BOWNOW_TRACKING_ID!,
      "Client-Token": process.env.BOWNOW_CLIENT_TOKEN!,
      Authorization: `Bearer ${access_token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email }),
  });
  const [lead] = (await leadsRes.json()).leads;
  if (!lead) return;

  // 3) メモ・カスタム項目を追記
  await fetch(`https://api.bownow.jp/v1/leads/${lead.id}`, {
    method: "PATCH",
    headers: {
      "Tracking-ID": process.env.BOWNOW_TRACKING_ID!,
      "Client-Token": process.env.BOWNOW_CLIENT_TOKEN!,
      Authorization: `Bearer ${access_token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      memo,
      custom_fields: { meeting_status: "確定" },
    }),
  });
}
