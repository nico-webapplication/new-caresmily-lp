import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

// トランスポーターの設定
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || "smtp.caresmily.com",
  port: Number(process.env.SMTP_PORT) || 587,
  secure: process.env.SMTP_SECURE,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// 宛先メールアドレス
const RECIPIENT_EMAIL =
  process.env.NOTIFICATION_EMAIL || "support@caresmily.com";

// サービス名の取得
function getServiceName(serviceId: string): string {
  const serviceMap: { [key: string]: string } = {
    "caresmily-standard": "CareSmily デイサービス",
    "caresmily-premium": "CareSmily 介護記録",
    "caresmily-enterprise": "CareSmily 訪問介護",
    "caresmily-home-care": "CareSmily 居宅支援",
  };

  return serviceMap[serviceId] || serviceId;
}

function getRequestTypeName(requestType: string): string {
  const requestTypeMap: { [key: string]: string } = {
    trial: "無料トライアル希望",
    document: "資料希望",
    other: "その他",
  };

  return requestTypeMap[requestType] || requestType;
}

// 資料タイプの取得
function getDocumentTypeName(documentType: string): string {
  const documentTypeMap: { [key: string]: string } = {
    "product-overview": "製品概要",
    "case-studies": "導入事例",
    price: "料金プラン",
    all: "全て",
  };

  return documentTypeMap[documentType] || documentType;
}

// 資料請求通知メール
async function sendDocumentRequestNotification(formData: any) {
  const subject = "【CareSmilyサイト】資料請求がありました";
  const content = `
資料請求がありました。リクエストID: ${formData.requestId}

■ 氏名: ${formData.name}
■ メールアドレス: ${formData.email}
■ 電話番号: ${formData.phone}
■ 会社名: ${formData.companyName}
■ 役職: ${formData.position || "未入力"}
■ 希望サービス: ${getServiceName(formData.service)}
■ 希望資料: ${getDocumentTypeName(formData.documentType)}
`;

  return await transporter.sendMail({
    from:
      process.env.SMTP_FROM || "CareSmily問い合わせ <support@caresmily.com>",
    to: RECIPIENT_EMAIL,
    subject: subject,
    text: content,
    html: content.replace(/\n/g, "<br/>"),
  });
}

// 問い合わせ通知メール
async function sendContactNotification(formData: any) {
  const subject = "【CareSmilyサイト】お問い合わせがありました";
  const content = `
お問い合わせがありました。リクエストID: ${formData.requestId}

■ 氏名: ${formData.name}
■ メールアドレス: ${formData.email}
■ 電話番号: ${formData.phone}
■ 会社名: ${formData.companyName}
■ 業種: ${formData.industry}
■ 希望サービス: ${getServiceName(formData.service)}
■ お問い合わせ種類: ${getRequestTypeName(formData.requestType)}
■ お問い合わせ内容: ${formData.inquiry}
`;

  return await transporter.sendMail({
    from:
      process.env.SMTP_FROM || "CareSmily問い合わせ <support@caresmily.com>",
    to: RECIPIENT_EMAIL,
    subject: subject,
    text: content,
    html: content.replace(/\n/g, "<br/>"),
  });
}

// オンライン面談予約通知メール
async function sendOnlineMeetingRequestNotification(formData: any) {
  const subject = "【CareSmilyサイト】オンライン面談予約リクエストがありました";
  const formattedDate = formData.date
    ? new Date(formData.date).toLocaleDateString("ja-JP", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "未選択";

  const content = `
オンライン面談予約リクエストがありました。リクエストID: ${formData.requestId}

■ 氏名: ${formData.name}
■ メールアドレス: ${formData.email}
■ 電話番号: ${formData.phone}
■ 会社名: ${formData.companyName}
■ 希望日時: ${formattedDate} ${formData.timeSlot || "時間未選択"}
■ ご要望・ご質問: ${formData.message || "なし"}
`;

  return await transporter.sendMail({
    from:
      process.env.SMTP_FROM || "CareSmily問い合わせ <support@caresmily.com>",
    to: RECIPIENT_EMAIL,
    subject: subject,
    text: content,
    html: content.replace(/\n/g, "<br/>"),
  });
}

// APIルートハンドラー
export async function POST(req: Request) {
  try {
    const formData = await req.json();
    const type = formData.type;

    // メール送信通知
    const { requestId } = formData;
    if (type === "online-meeting") {
      await sendOnlineMeetingRequestNotification({ ...formData, requestId });
    } else if (type === "contact") {
      await sendContactNotification({ ...formData, requestId });
    } else if (type === "document") {
      await sendDocumentRequestNotification({ ...formData, requestId });
    } else {
      return NextResponse.json(
        { error: "不明なリクエストタイプです" },
        { status: 400 },
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("メール送信エラー:", error);
    return NextResponse.json(
      { error: "メール送信に失敗しました" },
      { status: 500 },
    );
  }
}
