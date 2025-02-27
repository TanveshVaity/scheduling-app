"use client"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog";
import { Button } from "./ui/button";
import Image from "next/image";
import Logo from "../../public/logo.png";
import SubmitButton from "./SubmitButton";
import { githubSignIn, googleSignIn } from "@/app/actons";
import googleLogo from "../../public/google.svg";
import githubLogo from "../../public/github.svg";

export default function AuthModel(){
    return(
        <Dialog>
            <DialogTrigger asChild>
                <Button>
                    Try for Free
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[360px]">
                <DialogHeader className="flex flex-row items-center gap-2">
                    <Image src={Logo} alt="logo" className="size-10"/>
                    <h4 className="text-2xl font-semibold">Scheduling App</h4>
                </DialogHeader>
                <DialogTitle className="flex justify-center text-semibold">Sign In</DialogTitle>
                <div className="flex flex-col gap-4 mt-5">
                    <form action={googleSignIn}>
                        <SubmitButton src={googleLogo} variant={"outline"} name="Sign in with Google"/>
                    </form>
                    <form action={githubSignIn}>
                        <SubmitButton src={githubLogo} variant={"outline"} name="Sign in with Github"/>
                    </form>
                </div>
            </DialogContent>
        </Dialog>
    )
}