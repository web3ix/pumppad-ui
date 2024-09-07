"use client";

import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { useCallback, useState } from "react";
import CurveSdk from "@/sdk/Curve";
import Image from "next/image";

export default function CreateToken() {
    const { publicKey, sendTransaction } = useWallet();
    const { connection } = useConnection();

    const [name, setName] = useState("");
    const [symbol, setSymbol] = useState("");

    // const [form, setForm] = useState<CreateForm>(initForm);
    // const handleChangeForm = changeForm(setForm);
    // const [isShowMore, setIsShowMore] = useState(false);
    const [submitting, setSubmitting] = useState(false);

    const handleCreate = useCallback(async () => {
        if (!connection || submitting) return;
        if (!publicKey) return alert("Connect wallet first");

        if (!name || !symbol) return alert("Invalid params");

        const sdk = new CurveSdk(connection);

        try {
            setSubmitting(true);
            await sdk.bootstrap();

            const createTx = await sdk.createToken(
                publicKey,
                name,
                symbol,
                // form.image,
                "https://5vfxc4tr6xoy23qefqbj4qx2adzkzapneebanhcalf7myvn5gzja.arweave.net/7UtxcnH13Y1uBCwCnkL6APKsge0hAgacQFl-zFW9NlI"
            );

            const signature = await sendTransaction(createTx, connection, {
                maxRetries: 10,
            });

            await connection.confirmTransaction(signature, "finalized");

            alert(`Created successful. Tx hash: ${signature}`);

            setSubmitting(false);

            // setIsShowCreate(false);
        } catch (error: any) {
            console.log(
                "🚀 ~ file: CreatePumpWithMe.tsx:87 ~ handleCreate ~ error:",
                error
            );
            setSubmitting(false);
            alert(error?.message ?? error);
        }
    }, [connection, publicKey, name, symbol]);

    return (
        <div className="px-[20px] flex flex-col items-stretch md:items-center gap-12 relative">
            <div className="launch-bg1"></div>
            <div>
                <h1 className="text-[30px] md:text-[64px] primary-text-gradient text-center mt-[60px] mb-10">
                    Launch your token
                </h1>
                <ul className="flex flex-col md:flex-row gap-3 md:gap-12 justify-between font-medium text-[#C4CBF5]">
                    <li className="flex gap-2 items-center">
                        <div className="cursor-pointer w-10 h-10 relative">
                            <Image
                                src="/icons/launch1.svg"
                                alt="launch1"
                                fill
                                sizes="any"
                            />
                        </div>
                        <div>Takes just a few seconds</div>
                    </li>
                    <li className="flex gap-2 items-center">
                        <div className="cursor-pointer w-10 h-10 relative">
                            <Image
                                src="/icons/launch2.svg"
                                alt="launch1"
                                fill
                                sizes="any"
                            />
                        </div>
                        <div>Free enhanced token info!</div>
                    </li>
                    <li className="flex gap-2 items-center">
                        <div className="cursor-pointer w-10 h-10 relative">
                            <Image
                                src="/icons/launch3.svg"
                                alt="launch1"
                                fill
                                sizes="any"
                            />
                        </div>
                        <div>Free to deploy tokens with a gas fee</div>
                    </li>
                </ul>
            </div>

            <div className="flex flex-col gap-[30px]">
                <div>
                    <label htmlFor="symbol" className="font-bold">
                        Token Symbol*
                    </label>
                    <input
                        className="mt-4 border-gradient"
                        id="symbol"
                        value={symbol}
                        onChange={(e) => setSymbol(e.target.value)}
                    />
                </div>

                <div>
                    <label htmlFor="name" className="font-bold">
                        Token Name*
                    </label>
                    <input
                        className="mt-4 border-gradient"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>

                <div>
                    <label htmlFor="name" className="font-bold">
                        Tokenomics Adjust{" "}
                        <span className="text-[#FF0404]">(Max: 15%)</span>
                    </label>
                    <div className="flex flex-col gap-4 mt-4 italic">
                        <div className="font-bold text-[#19FB9B] md:hidden">
                            #1
                        </div>
                        <div className="flex flex-col md:flex-row justify-between gap-4">
                            <input
                                className="border-gradient"
                                placeholder="Name"
                            />
                            <input
                                className="border-gradient"
                                placeholder="Ratio"
                            />
                            <input
                                className="border-gradient"
                                placeholder="Recipient Wallet"
                            />
                        </div>

                        <div className="font-bold text-[#19FB9B] md:hidden">
                            #2
                        </div>
                        <div className="flex flex-col md:flex-row justify-between gap-4">
                            <input
                                className="border-gradient"
                                placeholder="Name"
                            />
                            <input
                                className="border-gradient"
                                placeholder="Ratio"
                            />
                            <input
                                className="border-gradient"
                                placeholder="Recipient Wallet"
                            />
                        </div>

                        <div className="font-bold text-[#19FB9B] md:hidden">
                            #3
                        </div>
                        <div className="flex flex-col md:flex-row justify-between gap-4">
                            <input
                                className="border-gradient"
                                placeholder="Name"
                            />
                            <input
                                className="border-gradient"
                                placeholder="Ratio"
                            />
                            <input
                                className="border-gradient"
                                placeholder="Recipient Wallet"
                            />
                        </div>
                    </div>
                </div>

                <div className="launch-bg2"></div>
                <div>
                    <label htmlFor="description" className="font-bold">
                        Description*
                    </label>
                    <textarea
                        id="description"
                        className="mt-4 border-gradient"
                        placeholder="Please describe"
                    />
                </div>

                <div className="flex gap-7 md:gap-12">
                    <div>
                        <label htmlFor="icon" className="font-bold">
                            Icon*
                        </label>
                        <input type="file" id="icon" className="hidden" />
                        <div className="mt-4 cursor-pointer flex flex-col items-center p-6 md:p-10 bg-[#06050E] border border-dashed border-[#ffffff1f] rounded-md gap-2">
                            <div className="w-[24px] h-[24px] relative">
                                <Image
                                    src="/icons/folder.svg"
                                    alt="folder"
                                    fill
                                    sizes="any"
                                />
                            </div>
                            <div className="font-bold text-[16px]">
                                Upload file
                            </div>
                        </div>
                    </div>

                    <div className="flex-1">
                        <label htmlFor="banner" className="font-bold">
                            Banner
                        </label>
                        <input type="file" id="banner" className="hidden" />
                        <div className="mt-4 cursor-pointer flex flex-col items-center p-6 md:p-10 bg-[#06050E] border border-dashed border-[#ffffff1f] rounded-md gap-2">
                            <div className="w-[24px] h-[24px] relative">
                                <Image
                                    src="/icons/folder.svg"
                                    alt="folder"
                                    fill
                                    sizes="any"
                                />
                            </div>
                            <div className="font-bold text-[16px]">
                                Upload file
                            </div>
                        </div>
                    </div>
                </div>

                <div>
                    <label className="font-bold">Link</label>
                    <div className="grid grid-cols-3 mt-4 gap-2 md:gap-[30px]">
                        <div className="cursor-pointer flex flex-col items-center p-2 md:py-10 md:px-16 bg-[#06050E] border border-[#ffffff1f] rounded-md gap-2">
                            <div className="w-[24px] h-[24px] relative">
                                <Image
                                    src="/icons/web.svg"
                                    alt="web"
                                    fill
                                    sizes="any"
                                />
                            </div>
                            <div className="font-bold text-[12px] md:text-[16px]">
                                Add Website
                            </div>
                        </div>
                        <div className="cursor-pointer flex flex-col items-center p-2 md:py-10 md:px-16 bg-[#06050E] border border-[#ffffff1f] rounded-md gap-2">
                            <div className="w-[24px] h-[24px] relative">
                                <Image
                                    src="/icons/twitter1.svg"
                                    alt="twitter1"
                                    fill
                                    sizes="any"
                                />
                            </div>
                            <div className="font-bold text-[12px] md:text-[16px]">
                                Add Twitter
                            </div>
                        </div>
                        <div className="cursor-pointer flex flex-col items-center p-2 md:py-10 md:px-16 bg-[#06050E] border border-[#ffffff1f] rounded-md gap-2">
                            <div className="w-[24px] h-[24px] relative">
                                <Image
                                    src="/icons/telegram1.svg"
                                    alt="telegram1"
                                    fill
                                    sizes="any"
                                />
                            </div>
                            <div className="font-bold text-[12px] md:text-[16px]">
                                Add Telegram
                            </div>
                        </div>
                        <div className="cursor-pointer flex flex-col items-center p-2 md:py-10 md:px-16 bg-[#06050E] border border-[#ffffff1f] rounded-md gap-2">
                            <div className="w-[24px] h-[24px] relative">
                                <Image
                                    src="/icons/discord1.svg"
                                    alt="discord1"
                                    fill
                                    sizes="any"
                                />
                            </div>
                            <div className="font-bold text-[12px] md:text-[16px]">
                                Add Discord
                            </div>
                        </div>
                        <div className="cursor-pointer flex flex-col items-center p-2 md:py-10 md:px-16 bg-[#06050E] border border-[#ffffff1f] rounded-md gap-2">
                            <div className="w-[24px] h-[24px] relative">
                                <Image
                                    src="/icons/link.svg"
                                    alt="link"
                                    fill
                                    sizes="any"
                                />
                            </div>
                            <div className="font-bold text-[12px] md:text-[16px]">
                                Add Link
                            </div>
                        </div>
                        <div className="cursor-pointer flex flex-col items-center p-2 md:py-10 md:px-16 bg-[#06050E] border border-[#ffffff1f] rounded-md gap-2">
                            <div className="w-[24px] h-[24px] relative">
                                <Image
                                    src="/icons/link.svg"
                                    alt="link"
                                    fill
                                    sizes="any"
                                />
                            </div>
                            <div className="font-bold text-[12px] md:text-[16px]">
                                Add Link
                            </div>
                        </div>
                    </div>
                </div>

                <div>
                    <label htmlFor="initBuy" className="font-bold">
                        Initial Buy*
                    </label>
                    <div className="my-4 text-[#9A98B9] text-[12px]">
                        Optional: be the very first person to buy your token!
                    </div>
                    <input id="initBuy" className="border-gradient" />
                </div>

                <button className="p-4 bg-[#0038FF]" onClick={handleCreate}>
                    {submitting ? "Creating..." : "Create"}
                </button>
            </div>
        </div>
    );
}
