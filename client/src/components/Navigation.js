import {Link, NavLink} from 'react-router-dom';



function Navigation() {


    return (
        <div>
            <Link exact to='/'>Worth-to-Play?</Link>
            <NavLink exact to='/signup'>Signup</NavLink>
            <NavLink exact to='/login'>Login</NavLink>
        </div>
    )
}

export default Navigation