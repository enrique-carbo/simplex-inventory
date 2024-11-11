import LogoutButton from '@/app/ui/logout';

export default function DashboardPage(){
    return  <div className='flex justify-between'>
                <h1 className='w-full text-2xl'>Dashboard Simplex</h1>
                <div className='ml-auto'>
                    <LogoutButton />
                </div>
            </div>
        
}