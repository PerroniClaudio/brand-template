"use client";

import { Category } from "@/shared/types";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

function CategoryFilter({ categories }: { categories: Category[] }) {
  const uniqueCategories = Array.from(
    new Set(categories.map((category) => category.title))
  ).map((title) => {
    return categories.find((category) => category.title === title);
  });

  const [currentCategory, setCurrentCategory] = useState<string | null>(null);

  const router = useRouter();

  // Imposta il valore iniziale di currentCategory dal parametro GET
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const categoryParam = params.get("category");
    if (categoryParam) {
      setCurrentCategory(categoryParam);
    }
  }, []);

  useEffect(() => {
    if (currentCategory) {
      const params = new URLSearchParams(window.location.search);
      params.set("category", currentCategory);
      router.push(`?${params.toString()}`);
    }
  }, [currentCategory]);

  return (
    <div className="flex flex-row-reverse items-center">
      <select
        value={currentCategory || "0"} // Imposta il valore della select
        onChange={(e) => setCurrentCategory(e.target.value)}
        className="block w-full p-1 rounded-none text-base font-normal bg-background text-secondary  bg-clip-padding border border-solid border-secondary transition ease-in-out m-0 focus:text-primary focus:outline-none">
        <option value="0">Tutte le categorie</option>
        {uniqueCategories.map((category) => (
          <option key={category?.title} value={category?.title}>
            {category?.title}
          </option>
        ))}
      </select>
    </div>
  );
}
export default CategoryFilter;
