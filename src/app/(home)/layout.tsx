'use client';

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { hasCookie } from "cookies-next/client";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const router = useRouter();
    const hasAccessToken = hasCookie('access');

    useEffect(() => {
        if (!hasAccessToken) router.push('/login');
    }, [hasAccessToken, router]);

    return (
        <SidebarProvider>
            <AppSidebar />
            <main className="flex-1">
                <SidebarTrigger className="sticky top-2" />
                {/* <Suspense> */}
                {children}
                {/* </Suspense> */}
            </main>
        </SidebarProvider>
    );
}
