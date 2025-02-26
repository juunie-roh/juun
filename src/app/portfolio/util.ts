import fs from 'fs';
import path from 'path';

interface PostMetadata {
  title: string;
  description?: string;
  date?: string;
  tags?: string[];
  image?: string;
}

export interface Post {
  metadata: PostMetadata;
  slug: string;
}

// Function to extract metadata from file contents (simplifying to avoid JSON parse errors)
function extractMetadataFromFile(filePath: string): PostMetadata {
  try {
    const content = fs.readFileSync(filePath, 'utf8');

    // Default metadata with filename-based title as fallback
    const fileName = path.basename(filePath, path.extname(filePath));
    const defaultTitle = fileName
      .split('-')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');

    let metadata: PostMetadata = { title: defaultTitle };

    // Look for title in the file content
    const titleMatch = content.match(/title:\s*['"](.+?)['"]/);
    if (titleMatch && titleMatch[1]) {
      metadata.title = titleMatch[1];
    }

    // Look for description
    const descriptionMatch = content.match(/description:\s*['"](.+?)['"]/);
    if (descriptionMatch && descriptionMatch[1]) {
      metadata.description = descriptionMatch[1];
    }

    // Look for date
    const dateMatch = content.match(/date:\s*['"](.+?)['"]/);
    if (dateMatch && dateMatch[1]) {
      metadata.date = dateMatch[1];
    }

    // Look for image
    const imageMatch = content.match(/image:\s*['"](.+?)['"]/);
    if (imageMatch && imageMatch[1]) {
      metadata.image = imageMatch[1];
    }

    // Look for tags - this is more complex as it's an array
    const tagsMatch = content.match(/tags:\s*\[(.*?)\]/);
    if (tagsMatch && tagsMatch[1]) {
      const tagsString = tagsMatch[1];
      const tags = tagsString
        .split(',')
        .map((tag) => {
          // Extract just the text between quotes
          const match = tag.match(/['"](.+?)['"]/);
          return match ? match[1]?.trim() : null;
        })
        .filter(Boolean) as string[];

      if (tags.length > 0) {
        metadata.tags = tags;
      }
    }

    return metadata;
  } catch (e) {
    console.warn(`Error reading file ${filePath}:`, e);
    return {
      title: path.basename(filePath, path.extname(filePath)),
    };
  }
}

export function getPosts(): Post[] {
  try {
    const dir = path.join(process.cwd(), 'src', 'app', 'portfolio', 'posts');
    if (!fs.existsSync(dir)) {
      console.warn(`Directory not found: ${dir}`);
      return [];
    }

    const files = fs
      .readdirSync(dir)
      .filter((file) => path.extname(file) === '.tsx');

    return files.map((file) => {
      const filePath = path.join(dir, file);
      const metadata = extractMetadataFromFile(filePath);

      return {
        metadata,
        slug: path.basename(file, path.extname(file)),
      };
    });
  } catch (error: any) {
    console.error(`Error reading posts: ${error.message}`);
    return [];
  }
}
