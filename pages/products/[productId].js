import { useRouter } from "next/router";
export default function Product({ product }) {
  const router = useRouter();
  if (router.isFallback) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <h1>
        {product.id}:{product.title} is
      </h1>
      <p>{product.desc}</p>
    </div>
  );
}
export async function getStaticProps(context) {
  const { params } = context;
  const res = await fetch(`http://localhost:4000/products/${params.productId}`);
  const data = await res.json();
  return {
    props: {
      product: data,
    },
  };
}
export async function getStaticPaths() {
  const res = await fetch("http://localhost:4000/products");
  const products = await res.json();
  const paths = products.map((product) => ({
    params: { productId: `${product.id}` },
  }));
  return {
    paths: paths,
    fallback: true,
  };
}
