import api from "./api"

export const fetchConversations = async () => {
    const res = await api.get('/conversations');
    return res.data.conversations;
}