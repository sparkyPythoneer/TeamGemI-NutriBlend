import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

async function loginUser(userData) {
    try {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/user/auth/login/`, userData);
        return response.data;
    } catch (error) {
        throw error;
    }
}


export const useSignUp = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: loginUser,
        onSuccess: () => {
          
        },
    });
};
export default useSignUp;
