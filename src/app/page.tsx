"use client";

import HighlightProject from "@/components/HighlightProject";
import ProjectItem from "@/components/ProjectItem";
import SupportNetwork from "@/components/home/SupportNetwork";
import TopTokenBar from "@/components/home/TopBar";
import useConnect from "@/hooks/useConnect";
import { IToken, ITrade, useAppStore } from "@/store";
import {
    DEFAULT_LIMIT,
    EGetTokenAge,
    EGetTokenSortBy,
    fetcher,
    sliceString,
} from "@/utils";
import { useWallet } from "@solana/wallet-adapter-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import useSWR from "swr";
import Modal from "react-modal";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

//import styles 👇
import "react-modern-drawer/dist/index.css";
import useSWRInfinite from "swr/infinite";
import Skeleton from "@/components/Skeleton";
import clsx from "clsx";

export default function HomePage() {
    const { publicKey } = useWallet();
    const { connect } = useConnect();
    const [sortBy, setSortBy] = useState<EGetTokenSortBy>(
        EGetTokenSortBy.TRENDING
    );
    const [age, setAge] = useState<EGetTokenAge>(EGetTokenAge.ALL);
    const [minProgress, setMinProgress] = useState<string>("0");
    const [maxProgress, setMaxProgress] = useState<string>("100");
    const [search, setSearch] = useState<string>("");

    const { data: kingOfHill } = useSWR<IToken>(
        `${process.env.NEXT_PUBLIC_API}/bond/king-of-hill`,
        fetcher
    );

    const { data, mutate, size, setSize, isLoading } = useSWRInfinite(
        (index) =>
            `${process.env.NEXT_PUBLIC_API}/bond/tokens?sortBy=${sortBy}&search=${search}&age=${age}&minProgress=${minProgress}&maxProgress=${maxProgress}&take=${DEFAULT_LIMIT}&skip=${index * DEFAULT_LIMIT}`,
        fetcher
    );

    const isLoadMore = useMemo(
        () => size * DEFAULT_LIMIT < data?.[data.length - 1]?.total,
        [size, data]
    );

    const onLoadMore = () => {
        setSize((prev) => prev + 1);
    };

    const tokens = useMemo<IToken[]>(
        () => data?.map((page) => page.data)?.flat(1) ?? [],
        [data]
    );

    const { socket } = useAppStore();

    const [isOpenModal, setIsOpenModal] = useState(false);

    function openModal() {
        setIsOpenModal(true);
    }

    function closeModal() {
        setIsOpenModal(false);
    }

    // useEffect(() => {
    //     if (!socket || !tokens?.data || !mutateTokens) return;

    //     socket.on("new-token", (payload) => {
    //         const exist = tokens?.data.find((token) => token.id === payload.id);
    //         if (!exist) {
    //             mutateTokens({
    //                 ...tokens,
    //                 data: [...tokens.data]
    //             });
    //         }
    //     });
    // }, [socket, tokens, mutateTokens]);

    return (
        <div className="px-5 md:px-[120px] flex flex-col items-stretch md:items-center gap-12 relative">
            <Modal
                isOpen={isOpenModal}
                // onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                style={{
                    overlay: {
                        backgroundColor: "#00000080",
                    },
                    content: {
                        // top: "50%",
                        left: "50%",
                        // right: "auto",
                        // bottom: "auto",
                        // marginRight: "-50%",
                        transform: "translateX(-50%)",
                        width: "90%",
                        maxWidth: "1066px",
                        borderRadius: "10px",
                        border: "none",
                        background: "#000",
                        boxShadow:
                            "1px 1px 2px 0px rgba(255, 255, 255, 0.24) inset, 0px 1px 3px 0px rgba(10, 124, 255, 0.24), 0px 2px 6px 0px rgba(10, 124, 255, 0.24), 0px 4px 8px 0px rgba(10, 124, 255, 0.12), 0px 16px 32px -8px rgba(10, 124, 255, 0.48)",
                    },
                }}
            >
                <div className="md:px-[24px] pt-[12px] md:pb-[24px] 2xl:pb-[60px] relative">
                    <div className="absolute right-[20px] cursor-pointer">
                        <div
                            onClick={closeModal}
                            className="w-[32px] h-[32px] relative"
                        >
                            <Image
                                src="/icons/close.svg"
                                alt="close"
                                fill
                                sizes="any"
                            />
                        </div>
                    </div>

                    <div>
                        <div className="flex justify-center">
                            <div className="w-[97px] h-[97px] relative">
                                <Image
                                    src="/logo.png"
                                    alt="logo"
                                    fill
                                    sizes="any"
                                />
                            </div>
                        </div>

                        <div className="flex flex-col gap-[16px] lg:gap-[12px] 2xl:gap-[36px] text-[15px] md:text-[20px] text-center md:px-[60px]">
                            <h1 className=" primary-text-gradient text-[25px] md:text-[50px] text-center">
                                How To Launch your Token?
                            </h1>

                            <div className="text-[#19FB9B] font-bold">
                                ⭐️ Fair Launch
                            </div>

                            <div className="flex flex-col gap-2 lg:gap-1 2xl:gap-[21px]">
                                <div>
                                    No pre-sale or insiders; 1 billion max
                                    supply
                                </div>
                                <div>
                                    Ownership renounced; fully audited contracts
                                </div>
                                <div>Buy and sell anytime</div>
                            </div>

                            <div className="text-[#19FB9B] font-bold">
                                ⭐️ Pump To The Moon
                            </div>

                            <div className="flex flex-col gap-2 lg:gap-1 2xl:gap-[21px]">
                                <div>
                                    When the market cap hits $59K, all remaining
                                    tokens and liquidity will move to Raydium.
                                </div>
                                <div>All liquidity is permanently locked.</div>
                            </div>

                            <div className="border-gradient rounded-2xl p-[20px] 2xl:p-[30px]">
                                <div className="font-bold text-left mb-[12px] 2xl:mb-[28px]">
                                    Disclaimer
                                </div>
                                <p className="text-justify leading-[160%]">
                                    Tokens launched on this platform are not
                                    officially supported or endorsed by Pump
                                    Pad. Pump Pad does not serve as an
                                    investment platform, and there is a risk
                                    that the value of your tokens could decrease
                                    significantly at any moment. By utilizing
                                    Pump Pad, you acknowledge these risks and
                                    agree to our Terms and Conditions.
                                </p>
                            </div>
                        </div>

                        <div className="flex flex-col md:flex-row gap-1.5 justify-center items-center mt-[32px]">
                            <Link
                                href="https://t.me/pump_agent"
                                target="_blank"
                            >
                                <button className="flex items-center justify-center gap-[11px] py-4 min-w-[305px] btn-primary">
                                    <h1>Product order</h1>
                                    <div className="w-[18px] h-[18px] relative">
                                        <Image
                                            src="/icons/order.png"
                                            alt="order"
                                            fill
                                            sizes="any"
                                        />
                                    </div>
                                </button>
                            </Link>

                            <Link href="/create">
                                <button className="flex items-center justify-center gap-[11px] py-4 min-w-[305px] btn-secondary">
                                    <h1 className="text-18px">
                                        Launch your token now
                                    </h1>
                                    <div className="w-[18px] h-[18px] relative">
                                        <Image
                                            src="/icons/launch.svg"
                                            alt="launch"
                                            fill
                                            sizes="any"
                                        />
                                    </div>
                                </button>
                            </Link>

                            <Link
                                href="https://t.me/pump_agent"
                                target="_blank"
                            >
                                <button className="text-[#000] flex items-center justify-center gap-[11px]  py-4 min-w-[305px] btn-normal">
                                    <h1>Agent support</h1>
                                    <div className="w-[18px] h-[18px] relative">
                                        <Image
                                            src="/icons/support.svg"
                                            alt="support"
                                            fill
                                            sizes="any"
                                        />
                                    </div>
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </Modal>
            <div className="flex flex-col gap-[22px] items-center my-20">
                <h1 className="text-[32px] md:leading-[170px] md:text-[200px] primary-text-gradient text-center">
                    PUMP PAD
                </h1>
                <div className="text-center text-[15px] md:text-[20px] text-[#94A3B8]">
                    <div className="mb-2">
                        From building to launching in just a few steps
                    </div>
                </div>
                <div className="flex flex-col gap-2.5 md:gap-5 font-vortex">
                    <div className="flex flex-col md:flex-row items-center justify-center gap-0 md:gap-5">
                        {!publicKey && (
                            <button
                                onClick={connect}
                                className="flex items-center justify-center gap-[11px] py-4 min-w-[305px] btn-primary mb-2.5 md:mb-0"
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
                        )}

                        <Link href="/create">
                            <button className="flex items-center justify-center gap-[11px] py-4 min-w-[305px] btn-secondary">
                                <h1 className="text-18px">
                                    Launch your token now
                                </h1>
                                <div className="w-[18px] h-[18px] relative">
                                    <Image
                                        src="/icons/launch.svg"
                                        alt="launch"
                                        fill
                                        sizes="any"
                                    />
                                </div>
                            </button>
                        </Link>

                        <Link href="https://t.me/pump_agent" target="_blank">
                            <button className="hidden md:flex items-center justify-center gap-[11px] py-4 min-w-[305px] btn-primary">
                                <h1>Product order</h1>
                                <div className="w-[18px] h-[18px] relative">
                                    <Image
                                        src="/icons/order.png"
                                        alt="order"
                                        fill
                                        sizes="any"
                                    />
                                </div>
                            </button>
                        </Link>
                    </div>

                    <div className="flex flex-wrap justify-center gap-2.5 text-[#000000]">
                        <button
                            onClick={openModal}
                            className="flex items-center justify-center gap-[11px]  py-4 min-w-[305px] btn-normal"
                        >
                            <h1> How to launch</h1>
                            <div className="w-[18px] h-[18px] relative">
                                <Image
                                    src="/icons/how-to-launch.svg"
                                    alt="how-to-launch"
                                    fill
                                    sizes="any"
                                />
                            </div>
                        </button>

                        <Link
                            href="https://t.me/pump_agent"
                            target="_blank"
                            passHref
                        >
                            <button className="flex md:hidden items-center justify-center gap-[11px]  py-4 min-w-[305px] btn-normal">
                                <h1>Product order</h1>
                                <div className="w-[18px] h-[18px] relative">
                                    <Image
                                        src="/icons/order.svg"
                                        alt="order"
                                        fill
                                        sizes="any"
                                    />
                                </div>
                            </button>
                        </Link>

                        <Link href="https://t.me/pump_agent" target="_blank">
                            <button className="flex items-center justify-center gap-[11px]  py-4 min-w-[305px] btn-normal">
                                <h1>Agent support</h1>
                                <div className="w-[18px] h-[18px] relative">
                                    <Image
                                        src="/icons/support.svg"
                                        alt="support"
                                        fill
                                        sizes="any"
                                    />
                                </div>
                            </button>
                        </Link>
                    </div>
                </div>
            </div>

            {/* <TopBar /> */}
            <div className="mb-[40px] md:mb-[100px]">
                <div className="mb-[56px]">
                    <SupportNetwork />
                </div>
                <TopTokenBar />
            </div>

            {/* King of hill */}
            <HighlightProject token={kingOfHill} showBtnPump={true} />

            {/* Filters */}
            <div className="w-full">
                <div className="w-full max-w-full flex gap-2 items-center overflow-x-scroll">
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            setSortBy(EGetTokenSortBy.TRENDING);
                        }}
                        className={clsx(
                            "flex items-center justify-center gap-[11px] min-w-[200px] px-4 2xl:min-w-[250px] py-4 rounded-md box-shadow-stats border-gradient",
                            {
                                "bg-[#0038FF]":
                                    sortBy === EGetTokenSortBy.TRENDING,
                                "bg-[#000000]":
                                    sortBy !== EGetTokenSortBy.TRENDING,
                            }
                        )}
                    >
                        <h1 className="text-[18px]">Trending</h1>
                        <div className="w-[20px] h-[20px] relative">
                            <Image
                                src="/icons/trending.svg"
                                alt="trending"
                                fill
                                sizes="any"
                            />
                        </div>
                    </button>
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            setSortBy(EGetTokenSortBy.TOP);
                        }}
                        className={clsx(
                            "flex items-center justify-center gap-[11px] min-w-[200px] px-4 2xl:min-w-[250px] py-4 rounded-md box-shadow-stats border-gradient",
                            {
                                "bg-[#0038FF]": sortBy === EGetTokenSortBy.TOP,
                                "bg-[#000000]": sortBy !== EGetTokenSortBy.TOP,
                            }
                        )}
                    >
                        <h1 className="text-[18px]">Top</h1>
                        <div className="w-[20px] h-[20px] relative">
                            <Image
                                src="/icons/star.svg"
                                alt="star"
                                fill
                                sizes="any"
                            />
                        </div>
                    </button>
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            setSortBy(EGetTokenSortBy.RAISING);
                        }}
                        className={clsx(
                            "flex items-center justify-center gap-[11px] min-w-[200px] px-4 2xl:min-w-[250px] py-4 rounded-md box-shadow-stats border-gradient",
                            {
                                "bg-[#0038FF]":
                                    sortBy === EGetTokenSortBy.RAISING,
                                "bg-[#000000]":
                                    sortBy !== EGetTokenSortBy.RAISING,
                            }
                        )}
                    >
                        <h1 className="text-[18px]">Raising</h1>
                        <div className="w-[20px] h-[20px] relative">
                            <Image
                                src="/icons/raising.svg"
                                alt="raising"
                                fill
                                sizes="any"
                            />
                        </div>
                    </button>
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            setSortBy(EGetTokenSortBy.NEW);
                        }}
                        className={clsx(
                            "flex items-center justify-center gap-[11px] min-w-[200px] px-4 2xl:min-w-[250px] py-4 rounded-md box-shadow-stats border-gradient",
                            {
                                "bg-[#0038FF]": sortBy === EGetTokenSortBy.NEW,
                                "bg-[#000000]": sortBy !== EGetTokenSortBy.NEW,
                            }
                        )}
                    >
                        {" "}
                        <h1 className="text-[18px]">New</h1>
                        <div className="w-[20px] h-[20px] relative">
                            <Image
                                src="/icons/new.svg"
                                alt="new"
                                fill
                                sizes="any"
                            />
                        </div>
                    </button>

                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            setSortBy(EGetTokenSortBy.FINISHED);
                        }}
                        className={clsx(
                            "flex items-center justify-center gap-[11px] min-w-[200px] px-4 2xl:min-w-[250px] py-4 rounded-md box-shadow-stats border-gradient",
                            {
                                "bg-[#0038FF]":
                                    sortBy === EGetTokenSortBy.FINISHED,
                                "bg-[#000000]":
                                    sortBy !== EGetTokenSortBy.FINISHED,
                            }
                        )}
                    >
                        <h1 className="text-[18px]">Finished</h1>
                        <div className="w-[20px] h-[20px] relative">
                            <Image
                                src="/icons/mark.svg"
                                alt="mark"
                                fill
                                sizes="any"
                            />
                        </div>
                    </button>

                    <div className="flex-1 relative">
                        <div className="absolute top-1/2 left-[24px] -translate-y-1/2">
                            <div className="w-[20px] h-[20px] relative">
                                <Image
                                    src="/icons/search.svg"
                                    alt="search"
                                    fill
                                    sizes="any"
                                />
                            </div>
                        </div>
                        <input
                            className="pl-14 min-w-[200px] col-span-2 font-vortex md:block py-4 rounded-md text-[20px] font-semibold bg-[#000000] box-shadow-stats border-gradient"
                            placeholder="Search"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                </div>
                <div className="w-full max-w-full h-full flex gap-2 items-center mt-2 overflow-x-scroll">
                    <Select
                        onValueChange={(value) => setAge(value as EGetTokenAge)}
                    >
                        <SelectTrigger className="font-vortex text-[18px] w-[200px] px-4 2xl:w-[250px] py-[26px] text-center flex justify-center gap-[11px] rounded-md bg-[#000000] box-shadow-stats border-gradient">
                            <SelectValue placeholder="Age" />
                        </SelectTrigger>
                        <SelectContent className="font-vortex text-[18px] text-center flex justify-center">
                            <SelectItem
                                value={EGetTokenAge.LESS_THAN_1H}
                                className="text-center"
                            >
                                &lt; 1 Hour
                            </SelectItem>
                            <SelectItem value={EGetTokenAge.LESS_THAN_6h}>
                                &lt; 6 Hour
                            </SelectItem>
                            <SelectItem value={EGetTokenAge.LESS_THAN_1D}>
                                &lt; 1 Day
                            </SelectItem>
                            <SelectItem value={EGetTokenAge.LESS_THAN_1W}>
                                &lt; 1 Week
                            </SelectItem>
                            <SelectItem value={EGetTokenAge.ALL}>
                                ALl
                            </SelectItem>
                        </SelectContent>
                    </Select>
                    <Select onValueChange={(value) => setMinProgress(value)}>
                        <SelectTrigger className="font-vortex text-[18px] w-[200px] px-4 2xl:w-[250px] py-[26px] text-center flex justify-center gap-[11px] rounded-md bg-[#000000] box-shadow-stats border-gradient">
                            <SelectValue placeholder="Min progress" />
                        </SelectTrigger>
                        <SelectContent className="font-vortex text-[18px]">
                            <SelectItem value="0">0%</SelectItem>
                            <SelectItem value="10">10%</SelectItem>
                            <SelectItem value="20">20%</SelectItem>
                            <SelectItem value="50">50%</SelectItem>
                            <SelectItem value="100">100%</SelectItem>
                        </SelectContent>
                    </Select>

                    <Select onValueChange={(value) => setMaxProgress(value)}>
                        <SelectTrigger className="font-vortex text-[18px] w-[200px] px-4 2xl:w-[250px] py-[26px] text-center flex justify-center gap-[11px] rounded-md bg-[#000000] box-shadow-stats border-gradient">
                            <SelectValue placeholder="Max progress" />
                        </SelectTrigger>
                        <SelectContent className="font-vortex text-[18px]">
                            <SelectItem value="5">5%</SelectItem>
                            <SelectItem value="10">10%</SelectItem>
                            <SelectItem value="20">20%</SelectItem>
                            <SelectItem value="50">50%</SelectItem>
                            <SelectItem value="100">100%</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>
            {/* TODO */}

            {isLoading ? (
                <div className="w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {new Array(6).fill("").map((_, idx) => (
                        <Skeleton key={idx} h="200px" />
                    ))}
                </div>
            ) : (
                <div className="w-full">
                    {/* Project list */}
                    <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {tokens.map((token, idx) => (
                            <ProjectItem key={idx} token={token} />
                        ))}
                    </div>

                    {isLoadMore && (
                        <div className="mt-6 flex justify-center">
                            <button
                                onClick={onLoadMore}
                                className="font-vortex md:block py-2 px-6 rounded-md text-sm font-semibold bg-[#ffffff] text-[#000000]"
                            >
                                Show me more
                            </button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
