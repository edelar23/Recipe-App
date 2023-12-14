// ProfilePage.js

import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./ProfilePage.css";
import { AuthContext } from "./AuthContext";
import LeftMenu from "./LeftMenu";
import PostComponent from "./post";


const ProfilePage = () => {
  const authContext = useContext(AuthContext);
  const { userId } = useParams(); // Assuming your route has a parameter for userId
  const [userPosts, setUserPosts] = useState([]);
  const isAuthenticated = authContext && authContext.isAuthenticated;
  const user = authContext && authContext.user;

  useEffect(() => {
    const fetchUserPosts = async () => {
      try {
        if (authContext.isAuthenticated && authContext.user) {
          const response = await fetch(`http://localhost:3000/getPosts/${authContext.user.id}`);
          const data = await response.json();
          setUserPosts(data);
        }
      } catch (error) {
        console.error('Error fetching user posts:', error);
      }
    };

    fetchUserPosts();
  }, [authContext.isAuthenticated, authContext.user]);

  return (
    <>
      <LeftMenu />
      <div className="top">
        <div className="pf_holder">
          <img
            className="pf"
            src="https://as2.ftcdn.net/v2/jpg/06/11/08/25/500_F_611082538_Vi6DXlDF3k1oMHveIMRlRSc190nXdGW4.jpg"
            alt="pfp"
          />
          {authContext.isAuthenticated && authContext.user && (
            <div className="user-details">
              <p className="user">@{authContext.user.name}</p>
              <p className="email">{authContext.user.email}</p>
            </div>
          )}
        </div>
      </div>

      <div className="user-posts">
        <h2>User's Posts</h2>
        {userPosts.map((post) => (
          <PostComponent key={post.id} post={post} />
        ))}
      </div>
    </>
  );
};

export default ProfilePage;