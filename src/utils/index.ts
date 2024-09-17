export const fetcher = (url: string) => fetch(url).then((res) => res.json());

export const sliceString = (
    addr: string,
    start: number = 4,
    end: number = 3
) => (addr ? `${addr.slice(0, start)}...${addr.slice(-end)}` : "");

export const TOTAL_SUPPLY = 1000000000;

export const INIT_PRICE = 0.000000013;

const TARGET_RESERVE = 79.395;

export const parseLastPrice = (price: string | number) =>
    +parseFloat(price.toString()).toFixed(9);

export const calcPriceChange = (price: string | number) =>
    +parseFloat(
        (((+price - INIT_PRICE) * 100) / INIT_PRICE).toString()
    ).toFixed(2);

export const calcMarketCap = (price: string | number): number =>
    +parseFloat((+price * TOTAL_SUPPLY).toString()).toFixed(2);

export const calcProgress = (reserve: string | number, round = 2) =>
    +parseFloat(((+reserve * 100) / TARGET_RESERVE).toString()).toFixed(round);

export const calcLiquidity = (parsedReserve: number, round = 2) =>
    +parseFloat((+parsedReserve * SOL_PRICE).toString()).toFixed(round);

export const getTokenUrl = (token: string) =>
    `https://explorer.solana.com/address/${token}${
        process.env.NEXT_PUBLIC_IS_DEVNET ? "?cluster=devnet" : ""
    }`;

export const getSignatureUrl = (signature: string) =>
    `https://explorer.solana.com/tx/${signature}${
        process.env.NEXT_PUBLIC_IS_DEVNET ? "?cluster=devnet" : ""
    }`;

export const timeDiff = (timestamp: number) => {
    console.log(timestamp);

    let datetime = new Date(timestamp * 1000).getTime();
    let now = new Date().getTime();

    if (isNaN(datetime)) {
        return "";
    }

    console.log(datetime + " " + now);

    let milisec_diff = datetime - now;
    if (datetime < now) {
        milisec_diff = now - datetime;
    }

    let msec = milisec_diff;
    var days = Math.floor(milisec_diff / 1000 / 60 / 60 / 24);
    msec -= days * 1000 * 60 * 60 * 24;
    let hh = Math.floor(msec / 1000 / 60 / 60);
    msec -= hh * 1000 * 60 * 60;
    let mm = Math.floor(msec / 1000 / 60);
    msec -= mm * 1000 * 60;
    let ss = Math.floor(msec / 1000);
    msec -= ss * 1000;

    if (days > 0) return days + "D";

    return `${hh > 0 ? `${hh} H` : ""} ${mm}M`;
};

export const SOL_PRICE = 132;
