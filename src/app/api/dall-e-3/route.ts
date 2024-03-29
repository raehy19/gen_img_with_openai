import { NextResponse } from 'next/server';

// prompt 추가 가능
const customPrompt = 'blockchain nft, abstract art,';

import OpenAI from 'openai';

const openai = new OpenAI();

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    const image = await openai.images.generate({
      model: 'dall-e-3',
      prompt: customPrompt + prompt,
      n: 1,
      size: '1024x1024',
    });

    console.log('image : ', image.data);

    if (image && image.data) {
      return NextResponse.json({ data: image.data });
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
