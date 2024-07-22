import db from "@/lib/db";
import ListProduct from "../../../components/list-product";
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function getProducts() {
  const products = await db.product.findMany({
    select: {
      title: true,
      price: true,
      created_at: true,
      photo: true,
      id: true,
    },
  });
  return products;
}

export default async function Product() {
  // Product 모델에 데이터 추가
  // const product = await prisma.product.create({
  //   data: {
  //     title: "고구마",
  //     price: 999,
  //     photo: "/goguma.jpg",
  //     description: "맛있는 고구마",
  //     userId: 1,
  //   },
  // });
  // console.log(product);

  const products = await getProducts();
  return (
    <div>
      {products.map((product) => (
        <ListProduct key={product.id} {...product} /> //product에 모든것을 props로 보내겠다.
      ))}
    </div>
  );
}
