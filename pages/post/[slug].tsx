import {
  GetStaticPathsResult,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from 'next';
import Link from 'next/link';
import {query} from '.keystone/api';

export default function PostPage({post}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <div>
      <main style={{margin: "3rem"}}>
        <div>
          <Link href="/">
            <a>&larr; back home</a>
          </Link>
        </div>
        <h1>{post.title}</h1>
        <p>{post.content}</p>
      </main>
    </div>
  );
}

export async function getStaticPaths(): Promise<GetStaticPathsResult> {
  const posts = await query.Post.findMany({
    query: `slug`,
  });

  const paths = posts
    .map((post: { slug: any; }) => post.slug)
    .filter((slug: any): slug is string => !!slug)
    .map((slug: any) => `/post/${slug}`);

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({params}: GetStaticPropsContext) {
  const post = await query.Post.findOne({
    where: {slug: params!.slug as string},
    query: 'id title content',
  });
  return {props: {post}};
}