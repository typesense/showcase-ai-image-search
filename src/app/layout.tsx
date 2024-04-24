import type { Metadata } from 'next';
import { Inter, Roboto_Mono } from 'next/font/google';
import './globals.css';
import { GithubIcon } from '@/components/icons';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

const robotoMono = Roboto_Mono({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-roboto-mono',
});

export const metadata: Metadata = {
  title: 'Image Similarity Search | Typesense',
  description:
    "Explore similar images, using Typesense's image similarity search.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body
        className={`${inter.variable} ${robotoMono.variable} px-[4vw] font-sans`}
      >
        <header className='flex items-center justify-end py-[4vh]'>
          <a
            href='https://github.com/typesense/showcase-ai-image-search'
            target='_blank'
            rel='noopener noreferrer'
            id='typesense'
            title='Source code'
          >
            <GithubIcon className='size-6' />
          </a>
        </header>
        <main className='flex flex-col pb-10'>{children}</main>
      </body>
    </html>
  );
}
