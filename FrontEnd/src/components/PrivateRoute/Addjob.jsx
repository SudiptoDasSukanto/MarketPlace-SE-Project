import DatePicker from "react-datepicker";
import { useState, useContext } from "react";
import "./formDesign.css"
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { AuthContest } from "../Allprovider/Context";

import "react-datepicker/dist/react-datepicker.css";
const Addjob = () => {
    const [startDate, setStartDate] = useState(new Date());
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const navigate = useNavigate();
    const { user } = useContext(AuthContest);
    console.log(user);
    const handleAddJob = (e) => {
      e.preventDefault();
      const form = new FormData(e.currentTarget);
      const email = form.get("email");
      const title = form.get("title");
      const Category = form.get("Category");
      const mx_price = form.get("mx_price");
      const mn_price = form.get("mn_price");
      const description = form.get("description");
      const deadline = startDate.toISOString().slice(0, 10);

      const job = {
        email,
        jobTitle: title,
        category: Category,
        priceRange: `$${mn_price} - $${mx_price}`,
        shortDescription: description,
        deadline,
      };
      fetch("http://127.0.0.1:8000/addjob", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(job),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        toast.success("Job Added Successfully");
        navigate("/mypostedjob");
      })
      .catch((error) => {
        console.log(error);
      });
    }
    return (
        <div className="bg-[#f6f9fe] lg:mx-20 mx-5 py-10 lg:px-20 px-10 rounded-lg">
      <p className="text-center text-3xl font-bold mb-10">Add a New Job</p>
      <form onSubmit={handleAddJob}>
        <div className=" grid grid-cols-1 lg:grid-cols-2 gap-5 designforForm ">
          <div>
            <label>Email</label>
            <input type="email" name="email"   value={user.email}/>
          </div>
          <div>
            <label>Job Title</label>
            <input type="text" name="title" placeholder="Add your job title" />
          </div>
          <div>
            <label>Minimum Price</label>
            <input
              name="mn_price"
              type="text"
              placeholder="Job Minimum Price"
              required
            />
          </div>
          <div>
            <label>Maximum Price</label>
            <input
              name="mx_price"
              type="text"
              placeholder="Job Maximum Price"
              required
            />
          </div>
          <div>
            <p className="font-semibold block text-lg">Category Name</p>
            <select className="rounded-lg" name="Category" required>
              <option value="" disabled selected>
                Select a Category
              </option>
              <option value="Web Development">Web Development</option>
              <option value="Digital Marketing">Digital Marketing</option>
              <option value="Graphics Design"> Graphics Design</option>
            </select>
          </div>
          <div>
            <label>Deadline </label>
            <DatePicker
              selected={startDate}
              minDate={today}
              onChange={(date) => setStartDate(date)}
            />
          </div>
        </div>
        <div className="w-full designforForm my-5">
          <label className="mb-2">Job description</label>
          <textarea
            placeholder="Write Job description"
            name="description"
            className=" textarea-md w-full max-w-xs"
          ></textarea>
        </div>
        <div className="text-center">
          <button className="px-10 py-2 font-bold text-[#FFF] bg-[#ff715b] hover:border-2 rounded-xl">
            Add Job
          </button>
        </div>
      </form>
    </div>
    );
};

export default Addjob;