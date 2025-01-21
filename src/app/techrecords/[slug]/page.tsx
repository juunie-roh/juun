import type Article from '@/components/Article';

type Post = {
  path: string;
  title: string;
  article?: typeof Article;
};

export async function generateStaticParams() {
  const posts: Post[] = [
    { title: 'Typography', path: 'typography' },
    { title: 'Nextgram', path: 'nextgram' },
  ];

  return posts;
}

export default async function Page({ params }: { params: Promise<Post> }) {
  const title = (await params).title;
  return <div>{title}</div>;
}
