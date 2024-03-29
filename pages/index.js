import Link from "next/link";
import { useRouter } from "next/router";
export default function Home({ id = 100 }) {
  const router = useRouter();
  const handleClick = () => {
    console.log("下订单");
    router.push("/book/101");
    // router.replace("/book/102"); //会替换当前页面，不能回退了
  };
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
      <br />
      <button onClick={handleClick}>下订单</button>
    </>
  );
}
