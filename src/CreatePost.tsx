import LeftMenu from "./LeftMenu";
import { Link, Form} from "react-router-dom";
import "./CreatePost.css";
import mongoose from 'mongoose';
import Recipe_data from '../server/models/schemas.js';

export default function CreatePost() {
  
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
          <Form method="post" action="/create">
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
          </Form>
        </div>
      </div>
    </>
  );
}

export const createRecipe = async ({ request }) => {
  const data = await request.formData();

  const recipeData = {
    name: data.get('recipe_name'),
    ingredients: data.get('ingred'),
    steps: data.get('step')
  }

  const newRecipe = new Recipe_data(recipeData);
  console.log(newRecipe);


  return null;
}