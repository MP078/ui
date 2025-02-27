import React from 'react';
import { ChatInterface } from './chat-interface';

export default function Messages() {
  return (
    <div className="w-full h-[calc(100vh-64px)]">
      <ChatInterface />
    </div>
  );
}