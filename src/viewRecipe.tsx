import LeftMenu from "./LeftMenu";
import React, { useEffect, useState } from 'react';
import { Link, useParams } from "react-router-dom";
import "./viewRecipe.css";



export default function ViewRecipe() {
  
  const { postId } = useParams();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3000/getPosts');
        const data = await response.json();
        console.log(data[postId - 1])
        setPosts(data[postId - 1]);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []); // Empty dependency array means this effect runs once when the component mounts

  return (
    <>
      <LeftMenu />
      <div className="back-button">
        <Link to="/home">
          <button>Back</button>
        </Link>
      </div>
      <div>
        <div className="info_container">
          <div className="recipe_name">{posts.recipeName}</div>
          <div className="triple_content">
            <img
              className="pic"
              src="https://www.budgetbytes.com/wp-content/uploads/2022/07/Chicken-Alfredo-above-500x500.jpg"
              alt="dish picture"
            />
            <div className="ingred">
              <p className="header">Ingredients</p>
              <ul className="list">
              {posts.ingredients && posts.ingredients.split(',').map((ingredient, index) => (
  <li key={index}>{ingredient.trim()}</li>
))}



              </ul>
            </div>
            <div className="macros"></div>
          </div>
          <div className="steps_container">
            <p className="header">Steps</p>
            <div className="subheader" >
            {posts.steps}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
