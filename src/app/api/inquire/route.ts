import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

const OWNER_EMAIL = "manavivaham@gmail.com";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, phone, email, eventDate, message } = body;

    if (!name || !phone || !email) {
      return NextResponse.json(
        { success: false, error: "Name, phone, and email are required." },
        { status: 400 }
      );
    }

    const gmailUser = (process.env.GMAIL_USER || "").trim();
    // App passwords are often shown in groups separated by spaces; remove any whitespace just in case.
    const gmailPass = (process.env.GMAIL_APP_PASSWORD || "").replace(/\s/g, "");

    if (!gmailUser || !gmailPass) {
      // If SMTP not configured, fall back to a 503 so the client can do mailto fallback
      return NextResponse.json(
        { success: false, error: "Email service not configured." },
        { status: 503 }
      );
    }

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: { user: gmailUser, pass: gmailPass },
    });

    const htmlBody = `
      <div style="font-family:Georgia,serif;max-width:560px;margin:auto;padding:32px;border:1px solid #e5d9c5;border-radius:12px;background:#faf8f5;color:#1a1a1a;">
        <h2 style="font-size:22px;color:#8B1E2D;margin:0 0 4px;">New Inquiry – Mana Vivaham</h2>
        <p style="font-size:11px;color:#888;margin:0 0 24px;letter-spacing:.08em;text-transform:uppercase;">Received from the website</p>
        <table style="width:100%;border-collapse:collapse;font-size:14px;">
          <tr><td style="padding:8px 0;color:#888;width:120px;">Name</td><td style="padding:8px 0;font-weight:600;">${name}</td></tr>
          <tr><td style="padding:8px 0;color:#888;">Phone</td><td style="padding:8px 0;">${phone}</td></tr>
          <tr><td style="padding:8px 0;color:#888;">Email</td><td style="padding:8px 0;">${email}</td></tr>
          <tr><td style="padding:8px 0;color:#888;">Event Date</td><td style="padding:8px 0;">${eventDate || "Not provided"}</td></tr>
        </table>
        <div style="margin-top:20px;padding:16px;background:#fff;border-radius:8px;border:1px solid #e5d9c5;">
          <p style="margin:0;color:#888;font-size:12px;text-transform:uppercase;letter-spacing:.08em;">Message</p>
          <p style="margin:8px 0 0;font-size:14px;line-height:1.7;">${message || "No message provided"}</p>
        </div>
        <p style="margin-top:24px;font-size:11px;color:#bbb;text-align:center;">Mana Vivaham · manavivaham@gmail.com</p>
      </div>
    `;

    await transporter.sendMail({
      from: `"Mana Vivaham Website" <${gmailUser}>`,
      to: OWNER_EMAIL,
      replyTo: email,
      subject: `New Inquiry from ${name} – Mana Vivaham`,
      html: htmlBody,
    });

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error("Inquiry email error:", err);
    if (err?.code === "EAUTH") {
      return NextResponse.json(
        {
          success: false,
          error: "Gmail rejected SMTP credentials (EAUTH). Check GMAIL_USER and GMAIL_APP_PASSWORD.",
        },
        { status: 401 }
      );
    }
    return NextResponse.json(
      { success: false, error: err?.message || "Unknown error" },
      { status: 500 }
    );
  }
}
