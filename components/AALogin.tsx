import { client } from "@/app/client";
import { defineChain } from "thirdweb";
import { ConnectButton } from "thirdweb/react";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

const codeSnippet = 
`<ConnectButton
    client={client}
    accountAbstraction={{
        chain: defineChain( 'chain_id' ),
        sponsorGas: true,
    }}
    connectButton={{
        label: "Account Absrtaction"
    }}
/>`;

export const AALogin = () => {
    return (
        <>
            <ConnectButton
                client={client}
                accountAbstraction={{
                    chain: defineChain( parseInt(process.env.NEXT_PUBLIC_CHAIN_ID || "")),
                    sponsorGas: true,
                }}
                connectButton={{
                    label: "Account Absrtaction"
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