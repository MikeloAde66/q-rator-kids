import React, { Component, ReactNode } from 'react';
import { Button } from './ui/button';
import { RefreshCw, Home } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
    window.location.href = '/';
  };

  handleClearData = () => {
    if (confirm('Do you want to clear all saved data? This will reset everything!')) {
      try {
        localStorage.clear();
        sessionStorage.clear();
        window.location.href = '/';
      } catch (e) {
        console.error('Failed to clear storage:', e);
        window.location.href = '/';
      }
    }
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-gradient-to-b from-red-100 to-orange-100 flex items-center justify-center p-6">
          <div className="max-w-2xl w-full bg-white rounded-3xl shadow-2xl p-8 md:p-12 border-4 border-red-400 text-center space-y-6">
            <div className="text-8xl mb-4">😢</div>
            <h1 className="text-4xl md:text-5xl font-black text-gray-800">
              Oops! Something broke!
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 font-bold">
              Don't worry! We can fix this easily!
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
              <Button
                onClick={this.handleReset}
                size="lg"
                className="bg-gradient-to-r from-green-400 to-emerald-500 hover:from-green-500 hover:to-emerald-600 text-white text-xl font-black py-6 px-8 rounded-2xl shadow-lg"
              >
                <RefreshCw className="w-6 h-6 mr-2" />
                Try Again
              </Button>
              
              <Button
                onClick={this.handleClearData}
                size="lg"
                variant="outline"
                className="border-4 border-orange-400 text-orange-600 text-xl font-black py-6 px-8 rounded-2xl hover:bg-orange-50"
              >
                <Home className="w-6 h-6 mr-2" />
                Start Fresh
              </Button>
            </div>

            {process.env.NODE_ENV === 'development' && this.state.error && (
              <details className="mt-8 text-left bg-red-50 p-4 rounded-lg border-2 border-red-200">
                <summary className="cursor-pointer font-bold text-red-700">
                  Error Details (for developers)
                </summary>
                <pre className="mt-2 text-sm text-red-600 overflow-auto">
                  {this.state.error.toString()}
                  {this.state.error.stack}
                </pre>
              </details>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
