import { LoaderFunction, useLoaderData } from "remix";
import invariant from "tiny-invariant";
import { getPosts } from "../post";

export const loader: LoaderFunction = async ({ params }) => {
  invariant(params.slug, "expected params.slug");
  return getPosts(params.slug);
};

export default function PostSlug() {
  const post = useLoaderData();
  return <div dangerouslySetInnerHTML={{ __html: post.html }}></div>;
}
