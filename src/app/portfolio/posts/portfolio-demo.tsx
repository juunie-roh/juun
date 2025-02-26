import Image from 'next/image';

import { Badge } from '@/components/ui/badge';

export const metadata = {
  title: 'Portfolio Demo',
  description: 'A demo page for portfolio demonstration.',
  date: 'January 2024',
  tags: ['Next.js', 'Tailwind CSS', 'E-commerce'],
  image: undefined,
};

export default function ProjectPage() {
  return (
    <article className="mx-auto max-w-3xl">
      <div className="mb-8">
        <h1 className="mb-4 text-3xl font-bold tracking-tighter">
          {metadata.title}
        </h1>
        <p className="text-lg">{metadata.description}</p>

        <div className="mt-4 flex flex-wrap gap-2">
          {metadata.tags &&
            metadata.tags.map((tag) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
        </div>
      </div>

      {metadata.image && (
        <div className="mb-8 overflow-hidden rounded-lg">
          <Image
            src={metadata.image}
            alt={metadata.title}
            className="w-full dark:invert"
            width={1000}
            height={1000}
          />
        </div>
      )}

      <div className="prose max-w-none text-primary">
        <h2 className="text-primary">Project Overview</h2>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure illo
          dolor molestiae atque repellendus doloremque. Aspernatur facilis rem
          mollitia sunt necessitatibus perspiciatis cupiditate autem id,
          repudiandae et aut ab saepe.
        </p>

        <h2 className="text-primary">Challenge</h2>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum ab
          natus sequi, illo iure harum reprehenderit unde, voluptatibus, quod
          iusto sed aperiam! Error soluta veritatis porro vel maiores, corrupti
          aperiam?
        </p>

        <h2 className="text-primary">Solution</h2>
        <p>
          I implemented a complete redesign using Next.js and Tailwind CSS,
          focusing on:
        </p>
        <ul>
          <li>Simplified navigation structure</li>
          <li>Optimized product pages with clear call-to-actions</li>
          <li>Streamlined checkout process reduced to 3 steps</li>
          <li>
            Improved performance with static generation and image optimization
          </li>
          <li>Responsive design that works on all device sizes</li>
        </ul>

        <h2 className="text-primary">Results</h2>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint aliquid
          excepturi velit placeat et quia nam modi voluptatibus, sed nobis
          beatae rem debitis ullam odio veniam adipisci iste laborum. Dicta.
        </p>
      </div>
    </article>
  );
}
