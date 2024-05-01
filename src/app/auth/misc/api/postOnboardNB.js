import { Axios } from "@/lib/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

async function onboardUser(userData) {
    try {
        const response = await Axios.post(`/main/user-profiles/`, userData);
        return response.data;
    } catch (error) {
        throw error;
    }
}


export const useOnboardNB = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: onboardUser,
        onSuccess: () => {
          
        },
    });
};
export default useOnboardNB;
