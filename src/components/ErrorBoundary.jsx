import { Component } from 'react'

class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh',
          padding: '20px',
          textAlign: 'center',
          background: 'var(--bg)',
          color: 'var(--text-1)'
        }}>
          <div style={{
            fontSize: '48px',
            marginBottom: '20px',
            color: 'var(--accent)'
          }}>
            ⚠️
          </div>
          <h2 style={{
            fontSize: '24px',
            fontWeight: '800',
            marginBottom: '12px',
            fontFamily: 'Syne, sans-serif'
          }}>
            SOMETHING WENT WRONG
          </h2>
          <p style={{
            fontSize: '14px',
            color: 'var(--text-2)',
            marginBottom: '24px',
            maxWidth: '400px'
          }}>
            An unexpected error occurred. Please refresh the page or try again later.
          </p>
          <button
            onClick={() => window.location.reload()}
            style={{
              padding: '12px 24px',
              background: 'var(--accent)',
              color: '#000',
              border: 'none',
              borderRadius: '8px',
              fontSize: '13px',
              fontWeight: '700',
              fontFamily: 'Space Grotesk, sans-serif',
              textTransform: 'uppercase',
              letterSpacing: '0.04em',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.target.style.background = 'var(--white)'
              e.target.style.transform = 'translateY(-2px)'
            }}
            onMouseLeave={(e) => {
              e.target.style.background = 'var(--accent)'
              e.target.style.transform = 'translateY(0)'
            }}
          >
            REFRESH PAGE
          </button>
          {process.env.NODE_ENV === 'development' && this.state.error && (
            <details style={{
              marginTop: '24px',
              padding: '16px',
              background: 'var(--surface)',
              border: '1px solid var(--border)',
              borderRadius: '8px',
              textAlign: 'left',
              maxWidth: '600px',
              fontSize: '12px',
              color: 'var(--text-2)'
            }}>
              <summary style={{
                cursor: 'pointer',
                fontWeight: '600',
                color: 'var(--accent)',
                marginBottom: '8px'
              }}>
                ERROR DETAILS (DEV ONLY)
              </summary>
              <pre style={{
                whiteSpace: 'pre-wrap',
                wordBreak: 'break-word',
                margin: 0
              }}>
                {this.state.error.toString()}
              </pre>
            </details>
          )}
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
