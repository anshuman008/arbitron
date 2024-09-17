

import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    // Extract the disputes object from the request body
    const { disputes } = await req.json();

    console.log(disputes, 'here is the request');

    // Prepare the body for the fetch request
    const body = JSON.stringify({ disputes });

    // Make the POST request to the external API
    const response = await fetch(process.env.REQUEST_URL as string, {
      method: 'POST',
      headers: {
        'x-api-key': process.env.API_KEY as string,
        'Content-Type': 'application/json',
      },
      body: body,  // Ensure body is properly stringified
    });


    const result = await response.json();

     console.log(result,'here is the result')
    // Return the response data
    return NextResponse.json(result);
  } catch (e) {
    console.log('There is an error while fetching the data...', e);
    return NextResponse.json({ msg: "There is an error!!" });
  }
}
