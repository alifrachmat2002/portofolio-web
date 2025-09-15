"use client"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/shadcn-io/spinner";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Eye, EyeClosed } from "lucide-react";
import useRegister from "./useRegister";

export default function RegisterPage() {
    // const { form, onSubmit, visible, handleChangeVisibility } = useRegister();
    return (
        <div className="min-h-screen flex justify-center items-center">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 pb-2">
                gk mw
            </h2>
            {/* <section className="bg-white dark:bg-gray-800 border-2 rounded-xl p-8 min-w-[500px]">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 border-b border-gray-200 dark:border-gray-700 pb-2">
                    How'd you get here, ma boi
                </h2>
                {form.formState.errors.root && (
                    <Alert variant="destructive" className="mb-4">
                        <AlertTitle>Error!</AlertTitle>
                        <AlertDescription>
                            <p>{form.formState.errors.root.message}</p>
                        </AlertDescription>
                    </Alert>
                )}
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-4"
                    >
                        <FormField
                            name="name"
                            render={({ field, fieldState: { error } }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            className={cn({
                                                "border-destructive": error,
                                            })}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            name="email"
                            render={({ field, fieldState: { error } }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            className={cn({
                                                "border-destructive": error,
                                            })}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            name="password"
                            render={({ field, fieldState: { error } }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <div className="relative">
                                            <Input
                                                type={
                                                    visible
                                                        ? "text"
                                                        : "password"
                                                }
                                                {...field}
                                                className={cn({
                                                    "border-destructive": error,
                                                })}
                                            />
                                            <Button
                                                variant="link"
                                                type="button"
                                                className="absolute top-0 right-0"
                                                onClick={handleChangeVisibility}
                                            >
                                                {visible ? (
                                                    <EyeClosed />
                                                ) : (
                                                    <Eye />
                                                )}
                                            </Button>
                                        </div>
                                    </FormControl>

                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <Button
                            type="submit"
                            className="w-full"
                            disabled={form.formState.isSubmitting}
                        >
                            {form.formState.isSubmitting && (
                                <Spinner variant="ring" />
                            )}
                            Register
                        </Button>
                    </form>
                </Form>
            </section> */}
        </div>
    );
}
