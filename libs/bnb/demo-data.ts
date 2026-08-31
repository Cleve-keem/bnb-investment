export type MarketAsset = {
  symbol: string;
  name: string;
  price: number;
  change: number;
  volume: string;
  icon: string;
};

export type Transaction = {
  id: string;
  type: "Deposit" | "Withdrawal" | "Trade" | "Investment";
  description: string;
  amount: number;
  status: "Completed" | "Pending" | "Failed";
  date: string;
};

export const portfolioData = [
  { date: "Aug 01", value: 258000 },
  { date: "Aug 04", value: 263000 },
  { date: "Aug 07", value: 267500 },
  { date: "Aug 10", value: 272000 },
  { date: "Aug 13", value: 268000 },
  { date: "Aug 16", value: 279000 },
  { date: "Aug 19", value: 286000 },
  { date: "Aug 22", value: 291000 },
  { date: "Aug 25", value: 296500 },
  { date: "Aug 28", value: 298000 },
  { date: "Aug 31", value: 300000 },
];

export const marketAssets: MarketAsset[] = [
  {
    symbol: "BTC",
    name: "Bitcoin",
    price: 108420.32,
    change: 8.21,
    volume: "$42.1B",
    icon: "₿",
  },
  {
    symbol: "ETH",
    name: "Ethereum",
    price: 4210.84,
    change: 5.42,
    volume: "$21.4B",
    icon: "Ξ",
  },
  {
    symbol: "BNB",
    name: "BNB",
    price: 840.21,
    change: 4.92,
    volume: "$4.8B",
    icon: "B",
  },
  {
    symbol: "SOL",
    name: "Solana",
    price: 198.42,
    change: 9.32,
    volume: "$8.2B",
    icon: "S",
  },
  {
    symbol: "XRP",
    name: "XRP",
    price: 2.91,
    change: -2.14,
    volume: "$3.1B",
    icon: "X",
  },
  {
    symbol: "ADA",
    name: "Cardano",
    price: 0.92,
    change: 3.74,
    volume: "$1.8B",
    icon: "A",
  },
  {
    symbol: "DOGE",
    name: "Dogecoin",
    price: 0.24,
    change: -1.28,
    volume: "$2.4B",
    icon: "D",
  },
  {
    symbol: "AVAX",
    name: "Avalanche",
    price: 42.81,
    change: 6.14,
    volume: "$1.3B",
    icon: "A",
  },
];

export const holdings = [
  {
    symbol: "BTC",
    name: "Bitcoin",
    amount: "1.1612 BTC",
    value: 126000,
    allocation: 42,
    change: 8.21,
  },
  {
    symbol: "ETH",
    name: "Ethereum",
    amount: "17.81 ETH",
    value: 75000,
    allocation: 25,
    change: 5.42,
  },
  {
    symbol: "BNB",
    name: "BNB",
    amount: "64.28 BNB",
    value: 54000,
    allocation: 18,
    change: 4.92,
  },
  {
    symbol: "SOL",
    name: "Solana",
    amount: "151.2 SOL",
    value: 30000,
    allocation: 10,
    change: 9.32,
  },
  {
    symbol: "USDT",
    name: "Tether",
    amount: "15000 USDT",
    value: 15000,
    allocation: 5,
    change: 0.02,
  },
];

export const transactions: Transaction[] = [
  {
    id: "TXN-82931",
    type: "Deposit",
    description: "USD wallet deposit",
    amount: 20000,
    status: "Completed",
    date: "Aug 31, 2026",
  },
  {
    id: "TXN-82930",
    type: "Trade",
    description: "BTC/USD purchase",
    amount: -5000,
    status: "Completed",
    date: "Aug 30, 2026",
  },
  {
    id: "TXN-82929",
    type: "Withdrawal",
    description: "BTC withdrawal",
    amount: -2000,
    status: "Pending",
    date: "Aug 29, 2026",
  },
  {
    id: "TXN-82928",
    type: "Investment",
    description: "Bitcoin Growth Plan",
    amount: -10000,
    status: "Completed",
    date: "Aug 27, 2026",
  },
];

export const aiSignals = [
  {
    symbol: "BTC/USD",
    signal: "BUY",
    confidence: 87,
    trend: "Bullish",
    momentum: "Strong",
  },
  {
    symbol: "ETH/USD",
    signal: "BUY",
    confidence: 76,
    trend: "Bullish",
    momentum: "Moderate",
  },
  {
    symbol: "BNB/USD",
    signal: "HOLD",
    confidence: 62,
    trend: "Neutral",
    momentum: "Moderate",
  },
  {
    symbol: "XRP/USD",
    signal: "SELL",
    confidence: 71,
    trend: "Bearish",
    momentum: "Weak",
  },
];

export const investments = [
  {
    name: "Bitcoin Growth Plan",
    invested: 50000,
    currentValue: 54820,
    return: 4820,
    progress: 82,
    maturity: "42 days",
  },
  {
    name: "BNB Premium Plan",
    invested: 75000,
    currentValue: 81650,
    return: 6650,
    progress: 67,
    maturity: "78 days",
  },
  {
    name: "Digital Assets Plan",
    invested: 115000,
    currentValue: 125370,
    return: 10370,
    progress: 91,
    maturity: "18 days",
  },
];
