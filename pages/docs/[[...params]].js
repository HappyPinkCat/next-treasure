import { useRouter } from "next/router";
// 对应http://localhost:3000/docs/开头的所有页面xxx
export default function Docs() {
  const router = useRouter();
  const { params } = router.query;
  return <div>Docs params:{JSON.stringify(params)}</div>;
}
