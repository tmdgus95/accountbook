import React from "react";
import { BsFillHeartFill } from "react-icons/bs";

const ProfileCard = ({ name, img }) => {
    return (
        <>
            <div className="flex justify-between px-10  w-maincard">
                <div className="main">
                    <div className="card  p-4 rounded-2xl w-48 h-60 ">
                        <div className="image flex flex-col items-center">
                            <img
                                src="/images/jenny.jpg"
                                className="rounded-full w-32 h-32 "
                                alt="profile"
                            />
                        </div>
                        <div className="name text-white  flex flex-col items-center text-2xl  mt-4 z-10">
                            승현이
                        </div>
                    </div>
                </div>

                <BsFillHeartFill className="text-white mt-16 hover:text-red-400 hover:duration-300 hover:scale-110" />

                <div className="main">
                    <div className="card p-4  rounded-2xl w-48 h-60 ">
                        <div className="image flex flex-col items-center">
                            <img
                                src="/images/jenny.jpg"
                                className="rounded-full w-32 h-32 "
                                alt="profile"
                            />
                        </div>
                        <div className="name  text-white  flex flex-col items-center text-2xl  mt-4 z-10">
                            승현이
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ProfileCard;
