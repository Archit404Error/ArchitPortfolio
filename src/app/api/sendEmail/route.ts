import { NextResponse, type NextRequest } from "next/server";
import nodemailer from "nodemailer";

interface EmailRequest {
  name?: string;
  email?: string;
  description?: string;
}

const MAX_FIELD_LENGTH = 5000;

export async function POST(request: NextRequest) {
  let body: EmailRequest;

  try {
    body = (await request.json()) as EmailRequest;
  } catch {
    return NextResponse.json(
      { success: false, error: "Invalid JSON" },
      { status: 400 },
    );
  }

  const name = body.name?.trim() ?? "";
  const email = body.email?.trim() ?? "";
  const description = body.description?.trim() ?? "";

  if (!name || !email || !description) {
    return NextResponse.json(
      { success: false, error: "Missing required fields" },
      { status: 400 },
    );
  }
  if (
    [name, email, description].some(
      (fieldValue) => fieldValue.length > MAX_FIELD_LENGTH,
    )
  ) {
    return NextResponse.json(
      { success: false, error: "Payload too large" },
      { status: 413 },
    );
  }

  const { EMAIL_USER, EMAIL_PASS, EMAIL_RECEIVER } = process.env;
  if (!EMAIL_USER || !EMAIL_PASS || !EMAIL_RECEIVER) {
    return NextResponse.json(
      { success: false, error: "Email service is not configured" },
      { status: 503 },
    );
  }

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: { user: EMAIL_USER, pass: EMAIL_PASS },
    });

    await transporter.sendMail({
      from: EMAIL_USER,
      to: EMAIL_RECEIVER,
      replyTo: email,
      subject: `[Personal Website] ${name} reaching out`,
      text: `${description}\n\nSent from ${email}`,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("sendEmail failed", error);
    return NextResponse.json(
      { success: false, error: "Failed to send email" },
      { status: 500 },
    );
  }
}
