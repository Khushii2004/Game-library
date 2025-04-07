import React from "react";
import { SignedIn, SignedOut, RedirectToSignIn } from "@clerk/clerk-react";
import { useSelector } from "react-redux";
import GameCard from "../components/GameCard.jsx";

const Library = () => {
  const favorites = useSelector((state) => state.favorites);

  return (
    <div className="container py-4">
      <SignedIn>
        <h1 className="mb-4">Your Library</h1>

        {favorites.length > 0 ? (
          <div className="row">
            {favorites.map((game) => (
              <div key={game.id} className="col-sm-6 col-md-4 mb-4">
                <GameCard game={game} />
              </div>
            ))}
          </div>
        ) : (
          <p className="text-muted">You haven't added any games to your library yet.</p>
        )}
      </SignedIn>

      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </div>
  );
};

export default Library;
