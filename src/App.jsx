import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { SignedIn, SignedOut } from '@clerk/clerk-react';
import './css/App.css'; // Custom styles first
import 'bootstrap/dist/css/bootstrap.min.css'; // Then Bootstrap
import HomePage from './pages/HomePage';
import GameDetailPage from './pages/GameDetailPage';
import LibraryPage from './pages/LibraryPage';
import MainLayout from './components/MainLayout'; // We’ll create this

const App = () => {
  return (
    <Routes>
      {/* Home page with header and sidebar */}
      <Route
        path="/"
        element={
          <MainLayout>
            <HomePage />
          </MainLayout>
        }
      />
{/* I decided to wrap everything in MainLayout to keep the UI consistent*/}
      <Route
        path="/game/:id"
        element={
          <MainLayout>
            <GameDetailPage />
          </MainLayout>
        }
      />
      {/* Library page - protected by auth */}
      <Route
        path="/library"
        element={
          <>
            <SignedIn>
              <MainLayout>
                <LibraryPage />
              </MainLayout>
            </SignedIn>
            <SignedOut>
              <Navigate to="/" replace /> {/* Redirect to home if not signed in */}
            </SignedOut>
          </>
        }
      />
    </Routes>
  );
};

export default App;