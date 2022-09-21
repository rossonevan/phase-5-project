import { useState } from "react";
import { useHistory } from "react-router-dom";


function Login({updateUser}) {

    const [formData, setFormData] = useState({
        username:'',
        email:'',
        password:''
    })

    const [error, setError] = useState([])
    const history = useHistory()

    const {username, email, password} = formData
    
    const onSubmit = (e) => {
        e.preventDefault()
        const user = {
            username,
            email,
            password
        }

        fetch('/login',{
            method: 'POST',
            headers: {'Content-type': 'application/json'},
            body:JSON.stringify(user)
        })
        .then(res => {
            if(res.ok){
                res.json().then(user => {
                    updateUser(user)
                    history.push(`/`)
                })
            }else {
                res.json().then(json => setError(json.error))
            }
        })
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
                        <p>Sign into your account</p>

                        <div>
                            <label htmlFor="username">Username</label>
                            <div>
                                <input type='text' name='username' placeholder='Enter Username' required onChange={handleChange} />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="email">Email</label>
                            <div>
                                <input type='text' name='email' placeholder='Enter Email' required onChange={handleChange} />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="password">Password</label>
                            <div>
                                <input type='password' name='password' placeholder='Enter Password' required onChange={handleChange} />
                            </div>
                        </div>

                        <button type="submit">Login</button>
                    </form>
                    {error ? <div class="text-white">{error}</div>:null}
                </div>
            </div>
        </section>
    )
}

export default Login