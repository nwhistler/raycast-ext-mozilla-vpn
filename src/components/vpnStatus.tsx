import React, { useState } from 'react';
import { List, ActionPanel, Action } from '@raycast/api';

interface VpnStatusProps {
  vpnStatus: boolean | null;
  serverCity: string;
  onToggleVpn: () => void;
}

const VpnStatus: React.FC<VpnStatusProps> = ({
  vpnStatus,
  serverCity,
  onToggleVpn,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleToggleVpn = async () => {
    setIsLoading(true);
    await onToggleVpn();
    setIsLoading(false);
  };

  const vpnStatusText = vpnStatus ? "Deactivate Mozilla VPN" : "Activate Mozilla VPN";
  const vpnStatusAction = vpnStatus ? "Deactivate VPN" : "Activate VPN";
  const statusText = vpnStatus ? "Connected" : "Disconnected";

  return (
    <List.Item
      title={vpnStatusText}
      subtitle={`VPN Server City: ${serverCity}`}
      accessories={[{ text: `Status: ${statusText}` }]}
      actions={
        <ActionPanel>
          <Action
            title={vpnStatusAction}
            onAction={handleToggleVpn}
            shortcut={{ modifiers: ["cmd"], key: "k" }}
            icon={isLoading ? "⏳" : undefined}
          />
        </ActionPanel>
      }
    />
  );
};

export default VpnStatus;
