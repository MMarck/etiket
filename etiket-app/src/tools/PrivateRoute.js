import { Component } from "react";
import { Outlet , Navigate} from 'react-router-dom';
import Cookies from 'js-cookie';
import { backendURL } from '../config/constants.js'
import request from "../tools/ApiSetup"

class PrivateRoute extends Component {
    
    componentDidMount(){


        const header={
            "Authorization":"Bearer "+this.state.accessToken
        }
        const jsonData={}
        request.post(backendURL+"UsersDB/auth",jsonData,{
            headers:header
        })
        .then((response)=>{
            // For success, update state like
            console.log("Se llamó a auth")
            this.setState({ isLoading: false, isLoggedIn: true });
        })
        .catch((error)=>{
            // For fail, update state like
            console.log("Se llamó a auth")
            this.setState({ isLoading: false, isLoggedIn: false });
        });
    }

    constructor(props) {
        super(props);

        this.state = {
            accessToken:Cookies.get("accessToken") || "",
            refreshToken: Cookies.get("refreshToken") || "",
            isLoading: true,
            isLoggedIn: false
        };
        

    }

    render() {

        return this.state.isLoading ? null :
            this.state.isLoggedIn ?
            <Outlet /> :
            <Navigate to={this.props.redirectTo} />

    }

}

export default PrivateRoute;