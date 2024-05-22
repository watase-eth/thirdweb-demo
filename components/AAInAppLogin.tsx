import { client } from "@/app/client";
import { defineChain } from "thirdweb";
import { ConnectButton } from "thirdweb/react";
import { inAppWallet } from "thirdweb/wallets";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

const codeSnippet = 
`<ConnectButton
    client={client}
    accountAbstraction={{
        chain: defineChain( 'chain_id' ),
        sponsorGas: true,
    }}
    wallets={[ inAppWallet() ]}
    connectButton={{
        label: "AA + In-App Wallet"
    }}
/>`;

export const AAInAppLogin = () => {
    return (
        <>
            <ConnectButton
                client={client}
                accountAbstraction={{
                    chain: defineChain( parseInt(process.env.NEXT_PUBLIC_CHAIN_ID || "")),
                    sponsorGas: true,
                }}
                wallets={[
                    inAppWallet(),
                ]}
                connectButton={{
                    label: "AA + In-App Wallet"
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