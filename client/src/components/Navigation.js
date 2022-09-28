import {Link, NavLink, useHistory} from 'react-router-dom';




function Navigation({currentUser, updateUser}) {

    const history = useHistory()
   
    const handleLogout = () => {
        fetch('/logout', {method: 'DELETE'})
        updateUser('')
        history.push('/login')
    }
    
    return (
        <header className="shadow-sm">
            <div className="p-4 mx-auto max-w-screen-xl">
                <div className="flex items-center justify-between space-x-4 lg:space-x-10">
                    <div className="flex lg:w-0 lg:flex-1">
                        <Link to='/' className='text-4xl font-bold text-center text-white font-style'>Worth-to-Play?</Link>
                    </div>
                        <NavLink to='/reviewed_games' activeClassName='bg-red-900' className="inline-block hover:border-gray-200 rounded text-white hover:text-black hover:bg-red-600 py-1 px-3 ">Reviewed Games</NavLink>
                        {currentUser ?
                            <div className="items-center justify-end flex-1 hidden space-x-4 sm:flex">
                                <h3 className='text-white'>Welcome, {currentUser.username}</h3>
                                <NavLink activeClassName='bg-red-900' className="inline-block hover:border-gray-200 rounded text-white hover:text-black hover:bg-red-600 py-1 px-3" exact to='/me'>My Reviews</NavLink>
                                <button onClick={handleLogout} className='inline-block hover:border-gray-200 rounded text-white hover:text-black hover:bg-red-600 py-1 px-3'>Log Out</button>
                            </div> 
                            :
                            <div className="items-center justify-end flex-1 hidden space-x-4 sm:flex">
                                <NavLink activeClassName='bg-red-900' to='/signup' className='inline-block  hover:border-gray-200 rounded text-white hover:text-black hover:bg-red-600 py-1 px-3'>Signup</NavLink>
                                <NavLink activeClassName='bg-red-900' to='/login' className='inline-block  hover:border-gray-200 rounded text-white hover:text-black hover:bg-red-600 py-1 px-3'>Login</NavLink>
                            </div>
                        }
                </div>
            </div>
        </header>
    )
}

export default Navigation