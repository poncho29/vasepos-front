import Image from "next/image";

import { TProduct } from "@/schemas";

import { formatCurrency } from "@/utils";

import { AddProductButton } from "./AddProductButton";

interface Props {
  product: TProduct;
}

export const ProductCard = ({ product }: Props) => {
  return (
    <div className='rounded bg-white shadow relative p-5'>
      <div>
        <Image
          src={`${process.env.API_URL_BASE}/img/${product.image}`}
          alt={`Imagen de producto ${product.name}`}
          width={400}
          height={600}
          className="w-full"
          priority
        />

        <div className="p-3 space-y-2">
          <h3 className="text-xl font-bold text-gray-600">{product.name}</h3>
          <p className="text-gray-500">Disponibles: {product.inventory}</p>
          <p className="text-2xl font-extrabold  text-gray-900">{formatCurrency(product.price)}</p>
        </div>
      </div>
      
      <AddProductButton product={product} />
    </div>
  )
}
