import React from "react";

import "./page-container.styles.scss";

const PageContainer = (props: any) => {
  return (
    <div className="page-container">
      <div className="page-container__content">{props.children}</div>
    </div>
  );
};

export default PageContainer;
