import { client } from "@/app/client";
import { ConnectButton } from "thirdweb/react";
import { inAppWallet } from "thirdweb/wallets";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

const codeSnippet = 
`<ConnectButton
    client={client}
    wallets={[ inAppWallet() ]}
    connectButton={{
        label: "In-App Wallet",
    }}
/>`;

export const InAppLogin = () => {
    return (
        <>
            <ConnectButton
                client={client}
                wallets={[
                    inAppWallet(),
                ]}
                connectButton={{
                    label: "In-App Wallet",
                }}
            />
            <div className="w-full" style={{ marginTop: "15px" }}>
                <p className="text-sm font-semibold">Code Snippet:</p>
                <SyntaxHighlighter language="typescript" style={vscDarkPlus}>
                    {codeSnippet}
                </SyntaxHighlighter>
            </div>
        </>
    )
};