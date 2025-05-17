import { useState } from "react";
import { Button } from "./button";
import { ConfirmationDialog } from "./confirmation-dialog";

export interface ConnectButtonProps {
  username: string;
  name: string;
  status: "none" | "sent" | "friends" | "received";
  variant?: "default" | "outline";
  size?: "sm" | "md" | "lg";
  className?: string;
  onConnect: (username: string) => void;
  onDisconnect: (username: string) => void;
  onCancel: (username: string) => void;
}

export function ConnectButton({
  onCancel,
  username,
  name,
  status,
  size = "md",
  className,
  onConnect,
  onDisconnect,
}: ConnectButtonProps) {
  const [showConnectConfirmation, setShowConnectConfirmation] = useState(false);
  const [showDisconnectConfirmation, setShowDisconnectConfirmation] =
    useState(false);

  const handleClick = () => {
    switch (status) {
      case "friends":
        setShowDisconnectConfirmation(true);
        break;
      case "sent":
        onCancel(username);
        break;
      case "none":
        setShowConnectConfirmation(true);
        break;
    }
  };

  const getButtonText = () => {
    switch (status) {
      case "friends":
        return "Connected";
      case "sent":
        return "Requested";
      case "received":
        return "Accept";
      default:
        return "Connect";
    }
  };

  const getButtonHoverClass = () => {
    if (status === "sent") {
      return "hover:bg-red-50 hover:text-red-600 hover:border-red-200";
    }
    return "";
  };

  return (
    <>
      <Button
        variant="default"
        size={size}
        onClick={handleClick}
        className={`${className} ${getButtonHoverClass()}`}
      >
        {getButtonText()}
      </Button>

      <ConfirmationDialog
        isOpen={showConnectConfirmation}
        onClose={() => setShowConnectConfirmation(false)}
        onConfirm={() => {
          onConnect(username);
          setShowConnectConfirmation(false);
        }}
        title="Connect with Traveler"
        message={`Would you like to connect with ${name}? They will be notified of your request.`}
        confirmText="Send Request"
        type="info"
      />

      <ConfirmationDialog
        isOpen={showDisconnectConfirmation}
        onClose={() => setShowDisconnectConfirmation(false)}
        onConfirm={() => {
          onDisconnect(username);
          setShowDisconnectConfirmation(false);
        }}
        title="Disconnect from Traveler"
        message={`Are you sure you want to disconnect from ${name}? This action cannot be undone.`}
        confirmText="Disconnect"
        type="danger"
      />
    </>
  );
}
