'use client';

import { Loader } from 'lucide-react';
import { useLinkStatus } from 'next/link';

function Loading() {
  const { pending } = useLinkStatus();
  return pending ? <Loader className="flex animate-spin items-center justify-start" /> : null;
}

export { Loading };
