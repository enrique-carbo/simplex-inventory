import { HomeIcon } from '@heroicons/react/24/outline';
import ShirtImageIcon from '@/app/ui/icons/shirt'
import JeanImageIcon from '@/app/ui/icons/jean'
import CapImageIcon from '@/app/ui/icons/cap'
import BagImageIcon from '@/app/ui/icons/bag'
import ShortPantImageIcon from '@/app/ui/icons/short-pant'  
import PoloShirtImageIcon from '@/app/ui/icons/polo-shirt'
import CottonSweaterImageIcon from '@/app/ui/icons/cotton-sweater' 
import JacketImageIcon from '@/app/ui/icons/jacket'      
import Link from 'next/link';

// Map of links to display in the side navigation.
// Depending on the size of the application, this would be stored in a database.
const links = [
  { name: 'Home', href: '/dashboard', icon: HomeIcon },
  {
    name: 'Remeras',
    href: '/dashboard/remeras',
    icon: ShirtImageIcon,
  },
  {
    name: 'Chombas',
    href: '/dashboard/poloshirts',
    icon: PoloShirtImageIcon,
  },
  {
    name: 'Buzos',
    href: '/dashboard/cottonsweaters',
    icon: CottonSweaterImageIcon,
  },
  {
    name: 'Camperas',
    href: '/dashboard/jackets',
    icon: JacketImageIcon,
  },
  {
    name: 'Jeans',
    href: '/dashboard/jeans',
    icon: JeanImageIcon,
  },
  {
    name: 'Bermudas',
    href: '/dashboard/shorts',
    icon: ShortPantImageIcon,
  },
  {
    name: 'Bags',
    href: '/dashboard/bags',
    icon: BagImageIcon,
  },
  {
    name: 'Gorros',
    href: '/dashboard/caps',
    icon: CapImageIcon,
  }
];

export default function NavLinks() {
  return (
    <>    
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            href={link.href}
            className="flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 md:flex-none md:justify-start md:p-2 md:px-3"
          >
            <LinkIcon className="w-6"/>
            <p className="hidden md:block">{link.name}</p>
          </Link>
        );
      })}
      
    </>
  );
}
