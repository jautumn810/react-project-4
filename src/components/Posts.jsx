import React, { useState, useEffect, useCallback } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import "./Posts.css";

const Post = ({ listMode }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchId, setSearchId] = useState(id || '');

  // Fetch a single post
  const fetchPost = useCallback(async () => {
    if (!id && !searchId) return;
    try {
      setLoading(true);
      setError(null);
      const { data } = await axios.get(`https://jsonplaceholder.typicode.com/posts/${searchId || id}`);
      setPost(data);
    } catch (err) {
      setError(err.message || 'Failed to fetch post');
      setPost(null);
    } finally {
      setLoading(false);
    }
  }, [searchId, id]);

  // Fetch all posts for list mode
  const fetchPosts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const { data } = await axios.get('https://jsonplaceholder.typicode.com/posts');
      setPosts(data);
    } catch (err) {
      setError(err.message || 'Failed to fetch posts');
      setPosts([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleSearch = () => {
    if (searchId) {
      navigate(`/posts/${searchId}`);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  useEffect(() => {
    if (listMode) {
      fetchPosts();
    } else {
      fetchPost();
    }
  }, [listMode, fetchPost, fetchPosts]);

  

  const LoadingSkeleton = () => (
    <div className="loading-skeleton">
      <div className="post__title">Loading...</div>
      <p className="post__body">Loading...</p>
    </div>
  );

  if (listMode) {
    return (
      <div className="container">
        <h2>All Posts</h2>
        {loading && <LoadingSkeleton />}
        {error && (
          <div className="error">
            <h2>Error Loading Posts</h2>
            <p>{error}</p>
            <button onClick={fetchPosts}>Try Again</button>
          </div>
        )}
        {!loading && !error && (
          <div className="post-list">
            {posts.map((post) => (
              <div key={post.id} className="post-list-item" onClick={() => navigate(`/posts/${post.id}`)} role="button" tabIndex={0}>
                <h3>{post.title}</h3>
                <p>{post.body.slice(0, 80)}...</p>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="container">
      <div className="back-button">
        <Link to="/posts">
          <button>← Back to Posts</button>
        </Link>
      </div>
      <div className="row">
        <div className="search-section">
          <div className="search-container">
            <label htmlFor="search-input" className="search-label">
              Search by Post ID
            </label>
            <input
              id="search-input"
              className="search-input"
              type="number"
              value={searchId}
              onChange={(event) => setSearchId(event.target.value)}
              onKeyDown={handleKeyDown}
              min="1"
              placeholder="Enter post ID"
            />
            <button className="search-button" onClick={handleSearch}>
              Search Post
            </button>
            <div className="keyboard-hint">
              Press <kbd>Enter</kbd> to search
            </div>
          </div>
        </div>
        <div className="post-content">
          {loading && <LoadingSkeleton />}
          {error && (
            <div className="error">
              <h2>Error Loading Post</h2>
              <p>{error}</p>
              <button onClick={fetchPost}>Try Again</button>
            </div>
          )}
          {!loading && !error && post && (
            <div className="post">
              <div className="post__title">{post.title}</div>
              <p className="post__body">{post.body}</p>
              <div className="post-navigation">
                <div className="nav-buttons">
                  <button
                    className="nav-button"
                    onClick={() => {
                      const prevId = Math.max(1, post.id - 1);
                      navigate(`/posts/${prevId}`);
                    }}
                    disabled={post.id <= 1}
                  >
                    ← Previous Post
                  </button>
                  <button
                    className="nav-button primary"
                    onClick={() => {
                      const nextId = post.id + 1;
                      navigate(`/posts/${nextId}`);
                    }}
                  >
                    Next Post →
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Post;
