// ProfilePage.js

import React, {  useContext, useEffect, useState } from "react";
import { useParams,} from "react-router-dom";
import "./ProfilePage.css"; // Import your styles
import { AuthContext } from './AuthContext';
import LeftMenu from "./LeftMenu";

const ProfilePage = () => {
  const authContext = useContext(AuthContext);

  const isAuthenticated = authContext && authContext.isAuthenticated;
  const user = authContext && authContext.user;

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
          <p className="user">@{user && user.name}</p>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
