export type Word = {
  id: string;
  word: string;
  description: string;
  category: string;
  video: string;
};

export enum WordCategory {
  Education = "Educación",
  Law = "Jurídico",
  Psychology = "Psicología",
}
