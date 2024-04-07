// 动态参数的server-side generation (SSG) 适用于：静态带跳转的博客页面系统
import { useRouter } from "next/router";
export default function Post({ post }) {
  // const router = useRouter();
  // if (router.isFallback) {
  //   //fallback为true时设置的后备页面
  //   return <div>Loading...</div>;
  // }

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
  // npm run build便能在终端控制台看到页面的结构了，哪些页面是SSG的，哪些是Stastic的
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${params.postId}`
  );
  const data = await res.json();
  if (!data.id) {
    return {
      notFound: true, //返回404页面
    };
  }
  return {
    props: {
      post: data,
    },
  };
}
//getStaticPaths用于告诉有哪些可能的id，即路径参数
export async function getStaticPaths() {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  const posts = await res.json();
  const paths = posts.map((post) => ({
    params: { postId: `${post.id}` },
  }));
  return {
    //  postId:的值与前面拼凑，构成了可以访问的那个页面，没有值那对应的链接的页面404了哦
    //硬编码 paths: [
    //   //这几条分别对应index.js页面的那几个Link的href;http://localhost:3000/posts点击对应的post item就能访问到这儿
    //   { params: { postId: "1" } },
    //   { params: { postId: "2" } },
    //   { params: { postId: "3" } },
    // ], // 必须有path,params这个关键字.给的值是string类型
    paths: paths,
    fallback: false, //爬虫角度建议设置成true,或'blocking',最后false

    /*要点(falLback = false)：
    1. 从'getstaticPaths'返回的路径，会在构建时通过"getStaticProps”函数渲染为html 
    2. 任何不是从这个'getstatiePaths'返回的路经都会导致返回404页面。
    
    使用场景：
    1. 需要预渲染的路径较少
    2. 不经常添加新页面
    例如，帖子并不多的博客站点
    */

    /*要点(falLback = true)：
    1.从'getstaticPaths'返回的路径，会在构建时通过"getStaticProps”函数渲染为html 
    2.构建时未生成的页面在运行时并不会产生404页面。相反，'Next.js'会在`第一次`请求该路径的时候，
      ①返回页面的后备‘fallback’版本(如自定义的Plan B:loading页面)。
      ②在后台，Next.js会静态生成和请求路径相对应的HTML和JSON。包括运行 getStaticProps。
      ③完成后，浏览器会接收到和路径对应的JSON。它将被用于渲染带有props属性的页面。从用户的角度后备‘fallback’版本会被替换为紧急生成的静态页面。
      ④同时，Next.js会跟踪已渲染的新页面列表。对同一路径的后续请求将直接返回生成的页面，就像其它在构建时渲染的页面一样。（因为该有的html，json文件都有了呢）
      ⑤（如果getStaticPaths只写了几几个页面，但是getStaticProps那个页面加载了好多条数据，并使用<Link>预渲染了很多链接，那么那些链接对听的json文件都会预渲染的）
    
    使用场景：
    如果你的应用程序有大量依赖于数据的静态页面，那么设为true是合适的。
    比方说，对于一个大型电商网站，如果你想要所有的产品页面是预渲染的，但是如果你有几干个产品，构建可能会花费很长的时间。
    这种情况下，你可以静态生成一小部分流行的产品，对于剩余的产品则将falLback设为true。当用户向某个尚未生成的页面发起请求时，那么他会看到一个具有加裁
    指示的页面。在getStaticProps完成以后，对应的页面就可以使用下载下来的数据进行预渲染。之后，所有请求同一个页面的用户都会得到静态预渲染的页面。这样
    做一方面可以确保用户体验，同时还具有快速构建和静态生成的好处。
    */

    /*要点(falLback = blocking)：
    1.由getstaticPaths返回的路径，会在构建时由getStaticProps渲染为HTML。
    2.访问不在构建时生成的路径不会导致404页面。相反，在第一次请求时，Next.js会在服务器端渲染页面，并返回生成的HTML。
    3.在服务器端渲染完成后，浏览器会接收到和请求路径对应的HTML。用户所看到的，浏览器会`从页面被请求到完整页面被加载`。这中间没有加载中，或者后备状态。
    4.之后，Next.js会跟踪新的预渲染的页面，对同一路径的后续请求，服务器会直接返回生成的页面，就像和构建时预渲染的页面一样。
    使用场景：
    加载时间不长：几百ms，避免布局偏移
    */
  };
}
