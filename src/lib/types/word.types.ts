export type Word = {
  id: string;
  word: string;
  description: string;
  category: string;
  video: string;
};

export enum WordCategory {
  Education = "education",
  Law = "law",
  Psychology = "psychology",
}
