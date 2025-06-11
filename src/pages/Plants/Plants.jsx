import React, { useState } from "react";
import Select from "react-select";
import { products_by_category } from "../../data/products";
import ProductCard from "../../Components/ProductCard/ProductCard";
import "./Plants.css";

const Plants = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedSubCategory, setSelectedSubCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  const categories = ["All", ...Object.keys(products_by_category)];

  const subCategories = {};
  categories.forEach((cat) => {
    if (cat !== "All") {
      subCategories[cat] = ["All", ...Object.keys(products_by_category[cat])];
    }
  });

  const customSelectStyles = {
    control: (base) => ({
      ...base,
      backgroundColor: "var(--color-background)",
      borderColor: "var(--color-primary)",
      color: "var(--color-primary)",
      borderRadius: "6px",
      minHeight: "40px",
      minWidth: "180px",
      boxShadow: "none",
      outline: "none",
      "&:hover": { borderColor: "var(--color-primary)" },
      "&:focus": { outline: "none" },
    }),
    option: (base, { isFocused, isSelected }) => ({
      ...base,
      backgroundColor: isSelected
        ? "var(--color-primary)"
        : isFocused
        ? "var(--color-secondary)"
        : "var(--color-background)",
      color: isSelected ? "var(--color-secondary)" : "var(--color-primary)",
      cursor: "pointer",
    }),
    menu: (base) => ({
      ...base,
      backgroundColor: "var(--color-background)",
      borderRadius: "6px",
      zIndex: 5,
      transition: "none",
    }),
    singleValue: (base) => ({
      ...base,
      color: "var(--color-primary)",
    }),
  };

  const highlightKeyword = (text, keyword) => {
    if (!keyword) return text;
    const parts = text.split(new RegExp(`(${keyword})`, "gi"));
    return parts.map((part, index) =>
      part.toLowerCase() === keyword.toLowerCase() ? (
        <mark key={index} style={{ backgroundColor: "#b9c5b1" }}>
          {part}
        </mark>
      ) : (
        part
      )
    );
  };

  let filteredProducts = [];

  if (selectedCategory === "All") {
    filteredProducts = Object.entries(products_by_category).flatMap(
      ([category, subcats]) =>
        Object.entries(subcats).flatMap(([subcategory, items]) =>
          items.map((item, index) => ({
            ...item,
            category,
            subcategory,
            id: `${category}-${subcategory}-${index}`,
          }))
        )
    );
  } else {
    if (selectedSubCategory === "All") {
      filteredProducts = Object.entries(
        products_by_category[selectedCategory]
      ).flatMap(([subcategory, items]) =>
        items.map((item, index) => ({
          ...item,
          category: selectedCategory,
          subcategory,
          id: `${selectedCategory}-${subcategory}-${index}`,
        }))
      );
    } else {
      const items =
        products_by_category[selectedCategory][selectedSubCategory] || [];
      filteredProducts = items.map((item, index) => ({
        ...item,
        category: selectedCategory,
        subcategory: selectedSubCategory,
        id: `${selectedCategory}-${selectedSubCategory}-${index}`,
      }));
    }
  }

  if (searchTerm.trim() !== "") {
    filteredProducts = filteredProducts.filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  if (sortOption === "name-asc") {
    filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
  } else if (sortOption === "name-desc") {
    filteredProducts.sort((a, b) => b.name.localeCompare(a.name));
  } else if (sortOption === "price-asc") {
    filteredProducts.sort(
      (a, b) =>
        parseFloat(a.cost.replace("$", "")) -
        parseFloat(b.cost.replace("$", ""))
    );
  } else if (sortOption === "price-desc") {
    filteredProducts.sort(
      (a, b) =>
        parseFloat(b.cost.replace("$", "")) -
        parseFloat(a.cost.replace("$", ""))
    );
  }

  return (
    <div className="plants-container">
      <h2>Our Plants</h2>

      <div className="plants-filter-wrapper">
        <button
          className="filter-toggle-btn"
          onClick={() => setShowFilters(!showFilters)}
        >
          ☰ Filters and sort
        </button>

        <div className={`plants-filter ${showFilters ? "active" : ""}`}>
          <input
            type="text"
            placeholder="Search plants..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="plants-search-input"
          />

          <Select
            options={categories.map((cat) => ({ value: cat, label: cat }))}
            value={{ value: selectedCategory, label: selectedCategory }}
            onChange={(selected) => {
              setSelectedCategory(selected.value);
              setSelectedSubCategory("All");
            }}
            styles={customSelectStyles}
          />

          {selectedCategory !== "All" && (
            <Select
              options={subCategories[selectedCategory]?.map((sub) => ({
                value: sub,
                label: sub,
              }))}
              value={{ value: selectedSubCategory, label: selectedSubCategory }}
              onChange={(selected) => setSelectedSubCategory(selected.value)}
              styles={customSelectStyles}
            />
          )}

          <Select
            options={[
              { value: "", label: "Sort by" },
              { value: "name-asc", label: "Name A → Z" },
              { value: "name-desc", label: "Name Z → A" },
              { value: "price-asc", label: "Price Low → High" },
              { value: "price-desc", label: "Price High → Low" },
            ]}
            value={{
              value: sortOption,
              label: {
                "": "Sort by",
                "name-asc": "Name A → Z",
                "name-desc": "Name Z → A",
                "price-asc": "Price Low → High",
                "price-desc": "Price High → Low",
              }[sortOption],
            }}
            onChange={(selected) => setSortOption(selected.value)}
            styles={customSelectStyles}
          />
        </div>
      </div>

      <div className="plants-list row">
        {filteredProducts.length === 0 ? (
          <div className="col-12 text-center">
            <p style={{ color: "var(--color-primary)", marginTop: "20px" }}>
              No plants found.
            </p>
          </div>
        ) : (
          filteredProducts.map((product) => (
            <div
              key={product.id}
              className="col-4 col-sm-4 col-md-3 col-lg-2-4 mb-4 d-flex justify-content-center"
            >
              <ProductCard
                product={product}
                highlight={(text) => highlightKeyword(text, searchTerm)}
              />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Plants;
