import React, { useState } from 'react';
import { ChatInterface } from '../components/chat/chat-interface';
import { ChatSidePanel } from '../components/chat/ChatSidePanel';
import { ChatContextMenu } from '../components/chat/ChatContextMenu';
import { ConfirmationModal } from '../components/chat/ConfirmationModal';

export default function Messages() {
  const [sidePanelOpen, setSidePanelOpen] = useState(false);
  const [contextMenu, setContextMenu] = useState({
    isOpen: false,
    position: { x: 0, y: 0 }
  });
  const [confirmationModal, setConfirmationModal] = useState({
    isOpen: false,
    action: '',
    title: '',
    message: ''
  });

  const handleContextMenuAction = (action: string) => {
    if (action === 'unfriend' || action === 'block') {
      setConfirmationModal({
        isOpen: true,
        action,
        title: action === 'unfriend' ? 'Unfriend User' : 'Block User',
        message: action === 'unfriend'
          ? 'Are you sure you want to unfriend this user? You will no longer be able to see their updates or send them messages.'
          : 'Are you sure you want to block this user? They will not be able to contact you or see your profile.'
      });
    } else {
      // Handle other actions
      console.log('Action:', action);
    }
  };

  return (
    <div className="relative h-[calc(100vh-64px)]">
      <ChatInterface
        onOpenSidePanel={() => setSidePanelOpen(true)}
        onContextMenu={(e, chatId) => {
          e.preventDefault();
          setContextMenu({
            isOpen: true,
            position: { x: e.clientX, y: e.clientY }
          });
        }}
      />

      <ChatSidePanel
        isOpen={sidePanelOpen}
        onClose={() => setSidePanelOpen(false)}
        chatId="current-chat-id"
      />

      <ChatContextMenu
        isOpen={contextMenu.isOpen}
        onClose={() => setContextMenu({ ...contextMenu, isOpen: false })}
        position={contextMenu.position}
        onAction={handleContextMenuAction}
      />

      <ConfirmationModal
        isOpen={confirmationModal.isOpen}
        onClose={() => setConfirmationModal({ ...confirmationModal, isOpen: false })}
        onConfirm={() => {
          console.log('Confirmed:', confirmationModal.action);
          // Handle confirmation action
        }}
        title={confirmationModal.title}
        message={confirmationModal.message}
        action={confirmationModal.action === 'unfriend' ? 'Unfriend' : 'Block'}
      />
    </div>
  );
}