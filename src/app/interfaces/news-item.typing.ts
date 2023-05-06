export interface NewsItem {
  by: string;
  descendants: number;
  id: string;
  kids?: string[];
  score: number;
  time: number;
  title: string;
  type: string;
  url: string;
}
