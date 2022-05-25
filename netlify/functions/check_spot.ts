import { schedule, Handler } from "@netlify/functions";
import { fetch, CookieJar } from "node-fetch-cookies";
import "dotenv/config";
import Airtable from "airtable";

Airtable.configure({
  endpointUrl: "https://api.airtable.com",
  apiKey: process.env.AIRTABLE_API_KEY,
});
const base = Airtable.base(process.env.AIRTABLE_BASE_ID);

const cookieJar = new CookieJar("jar.json");
//only checking Belgium for now
const API_ENDPOINT =
  "https://appointment.diplomatie.be/Home/AvailableDates/?officeId=172c988b-c3dc-4e87-8382-6803a40dd992&serviceIds=7fc8a115-c7e1-40f2-a46e-e21e1e77f318";

interface BelgiumResponse {
  dataObject: {
    dates: string[];
  };
}

const handler: Handler = schedule("@hourly", async (event, context) => {
  const response = await fetch(cookieJar, API_ENDPOINT);
  const data: BelgiumResponse = await response.json();
  const dates = data.dataObject.dates.map((date) => date.split("T")[0]);

  const records = await base("spots").create([
    {
      fields: {
        consulate: "Belgium - Montreal", //hard-coded for now
        slots: JSON.stringify(dates),
      },
    },
  ]);

  return {
    statusCode: 200,
    body: JSON.stringify(dates),
  };
});

export { handler };
