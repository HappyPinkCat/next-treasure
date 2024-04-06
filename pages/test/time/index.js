import React, { useEffect, useState } from "react";

function CustomTimer1() {
  const [time, setTime] = useState(0);
  useEffect(() => {
    setInterval(() => {
      setTime((time) => time + 1);
    }, 1000);
  }, []);
  return <div>Time is wrong:{time} seconds.</div>;
}

function CustomTimer2() {
  const [time, setTime] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => {
      setTime((time) => time + 1);
    }, 1000);
    return () => clearInterval(timer); // 清除定时器,useeffect中的return是卸载unmounted时执行一次
  }, []);
  return <div>Time is right:{time} seconds.</div>;
}
export default CustomTimer1;
