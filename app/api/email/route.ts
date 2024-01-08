import { NextRequest, NextResponse } from "next/server";
import Email from "@/components/email/notion-magic-link";
import { Resend } from "resend";
import twilio from "twilio";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  const { movieId, email, phone, day, date, time, seats, stat, total } =
    await req.json();

  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const client = require("twilio")(accountSid, authToken);

  try {
    const result = await client.messages.create({
      body: `Dear User, Congratulations you've successfully purchase a ticket check your email <${email}> you can enjoy your movie in ${date} ${day}, See you there!`,
      from: "+18778456866",
      to: phone,
    });

    const response = await resend.emails.send({
      from: "Cinemania <onboarding@resend.dev>",
      to: email,
      subject: "Cinemania Support",
      react: await Email({
        movieId,
        email,
        day,
        date,
        time,
        seats,
        stat,
        total,
      }),
    });

    return NextResponse.json({
      email: response,
      phone: result,
    });
  } catch (error) {
    return NextResponse.json({ error });
  }
}
