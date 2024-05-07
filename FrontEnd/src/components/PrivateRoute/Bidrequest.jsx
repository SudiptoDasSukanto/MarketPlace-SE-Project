import ProgressBar from "@ramonak/react-progress-bar";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContest } from "../Allprovider/Context";
import { useState, useContext, useEffect } from "react";
const Bidrequest = () => {
    const [info, setinfo] = useState([]);
    const [loading, setLoading] = useState(false);
    const [reload, setReload] = useState(false);
    const { user } = useContext(AuthContest);
    useEffect(() => {
        fetch(
          `http://127.0.0.1:8000/bidrequest/${user.email}`
        )
        .then((res) => res.json())
          .then((data) => {
            setinfo(data);
            console.log(data);
          });
        setLoading(true);
      }, [reload, user.email]);
    
      const handleDecision = (id, operation) => {
        let updateInfo;
        if (operation) {
          updateInfo = {
            statuss: "In progress",
          };
        } else {
          updateInfo = {
            statuss: "Rejected",
          };
        }
        fetch(`http://127.0.0.1:8000/statusUpdate/${id}`, {
          method: "PATCH",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(updateInfo),
        })
          .then((res) => res.json())
          .then((result) => {
            console.log(result);
            toast.success("Bid Status Updated Successfully");
            setReload(!reload);
          });
      };
      if (!loading)
      return <span className="loading loading-dots loading-lg"></span>;
    return (
        <div>
            <div className="overflow-x-auto ">
                <table className="table border border-[#7ec6d5] rounded-xl">
                {/* head */}
                <thead>
                    <tr>
                    <th>Job Title</th>
                    <th>Email</th>
                    <th>Deadline</th>
                    <th>Staus</th>
                    <th>Feedback</th>
                    </tr>
                </thead>
                <tbody>
                    {info.map((item) => {
                    return (
                        <tr className="hover" key={item.id}>
                        <td>{item.jobTitle}</td>
                        <td>{item.userEmail}</td>
                        <td>{item.deadline}</td>
                        <td>{item.statuss}</td>
                        {item.statuss != "Rejected" ? (
                            item.statuss == "Pending" ? (
                            <td className="flex">
                                <button
                                className="mx-2 btn bg-[#42f042] text-[#FFF]"
                                onClick={() => handleDecision(item.id,true)}
                                >
                                Accept
                                </button>
                                <button
                               
                                className=" btn bg-[#ff715b] text-[#FFF]"
                                onClick={() => handleDecision(item.id,false)}
                                >
                                Reject
                                </button>
                            </td>
                            ) : item.statuss == "In progress" ? (
                            <p className="pt-3 pr-2">
                                <ProgressBar
                                completed={60}
                                
                                />
                            </p>
                            ) : (
                            <p className="pt-3 pr-2">
                                <ProgressBar
                                completed={100}
                                />
                            </p>
                            )
                        ) : (
                            ""
                        )}
                        </tr>
                    );
                    })}
                </tbody>
                </table>
            </div>
            </div>
    );
};

export default Bidrequest;