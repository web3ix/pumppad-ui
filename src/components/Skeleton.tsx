"use client";
import clsx from "clsx";

export default function Skeleton({ h = "100px" }: { h?: string }) {
    return (
        <div className="animate-pulse">
            <div
                className="bg-slate-700 w-full rounded-xl"
                style={{
                    height: h,
                }}
            ></div>
        </div>
    );
}
