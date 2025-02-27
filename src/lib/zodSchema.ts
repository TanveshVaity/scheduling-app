import { conformZodMessage } from "@conform-to/zod";
import { custom, z } from "zod";

export const onboardingSchema = z.object({
    name : z.string().min(3).max(150),
    username : z.string().min(3).max(150).regex(/^[a-zA-Z0-9-]+$/, {
        message : "Username can only contains letters, numbers and -"
    }),

})

export const onboardingSchemaValidation = (options ?: {
    isUsernameUnique: () => Promise<boolean>
}) =>{
    return z.object({
        username : z.string().min(3).max(150).regex(/^[a-zA-Z0-9-]+$/, {
            message : "Username can only contains letters, numbers and -"
        })
        .pipe(
            z.string().superRefine((_ , ctx) =>{
                if(typeof options?.isUsernameUnique !== "function"){
                    ctx.addIssue({
                        code : "custom",
                        message : conformZodMessage.VALIDATION_UNDEFINED,
                        fatal : true,
                    })
                    return;
                }
                return options.isUsernameUnique().then((isUnique) =>{
                    if(!isUnique){
                        ctx.addIssue({
                            code : "custom",
                            message : "Username is already exist",
                        })
                    }
                })
            })
        ),
        name : z.string().min(3).max(150),
    })
}