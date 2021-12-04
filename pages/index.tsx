import {InferGetStaticPropsType} from 'next';
import {Header} from '../src/Components/Header'
// Import the generated Lists API from Keystone
import {query} from '.keystone/api';
import {Key, ReactChild, ReactFragment, ReactPortal} from 'react';
import {Summary} from "../src/Components/Summary";
import {DocumentRenderer} from '@keystone-6/document-renderer';
import Link from 'next/link';
// Home receives a `posts` prop from `getStaticProps` below
export default function Home({posts, content, sections}: InferGetStaticPropsType<typeof getStaticProps>) {

  console.log(sections);

  return (
    <div>
      <Header/>
      <Summary content={content}/>

      {
        // @ts-ignore
        sections && sections.map((item, index) => (
          <DocumentRenderer key={index} document={item.content.document}/>
        ))
      }

      {/*<p>{sections[0].content.document}</p>*/}
      <ul>
        {/* Render each post with a link to the content page */}
        {posts.map((post: { id: Key | null | undefined; slug: any; title: boolean | ReactChild | ReactFragment | ReactPortal | null | undefined; }) => (
          <li key={post.id}>
            <Link href={`/post/${post.slug}`}>
              <a>{post.title}</a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

// Here we use the Lists API to load all the posts we want to display
// The return of this function is provided to the `Home` component
export async function getStaticProps() {
  const posts = await query.Post.findMany({query: 'id title slug'});
  const content = await query.Summary.findMany({query: 'id title content'});
  const sections = await query.Section.findMany({query: 'type header subHeader content{ document}'});

  return {props: {posts, content, sections}};
}