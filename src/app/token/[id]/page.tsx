"use client";

import Image from "next/image";
import HighlightProject from "@/components/HighlightProject";
import BondChart from "@/components/chart/BondChart";
import { useCallback, useEffect, useState } from "react";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import CurveSdk from "@/sdk/Curve";
import { BN } from "@coral-xyz/anchor";
import { IToken, useAppStore } from "@/store";
import useSWR from "swr";
import {
    TOTAL_SUPPLY,
    calcProgress,
    fetcher,
    getSignatureUrl,
    sliceString,
} from "@/utils";
import { PublicKey } from "@solana/web3.js";
import useConnect from "@/hooks/useConnect";
import clsx from "clsx";
import TopTokenBar from "@/components/home/TopBar";
import Link from "next/link";
import dayjs from "dayjs";
const relativeTime = require("dayjs/plugin/relativeTime");
dayjs.extend(relativeTime);

interface Holder {
    address: PublicKey;
    amount: string;
    decimals: number;
    uiAmount: number;
    uiAmountString: string;
}

export default function TokenDetailPage({
    params,
}: {
    params: { id: string };
}) {
    const { socket } = useAppStore();

    const { data, error, isLoading, mutate } = useSWR<IToken>(
        `${process.env.NEXT_PUBLIC_API}/bond/tokens/${params.id}`,
        fetcher
    );
    const { publicKey, sendTransaction } = useWallet();
    const { connection } = useConnection();
    const { connect } = useConnect();

    const [holders, setHolders] = useState<Holder[]>([]);

    const [isBuy, setIsBuy] = useState<boolean>(true);
    const [isSolBuy, setIsSolBuy] = useState<boolean>(true);
    const [amount, setAmount] = useState<string>("");
    const [isShowChart, setIsShowChart] = useState<boolean>(false);

    useEffect(() => {
        (async () => {
            if (!connection || !data?.token) return;

            try {
                const res = await connection.getTokenLargestAccounts(
                    new PublicKey(data.token)
                );
                setHolders(res.value as [Holder]);
            } catch (error) {}
        })();
    }, [connection, data?.token]);

    useEffect(() => {
        if (!socket || !data || !mutate) return;

        socket.on("new-trade", (payload) => {
            console.log("🚀 New trade:", payload);
            const exist = data.trades.find((trade) => trade.id === payload.id);

            if (!exist) {
                mutate({
                    ...data,
                    lastPrice: payload.lastPrice,
                    trades: [...data.trades, payload],
                });
            }
        });
    }, [socket, data, mutate]);

    const handleTrade = useCallback(async () => {
        if (!data?.symbol) return;

        if (!connection || !publicKey) return alert("Connect wallet first");

        const sdk = new CurveSdk(connection);

        if (isNaN(+amount)) return alert("Invalid amount");

        try {
            await sdk.bootstrap();
            const parsedAmount = new BN(BigInt(+amount) * BigInt(10 ** 9));

            if (isBuy) {
                const { reserve: reserveToBuy } = await sdk.fetchReserveToBuy(
                    data.symbol,
                    parsedAmount
                );

                const maxReserveAmount = reserveToBuy.add(
                    reserveToBuy.div(new BN("20"))
                ); // slippage 5% // TODO by user settings

                const buyTx = await sdk.buyToken(
                    publicKey,
                    data.symbol,
                    parsedAmount,
                    maxReserveAmount
                );

                const txHash = await sendTransaction(buyTx, connection, {
                    maxRetries: 10,
                });

                alert(`Buy successful. Tx hash: ${txHash}`);
            } else {
                const { reserve: reserveForSell } =
                    await sdk.fetchRefundForSell(data.symbol, parsedAmount);

                const minReserveAmount = reserveForSell.sub(
                    reserveForSell.div(new BN("20"))
                ); // slippage 5% TODO by user settings

                const sellTx = await sdk.sellToken(
                    publicKey,
                    data.symbol,
                    parsedAmount,
                    minReserveAmount
                );

                const txHash = await sendTransaction(sellTx, connection, {
                    maxRetries: 10,
                });

                alert(`Sell successful. Tx hash: ${txHash}`);
            }
        } catch (error: any) {
            console.log(
                "🚀 ~ file: page.tsx:145 ~ handleTrade ~ error:",
                error
            );
            alert(error?.message ?? error);
        }
    }, [connection, publicKey, amount, isBuy, isSolBuy, data?.symbol]);

    return (
        <>
            <TopTokenBar />

            <div className="px-5 md:px-[120px] my-10 flex flex-col gap-10 items-stretch">
                <div className="mt-10">
                    <HighlightProject token={data} />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                    <div className="hidden md:block md:col-span-2 rounded-[10px] overflow-hidden">
                        <BondChart symbol={data?.symbol} />
                    </div>

                    <div className="border-gradient rounded-[10px] overflow-hidden px-[15px] md:p-0 pt-[17px] md:mt-0 pb-[31px] btn-normal2">
                        <div className="md:hidden text-[25px] flex gap-[35px]">
                            <h1
                                className={clsx("cursor-pointer pb-2.5  ", {
                                    "border-b-2 border-b-[#0038FF]":
                                        !isShowChart,
                                })}
                                onClick={() => setIsShowChart(false)}
                            >
                                Buy/Sell
                            </h1>
                            <h1
                                className={clsx("cursor-pointer pb-2.5", {
                                    "border-b-2  border-b-[#0038FF]":
                                        isShowChart,
                                })}
                                onClick={() => setIsShowChart(true)}
                            >
                                Chart
                            </h1>
                        </div>

                        {isShowChart && (
                            <div className="md:hidden md:col-span-4 rounded-[10px] overflow-hidden">
                                <BondChart symbol={data?.symbol} />
                            </div>
                        )}

                        <div
                            className={clsx("mt-[23px] md:mt-0", {
                                "sm:hidden md:block": isShowChart,
                            })}
                        >
                            <div className="text-[15px] leading-[24px] grid grid-cols-2 text-center">
                                <h1
                                    onClick={() => setIsBuy(true)}
                                    className={clsx(
                                        "cursor-pointer py-[18px] backdrop-blur-md",
                                        {
                                            "btn-primary": isBuy,
                                            "btn-normal2": !isBuy,
                                        }
                                    )}
                                >
                                    Buy
                                </h1>
                                <h1
                                    onClick={() => setIsBuy(false)}
                                    className={clsx(
                                        "cursor-pointer py-[18px] backdrop-blur-md",
                                        {
                                            "btn-primary": !isBuy,
                                            "btn-normal2": isBuy,
                                        }
                                    )}
                                >
                                    Sell
                                </h1>
                            </div>

                            <div className="md:px-[34px] pb-[34px]">
                                <div className="my-[17px] border-gradient p-[20px] rounded-[10px] grid grid-cols-1 gap-2 !bg-[#000]">
                                    <div className="flex items-center justify-between">
                                        <div>Switch to DOGS</div>
                                        <div className="w-[30px] h-[30px] relative">
                                            <Image
                                                src="/icons/settings.svg"
                                                alt="settings"
                                                fill
                                                sizes="any"
                                            />
                                        </div>
                                    </div>

                                    <div className="relative">
                                        <input
                                            className="border-none pr-[120px] text-left text-[20px] font-vortex min-h-[60px]"
                                            placeholder="Enter The Amount"
                                            value={amount}
                                            onChange={(e) =>
                                                !isNaN(+e.target.value) &&
                                                setAmount(e.target.value)
                                            }
                                        />

                                        <div className="cursor-pointer absolute right-[20px] top-1/2 -translate-y-1/2">
                                            <div className="flex items-center gap-1.5">
                                                <div className="w-[25px] h-[25px] relative">
                                                    <Image
                                                        src="/icons/solana.svg"
                                                        alt="solana"
                                                        fill
                                                        sizes="any"
                                                    />
                                                </div>
                                                <h1 className="text-[24px] translate-y-[2px]">
                                                    Sol
                                                </h1>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="text-[12px]">
                                        Balance: 100 SOL
                                    </div>
                                </div>

                                <div className="grid grid-cols-5 text-[12px] gap-1">
                                    <h1 className="py-[18px] text-center rounded-md bg-[#0038FF]">
                                        0.5 SOL
                                    </h1>
                                    <h1 className="py-[18px] text-center rounded-md bg-[#0038FF]">
                                        1 SOL
                                    </h1>
                                    <h1 className="py-[18px] text-center rounded-md bg-[#0038FF]">
                                        5 SOL
                                    </h1>
                                    <h1 className="py-[18px] text-center rounded-md bg-[#0038FF]">
                                        10 SOL
                                    </h1>
                                    <h1 className="py-[18px]  text-center rounded-md bg-[#0038FF]">
                                        20 SOL
                                    </h1>
                                </div>
                                <div className="mt-[17px] mb-[25px] font-vortex">
                                    {!publicKey ? (
                                        <button
                                            onClick={connect}
                                            className="w-full flex items-center justify-center gap-[11px] py-4 btn-primary"
                                        >
                                            <span>Connect wallet</span>
                                            <div className="w-[18px] h-[18px] relative">
                                                <Image
                                                    src="/icons/wallet.svg"
                                                    alt="wallet"
                                                    fill
                                                    sizes="any"
                                                />
                                            </div>
                                        </button>
                                    ) : (
                                        <button
                                            onClick={handleTrade}
                                            className="w-full flex items-center justify-center gap-[11px] py-4 btn-primary"
                                        >
                                            <span>Place trade</span>
                                        </button>
                                    )}
                                </div>

                                <div className="grid grid-cols-1 gap-[14px]">
                                    <h1 className="text-[20px]">
                                        Bonding Curve Progress:{" "}
                                        {calcProgress(data?.lastPrice ?? "", 2)}
                                        %
                                    </h1>
                                    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                                        <div className="relative h-6 flex items-center justify-center">
                                            <div
                                                style={{
                                                    width: `${calcProgress(data?.lastPrice ?? "", 0)}%`,
                                                }}
                                                className="absolute top-0 bottom-0 left-0 rounded-lg bg-[#0038ff]"
                                            ></div>
                                        </div>
                                    </div>

                                    <p className="text-[12px] text-[#94A3B8]">
                                        There are 791,091,991.89 {data?.symbol}{" "}
                                        still available for sale in the bonding
                                        curve and there are 293.82 SOL in the
                                        bonding curve. When the market cap
                                        reaches $ 83,588.11 all the liquidity
                                        from the bonding curve will be deposited
                                        into Raydium and burned. Progression
                                        increases as the price goes up.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                    {/* trade history */}
                    <div className="hidden md:flex flex-col items-stretch row-span-2 md:col-span-2 py-8 px-6 rounded-[10px] btn-normal2">
                        <h1 className="text-[40px]">Trading History</h1>

                        <div className="grid grid-cols-11 gap-2 2xl:text-[20px] mt-[30px] mb-[28px]">
                            <div className="col-span-2">Account</div>
                            <div>Type</div>
                            <div className="col-span-2">SOL</div>
                            <div className="col-span-2">DOGS</div>
                            <div className="col-span-2">Date</div>
                            <div className="col-span-2 text-right">
                                Transaction
                            </div>
                        </div>

                        <div className="h-[1px] bg-[#FFF]"></div>

                        {data?.trades?.map((trade, idx) => (
                            <div
                                key={idx}
                                className="grid grid-cols-11 gap-2 mt-[35px] 2xl:text-[20px]"
                            >
                                <div className="col-span-2">
                                    {sliceString(trade.doer, 4, 3)}
                                </div>
                                <div
                                    className={clsx({
                                        "text-[#19FB9B]": trade.isBuy,
                                        "text-[#EC0105]": !trade.isBuy,
                                    })}
                                >
                                    {trade.isBuy ? "Buy" : "Sell"}
                                </div>
                                <div className="col-span-2">
                                    {trade.parseReserveAmount}
                                </div>
                                <div className="col-span-2">
                                    {trade.parseAmount}
                                </div>

                                <div className="col-span-2">
                                    {/* @ts-ignore */}
                                    {dayjs(trade.timestamp * 1000).fromNow()}
                                </div>
                                <div className="col-span-2 text-right">
                                    <Link
                                        href={getSignatureUrl(trade.signature)}
                                    >
                                        {sliceString(trade.signature, 4, 4)}
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* holder distributor */}
                    <div className="py-8 px-6 text-[20px] flex flex-col items-stretch gap-6 rounded-[10px] btn-normal2">
                        <h1 className="md:text-[40px]">Holder Distribution</h1>

                        <div className="flex items-center justify-between">
                            <div>Holder</div>
                            <div>Percentage</div>
                        </div>

                        <div className="h-[1px] bg-[#FFF]"></div>

                        {holders.map((holder) => (
                            <div
                                key={holder.address.toBase58()}
                                className="flex items-center justify-between"
                            >
                                <div>
                                    {sliceString(
                                        holder.address.toBase58(),
                                        4,
                                        7
                                    )}
                                </div>
                                <div>
                                    {(holder.uiAmount * 100) / TOTAL_SUPPLY}%
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* chat */}
                    <div className="py-8 px-6 flex flex-col items-stretch gap-6 rounded-[10px] btn-normal2">
                        <h1 className="primary-text-gradient text-[30px]">
                            Pump Chat
                        </h1>
                        {/* <div className="border-gradient p-[17px] rounded-[10px]">
                        <div className="flex items-center gap-4 mb-6">
                            <div>5vSS...ESjDmXj</div>
                            <div>4:30 p.m</div>
                        </div>
                        <p>Zone 1 entry confirmed , let's go break ATH</p>
                    </div>
                    <div className="h-[1px] bg-[#FFF]"></div>
                    <div className="border-gradient p-[17px] rounded-[10px]">
                        <div className="flex items-center gap-4 mb-6">
                            <div>5vSS...ESjDmXj</div>
                            <div>4:30 p.m</div>
                        </div>
                        <p>Zone 1 entry confirmed , let's go break ATH</p>
                    </div>
                    <div className="h-[1px] bg-[#FFF]"></div>{" "}
                    <div className="border-gradient p-[17px] rounded-[10px]">
                        <div className="flex items-center gap-4 mb-6">
                            <div>5vSS...ESjDmXj</div>
                            <div>4:30 p.m</div>
                        </div>
                        <p>Zone 1 entry confirmed , let's go break ATH</p>
                    </div> */}
                    </div>
                </div>
            </div>
        </>
    );
}
