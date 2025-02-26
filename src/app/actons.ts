"use server"
import { signIn, signOut } from "@/lib/auth";

export const googleSignIn = async () => {
    await signIn("google")
}

export const githubSignIn = async () => {
    await signIn("github")
}

export const signOutUser = async () => {
    await signOut()
}