import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { Textarea } from "./ui/textarea"
import { cn } from "@/lib/utils"
import { ENVIRONMENT } from "@/lib/env"
import { useToast } from "@/hooks/use-toast"

const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().min(1, "Email is required").email("Invalid email address"),
  message: z.string().min(1, "Message is required").max(500, "Message must be less than 500 characters"),
})

type FormValues = z.infer<typeof formSchema>

export default function ContactForm() {
    const { toast } = useToast();
    const form = useForm<FormValues>({
          resolver: zodResolver(formSchema),
          defaultValues: {
              name: "",
              email: "",
              message: "",
          },
      });
    
    const onSumbit = async (values: FormValues) => {
        // Here you would typically send the form data to your backend
        try {
             const result = await fetch(ENVIRONMENT.FORM_URL,{
                method:"POST",
                headers: {"Content-Type" : "application/json"},
                body: JSON.stringify(values)
            });
            
            toast({
                title: `Sent!`,
                description: "Your message has been sent."
            });

            form.reset();
        } catch (error) {
            toast({
                title: "Uh oh, something went wrong.",
                description: "There is a problem handling your request. please try again.",
                variant: "destructive"
            });
        }
    };

    return (
        <Form {...form}>
            <form action="" onSubmit={form.handleSubmit(onSumbit)} className="space-y-2">
                <FormField
                    name="name"
                    render={({ field, fieldState }) => (
                        <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Input
                                    {...field}
                                    className={cn({
                                        "border-destructive": fieldState.error,
                                    })}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    name="email"
                    render={({ field, fieldState }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input
                                    type="email"
                                    {...field}
                                    className={cn({
                                        "border-destructive": fieldState.error,
                                    })}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    name="message"
                    render={({ field, fieldState }) => (
                        <FormItem>
                            <FormLabel>Message</FormLabel>
                            <FormControl>
                                <Textarea
                                    rows={4}
                                    {...field}
                                    className={cn({
                                        "border-destructive": fieldState.error,
                                    })}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button type="submit" className="w-full">
                    Send Message
                </Button>
            </form>
        </Form>
    );
}