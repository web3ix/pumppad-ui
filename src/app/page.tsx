"use client";

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
        <div className="px-[20px] md:px-[100px] flex flex-col items-stretch md:items-center gap-12 relative">
            <div className="launch-bg1"></div>
            <div className="flex flex-col gap-4 items-center">
                <h1 className="text-[32px] md:leading-[160px] md:text-[200px] primary-text-gradient text-center mt-[60px]">
                    PUMPPAD
                </h1>
                <div className="text-center text-[15px] md:text-[20px] text-[#94A3B8]">
                    <div className="mb-2">
                        From Building to Launching in just a few steps
                    </div>
                    <div>Powered by DEVHUB AI</div>
                </div>
                <div className="flex flex-col gap-5">
                    <div className="flex flex-col md:flex-row justify-center gap-5">
                        <button className="font-vortex md:block py-2 px-6 rounded-md text-sm font-semibold bg-[#0038FF]">
                            Connect wallet
                        </button>

                        <button className="font-vortex md:block py-2 px-6 rounded-md text-sm font-semibold bg-gradient-to-b from-[#4338CA] to-[#FFFFFF]">
                            Launch your token now
                        </button>

                        <button className="font-vortex md:block py-2 px-6 rounded-md text-sm font-semibold bg-[#0038FF]">
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

            <div>
                <div className="flex flex-col md:flex-row p-7 gap-7 border-gradient rounded-xl">
                    <div className="cursor-pointer w-full pt-[150%] md:w-[280px] md:pt-[400px] relative">
                        <Image
                            src="/mock-token.png"
                            alt="mock-token"
                            fill
                            sizes="any"
                        />
                    </div>

                    <div className="flex flex-col justify-between gap-10">
                        <h1 className="leading-[100px] text-[100px]">DOGS</h1>
                        <div>
                            <div className="text-[#19FB9B] text-[14px] md:text-[20px]">
                                Contract: TX9mipnPM6rHdpxpHmVqEn1bo9qY1u6tq3
                            </div>
                            {/* <div>icon</div> */}
                        </div>

                        <p className="text-[#94A3B8]">
                            Who is Spotty? 🐕 Spotty, the unofficial logo and
                            main mascot of VK, was created by Pavel Durov. He
                            drew this iconic dog during a charity auction to
                            support orphanages, and soon, Spotty became a
                            beloved symbol of VK.
                        </p>

                        <div>
                            <button className="font-vortex md:block py-2 px-6 rounded-md text-sm font-semibold bg-[#0038FF]">
                                Pump it
                            </button>
                        </div>
                        <div className="font-vortex grid grid-cols-1 md:grid-cols-4 gap-10">
                            <div className="flex flex-col items-stretch justify-between gap-6 p-4 bg-[#000000] box-shadow-stats border-gradient rounded-xl">
                                <div className="flex justify-between text-[16px]">
                                    <div className="text-[#666666]">PRICE</div>
                                    <div>15 %</div>
                                </div>
                                <div className="flex justify-between text-[32px]">
                                    <div>0.00015</div>
                                    <div>ETH</div>
                                </div>
                            </div>

                            <div className="flex flex-col items-stretch justify-between gap-6 p-4 bg-[#000000] box-shadow-stats border-gradient rounded-xl">
                                <div className="text-[16px] text-[#666666]">
                                    Marketcap
                                </div>
                                <div className="text-[32px]">$100K</div>
                            </div>
                            <div className="flex flex-col items-stretch justify-between gap-6 p-4 bg-[#000000] box-shadow-stats border-gradient rounded-xl">
                                <div className="text-[16px] text-[#666666]">
                                    Liquidity
                                </div>
                                <div className="text-[32px]">$14k</div>
                            </div>
                            <div className="flex flex-col items-stretch justify-between gap-6 p-4 bg-[#000000] box-shadow-stats border-gradient rounded-xl">
                                <div className="text-[16px] text-[#666666]">
                                    Token created
                                </div>
                                <div className="text-[32px]">1H 17M</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
