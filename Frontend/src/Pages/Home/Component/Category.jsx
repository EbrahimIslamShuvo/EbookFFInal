import useCategory from "../../../Data/useCategory";

const Category = () => {
  const { categories } = useCategory();

  return (
    <section className="py-14">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-2xl font-semibold mb-6">
          Browse by Category
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {categories.map(cat => (
            <div
              key={cat.categoryId}
              className="border rounded p-4 text-center cursor-pointer hover:bg-[#3059b8] hover:text-white"
            >
              {cat.name}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Category;
