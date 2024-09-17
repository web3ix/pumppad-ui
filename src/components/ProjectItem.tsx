import { IToken, ITokenMetadata } from "@/store";
import {
    SOL_PRICE,
    calcLiquidity,
    calcMarketCap,
    calcProgress,
    numberWithCommas,
    timeDiff,
} from "@/utils";
import Image from "next/image";
import Link from "next/link";

export default function ProjectItem({ token }: { token: IToken }) {
    return (
        <Link href={`/token/${token.token}`}>
            <div className="relative h-full flex flex-col items-stretch">
                <div className="border border-[#4338CA] rounded-t-[10px] overflow-hidden w-full h-[180px] relative">
                    <Image src={token.banner} alt="banner" fill sizes="any" />
                </div>
                <div className="flex-1 -translate-y-10 flex flex-col items-stretch p-6 gap-8 border-gradient !border-t-[#4338CA] rounded-xl bg-[#000]">
                    <div className="flex  gap-[13px]">
                        <div className="border border-[#334155] rounded-[10px] overflow-hidden w-[95px] h-[95px] relative">
                            <Image
                                src={token.icon}
                                alt="icon"
                                fill
                                sizes="any"
                            />
                        </div>

                        <div className="pt-0.5 flex flex-col justify-between">
                            <h1 className="text-[40px]">{token.symbol}</h1>

                            <div className="flex gap-[5px] items-center">
                                {token.link?.website && (
                                    <Link
                                        href={token.link.website}
                                        target="_blank"
                                    >
                                        <div className="overflow-hidden border border-[#334155] rounded-[5px] py-2 px-3">
                                            <div className="w-[24px] h-[24px] relative">
                                                <Image
                                                    src="/icons/web2.svg"
                                                    alt="website"
                                                    fill
                                                    sizes="any"
                                                />
                                            </div>
                                        </div>
                                    </Link>
                                )}
                                {token.link?.telegram && (
                                    <Link
                                        href={token.link.telegram}
                                        target="_blank"
                                    >
                                        <div className="overflow-hidden border border-[#334155] rounded-[5px] py-2 px-3">
                                            <div className="w-[24px] h-[24px] relative">
                                                <Image
                                                    src="/icons/telegram.svg"
                                                    alt="telegram"
                                                    fill
                                                    sizes="any"
                                                />
                                            </div>
                                        </div>
                                    </Link>
                                )}
                                {token.link?.twitter && (
                                    <Link
                                        href={token.link.twitter}
                                        target="_blank"
                                    >
                                        <div className="overflow-hidden border border-[#334155] rounded-[5px] py-2 px-3">
                                            <div className="w-[24px] h-[24px] relative">
                                                <Image
                                                    src="/icons/twitter.svg"
                                                    alt="twitter"
                                                    fill
                                                    sizes="any"
                                                />
                                            </div>
                                        </div>
                                    </Link>
                                )}
                                {token.link?.discord && (
                                    <Link
                                        href={token.link.discord}
                                        target="_blank"
                                    >
                                        <div className="overflow-hidden border border-[#334155] rounded-[5px] py-2 px-3">
                                            <div className="w-[24px] h-[24px] relative">
                                                <Image
                                                    src="/icons/medium.svg"
                                                    alt="medium"
                                                    fill
                                                    sizes="any"
                                                />
                                            </div>
                                        </div>
                                    </Link>
                                )}

                                {token.link?.link1 && (
                                    <Link
                                        href={token.link.link1}
                                        target="_blank"
                                    >
                                        <div className="overflow-hidden border border-[#334155] rounded-[5px] py-2 px-3">
                                            <div className="w-[24px] h-[24px] relative">
                                                <Image
                                                    src="/icons/web2.svg"
                                                    alt="website"
                                                    fill
                                                    sizes="any"
                                                />
                                            </div>
                                        </div>
                                    </Link>
                                )}
                                {token.link?.link2 && (
                                    <Link
                                        href={token.link.link2}
                                        target="_blank"
                                    >
                                        <div className="overflow-hidden border border-[#334155] rounded-[5px] py-2 px-3">
                                            <div className="w-[24px] h-[24px] relative">
                                                <Image
                                                    src="/icons/web2.svg"
                                                    alt="website"
                                                    fill
                                                    sizes="any"
                                                />
                                            </div>
                                        </div>
                                    </Link>
                                )}
                            </div>
                        </div>
                    </div>
                    <p className="text-[#94A3B8] line-clamp-3 min-h-[63px]">
                        {token.desc}
                    </p>

                    <div className="px-[18px] pb-[41px]">
                        <div className="font-vortex grid grid-cols-1 md:grid-cols-3 gap-[18px] mb-[29px]">
                            <div className="flex flex-col gap-4">
                                <div className="md:text-[15px] 2xl:text-[20px] text-[#666666]">
                                    Marketcap
                                </div>
                                <h1 className="md:text-[20px] 2xl:text-[25px]">
                                    $
                                    {token.parsedReserve > 0
                                        ? numberWithCommas(
                                              calcMarketCap(token.lastPrice)
                                          )
                                        : 0}
                                </h1>
                            </div>
                            <div className="text-center flex flex-col items-stretch justify-between gap-4">
                                <div className="md:text-[15px] 2xl:text-[20px] text-[#666666]">
                                    Liquidity
                                </div>
                                <h1 className="md:text-[20px] 2xl:text-[25px]">
                                    $
                                    {numberWithCommas(
                                        calcLiquidity(token.parsedReserve)
                                    )}
                                </h1>
                            </div>
                            <div className="text-right flex flex-col items-stretch justify-between gap-4">
                                <div className="md:text-[15px] 2xl:text-[20px] text-[#19FB9B]">
                                    Created
                                </div>
                                <h1 className="md:text-[20px] 2xl:text-[25px]">
                                    {timeDiff(token.timestamp)}
                                </h1>
                            </div>
                        </div>

                        <div>
                            <div className="text-[#19FB9B] mb-1 text-[15px] font-bold">
                                {calcProgress(token.parsedReserve)}%
                            </div>

                            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                                <div className="relative h-3 flex items-center justify-center">
                                    <div
                                        style={{
                                            width: `${calcProgress(
                                                token.parsedReserve
                                            )}%`,
                                        }}
                                        className="absolute top-0 bottom-0 left-0 rounded-lg bg-[#0038ff]"
                                    ></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
}
