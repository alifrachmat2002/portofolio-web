import { TechstackForm, TechstackInsert, techstackSchema } from "@/db/schema/techstacks";
import { toast } from "@/hooks/use-toast";
import techstackService from "@/services/techstack.service";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";

const useEditTechstack = () => {
    const form = useForm<TechstackForm>({
        defaultValues: {
            name: "",
        },
        resolver: zodResolver(techstackSchema),
    });

    const editTechstack = async (id: string, payload : TechstackInsert) => {
        const result = await techstackService.editTechstack(id, payload);

        return result.data;
    }

    const queryClient = useQueryClient();

    const { 
        mutateAsync: mutateEditTechstack,
        isPending: isPendingEditTechstack,
        isError: isErrorEditTechstack,
        isSuccess: isSuccessEditTechstack,
     } = useMutation({
        mutationFn: (variables : { id: string, payload: TechstackInsert}) => editTechstack(variables.id, variables.payload),
        onSuccess: (data) => {
            toast({
                title: "Success",
                description: data.message
            })
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

    return {
        form,
        mutateEditTechstack, 
        isErrorEditTechstack,
        isPendingEditTechstack,
        isSuccessEditTechstack
    }
};

export default useEditTechstack;