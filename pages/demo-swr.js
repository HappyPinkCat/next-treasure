import useSWR, { SWRConfig, useSWRConfig, preload } from "swr";
import { useState } from "react";
const fetcher = async (url) => {
  const response = await fetch(`http://localhost:4000${url}`);
  const data = await response.json();
  return data;
};
export default Demo5;

function Demo1() {
  const { data, error, isLoading } = useSWR("/dashboard", fetcher); //key值，可传给fetcher
  /*
  {revalidateOnFocus: false}
  */
  if (error) return <div>something is error...</div>;
  if (isLoading) return <h1>swr loading...</h1>; //!data
  return (
    <div>
      <h2>Dashboard SWR</h2>
      <h2>Posts-{data.posts}</h2>
      <h2>Likes-{data.likes}</h2>
      <h2>Followers-{data.followers}</h2>
      <h2>Following-{data.following}</h2>
    </div>
  );
}
// 相同的 SWR key，只会有 1 个请求 发送到 API,请求会被自动 去除重复、缓存 和 共享。
function Demo2() {
  function useUsers(id) {
    const { data, error, isLoading } = useSWR(`/users`, fetcher);
    return {
      users: data,
      isLoading,
      isError: error,
    };
  }
  function Phone() {
    const { users, isLoading } = useUsers();
    if (isLoading) return <div>Loading Phone...</div>;
    return (
      <>
        <h2>Phone component</h2>
        <h3>
          {users.map((user) => (
            <li key={user.id}>
              {user.username} -- {user.phone} .
            </li>
          ))}
        </h3>
      </>
    );
  }
  function Email() {
    const { users, isLoading } = useUsers();
    if (isLoading) return <div>Loading Email...</div>;
    return (
      <>
        <h2>Email component</h2>
        <h3>
          {users.map((user) => (
            <li key={user.id}>
              {user.username} -- {user.email} .
            </li>
          ))}
        </h3>
      </>
    );
  }
  return (
    <div>
      <Phone />
      <hr></hr>
      <Email />
    </div>
  );
}
// 按需请求:使用 null 或传一个函数作为 key 来有条件地请求数据。如果函数抛出错误或返回 falsy 值，SWR 将不会启动请求
function Demo3() {
  const shouldFetch = false;
  const { data: dashboard } = useSWR(
    shouldFetch ? "/dashboard" : null,
    fetcher
  );
  if (dashboard) {
    return <h3>dashboard'post number is {dashboard.posts}.</h3>;
  }
}
// 缓存 provider 应该放在组件树的更高位置，或者放在渲染之外。<Demo4/> 组件重新挂载时，provider 也会被重新创建。
// interface Cache<Data> {  //缓存 provider 是类似 Map 的对象，它有 get、set、delete 和 keys 方法
//   get(key: string): Data | undefined
//   set(key: string, value: Data): void
//   delete(key: string): void
//   keys(): IterableIterator<string>
// }
function Demo4() {
  return (
    <SWRConfig
      value={{
        provider: () => new Map(), //创建
      }}
    >
      <Demo4Page1 />
      <hr />
      <Demo4Page2 />
    </SWRConfig>
  );
  function Demo4Page1() {
    const { cache } = useSWRConfig();
    cache.set("12345", "上山打老虎"); //设置
    return (
      <>
        <h1>This page is Demo4Page1</h1>
      </>
    );
  }
  function Demo4Page2() {
    const { cache } = useSWRConfig();
    const cacheRes = cache.get("12345"); //获取
    return (
      <>
        <h1>This page is Demo4Page2</h1>
        <h3>cacheRes:{cacheRes}</h3>
      </>
    );
  }
}
// 预请求Preload the resource before rendering the InnerComponent component below,
// this prevents potential waterfalls in your application.
function Demo5() {
  preload("/preloadData", fetcher); //preloading is also available to use in event handlers or effects
  const [show, setShow] = useState(false);
  return (
    <div>
      <button onClick={() => setShow(true)}>Show InnerComponent</button>
      {show ? <InnerComponent /> : null}
    </div>
  );
  function InnerComponent() {
    const { data } = useSWR("/preloadData", fetcher);
    return <h1>This is InnerComponent data:{data?.info}</h1>;
  }
}
