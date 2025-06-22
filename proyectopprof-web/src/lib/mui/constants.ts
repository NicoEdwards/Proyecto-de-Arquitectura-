import { Roboto } from 'next/font/google';

export const ROBOTO_FONT = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto',
});
