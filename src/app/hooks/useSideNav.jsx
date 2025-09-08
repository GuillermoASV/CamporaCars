'use client';
import { Button } from '@/components/ui/button';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { GetCurrentYear } from '@/utils/fecha-actual';
import { Coins, History, ListTodo, LogOut, SprayCan, UserCog } from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Loading } from './useLoading';

const referencias = [
  { title: 'Tareas', href: '/todoapp', icon: <ListTodo /> },
  { title: 'Presupuesto', href: '/presupuesto', icon: <Coins /> },
  { title: 'Historial', href: '/historial', icon: <History /> },
  { title: 'Configuración', href: '/setting', icon: <UserCog /> },
];

export default function AppSidebar() {
  const router = useRouter();
  const PATHNAME = usePathname();

  const handleLogout = async () => {
    await fetch('/api/logout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    router.push('/login');
  };
  //group-data-[collapsible=icon]:
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className={'p-0'} />
      <SidebarContent className={'no-scrollbar overflow-hidden'}>
        <SidebarGroup />
        <SidebarGroupLabel
          className={
            'mb-8 block w-[13rem] text-center text-2xl font-black text-red-700 backdrop-blur'
          }
        >
          <SprayCan className="float-left mt-3 mr-2 ml-3 block scale-260 justify-between rounded-l-sm bg-gradient-to-br from-blue-500 via-green-500 to-red-700 text-black duration-200" />
          Campora Cars
        </SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu className={''}>
            {referencias.map((i) => {
              const href = `/menu/${i.href}`;
              return (
                //className={'rounded-none'}
                <SidebarMenuItem key={i.title}>
                  <Tooltip delayDuration={1000}>
                    <TooltipTrigger asChild>
                      <ul key={i.title}>
                        <Link
                          href={href}
                          prefetch={false}
                          className={`flex w-full items-center rounded-2xl p-2 pr-9 text-base font-medium hover:text-red-600 focus:font-bold focus:underline active:duration-200 ${PATHNAME === href ? 'font-bold underline' : ''} `}
                        >
                          <span className="float-left mt-1 mr-1.5 block text-2xl group-data-[collapsible=icon]:mt-1 group-data-[collapsible=icon]:ml-0 group-data-[collapsible=icon]:transition-all group-data-[collapsible=icon]:duration-50">
                            {i.icon ? i.icon : <ListTodo />}
                          </span>
                          <span
                            className={`${PATHNAME === '/menu' ? 'font-bold underline' : ''} flex-1 text-base font-medium group-data-[collapsible=icon]:scale-0 active:scale-98 active:ease-out`} //group-data-[collapsible=icon]:hidden quite esto que es lo que cancela la animacion
                          >
                            {i.title}

                            <div>
                              <TooltipContent side="right">{i.title}</TooltipContent>
                            </div>
                          </span>
                          <div className="group-data-[collapsible=icon]:hidden">
                            <Loading className="ease-out" />
                          </div>
                        </Link>
                      </ul>
                    </TooltipTrigger>
                  </Tooltip>
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </SidebarGroupContent>
        <SidebarGroup />
      </SidebarContent>
      <SidebarFooter className={'p-0'}>
        <SidebarGroup className={'flex flex-col items-center'}>
          <SidebarGroupLabel className={'easy-in flex w-[13rem] justify-center font-bold'}>
            &copy; <GetCurrentYear></GetCurrentYear> - Campora Cars
          </SidebarGroupLabel>
          <Button
            className={
              'flex w-full justify-center-safe bg-red-600 text-center group-data-[collapsible=icon]:mx-auto group-data-[collapsible=icon]:min-w-8 group-data-[collapsible=icon]:flex-col group-data-[collapsible=icon]:items-center hover:bg-red-400 hover:text-black'
            }
            onClick={handleLogout}
          >
            <LogOut className="scale-125" />{' '}
            <p className="group-data-[collapsible=icon]:scale-0 active:scale-98 active:ease-out">
              Salir
            </p>
          </Button>
        </SidebarGroup>
      </SidebarFooter>
    </Sidebar>
  );
}
