'use client';

import React from 'react';
import dynamic from 'next/dynamic';

const GetConnectedPage = dynamic(
  () => import('@/components/connected/GetConnectedPage').then((mod) => mod.GetConnectedPage),
  {
    ssr: false,
    loading: () => (
      <div className="flex-1 flex items-center justify-center min-h-[400px]">
        <div className="w-10 h-10 rounded-full border-4 border-[#984300]/20 border-t-[#984300] animate-spin" />
      </div>
    ),
  }
);

export function GetConnectedWrapper() {
  return <GetConnectedPage />;
}
