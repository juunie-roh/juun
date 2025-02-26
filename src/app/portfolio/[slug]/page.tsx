import fs from 'fs';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import path from 'path';

// Define types for params
interface PageProps {
  params: {
    slug: string;
  };
}

// Function to get all valid slugs for static generation
export async function generateStaticParams() {
  try {
    const postsDirectory = path.join(
      process.cwd(),
      'src',
      'app',
      'portfolio',
      'posts',
    );

    if (!fs.existsSync(postsDirectory)) {
      return [];
    }

    const files = fs
      .readdirSync(postsDirectory)
      .filter((file) => path.extname(file) === '.tsx');

    return files.map((file) => ({
      slug: path.basename(file, path.extname(file)),
    }));
  } catch (error) {
    console.error('Error generating static params:', error);
    return [];
  }
}

// This is a server component, so we can use async/await directly
export default async function PortfolioItemPage({ params }: PageProps) {
  const { slug } = await params;
  // Check if we have a valid slug
  if (!slug) {
    notFound();
  }

  // Get the file path
  const postsDirectory = path.join(
    process.cwd(),
    'src',
    'app',
    'portfolio',
    'posts',
  );
  const filePath = path.join(postsDirectory, `${slug}.tsx`);

  // Check if the file exists
  if (!fs.existsSync(filePath)) {
    notFound();
  }

  // Try to import the component (this needs to be in a Server Component)
  let PostComponent;
  try {
    const postModule = await import(`../posts/${slug}.tsx`);
    PostComponent = postModule.default;
  } catch (error) {
    console.error(`Error loading post with slug: ${slug}`, error);
    notFound();
  }

  if (!PostComponent) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-8">
        <Link
          href="/portfolio"
          className="inline-flex items-center text-sm hover:text-blue-600"
        >
          <ArrowLeft className="mr-2 size-4" />
          Back to Portfolio
        </Link>
      </div>

      {/* Render the post component */}
      <PostComponent />
    </div>
  );
}
