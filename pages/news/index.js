import Link from "next/link";
export default function NewsList({ news }) {
  return (
    <div>
      <h1>NewsList</h1>
      <ul>
        {news.map((item) => (
          <li key={item.id}>
            article {item.id}：{item.title} is type of {item.category}.
          </li>
        ))}
      </ul>
    </div>
  );
}
// 若报错undefined，重启项目获取对应数据
export async function getServerSideProps() {
  const res = await fetch("http://localhost:4000/news");
  const data = await res.json();
  return {
    props: {
      news: data,
    },
  };
}
/*
1.getSevverSideProps只会运行在服务器端，这个函数永远不会运行在客户端
你在getServerSideProps中编写的代码，并不会被包含在被发送到浏览器端的JS bundle中
2.你可以直接在getServerSideProps编写服务器端代码,
如可以在getServerSideProps中使用fs module访问文件系统，或者查询数据库也不用担心在getServerSideProps中使用了API keys，因为它们不会被发送到浏览器端
3.getServerSideProps只能用在页面中，不能用在普通的组件中；它只适用于预渲染，而不是客户端数据获取
4.getServerfideProps会在请求时运行
*/
