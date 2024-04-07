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
  const { params } = context;
  const res = await fetch(
    `http://localhost:4000/news?category=${params.category}` //json-server支持参数查找的
  );
  const data = await res.json();
  return {
    props: {
      articles: data,
      category: params.category,
    },
  };
}
