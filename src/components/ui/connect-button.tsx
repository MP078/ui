import React, { useState } from "react";
import { Button } from "./button";
import { ConfirmationDialog } from "./confirmation-dialog";

export interface ConnectButtonProps {
  username: string;
  name: string;
  status: "none" | "requested" | "connected";
  variant?: "default" | "outline";
  size?: "sm" | "md" | "lg";
  className?: string;
  onConnect: (username: string) => void;
  onDisconnect: (username: string) => void;
}

export function ConnectButton({
  username,
  name,
  status,
  variant = "default",
  size = "md",
  className,
  onConnect,
  onDisconnect,
}: ConnectButtonProps) {
  const [showConnectConfirmation, setShowConnectConfirmation] = useState(false);
  const [showDisconnectConfirmation, setShowDisconnectConfirmation] =
    useState(false);
  const [showUnrequestConfirmation, setShowUnrequestConfirmation] =
    useState(false);

  const handleClick = () => {
    switch (status) {
      case "connected":
        setShowDisconnectConfirmation(true);
        break;
      case "requested":
        setShowUnrequestConfirmation(true);
        break;
      case "none":
        setShowConnectConfirmation(true);
        break;
    }
  };

  const getButtonText = () => {
    switch (status) {
      case "connected":
        return "Connected";
      case "requested":
        return "Requested";
      default:
        return "Connect";
    }
  };

  const getButtonStyle = () => {
    if (status === "none") {
      return variant;
    }
    return "outline";
  };

  const getButtonHoverClass = () => {
    if (status === "requested") {
      return "hover:bg-red-50 hover:text-red-600 hover:border-red-200";
    }
    return "";
  };

  return (
    <>
      <Button
        variant={getButtonStyle()}
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
        isOpen={showUnrequestConfirmation}
        onClose={() => setShowUnrequestConfirmation(false)}
        onConfirm={() => {
          onDisconnect(username);
          setShowUnrequestConfirmation(false);
        }}
        title="Cancel Connection Request"
        message={`Would you like to cancel your connection request to ${name}?`}
        confirmText="Cancel Request"
        type="warning"
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
