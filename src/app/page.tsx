"use client";

import TopBar from "@/components/home/Topbar";
import Image from "next/image";

const CHAINS_SUPPORTED = [
    "ethereum",
    "base",
    "bsc",
    "polygon",
    "linea",
    "arbitrum",
    "zksync",
    "solana",
];

export default function CreateToken() {
    return (
        <div className="px-[20px] flex flex-col items-stretch md:items-center gap-12 relative">
            <div className="launch-bg1"></div>
            <div className="flex flex-col gap-6 items-center">
                <h1 className="text-[30px] leading-[160px] md:text-[200px] primary-text-gradient text-center mt-[60px]">
                    PUMPPAD
                </h1>
                <div className="text-center">
                    <div className="text-[20px] text-[#94A3B8] mb-2">
                        From Building to Launching in just a few steps
                    </div>
                    <div className="text-[20px] text-[#94A3B8]">
                        Powered by DEVHUB AI
                    </div>
                </div>
                <div className="flex flex-col gap-5">
                    <div className="flex justify-center gap-5">
                        <button className="font-vortex md:block py-2 px-6 rounded-md text-sm font-semibold md:bg-[#0038FF]">
                            Connect wallet
                        </button>

                        <button className="font-vortex md:block py-2 px-6 rounded-md text-sm font-semibold bg-gradient-to-b from-[#4338CA] to-[#FFFFFF]">
                            Launch your token now
                        </button>

                        <button className="font-vortex md:block py-2 px-6 rounded-md text-sm font-semibold md:bg-[#0038FF]">
                            Product order
                        </button>
                    </div>

                    <div className="flex justify-center gap-5">
                        <button className="font-vortex md:block py-2 px-6 rounded-md text-sm font-semibold bg-[#ffffff] text-[#000000]">
                            How to launch
                        </button>

                        <button className="font-vortex md:block py-2 px-6 rounded-md text-sm font-semibold bg-[#ffffff] text-[#000000]">
                            Agent support
                        </button>
                    </div>
                </div>
                {/* <ul className="flex flex-col md:flex-row gap-3 md:gap-12 justify-between font-medium text-[#C4CBF5]">
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
                </ul> */}
            </div>

            {/* <TopBar /> */}
        </div>
    );
}
