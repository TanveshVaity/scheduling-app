"use server"
import { signIn, signOut } from "@/lib/auth";
import { requireUser } from "@/lib/hooks";
import { prisma } from "@/lib/prisma";
import { onboardingSchemaValidation } from "@/lib/zodSchema";
import { parseWithZod } from '@conform-to/zod';
import { redirect } from "next/navigation";

export const googleSignIn = async() => {
    await signIn("google")
}

export const githubSignIn = async() => {
    await signIn("github")
}

export const signOutUser = async() => {
    await signOut()
}

export const onboardingAction = async(prevState : any, formData : FormData) =>{
    const session = await requireUser();
    const submission = await parseWithZod(formData, {
        schema : onboardingSchemaValidation({
            async isUsernameUnique() {
                const existingUsername = await prisma.user.findUnique({
                    where : {
                        username : formData.get("username") as string,
                    }
                });
                return !existingUsername;
            }
        }),
        async : true,
    })


    if(submission.status !== "success"){
        return submission.reply();
    }

    const data = await prisma.user.update({
        where: {
            id : session.user?.id
        },
        data: {
            name : submission.value.name,
            username : submission.value.username
        }
    })

    redirect("/dashboard");
}

