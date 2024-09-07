import Image from "next/image";

export default function Footer() {
    return (
        <div className="px-[20px] md:px-[100px] py-[48px] flex flex-col md:flex-row justify-between items-center md:items-start gap-8">
            <div className="flex flex-col md:flex-row gap-8 md:gap-[120px] items-center md:items-start">
                <div className="w-[120px] h-[32px] relative">
                    <Image src="/logo-w-text.png" alt="logo" fill sizes="any" />
                </div>

                <div className="text-center md:text-left">
                    <div className="pb-4 text-[18px] font-bold">Home</div>
                    <div className="text-[#9A98B9] flex flex-col gap-4 text-[16px]">
                        <div>About</div>
                        <div>Solutions</div>
                        <div>Document</div>
                        <div>Guideline</div>
                    </div>
                </div>

                <div>
                    <div className="pb-4 text-center md:text-left text-[18px] font-bold">
                        Services
                    </div>
                    <div className="text-[#9A98B9] grid grid-cols-2 text-left gap-4 text-[16px]">
                        <div>AI Domain Master</div>
                        <div>Website AI Creation</div>
                        <div>Social Tools</div>
                        <div>SAFU Dev</div>
                        <div>Chatter Shield</div>
                        <div>AI Audit</div>
                        <div>Marketing</div>
                        <div>VIP Package</div>
                    </div>
                </div>
            </div>

            <div>
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

                <div className="flex gap-2 items-center justify-center md:justify-end">
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

                    <div className="border-gradient py-2 px-3 rounded-md">
                        <div className="w-[24px] h-[24px] relative">
                            <Image
                                src="/icons/medium.svg"
                                alt="medium"
                                fill
                                sizes="any"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
