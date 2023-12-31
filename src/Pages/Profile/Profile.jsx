// Tools
import React, { useState } from "react";
import { Outlet } from "react-router-dom";

// components
import CoverProflie from "./components/coverProfile/coverProfile";
import OptionBtn from "./components/optionBtns/optionsBtn";

// Css
import "./profile-stayling.css";
import "./components/details/details.css";

function Profile() {
  const [user, setUser] = useState(() => {
    return [];
  });

  const [show, setShow] = useState(true);

  return (
    <>
      <CoverProflie user={user} />
      {show && <OptionBtn />}
      {/* this this show the subRoots of the parent page */}
      <Outlet context={{ user: [user, setUser], show: [show, setShow] }} />
      {/* context => to share probs to child components */}
    </>
  );
}

export default Profile;
