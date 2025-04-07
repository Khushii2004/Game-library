import React, { useState } from "react";
import { Container } from "react-bootstrap";
import Header from "./Header";
import Sidebar from "./Sidebar";
import "../css/MainLayout.css";

const MainLayout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <Container fluid className="main-container">
      <Header
        onSearch={(query) => children.props.onSearch(query)}
        searchQuery={children.props.searchQuery}
        setSearchQuery={children.props.setSearchQuery}
        toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
      />
      <div className="layout-content">
        <div className={`sidebar-container ${isSidebarOpen ? "open" : ""}`}>
          <Sidebar onApplyFilters={children.props.onApplyFilters} />
        </div>
        <main>{children}</main>
      </div>
    </Container>
  );
};

export default MainLayout;