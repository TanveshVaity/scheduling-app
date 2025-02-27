"use client"
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useActionState } from "react";
import { onboardingAction } from "../actons";
import { useForm } from '@conform-to/react';
import { parseWithZod } from "@conform-to/zod";
import { onboardingSchema } from "@/lib/zodSchema";
import SubmitButton from "@/components/SubmitButton";

export default function OnboardingPage(){
    const [lastResult, action] = useActionState(onboardingAction, undefined);
    const [form, fields] = useForm({
        lastResult,
        onValidate({formData}) {
            return parseWithZod(formData, {schema : onboardingSchema})
        },
        shouldValidate : "onBlur",
        shouldRevalidate : "onInput"
    });
    
    return(
        <div className="min-h-screen w-screen flex items-center justify-center">
            <Card>
                <CardHeader>
                    <CardTitle>Welcome to scheduling app</CardTitle>
                    <CardDescription>We need following information to set up your profile!</CardDescription>
                </CardHeader>
                <form id={form.id} onSubmit={form.onSubmit} action={action} noValidate>
                    <CardContent className="flex flex-col gap-y-5">
                        <div className="grid gap-y-2">
                            <Label>Full Name</Label>
                            <Input 
                                name={fields.name.name} 
                                defaultValue={fields.name.initialValue}
                                key={fields.name.key}
                                placeholder="Name"
                            />
                            <p className="text-red-500 text-sm">{fields.name.errors}</p>
                        </div>
                        <div className="grid gap-y-2">
                            <Label>Username</Label>
                            <div className="flex rounded-md">
                                <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-muted bg-muted text-sm text-muted-foreground">
                                    SchedulingApp.com/
                                </span>
                                <Input 
                                    className="rounded-l-none" 
                                    placeholder="username"
                                    key={fields.username.key}
                                    name={fields.username.name}
                                    defaultValue={fields.username.initialValue}
                                />
                            </div>
                            <p className="text-red-500 text-sm">{fields.username.errors}</p>
                        </div>
                    </CardContent>
                    <CardFooter>
                        <SubmitButton variant="default" name="Submit"/>
                    </CardFooter>
                </form>
            </Card>
        </div>
    )
}