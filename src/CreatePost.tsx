import LeftMenu from "./LeftMenu";
import { Link, useNavigate } from "react-router-dom";
import { useState, ChangeEvent, FormEvent } from "react";
import "./CreatePost.css";

interface PostData {
  recipeName: string;
  tags: string;
  imageFile: File | null;
  ingredients: string;
  prepTime: string;
  cookTime: string;
  steps: string;
}

export default function CreatePost() {
  const navigate = useNavigate();

  const [postData, setPostData] = useState<PostData>({
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
      [name]: type === "file" ? (e.target as HTMLInputElement).files?.[0] : value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("recipeName", postData.recipeName);
    formData.append("tags", postData.tags);
    formData.append("ingredients", postData.ingredients);
    formData.append("prepTime", postData.prepTime);
    formData.append("cookTime", postData.cookTime);
    formData.append("steps", postData.steps);

    if (postData.imageFile) {
      formData.append("imageFile", postData.imageFile);
    }

    try {
      const response = await fetch('http://localhost:3000/create', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        console.log('Post created successfully');
        navigate('/');
      } else {
        console.error('Error creating post');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };



 return (
    <>
      <LeftMenu />
      <div className="back-button">
        <Link to="/">
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
                  name="recipe_name"
                />
                <label htmlFor="tags">Add Tags</label>
                <input type="text" name="tag" id="tags" />
              </div>
            </div>

            <div className="input-group">
              <label htmlFor="imageFile">Insert Image/File</label>
              <input
                type="file"
                id="imageFile"
                name="img"
                accept="image/*, .pdf"
              />
            </div>

            <div className="input-group">
              <label htmlFor="ingredients">Ingredients</label>
              <textarea
                id="ingredients"
                name="ingred"
                rows={5}
              ></textarea>
            </div>

            <div className="input-group">
              <label htmlFor="prepTime">Prep Time</label>
              <input type="text" name="prepTime" id="prepTime" />
            </div>

            <div className="input-group">
              <label htmlFor="cookTime">Cook Time</label>
              <input type="text" id="cookTime" />
            </div>
            <div className="align">
              <label htmlFor="steps">Steps</label>
              <textarea
                id="steps"
                name="step"
                rows={10}
              ></textarea>
              <div className="gray-box">Format Text Options</div>
              <button className="btn" type="submit">Create Post</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
