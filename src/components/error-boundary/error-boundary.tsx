import { Component, type ReactNode } from "react";
import { Card, CardBody } from "@sun/components";

type ErrorBoundaryProps = {
  children: ReactNode;
};

type ErrorBoundaryState = {
  error: Error | null;
};

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { error };
  }

  componentDidCatch(error: Error, info: { componentStack: string }) {
    console.error("[ErrorBoundary]", error.message, info.componentStack);
  }

  render() {
    if (this.state.error) {
      return (
        <Card>
          <CardBody>
            <p style={{ color: "var(--destructive)" }}>
              {this.state.error.message}
            </p>
          </CardBody>
        </Card>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
