import Link from 'next/link'
import NavLinks from '@/app/ui/dashboard/nav-links'
import { fira_sans } from '@/app/lib/fonts'

export default function SideNav() {
  return (
    <div className="flex h-full flex-col px-3 py-4 md:px-2">
      <Link
        className="mb-2 flex h-20 items-end justify-start rounded-md bg-zinc-900 p-4 md:h-40"
        href="/"
      >
        <div className="w-32 text-white md:w-40">
          <p className={`${fira_sans.className} font-bold text-xl`}>Simplex</p>
        </div>
      </Link>
      <div className="flex grow flex-row space-x-2 md:flex-col md:space-x-0 md:space-y-2 overflow-auto">
        <NavLinks />
      </div>
    </div>
  );
}
