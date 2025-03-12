export interface BlogMetadata {
  title: string;
  description?: string;
  date?: string;
  tags?: string[];
  image?: string;
  wordCount?: number; // New property for word count
}
