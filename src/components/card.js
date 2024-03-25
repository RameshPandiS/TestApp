import { useEffect, useState } from "react"
import axios from 'axios';
export const Card = () => {


    const [userList, setUserList] = useState([
        {
            name: "ram",
            age: "",
            email: "",
            phone: ""
        }
    ])
    const [userForm, setUserForm] = useState({
            name: "",
            age: "",
            email: "",
            phone: ""
        })



        useEffect(() => {
            axios.get('https://jsonplaceholder.typicode.com/users').then((data) => {
                console.log("data-------->", data.data);
                setUserList(data.data);
            }).catch(() => {
    
            })
        }, [])


    return (
                <div className="card">
                    <div className="card-body">
                        <table class="table">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Age</th>
                                    <th scope="col">Email</th>
                                    <th scope="col">Phone</th>
                                </tr>
                            </thead>
                            <tbody>
                                {userList.map((data, i) =>
                                    <tr>
                                        <th scope="row">{i + 1}</th>
                                        <td>{data.name}</td>
                                        <td>{data.age}</td>
                                        <td>{data.email}</td>
                                        <td>{data.phone}</td>
                                    </tr>
                                )}

                            </tbody>
                        </table>
                    </div>
                </div>
            
    )
}