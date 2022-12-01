import { db } from "@lib/config/firebase.config";
import { Word } from "@lib/types/word.types";
import {
  collection,
  CollectionReference,
  DocumentData,
  getDocs,
  QuerySnapshot,
} from "firebase/firestore";
import { useEffect, useState } from "react";

export const useGetWords = async (
  wordCollectionReference: CollectionReference
): Promise<Array<Word>> => {
  const data: QuerySnapshot<DocumentData> = await getDocs(
    wordCollectionReference
  );
  const cleanData = data.docs.map((doc) => ({
    id: doc.id,
    word: doc.data().word,
    description: doc.data().description,
    video: doc.data().video,
    category: doc.data().category,
  }));

  return cleanData;
};

export const useWord = () => {
  const [words, setWords] = useState<Array<Word>>([]);
  const wordCollectionReference: CollectionReference = collection(db, "words");
  const handleGetWords = useGetWords;

  useEffect(() => {
    const getWords = async () => {
      const firebaseWords: Array<Word> = await handleGetWords(
        wordCollectionReference
      );
      setWords(firebaseWords);
    };
    getWords();
    // eslint-disable-next-line
  }, []);

  return { words, setWords };
};
