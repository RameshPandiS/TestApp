
import { useRef, useState } from "react";
import SimpleReactValidator from 'simple-react-validator';
import axios from 'axios';
import {useNavigate} from "react-router-dom"



export const LoginPage = () => {

    const validator = useRef(new SimpleReactValidator({className:"text-danger"}));
    const navigation = useNavigate()

    const [userDetails, setUserDetails] = useState({
        username: "",
        password: ""
    })
 const [,fourceUpdate]=useState(0);
    const submitForm =() => {
        if (validator.current.allValid()) {
          axios.post("https://fakestoreapi.com/auth/login",userDetails).then((response)=>{
            if(response.data.token){
              navigation("/admin/dashboard")
            }
            else{
                alert('credentials are wrong')
            }
            console.log('---->',response.data);
          }).catch((error)=>{
            alert('something went wrong');
          })
        } 
        else {
          validator.current.showMessages();
          
          fourceUpdate(1);
        }
      }

     

    return (
        <div className="row mt-5">
            <div className="col-4">
            </div>

            <div className="col-4">
                <div className="card">
                    <div className="card-body">
                        
                            <input type="text" name="username"  placeholder="user name" 
                            onChange={(e)=> setUserDetails({[e.target.name]: e.target.value})}/>
                            {validator.current.message('username', userDetails.username, 'required')}
                            {console.log(userDetails.username)}
                            <br/>
                            <br/>
                            <input type="text" name="password" placeholder="password" 
                            onChange={(e)=> setUserDetails({...userDetails, [e.target.name]: e.target.value})}/>
                            {validator.current.message('password', userDetails.password, 'required')}
                            {console.log(userDetails.password)}
                            <br/>
                            <br/>
                            <button className="btn btn-sm btn-primary" onClick={submitForm}>Log-In</button>
                        
                    </div>
                </div>
            </div>

            <div className="col-4">
            </div>
        </div>
    )
}