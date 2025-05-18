import { createConsumer } from '@rails/actioncable';

import type { Consumer, Subscription } from "@rails/actioncable";

// Use relative path for ActionCable consumer to ensure cookies are sent
let consumer: Consumer | null = null;

export const getConsumer = (): Consumer => {
    if (!consumer) {
        // Use relative path so browser sends session cookies
        consumer = createConsumer('/cable');
    }
    return consumer;
};

type ReceivedCallback = (data: unknown) => void;
type ConnectedCallback = () => void;
type DisconnectedCallback = () => void;

export const createChatSubscription = (
    conversationId: string | number,
    receivedCallback?: ReceivedCallback,
    connectedCallback?: ConnectedCallback,
    disconnectedCallback?: DisconnectedCallback
): Subscription => {
    const consumer = getConsumer();

    return consumer.subscriptions.create(
        { channel: 'ChatChannel', conversation_id: conversationId },
        {
            connected() {
                console.log(`Connected to conversation ${conversationId}`);
                if (connectedCallback) connectedCallback();
            },

            disconnected() {
                console.log(`Disconnected from conversation ${conversationId}`);
                if (disconnectedCallback) disconnectedCallback();
            },

            received(data: unknown) {
                console.log('Received message:', data);
                if (receivedCallback) receivedCallback(data);
            },

            // DO NOT override the built-in send method! Use a custom method name for sending messages.
            sendMessage(content: object) {
                this.perform('receive', { content });
            },

            markAsRead() {
                this.perform('mark_as_read', {});
            }
        }
    );
};

export const resetConsumer = (): void => {
    if (consumer) {
        consumer.disconnect();
        consumer = null;
    }
};