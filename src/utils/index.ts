export const fetcher = (url: string) => fetch(url).then((res) => res.json());

export const sliceString = (
    addr: string,
    start: number = 4,
    end: number = 3
) => (addr ? `${addr.slice(0, start)}...${addr.slice(-end)}` : "");

export const TOTAL_SUPPLY = 1000000000;

export const TOTAL_SALE = 670000000;

export const INIT_PRICE = 0.000000013;

const TARGET_RESERVE = 79.395;

export const parseLastPrice = (price: string | number) =>
    +parseFloat(price.toString()).toFixed(9);

export const calcPriceChange = (price: string | number) =>
    +parseFloat(
        (((+price - INIT_PRICE) * 100) / INIT_PRICE).toString()
    ).toFixed(2);

export const calcMarketCap = (price: string | number): number =>
    +parseFloat((+price * TOTAL_SUPPLY * SOL_PRICE).toString()).toFixed(2);

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
    let datetime = new Date(timestamp * 1000).getTime();
    let now = new Date().getTime();

    if (isNaN(datetime)) {
        return "";
    }

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

export const formatSmartNumber = (num: number | string): string => {
    if (typeof num === "string") {
        num = Number(num);
    }

    if (num >= 10) {
        return parseFloat(num.toFixed(1)).toString();
    } else if (num >= 1) {
        return parseFloat(num.toFixed(2)).toString();
    } else {
        let numberDecimalAfterZero = 3;

        // if (Number(num) >= 0.1) {
        // 	numberDecimalAfterZero = 4;
        // }

        const strNumber = num.toFixed(13).toString();
        const arr = strNumber.split(".");
        if (arr.length === 1) {
            return num.toString();
        }
        const decimal = arr[1];
        //find first non-zero number
        let index = 0;
        while (index < decimal.length && decimal[index] === "0") {
            index++;
        }
        if (index === decimal.length) {
            return parseFloat(num.toString()).toString();
        }

        let threeDecimal = decimal.slice(index, index + numberDecimalAfterZero);

        threeDecimal = Number(threeDecimal.split("").reverse().join(""))
            .toString()
            .split("")
            .reverse()
            .join("");

        return `${arr[0]}.${decimal.slice(0, index)}${threeDecimal}`;
    }
};

export function numberWithCommas(x: number | string | undefined) {
    // return !x
    // 	? "0"
    // 	: formatSmartNumber(x)
    // 			.toString()
    // 			.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")
    // 			.replace(/\.0$/, "");
    return !x
        ? "0"
        : new Intl.NumberFormat("en-US", {
              maximumSignificantDigits: 9,
          }).format(
              +formatSmartNumber(parseFloat(x.toString()).toFixed(7)).toString()
          );
}

export function numberFormatter(num: number | string, digits: number) {
    const lookup = [
        { value: 1, symbol: "" },
        { value: 1e3, symbol: "k" },
        { value: 1e6, symbol: "M" },
        { value: 1e9, symbol: "G" },
        { value: 1e12, symbol: "T" },
        { value: 1e15, symbol: "P" },
        { value: 1e18, symbol: "E" },
    ];
    const regexp = /\.0+$|(?<=\.[0-9]*[1-9])0+$/;
    const item = lookup.findLast((item) => +num >= item.value);
    return item
        ? (+num / item.value)
              .toFixed(digits)
              .replace(regexp, "")
              .concat(item.symbol)
        : "0";
}

export const DEFAULT_LIMIT = 6;

export enum EGetTokenSortBy {
    TRENDING = "trending",
    TOP = "top",
    RAISING = "raising",
    NEW = "new",
    FINISHED = "finished",
}

export enum EGetTokenAge {
    LESS_THAN_1H = "less_than_1h",
    LESS_THAN_6h = "less_than_6",
    LESS_THAN_1D = "less_than_1D",
    LESS_THAN_1W = "less_than_1W",
    ALL = "all",
}
