import api from "./api";

export const setUsername = async (username: string) => {
    const res = await api.post("/user/set-username", {username});
    return res.data.data;
}