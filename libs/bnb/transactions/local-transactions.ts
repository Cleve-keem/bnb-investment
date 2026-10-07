import { Transaction } from "../demo-data";

const STORAGE_KEY = "bnb-local-transactions";

export function getLocalTransactions(): Transaction[] {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);

    if (!stored) {
      return [];
    }
    const parsed: unknown = JSON.parse(stored);

    if (!Array.isArray(parsed)) {
      return [];
    }
    return parsed as Transaction[];
  } catch {
    return [];
  }
}

export function saveLocalTransaction(transaction: Transaction): void {
  if (typeof window === "undefined") {
    return;
  }

  try {
    const existing = getLocalTransactions();

    const updated = [
      transaction,
      ...existing.filter((item) => item.id !== transaction.id),
    ];

    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch {
    // Ignore localStorage failures.
  }
}

export function removeLocalTransaction(transactionId: string): void {
  if (typeof window === "undefined") {
    return;
  }

  try {
    const existing = getLocalTransactions();

    const updated = existing.filter((item) => item.id !== transactionId);

    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch {
    // Ignore localStorage failures.
  }
}
