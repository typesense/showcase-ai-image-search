import { Suspense } from 'react';

export default function WithSuspense({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Suspense
      fallback={
        <div className='w-full text-center font-mono text-sm'>Loading...</div>
      }
    >
      {children}
    </Suspense>
  );
}
