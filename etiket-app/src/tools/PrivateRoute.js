import { Component } from "react";
import { BrowserRouter as Router, Route, Outlet , Navigate} from 'react-router-dom';
import Cookies from 'js-cookie';
import { backendURL } from '../config/constants.js'
import axios from 'axios';

class PrivateRoute extends Component {
    
    componentDidMount(){
        const header={
            "Authorization":"Bearer "+this.state.accessToken
        }
        const jsonData={}
        axios.post(backendURL+"UsersDB/auth",jsonData,{
            headers:header
        })
        .then((response)=>{
            // For success, update state like
            console.log("1")
            this.setState({ isLoading: false, isLoggedIn: true });
        })
        .catch((error)=>{
            // For fail, update state like
            console.log(this.state.accessToken)
            console.log("2")
            console.log(error)
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

        // Your axios call here
        
        

    }

    render() {

        return this.state.isLoading ? null :
            this.state.isLoggedIn ?
            <Outlet /> :
            <Navigate to={this.props.redirectTo} />

    }

}

export default PrivateRoute;