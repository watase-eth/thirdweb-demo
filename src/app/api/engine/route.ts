import { NextResponse } from 'next/server';

export async function POST(
    req: Request,
) {
    const {
        ENGINE_URL,
        ENGINE_ACCESS_TOKEN,
        ENGINE_WALLET,
        CHAIN_ID,
        NFT_CONTRACT_ADDRESS
    } = process.env;

    const { userWalletAddress } = await req.json();

    try {
        if (!ENGINE_URL || !ENGINE_ACCESS_TOKEN || !ENGINE_WALLET) {
            throw new Error('Missing environment variables');
        }

        if (!userWalletAddress) {
            throw new Error('Missing userWalletAddress');
        }

        const response = await fetch(
            `${ENGINE_URL}/contract/${CHAIN_ID}/${NFT_CONTRACT_ADDRESS}/erc721/claim-to`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${ENGINE_ACCESS_TOKEN}`,
                    'x-backend-wallet-address': ENGINE_WALLET
                },
                body: JSON.stringify({
                    receiver: userWalletAddress,
                    quantity: "1"
                })
            }
        );

        const data = await response.json();

        if(!response.ok) {
            throw new Error(data.message);
        }

        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.error();
    }
}