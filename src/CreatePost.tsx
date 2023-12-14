import React, { useContext, ChangeEvent, FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import LeftMenu from "./LeftMenu";
import { AuthContext } from "./AuthContext";
import { DietaryTagsDropdown } from "./tags";
import IngredientInput  from "./Ingredients"
import "./CreatePost.css";
import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes } from "firebase/storage";
import { v4 as uuidv4} from "uuid";
import { getDownloadURL } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyBLrDQHBEtImDScaEUxCukYGg4ipzXhkDY",
  authDomain: "recipe-app-86e28.firebaseapp.com",
  projectId: "recipe-app-86e28",
  storageBucket: "recipe-app-86e28.appspot.com",
  messagingSenderId: "552327482514",
  appId: "1:552327482514:web:3b90a235af6a22ed756a4b",
  measurementId: "G-WFCKPWH3CV"
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app); 

interface PostData {
  user_id: string;
  recipeName: string;
  tags: string;
  imageFile: File | null | Blob | string;
  ingredients: string;
  prepTime: string;
  cookTime: string;
  steps: string;
  calories: string;
  protein: string;
  carbs: string;
  caption: string;
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
    calories: "",
    protein: "",
    carbs: "",
    caption: "",
  });

  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const handleTagsChange = (tags: string[]) => {
    setSelectedTags(tags);
  };

  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);

  const handleIngredientChange = (ingredients: string[]) => {
    setSelectedIngredients(ingredients);
  };

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    setPostData((prevData) => ({
      ...prevData,
      [name]:
        type === "file"
          ? (e.target as HTMLInputElement).files?.[0] || null
          : value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!authContext || !authContext.isAuthenticated || !authContext.user) {
      console.log(
        "You are not authenticated. Please sign in to create a post."
      );
      return;
    }

    const user = authContext.user;
    const formData = new FormData();

    const request = await fetch(
      `https://api.calorieninjas.com/v1/nutrition?query=${postData.recipeName}`,
      {
        headers: {
          "X-Api-Key": "7MMnvXI5/I4O01isnv8xqA==PlZmqMGZk6yKtejY",
        },
      }
    );

    const data = await request.json();
    postData.calories = data.items[0].calories;
    postData.protein = data.items[0].protein_g;
    postData.carbs = data.items[0].carbohydrates_total_g;
    postData.tags = selectedTags.join(",");
    postData.cookTime = (user && user.name)
    postData.ingredients = selectedIngredients.join(",")
    console.log(data.items[0]);

    formData.append("user_id", user.id);
    formData.append("recipeName", postData.recipeName);
    formData.append("tags", postData.tags);
    formData.append("ingredients", postData.ingredients);
    formData.append("prepTime", postData.prepTime);
    formData.append("cookTime", postData.cookTime);
    formData.append("steps", postData.steps);
    formData.append("calories", postData.calories);
    formData.append("protein", postData.protein);
    formData.append("carbs", postData.carbs);
    formData.append("caption", postData.caption);


      const file = "https://as2.ftcdn.net/v2/jpg/06/11/08/25/500_F_611082538_Vi6DXlDF3k1oMHveIMRlRSc190nXdGW4.jpg"

    if (postData.imageFile) {
      const imageRef = ref(storage, `images/${uuidv4()}_${postData.imageFile.name}`);
      await uploadBytes(imageRef, postData.imageFile);
      const imageUrl = await getDownloadURL(imageRef);
      formData.append("imageFile", imageUrl);    }
    
    console.log("Form Data Before Sending:", formData);

    const formDataObject = {};
    formData.forEach((value, key) => {
      formDataObject[key] = value;
    });
    console.log(formDataObject);

    try {
      const response = await fetch("http://localhost:3000/create", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        console.log("Post created successfully");
        navigate("/home");
      } else {
        console.error("Error creating post on the client side");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const maxLength = 150;

  const handleTextareaChange = (e) => {
    if (e.target.value.length <= maxLength) {
      handleInputChange(e);
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
                <div className="textP">
                  <label htmlFor="recipeName">Recipe Name</label>
                  <input
                    className="nameA"
                    type="text"
                    id="recipeName"
                    name="recipeName"
                    value={postData.recipeName}
                    onChange={handleInputChange}
                  />
                  <label htmlFor="caption"> Caption </label>
                  <textarea
                    className="cap"
                    id="caption"
                    name="caption"
                    rows={5}
                    value={postData.caption}
                    onChange={handleTextareaChange}
                    maxLength={maxLength}
                  ></textarea>
                  <div
                    style={{
                      textAlign: "right",
                      color: "white",
                      fontSize: "13px",
                      marginTop: "10px"
                    }}
                  >
                    {postData.caption.length}/{maxLength} characters
                  </div>
                </div>
                <DietaryTagsDropdown onTagsChange={handleTagsChange} />
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

            <IngredientInput onIngredientChange={handleIngredientChange} />

            <div className="align">
              <label className="steps"htmlFor="steps">Steps</label>
              <textarea
                className="areaT"
                id="steps"
                name="steps"
                rows={20}
                value={postData.steps}
                onChange={handleInputChange}
              ></textarea>
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
