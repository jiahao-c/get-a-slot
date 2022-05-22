import { Handler } from "@netlify/functions";
import { fetch } from "node-fetch-cookies";
import "dotenv/config";

const API_ENDPOINT =
  "https://api.airtable.com/v0/appWjPYpAGykBih1e/subscriptions?maxRecords=100&view=db";

interface BelgiumResponse {
  dataObject: {
    dates: string[];
  };
}

const handler: Handler = async (event, context) => {
  const response = await fetch(API_ENDPOINT, {
    headers: {
      Authorization: `Bearer ${process.env.AIRTABLE_API_KEY}`,
    },
  });

  return {
    statusCode: 200,
    body: "hi",
  };
};

export { handler };
