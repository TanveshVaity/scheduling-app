"use client";
import { cn } from "@/lib/utils";
import { HomeIcon, Settings, User2, CalendarCheck, LucideProps } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import path from "path";
import { ForwardRefExoticComponent, RefAttributes } from "react";

interface DashboardLinkProps {
    id: number;
    name: string;
    url: string;
    icon: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>;
}

export const dashboardLinks : DashboardLinkProps[] = [
    {
        id : 0,
        name : "Events",
        url : "/dashboard",
        icon : HomeIcon
    },
    {
        id : 1,
        name : "Meetings",
        url : "/dashboard/meetings",
        icon : User2,
    },
    {
        id : 2,
        name : "Availability",
        url : "/dashboard/availability",
        icon : CalendarCheck
    },
    {
        id : 3,
        name : "Settings",
        url : "/dashboard/settings",
        icon : Settings
    }

]

export default function DashboardLink() {
    const pathname = usePathname();
    return (
        <>
            {
                dashboardLinks.map((link) => {
                    const Icon = link.icon;
                    return (
                        <Link 
                            href={link.url} 
                            key={link.id} 
                            className={cn(
                                pathname === link.url ? "bg-primary/10 text-primary" : "text-zinc-500 hover:text-foreground ",
                                "flex items-center gap-3 mt-2 px-3 py-2 rounded-lg transition-all hover:text-primary"
                            )}
                        >
                            <Icon size={24}/>
                            <p>{link.name}</p>
                        </Link>
                    )
                })
            }
        </>
    )
}