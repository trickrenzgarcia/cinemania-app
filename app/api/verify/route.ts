import { NextResponse } from "next/server";
import twilio from "twilio";

export async function POST(req: Request) {
  const { phone, message } = await req.json();

  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const client = require("twilio")(accountSid, authToken);

  const result = await client.messages.create({
    body: "TEST",
    from: "+18778456866",
    to: phone,
  });

  return NextResponse.json(result);
}
