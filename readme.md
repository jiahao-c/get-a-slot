<div align="center">
  <h1>📅 Get a slot</h1>
</div>

<div align="center">

[A tool](https://airtable.com/shrUCzw9c7LWe57kq) to notify you when an appointment slot is available at a consulate.
Note: This is a work-in-progress. 

</div>

## Motivation

I had a hard time getting an appointment for my schengen visa application.

## How to use it (User Guide)

1. Choose the consulate you want to book an appointment at.
2. Enter your perfered date range of appointment, and your phone number.
3. You will receive a text message when an appointment slot is available.

<div align="center">
  <img alt="slot" src="https://user-images.githubusercontent.com/8275280/170397489-3e1a79ca-2763-43b0-9bc2-565207135038.jpg" width="200"  />
</div>

## How it works (System Design)

- Form: AirTable
- Database: AirTable
- Backend: Decoupled Serverless Functions (hosted by Netlify)

### Code Logic:

![system design](https://user-images.githubusercontent.com/8275280/170083747-a8716567-97b9-410d-83ea-5f3b69243ee5.jpg)
