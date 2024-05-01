import { Axios } from "@/lib/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

async function chatWithAI(userData) {
    try {
        const response = await Axios.post("/ai/chat/", userData);
        return response.data;
    } catch (error) {
        throw error;
    }
}


export const useStartChat = () => {

    return useMutation({
        mutationFn: chatWithAI,
        onSuccess: () => {

        },
    });
};
export default useStartChat;
