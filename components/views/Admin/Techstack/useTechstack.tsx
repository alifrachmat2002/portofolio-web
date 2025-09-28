import { Techstack, TechstackForm, techstackSchema } from "@/db/schema/techstacks";
import techstackService from "@/services/techstack.service";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function useTechstack() {

    const getTechstack = async () => {
        const result = await techstackService.getTechstacks();

        return result.data.data;
    }

    const {
        data: techstackData,
        isLoading,
        isRefetching,
        isError,
    } = useQuery<Techstack[]>({
        queryKey: ['techstacks'],
        queryFn: getTechstack
    });

    return {
        techstackData,
        isLoading,
        isRefetching,
        isError
    }
}