import { TechstackForm, TechstackInsert, techstackSchema } from "@/db/schema/techstacks";
import { toast } from "@/hooks/use-toast";
import techstackService from "@/services/techstack.service";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";

const useAddTechstack = () => {
    const [isOpen, setIsOpen] = useState(false);

    const onOpenChange = (open : boolean) => {
        setIsOpen(open);
        form.reset();
    };

    const form = useForm<TechstackForm>({
        defaultValues: {
            name: "",
        },
        resolver: zodResolver(techstackSchema),
    });

    const addTechstack = async (payload : TechstackInsert) => {
        const result = await techstackService.addTechstack(payload);

        return result.data;
    }

    const queryClient = useQueryClient();

    const { mutateAsync: mutateAddTechstack } = useMutation({
        mutationFn: addTechstack,
        onSuccess: (data) => {
            toast({
                title: "Success",
                description: data.message
            })
            onOpenChange(false);
            queryClient.invalidateQueries({ queryKey: ['techstacks']})
        },
        onError: (error) => {
            toast({
                title: "Error",
                description: error.message || "Something went wrong",
                variant: "destructive"
            })
        }
    });

    const handleAddTechstack = async(payload: TechstackInsert) => {
        await mutateAddTechstack(payload);
    }

    return {
        isOpen,
        setIsOpen,
        onOpenChange,
        form,
        handleAddTechstack
    }
};

export default useAddTechstack;