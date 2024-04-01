export default function User(props) {
  const { users } = props;
  console.log(users);
  return (
    <div>
      <h1>UserList</h1>
      {users.map((user) => (
        <ul key={user.id}>
          <li>
            {user.name}---{user.email}
          </li>
        </ul>
      ))}
    </div>
  );
}
// If you export a function called getStaticProps (Static Site Generation静态生成) from a page, Next.js will pre-render this page at build time using the props returned by getStaticProps
export async function getStaticProps() {
  const res = await fetch("https://jsonplaceholder.typicode.com/users");
  const users = await res.json();
  return {
    props: {
      users,
    },
  };
}
