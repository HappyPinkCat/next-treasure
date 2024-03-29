// http://localhost:3000/book/{id}, id can be any value(网页优先匹配有文件名的文件如tutorial，之后是这边文件)
import { useRouter } from "next/router";
export default function BookDetail() {
  const router = useRouter();
  const { id } = router.query;
  return <div>BookDetail:book id is {id}</div>;
}
