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
    id: "TXN-8293a",
    type: "Withdrawal",
    description: "BTC withdrawal",
    amount: -25854.01,
    status: "Completed",
    date: "Oct 31, 2025",
  },
  {
    id: "TXN-82938",
    type: "Deposit",
    description: "USD wallet deposit",
    amount: 1247,
    status: "Completed",
    date: "Aug 28, 2026",
  },
  {
    id: "TXN-82937",
    type: "Deposit",
    description: "USD wallet deposit",
    amount: 2912,
    status: "Completed",
    date: "Aug 21, 2026",
  },
  {
    id: "TXN-82936",
    type: "Deposit",
    description: "USD wallet deposit",
    amount: 325,
    status: "Completed",
    date: "Jul 18, 2026",
  },
  {
    id: "TXN-82935",
    type: "Deposit",
    description: "USD wallet deposit",
    amount: 1228,
    status: "Completed",
    date: "Jul 16, 2026",
  },
  {
    id: "TXN-82934",
    type: "Deposit",
    description: "USD wallet deposit",
    amount: 1414,
    status: "Completed",
    date: "Jun 18, 2026",
  },
  {
    id: "TXN-82933",
    type: "Deposit",
    description: "USD wallet deposit",
    amount: 1720,
    status: "Completed",
    date: "Jun 1, 2026",
  },
  {
    id: "TXN-82932",
    type: "Deposit",
    description: "USD wallet deposit",
    amount: 3300,
    status: "Completed",
    date: "May 22, 2026",
  },
  {
    id: "TXN-82921",
    type: "Investment",
    description: "Digital Assest Plan",
    amount: -104840,
    status: "Completed",
    date: "Jun 7, 2024",
  },
  //   {
  //     id: "TXN-82930",
  //     type: "Trade",
  //     description: "BTC/USD purchase",
  //     amount: -5000,
  //     status: "Completed",
  //     date: "Aug 30, 2026",
  //   },

  {
    id: "TXN-82930",
    type: "Deposit",
    description: "Annual Bonus",
    amount: 21680.0,
    status: "Completed",
    date: "Jun 2, 2025",
  },
  {
    id: "TXN-82929",
    type: "Deposit",
    description: "BNB investment funding",
    amount: 104840,
    status: "Completed",
    date: "Jun 2, 2024",
  },
  {
    id: "TXN-82928",
    type: "Investment",
    description: "BNB Growth Plan",
    amount: -26210,
    status: "Completed",
    date: "May 31, 2023",
  },
  {
    id: "TXN-82927",
    type: "Deposit",
    description: "USD wallet deposit",
    amount: 26210,
    status: "Completed",
    date: "May 24, 2023",
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
    name: "BNB Growth Plan",
    invested: 26210,
    currentValue: 104840,
    return: 78630,
    progress: 100,
    maturity: "365 days",
    status: "Completed",
  },
  {
    name: "BNB Premium Plan",
    invested: 75000,
    currentValue: 81650,
    return: 6650,
    progress: 67,
    maturity: "78 days",
    status: "Active",
  },
  {
    name: "Digital Assets Plan",
    invested: 115000,
    currentValue: 125370,
    return: 10370,
    progress: 91,
    maturity: "18 days",
    status: "Active",
  },
];
