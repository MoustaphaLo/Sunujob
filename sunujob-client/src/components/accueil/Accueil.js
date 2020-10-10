import React, { Component } from "react";
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import { Navbar, Nav, Button, Form, FormControl } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { LinkContainer } from "react-router-bootstrap";

class Accueil extends Component {
    onLogoutClick = e => {
        e.preventDefault();
        this.props.logoutUser();
    };

    render() {
        const { user } = this.props.auth;

        return (
            <div /*style={{ height: "75vh" }} className="container valign-wrapper"*/>
                
                <div className="row">
                    <div className="col s12 center-align">
                        <h5>
                            {user.nom.split(" ")[0]}
                        </h5>
                        <button
                            style={{
                                borderRadius: "3px",
                                letterSpacing: "1.5px",
                                marginTop: "1rem"
                            }}
                            onClick={this.onLogoutClick}
                            className="btn btn-large waves-effect waves-light hoverable blue accent-3">
                            Logout
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

Accueil.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(
    mapStateToProps,
    { logoutUser }
)(Accueil);