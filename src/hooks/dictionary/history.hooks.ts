import { Dispatch, SetStateAction, useEffect, useState } from "react";

export const useHistory = () => {
  const [history, setHistory] = useState<string[]>([]);
  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("history") ?? "[]");
    if (items) {
      setHistory(items);
    }
  }, []);

  return { history, setHistory };
};

export const useHandleHistory = () => handleHistory;

const handleHistory = (
  word: string,
  history: string[],
  setHistory: Dispatch<SetStateAction<string[]>>
) => {
  if (word.trim().length === 0 || history.includes(word)) {
    return;
  }
  const newHistory = handleStorage(history, word);
  setHistory(newHistory);
};

const handleStorage = (history: string[], word: string): string[] => {
  if (history.length >= 10) {
    history.pop();
  }
  const newHistory = [word, ...history];
  localStorage.setItem("history", JSON.stringify(newHistory));
  return newHistory;
};
