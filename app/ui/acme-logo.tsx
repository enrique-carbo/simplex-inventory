import { fira_sans } from '@/app/lib/fonts';

import Image from 'next/image';

export default function AcmeLogo() {
  return (
    <div className="flex flex-row items-center leading-none text-white p-10">
      <Image 
      src="/logo-simplex.png"
      width={100}
      height={100}
      alt="Logo Simplex"
      priority
      className="hidden sm:flex"
      />
      <p className={`${fira_sans.className} text-[44px] ml-4 font-bold`}>Simplex</p>
    </div>
  );
}
