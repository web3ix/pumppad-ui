export const fetcher = (url: string) => fetch(url).then((res) => res.json());

export const sliceString = (addr: string, start: number = 4, end: number = 3) =>
    `${addr.slice(0, start)}...${addr.slice(-end)}`;

export const TOTAL_SUPPLY = 1000000000;

export const calcMarketCap = (price: string | number): number =>
    +price * TOTAL_SUPPLY;

export const calcProgress = (price: string | number, round = 2): string => {
    return parseFloat((calcMarketCap(price) / 240).toString()).toFixed(round);
};

export const getExplorer = (signature: string, isDev: boolean = true) =>
    `https://explorer.solana.com/tx/${signature}${
        isDev ? "?cluster=devnet" : ""
    }`;

export const timeDiff = (timestamp: number) => {
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

    var days = Math.floor(milisec_diff / 1000 / 60 / (60 * 24));

    if (days > 0) return days + "D";

    var date_diff = new Date(milisec_diff);

    return `${date_diff.getHours()}H ${date_diff.getMinutes()}M ${date_diff.getSeconds()}S`;
};
