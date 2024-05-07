import DatePicker from "react-datepicker";
import { useContext,useState } from "react";
import { AuthContest } from "../Allprovider/Context";
import { useNavigate,useLoaderData } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";
import { toast } from "react-toastify";
const Bid = () => {
        const [startDate, setStartDate] = useState(new Date());
        const today = new Date();
        const dateObject = new Date("deadline");
        const { user } = useContext(AuthContest);
        const navigate = useNavigate();
        today.setHours(0, 0, 0, 0);
        console.log(useLoaderData())
        const { id, jobTitle, deadline, priceRange, shortDescription, email } =
            useLoaderData();
            console.log(id);

        
            const handleBid = (e) =>{
                e.preventDefault();
                const form = new FormData(e.currentTarget);
                console.log(form);
                const price = form.get("price");
                const deadline = startDate.toISOString().slice(0, 10);

                const offer = {
                    jobid: id,
                    ownerEmail: email,
                    userEmail: user.email,
                    price,
                    deadline,
                    jobTitle,
                    statuss: "Pending",
                  };
                  fetch("http://127.0.0.1:8000/bidjob", {
                    method: "POST",
                    headers: {
                        "content-type": "application/json",
                    },
                    body: JSON.stringify(offer),
                    })
                    .then((res) => res.json())
                    .then((result) => {
                        console.log(result);
                        toast.success("Job Bid Successfully");
                        navigate("/mybid");
                    });
            };
    return (
        <div>
            <div className="bg-[#f6f9fe] p-5 rounded-xl">
                <p className="text-center font-medium text-3xl lg:text-5xl ">
                Job Details
                </p>
                <h3 className="mt-5 text-center font-bold text-xl lg:text-3xl">
                jobTitle
                </h3>
                <p>
                <strong>Deadline:</strong> {deadline}
                </p>
                <p>
                <strong>Price Range:</strong> {priceRange}
                </p>
                <p>
                <strong>Description:</strong> {shortDescription}
                </p>
                <p>
                <strong>Email:</strong> {email} 
                </p>
            </div>
            <div className="">
                <div className="bg-[#f6f9fe]  mx-auto px-10    py-5 lg:w-1/2 mt-10 rounded-lg border-2">
                <p className="text-center text-5xl font-semibold">Your Offer</p>
                <div className="mt-10">
                    <form  className="designforForm" onSubmit={handleBid}>
                    <div>
                        <label>Owner Email</label>
                        <input type="email" name="email" value={email} />
                    </div>
                    <div>
                        <label>Your Email</label>
                        <input type="email" name="email" value={user.email} />
                    </div>
                    <div>
                        <label>Offer Price</label>
                        <input
                        name="price"
                        type="text"
                        placeholder="Job Price"
                        required
                        />
                    </div>
                    <div>
                        <label>Your Proposed Deadline </label>
                        <DatePicker
                        selected={startDate}
                        minDate={today}
                        onChange={(date) => setStartDate(date)}
                        />
                    </div>
                    <div className="flex items-center">
                        <button
                        disabled={
                            dateObject < today || user.email == email ? "disabled" : ""
                        }
                        className=" mx-auto mt-5 btn bg-[#ff715b] text-[#FFF]"
                        >
                        Bid Now
                        </button>
                    </div>
                    </form>
                </div>
                </div>
            </div>
        </div>
    );
};

export default Bid;