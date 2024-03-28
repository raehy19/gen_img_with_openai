'use client';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import { useState } from 'react';

export default function Home() {
  const [prompt, setPrompt] = useState('');
  const [imgUrl, setImgUrl] = useState('');

  const generateImage = async () => {
    console.log(JSON.stringify({ prompt }));

    try {
      const response = await fetch('/api/generate-image', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: prompt }),
      });

      const data = await response.json();
      console.log(data);
      if (data && data.url) {
        setImgUrl(data.url);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <main className='flex min-h-screen flex-col items-center justify-between p-16 w-full min-w-[600px]'>
      <Card className='flex flex-col gap-3 items-center w-full min-w-[500px] p-16'>
        <CardHeader>
          <CardTitle>Generate DALL-E-2 Image</CardTitle>
        </CardHeader>
        <CardContent className='flex flex-col gap-3 items-center w-full'>
          <p>Enter Prompt</p>
          <Input
            className='w-full min-w-80 '
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
          <Button onClick={generateImage}>generate</Button>
          <div className='w-full h-0 border border-solid border-b-gray-400' />
          {imgUrl && (
            <img src={imgUrl} alt='Generated IMG' width={256} height={256} />
          )}
          {imgUrl && (
            <a className='text-xs' href={imgUrl}>
              {imgUrl}
            </a>
          )}
        </CardContent>
      </Card>
    </main>
  );
}
