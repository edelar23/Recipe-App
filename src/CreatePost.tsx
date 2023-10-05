import LeftMenu from './LeftMenu';
import { Link } from 'react-router-dom';
import "./CreatePost.css";

function CreatePost() {
  return (
    <>
    <LeftMenu/>
    <div className="back-button">
      <Link to="/">
          <button>Back</button>
      </Link>
        </div>
      <div className="create-post-container">
        <div className="left-panel">
          <div className="input-group">
            <div className="input-div">
                <label htmlFor="recipeName">Recipe Name</label>
                <input type="text" id="recipeName" />
                <label htmlFor="tags">Add Tags</label>
                <input type="text" id="tags" />
            </div>
          </div>

          <div className="input-group">
            <label htmlFor="imageFile">Insert Image/File</label>
            <input type="file" id="imageFile" accept="image/*, .pdf" />
          </div>

          <div className="input-group">
            <label htmlFor="ingredients">Ingredients</label>
            <textarea id="ingredients" rows={5}></textarea>
          </div>

          <div className="input-group">
            <label htmlFor="prepTime">Prep Time</label>
            <input type="text" id="prepTime" />
          </div>

          <div className="input-group">
            <label htmlFor="cookTime">Cook Time</label>
            <input type="text" id="cookTime" />
          </div>

         
            <div className='align'>
                <label htmlFor="steps">Steps</label>
                <textarea id="steps" rows={10}></textarea>
                <div className='gray-box'>Format Text Options</div>
            </div>
          </div>


      </div>
    </>
  );
}

export default CreatePost;