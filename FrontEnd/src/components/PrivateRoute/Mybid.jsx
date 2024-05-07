import { useEffect, useState, useContext } from "react";
import { AuthContest } from "../Allprovider/Context";
import { toast } from "react-toastify";

const Mybid = () => {
    const [info, setinfo] = useState([]);
    const [loading, setLoading] = useState(false);
    const { user } = useContext(AuthContest);
    const [reload, setReload] = useState(false);
    useEffect(() => {
        fetch(`http://127.0.0.1:8000/mybidjob/${user.email}`,)
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            setinfo(data);
            
          });
        setLoading(true);
      }, [user,reload]);
      const handleComplete = (id) => {
        const updateInfo = {
          statuss: "Complete",
        };
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
            toast.success("Project Completed Successfully");
            setReload(!reload);
          });
      };
    if (!loading)
        return <span className="loading loading-dots loading-lg"></span>;
    return (
        <div >
            <div className="overflow-x-auto overflow-y-hidden">
                <table className="table border border-[#7ec6d5] rounded-xl">
                {/* head */}
                <thead>
                    <tr>
                    <th>Job Title</th>
                    <th>OwnerEmail</th>
                    <th>Deadline</th>
                    <th>
                        Status
                        {/* <button
                        className=" ml-2 text-2xl tooltip tooltip-bottom"
                        data-tip={!sortOption ? "Sort" : "Random"}
                        onClick={() => {
                            setSortOption(!sortOption);
                        }}
                        >
                        {!sortOption ? <BiSortAZ></BiSortAZ> : <FaRandom></FaRandom>}
                        </button> */}
                    </th>
                    <th>Complete</th>
                    </tr>
                </thead>
                <tbody>
                    {/* row 2 */}
                    {info.map((item) => {
                    return (
                        <tr className="hover" key={item.id}>
                        <td>{item.jobTitle}</td>
                        <td>{item.ownerEmail}</td>
                        <td>{item.deadline}</td>
                        <td>{item.statuss}</td>
                        <td>
                            {item.status != "Complete" && (
                            <button
                                disabled={
                                item.statuss != "In progress" ? "disabled" : ""
                                }
                                className="btn bg-[#ff715b] text-[#FFF]"
                                onClick={() => handleComplete(item.id)}
                            >
                                Complete
                            </button>
                            )}
                        </td>
                        </tr>
                    );
                    })}
                </tbody>
                </table>
            </div>
        
        </div>
    );
};

export default Mybid;