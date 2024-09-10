"use client";

import dynamic from "next/dynamic";
import {
    ChartingLibraryWidgetOptions,
    ResolutionString,
} from "../../../public/static/charting_library";

const TVChartContainer = dynamic(
    () =>
        import("@/components/chart/ChartContainer").then(
            (mod) => mod.TVChartContainer
        ),
    { ssr: false }
);

export default function BondChart({ symbol }: { symbol: string }) {
    const defaultWidgetProps: Partial<ChartingLibraryWidgetOptions> = {
        symbol: symbol,
        interval: "5" as ResolutionString,
        library_path: "/static/charting_library/",
        locale: "en",
        // charts_storage_url: "https://saveload.tradingview.com",
        charts_storage_api_version: "1.1",
        client_id: "tradingview.com",
        user_id: "public_user_id",
        fullscreen: false,
        autosize: true,
        debug: false,
    };

    return <TVChartContainer {...defaultWidgetProps} />;
}
