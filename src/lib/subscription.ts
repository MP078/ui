import { getConsumer } from "./cable";

export function subscribeToChat(conversationId: string, callbacks: {
    received: (data: unknown) => void,
    connected?: () => void,
    disconnected?: () => void,
}) {
    const consumer = getConsumer();
    return consumer.subscriptions.create(
        { channel: "ChatChannel", conversation_id: conversationId },
        {
            connected() { callbacks.connected?.(); },
            disconnected() { callbacks.disconnected?.(); },
            received(data) { callbacks.received(data); },
            sendMessage(data: object) { this.send(data); },
            markAsRead() { this.perform("mark_as_read", {}); }
        }
    );
}