
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Job = ({job}) => {
    return (
        <div className="p-10 space-y-2 bg-[#e5f4f7] rounded-lg">
        <h3 className="text-center text-2xl font-bold">{job.jobTitle}</h3>
        <p><strong>Deadline:</strong> {job.deadline}</p>
        <p><strong>Price Range:</strong> {job.priceRange}</p>
        <p><strong>Description:</strong> {job.shortDescription}</p>
        <p><strong>Email:</strong> {job.email}</p>
        <div className="flex justify-end ">
        <Link to={`/bid/${job.id}`}><button className="btn bg-[#ff715b] text-[#FFF]">Bid Now</button></Link> 

        </div>
    </div>
    );
};
Job.propTypes = {
    job: PropTypes.object.isRequired
  };

export default Job;