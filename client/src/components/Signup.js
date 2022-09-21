import { useState } from "react";
import { useHistory } from "react-router-dom";


function Signup({updateUser}) {

    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        passwordC: ''
    })

    const [errors, setErrors] = useState([])
    const history = useHistory()

    const {username, email, password, passwordC} = formData

    const onSubmit = (e) => {
        e.preventDefault()
        if (password === passwordC) {
            const user = {
                username,
                email,
                password
            }

            fetch('/users',{
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body:JSON.stringify(user)
            })
            .then(res => {
                if(res.ok){
                    res.json().then(user => {
                        updateUser(user)
                        history.push(`/`)
                    })
                }else {
                    res.json().then(json => setErrors(Object.entries(json.errors)))
                }
            })
        } else {
            alert(`Passwords don't match`)
        }
    } 

    const handleChange = (e) => {
        const {name, value} = e.target
        setFormData({...formData, [name]: value})
    }

    return (
        <section>
        <div>
            <div>
                <form onSubmit={onSubmit}>
                    <p>Create an account!</p>

                    <div>
                        <label htmlFor="username">Create Username</label>
                        <div>
                            <input type='text' name='username' placeholder='Enter Username' required onChange={handleChange} />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="email">Create Email</label>
                        <div>
                            <input type='text' name='email' placeholder='Enter Email' required onChange={handleChange} />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="password">Create Password</label>
                        <div>
                            <input type='password' name='password' placeholder='Enter Password' required onChange={handleChange} />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="password">Confirm Password</label>
                        <div>
                            <input type='password' name='passwordC' placeholder='Confirm Password' required onChange={handleChange} />
                        </div>
                    </div>

                    <button type="submit">Signup!</button>
                </form>
                {errors ? errors.map(error => <div className="text-white"> * {error[1]} </div>) :null}
            </div>
        </div>
    </section>
    )
}

export default Signup