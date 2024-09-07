import React from "react";

// ClassName
const topbarClass =
    "sticky top-[64px] md:top-[88px] left-0 right-0 w-full px-3 md:px-10 z-40 h-[42px] bg-[#1A1D1F] shadow-[inset_1px_0_0_0_#111315] text-sm z-50 flex items-center overflow-x-hidden";

function TopBar() {
    return (
        <div className={topbarClass}>
            <div className="relative flex overflow-x-hidden max-w-[calc(100vw-24px)] md:max-w-[calc(100vw-80px)] lg:max-w-[calc(100vw-368px)]">
                <div className="animate-marquee whitespace-nowrap">
                    <span className="mx-6 text-[13px] font-semibold leading-[16px]">
                        🔥Trending
                    </span>
                    {topTokenMockup.map((item, idx) => (
                        <span
                            key={item.code}
                            className="mx-6 text-[13px] font-semibold leading-[16px] text-[#90E788]"
                        >
                            <span className="text-[#6F767E]">#{item.rank}</span>{" "}
                            {item.label}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
}

const topTokenMockup = [
    {
        label: "DONUT",
        code: "donut",
        rank: 1,
    },
    {
        label: "FACEP",
        code: "facep",
        rank: 2,
    },
    {
        label: "GRU",
        code: "gru",
        rank: 3,
    },
    {
        label: "PAWS",
        code: "paws",
        rank: 4,
    },
    {
        label: "DREW",
        code: "drew",
        rank: 5,
    },
    {
        label: "BKS",
        code: "bks",
        rank: 6,
    },
    {
        label: "FONK",
        code: "fonk",
        rank: 7,
    },
    {
        label: "CHD",
        code: "chd",
        rank: 8,
    },
    {
        label: "SOP",
        code: "sop",
        rank: 9,
    },
    {
        label: "SOL",
        code: "sol",
        rank: 10,
    },
];

export default TopBar;
