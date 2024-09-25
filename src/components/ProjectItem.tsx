"use client";
import useConnect from "@/hooks/useConnect";
import { IToken } from "@/store";
import {
    calcLiquidity,
    calcMarketCap,
    calcProgress,
    numberFormatter,
    timeDiff,
} from "@/utils";
import { useWallet, useConnection } from "@solana/wallet-adapter-react";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useMemo, useRef, useState } from "react";
import Modal from "react-modal";
import { toast } from "react-hot-toast";
import axios from "axios";
import base58 from "bs58";

export default function ProjectItem({
    token,
    showSetting = false,
    showTracking = false,
}: {
    token: IToken;
    showSetting?: boolean;
    showTracking?: boolean;
}) {
    const { publicKey, sendTransaction, signMessage } = useWallet();
    const { connection } = useConnection();
    const { connect } = useConnect();

    const iconRef = useRef<HTMLInputElement>(null);
    const bannerRef = useRef<HTMLInputElement>(null);

    const [description, setDescription] = useState(token.desc);
    const [icon, setIcon] = useState<File | undefined>();
    const [banner, setBanner] = useState<File | undefined>();
    const [link, setLink] = useState<{
        website?: string;
        twitter?: string;
        telegram?: string;
        discord?: string;
        link1?: string;
        link2?: string;
    }>(JSON.parse(token.link));
    const [previewIcon, setPreviewIcon] = useState(token.icon);
    const [previewBanner, setPreviewBanner] = useState(token.banner);
    const [submitting, setSubmitting] = useState(false);

    const [isOpenModal, setIsOpenModal] = useState(false);

    function openModal() {
        setIsOpenModal(true);
    }

    function closeModal() {
        setIsOpenModal(false);
    }

    const handleInputLink = useCallback(
        (link: string) => {
            try {
                let url = prompt(
                    `Enter ${["link1", "link2"].includes(link) ? "another" : link} link`
                );

                if (!url) return;
                setLink((pre) => ({ ...pre, [link]: url }));
            } catch (error) {}
        },
        [setLink]
    );

    const links = useMemo(
        () => (token.link ? JSON.parse(token.link) : undefined),
        [token.link]
    );

    const handleUpdate = useCallback(async () => {
        if (!connection || submitting) return;
        if (!publicKey) return toast.error("Connect wallet first");
        try {
            setSubmitting(true);
            const encodedMessage = new TextEncoder().encode(token.token);
            const signedMessage = await signMessage?.(encodedMessage);
            const signature = base58.encode(signedMessage as Uint8Array);

            const formData = new FormData();
            formData.append("signature", signature);
            if (description) formData.append("description", description);
            if (icon) formData.append("icon", icon);
            if (banner) formData.append("banner", banner);

            if (Object.keys(link))
                formData.append("link", JSON.stringify(link));

            await axios.post(
                `${process.env.NEXT_PUBLIC_API}/bond/tokens/${token.token}`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            toast.success("Update success");
            setIsOpenModal(false);
            setSubmitting(false);
        } catch (error: any) {
            setSubmitting(false);
            toast.error(error?.message ?? error);
        }
    }, [
        connection,
        publicKey,
        token,
        description,
        icon,
        banner,
        Object.values(link),
    ]);

    return (
        <div className="relative">
            {showSetting && (
                <>
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
                                zIndex: 999,
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
                            <h1 className="text-[30px]">Edit token</h1>

                            <div className="h-0.5 bg-[#fff] my-[35px]"></div>

                            <div className="flex flex-col gap-10 md:gap-[30px]">
                                <div>
                                    <label
                                        htmlFor="description"
                                        className="font-bold"
                                    >
                                        Description*
                                    </label>
                                    <textarea
                                        id="description"
                                        className="mt-4 border-gradient h-[180px] bg-[#00000087]"
                                        placeholder="Please describe"
                                        value={description}
                                        onChange={(e) =>
                                            setDescription(e.target.value)
                                        }
                                    />
                                </div>

                                <div className="flex gap-6 md:gap-12">
                                    <div>
                                        <label
                                            htmlFor="icon"
                                            className="font-bold"
                                        >
                                            Icon*
                                        </label>
                                        <input
                                            type="file"
                                            id="icon"
                                            className="hidden"
                                            ref={iconRef}
                                            onChange={(e) => {
                                                const file =
                                                    e.target.files?.[0];
                                                if (!file) return;
                                                const objectUrl =
                                                    URL.createObjectURL(file);
                                                setPreviewIcon(objectUrl);
                                                setIcon(file);
                                            }}
                                        />

                                        <div
                                            onClick={() =>
                                                iconRef.current?.click()
                                            }
                                            className={clsx(
                                                "mt-4 cursor-pointer flex flex-col items-center overflow-hidden bg-[#06050E] border border-dashed border-[#ffffff1f] rounded-xl gap-2",
                                                {
                                                    "p-10 md:p-10":
                                                        !previewIcon,
                                                }
                                            )}
                                        >
                                            {previewIcon ? (
                                                <div className="cursor-pointer w-[138px] h-[138px] relative">
                                                    <Image
                                                        src={previewIcon}
                                                        alt="icon"
                                                        fill
                                                        sizes="any"
                                                    />
                                                </div>
                                            ) : (
                                                <>
                                                    <div className="w-[24px] h-[24px] relative">
                                                        <Image
                                                            src="/icons/folder.svg"
                                                            alt="folder"
                                                            fill
                                                            sizes="any"
                                                        />
                                                    </div>
                                                    <div className="font-bold text-[16px]">
                                                        Upload file
                                                    </div>
                                                </>
                                            )}
                                        </div>
                                    </div>

                                    <div className="flex-1">
                                        <label
                                            htmlFor="banner"
                                            className="font-bold"
                                        >
                                            Banner*
                                        </label>
                                        <input
                                            type="file"
                                            id="banner"
                                            className="hidden"
                                            ref={bannerRef}
                                            onChange={(e) => {
                                                const file =
                                                    e.target.files?.[0];
                                                if (!file) return;
                                                const objectUrl =
                                                    URL.createObjectURL(file);
                                                setPreviewBanner(objectUrl);
                                                setBanner(file);
                                            }}
                                        />
                                        <div
                                            onClick={() =>
                                                bannerRef.current?.click()
                                            }
                                            className={clsx(
                                                "mt-4 cursor-pointer flex flex-col items-center bg-[#06050E] border border-dashed border-[#ffffff1f] rounded-xl gap-2",
                                                {
                                                    "py-10 md:p-10":
                                                        !previewBanner,
                                                }
                                            )}
                                        >
                                            {previewBanner ? (
                                                <div className="cursor-pointer w-[100%] h-[138px] relative">
                                                    <Image
                                                        src={previewBanner}
                                                        alt="icon"
                                                        fill
                                                        sizes="any"
                                                    />
                                                </div>
                                            ) : (
                                                <>
                                                    <div className="w-[24px] h-[24px] relative">
                                                        <Image
                                                            src="/icons/folder.svg"
                                                            alt="folder"
                                                            fill
                                                            sizes="any"
                                                        />
                                                    </div>
                                                    <div className="font-bold text-[16px]">
                                                        Upload file
                                                    </div>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <label className="font-bold">Link</label>
                                    <div className="grid grid-cols-1 md:grid-cols-3 mt-4 gap-2 md:gap-[30px]">
                                        <div
                                            onClick={() =>
                                                handleInputLink("website")
                                            }
                                            className="md:min-h-[136px] cursor-pointer flex md:flex-col items-center justify-center py-[18px] md:py-10 md:px-16 bg-[#06050E] border border-[#ffffff1f] rounded-xl gap-1.5"
                                        >
                                            {link.website ? (
                                                <div className="line-clamp-1 md:w-[97px] overflow-hidden  font-semibold md:text-[16px] truncate text-center">
                                                    {link.website}
                                                </div>
                                            ) : (
                                                <>
                                                    <div className="w-[24px] h-[24px] relative">
                                                        <Image
                                                            src="/icons/web.svg"
                                                            alt="web"
                                                            fill
                                                            sizes="any"
                                                        />
                                                    </div>
                                                    <div className="font-semibold md:text-[16px]">
                                                        Add Website
                                                    </div>
                                                </>
                                            )}
                                        </div>
                                        <div
                                            onClick={() =>
                                                handleInputLink("twitter")
                                            }
                                            className="cursor-pointer flex md:flex-col items-center justify-center py-[18px] md:py-10 bg-[#06050E] border border-[#ffffff1f] rounded-xl gap-1.5"
                                        >
                                            {link.twitter ? (
                                                <div className="line-clamp-1 md:w-[97px] overflow-hidden  font-semibold md:text-[16px] truncate text-center">
                                                    {link.twitter}
                                                </div>
                                            ) : (
                                                <>
                                                    <div className="w-[24px] h-[24px] relative">
                                                        <Image
                                                            src="/icons/twitter1.svg"
                                                            alt="twitter1"
                                                            fill
                                                            sizes="any"
                                                        />
                                                    </div>
                                                    <div className="font-semibold md:text-[16px]">
                                                        Add Twitter
                                                    </div>
                                                </>
                                            )}
                                        </div>
                                        <div
                                            onClick={() =>
                                                handleInputLink("telegram")
                                            }
                                            className="cursor-pointer flex md:flex-col items-center justify-center py-[18px] md:py-10 bg-[#06050E] border border-[#ffffff1f] rounded-xl gap-1.5"
                                        >
                                            {link.telegram ? (
                                                <div className="line-clamp-1 md:w-[97px] overflow-hidden  font-semibold md:text-[16px] truncate text-center">
                                                    {link.telegram}
                                                </div>
                                            ) : (
                                                <>
                                                    <div className="w-[24px] h-[24px] relative">
                                                        <Image
                                                            src="/icons/telegram1.svg"
                                                            alt="telegram1"
                                                            fill
                                                            sizes="any"
                                                        />
                                                    </div>
                                                    <div className="font-semibold md:text-[16px]">
                                                        Add Telegram
                                                    </div>
                                                </>
                                            )}
                                        </div>
                                        <div
                                            onClick={() =>
                                                handleInputLink("discord")
                                            }
                                            className="cursor-pointer flex md:flex-col items-center justify-center py-[18px] md:py-10 bg-[#06050E] border border-[#ffffff1f] rounded-xl gap-1.5"
                                        >
                                            {link.discord ? (
                                                <div className="line-clamp-1 md:w-[97px] overflow-hidden  font-semibold md:text-[16px] truncate text-center">
                                                    {link.discord}
                                                </div>
                                            ) : (
                                                <>
                                                    <div className="w-[24px] h-[24px] relative">
                                                        <Image
                                                            src="/icons/discord1.svg"
                                                            alt="discord1"
                                                            fill
                                                            sizes="any"
                                                        />
                                                    </div>
                                                    <div className="font-semibold md:text-[16px]">
                                                        Add Discord
                                                    </div>
                                                </>
                                            )}
                                        </div>
                                        <div
                                            onClick={() =>
                                                handleInputLink("link1")
                                            }
                                            className="cursor-pointer flex md:flex-col items-center justify-center py-[18px] md:py-10 bg-[#06050E] border border-[#ffffff1f] rounded-xl gap-1.5"
                                        >
                                            {link.link1 ? (
                                                <div className="line-clamp-1 md:w-[97px] overflow-hidden  font-semibold md:text-[16px] truncate text-center">
                                                    {link.link1}
                                                </div>
                                            ) : (
                                                <>
                                                    <div className="w-[24px] h-[24px] relative">
                                                        <Image
                                                            src="/icons/link.svg"
                                                            alt="link"
                                                            fill
                                                            sizes="any"
                                                        />
                                                    </div>
                                                    <div className="font-semibold md:text-[16px]">
                                                        Add Another Link
                                                    </div>
                                                </>
                                            )}
                                        </div>
                                        <div
                                            onClick={() =>
                                                handleInputLink("link2")
                                            }
                                            className="cursor-pointer flex md:flex-col items-center justify-center py-[18px] md:py-10 bg-[#06050E] border border-[#ffffff1f] rounded-xl gap-1.5"
                                        >
                                            {link.link2 ? (
                                                <div className="line-clamp-1 md:w-[97px] overflow-hidden  font-semibold md:text-[16px] truncate text-center">
                                                    {link.link2}
                                                </div>
                                            ) : (
                                                <>
                                                    <div className="w-[24px] h-[24px] relative">
                                                        <Image
                                                            src="/icons/link.svg"
                                                            alt="link"
                                                            fill
                                                            sizes="any"
                                                        />
                                                    </div>
                                                    <div className="font-semibold md:text-[16px]">
                                                        Add Another Link
                                                    </div>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* {!publicKey ? (
                            <button
                                onClick={connect}
                                className="py-4 btn-primary font-vortex text-[18px] flex items-center justify-center gap-[11px]"
                            >
                                <div className="text-[18px] ">
                                    Connect wallet
                                </div>
                                <div className="w-[18px] h-[18px] relative">
                                    <Image
                                        src="/icons/wallet.svg"
                                        alt="wallet"
                                        fill
                                        sizes="any"
                                    />
                                </div>
                            </button>
                        ) : (
                            <button
                                className="py-4 btn-primary font-vortex text-[18px] flex items-center justify-center gap-[11px]"
                                onClick={handleCreate}
                            >
                                {submitting ? "Creating..." : "Create Token"}
                            </button>
                        )} */}
                            </div>

                            <div className="flex items-center justify-center gap-[9px] mt-[25px]">
                                <button
                                    onClick={handleUpdate}
                                    className="border border-#[0038FF] rounded-md bg-[#0038FF] min-w-[84px] py-[11px]"
                                >
                                    {submitting ? "Submitting" : "Save"}
                                </button>
                                <button
                                    onClick={closeModal}
                                    className="border border-#[334155] rounded-md min-w-[84px] py-[11px]"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </Modal>
                </>
            )}

            {showTracking && (
                <Link href={`/token/${token.token}`}>
                    <h1 className="z-[1] cursor-pointer absolute right-[16px] top-[16px] box-shadow-stats px-6 py-4 rounded-md btn-primary">
                        Tracking
                    </h1>
                </Link>
            )}

            <div className="flex flex-col items-stretch">
                <div className="border-[1.5px] border-[#fff] rounded-t-xl overflow-hidden w-full h-[180px] relative">
                    <Image src={token.banner} alt="banner" fill sizes="any" />

                    <div
                        onClick={openModal}
                        className={clsx(
                            "cursor-pointer absolute right-[16px] top-[16px] box-shadow-stats flex items-center gap-[10px] px-4 py-2 rounded-md bg-[#000]",
                            {
                                hidden: isOpenModal || !showSetting,
                            }
                        )}
                    >
                        <h1 className="text-[20px]">EDIT</h1>
                        <div className="h-[24px] w-[24px] relative">
                            <Image
                                src="/icons/settings.svg"
                                alt="edit"
                                fill
                                sizes="any"
                            />
                        </div>
                    </div>
                </div>

                <Link href={`/token/${token.token}`}>
                    <div className="flex-1 -translate-y-10 flex flex-col items-stretch p-6 gap-8 border-[1.5px] border-[#fff] rounded-xl bg-[#000]">
                        <div className="flex justify-between">
                            <div className="flex gap-[13px]">
                                <div className="border border-[#334155] rounded-[10px] overflow-hidden w-[95px] h-[95px] relative">
                                    <Image
                                        src={token.icon}
                                        alt="icon"
                                        fill
                                        sizes="any"
                                    />
                                </div>

                                <div className="pt-0.5 flex flex-col justify-between">
                                    <h1 className="text-[40px] text-ellipsis md:max-w-[140px] 2xl:max-w-[250px] overflow-hidden">
                                        {token.symbol}
                                    </h1>

                                    <div className="flex gap-[5px] items-center">
                                        {links?.website && (
                                            <Link
                                                href={links.website}
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
                                        {links?.telegram && (
                                            <Link
                                                href={links.telegram}
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
                                        {links?.twitter && (
                                            <Link
                                                href={links.twitter}
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
                                        {links?.discord && (
                                            <Link
                                                href={links.discord}
                                                target="_blank"
                                            >
                                                <div className="overflow-hidden border border-[#334155] rounded-[5px] py-2 px-3">
                                                    <div className="w-[24px] h-[24px] relative">
                                                        <Image
                                                            src="/icons/discord.svg"
                                                            alt="discord"
                                                            fill
                                                            sizes="any"
                                                        />
                                                    </div>
                                                </div>
                                            </Link>
                                        )}

                                        {links?.link1 && (
                                            <Link
                                                href={links.link1}
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
                                        {links?.link2 && (
                                            <Link
                                                href={links.link2}
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

                            <div className="hidden md:block text-right">
                                <h1 className="md:text-[15px] 2xl:text-[20px] text-[#19FB9B]">
                                    Created
                                </h1>
                                <h1 className="md:text-[20px] 2xl:text-[25px] pt-[16px]">
                                    {timeDiff(token.timestamp)}
                                </h1>
                            </div>
                        </div>

                        <p className="text-[#94A3B8] line-clamp-3 min-h-[63px]">
                            {token.desc}
                        </p>

                        <div className="md:hidden text-left px-[8px]">
                            <h1 className="md:text-[15px] 2xl:text-[20px] text-[#19FB9B]">
                                Created
                            </h1>
                            <h1 className="md:text-[20px] 2xl:text-[25px] pt-[16px]">
                                {timeDiff(token.timestamp)}
                            </h1>
                        </div>

                        <div className="pt-[18px] px-[18px] pb-[41px] bg-[#2d2d2d2e] rounded-[15px]">
                            <div className="font-vortex grid grid-cols-3 gap-[18px] mb-[29px]">
                                <div className="flex flex-col gap-4">
                                    <div className="md:text-[15px] 2xl:text-[20px] text-[#666666]">
                                        Volume
                                    </div>
                                    <h1 className="md:text-[20px] 2xl:text-[25px]">
                                        $
                                        {token.volume > 0
                                            ? numberFormatter(
                                                  calcLiquidity(token.volume),
                                                  2
                                              )
                                            : 0}
                                    </h1>
                                </div>
                                <div className="flex flex-col gap-4 text-center">
                                    <div className="md:text-[15px] 2xl:text-[20px] text-[#666666]">
                                        Marketcap
                                    </div>
                                    <h1 className="md:text-[20px] 2xl:text-[25px]">
                                        $
                                        {token.parsedReserve > 0
                                            ? numberFormatter(
                                                  calcMarketCap(
                                                      token.lastPrice
                                                  ),
                                                  2
                                              )
                                            : 0}
                                    </h1>
                                </div>
                                <div className="flex flex-col gap-4 text-right">
                                    <div className="md:text-[15px] 2xl:text-[20px] text-[#666666]">
                                        LP
                                    </div>
                                    <h1 className="md:text-[20px] 2xl:text-[25px]">
                                        $
                                        {numberFormatter(
                                            calcLiquidity(token.parsedReserve),
                                            2
                                        )}
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
                </Link>
            </div>
        </div>
    );
}
