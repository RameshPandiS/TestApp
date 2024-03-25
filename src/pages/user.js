import { useEffect, useState, useRef } from "react"
import SimpleReactValidator from 'simple-react-validator';
import axios from 'axios';

export const UserPage = () => {

    const validator = useRef(new SimpleReactValidator({
        className: "text-danger"
    }));


    const [editIndex, setEditIndex] = useState(-1)

    const handleEditForm = (i) => {
        setEditIndex(i)
        const editForm = userList[i]
        setUserForm(editForm)

    }

    const [, fourceUpdate] = useState(1)

    const [userForm, setUserForm] = useState({
        name: "",
        age: "",
        email: "",
        phone: ""
    })

    const [userList, setUserList] = useState([
        {
            name: "ram",
            age: "",
            email: "",
            phone: ""
        }
    ])

    const handleSubmitForm = () => {
        if (validator.current.allValid()) {
            console.log('userForm----->', userForm);
            if (editIndex === -1) {
                axios.post('https://jsonplaceholder.typicode.com/users', userForm).then(() => {
                    setUserList([...userList, userForm]);
                }).catch(() => {

                })

            }
            else {

                axios.put('https://jsonplaceholder.typicode.com/users/'+userForm.id, userForm).then(() => {
                    const userNewList = userList;
                    userNewList[editIndex] = userForm;
                    setUserList([...userNewList]);

                }).catch(() => {
                    console.log("invalid error");
                })

            }
            setUserForm({
                name: "",
                age: "",
                email: "",
                phone: ""
            });
            setEditIndex(-1)
        }
        else {
            console.log('not valid');
            validator.current.showMessages();
            fourceUpdate(0);
        }
    };

    const handleChangeForm = (event) => {
        const target = event.target;
        const name = target.name;
        const value = target.value;
        setUserForm({
            ...userForm,
            [name]: value,
        })

    };

    const handleDeleteForm = (i) => {

        axios.delete('https://jsonplaceholder.typicode.com/users/'+userForm.id).then(() => {
            const userNewList = userList;
            userNewList.splice(i, 1);
            setUserList([...userNewList])

        }).catch(() => {
            console.log("invalid error");
        })

       
    }

    useEffect(() => {
        axios.get('https://jsonplaceholder.typicode.com/users').then((data) => {
            console.log("data-------->", data.data);
            setUserList(data.data);
        }).catch(() => {

        })
    }, [])



    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-6">
                    <div className="card">
                        <div className="card-body">
                            <div className="row">
                                <div className="col-6">
                                    <div className="mb-3">
                                        <label className="form-label">Name</label>
                                        <input type="text" className="form-control" placeholder="Enter you name" name="name" value={userForm.name} onChange={handleChangeForm} />
                                    </div>
                                    {validator.current.message('Name', userForm.name, 'required')}

                                    <div className="mb-3">
                                        <label className="form-label">Age</label>
                                        <input type="text" className="form-control" placeholder="Enter you age" name="age" value={userForm.age} onChange={handleChangeForm} />
                                    </div>
                                    {validator.current.message('Age', userForm.age, 'required')}
                                </div>

                                <div className="col-6">

                                    <div className="mb-3">
                                        <label className="form-label">Email</label>
                                        <input type="text" className="form-control" placeholder="Enter you email" name="email" value={userForm.email} onChange={handleChangeForm} />
                                    </div>
                                    {validator.current.message('Email', userForm.email, 'required|email')}

                                    <div className="mb-3">
                                        <label className="form-label">Phone</label>
                                        <input type="number" className="form-control" placeholder="Enter you phone" name="phone" value={userForm.phone} onChange={handleChangeForm} />
                                    </div>
                                    {validator.current.message('Phone', userForm.phone, 'required|phone')}

                                </div>
                                <div className="row">
                                    <div className="col-5"></div>
                                    <div className="col-2">
                                        <button type="submit" onClick={handleSubmitForm} className="btn btn-primary mb-3">Submit</button>
                                    </div>
                                    <div className="col-5"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-6">
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
                                        <th scope="col">Action</th>
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
                                            <td><button className="btn btn-sm btn-primary" onClick={() => handleEditForm(i)}>Edit</button></td>
                                            <td><button className="btn btn-sm btn-danger" onClick={() => handleDeleteForm(i)}>Delete</button></td>
                                        </tr>
                                    )}

                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>


            </div>
        </div>



    )
}