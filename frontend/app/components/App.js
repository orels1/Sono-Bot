/**
 * Main container components
 * Defines site-wide elements
 */
import React from 'react';
import Sidebar from './Sidebar';
import Topbar from './Topbar';

class App extends React.Component {
    render() {
        return (
            <div>
                <Topbar />
                <Sidebar history={this.props.history} />
                <div className="app">
                    {this.props.children}
                </div>
            </div>
        );
    }
}

export default App;
