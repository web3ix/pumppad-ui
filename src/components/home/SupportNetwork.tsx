import Image from "next/image";

export default function SupportNetwork() {
    return (
        <div className="w-[99vw] max-w-[99vw] relative flex overflow-x-hidden">
            <div className="animate-marquee flex items-center gap-[60px]">
                <span className="flex items-center gap-6">
                    <div className="w-[64px] h-[64px] relative">
                        <Image
                            src="/icons/networks/ethereum.svg"
                            alt="ethereum"
                            fill
                            sizes="any"
                        />
                    </div>
                    <h1 className="text-[24px]">Ethereum</h1>
                </span>
                <span className="flex items-center gap-6">
                    <div className="w-[64px] h-[64px] relative">
                        <Image
                            src="/icons/networks/base.svg"
                            alt="base"
                            fill
                            sizes="any"
                        />
                    </div>
                    <h1 className="text-[24px]">Base</h1>
                </span>
                <span className="flex items-center gap-6">
                    <div className="w-[64px] h-[64px] relative">
                        <Image
                            src="/icons/networks/bsc.svg"
                            alt="bsc"
                            fill
                            sizes="any"
                        />
                    </div>
                    <h1 className="text-[24px]">bsc</h1>
                </span>
                <span className="flex items-center gap-6">
                    <div className="w-[64px] h-[64px] relative">
                        <Image
                            src="/icons/networks/polygon.svg"
                            alt="polygon"
                            fill
                            sizes="any"
                        />
                    </div>
                    <h1 className="text-[24px]">polygon</h1>
                </span>
                <span className="flex items-center gap-6">
                    <div className="w-[64px] h-[64px] relative">
                        <Image
                            src="/icons/networks/arb.svg"
                            alt="arbitrum"
                            fill
                            sizes="any"
                        />
                    </div>
                    <h1 className="text-[24px]">arbitrum</h1>
                </span>
                <span className="flex items-center gap-6">
                    <div className="w-[64px] h-[64px] relative">
                        <Image
                            src="/icons/networks/zksync.svg"
                            alt="zksync"
                            fill
                            sizes="any"
                        />
                    </div>
                    <h1 className="text-[24px]">zksync</h1>
                </span>
                <span className="flex items-center gap-6">
                    <div className="w-[64px] h-[64px] relative">
                        <Image
                            src="/icons/networks/solana.svg"
                            alt="solana"
                            fill
                            sizes="any"
                        />
                    </div>
                    <h1 className="text-[24px]">solana</h1>
                </span>
            </div>

            <div className="absolute top-0 animate-marquee2 pl-6 flex items-center gap-[60px]">
                <span className="flex items-center gap-6">
                    <div className="w-[64px] h-[64px] relative">
                        <Image
                            src="/icons/networks/ethereum.svg"
                            alt="ethereum"
                            fill
                            sizes="any"
                        />
                    </div>
                    <h1 className="text-[24px]">Ethereum</h1>
                </span>
                <span className="flex items-center gap-6">
                    <div className="w-[64px] h-[64px] relative">
                        <Image
                            src="/icons/networks/base.svg"
                            alt="base"
                            fill
                            sizes="any"
                        />
                    </div>
                    <h1 className="text-[24px]">Base</h1>
                </span>
                <span className="flex items-center gap-6">
                    <div className="w-[64px] h-[64px] relative">
                        <Image
                            src="/icons/networks/bsc.svg"
                            alt="bsc"
                            fill
                            sizes="any"
                        />
                    </div>
                    <h1 className="text-[24px]">bsc</h1>
                </span>
                <span className="flex items-center gap-6">
                    <div className="w-[64px] h-[64px] relative">
                        <Image
                            src="/icons/networks/polygon.svg"
                            alt="polygon"
                            fill
                            sizes="any"
                        />
                    </div>
                    <h1 className="text-[24px]">polygon</h1>
                </span>
                <span className="flex items-center gap-6">
                    <div className="w-[64px] h-[64px] relative">
                        <Image
                            src="/icons/networks/arb.svg"
                            alt="arbitrum"
                            fill
                            sizes="any"
                        />
                    </div>
                    <h1 className="text-[24px]">arbitrum</h1>
                </span>
                <span className="flex items-center gap-6">
                    <div className="w-[64px] h-[64px] relative">
                        <Image
                            src="/icons/networks/zksync.svg"
                            alt="zksync"
                            fill
                            sizes="any"
                        />
                    </div>
                    <h1 className="text-[24px]">zksync</h1>
                </span>
                <span className="flex items-center gap-6">
                    <div className="w-[64px] h-[64px] relative">
                        <Image
                            src="/icons/networks/solana2.svg"
                            alt="solana"
                            fill
                            sizes="any"
                        />
                    </div>
                    <h1 className="text-[24px]">solana</h1>
                </span>
            </div>
        </div>
    );
}
