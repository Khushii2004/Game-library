import React from "react";
import { Card, Button, Badge } from "react-bootstrap";
import { FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addBookmark } from "../redux/bookMarkSlice";
import "../css/GameCard.css";

const GameCard = ({ game }) => {
  const dispatch = useDispatch();

  const bookmarks = useSelector((state) => state.bookmarks.bookmarks) || [];
  const isBookmarked = bookmarks.some((item) => item.id === game.id);

  const tags = game.tags?.slice(0, 2) || [];

  return (
    <Card className="game-card m-4 flex-grow-1">
      <Card.Img
        variant="top"
        src={game.background_image}
        alt={game.name}
        className="img-fluid"
      />
      <Card.Body>
        <Card.Title className="card-title">{game.name}</Card.Title>

        <Card.Text className="text-muted">
          {game.released || "Release Date: TBD"}
        </Card.Text>

        {tags.length > 0 && (
          <div className="tags d-flex flex-wrap gap-1 mb-2">
            {tags.map((tag, index) => (
              <Badge key={index} bg="secondary">
                {typeof tag === "object" ? tag.name : tag}
              </Badge>
            ))}
          </div>
        )}

        <div className="rating d-flex align-items-center mb-3">
          <FaStar className="text-warning me-1" />
          <span>{game.rating ? `${game.rating}/5` : "Not rated"}</span>
        </div>

        <div className="d-flex flex-wrap gap-3">
          <Button
            as={Link}
            to={`/game/${game.id}`}
            variant="primary"
            className="view-btn"
          >
            View Details
          </Button>

          <Button
            variant={isBookmarked ? "success" : "outline-primary"}
            className="view-btn"
            disabled={isBookmarked}
            onClick={() => {
              if (!isBookmarked) dispatch(addBookmark(game));
            }}
          >
            {isBookmarked ? "Added" : "Add to Library"}
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default GameCard;
