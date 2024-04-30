import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

async function createNewUser(userData) {
    try {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/user/auth/register/`, userData);
        return response.data;
    } catch (error) {
        throw error;
    }
}


export const useSignUp = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createNewUser,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['fetch-created-jobs'],
            });
        },
    });
};
export default useSignUp;
