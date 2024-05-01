import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

async function onboardUser(userData) {
    try {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/main/user-profiles/`, userData);
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
