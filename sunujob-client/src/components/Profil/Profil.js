import React, { Component, useEffect, useContext } from "react";
import axios from 'axios';
import Avatar from "@material-ui/core/Avatar";
import Grid from '@material-ui/core/Grid';
import { userInfos } from "./../../actions/authActions";
import { UserContext } from './../../App';
import ImageProfil from './ImageProfil';
import { makeStyles, withStyles } from '@material-ui/styles';


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
                <Grid>
                   <Grid  styles = {{ margin: "auto" }}>
                       <Avatar 
                          styles={{ margin: "auto", width: 152, height: 152}}
                          src = "https://cc-media-foxit.fichub.com/image/fox-it-mondofox/e8c0f288-781d-4d0b-98ad-fd169782b53b/scene-sottacqua-per-i-sequel-di-avatar-maxw-654.jpg"
                        />
                   </Grid>
                </Grid>
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