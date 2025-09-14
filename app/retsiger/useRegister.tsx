import { toast } from "@/hooks/use-toast";
import { authClient } from "@/lib/auth-client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";

const registerSchema = z.object({
    name: z.string().min(1, "Name is Required"),
    email: z.string().min(1, "Email is Required").email(),
    password: z.string().min(1, "Password is Required")
});

type RegisterForm = z.infer<typeof registerSchema>;

const useRegister = () => {
    const router = useSearchParams();
    const callbackUrl : string = router.get('callbackUrl') as string || "/";

    const [visible, setIsVisible] = useState<boolean>(false);

    const handleChangeVisibility = () => setIsVisible((prev) => !prev);

    const form = useForm<RegisterForm>({
        resolver: zodResolver(registerSchema)
    });

    const onSubmit = async(values: RegisterForm) => {
        try {
            const { error } = await authClient.signUp.email({
                ...values,
                callbackURL: callbackUrl,
            },
            {
                onSuccess() {
                    toast({
                        title: "Success",
                        description: "Signed Up Successfully!"
                    })
                }
            }
        );
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

export default useRegister;