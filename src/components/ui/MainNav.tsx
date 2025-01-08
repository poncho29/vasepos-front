import Link from "next/link";

import { CategoriesResponseSchema } from "@/schemas";

import { Logo } from "./Logo";

export const getCategories = async () => {
  const url = `${process.env.API_URL}/categories`;
  const req = await fetch(url);
  const json = await req.json();
  return CategoriesResponseSchema.parse(json);
}

export async function MainNav() {
  const categories = await getCategories();

  return (
    <header className="px-10 py-5 bg-gray-700 flex flex-col md:flex-row justify-between ">
      <div className="flex justify-center">
        <Logo />
      </div>

      <nav className="flex flex-col md:flex-row gap-2 items-center mt-5 md:mt-0">
        {categories.map(category => (
          <Link
            key={category.id}
            href={`${category.id}`}
            className="text-white font-bold hover:text-green-400"  
          >
            {category.name}
          </Link>
        ))}
      </nav>
    </header>
  )
}