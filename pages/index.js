import Link from "next/link";
export default function Home({ id = 100 }) {
  return (
    <>
      <h1>home</h1>
      {/* replace 会替换url，不能回退了 */}
      <h2>
        <Link href="/about" replace>
          go to aboutPage
        </Link>
      </h2>
      <h2>
        <Link href={`/book/${id}`}>go to bookPage id {id}</Link>
      </h2>
    </>
  );
}
