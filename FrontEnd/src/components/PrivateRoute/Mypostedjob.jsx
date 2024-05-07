import {  useEffect, useState, useContext } from "react";
import { AuthContest } from "../Allprovider/Context";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const Mypostedjob = () => {
    const [jobs, setJobs] = useState([]);
    const { user } = useContext(AuthContest);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        fetch(
          `http://127.0.0.1:8000/mypostedjob/${user.email}`
        )
        .then((res) => res.json())
          .then((data) => {
            setJobs(data);
            console.log(data);
          });
        setLoading(true);
      }, [user]);

      if (!loading)
        return <span className="loading loading-dots loading-lg"></span>;
    
        const handleDelete = (id) => {
            Swal.fire({
              title: "Are you sure?",
              text: "You won't be able to revert this!",
              icon: "warning",
              showCancelButton: true,
              confirmButtonColor: "#3085d6",
              cancelButtonColor: "#d33",
              confirmButtonText: "Yes, delete it!",
            }).then((result) => {
              if (result.isConfirmed) {
                fetch(`http://127.0.0.1:8000/jobdelete/${id}`, {
                  method: "DELETE",
                })
                  .then((res) => res.json())
                  .then((data) => {
                    console.log(data);
                    if (data?.deletedCount >= 1) {
                      const newData = jobs.filter((item) => item.id != id);
                      setJobs(newData);
                      Swal.fire("Deleted!", "Your Job has been removed.", "success");
                    }
                  });
              }
            });
          };

    return (
        <>
            { jobs.length > 0 ?

            <div className="grid lg:grid-cols-2 grid-cols-1 gap-10 rounded-lg">
            {jobs.map((job, index) => (
                <div key={index} className="bg-[#e5f4f7] p-10 space-y-2">
                <h3 className="text-3xl lg:text-5xl font-bold text-center ">
                    {job.jobTitle}
                </h3>
                <p className="block text-sm">Job Description</p>
                <p className="text-xl">{job.shortDescription}</p>
                <p className="">
                    <strong>Deadline:</strong> {job.deadline}
                </p>
                <p>
                    <strong>Price Range:</strong> {job.priceRange}
                </p>

                <p>
                    <strong>Email:</strong> {job.email}
                </p>
                <div className="flex justify-evenly pt-5">
                    <button className="btn bg-[#7ec6d5] text-[#FFF]">
                    <Link to={`/updatejob/${job.id}`}>Update</Link>
                    </button>
                    <button
                    className="btn bg-[#ff715b] text-[#FFF]"
                    onClick={() => handleDelete(job.id)}

                    >
                    Delete
                    </button>
                </div>
                </div>
            ))}
            </div>:
            <div>
                <div className="mx-auto w-1/3">
                <img className="w-full" src="https://i.ibb.co/vdpPPw3/images.jpg" alt="" />
                </div>
                <p className="text-center text-2xl lg:text-5xl font-semibold">You don&apos;t make any job post yet</p>
            </div>
            }
        </>
    );
};

export default Mypostedjob;