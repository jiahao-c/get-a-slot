import { Handler } from "@netlify/functions";
import "dotenv/config";
import Airtable from "airtable";

Airtable.configure({
  endpointUrl: "https://api.airtable.com",
  apiKey: process.env.AIRTABLE_API_KEY,
});
const base = Airtable.base(process.env.AIRTABLE_BASE_ID);

const handler: Handler = async (event, context) => {
  base("subscriptions")
    .select({
      maxRecords: 50,
      view: "db",
    })
    .eachPage(
      function page(records, fetchNextPage) {
        // This function (`page`) will get called for each page of records.

        records.forEach(function (record) {
          const isDone = record.get("done");
          if (isDone) return;
          const phone = record.get("phone");
          const consulate = record.get("consulate"); //only Belgium is supported for now
          const start_date = record.get("start date");
          const end_date = record.get("end date");
        });

        // To fetch the next page of records, call `fetchNextPage`.
        // If there are more records, `page` will get called again.
        // If there are no more records, `done` will get called.
        fetchNextPage();
      },
      function done(err) {
        if (err) {
          console.error(err);
          return;
        }
      }
    );
  const latest_spot = await base("spots").select({
    maxRecords: 1,
    view: "db",
    sort: [{ field: "CREATED_TIME", direction: "desc" }],
  });

  return {
    statusCode: 200,
    body: "hi",
  };
};

export { handler };
