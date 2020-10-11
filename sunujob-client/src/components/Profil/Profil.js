import React, { Component, useEffect, useContext } from "react";
import axios from 'axios';
import { userInfos } from "./../../actions/authActions";
import { UserContext } from './../../App';

class Profil extends Component {

    constructor(props) {
        super(props)
        this.state = {
        };
    }

    render() {

        const user = JSON.parse(localStorage.getItem('document'));
        return (
            <div className="col s12 center-align">
                <h5 className="col s12 center-align">
                    <th className="col s12 center-align"><br />
                        <tr>Nom</tr> <br/>
                        <tr>Prenom</tr><br />
                        <tr>Email</tr>
                    </th>
                    <th className="col s12 center-align"> <br />
                        <tr>{user.nom}</tr><br />
                        <tr>{user.prenom}</tr> <br />
                        <tr>{user.email}</tr>
                    </th>
                </h5>
            </div>
        );
    }
}

export default Profil;