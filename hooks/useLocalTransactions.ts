"use client";

import { useCallback, useEffect, useState } from "react";
import type { Transaction } from "@/libs/bnb/demo-data";
import {
  getLocalTransactions,
  saveLocalTransaction,
} from "@/libs/bnb/transactions/local-transactions";

export function useLocalTransactions() {
  const [localTransactions, setLocalTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    setLocalTransactions(getLocalTransactions());
  }, []);

  const addTransaction = useCallback((transaction: Transaction) => {
    saveLocalTransaction(transaction);

    setLocalTransactions((current) => [
      transaction,
      ...current.filter((item) => item.id !== transaction.id),
    ]);
  }, []);

  return {
    localTransactions,
    addTransaction,
  };
}
