'use client'

import {
    LibraryBig,
    Logs,
    ClipboardList,
    Contact,
    LayoutList,
    Brain,
    LogOut,
    UserRound
} from "lucide-react"

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    // SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { deleteCookie } from "cookies-next/client";

// Menu items.
const items = [
    // {
    //     title: "Профиль",
    //     url: "/profile",
    //     icon: UserRound,
    // },
    {
        title: "Журнал",
        url: "/electronic-journal",
        icon: Logs,
    },
    {
        title: "Расписание",
        url: "/lesson-schedule",
        icon: ClipboardList,
    },
    {
        title: "Список учеников",
        url: "/list-students",
        icon: Contact,
    },
    {
        title: "Предметы",
        url: "/subjects",
        icon: LayoutList,
    },
    {
        title: "Компетенции",
        url: "/competencies",
        icon: Brain,
    },
    {
        title: "Отчёты",
        url: "/reports",
        icon: LibraryBig,
    },
]

export function AppSidebar() {
    const pathname = usePathname();

    const router = useRouter();

    function clickLogout() {
        // deleteCookie("accessToken");
        router.push('/login');
    }

    return (
        <Sidebar collapsible="icon" variant="floating">
            <SidebarContent>
                <SidebarGroup>
                    {/* <SidebarGroupLabel>Application</SidebarGroupLabel> */}
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {items.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild isActive={pathname === item.url}>
                                        <Link href={item.url}>
                                            <item.icon />
                                            <span>{item.title}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>

            <SidebarFooter>
                <SidebarMenuButton
                    onClick={clickLogout}
                    className="mb-1"
                >
                    <LogOut />
                    <span>Выйти</span>
                </SidebarMenuButton>
            </SidebarFooter>
        </Sidebar>
    )
}

// export function AppSidebar() {
//     return (
//         <Sidebar collapsible="icon">
//             <SidebarContent>
//                 <SidebarGroup>
//                     {/* <SidebarGroupLabel>Application</SidebarGroupLabel> */}
//                     <SidebarGroupContent>
//                         <SidebarMenu>
//                             {items.map((item) => (
//                                 <SidebarMenuItem key={item.title}>
//                                     <SidebarMenuButton asChild size={"lg"} className="pl-2">
//                                         <a href={item.url} className="min-h-14" >
//                                             <item.icon className="min-h-6 min-w-6 flex justify-center items-center" />
//                                             <span className="text-lg">{item.title}</span>
//                                         </a>
//                                     </SidebarMenuButton>
//                                 </SidebarMenuItem>
//                             ))}
//                         </SidebarMenu>
//                     </SidebarGroupContent>
//                 </SidebarGroup>
//             </SidebarContent>
//         </Sidebar>
//     )
// }


// export function AppSidebar() {
//     return (
//         <Sidebar collapsible="icon">
//             <SidebarContent>
//                 <SidebarGroup>
//                     {/* <SidebarGroupLabel>Application</SidebarGroupLabel> */}
//                     <SidebarGroupContent>
//                         <SidebarMenu>
//                             {items.map((item) => (
//                                 <SidebarMenuItem key={item.title} className="h-12">
//                                     <SidebarMenuButton asChild size={"lg"}>
//                                         <a href={item.url}>
//                                             <item.icon className="min-h-10 min-w-10 p-2" />
//                                             <span className="text-lg">{item.title}</span>
//                                         </a>
//                                     </SidebarMenuButton>
//                                 </SidebarMenuItem>
//                             ))}
//                         </SidebarMenu>
//                     </SidebarGroupContent>
//                 </SidebarGroup>
//             </SidebarContent>
//         </Sidebar>
//     )
// }
