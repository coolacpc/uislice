import { Webhook } from "svix";
import { headers } from "next/headers";
import { WebhookEvent } from "@clerk/nextjs/server";

import User from "../../Models/UserSchema";
import { connect } from "../../lib/connect";

export async function POST(req: Request) {
  const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    console.error("WEBHOOK_SECRET is missing from environment variables.");
    return new Response("Server configuration error", { status: 500 });
  }

  // Get the headers
  const headerPayload = headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  if (!svix_id || !svix_timestamp || !svix_signature) {
    console.error("Missing required Svix headers.");
    return new Response("Missing required headers", { status: 400 });
  }

  const payload = await req.json();
  const body = JSON.stringify(payload);

  const wh = new Webhook(WEBHOOK_SECRET);
  let evt: WebhookEvent;

  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return new Response("Webhook verification failed", { status: 400 });
  }

  const { id, email_addresses } = evt.data;
  const eventType = evt.type;

  if (eventType === "user.created") {
    const newUser = {
      clerkUserId: id,
      emailAddress: email_addresses[0].email_address,
    };

    try {
      await connect();
      await User.create(newUser);
      console.log("User created successfully:", newUser);
    } catch (error) {
      console.error("Error creating user in database:", error);
      return new Response("Error creating user", { status: 500 });
    }
  } else {
    console.log(`Unhandled event type: ${eventType}`);
  }

  console.log(`Webhook received: ID - ${id}, Type - ${eventType}`);
  return new Response("Webhook processed", { status: 200 });
}
