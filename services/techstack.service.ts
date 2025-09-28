import instance from "@/lib/axios";
import { endpoint } from "./endpoint.constant";
import { TechstackInsert } from "@/db/schema/techstacks";

export default {
    getTechstacks: (params?: string) => instance.get(`${endpoint.TECHSTACK}`),
    addTechstack: async (payload: TechstackInsert) => instance.post(`${endpoint.TECHSTACK}`, payload),
    deleteTechstack: async (id: string) => instance.delete(`${endpoint.TECHSTACK}/${id}`)
};