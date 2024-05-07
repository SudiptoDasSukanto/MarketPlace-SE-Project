import { Link, NavLink } from "react-router-dom";
import { AuthContest } from "../Allprovider/Context";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useContext } from "react";

const Navbar = () => {
    const {user,logOut} =useContext(AuthContest); 
    const handleLogout =()=>{
        logOut()
        .then(res => {console.log(res);
            toast.success("Log Out Successfully");
    })
    .catch(error => {console.log(error);})
    }

    return (
        <div>
            <div className={` navbar  bg-[#7ec6d533]`}>
                <div className="navbar-start flex">
                    <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </div>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                    <li><NavLink to='/'>Home</NavLink></li>
                        <li><NavLink to='/addjob'>Add Job</NavLink></li>
                        <li><NavLink to='/postedjob'>My posted Job</NavLink></li>
                        <li><NavLink to='/mybid'>My Bids</NavLink></li>
                        <li><NavLink to='/bid'>Bid Request</NavLink></li>  
                    </ul>
                    </div>
                    <img className="w-12 h-8 lg:w-20 lg:h-20 rounded-3xl"src='https://i.ibb.co/WpgYsv0/logo.jpg'></img>
                    <p className="mx-2 md:text-4xl font-bold">
                        Market<span className="text-[#ff715b]">Place</span>
                    </p>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        <li><NavLink to='/'>Home</NavLink></li>
                        <li><NavLink to='/addjob'>Add Job</NavLink></li>
                        <li><NavLink to='/mypostedjob'>My posted Job</NavLink></li>
                        <li><NavLink to='/mybid'>My Bids</NavLink></li>
                        <li><NavLink to='/bidrequest'>Bid Request</NavLink></li> 
                    </ul>
                </div>
                <div className="navbar-end">

                {
                    user ? 
                    <div className="flex justify-center items-center ">
                        <span className="flex justify-center items-center border-2 p-1 rounded-xl mr-2  border-[#7ec6d5] "  >
                        <img className=" rounded-full border-1 h-12 w-14  mx-2 "src={user.photoURL} alt="Image" />
                        <p className="mr-2">{user.displayName ? user.displayName:"Name" }</p>
                        </span> 
                        <Link className="px-2 py-2 rounded-lg text-[#FFF] bg-[#515474] border-2" onClick={handleLogout} to={'/login'}>Log Out</Link> 
                    </div>:
                    
                    <Link className={` px-2 py-2 mr-2 rounded-lg bg-[#515474] text-[#FFF]  border-2  `} to={'/login'} >Log In</Link>
                    

                }
          
                </div>
            </div>
            <ToastContainer
                position="bottom-center"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />
        </div>
    );
};

export default Navbar;