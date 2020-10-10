import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { registerUser } from "../../actions/authActions";
import classnames from "classnames";
import { FaUserAlt, FaUserLock, FaUserCircle } from 'react-icons/fa';
import { InputGroup, InputGroupText, InputGroupAddon, Input } from 'reactstrap';


class Register extends Component {
    constructor() {
        super();
        this.state = {
            nom: "",
            prenom: "",
            email: "",
            password: "",
            passwordConfirm: "",
            errors: {}
        };
    }

    componentDidMount() {
        if (this.props.auth.isAuthenticated) {
            this.props.history.push("/accueil");
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }
    }

    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    };

    onSubmit = e => {
        e.preventDefault();

        const newUser = {
            nom: this.state.nom,
            prenom: this.state.prenom,
            email: this.state.email,
            password: this.state.password,
            passwordConfirm: this.state.passwordConfirm
        };
        this.props.registerUser(newUser, this.props.history);
    };

    render() {
        const { errors } = this.state;

        return (
            <div className="container">
                <div className="row">
                    <div className="col s8 offset-s2">
                        <Link to="/" className="btn-flat waves-effect">
                            <i className="material-icons left">keyboard_backspace</i>Retour à l'accueil
                        </Link>
                        <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                            <h4>
                                <b>Register</b>
                            </h4>
                            <p className="grey-text text-darken-l">
                                Vous avez déjà un compte? <Link to="/login">Login</Link>
                            </p>
                        </div>
                        <form noValidate onSubmit={this.onSubmit}>

                            <div className="input-field col s12">
                                <input onChange={this.onChange}
                                    value={this.state.nom}
                                    error={errors.nom}
                                    id="nom"
                                    type="text"
                                    className={classnames("", {
                                        invalid: errors.nom
                                    })} />
                                <label htmlFor="nom">Nom</label>
                                <span className="red-text">{errors.nom}</span>
                            </div>

                            <div className="input-field col s12">
                                    <input onChange={this.onChange}
                                        value={this.state.prenom}
                                        error={errors.prenom}
                                        id="prenom"
                                        type="text"
                                        className={classnames("", {
                                            invalid: errors.prenom
                                        })} />
                                <label htmlFor="prenom">Prenom</label>
                                <span className="red-text">{errors.prenom}</span>
                            </div>

                            <div className="input-field col s12">
                                <input onChange={this.onChange}
                                    value={this.state.email}
                                    error={errors.email}
                                    id="email"
                                    type="email"
                                    className={classnames("", {
                                        invalid: errors.email
                                    })} />
                                <label htmlFor="email">Email</label>
                                <span className="red-text">{errors.email}</span>
                            </div>

                            <div className="input-field col s12">
                                <input onChange={this.onChange}
                                    value={this.state.password}
                                    error={errors.password}
                                    id="password"
                                    type="password"
                                    className={classnames("", {
                                        invalid: errors.password
                                    })} />
                                <label htmlFor="password">Password</label>
                                <span className="red-text">{errors.password}</span>
                            </div>

                            <div className="input-field col s12">
                                <input onChange={this.onChange}
                                    value={this.state.passwordConfirm}
                                    error={errors.passwordConfirm}
                                    id="passwordConfirm"
                                    icon="lock"
                                    type="password"
                                    className={classnames("", {
                                        invalid: errors.passwordConfirm
                                    })} />
                                <label htmlFor="passwordConfirm">Confirm Password</label>
                                <span className="red-text">{errors.passwordConfirm}</span>
                            </div>
                            <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                                <button
                                    style={{
                                        width: "150px",
                                        borderRadius: "3px",
                                        letterSpacing: "1.5px",
                                        marginTop: "1rem"
                                    }}
                                    type="submit"
                                    className="btn btn-large waves-effect waves-light hoverable blue accent-3">
                                    Sign up
                                  </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

Register.propTypes = {
    registerUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(
    mapStateToProps,
    { registerUser }
)(withRouter(Register));