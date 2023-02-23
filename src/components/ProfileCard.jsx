import React from "react";
import { BsFillHeartFill } from "react-icons/bs";

const ProfileCard = ({ user }) => {
    return (
        <>
            <div className="flex justify-between px-10  w-maincard">
                <div className="main">
                    <div className="card  p-4 rounded-2xl w-48 h-60 ">
                        <div className="image flex flex-col items-center">
                            <img
                                src={
                                    user &&
                                    `http://192.168.0.208:9090${user.memberImgURL}`
                                }
                                className="rounded-full w-32 h-32 "
                                alt="profile"
                            />
                        </div>
                        <div className="name text-white  flex flex-col items-center text-2xl  mt-4 z-10">
                            {user && user.nickName}
                        </div>
                    </div>
                </div>

                <BsFillHeartFill className="text-white mt-16 hover:text-red-400 hover:duration-300 hover:scale-110" />

                <div className="main">
                    <div className="card p-4  rounded-2xl w-48 h-60 ">
                        <div className="image flex flex-col items-center">
                            <img
                                src={
                                    user &&
                                    `http://192.168.0.208:9090${user.otherMemberImgURL}`
                                }
                                className="rounded-full w-32 h-32 "
                                alt="profile"
                            />
                        </div>
                        <div className="name  text-white  flex flex-col items-center text-2xl  mt-4 z-10">
                            {user && user.otherName}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ProfileCard;
