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

  const genDallE3Image = async () => {
    try {
      const response = await fetch('/api/dall-e-3', {
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
          <CardTitle>Generate DALL-E Image</CardTitle>
        </CardHeader>
        <CardContent className='flex flex-col gap-4 items-center w-[400px]'>
          <p>Enter a prompt to generate an image</p>
          <Input
            className='text-center '
            placeholder='prompt'
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
          <Button onClick={generateImage}>generate with dall-e-2</Button>
          {imgUrl && (
            <img src={imgUrl} alt='Generated IMG' width={256} height={256} />
          )}
          {imgUrl && (
            <a className='text-xs' href={imgUrl}>
              {imgUrl}
            </a>
          )}
          {/*<Button onClick={genDallE3Image}>generate with dall-e-3</Button>*/}
        </CardContent>
      </Card>
    </main>
  );
}
