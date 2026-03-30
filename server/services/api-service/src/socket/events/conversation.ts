export const registerConversationEvents = (io: any, socket: any) => {

    socket.on("join-conversation", (conversationId: string) => {
        socket.join(`conversation:${conversationId}`);
        console.log(`Socket joined room: conversation:${conversationId}`);
    });

    socket.on("leave-conversation", (conversationId: string) => {
        socket.leave(`conversation:${conversationId}`);
        console.log(`Socket left room: conversation:${conversationId}`);
    });

};
