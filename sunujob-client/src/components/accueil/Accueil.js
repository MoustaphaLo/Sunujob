import React, { Component } from "react";
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import Register from "../auth/Register";

class Accueil extends Component {
    onLogoutClick = e => {
        e.preventDefault();
        this.props.logoutUser();
    };

    render() {
        // const { user } = this.props.auth;  {user.nom.split(" ")[0]}
        const user = JSON.parse(localStorage.getItem('document'));

        return (
            <div /*style={{ height: "75vh" }} className="container valign-wrapper"*/>

                <div className="col s12 center-align">
                    <div className="col s12 center-align"><br /> <br />
                        <h4>
                            <th className="col s12 center-align">
                                <td>{user.prenom}</td>
                                <td>{user.nom}</td>
                            </th>
                        </h4>
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