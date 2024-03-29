'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

function toKoreanTime(isoString: string) {
  const date = new Date(isoString);
  return date.toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' });
}

export default function Images() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const [images, setImages] = useState<any>([]);

  const getImages = async () => {
    let { data, error } = await supabase.from('generated_img_list').select('*');

    if (error) {
      console.log('error : ', error);
      return;
    }

    if (data) {
      console.log(data);
      setImages(data);
    }
  };

  useEffect(() => {
    getImages();
  }, []);

  return (
    <main className='flex min-h-screen flex-col items-center p-8 w-full min-w-[700px] gap-4'>
      <Link href={'/'}>
        <Button>Home</Button>
      </Link>
      <div className='grid grid-cols-2 gap-4'>
        {images.map((e: any) => {
          return (
            <Card
              key={e.id}
              className='w-[320px] p-8 flex flex-col items-center gap-2'
            >
              <img
                src={e.img_url}
                alt='Generated IMG'
                width={256}
                height={256}
              />
              <div className='text-sm'>{e.model}</div>
              <div className='text-center text-sm'>{e.prompt}</div>
              <div className='text-center text-xs'>
                {toKoreanTime(e.created_at)}
              </div>
            </Card>
          );
        })}
      </div>
    </main>
  );
}
