import { Techstack } from "@/db/schema/techstacks";
import techstackService from "@/services/techstack.service"
import { useQuery } from "@tanstack/react-query"

const useHome = () => {
    const getTechstack = async () => {
            const result = await techstackService.getTechstacks();
    
            return result.data.data;
        }
    
        const {
            data: techstackData,
            isLoading : isLoadingTechstackData,
            isRefetching : isRefetchingTechstackData,
            isError : isErrorTechstackData,
        } = useQuery<Techstack[]>({
            queryKey: ['techstacks'],
            queryFn: getTechstack
        });

        return {
            techstackData,
            isErrorTechstackData,
            isLoadingTechstackData,
            isRefetchingTechstackData
        }
}

export default useHome;