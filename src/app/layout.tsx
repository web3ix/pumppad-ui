import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/layouts/Header";
import Footer from "@/components/layouts/Footer";
import Script from "next/script";
import ProviderWrapper from "@/components/layouts/ProviderWrapper";

export const metadata: Metadata = {
    title: "PumpPad",
    description:
        "Pump Pad is a multichain platform that streamlines token launching with comprehensive support and advanced security for seamless project deployment.",
    icons: {
        icon: `${process.env.NEXT_PUBLIC_APP_URL}/logo.png`,
    },
    openGraph: {
        title: "PumpPad",
        description:
            "Pump Pad is a multichain platform that streamlines token launching with comprehensive support and advanced security for seamless project deployment.",
        type: "website",
        locale: "en_US",
        images: [
            {
                url: `${process.env.NEXT_PUBLIC_APP_URL}/og.png`,
                width: 1200,
                height: 630,
                alt: "Pump Pad is a multichain platform that streamlines token launching with comprehensive support and advanced security for seamless project deployment.",
            },
        ],
        siteName: "PumpPad",
    },
    twitter: {
        card: "summary_large_image",
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <head>
                <Script src="/static/datafeeds/udf/dist/bundle.js"></Script>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link
                    rel="preconnect"
                    href="https://fonts.gstatic.com"
                    crossOrigin=""
                />
                <link
                    href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap"
                    rel="stylesheet"
                />
                <link
                    rel="apple-touch-icon"
                    sizes="180x180"
                    href="/apple-touch-icon.png"
                />
                <link
                    rel="icon"
                    type="image/png"
                    sizes="32x32"
                    href="/favicon-32x32.png"
                />
                <link
                    rel="icon"
                    type="image/png"
                    sizes="16x16"
                    href="/favicon-16x16.png"
                />
                <link rel="manifest" href="/site.webmanifest"></link>
            </head>
            <ProviderWrapper>
                <body className="flex flex-col items-stretch justify-between min-h-dvh">
                    <Header />
                    <div>{children}</div>
                    <Footer />
                </body>
            </ProviderWrapper>
        </html>
    );
}
