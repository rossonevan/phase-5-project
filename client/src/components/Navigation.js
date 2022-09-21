import {Link, NavLink, useHistory} from 'react-router-dom';




function Navigation({currentUser, updateUser}) {

    const history = useHistory()
   
    const handleLogout = () => {
        fetch('/logout', {method: 'DELETE'})
        updateUser('')
        history.push('/login')
    }
    return (
        <div>
            <Link exact to='/'>Worth-to-Play?</Link>
            {currentUser ?
                <div>
                    <h3>Welcome, {currentUser.username}</h3>
                    <button onClick={handleLogout}>Log Out</button>
                </div> :

                <div>
                    <NavLink exact to='/signup'>Signup</NavLink>
                    <NavLink exact to='/login'>Login</NavLink>
                </div>
            }
        </div>
    )
}

export default Navigation