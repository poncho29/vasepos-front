import { ProductCard } from "@/components";
import { CategoryWithProductsResponseSchema } from "@/schemas";
import { redirect } from "next/navigation";


interface Props {
  params: Promise<{ categoryId: string }>;
}

async function getProducts(categoryId: string) {
  const URL = `${process.env.API_URL}/categories/${categoryId}?products=true`
  const req = await fetch(URL);

  if (!req.ok) redirect('/1')

  const json = await req.json();
  const products = CategoryWithProductsResponseSchema.parse(json);
  return products;
}

export default async function CategoryPage({ params }: Props) {
  const { categoryId } = await params;

  const category = await getProducts(categoryId);

  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
      {category.products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}