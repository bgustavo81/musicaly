import React, { Fragment } from "react";

const NotFound = () => {
  return (
    <Fragment>
      <h1 className="x-large text-primary">
        <i className="fas fa-exclamation-triangle" />
        Page not Found
      </h1>
      <p className="large">This page doesn't exist</p>
    </Fragment>
  );
};

export default NotFound;
