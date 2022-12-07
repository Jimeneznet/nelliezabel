export type Word = {
  id: String;
  word: String;
  description: String;
  category: String;
  video: String;
};

export enum WordCategory {
  Education = "education",
  Law = "law",
  Psychology = "psychology",
}
