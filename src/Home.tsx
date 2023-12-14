import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import PostComponent from './post';
import LeftMenu from './LeftMenu';
import { DietaryTagsDropdown } from './tags'; // Update the import path
import './Home.css'; // Create a CSS file for styling

function Home() {
  const authContext = useContext(AuthContext);
  const isAuthenticated = authContext && authContext.isAuthenticated;
  const user = authContext && authContext.user;

  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3000/getPosts');
        const data = await response.json();
        setPosts(data);
        setFilteredPosts(data); // Initialize filtered posts with all posts
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleTagsChange = (tags) => {
    // Update the selected tags, but don't filter immediately
    setSelectedTags(tags);
  };

  const handleFilter = () => {
    // Filter posts based on selected tags when the "Filter" button is clicked
    filterPosts(selectedTags);
  };

  const filterPosts = (tags) => {
    if (tags.length === 0) {
      // If no tags are selected, show all posts
      setFilteredPosts(posts);
    } else {
      // Filter posts based on selected tags
      const filtered = posts.filter((post) =>
        tags.every((tag) => post.tags.includes(tag))
      );
      setFilteredPosts(filtered);
    }
  };

  return (
    <div className="home-container">
      <div className="top-container">
        {isAuthenticated && (
          <div className="greeting">
            <p>Hello, {user && user.name}!</p>
          </div>
        )}
  
        <div className="filter-container">
          <DietaryTagsDropdown onTagsChange={handleTagsChange} />
          <button onClick={handleFilter}>Filter</button>
        </div>
      </div>
  
      <div className="posts-container">
        {filteredPosts.map((post) => (
          <PostComponent key={post.id} post={post} />
        ))}
      </div>
  
      <LeftMenu />
    </div>
  );
  
}

export default Home;
