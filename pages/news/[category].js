import { useRouter } from "next/router";
export default function ArticleListByCategory({ articles, category }) {
  const router = useRouter();
  return (
    <div>
      <h1>{category}类的文章列表：</h1>
      <ul>
        {articles.map((article) => (
          <>
            <h2 key={article.id}>{article.title}</h2>
            <p>{article.desc}</p>
          </>
        ))}
      </ul>
    </div>
  );
}
export async function getServerSideProps(context) {
  // sk-doc:https://nextjs.org/docs/pages/api-reference/functions/get-server-side-props#context-parameter
  const { params, req, res, query } = context;
  //   console.log(req.headers.cookie);
  console.log(query); //路径上挂了哪些参数
  //   res.setHeader("Set-Cookie", ["name=Catty"]);
  const response = await fetch(
    `http://localhost:4000/news?category=${params.category}` //json-server支持参数查找的
  );
  const data = await response.json();
  return {
    props: {
      articles: data,
      category: params.category,
    },
  };
}
