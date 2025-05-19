import { createConsumer, Consumer } from "@rails/actioncable";

let consumer: Consumer | null = null;

export const getConsumer = (): Consumer => {
    if (!consumer) {
        consumer = createConsumer(`ws://localhost:3000/cable`);
    }
    return consumer;
};
