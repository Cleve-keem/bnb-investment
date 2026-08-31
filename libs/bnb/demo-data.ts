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
    price: 78977.10,
    change: 0.55,
    volume: "$30.6B",
    icon: "₿",
  },
  {
    symbol: "ETH",
    name: "Ethereum",
    price: 2478.84,
    change: 0.14,
    volume: "$14.5B",
    icon: "Ξ",
  },
  {
    symbol: "BNB",
    name: "BNB",
    price: 692.21,
    change: 0.53,
    volume: "$680M",
    icon: "B",
  },
  {
    symbol: "SOL",
    name: "Solana",
    price: 198.42,
    change: 0.62,
    volume: "$3.8B",
    icon: "S",
  },
  {
    symbol: "XRP",
    name: "XRP",
    price: 1.35,
    change: -0.58,
    volume: "$2.5B",
    icon: "X",
  },
  {
    symbol: "ADA",
    name: "Cardano",
    price: 0.19,
    change: -0.31,
    volume: "$406M",
    icon: "A",
  },
  {
    symbol: "DOGE",
    name: "Dogecoin",
    price: 0.08,
    change: -1.43,
    volume: "$680M",
    icon: "D",
  },
  {
    symbol: "AVAX",
    name: "Avalanche",
    price: 42.81,
    change: -1.24,
    volume: "$185M",
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
    id: "TXN-82947",
    type: "Deposit",
    description: "USD wallet deposit",
    amount: 1247,
    status: "Completed",
    date: "Aug 28, 2026",
  },
  {
    id: "TXN-82946",
    type: "Deposit",
    description: "USD wallet deposit",
    amount: 2912,
    status: "Completed",
    date: "Aug 21, 2026",
  },
  {
    id: "TXN-82945",
    type: "Withdrawal",
    description: "BNB Verification fee",
    amount: -325,
    status: "Completed",
    date: "Jul 18, 2026",
  },
  {
    id: "TXN-82944",
    type: "Deposit",
    description: "BNB Verification fee",
    amount: 325,
    status: "Completed",
    date: "Jul 18, 2026",
  },
  {
    id: "TXN-82943",
    type: "Withdrawal",
    description: "BNB Investment certification fee",
    amount: -1785,
    status: "Completed",
    date: "Jul 16, 2026",
  },
  {
    id: "TXN-82942",
    type: "Deposit",
    description: "USD wallet deposit",
    amount: 1228,
    status: "Completed",
    date: "Jul 16, 2026",
  },
  {
    id: "TXN-82941",
    type: "Deposit",
    description: "USD wallet deposit",
    amount: 1414,
    status: "Completed",
    date: "Jun 18, 2026",
  },
  {
    id: "TXN-82940",
    type: "Deposit",
    description: "USD wallet deposit",
    amount: 1720,
    status: "Completed",
    date: "Jun 1, 2026",
  },
  {
    id: "TXN-82939",
    type: "Deposit",
    description: "USD wallet deposit",
    amount: 3300,
    status: "Completed",
    date: "May 22, 2026",
  },
  {
    id: "TXN-82938",
    type: "Withdrawal",
    description: "BTC Withdrawal",
    amount: -20892,
    status: "Failed",
    date: "May 15, 2026",
  },
  {
    id: "TXN-82937",
    type: "Deposit",
    description: "Annual Bonus",
    amount: 21680,
    status: "Completed",
    date: "May 14, 2026",
  },
  {
    id: "TXN-82936",
    type: "Deposit",
    description: "BNB DCA investment funding",
    amount: 289108,
    status: "Completed",
    date: "May 14, 2026",
  },
  {
    id: "TXN-82935",
    type: "Investment",
    description: "BNB DCA Plan",
    amount: -196294,
    status: "Completed",
    date: "May 12 2026",
  },
  {
    id: "TXN-82934",
    type: "Withdrawal",
    description: "BTC withdrawal",
    amount: -25854.01,
    status: "Completed",
    date: "Oct 31, 2025",
  },
  {
    id: "TXN-82933",
    type: "Deposit",
    description: "Annual Bonus",
    amount: 18104,
    status: "Completed",
    date: "May 10, 2025",
  },
  {
    id: "TXN-82932",
    type: "Deposit",
    description: "Digital Assets investment funding",
    amount: 158008,
    status: "Completed",
    date: "May 10, 2025",
  },
  {
    id: "TXN-82931",
    type: "Investment",
    description: "Digital Assest Plan",
    amount: -112048,
    status: "Completed",
    date: "May 7, 2024",
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
    amount: 15088.0,
    status: "Completed",
    date: "May 2, 2024",
  },
  {
    id: "TXN-82929",
    type: "Deposit",
    description: "BNB investment funding",
    amount: 96960,
    status: "Completed",
    date: "May 2, 2024",
  },
  {
    id: "TXN-82928",
    type: "Investment",
    description: "BNB Growth Plan",
    amount: -18690,
    status: "Completed",
    date: "Apr 31, 2023",
  },
  {
    id: "TXN-82927",
    type: "Deposit",
    description: "USD wallet deposit",
    amount: 18690,
    status: "Completed",
    date: "Apr 24, 2023",
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
    invested: 18690,
    currentValue: 96960,
    return: 78060,
    progress: 100,
    maturity: "365 days",
    status: "Completed",
  },
  {
    name: "BNB DCA Plan",
    invested: 196294,
    currentValue: 289108,
    return: 92814,
    progress: 100,
    maturity: "365 days",
    status: "Completed",
  },
  {
    name: "Digital Assets Plan",
    invested: 112048,
    currentValue: 158008,
    return: 45960,
    progress: 100,
    maturity: "365 days",
    status: "Completed",
  },
];
