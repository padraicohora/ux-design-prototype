import React, { useState, useEffect } from "react";
import Alert from "reactstrap/es/Alert";

const AlertFeedback = ({
  feedback,
  title,
  showClose,
  codeExceptions,
  onRetry,
  successMessage,
  errorMessage,
  contexts,
}) => {
  const retry = typeof onRetry === "function";

  const [isOpen, setIsOpen] = useState(!!feedback);

  useEffect(() => {
    if (feedback && !isOpen) {
      setIsOpen(true);
    }
  }, [feedback]);

  const handleAlertAction = () => {
    setIsOpen(!isOpen);
    // this is intended to retry the api request
    if (typeof onRetry === "function") {
      onRetry();
    }
  };


  // defaults
  let color = "transparent";
  let text = "";
  let heading = title;

  return (
      <Alert
      isOpen={isOpen}
      closeClassName={retry ? "icon-after-refresh" : null}
      color={color}
      className="my-3"
      toggle={(retry || showClose) ? handleAlertAction : null}
      >
          <p className="font-weight-medium mb-1">{heading}</p>
          <small className="d-block mb-1">{text}</small>
      </Alert>
  );
};

AlertFeedback.propTypes = propTypes;
AlertFeedback.defaultProps = defaultProps;
export default AlertFeedback;
