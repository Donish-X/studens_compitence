'use client'

import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { signin } from "@/lib/api"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form"
import { useRouter } from "next/navigation"

const formSchema = z.object({
    username: z.string().min(2, {
        message: "Username must be at least 2 characters.",
    }),
    password: z.string().min(5, {
        message: "Username must be at least 5 characters.",
    }),
})

export function LoginForm() {

    const router = useRouter();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "",
            password: "",
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        await signin(values);
        router.push('/');
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <Card className="mx-auto max-w-sm">
                    <CardHeader>
                        <CardTitle className="text-2xl">Авторизация</CardTitle>
                        <CardDescription>
                            Введите свой username ниже, чтобы войти в свою учетную запись
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid gap-4">
                            <div className="grid gap-2">

                                <FormField
                                    control={form.control}
                                    name="username"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Username</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Введите свой username" {...field} />
                                            </FormControl>
                                            {/* <FormDescription>
                This is your public display name.
              </FormDescription> */}
                                            <FormMessage />
                                        </FormItem>

                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="password"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Пароль</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Введите пароль пользователя" {...field} />
                                            </FormControl>
                                            {/* <FormDescription>
                This is your public display name.
              </FormDescription> */}
                                            <FormMessage />
                                        </FormItem>

                                    )}
                                />

                            </div>
                            <Button type="submit" className="w-full bg-blue-600">
                                Войти
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </form>

        </Form>
    )
}
