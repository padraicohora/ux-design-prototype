import React from "react";
import classnames from "classnames";
import * as ToastType from "../constants/toastTypes";
import {
  ERROR_ICON,
  SUCCESS_ICON,
} from "../constants/icons";

const Toast = ({
  title, text, type,
}) => {
  const toastClassName = classnames("d-flex", {
    [type]: type,
  });
  let toastIcon;

  switch (type) {
    case ToastType.ERROR: {
      toastIcon = ERROR_ICON;
      break;
    }
    case ToastType.SUCCESS: {
      toastIcon = SUCCESS_ICON;
      break;
    }
    case ToastType.WARNING: {
        toastIcon = ERROR_ICON;
      break;
    }
    default: {
      toastIcon = ERROR_ICON;
      break;
    }
  }

  return (
      <div className={toastClassName}>
          <div className="mr-2">
             icon
          </div>
          <div>
              <p className="mb-1 text-capitalize">{title}</p>
              <div className="small w-100">
                  {text}
              </div>
          </div>
      </div>
  );
};
export default Toast;
