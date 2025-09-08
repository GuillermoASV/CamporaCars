'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Page() {
  const Ruta = useRouter();
  useEffect(() => {
    Ruta.push('/menu');
  }, [Ruta]);
  return <></>;
}
