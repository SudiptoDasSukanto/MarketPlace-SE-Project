import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Navbar  from "./Navbar"
const Home = () => {

    return (
        <>
            <div className="flex flex-col min-h-screen">
                
                {/* <h1 className="bg-green-300 text-7xl  text-center ">SkillHub</h1> */}
                <Navbar></Navbar>
                <div className="mx-5 lg:mx-20 md:mx-10 my-5 flex-1">
                    <Outlet></Outlet>
                </div>
                <Footer></Footer>
            </div>
        </>
    );
};

export default Home;