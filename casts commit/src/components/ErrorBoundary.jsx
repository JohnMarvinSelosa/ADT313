import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-container" style={{ 
          padding: '20px',
          margin: '20px',
          border: '1px solid #ccc',
          borderRadius: '4px',
          backgroundColor: '#f8f8f8'
        }}>
          <h1 style={{ color: '#d32f2f' }}>Oops! Something went wrong</h1>
          <p>{this.state.error && this.state.error.toString()}</p>
          <div style={{ marginTop: '20px' }}>
            <a href="/" style={{
              textDecoration: 'none',
              padding: '10px 20px',
              backgroundColor: '#1976d2',
              color: 'white',
              borderRadius: '4px'
            }}>Go Back Home</a>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
