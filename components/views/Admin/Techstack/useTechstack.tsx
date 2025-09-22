import { Techstack } from "@/db/schema/techstacks";
import techstackService from "@/services/techstack.service";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";

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