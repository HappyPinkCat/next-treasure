import Link from "next/link";
export default function ProductsList({ products }) {
  return (
    <div>
      <h1>ProductsList</h1>
      <ul>
        {products.map((product) => (
          <>
            <Link href={`products/${product.id}`}>
              <li key={product.id}>
                product {product.id}：{product.title} is {product.price}RMB.
              </li>
            </Link>
          </>
        ))}
      </ul>
    </div>
  );
}
export async function getStaticProps() {
console.log("Generating/regenerating products list");
const res = await fetch("http://localhost:4000/products");
const data = await res.json();
return {
  props: {
    products: data,
  },
  revalidate: 20, //20秒后重新生成页面,终端可监控到console值的变化，高流量的电商1s，文档站点60s
};
}
