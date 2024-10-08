import styles from "./index.module.css";
import { useEffect, useRef } from "react";
import {
    ChartingLibraryWidgetOptions,
    LanguageCode,
    ResolutionString,
    widget,
} from "../../../public/static/charting_library";

export const TVChartContainer = (
    props: Partial<ChartingLibraryWidgetOptions>
) => {
    const chartContainerRef =
        useRef<HTMLDivElement>() as React.MutableRefObject<HTMLInputElement>;

    useEffect(() => {
        const widgetOptions: ChartingLibraryWidgetOptions = {
            symbol: props.symbol,
            // BEWARE: no trailing slash is expected in feed URL
            datafeed: new (window as any).Datafeeds.UDFCompatibleDatafeed(
                `${process.env.NEXT_PUBLIC_API}/chart`,
                // "https://demo-feed-data.tradingview.com",
                undefined,
                {
                    maxResponseLength: 1000,
                    expectedOrder: "latestFirst",
                }
            ),
            interval: props.interval as ResolutionString,
            container: chartContainerRef.current,
            library_path: props.library_path,
            locale: props.locale as LanguageCode,
            disabled_features: [
                "use_localstorage_for_settings",
                // "header_resolutions",
                "header_symbol_search",
                "header_compare",
                "left_toolbar",
                "header_screenshot",
                "header_undo_redo",
                "header_quick_search",
            ],
            enabled_features: [],
            charts_storage_url: props.charts_storage_url,
            charts_storage_api_version: props.charts_storage_api_version,
            client_id: props.client_id,
            user_id: props.user_id,
            fullscreen: props.fullscreen,
            autosize: props.autosize,
            timezone: "Asia/Bangkok",
            debug: true,
            theme: "dark",
            custom_formatters: {
                priceFormatterFactory: (symbolInfo: any, minTick: any) => {
                    if (symbolInfo === null) {
                        return null;
                    }

                    return {
                        format: (price: any, signPositive: any) => {
                            if (price >= 1000000000) {
                                return `${(price / 1000000000).toFixed(3)}B`;
                            }

                            if (price >= 1000000) {
                                return `${(price / 1000000).toFixed(3)}M`;
                            }

                            if (price >= 1000) {
                                return `${(price / 1000).toFixed(3)}K`;
                            }

                            if (price < 0.000001) {
                                return price.toFixed(10);
                            }

                            return price.toFixed(7);
                        },
                        // };
                    };
                    return null; // The default formatter will be used.
                },
            },
        };

        const tvWidget = new widget(widgetOptions);

        tvWidget.onChartReady(() => {
            tvWidget.headerReady().then(() => {
                const button = tvWidget.createButton();
                button.setAttribute(
                    "title",
                    "Click to show a notification popup"
                );
                button.classList.add("apply-common-tooltip");
                button.addEventListener("click", () =>
                    tvWidget.showNoticeDialog({
                        title: "Notification",
                        body: "TradingView Charting Library API works correctly",
                        callback: () => {
                            console.log("Noticed!");
                        },
                    })
                );
                button.innerHTML = "Check API";
            });
        });

        return () => {
            tvWidget.remove();
        };
    }, [props]);

    return (
        <>
            <div ref={chartContainerRef} className={styles.TVChartContainer} />
        </>
    );
};
