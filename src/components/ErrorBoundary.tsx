import { Component } from "react";
import type { ReactNode, ErrorInfo } from "react";

interface Props { children: ReactNode; }
interface State { error: Error | null; }

export class ErrorBoundary extends Component<Props, State> {
  state: State = { error: null };

  static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("ErrorBoundary caught:", error, info.componentStack);
  }

  render() {
    if (this.state.error) {
      return (
        <div className="min-h-screen flex items-center justify-center text-center px-6">
          <div>
            <p className="text-xs tracking-[6px] uppercase text-accent mb-4">Error</p>
            <h1 className="text-2xl font-black font-display mb-3">Something went wrong</h1>
            <p className="text-sm text-text-muted mb-6">Try refreshing the page.</p>
            <button
              onClick={() => this.setState({ error: null })}
              className="px-6 py-2.5 bg-accent text-bg-dark rounded-full text-sm font-semibold hover:bg-accent-light transition-colors"
            >
              Try again
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
