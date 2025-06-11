import React from "react";

const CategoryFilter = ({
  categories,
  subCategories,
  selectedCategory,
  selectedSubCategory,
  onCategoryChange,
  onSubCategoryChange,
}) => {
  return (
    <div className="plants-filter">
      <select value={selectedCategory} onChange={onCategoryChange}>
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>

      {selectedCategory !== "All" && (
        <select value={selectedSubCategory} onChange={onSubCategoryChange}>
          {subCategories[selectedCategory]?.map((sub) => (
            <option key={sub} value={sub}>
              {sub}
            </option>
          ))}
        </select>
      )}
    </div>
  );
};

export default CategoryFilter;
