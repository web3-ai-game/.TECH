import { getPostData, getSortedPostsData } from "@/lib/tutorials";
import { notFound } from "next/navigation";
import dynamic from "next/dynamic";
import { Suspense } from "react";

export async function generateStaticParams() {
  const posts = getSortedPostsData();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
    const post = await getPostData(params.slug);
    if (!post || !post.frontmatter) {
        return notFound();
    }
    return {
        title: post.frontmatter.title,
        description: post.frontmatter.description,
    };
}

export default async function PostPage({ params }: { params: { slug: string } }) {
  const post = await getPostData(params.slug);
  if (!post || !post.frontmatter) {
    return notFound();
  }

  const { frontmatter } = post;

  // Dynamically import the MDX file. The path is relative to the project root.
  const PostContent = dynamic(() => import(`@/../tutorials/${params.slug}.mdx`));

  return (
    <article className="container max-w-screen-lg py-12">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold tracking-tight">{frontmatter.title}</h1>
        <p className="mt-2 text-lg text-muted-foreground">{frontmatter.description}</p>
        <time dateTime={frontmatter.date} className="mt-2 block text-sm text-muted-foreground">
          Published on {new Date(frontmatter.date).toLocaleDateString()}
        </time>
      </div>
      <div className="prose prose-lg dark:prose-invert mx-auto">
        <Suspense fallback={<div>Loading article...</div>}>
          <PostContent />
        </Suspense>
      </div>
    </article>
  );
}