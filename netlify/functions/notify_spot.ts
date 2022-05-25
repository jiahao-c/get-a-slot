import { Handler } from "@netlify/functions";
import Twilio from "twilio";

const twilio = Twilio(
  process.env["TWILIO_SID"],
  process.env["TWILIO_AUTH_TOKEN"]
);

const handler: Handler = async (event, context) => {
  const { phone_number, consulate, date } = JSON.parse(event.body);

  await twilio.messages.create({
    body: `A slot is available at ${consulate} on ${date}. Go get it!`,
    from: "+17694472302",
    to: phone_number,
  });
  return {
    statusCode: 200,
    body: "done",
  };
};

export { handler };
