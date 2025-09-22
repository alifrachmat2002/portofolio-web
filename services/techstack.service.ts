import instance from "@/lib/axios";
import { endpoint } from "./endpoint.constant";

export default {
    getTechstacks: (params?: string) => instance.get(`${endpoint.TECHSTACK}/${params}`)
};