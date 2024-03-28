import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    const res = await fetch('https://api.openai.com/v1/images/generations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'dall-e-2',
        prompt: prompt,
        n: 1,
        size: '256x256',
      }),
    });

    console.log(res);

    const data = await res.json();
    console.log('data : ', data);

    console.log(data.data[0].url);

    if (data && data.data) {
      return NextResponse.json({ url: data.data[0].url });
    } else {
      return NextResponse.json(
        { error: 'Failed to retrieve image from OpenAI' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.log('error : ', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
