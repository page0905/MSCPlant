import React, { useCallback, useEffect, useMemo, useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import Select from "react-select";
import ProductCard from "../../Components/ProductCard/ProductCard";
import ProductModal from "../../Components/ProductCard/ProductModal";
import { normalizePriceFields } from "../../utils/price";
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
      ? "var(--color-secondary-transparent)"
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
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();
    let isMounted = true;

    const loadProducts = async () => {
      try {
        setLoading(true);
        setError("");
        const baseUrl =
          process.env.REACT_APP_API_BASE_URL?.replace(/\/$/, "") ||
          "http://localhost:3002";
        const response = await fetch(`${baseUrl}/products`, {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }

        const data = await response.json();
        if (!isMounted) return;

        const normalizedProducts = Array.isArray(data)
          ? data.map((item) => normalizePriceFields(item))
          : [];
        setProducts(normalizedProducts);
      } catch (err) {
        if (controller.signal.aborted) return;

        console.error("Failed to load products", err);
        if (isMounted) {
          setProducts([]);
          setError(
            "Unable to load plants right now. Please try again shortly."
          );
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    loadProducts();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  const categories = useMemo(() => {
    const uniqueCategories = new Set();
    products.forEach((product) => {
      if (product?.category) uniqueCategories.add(product.category);
    });
    return ["All", ...uniqueCategories];
  }, [products]);

  const subCategories = useMemo(() => {
    const grouped = new Map();
    products.forEach((product) => {
      if (!product?.category) return;
      if (!grouped.has(product.category)) {
        grouped.set(product.category, new Set());
      }
      if (product?.subcategory) {
        grouped.get(product.category).add(product.subcategory);
      }
    });

    const result = {};
    grouped.forEach((value, key) => {
      result[key] = ["All", ...value];
    });
    return result;
  }, [products]);

  useEffect(() => {
    if (!categories.includes(selectedCategory)) {
      setSelectedCategory("All");
    }
  }, [categories, selectedCategory]);

  useEffect(() => {
    if (selectedCategory === "All") {
      setSelectedSubCategory("All");
      return;
    }

    const availableSubCategories = subCategories[selectedCategory];
    if (
      availableSubCategories &&
      !availableSubCategories.includes(selectedSubCategory)
    ) {
      setSelectedSubCategory("All");
    }
  }, [selectedCategory, selectedSubCategory, subCategories]);

  const highlightKeyword = useCallback(
    (text) => {
      if (!searchTerm.trim() || typeof text !== "string") return text;
      const trimmedTerm = searchTerm.trim();
      const safeTerm = trimmedTerm.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      const regex = new RegExp(`(${safeTerm})`, "gi");
      const fragments = text.split(regex);

      if (fragments.length === 1) return text;

      const lowerTerm = trimmedTerm.toLowerCase();
      return fragments.map((part, index) =>
        part.toLowerCase() === lowerTerm ? (
          <mark key={`${part}-${index}`} className="plants-highlight">
            {part}
          </mark>
        ) : (
          <React.Fragment key={`${part}-${index}`}>{part}</React.Fragment>
        )
      );
    },
    [searchTerm]
  );

  const filteredProducts = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();

    let results = products.filter((product) => {
      const matchesCategory =
        selectedCategory === "All" || product.category === selectedCategory;
      const matchesSubCategory =
        selectedCategory === "All" ||
        selectedSubCategory === "All" ||
        product.subcategory === selectedSubCategory;
      const matchesSearch = !normalizedSearch
        ? true
        : product.name.toLowerCase().includes(normalizedSearch);

      return matchesCategory && matchesSubCategory && matchesSearch;
    });

    if (sortOption === "pet-friendly") {
      results = results.filter((product) => product.petFriendly);
      return results;
    }

    const sortedResults = [...results];
    if (sortOption === "name-asc") {
      sortedResults.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortOption === "name-desc") {
      sortedResults.sort((a, b) => b.name.localeCompare(a.name));
    } else if (sortOption === "price-asc") {
      sortedResults.sort((a, b) => a.priceValue - b.priceValue);
    } else if (sortOption === "price-desc") {
      sortedResults.sort((a, b) => b.priceValue - a.priceValue);
    }

    return sortedResults;
  }, [products, selectedCategory, selectedSubCategory, searchTerm, sortOption]);

  const hasActiveFilters = useMemo(
    () =>
      selectedCategory !== "All" ||
      selectedSubCategory !== "All" ||
      searchTerm.trim() !== "" ||
      sortOption !== "",
    [selectedCategory, selectedSubCategory, searchTerm, sortOption]
  );

  const activeFilterChips = useMemo(() => {
    const chips = [];
    if (selectedCategory !== "All") chips.push(selectedCategory);
    if (selectedSubCategory !== "All") chips.push(selectedSubCategory);
    if (sortOption) {
      const matchedOption = sortOptions.find(
        (option) => option.value === sortOption
      );
      if (matchedOption?.label) chips.push(matchedOption.label);
    }
    if (searchTerm.trim()) chips.push(`Search: "${searchTerm.trim()}"`);
    return chips;
  }, [selectedCategory, selectedSubCategory, sortOption, searchTerm]);

  const resetFilters = useCallback(() => {
    setSelectedCategory("All");
    setSelectedSubCategory("All");
    setSortOption("");
    setSearchTerm("");
  }, []);

  return (
    <div className="container-fluid plants-container">
      <h1
        className="text-center mb-4"
        style={{ color: "var(--color-primary)" }}
      >
        Our Plants
      </h1>

      <div className="plants-toolbar">
        <div className="plants-toolbar-left">
          <button
            className="filter-toggle-btn"
            onClick={() => setShowFilters(!showFilters)}
            aria-label="Toggle Filters"
          >
            {showFilters ? <FaTimes size={20} /> : <FaBars size={20} />}
          </button>
          <div className="filter-toggle-placeholder" />
        </div>

        <p className="plants-status" aria-live="polite">
          Showing {filteredProducts.length} plant
          {filteredProducts.length === 1 ? "" : "s"}
        </p>

        <button
          type="button"
          className="clear-filters-btn"
          onClick={resetFilters}
          disabled={!hasActiveFilters}
        >
          Clear filters
        </button>
      </div>

      {hasActiveFilters && activeFilterChips.length > 0 && (
        <div className="plants-active-filters" role="status">
          {activeFilterChips.map((chip) => (
            <span key={chip} className="plants-filter-chip">
              {chip}
            </span>
          ))}
        </div>
      )}

      {error && (
        <div className="alert alert-danger mt-3" role="alert">
          {error}
        </div>
      )}

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
            <div className="row">
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="custom-col-5 mb-4 d-flex justify-content-center"
                >
                  <ProductCard
                    product={product}
                    highlight={(text) => highlightKeyword(text)}
                    onClick={(p) => {
                      setSelectedProduct(p);
                      setShowModal(true);
                    }}
                  />
                </div>
              ))}
            </div>
          )}
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
