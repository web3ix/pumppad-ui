import Image from "next/image";
import Link from "next/link";

export default function Footer() {
    return (
        <div className="px-5 md:px-[120px] py-[48px] flex flex-col md:flex-row justify-between items-center md:items-start gap-8">
            <div className="flex flex-col md:flex-row gap-8 md:gap-10 xl:gap-20 2xl:gap-[120px] items-center md:items-start">
                <div className="w-[194px] h-[44px] relative">
                    <Image src="/logo-w-text.png" alt="logo" fill sizes="any" />
                </div>

                <div className="text-center md:text-left">
                    <div className="pb-4 text-[18px] font-bold">Resource</div>
                    <div className="text-[#9A98B9] flex flex-col gap-4 text-[16px]">
                        <Link href="https://docs.pumppad.vip/" target="_blank">
                            <div>Documents</div>
                        </Link>
                        <Link
                            href="https://docs.pumppad.vip/practice-on-pump-pad/launching-for-builders"
                            target="_blank"
                        >
                            <div>How to launch?</div>
                        </Link>
                        <Link
                            href="https://docs.pumppad.vip/practice-on-pump-pad/participating-for-investors"
                            target="_blank"
                        >
                            <div>How to buy?</div>
                        </Link>
                        <div>Privacy Policy</div>
                        <div>Terms of Use</div>
                    </div>
                </div>

                <div>
                    <div className="pb-4 text-center md:text-left text-[18px] font-bold">
                        Features
                    </div>
                    <div className="text-[#9A98B9] grid grid-cols-1 text-left gap-4 text-[16px]">
                        <Link href="/create">
                            <div>Launch Token</div>
                        </Link>
                        <div>Buy/Sell Token</div>
                        <div>Build Products</div>
                    </div>
                </div>
            </div>

            <div>
                <Link href="https://t.me/pumppad" target="_blank">
                    <div className="flex items-center gap-5 border-gradient rounded-md p-3 mb-10">
                        <div>Talk to us via Telegram</div>
                        <div className="flex items-center justify-center gap-1 bg-[#111827] p-1.5">
                            <h1 className="leading-0">Contact</h1>
                            <div className="w-[24px] h-[24px] relative">
                                <Image
                                    src="/icons/circle.svg"
                                    alt="circle"
                                    fill
                                    sizes="any"
                                />
                            </div>
                            {/* <div>Contact</div> */}
                            {/* <div> TODO
                        </div> */}
                        </div>
                    </div>
                </Link>

                <div className="flex gap-2 items-center justify-center md:justify-end">
                    <Link href="https://t.me/pumppad" target="_blank">
                        <div className="border-gradient py-2 px-3 rounded-md">
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

                    <Link href="https://x.com/pumppad_vip" target="_blank">
                        <div className="border-gradient py-2 px-3 rounded-md">
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

                    {/* <div className="border-gradient py-2 px-3 rounded-md">
                        <div className="w-[24px] h-[24px] relative">
                            <Image
                                src="/icons/medium.svg"
                                alt="medium"
                                fill
                                sizes="any"
                            />
                        </div>
                    </div> */}
                </div>
            </div>
        </div>
    );
}
