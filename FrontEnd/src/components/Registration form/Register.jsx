import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useContext } from "react";
import { AuthContest } from "../Allprovider/Context";

const Register = () => {
  const {createUser,user,updateUserProfile,logInWithGoogle,logOut} =useContext(AuthContest);
  const navigate= useNavigate();
    const handleRegister = e => {
        e.preventDefault();
        const username = e.target.username.value;
        const email = e.target.email.value;
        const password = e.target.password.value;
        const photo = e.target.photo.value;
        if(password.length<6)
        {
            toast.error("Passwords must be at least 6 characters in length");
            return;
        }
        createUser(email,password)
            .then(result =>{console.log(result.user );
                toast.success("Registration Successful");
                setTimeout('1000')
                updateUserProfile(username,photo)
                .then( () => console.log('Updated'))
                .catch( (error)=> console.error(error))
                logOut()
                .then(res => {console.log(res)})
                .catch(error => {console.log(error)})
                navigate('/login'); 
                
            })
            .catch(error =>
                {
                    console.log(error.message)
                    if(error.message=="Firebase: Error (auth/email-already-in-use).")
                        toast.error("Email Alreay Used");
                    else toast.error(error.message);
                }
            )
            if(user){
              console.log("yuufuahdfuiah jdfikoahfa")
              e.currentTarget.email.value='';
              e.currentTarget.password.value=''; 
              e.currentTarget.name.value='';
              e.currentTarget.photo.value='';
          }
    }
    return (
      <div>
      <p className="text-4xl font-bold text-center my-5  ">Please SignUp</p>
      <div className="hero">
      <div className="hero-content flex-col lg:flex-row-reverse">
      <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
      <form onSubmit={handleRegister} className="card-body">
              <div className="form-control">
              <label className="label">
                  <span className="label-text">UserName</span>
              </label>
              <input type="name" name="username" placeholder="Your Name" className="input input-bordered" />
              </div>
          <div className="form-control">
          <label className="label">
              <span className="label-text">Photo</span>
          </label>
          <input type="text" name="photo" placeholder="Photo URL" className="input input-bordered" />
          </div>
          <div className="form-control">
          <label className="label">
              <span className="label-text">Email</span>
          </label>
          <input type="email" name="email" placeholder="Email Address" className="input input-bordered" required />
          </div>
          <div className="form-control">
          <label className="label">
              <span className="label-text">Password</span>
          </label>
          <input type="password" placeholder="password" name ="password" className="input input-bordered" required />
          </div>
          <div className="form-control ">
          <button className="btn bg-[#ff715b] text-[#FFF]">Register</button>
          </div>
          <button onClick={()=>{
              logInWithGoogle()
              .then(res=> {
                  console.log(res);
                  toast.success("Login Successful")
                  navigate('/');
              })
              .catch(error => {
                  console.log(error);
                  toast.error(error.messegae)
              })
          }
      } className="flex px-4 py-2 border-2 rounded-lg" > 
              <div className="mr-5"><img src={'https://i.ibb.co/1qPR4mG/Logo.png'}></img></div>
              <div>Sign Up with Google </div>
      </button>
          <p className="text-center">Have an account?<Link className="text-[#7ec6d5FF] font-bold ml-1" to={'/login'}>Login</Link></p> 
      </form>
      </div>
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

export default Register;