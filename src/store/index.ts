import { Socket } from "socket.io-client";
import { create } from "zustand";

export interface ITrade {
    id: string;
    signature: string;
    doer: string;
    isBuy: Boolean;
    amount: string;
    reserveAmount: string;
    parseAmount: number;
    parseReserveAmount: number;
    timestamp: number;
    token?: IToken;
}

export interface IToken {
    id: string;
    token: string;
    stepId: number;
    creator: string;
    name: string;
    symbol: string;
    uri: string;
    icon: string;
    banner: string;
    desc: string;
    supplied: string;
    reserve: string;
    parsedSupplied: number;
    parsedReserve: number;
    link?: any;
    lastPrice: number;
    timestamp: number;
    trades: ITrade[];
}

export interface ITokenMetadata {
    name: string;
    symbol: string;
    image: string;
    description: string;
}

interface AppState {
    socket: Socket | undefined;
    setSocket: (socket: Socket) => void;
}

export const useAppStore = create<AppState>()((set) => ({
    socket: undefined,
    setSocket: (socket) => set(() => ({ socket: socket })),
}));
