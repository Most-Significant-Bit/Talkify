import React from "react";
import { Link } from "react-router-dom";
import { MdVerified } from "react-icons/md";

const UserCard = ({ index, data }) => {
  return (
    <Link
      to={`/profile/${data?._id}`}
      className="bg-transparent border-2 border-green-500 text-white rounded-2xl p-6 flex flex-col items-center gap-2 shadow-md w-full max-w-xs hover:scale-105 transition-transform duration-200"
    >
      <img
        src={data?.avatar}
        className={`rounded-full w-16 h-16 flex items-center object-cover justify-center text-xl font-semibold`}
      />
      <div className="flex items-center gap-2 ">
        <h3 className="font-semibold text-lg">{data?.name}</h3>

        {data?.isVerified ? <MdVerified className="text-green-500" /> : <></>}
      </div>

      {/* <p className="text-blue-500">{data?.email}</p>
      <div className="flex gap-1">
        <p className="text-green-400">{data?.followers} followers</p>
        <p className="text-green-400">{data?.following} following</p>
        <p className="text-green-400">
          {data?.episodes_by_user.length} podcasts
        </p>
      </div> */}

       <div className="flex justify-start gap-12 text-center mb-5 mt-5 pl-6 pr-6">
          <div>
            <p className="text-2xl font-semibold text-green-500">
              {data?.episodes_by_user.length}
            </p>
            <p className="text-gray-300">Podcasts</p>
          </div>
          <div>
            <p className="text-2xl font-semibold text-green-500">
              {data?.followers}
            </p>
            <p className="text-gray-300 ">Followers</p>
          </div>
          <div>
            <p className="text-2xl font-semibold text-green-500">
              {data?.following}
            </p>
            <p className="text-gray-300">Following</p>
          </div>
        </div>
    </Link>
  );
};

export default UserCard;
