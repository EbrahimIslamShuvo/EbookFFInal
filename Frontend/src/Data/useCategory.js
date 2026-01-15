import { useEffect, useState } from "react";

const useCategory = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("/category.json");
        const data = await res.json();
        setCategories(data);
      } catch (error) {
        console.error("Failed to fetch categories", error);
      }
    };

    fetchCategories();
  }, []);

  const getCategoryById = (id) => {
    return categories.find((cat) => cat.categoryId == id);
  };

  return { categories, getCategoryById };
};

export default useCategory;
