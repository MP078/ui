import { createConsumer, Consumer, Subscription } from '@rails/actioncable';

let consumer: Consumer | null = null;

export const getConsumer = (): Consumer => {

    const token = localStorage.getItem('access_token');
    if (!consumer) {
        // Make sure to include credentials
        const wsUrl = 'ws://localhost:3000/cable?token=' + token;
        consumer = createConsumer(wsUrl);

        // Add connection monitoring
        // consumer.connection.monitor.start(); // Not needed, handled internally

        // Debug events (ActionCable does not provide 'on' method for connection events directly)
        // You can use the subscription callbacks for connection events instead
    }

    return consumer;
};

export const createChatSubscription = (
    conversationId: string | number,
    receivedCallback: (data: unknown) => void
): Subscription => {
    const consumer = getConsumer();

    return consumer.subscriptions.create(
        {
            channel: 'ChatChannel',
            conversation_id: conversationId
        },
        {
            connected() {
                console.log(`Connected to conversation ${conversationId}`);
            },

            disconnected() {
                console.log(`Disconnected from conversation ${conversationId}`);
            },

            received(data: unknown) {
                console.log('Received message:', data);
                receivedCallback(data);
            },

            send(content: unknown) {
                this.perform('receive', { content });
            },

            markAsRead() {
                this.perform('mark_as_read', {});
            }
        }
    );
};