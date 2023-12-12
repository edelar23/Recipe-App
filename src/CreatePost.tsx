import React, { useContext, ChangeEvent, FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import LeftMenu from "./LeftMenu";
import { AuthContext } from "./AuthContext";
import "./CreatePost.css";

interface PostData {
  user_id: string;
  recipeName: string;
  tags: string;
  imageFile: File | null;
  ingredients: string;
  prepTime: string;
  cookTime: string;
  steps: string;
}

export default function CreatePost() {
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();

  const [postData, setPostData] = useState<PostData>({
    user_id: "",
    recipeName: "",
    tags: "",
    imageFile: null,
    ingredients: "",
    prepTime: "",
    cookTime: "",
    steps: "",
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setPostData((prevData) => ({
      ...prevData,
      [name]: type === "file" ? (e.target as HTMLInputElement).files?.[0] || null : value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!authContext || !authContext.isAuthenticated || !authContext.user) {
      console.log("You are not authenticated. Please sign in to create a post.");
      return;
    }

    const user = authContext.user;
    const formData = new FormData();
    
    formData.append("user_id", user.id);
    formData.append("recipeName", postData.recipeName);
    formData.append("tags", postData.tags);
    formData.append("ingredients", postData.ingredients);
    formData.append("prepTime", postData.prepTime);
    formData.append("cookTime", postData.cookTime);
    formData.append("steps", postData.steps);

    if (postData.imageFile) {
      formData.append("imageFile", postData.imageFile);
    }

    console.log("Form Data Before Sending:", formData);
    console.log(postData);

    try {
      const response = await fetch("http://localhost:3000/create", {
        method: "POST",
        body: formData,
      });

      const request = await fetch(`https://api.calorieninjas.com/v1/nutrition?query=${postData.recipeName}`, {
        headers: {
          'X-Api-Key': '7MMnvXI5/I4O01isnv8xqA==PlZmqMGZk6yKtejY'
        }
      });

      const data = await request.json();
      console.log(data.items[0]);

      if (response.ok) {
        console.log("Post created successfully");
        //navigate("/home");
      } else {
        console.error("Error creating post on the client side");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <LeftMenu />
      <div className="back-button">
        <Link to="/home">
          <button>Back</button>
        </Link>
      </div>
      <div className="create-post-container">
        <div className="left-panel">
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <div className="input-div">
                <label htmlFor="recipeName">Recipe Name</label>
                <input
                  type="text"
                  id="recipeName"
                  name="recipeName"
                  value={postData.recipeName}
                  onChange={handleInputChange}
                />
                <label htmlFor="tags">Add Tags</label>
                <input
                  type="text"
                  id="tags"
                  name="tags"
                  value={postData.tags}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="input-group">
              <label htmlFor="imageFile">Insert Image/File</label>
              <input
                type="file"
                id="imageFile"
                name="imageFile"
                accept="image/*, .pdf"
                onChange={handleInputChange}
              />
            </div>

            {/* Additional input groups go here */}

            <div className="align">
              <label htmlFor="steps">Steps</label>
              <textarea
                id="steps"
                name="steps"
                rows={10}
                value={postData.steps}
                onChange={handleInputChange}
              ></textarea>
              <div className="gray-box">Format Text Options</div>
              <button className="btn" type="submit">
                Create Post
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
