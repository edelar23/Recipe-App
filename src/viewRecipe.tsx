import LeftMenu from "./LeftMenu";
import { Link } from "react-router-dom";
import "./viewRecipe.css";

export default function ViewRecipe() {
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
          <div className="recipe_name">Chicken Fettuccine Alfredo</div>
          <div className="triple_content">
            <img
              className="pic"
              src="https://www.budgetbytes.com/wp-content/uploads/2022/07/Chicken-Alfredo-above-500x500.jpg"
              alt="dish picture"
            />
            <div className="ingred">
              <p className="header">Ingredients</p>
              <div className="list">
                <li>Chicken breasts</li>
                <li>Lemon juice</li>
                <li>Heavy cream</li>
                <li>Neufchatel cheese</li>
              </div>
            </div>
            <div className="macros"></div>
          </div>
          <div className="steps_container">
            <p className="header">Steps</p>
            <div className="subheader">
              <p>1. Marinate the chicken.</p>
            </div>
            <div className="deep_header">
                <p>Slice the chicken breasts into strips and place them in a medium bowl. On top of the chicken, add salt, black pepper, lemon juice, and olive oil. Mix the chicken with the flavorings until the chicken is well-coated. Cover the chicken and allow it to marinate in the refrigerator for as little as 30 minutes or up to 2 hours.</p>
            </div>
            <div className="subheader">
              <p>2. Brown the chicken. </p>
            </div>
            <div className="deep_header">
                <p>Once the chicken has marinated, place it in a large stockpot on the stove with neutral oil and butter. Spread the chicken out into an even layer to allow for even cooking. Once a piece of chicken has browned on one side, flip it over to brown on the other side. After all of the chicken has browned on both sides, remove it to a plate and set it aside, leaving any liquid still in the stockpot.</p>
            </div>
            <div className="subheader">
              <p>3. Prepare the alfredo sauce. </p>
            </div>
            <div className="deep_header">
                <p>To the liquid remaining in the stockpot, add the minced garlic. Stir the garlic into the liquid and let it cook for 30 seconds to 1 minute. Then add in the heavy cream and Neufchâtel cheese and stir those into the garlic, letting the cheese melt slowly.</p>
            </div>
            <div className="subheader">
              <p>4. Cook the pasta. </p>
            </div>
            <div className="deep_header">
                <p>While the minced garlic is cooking, begin cooking the pasta. Follow the package directions to cook the pasta to al dente. Once cooked, do not drain the pasta.</p>
            </div>
            <div className="subheader">
              <p>5. Combine everything. </p>
            </div>
            <div className="deep_header">
                <p>When the fettuccine has finished cooking, remove it from the heat and add all of the pasta to the simmering alfredo sauce. Stir the fettuccine and sauce together and add in the grated Parmesan cheese, mixing it in until well-combined. Remove the mixture from the heat and add back in the browned chicken. Mix it into the pasta to ensure it is fully coated by the sauce. When serving, sprinkle on some fresh parsley and Parmesan cheese. Serve immediately.</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
