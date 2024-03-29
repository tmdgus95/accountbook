import React from "react";
import { BsFillHeartFill } from "react-icons/bs";

const ProfileCard = ({ user }) => {
    return (
        <>
            <div className="flex justify-between px-10  w-maincard">
                <div className="main">
                    <div className="card  p-4 rounded-2xl w-56 h-60 ">
                        <div className="image flex flex-col items-center">
                            <img
                                src={
                                    user &&
                                    `${process.env.REACT_APP_API_URL}/api/background/img/${user.memberImgURL}`
                                }
                                className="rounded-full w-56 h-48"
                                alt="profile"
                            />
                        </div>
                        <div className="name text-white  flex flex-col items-center text-2xl  mt-4 z-10">
                            {user && user.nickName}
                        </div>
                    </div>
                </div>

                <BsFillHeartFill className="text-white mt-24 text-6xl hover:text-red-400 hover:duration-300 hover:scale-110" />

                <div className="main">
                    <div className="card p-4  rounded-2xl  w-56 h-60 ">
                        <div className="image flex flex-col items-center">
                            <img
                                src={
                                    user &&
                                    `${process.env.REACT_APP_API_URL}/api/background/img/${user.otherMemberImgURL}`
                                }
                                className="rounded-full w-56 h-48"
                                alt="profile"
                            />
                        </div>
                        <div className="name  text-white  flex flex-col items-center text-2xl  mt-4 z-10">
                            {user && user.otherNickName}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ProfileCard;
