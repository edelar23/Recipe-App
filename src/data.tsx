import React, { useState, useEffect } from 'react';
import axios from 'axios';

const datacomp = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // Fetch data when the component mounts
    axios.get('http://localhost:3000/getPosts')
      .then(response => {
        setPosts(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <div>
      <h1>Posts</h1>
      <ul>
        {posts.map(post => (
          <li key={post.id}>
            <p>{post.recipeName}</p>
            <p>{post.tags}</p>
            {/* Add more fields as needed */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
