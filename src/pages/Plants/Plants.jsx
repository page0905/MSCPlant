import React, { useEffect, useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import Select from "react-select";
import ProductCard from "../../Components/ProductCard/ProductCard";
import ProductModal from "../../Components/ProductCard/ProductModal";
import "./Plants.css";

const customSelectStyles = {
  control: (provided, state) => ({
    ...provided,
    backgroundColor: "var(--color-background)",
    borderColor: state.isFocused
      ? "var(--color-secondary)"
      : "var(--color-primary)",
    color: "#1f2a2c",
    borderRadius: "6px",
    fontSize: "16px",
    minWidth: "0",
    width: "100%",
    boxShadow: state.isFocused ? "0 0 0 1px var(--color-secondary)" : "none",
    "&:hover": { borderColor: "var(--color-secondary)" },
  }),
  singleValue: (provided) => ({
    ...provided,
    color: "#1f2a2c",
  }),
  menu: (provided) => ({
    ...provided,
    backgroundColor: "var(--color-background)",
    zIndex: 10,
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isFocused
      ? "var(--color-secondary)"
      : "var(--color-background)",
    color: state.isFocused ? "var(--color-primary)" : "#1f2a2c",
    cursor: "pointer",
  }),
};

const sortOptions = [
  { value: "", label: "Sort by" },
  { value: "name-asc", label: "Name A → Z" },
  { value: "name-desc", label: "Name Z → A" },
  { value: "price-asc", label: "Price Low → High" },
  { value: "price-desc", label: "Price High → Low" },
  { value: "pet-friendly", label: "Pet Friendly" },
];

const Plants = () => {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedSubCategory, setSelectedSubCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch("http://localhost:3001/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      });
  }, []);

  const categories = ["All", ...new Set(products.map((p) => p.category))];
  const subCategories = {};
  categories.forEach((cat) => {
    if (cat !== "All") {
      subCategories[cat] = [
        "All",
        ...new Set(
          products.filter((p) => p.category === cat).map((p) => p.subcategory)
        ),
      ];
    }
  });

  const highlightKeyword = (text, keyword) => {
    if (!keyword) return text;
    const parts = text.split(new RegExp(`(${keyword})`, "gi"));
    return parts.map((part, i) =>
      part.toLowerCase() === keyword.toLowerCase() ? (
        <mark key={i}>{part}</mark>
      ) : (
        part
      )
    );
  };

  let filteredProducts = products.filter((p) => {
    const matchCat =
      selectedCategory === "All" || p.category === selectedCategory;
    const matchSub =
      selectedSubCategory === "All" || p.subcategory === selectedSubCategory;
    const matchSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchCat && matchSub && matchSearch;
  });

  if (sortOption === "name-asc")
    filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
  else if (sortOption === "name-desc")
    filteredProducts.sort((a, b) => b.name.localeCompare(a.name));
  else if (sortOption === "price-asc")
    filteredProducts.sort(
      (a, b) =>
        parseFloat(a.cost.replace("$", "")) -
        parseFloat(b.cost.replace("$", ""))
    );
  else if (sortOption === "price-desc")
    filteredProducts.sort(
      (a, b) =>
        parseFloat(b.cost.replace("$", "")) -
        parseFloat(a.cost.replace("$", ""))
    );
  else if (sortOption === "pet-friendly")
    filteredProducts = filteredProducts.filter((p) => p.petFriendly);

  return (
    <div className="container-fluid plants-container">
      <h1
        className="text-center mb-4"
        style={{ color: "var(--color-primary)" }}
      >
        Our Plants
      </h1>

      <div className="d-flex justify-content-between align-items-center mb-3">
        <div>
          <button
            className="filter-toggle-btn"
            onClick={() => setShowFilters(!showFilters)}
            aria-label="Toggle Filters"
          >
            {showFilters ? <FaTimes size={20} /> : <FaBars size={20} />}
          </button>
          <div className="filter-toggle-placeholder" />
        </div>
        <p className="text-muted mb-0">
          Showing {filteredProducts.length} plant(s)
        </p>
      </div>

      <div className="row">
        <div
          className={`col-lg-2 col-md-3 mb-4 plants-filter-wrapper ${
            showFilters ? "active" : ""
          }`}
        >
          <input
            type="text"
            placeholder="Search plants..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="form-control mb-3"
          />

          <label className="fw-bold">Category</label>
          <Select
            styles={customSelectStyles}
            options={categories.map((cat) => ({ value: cat, label: cat }))}
            value={{ value: selectedCategory, label: selectedCategory }}
            onChange={(selected) => {
              setSelectedCategory(selected.value);
              setSelectedSubCategory("All");
            }}
            className="mb-3"
          />

          {selectedCategory !== "All" && (
            <>
              <label className="fw-bold">Subcategory</label>
              <Select
                styles={customSelectStyles}
                options={subCategories[selectedCategory].map((sub) => ({
                  value: sub,
                  label: sub,
                }))}
                value={{
                  value: selectedSubCategory,
                  label: selectedSubCategory,
                }}
                onChange={(selected) => setSelectedSubCategory(selected.value)}
                className="mb-3"
              />
            </>
          )}

          <label className="fw-bold">Sort</label>
          <Select
            styles={customSelectStyles}
            options={sortOptions}
            value={sortOptions.find((opt) => opt.value === sortOption)}
            onChange={(selected) => setSortOption(selected.value)}
          />
        </div>

        <div className="col-lg-10 col-md-9 plants-content">
          <div className="row">
            {loading ? (
              <div className="text-center w-100 py-5">
                <div className="spinner-border text-secondary" role="status" />
                <p className="mt-3 text-muted">Loading...</p>
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="text-center text-muted mt-4 w-100">
                No plants found.
              </div>
            ) : (
              filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="custom-col-5 mb-4 d-flex justify-content-center"
                >
                  <ProductCard
                    product={product}
                    highlight={(text) => highlightKeyword(text, searchTerm)}
                    onClick={(p) => {
                      setSelectedProduct(p);
                      setShowModal(true);
                    }}
                  />
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      <ProductModal
        show={showModal}
        handleClose={() => setShowModal(false)}
        product={selectedProduct}
      />
    </div>
  );
};

export default Plants;
