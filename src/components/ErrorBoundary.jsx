import { Component } from 'react';

/** Keeps a failing detail view from blanking the whole page; offers a way back. */
export default class ErrorBoundary extends Component {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  componentDidCatch(err) {
    console.error('Detail view failed:', err);
  }
  render() {
    if (!this.state.failed) return this.props.children;
    return (
      <div className="modal" role="alert">
        <div className="modal__bg" onClick={this.props.onClose} />
        <div className="modal__panel" style={{ padding: 24, display: 'grid', gap: 14 }}>
          <h2 className="h-md">Something went wrong</h2>
          <p>This view couldn’t load. Your place on the page is unchanged.</p>
          <button className="btn" onClick={this.props.onClose}>Close</button>
        </div>
      </div>
    );
  }
}
