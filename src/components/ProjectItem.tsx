import { IToken, ITokenMetadata } from "@/store";
import { fetcher } from "@/utils";
import Image from "next/image";
import Link from "next/link";
import useSWR from "swr";

export default function ProjectItem({ token }: { token: IToken }) {
    // const { data: metadata, isLoading } = useSWR<ITokenMetadata>(
    //     token.uri,
    //     fetcher
    // );

    return (
        <Link href={`/token/${token.token}`}>
            <div className="flex flex-col p-6 gap-6 border-gradient rounded-xl bg-[#000]">
                <div className="flex justify-between">
                    <div className="cursor-pointer w-[89px] h-[89px] relative">
                        <Image src={token.icon} alt="icon" fill sizes="any" />
                    </div>
                    <div className="cursor-pointer w-[16px] h-[16px] relative">
                        <Image
                            src="/icons/arrow.svg"
                            alt="arrow"
                            fill
                            sizes="any"
                        />
                    </div>
                </div>

                <h1 className="leading-[30px] text-[30px]">{token.symbol}</h1>
                {/* <p className="text-[#94A3B8]">{metadata?.description}</p> */}

                <div className="flex justify-between">
                    <div className="flex font-bold gap-8">
                        <div className="text-[#19FB9B]">10%</div>
                        <div>$39k</div>
                    </div>
                    <div className="flex font-bold gap-8">
                        <div>40m</div>
                        <div>8 txns / 400 Vol</div>
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                    <div className="relative h-6 flex items-center justify-center">
                        <div className="absolute top-0 bottom-0 left-0 rounded-lg w-[15%] bg-[#0038ff]"></div>
                    </div>
                </div>
            </div>
        </Link>
    );
}
