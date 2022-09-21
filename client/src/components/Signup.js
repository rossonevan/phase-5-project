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
        <section className="px-4 py-16 mx-auto max-w-screen-xl sm:px-6 lg:px-8">
        <div className="max-w-lg mx-auto">

            <form onSubmit={onSubmit} className="p-8 mt-6 mb-0 rounded-lg shadow-2xl space-y-4 bg-black">
                <p className="text-lg font-medium text-center text-white">Create an account!</p>

                <div>
                    <label htmlFor="username" className="text-sm font-medium text-white">Create Username</label>
                    <div className="relative mt-1">
                        <input type='text' name='username' placeholder='Enter Username' required onChange={handleChange} className="w-full p-4 pr-12 text-sm border-red-600 border-4 rounded-lg shadow-sm"/>
                    </div>
                </div>

                <div>
                    <label htmlFor="email" className="text-sm font-medium text-white">Create Email</label>
                    <div className="relative mt-1">
                        <input type='text' name='email' placeholder='Enter Email' required onChange={handleChange} className="w-full p-4 pr-12 text-sm border-red-600 border-4 rounded-lg shadow-sm"/>
                    </div>
                </div>

                <div>
                    <label htmlFor="password" className="text-sm font-medium text-white">Create Password</label>
                    <div className="relative mt-1">
                        <input type='password' name='password' placeholder='Enter Password' required onChange={handleChange} className="w-full p-4 pr-12 text-sm border-red-600 border-4 rounded-lg shadow-sm"/>
                    </div>
                </div>

                <div>
                    <label htmlFor="password" className="text-sm font-medium text-white">Confirm Password</label>
                    <div className="relative mt-1">
                        <input type='password' name='passwordC' placeholder='Confirm Password' required onChange={handleChange} className="w-full p-4 pr-12 text-sm border-red-600 border-4 rounded-lg shadow-sm"/>
                    </div>
                </div>

                <button type="submit" className="block w-full px-5 py-3 text-sm font-medium text-white bg-red-600 hover:bg-red-400 rounded-lg">Signup!</button>
            </form>
            {errors ? errors.map(error => <div className="text-white"> * {error[1]} </div>) :null}
        </div>
    </section>
    )
}

export default Signup