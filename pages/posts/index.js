import Link from "next/link";
export default function Posts({ posts }) {
  return (
    <div>
      <h1>Posts</h1>
      <ul>
        {posts.map((post) => (
          <>
            <Link href={`posts/${post.id}`}>
              <li key={post.id}>{post.title}</li>
            </Link>
          </>
        ))}
      </ul>
    </div>
  );
}
export async function getStaticProps() {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  const posts = await res.json();
  return {
    props: {
      posts: posts.slice(0, 10),
    },
  };
}
