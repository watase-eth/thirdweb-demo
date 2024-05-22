'use client';

import Image from "next/image";
import { ConnectButton, PayEmbed, TransactionButton, useActiveAccount, useActiveWalletConnectionStatus } from "thirdweb/react";
import thirdwebIcon from "@public/thirdweb.svg";
import { client } from "./client";
import { useState } from "react";
import { defineChain, getContract } from "thirdweb";
import { claimTo } from "thirdweb/extensions/erc721";
import { TraditionalLogin } from "../../components/TraditionalLogin";
import { InAppLogin } from "../../components/InAppLogin";
import { AAInAppLogin } from "../../components/AAInAppLogin";
import { AALogin } from "../../components/AALogin";

export default function Home() {
  const account = useActiveAccount();
  const status = useActiveWalletConnectionStatus();

  const chain = defineChain(parseInt(process.env.NEXT_PUBLIC_CHAIN_ID || ""));

  const [loginType, setLoginType] = useState("traditional");
  const [claimType, setClaimType] = useState("transactionButton");
  const [claimingNFT, setClaimingNFT] = useState(false);

  const claimNFT = async () => {
    try {
      setClaimingNFT(true);
      const tx = await fetch("/api/engine", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userWalletAddress: account?.address,
        }),
      });

      const data = await tx.json();
      if (!tx.ok) {
        throw new Error(data.message);
      }
      console.log("NFT Claimed!");
    } catch (error) {
      console.error(error);
    } finally {
      setClaimingNFT(false);
    }
  };

  return (
    <main className="p-4 pb-10 min-h-[100vh] flex items-center justify-center container max-w-screen-lg mx-auto">
      <div className="py-20">
        <Header />

        <div className="flex flex-col items-start p-4 rounded-md bg-zinc-900 w-full">
          <h2 className="text-2xl font-semibold mb-4 text-zinc-100">
            Connect a Wallet
          </h2>
          <p className="text-lg font-semibold mb-2 text-zinc-100">
            Select Login Type:
          </p>
          <select
            id="loginType"
            className="w-full p-2 border border-zinc-400 rounded-md mb-4 bg-zinc-900"
            value={loginType}
            onChange={(e) => setLoginType(e.target.value)}
          >
            <option value="traditional">Traditional</option>
            <option value="inapp">In-App Wallet</option>
            <option value="accountAbstraction">Account Abstraction</option>
            <option value="accountAbstractionInapp">AA + In-App</option>
          </select>
          {loginType === "traditional" ? (
              <TraditionalLogin />
          ) : loginType === "inapp" ? (
              <InAppLogin />
          ) : loginType === "accountAbstraction" ? (
            <AALogin />
          ) : (
            <AAInAppLogin />
          )}
        </div>
        <div className="flex flex-col items-start w-full p-4 rounded-md bg-zinc-900 mt-2">
          <h2 className="text-2xl font-semibold mb-4 text-zinc-100">Account Info</h2>
          <p className="text-sm font-semibold mb-2 text-zinc-100">Address: {
            account ? account.address : "Not Wallet Connected"
          }</p>
          <p className="text-sm font-semibold mb-4 text-zinc-100">Is Connected: {status}</p>
        </div>
        {account && (
          <>
            <div className="flex flex-col items-start w-full p-4 rounded-md bg-zinc-900 mt-2">
              <h2 className="text-2xl font-semibold mb-4 text-zinc-100">Claim Token</h2>
              <p className="text-lg font-semibold mb-2 text-zinc-100">
                Select Claim Type:
              </p>
              <select
                id="loginType"
                className="w-full p-2 border border-zinc-400 rounded-md mb-4 bg-zinc-900"
                value={claimType}
                onChange={(e) => setClaimType(e.target.value)}
              >
                <option value="transactionButton">Transaction Button</option>
                <option value="engine">Engine</option>
              </select>
              {claimType === "transactionButton" ? (
                <TransactionButton
                  transaction={() => claimTo({
                    contract: getContract({
                      client: client,
                      chain: chain,
                      address: process.env.NEXT_PUBLIC_NFT_CONTRACT_ADDRESS as string,
                    }),
                    to: account?.address || "",
                    quantity: 1n,
                  })}
                  onTransactionConfirmed={async () => {
                    alert("Claimed!");
                  }}
                >Claim</TransactionButton>
              ) : (
                <button
                  className="py-3 px-5 bg-zinc-100 text-zinc-900 rounded-xl font-semibold"
                  onClick={claimNFT}
                  disabled={!account || claimingNFT}
                >{
                  claimingNFT ? "Claiming..." : "Claim with Engine"
                }</button>
              )}
            </div>
            <div className="flex flex-col items-start w-full p-4 rounded-md bg-zinc-900 mt-2">
              <h2 className="text-2xl font-semibold mb-4 text-zinc-100">Pay</h2>
              <p className="text-lg font-semibold mb-2 text-zinc-100">ConnectButton</p>
              <ConnectButton
                client={client}
              />
              <p className="text-lg font-semibold mb-2 mt-6 text-zinc-100">Pay Embed</p>
              <PayEmbed
                client={client}
              />
            </div>
          </>
        )}
      </div>
    </main>
  );
}

function Header() {
  return (
    <header className="flex flex-col items-center mb-20 md:mb-20">
      <Image
        src={thirdwebIcon}
        alt=""
        className="size-[150px] md:size-[150px]"
        style={{
          filter: "drop-shadow(0px 0px 24px #a726a9a8)",
        }}
      />

      <h1 className="text-2xl md:text-6xl font-semibold md:font-bold tracking-tighter mb-6 text-zinc-100">
        thirdweb Demo
      </h1>
    </header>
  );
}