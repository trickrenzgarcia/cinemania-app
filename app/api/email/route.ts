import { NextRequest, NextResponse } from "next/server";
import Email from "@/components/email/notion-magic-link";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  const { movieId, email, day, date, time, seats, stat, total } =
    await req.json();

  try {
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

    return NextResponse.json(response);
  } catch (error) {
    return NextResponse.json({ error });
  }
}
