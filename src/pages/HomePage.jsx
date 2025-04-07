import React, { useEffect, useState, useCallback } from "react";
import { Container, Row, Spinner, Button,Col } from "react-bootstrap";
import axios from "axios";
import GameCard from "../components/GameCard";
import "../css/HomePage.css";
import debounce from "lodash/debounce"; // Helps avoid too many API calls

function HomePage() {
  const [games, setGames] = useState([]); // All games fetched from the API
  const [filters, setFilters] = useState({}); // Object to store selected filters
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1); // For pagination
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch games from the RAWG API
  const fetchGames = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const params = {
        key:  "369c08bdd6cb47b5ad7a59e698d378f6", 
        page_size: 12,
      };

      // Apply filters if selected
      if (searchQuery.trim()) params.search = searchQuery;
      if (filters.genre) params.genres = filters.genre;
      if (filters.tags) params.tags = filters.tags;
      if (filters.year)
        params.dates = `${filters.year}-01-01,${filters.year}-12-31`;
      if (filters.popularity) {
        params.ordering =
          filters.popularity === "Most Popular"
            ? "-rating"
            : filters.popularity === "Trending"
            ? "-added"
            : "-released";
      }

      const response = await axios.get("https://api.rawg.io/api/games", { params });
      setGames(response.data.results);
    } catch (err) {
      console.error("Error fetching games:", err);
      setError("Oops! Could not load games. Try again later.");
    } finally {
      setLoading(false);
    }
  }, [page, searchQuery, filters]);

  // Call fetchGames every time dependencies change
  useEffect(() => {
    fetchGames();
  }, [fetchGames]);

  // Debounced search to avoid hammering the API
  const debouncedSearch = useCallback(
    debounce((query) => {
      setSearchQuery(query);
      setPage(1);
    }, 500),
    []
  );

  const handleSearch = (query) => {
    debouncedSearch(query);
  };

  const handleApplyFilters = (newFilters) => {
    setFilters(newFilters);
    setPage(1);
    setSearchQuery("");
  };

  return (
    <Container fluid className="home-page px-3 px-md-4 py-4">
      {loading ? (
        <div className="text-center my-5">
          <Spinner animation="border" variant="primary" />
          <p>Loading games...</p>
        </div>
      ) : error ? (
        <div className="text-center my-5 text-danger">
          <p>{error}</p>
          <Button variant="outline-primary" onClick={fetchGames}>
            Retry
          </Button>
        </div>
      ) : (
        <>
          {/* Responsive grid for games */}
          <Row className="justify-content-center">
  {games.map((game) => (
    <Col key={game.id} xs={12} sm={6} md={4} className="d-flex mb-4">
      <GameCard game={game} />
    </Col>
  ))}
</Row>

          {/* Pagination controls */}
          <div className="pagination-controls d-flex flex-wrap justify-content-center align-items-center mt-4 gap-3">
            <Button
              variant="outline-dark"
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              disabled={page === 1 || loading}
            >
              Previous
            </Button>
            <span className="fw-medium">Page {page}</span>
            <Button
              variant="outline-dark"
              onClick={() => setPage((prev) => prev + 1)}
              disabled={loading}
            >
              Next
            </Button>
          </div>
        </>
      )}
    </Container>
  );
}

export default HomePage;
// This is the main page of the app, where users can view and search for games.
// It fetches games from the RAWG API and displays them in a grid format.