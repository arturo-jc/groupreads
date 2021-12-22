import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';

export default class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false }
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    state = {
        errorBoundaryKey: 0
    };

    onClick = () => this.setState(() => ({ hasError: false }));

    render() {
        if (this.state.hasError) {
            return <Fragment>
                <div>Sorry, something went wrong</div>
                <Link to="/" onClick={this.onClick}>Back to home</Link>
            </Fragment>
        }
        return this.props.children;
    }
}
