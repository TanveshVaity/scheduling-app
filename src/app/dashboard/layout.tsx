import Image from "next/image";
import Link from "next/link";
import Logo from "../../../public/logo.png";
import DashboardLink from "@/components/DashboardLink";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { signOutUser } from "../actons";
import { requireUser } from "@/lib/hooks";


export default async function DashboardLayout({children}: Readonly<{children: React.ReactNode}>) {
    const session = await requireUser();
    return (
        <>
            <div className="min-h-screen w-full grid md:gid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
                <div className="hidden md:block boder-r bg-muted/40">
                    <div className="flex h-full max-h-screen flex-col gap-2">
                        <div className="flex h-14 items-center  border-b px-4 lg:h-[60px] lg:px-6">
                            <Link href="/" className="flex items-center gap-2">
                                <Image src={Logo} alt="Logo" className="size-8" />
                                <p className="font-semibold text-xl">Scheduling App</p>
                            </Link>
                        </div>
                        <div className="flex-1">
                            <nav className="grid items-start px-2 lg:px-4">
                                <DashboardLink />   
                            </nav>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col">
                    <header className="flex h-14 itmes-center border-b px-4 lg:h-[60px] lg:px-6 bg-muted">
                        <Sheet>
                            <SheetTrigger asChild>
                                <Button className="md:hidden shrink-0 mt-2" size="icon" variant="outline">
                                    <Menu size={5}/>
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="left" className="flex flex-col gap-4">
                                <SheetHeader>
                                    <SheetTitle>Menu</SheetTitle>
                                    <SheetDescription>
                                        <nav className="grid items-start px-2 lg:px-4">
                                            <DashboardLink />
                                        </nav>
                                    </SheetDescription>
                                </SheetHeader>
                            </SheetContent>
                        </Sheet>
                        
                        <div className="ml-auto flex items-center gap-x-4">
                            <ThemeToggle />
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="secondary" size="icon" className="rounded-full">
                                        <Image 
                                            src={session?.user?.image as string} 
                                            alt="Profile"
                                            height={20} 
                                            width={20}
                                            className="w-full h-full rounded-full"
                                        />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem asChild>
                                        <Link href="/dashboard/settings">
                                            Settings
                                        </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem asChild>
                                        <form className="w-full" action={signOutUser}>
                                            <button type="submit" className="w-full text-left">
                                                Sign Out
                                            </button>
                                        </form>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </header>
                    <main>
                        {children}
                    </main>
                </div>
            </div>
        </>
    )
}