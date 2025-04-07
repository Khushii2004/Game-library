import React, { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import "../css/Sidebar.css";
import axios from "axios";

const Sidebar = ({ onApplyFilters }) => {
  const [genres, setGenres] = useState([]);
  const [tags, setTags] = useState([]);
  const [showFilters, setShowFilters] = useState(false); // Toggle visibility
  const [filters, setFilters] = useState({
    genre: "",
    tags: "",
    year: "",
    popularity: "",
  });

  useEffect(() => {
    axios
      .get("https://api.rawg.io/api/genres", {
        params: { key: "369c08bdd6cb47b5ad7a59e698d378f6" },
      })
      .then((response) => setGenres(response.data.results));
  }, []);

  useEffect(() => {
    axios
      .get("https://api.rawg.io/api/tags", {
        params: { key: "369c08bdd6cb47b5ad7a59e698d378f6" },
      })
      .then((response) => setTags(response.data.results));
  }, []);

  const year = [2020, 2021, 2022, 2023, 2024, 2025];

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleReset = (e) => {
    e.preventDefault();
    const reset = { genre: "", tags: "", year: "", popularity: "" };
    setFilters(reset);
    onApplyFilters(reset);
  };

  const handleApplyFilters = (e) => {
    e.preventDefault();
    onApplyFilters(filters);
  };

  return (
    <div className="sidebar">
      {/* Toggle button only visible on small screens */}
      <div className="d-md-none mb-3">
        <Button
          variant="outline-primary"
          onClick={() => setShowFilters(!showFilters)}
          className="w-100"
        >
          {showFilters ? "Hide Filters" : "Show Filters"}
        </Button>
      </div>

      {/* Filters Panel - Hidden/Shown on mobile, always shown on desktop */}
      <div className={`filters-panel ${showFilters ? "show" : "hide"} d-md-block`}>
        <h5>Filters</h5>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Category</Form.Label>
            <Form.Select
              name="genre"
              value={filters.genre}
              onChange={handleFilterChange}
              className="filter-select"
            >
              <option value="">All</option>
              {genres.map((g) => (
                <option key={g.id} value={g.slug}>
                  {g.name}
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Tags</Form.Label>
            <Form.Select
              name="tags"
              value={filters.tags}
              onChange={handleFilterChange}
              className="filter-select"
            >
              <option value="">All</option>
              {tags.map((tag) => (
                <option key={tag.id} value={tag.slug}>
                  {tag.name}
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Release Year</Form.Label>
            <Form.Select
              name="year"
              value={filters.year}
              onChange={handleFilterChange}
              className="filter-select"
            >
              <option value="">All</option>
              {year.map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Popularity</Form.Label>
            <Form.Select
              name="popularity"
              value={filters.popularity}
              onChange={handleFilterChange}
              className="filter-select"
            >
              <option value="">All</option>
              <option value="Most Popular">Most Popular</option>
              <option value="Trending">Trending</option>
              <option value="New Releases">New Releases</option>
            </Form.Select>
          </Form.Group>

          <Button variant="primary" onClick={handleApplyFilters}>
            Apply Filters
          </Button>
          <Button variant="secondary" onClick={handleReset} className="ms-2">
            Reset
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default Sidebar;
