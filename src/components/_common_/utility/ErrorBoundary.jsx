import React from "react";
import { Button } from "reactstrap";
import { ERROR_ICON } from "../constants/icons";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
    };
  }

  // todo: translate view
  // todo: replace wth OATS jira link

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidUpdate(prevProps) {
    const { children } = this.props;
    if (prevProps.children.props.path !== children.props.path) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({ hasError: false });
    }
  }

  componentDidCatch() {}

  render() {
    const { hasError } = this.state;
    const { children } = this.props;

    if (hasError) {
      return (
        <div className="rounded background-danger-medium p-3 text-danger mt-4 mt-sm-0">
          <p className="font-weight-bold mb-1">
            Sorry, this page is not available right now.
          </p>
          <p>
            Our engineers have been alerted to this issue and will fix it as
            soon as possible, so please try again later.
          </p>
          <p>
            If the problem persists, you can report the issue
            {/* eslint-disable-next-line react/no-unescaped-entities */}
            to us using the "Report a Bug" button below.
          </p>
          <div className="d-inline-block">
            <Button color="danger">Report a bug</Button>
          </div>
        </div>
      );
    }

    return children;
  }
}

export default ErrorBoundary;
