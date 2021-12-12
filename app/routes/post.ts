import path from "path";
import fs from "fs/promises";
import parseFrontMatter from "front-matter";
import invariant from "tiny-invariant";
import { marked } from "marked";

export type Post = {
  slug: string;
  title: string;
};

export type PostMarkdownAttributes = {
  title: string;
};

const postsPath = path.join(__dirname, "..", "posts");

function isValidPostAttributes(
  attributes: any
): attributes is PostMarkdownAttributes {
  return attributes?.title;
}

export async function getPosts(slug: string) {
  const filepath = path.join(postsPath, slug + ".md");
  console.log(slug);

  const file = await fs.readFile(filepath);

  const { attributes, body } = parseFrontMatter(file.toString());

  invariant(
    isValidPostAttributes(attributes),
    `${filepath} has bad meta data!`
  );

  const html = marked(body);

  return {
    slug,
    html,
    title: attributes.title,
  };
}
