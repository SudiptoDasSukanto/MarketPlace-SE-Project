const NewsLetter = () => {
    return (
        <div className="text-center py-10 flex flex-col justify-center items-center">
             <img className="w-50 h-32 rounded-full "src='https://i.ibb.co/xGnBdVs/logo.png'></img>
             <p className="font-bold text-5xl mb-10">Newsletter</p>
            <div className="join lg:w-1/3">
                <input className="w-full input input-bordered rounded-r-lg join-item" placeholder="Enter your email here"/>
                <button className="btn bg-[#ff715b] text-[#FFF] join-item rounded-r-full">Subscribe</button>
            </div>
        </div>
    );
};

export default NewsLetter;