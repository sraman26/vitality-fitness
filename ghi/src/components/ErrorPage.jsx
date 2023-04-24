import React from "react";

function ErrorPage() {
  return (
    <>
      <div className="error-background">
        <img
          className="error-img"
          src={require("../images/404-turtle.png")}
          alt=''
        ></img>
      </div>
    </>
  );
}

export default ErrorPage;
