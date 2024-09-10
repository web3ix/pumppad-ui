"use client";

import ProjectItem from "@/components/ProjectItem";
import Image from "next/image";
import Link from "next/link";

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

export default function Home() {
    return (
        <div className="px-5 md:px-[120px] flex flex-col items-stretch md:items-center gap-12 relative">
            <div className="launch-bg1"></div>

            <div>
                {/* Project list */}
                {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {new Array(6).fill("").map((_, idx) => (
                        <ProjectItem key={idx} />
                    ))}
                </div> */}

                <div className="mt-6 flex justify-center">
                    <button className="font-vortex md:block py-2 px-6 rounded-md text-sm font-semibold bg-[#ffffff] text-[#000000]">
                        Show me more
                    </button>
                </div>
            </div>
        </div>
    );
}
