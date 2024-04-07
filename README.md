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
# 静态生成
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