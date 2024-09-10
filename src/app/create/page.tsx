"use client";

import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { useCallback, useState, useRef } from "react";
import CurveSdk from "@/sdk/Curve";
import Image from "next/image";
import useConnect from "@/hooks/useConnect";
import axios from "axios";
import clsx from "clsx";

export default function CreateToken() {
    const { publicKey, sendTransaction } = useWallet();
    const { connection } = useConnection();
    const { connect } = useConnect();

    const iconRef = useRef<HTMLInputElement>(null);
    const bannerRef = useRef<HTMLInputElement>(null);

    const [token, setToken] = useState<
        | {
              name: string;
              symbol: string;
              icon: string;
              description: string;
              bond: string;
          }
        | undefined
    >();
    const [name, setName] = useState("");
    const [symbol, setSymbol] = useState("");
    const [description, setDescription] = useState("");
    const [icon, setIcon] = useState<File | undefined>();
    const [banner, setBanner] = useState<File | undefined>();

    const [previewIcon, setPreviewIcon] = useState("");
    const [previewBanner, setPreviewBanner] = useState("");

    // const [form, setForm] = useState<CreateForm>(initForm);
    // const handleChangeForm = changeForm(setForm);
    // const [isShowMore, setIsShowMore] = useState(false);
    const [submitting, setSubmitting] = useState(false);

    const handleCreate = useCallback(async () => {
        if (!connection || submitting) return;
        if (!publicKey) return alert("Connect wallet first");

        console.log(name, symbol, description, icon);
        if (!name || !symbol || !description || !icon)
            return alert("Invalid params");

        const sdk = new CurveSdk(connection);

        try {
            setSubmitting(true);
            await sdk.bootstrap();

            await sdk.checkTokenExist(symbol);

            const formData = new FormData();
            formData.append("symbol", symbol);
            formData.append("name", name);
            formData.append("description", description);
            formData.append("icon", icon);

            const res = await axios.post(
                `${process.env.NEXT_PUBLIC_API}/bond/metadata`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            const createTx = await sdk.createToken(
                publicKey,
                name,
                symbol,
                res.data
            );

            const signature = await sendTransaction(createTx, connection, {
                maxRetries: 10,
            });

            await connection.confirmTransaction(signature, "confirmed");

            // alert(`Created successful. Tx hash: ${signature}`);

            setSubmitting(false);

            setToken({
                name,
                symbol,
                description,
                icon: previewIcon!,
                bond: sdk.getTokenPda(symbol).toString(),
            });
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
        <div className="px-[20px] flex flex-col items-stretch md:items-center gap-10 md:gap-20 relative mt-[60px] md:mt-20 mb-20">
            {!token ? (
                <>
                    <div>
                        <h1 className="text-[32px] md:text-[64px] primary-text-gradient text-center mb-10">
                            Launch your token
                        </h1>
                        <ul className="flex flex-col list-disc md:flex-row gap-[10px] md:gap-10 justify-between text-[16px] font-medium text-[#C4CBF5]">
                            <li className="flex gap-4 items-center">
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
                            <li className="flex gap-4 items-center">
                                <div className="cursor-pointer w-10 h-10 relative">
                                    <Image
                                        src="/icons/launch2.svg"
                                        alt="launch2"
                                        fill
                                        sizes="any"
                                    />
                                </div>
                                <div>Free enhanced token info!</div>
                            </li>
                            <li className="flex gap-4 items-center">
                                <div className="cursor-pointer w-10 h-10 relative">
                                    <Image
                                        src="/icons/launch3.svg"
                                        alt="launch3"
                                        fill
                                        sizes="any"
                                    />
                                </div>
                                <div>Free to deploy tokens with a gas fee</div>
                            </li>
                        </ul>
                    </div>

                    <div className="flex flex-col gap-10 md:gap-[30px]">
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
                                <span className="text-[#FF0404]">
                                    (Max: 15%)
                                </span>
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

                        {/* <div className="absolute top-[700px] left-0 right-0 bg-launch-bg min-h-[1149px] -z-50"></div> */}

                        <div>
                            <label htmlFor="description" className="font-bold">
                                Description*
                            </label>
                            <textarea
                                id="description"
                                className="mt-4 border-gradient h-[180px] bg-[#00000087]"
                                placeholder="Please describe"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </div>

                        <div className="flex gap-6 md:gap-12">
                            <div>
                                <label htmlFor="icon" className="font-bold">
                                    Icon*
                                </label>
                                <input
                                    type="file"
                                    id="icon"
                                    className="hidden"
                                    ref={iconRef}
                                    onChange={(e) => {
                                        const file = e.target.files?.[0];
                                        if (!file) return;
                                        const objectUrl =
                                            URL.createObjectURL(file);
                                        setPreviewIcon(objectUrl);
                                        setIcon(file);
                                    }}
                                />

                                <div
                                    onClick={() => iconRef.current?.click()}
                                    className={clsx(
                                        "mt-4 cursor-pointer flex flex-col items-center overflow-hidden bg-[#06050E] border border-dashed border-[#ffffff1f] rounded-xl gap-2",
                                        {
                                            "p-10 md:p-10":
                                                !icon || !previewIcon,
                                        }
                                    )}
                                >
                                    {icon && previewIcon ? (
                                        <div className="cursor-pointer w-[138px] h-[138px] relative">
                                            <Image
                                                src={previewIcon}
                                                alt="icon"
                                                fill
                                                sizes="any"
                                            />
                                        </div>
                                    ) : (
                                        <>
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
                                        </>
                                    )}
                                </div>
                            </div>

                            <div className="flex-1">
                                <label htmlFor="banner" className="font-bold">
                                    Banner
                                </label>
                                <input
                                    type="file"
                                    id="banner"
                                    className="hidden"
                                    ref={bannerRef}
                                    onChange={(e) => {
                                        const file = e.target.files?.[0];
                                        if (!file) return;
                                        const objectUrl =
                                            URL.createObjectURL(file);
                                        setPreviewBanner(objectUrl);
                                        setBanner(file);
                                    }}
                                />
                                <div
                                    onClick={() => bannerRef.current?.click()}
                                    className={clsx(
                                        "mt-4 cursor-pointer flex flex-col items-center bg-[#06050E] border border-dashed border-[#ffffff1f] rounded-xl gap-2",
                                        {
                                            "py-10 md:p-10":
                                                !banner || !previewBanner,
                                        }
                                    )}
                                >
                                    {banner && previewBanner ? (
                                        <div className="cursor-pointer w-[100%] h-[138px] relative">
                                            <Image
                                                src={previewBanner}
                                                alt="icon"
                                                fill
                                                sizes="any"
                                            />
                                        </div>
                                    ) : (
                                        <>
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
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div>
                            <label className="font-bold">Link</label>
                            <div className="grid grid-cols-1 md:grid-cols-3 mt-4 gap-2 md:gap-[30px]">
                                <div className="cursor-pointer flex md:flex-col items-center justify-center py-[18px] md:py-10 md:px-16 bg-[#06050E] border border-[#ffffff1f] rounded-xl gap-1.5">
                                    <div className="w-[24px] h-[24px] relative">
                                        <Image
                                            src="/icons/web.svg"
                                            alt="web"
                                            fill
                                            sizes="any"
                                        />
                                    </div>
                                    <div className="font-semibold md:text-[16px]">
                                        Add Website
                                    </div>
                                </div>
                                <div className="cursor-pointer flex md:flex-col items-center justify-center py-[18px] md:py-10 bg-[#06050E] border border-[#ffffff1f] rounded-xl gap-1.5">
                                    <div className="w-[24px] h-[24px] relative">
                                        <Image
                                            src="/icons/twitter1.svg"
                                            alt="twitter1"
                                            fill
                                            sizes="any"
                                        />
                                    </div>
                                    <div className="font-semibold md:text-[16px]">
                                        Add Twitter
                                    </div>
                                </div>
                                <div className="cursor-pointer flex md:flex-col items-center justify-center py-[18px] md:py-10 bg-[#06050E] border border-[#ffffff1f] rounded-xl gap-1.5">
                                    <div className="w-[24px] h-[24px] relative">
                                        <Image
                                            src="/icons/telegram1.svg"
                                            alt="telegram1"
                                            fill
                                            sizes="any"
                                        />
                                    </div>
                                    <div className="font-semibold md:text-[16px]">
                                        Add Telegram
                                    </div>
                                </div>
                                <div className="cursor-pointer flex md:flex-col items-center justify-center py-[18px] md:py-10 bg-[#06050E] border border-[#ffffff1f] rounded-xl gap-1.5">
                                    <div className="w-[24px] h-[24px] relative">
                                        <Image
                                            src="/icons/discord1.svg"
                                            alt="discord1"
                                            fill
                                            sizes="any"
                                        />
                                    </div>
                                    <div className="font-semibold md:text-[16px]">
                                        Add Discord
                                    </div>
                                </div>
                                <div className="cursor-pointer flex md:flex-col items-center justify-center py-[18px] md:py-10 bg-[#06050E] border border-[#ffffff1f] rounded-xl gap-1.5">
                                    <div className="w-[24px] h-[24px] relative">
                                        <Image
                                            src="/icons/link.svg"
                                            alt="link"
                                            fill
                                            sizes="any"
                                        />
                                    </div>
                                    <div className="font-semibold md:text-[16px]">
                                        Add Another Link
                                    </div>
                                </div>
                                <div className="cursor-pointer flex md:flex-col items-center justify-center py-[18px] md:py-10 bg-[#06050E] border border-[#ffffff1f] rounded-xl gap-1.5">
                                    <div className="w-[24px] h-[24px] relative">
                                        <Image
                                            src="/icons/link.svg"
                                            alt="link"
                                            fill
                                            sizes="any"
                                        />
                                    </div>
                                    <div className="font-semibold md:text-[16px]">
                                        Add Another Link
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div>
                            <label htmlFor="initBuy" className="font-bold">
                                Initial Buy*
                            </label>
                            <div className="mt-[10px] mb-4 text-[#9A98B9] text-[12px]">
                                Optional: be the very first person to buy your
                                token!
                            </div>
                            <div className="relative">
                                <div className="absolute left-[20px] top-1/2 -translate-y-1/2 flex gap-3 items-center">
                                    <div className="w-[24px] h-[24px] relative">
                                        <Image
                                            src="/icons/solana.svg"
                                            alt="solana"
                                            fill
                                            sizes="any"
                                        />
                                    </div>
                                    <div className="font-bold">Sol</div>
                                </div>
                                <input
                                    id="initBuy"
                                    className="border-gradient pl-[90px] pr-14 text-right"
                                />

                                <div className="cursor-pointer absolute right-[20px] top-1/2 -translate-y-1/2">
                                    <div className="w-[24px] h-[24px] relative">
                                        <Image
                                            src="/icons/swap.svg"
                                            alt="swap"
                                            fill
                                            sizes="any"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {!publicKey ? (
                            <button
                                onClick={connect}
                                className="py-4 btn-primary font-vortex text-[18px] flex items-center justify-center gap-[11px]"
                            >
                                <div className="text-[18px] ">
                                    Connect wallet
                                </div>
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
                                className="py-4 btn-primary font-vortex text-[18px] flex items-center justify-center gap-[11px]"
                                onClick={handleCreate}
                            >
                                {submitting ? "Creating..." : "Create Token"}
                            </button>
                        )}
                    </div>
                </>
            ) : (
                <div className="flex flex-col gap-[22px] items-center mt-5">
                    <h1 className="text-[16px]">3.. 2.. 1..</h1>
                    <h1 className="text-[32px]">Take off</h1>
                    <div className="text-[15px]">
                        {token.symbol} is going live on Pumppad!
                    </div>
                    <div className="border-gradient p-5 w-full rounded-2xl flex flex-col items-center gap-5 max-w-[1000px]">
                        <div className="w-[80px] h-[80px] relative">
                            <Image
                                src={token.icon}
                                alt="icon"
                                fill
                                sizes="any"
                            />
                        </div>
                        <h1 className="text-[16px]">{token.symbol}</h1>
                        <div className="w-full flex items-center justify-between md:justify-center md:gap-5">
                            <div className="text-[#94A3B8] font-medium max-w-[180px] md:max-w-full overflow-hidden text-ellipsis">
                                {token.bond}
                            </div>
                            <div className="cursor-pointer rounded-xl border border-[#334155] font-medium py-2 px-3">
                                Copy CA
                            </div>
                        </div>

                        <p className="text-[#94A3B8] text-center md:px-[200px]">
                            {token.description}
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
}
