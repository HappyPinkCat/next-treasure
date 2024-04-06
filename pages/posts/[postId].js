// 动态参数的server-side generation (SSG) 适用于：静态带跳转的博客页面系统
export default function Post({ post }) {
  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.body}</p>
    </div>
  );
}
export async function getStaticProps(context) {
  const { params } = context;
  console.log(params);

  // 取postId是因为报错ssg了（它需要给定路径参数）：getStaticPaths is required for dynamic SSG pages and is missing for '/posts/[postId]'.
  // Read more: https://nextjs.org/docs/messages/invalid-getstaticpaths-value
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${params.postId}`
  );
  const data = await res.json();
  return {
    props: {
      post: data,
    },
  };
}
export async function getStaticPaths() {
  return {
    //  postId:的值与前面拼凑，构成了可以访问的那个页面，没有值那对应的链接的页面404了哦
    paths: [
      //这几条分别对应index.js页面的那几个Link的href;http://localhost:3000/posts点击对应的post item就能访问到这儿
      { params: { postId: "1" } },
      { params: { postId: "2" } },
      { params: { postId: "3" } },
    ], // 必须有path,params这个关键字.给的值是string类型
    fallback: false,
  };
}
