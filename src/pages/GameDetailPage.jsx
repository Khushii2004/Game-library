import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import "../css/GameDetail.css";

const GameDetailPage = () => {
  const { id } = useParams();
  const [game, setGame] = useState(null);
  const [screenshots, setScreenshots] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [showFullRequirements, setShowFullRequirements] = useState(false);

  const API_KEY = "369c08bdd6cb47b5ad7a59e698d378f6";

  useEffect(() => {
    const fetchGameDetails = async () => {
      try {
        const gameRes = await axios.get(`https://api.rawg.io/api/games/${id}`, {
          params: { key: API_KEY },
        });
        setGame(gameRes.data);

        const screenshotRes = await axios.get(
          `https://api.rawg.io/api/games/${id}/screenshots`,
          { params: { key: API_KEY } }
        );
        setScreenshots(screenshotRes.data.results || []);
      } catch (err) {
        console.error("Failed to fetch game details:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchGameDetails();
  }, [id]);

  if (isLoading) return <div className="text-center mt-5">Loading game details...</div>;
  if (!game) return <div className="text-center mt-5">Game not found.</div>;

  const renderToggleButton = (text, toggleFn, isExpanded) => (
    <Button
      size="sm"
      variant="outline-secondary"
      className="toggle-description-btn mt-2"
      onClick={toggleFn}
    >
      {isExpanded ? "See Less" : "See More"}
    </Button>
  );

  return (
    <Container className="game-detail py-4">
      <Button as={Link} to="/" variant="outline-primary" className="mb-4">
        ← Back to Home
      </Button>

      <Card>
        <Card.Body>
          <h2 className="mb-3">{game.name}</h2>
          <Row>
            <Col md={6}>
              <img
                src={game.background_image}
                alt={game.name}
                className="img-fluid rounded"
              />
            </Col>

            <Col md={6}>
              <section className="mb-4">
                <h5>Description</h5>
                <p className={`description-text ${showFullDescription ? "expanded" : ""}`}>
                  {game.description_raw || "No description available."}
                </p>
                {game.description_raw?.length > 300 &&
                  renderToggleButton("description", () => setShowFullDescription(prev => !prev), showFullDescription)}
              </section>

              <section className="mb-4">
                <h5>Genres</h5>
                {game.genres?.map((genre) => (
                  <span key={genre.id} className="badge me-2">{genre.name}</span>
                ))}
              </section>

              <section className="mb-4">
                <h5>Rating</h5>
                <p>{game.rating ? `${game.rating} / 5` : "Not rated"}</p>
              </section>

              <section className="mb-4">
                <h5>Screenshots</h5>
                {screenshots.length > 0 ? (
                  <Row>
                    {screenshots.map((shot) => (
                      <Col xs={6} key={shot.id} className="mb-3">
                        <img
                          src={shot.image}
                          alt="Screenshot"
                          className="img-fluid rounded"
                        />
                      </Col>
                    ))}
                  </Row>
                ) : (
                  <p>No screenshots available.</p>
                )}
              </section>

              <section>
                <h5>System Requirements</h5>
                <p className={`requirements-text ${showFullRequirements ? "expanded" : ""}`}>
                  {game.platforms?.[0]?.requirements?.minimum || "Not available"}
                </p>
                {game.platforms?.[0]?.requirements?.minimum?.length > 300 &&
                  renderToggleButton("requirements", () =>
                    setShowFullRequirements(prev => !prev), showFullRequirements)}
              </section>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default GameDetailPage;
