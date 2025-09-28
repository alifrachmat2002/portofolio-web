import { TechstackForm, TechstackInsert, techstackSchema } from "@/db/schema/techstacks";
import { toast } from "@/hooks/use-toast";
import techstackService from "@/services/techstack.service";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";

const useDeleteTechstack = () => {
    const [isOpen, setIsOpen] = useState(false);

    const onOpenChange = (open: boolean) => {
        setIsOpen(open);
    };

    const deleteTechstack = async (id: string) => {
        const result = await techstackService.deleteTechstack(id);

        return result.data;
    };

    const queryClient = useQueryClient();

    const {
        mutateAsync: mutateDeleteTechstack,
        isSuccess: isSuccessDeleteTechstack,
        isError: isErrorDeleteTechstack,
        isPending: isPendingDeleteTechstack,
    } = useMutation({
        mutationFn: deleteTechstack,
        onSuccess: (data) => {
            toast({
                title: "Success",
                description: data.message,
            });
            onOpenChange(false);
            queryClient.invalidateQueries({ queryKey: ["techstacks"] });
        },
        onError: (error) => {
            toast({
                title: "Error",
                description: error.message || "Something went wrong",
                variant: "destructive",
            });
        },
    });

    const handleDeleteTechstack = async (id: string) => {
        await mutateDeleteTechstack(id);
    };

    return {
        handleDeleteTechstack,
        isSuccessDeleteTechstack,
        isErrorDeleteTechstack,
        isPendingDeleteTechstack
    };
};

export default useDeleteTechstack;