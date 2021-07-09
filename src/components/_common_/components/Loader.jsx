import React from "react";
import classnames from "classnames";

const Loader = ({ className }) => {
  const wrapperClassName = classnames("default-section__wrapper col-12 col-sm-9 col-xl-10 overflow-hidden px-0 d-flex align-items-center justify-content-center section-loader", {
    [className]: className,
  });
  return (
      <div className={wrapperClassName}>
        <span className="spinner-border spinner-border-sm text-primary" role="status" aria-hidden="true" />
      </div>
  );
};

export default Loader;
