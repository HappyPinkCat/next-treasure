import useSWR from "swr";
const fetcher = async (url) => {
  const response = await fetch(`http://localhost:4000${url}`);
  const data = await response.json();
  return data;
};
export default Demo3;

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
