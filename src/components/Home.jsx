import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../Home.css";

const Home = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const navigate = useNavigate();

  const fetchUsers = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const { data } = await axios.get("https://jsonplaceholder.typicode.com/users");
      setUsers(data);
    } catch (err) {
      setError(err.message || "Failed to fetch users");
      setUsers([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleUserClick = useCallback((userId) => {
    navigate(`/${userId}`);
  }, [navigate]);

  const handleKeyDown = useCallback((event, userId) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      handleUserClick(userId);
    }
  }, [handleUserClick]);

  // Filter users based on search term
  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle search input key navigation
  const handleSearchKeyDown = useCallback((event) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setSelectedIndex(prev => 
        prev < filteredUsers.length - 1 ? prev + 1 : 0
      );
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setSelectedIndex(prev => 
        prev > 0 ? prev - 1 : filteredUsers.length - 1
      );
    } else if (event.key === "Enter" && selectedIndex >= 0) {
      event.preventDefault();
      handleUserClick(filteredUsers[selectedIndex].id);
    }
  }, [filteredUsers, selectedIndex, handleUserClick]);

  // Reset selected index when search term changes
  useEffect(() => {
    setSelectedIndex(-1);
  }, [searchTerm]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  // Loading skeleton component
  const LoadingSkeleton = () => (
    <div className="user-list">
      {Array.from({ length: 6 }, (_, index) => (
        <div className="user loading" key={index}>
          <div className="user-card">
            <div className="user-card__container">
              <h3>Loading...</h3>
              <p><b>Email:</b> Loading...</p>
              <p><b>Phone:</b> Loading...</p>
              <p><b>Website:</b> Loading...</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  if (loading) {
    return (
      <div className="container">
        <div className="row">
          <div className="search-section">
            <div className="search-container">
              <label className="search-label">Search Users</label>
              <input
                className="search-input"
                type="text"
                placeholder="Search by name or email..."
                disabled
              />
              <div className="keyboard-hint">
                Use <kbd>↑</kbd> <kbd>↓</kbd> to navigate, <kbd>Enter</kbd> to select
              </div>
            </div>
          </div>
          <LoadingSkeleton />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container">
        <div className="row">
          <div className="search-section">
            <div className="search-container">
              <label className="search-label">Search Users</label>
              <input
                className="search-input"
                type="text"
                placeholder="Search by name or email..."
                disabled
              />
            </div>
          </div>
          <div className="error">
            <h2>Error Loading Users</h2>
            <p>{error}</p>
            <button onClick={fetchUsers}>Try Again</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="row">
        <div className="search-section">
          <div className="search-container">
            <label htmlFor="search-input" className="search-label">
              Search Users
            </label>
            <input
              id="search-input"
              className="search-input"
              type="text"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              onKeyDown={handleSearchKeyDown}
              placeholder="Search by name or email..."
              autoFocus
            />
            <div className="keyboard-hint">
              Use <kbd>↑</kbd> <kbd>↓</kbd> to navigate, <kbd>Enter</kbd> to select
            </div>
          </div>
        </div>
        
        <div className="user-list">
          {filteredUsers.length === 0 ? (
            <div className="error">
              <h2>No Users Found</h2>
              <p>Try adjusting your search terms.</p>
            </div>
          ) : (
            filteredUsers.map((user, index) => (
              <div
                className={`user ${index === selectedIndex ? 'selected' : ''}`}
                key={user.id}
                onClick={() => handleUserClick(user.id)}
                onKeyDown={(event) => handleKeyDown(event, user.id)}
                role="button"
                tabIndex={0}
                aria-label={`View details for ${user.name}`}
              >
                <div className="user-card">
                  <div className="user-card__container">
                    <h3>{user.name}</h3>
                    <p>
                      <b>Email:</b> {user.email}
                    </p>
                    <p>
                      <b>Phone:</b> {user.phone}
                    </p>
                    <p>
                      <b>Website:</b> {user.website}
                    </p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
     