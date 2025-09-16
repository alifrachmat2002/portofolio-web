import { toast } from "@/hooks/use-toast";
import { authClient } from "@/lib/auth-client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";

const loginSchema = z.object({
    email: z.string().min(1, "Email is Required").email(),
    password: z.string().min(1, "Password is Required")
});

type LoginForm = z.infer<typeof loginSchema>;

const useLogin = () => {
    const router = useSearchParams();
    const callbackUrl : string = router.get('callbackUrl') as string || "/admin";

    const [visible, setIsVisible] = useState<boolean>(false);

    const handleChangeVisibility = () => setIsVisible((prev) => !prev);

    const form = useForm<LoginForm>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: ""
        }
    });

    const onSubmit = async(values: LoginForm) => {
        try {
            const { error } = await authClient.signIn.email({
                ...values,
                callbackURL: callbackUrl,
            });
            if (error) {
                if (error?.message) {
                    form.setError("root", error);
                }
                toast({
                    title: "Error",
                    description: `${error?.statusText} - ${error.message}`,
                });
            }
        } catch (error) {
            const err = error as unknown as Error;
            toast({
                title: "Error",
                description: err.message,
            });
        }
        
    }

    return {
        form,
        onSubmit,
        visible,
        handleChangeVisibility
    }
}

export default useLogin;