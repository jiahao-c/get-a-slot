import { Handler } from "@netlify/functions";
import Twilio from "twilio";

const twilio = Twilio(
  process.env["TWILIO_SID"],
  process.env["TWILIO_AUTH_TOKEN"]
);

const handler: Handler = async (event, context) => {
  const message = await twilio.messages.create({
    body: "We will let you know when a slot is available at Belgium consulate in Montreal.",
    from: "+17694472302",
    to: "+15142222639",
  });
  return {
    statusCode: 200,
    body: "done",
  };
};

export { handler };
