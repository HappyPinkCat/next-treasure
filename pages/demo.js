import React, { useState, useEffect } from "react";
export default Demo2;
function Demo1() {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [dashboardData, setDashboardData] = useState(null);
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("http://localhost:4000/dashboard");
        const data = await response.json();
        setDashboardData(data);
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);
  if (isLoading) {
    return <h1>Loading...</h1>;
  }
  return (
    <div>
      <h2>Dashboard</h2>
      <h2>Posts-{dashboardData.posts}</h2>
      <h2>Likes-{dashboardData.likes}</h2>
      <h2>Followers-{dashboardData.followers}</h2>
      <h2>Following-{dashboardData.following}</h2>
    </div>
  );
}
function Demo2() {
  function Phone() {
    const [users, setusers] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
      async function fetchData() {
        const response = await fetch("http://localhost:4000/users");
        const data = await response.json();
        setusers(data);
        setIsLoading(false);
      }
      fetchData();
    }, []);
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
    const [users, setusers] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
      async function fetchData() {
        const response = await fetch("http://localhost:4000/users");
        const data = await response.json();
        setusers(data);
        setIsLoading(false);
      }
      fetchData();
    }, []);
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
      {/* <Email /> */}
    </div>
  );
}
