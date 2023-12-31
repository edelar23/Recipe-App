import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './post.css';

const PostComponent = ( {post} ) => {

  const {id, user_id, recipeName, tags, imageFile, ingredients, steps, calories, protein, carbs, caption, prepTime, cookTime} = post;

  return (
    <div className="post">
      <div className="post-info">
        <img
          className="profile-pic"
          src={prepTime}
          alt="pfp"
        />
        <div className="post-text-wrap">
          <div className="post-user">
            <p id="user-name">@{cookTime}</p> <p id="user-at"></p>
          </div>
        </div>
      </div>

      <div className="dish-text">
        <p className="dish-p" id="dish-name">
          {recipeName}
        </p>
        <p className="dish-p">
          {caption}
        </p>
      </div>

      <div className="dish-pic-wrap">
        <img
          className="dish-pic"
          src={imageFile}
          alt="picture of food"
          onLoad={() => console.log("loaded", imageFile)}
          onError={() => console.log("error", imageFile)}
        />
      </div>

      <div className="actions">
        <Link id="view-R" to={`/view/${id}`}>View Recipe</Link>
        <div className="save">
        <p>Like</p>

        </div>
      </div>
    </div>
  );
};

export default PostComponent;
