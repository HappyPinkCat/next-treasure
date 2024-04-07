This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).
## 运行流程
package.json的dev脚本到_app.js到index.js
## 路由
当一个组件文件被添加到项目的pages目录，它自动会具有一个路由
- 嵌套路由
- 动态路由
- Catch-all(守卫)路由
- 在UI元素之间实现导航
- 通过编程方式实现页面之间的导航
## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
# 两种预渲染形式
1. 静态生成(Static Generation) 
2. 服务器端渲染(Server-Side Rendering)
## 服务器端渲染～介绍
* 是一种预渲染形式，SSR并不是在构建时预渲染页面的，而是在请求时渲染页面
* 对于每一个请求，HTML都会被即时生成
* 如果我们需要做到对于每个请求都能获取最新的数据，或者当我们需要根据用户信息来获取数据，并且我们需要SEO，那么我们就要使用SSR
## 静态生成
* HTML是在构建时静态生成的。构建出来的页面会被缓存，后续请求会重用缓存的页面
* 对于使用`getstaticPaths`，并且`fallback = true` 的动态页面，它并不是在构建时生成的，而是在首次请求时触发生成的
* 对于增量静态再生成ISR，页面会在revalidation间隔过了以后，由下一个请求触发再生成
* 对于静态生成，在大多数情况下，页面是在构建时通过使用`getStaticProps`生成的
### 静态生成问题1 ~无法在请求时获取最新数据
* 如果无法再请求时获取最新数据，就会碰到老的过期数据问题
* 假设我们要开发一个新闻网站
* 它的內容是经常变化的，比方说每秒钟新的文章就可能被发布（比如头条）
* `getStaticProps`会在构建build时获取新间数据，不满足需求
* `getstaticPaths`会在首次请求时获取数据，后续请求时用缓存数据，不满足需求
* 增量静态再生成ISR可以解决部分问题，如果将revaliate设置为1秒，那么当再生成在后台进行期间，用户并不总是能看到最新的新间
* 在客户端组件中，通过动态调用API来获取数据(ajax)，无法简单实现SEO
### 静态生成问题2 ～无法访问客户端请求request
* 当要获取的数据和某个特定用户相关时，这会成为一个问题
* 假设我们要构建一个类似推特的网站
* 作为用户，他希望看到的推文是基于他的喜好做了个性化推荐的
* 推文也应该是SE0友好的，因为它是公开内容，全世界任何人可以看到
* 为了获取特定于某个用户的推文，我们需要userId。只有在能够访问客户端请求request时，我们才能获取到userId 、
* 可以使用客户端useEffect等技术来实现，但是这样做同样会失去SEO
## 静态生成
* 静态生成是一种预渲染技术，它在构建时生成HTML。
* 预渲染出来的静态页面可以缓存在CDN上，可以被追布全球的用户快速访问到。
* 静态内容不仅快，而且还有助于SEO，因为可以被搜索引擎快速索引。
* 静态生成使用getStaticProps获取数据，使用getStaticPaths动态生成页面，适用于各种生产级应用场景。
## 静态生成的问题
* 构建所需时间和页面数量成正比。
* 一个页面一旦生成，在重新构建之前，它可能包含陈旧的数据。
## 构建时间问题
构建时间和页面的数量成正比。
### 样例场景
一个页面需要花费100ms构建
一个具有100个商品的电商应用，需要大致10秒进行构建
一个具有100,000个商品的电商应用，需要>2.5小时的时间进行构建时间开销可能并不是简单的线性增长，因为还可能有其它隐含的开销
## 陈旧数据的问题
如果应用不经常构建，那么构建时间长一点也不是问题？
时候可能会碰到过期数据的问题。
电商应用通常不是部署一次就完事的，产品详情，尤其是价格，可能能每天都会变化。
重新构建整个应用，让更新的数据重新静态生成。
## getstaticPaths可以解决问题吗？
* 在构建时预渲染一些页面，剩下的页面在请求时即时生成。
* 能否先只生成1000个最流行的商品的页面，剩下的99,000个页面在请求时即时生成如果你的应用908是静态页面一108是动态页面，那么getStatiPaths没有帮助
* 电商网站通常90%是动态页面，10%是静态页面，所以使用`getstaticPaths`可以减少总的构建时间
* 但是它仍未解决陈旧数据的问题
* 如果你在构建时生成1000个页面，然后剩下的页面在请求时，通过使用falLback true或者fallback='blocking'即时生成，那么对后台数据的更新，井不会更新已经预渲染出来的页面
## json-server
https://github.com/typicode/json-server
运行script后可访问http://localhost:4000/products，亦可http://localhost:4000/products/1
## 增量静态生成
需求：只更新后台数据发生变化的部分页面，而不需要更新整个应用。
**增量静态生成ISR**
有了ISR/Incremental Static Regeneration之后，即便在你构建了应用之后，Next.js仍然可以帮你更新静态页面。
它可以静态生成单个页面，无需重新构建整个应用，这样可以有效解决成旧数据问题。
**如何实现**
* 在getStaticProps函数中，除了`props`键，我们可以指定一个`revalidate`键,其值表示多少秒以后开始重新生成页面。
## 再生成
* 只有在过了revalidate时间之后，并且用户发起请求的时候，再生成(re-generation)才会被触发
* 如果一个用户访问了产品页，但是之后，一整天没有用户再访问那个页面，那么再生成就不会发生。
* revalidate井不是说页面在每隔10秒时会自动再生成
* 它只是表明，在revalidate时间之后，如果有用户做了一次请求，那么后台必须发起一次再生成。
* 再生成可能会失败，那么再下个再生成成功之前，next.js会继续使用之前缓存的html页面。