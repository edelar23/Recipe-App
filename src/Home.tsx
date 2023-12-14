import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import PostComponent from './post';
import LeftMenu from './LeftMenu';
import './Home.css'; // Create a CSS file for styling


function Home() {
  const authContext = useContext(AuthContext);

  // Check if the user is authenticated and get user information
  const isAuthenticated = authContext && authContext.isAuthenticated;
  const user = authContext && authContext.user;

  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3000/getPosts');
        const data = await response.json();
        console.log(data)
        setPosts(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []); // Empty dependency array means this effect runs once when the component mounts

  const handleTagSelect = (selectedTags) => {
    // Filter posts based on selected tags
    const filtered = posts.filter((post) => {
      const postTags = post.tags.split(','); // Assuming tags are stored as a comma-separated string
      return selectedTags.every((tag) => postTags.includes(tag));
    });

    setFilteredPosts(filtered);
  };


  return (
    <div className="home-container">
      {isAuthenticated && (
        <div className="greeting">
          <p>Hello, {user && user.name}! This is who is signed in.</p>
        </div>
      )}



{posts.map(post => (
        <PostComponent key={post.id} post={post} />
      ))}

      
      <LeftMenu />
    </div>
  );
}

export default Home;
