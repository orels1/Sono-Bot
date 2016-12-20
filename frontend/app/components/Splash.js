import React from 'react';
import {Link} from 'react-router';

class Splash extends React.Component {
    constructor(props) {
        super(props);
        // We are getting state from our store
        // this.state = HomeStore.getState();
        // And listen to any changes to get the two-way binding
        this.onChange = this.onChange.bind(this);
        this.style = `
            body {
                background: linear-gradient(315deg, #31d4eb, #5d00aa);
                background-size: 400% 400%;


                -webkit-animation: blueish-bg 40s ease infinite;
                -moz-animation: blueish-bg 40s ease infinite;
                animation: blueish-bg 40s ease infinite;
            }
            
            @-webkit-keyframes blueish-bg {
                0% {
                    background-position: 1% 0%;
                }
                50% {
                    background-position: 99% 100%;
                }
                100% {
                    background-position: 1% 0%;
                }
            }

            @-moz-keyframes blueish-bg {
                0% {
                    background-position: 1% 0%;
                }
                50% {
                    background-position: 99% 100%;
                }
                100% {
                    background-position: 1% 0%;
                }
            }

            @keyframes blueish-bg  {
                0% {
                    background-position: 1% 0%;
                }
                50% {
                    background-position: 99% 100%;
                }
                100% {
                    background-position: 1% 0%;
                }
            }

            html, body, .container-table, #app, #app div:first-child {
                height: 100%;
            }
        `;
    }

    componentDidMount() {
        // Will fire once, after markup has been injected
        // HomeStore.listen(this.onChange);
    }

    componentWillUnmount() {
        // Will fire once before markup has been removed
        // HomeStore.unlisten(this.onChange);
    }

    onChange(state) {
        // We are listening to the store here and apply changes to this.state accodingly
        this.setState(state);
    }

    render() {
        return (
            <div className="container-table">
                <style>
                    {this.style}
                </style>
            <div className="row vertical-center-row">
                <div className="logo text-xs-center col-xs-12 col-sm-12 col-md-12 col-lg-6 offset-lg-3">
                    <img src="img/logo-transparent.png" width="30%" />
                    <div className="title">Sono-Bot</div>
                    <small>A proper bot for advanced streamers</small>
                    <br />
                    <Link
                        to="/dashboard"
                        style={{
                            'marginTop': '20px',
                        }}
                        className="btn btn-default btn-pill btn-outline-white"
                    >
                        Open Dashboard
                    </Link>
                </div>
            </div>
        </div>
        );
    }
}

export default Splash;
