
import './post.css';

const PostComponent = () => {
  return (
    <div className="post">
      <div className="post-info">
        <img
          className="profile-pic"
          src="https://i.seadn.io/gae/byB5ArJ2sPDf2QkE_U-zHXK2fmorLggU3qj-K58DtKEpub_2aXo0768kMM5cqeaNOPhS6wapUDAtv2rTZXsz3vtcY1Jzep1II1pmujg?auto=format&dpr=1&w=1000"
          alt="pfp"
        />
        <div className="post-text-wrap">
          <div className="post-user">
            <p id="user-name">Mr. Chef</p> <p id="user-at">@beginner_chef</p>
          </div>
        </div>
      </div>

      <div className="dish-text">
        <p className="dish-p" id="dish-name">
          Chicken Alfredo
        </p>
        <p className="dish-p">
          Hello! This is my first post on Recipe-ify and this is my take on
          Chicken Alfredo.
        </p>
      </div>

      <div className="dish-pic-wrap">
        <img
          className="dish-pic"
          src="https://www.budgetbytes.com/wp-content/uploads/2022/07/Chicken-Alfredo-above-500x500.jpg"
          alt="picture of food"
        />
      </div>

      <div className="actions">
        <p id="view-R">View Recipe</p>
        <div className="save">
          <p>Comment</p>
          <p>Bookmark</p>
          <p>Like</p>
          <p>Share</p>
        </div>
      </div>
    </div>
  );
};

export default PostComponent;
