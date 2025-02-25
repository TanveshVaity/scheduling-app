import Image from "next/image";
import Link from "next/link";
import Logo from "../../public/logo.png";
import { Button } from "./ui/button";

export default function Navbar(){
    return (
        <div className="flex py-5 items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
                <Image src={Logo} alt="logo" className="size-10"/>
                <h4 className="text-2xl font-semibold">Scheduling App</h4>
            </Link>
            <Button>Try for free</Button>
        </div>
    )
}