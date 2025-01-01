import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { FaDiscord, FaGithub } from "react-icons/fa";
import { FaGear, FaRankingStar, FaYoutube } from "react-icons/fa6";
import { MdOutlineKeyboardArrowDown } from 'react-icons/md';
import Blur from "@/components/Blur/Blur";

export default function Sidebar({ isApp, inCrazyGames, setSettingsModal }) {

    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isSocialsOpen, setIsSocialsOpen] = useState(false);
    const [isOtherOpen, setIsOtherOpen] = useState(false);

    const sideBarRef = useRef();
    const sideBtnRef = useRef();

    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
    const toggleSocials = () => setIsSocialsOpen(!isSocialsOpen);
    const toggleOther = () => setIsOtherOpen(!isOtherOpen);

    useEffect(() => {
        console.log(sideBarRef.current)
        sideBarRef.current.focus();
        console.log(`sideBtn Ref is `, sideBtnRef.current)

        const handleOutsideClick = (e) => {
            // `sideBarRef.current` checked to check if the sideBarRef pointed element is active or not at the time of outside click as sideBarRef points to the element if focused
            if (!sideBtnRef.current.contains(e.target) && !sideBarRef.current.contains(e.target)) {
                setIsSidebarOpen(false);
            }
        };

        document.addEventListener("mousedown", handleOutsideClick)

        return () => document.removeEventListener("mousedown", handleOutsideClick)

    }, [])


    return (

        <div className="relative">
            {/* BTN TO CLICK AND OPEN THE SIDEBAR */}
            <button ref={sideBtnRef}
                className={`fixed  animate-pulse top-1/4 ${isSidebarOpen ? "-rotate-90" : "rotate-90"} left-0 transform -translate-y-1/2 font-bold py-2 px-4 rounded-full border-none bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg`}
                onClick={toggleSidebar}
            >
                <lord-icon
                    src="https://cdn.lordicon.com/ternnbni.json"
                    colors="primary:#c7166f"
                    trigger="loop"
                    delay="1000"
                    state="hover-arrow-up-2"
                    style={{ width: "50px", height: "50px" }}
                    className="border-none outline-none overflow-hidden"
                ></lord-icon>
            </button>

            <div ref={sideBarRef} className={`absolute top-1/3 left-0 h-auto w-64 border-blue-400 border text-white transition-all duration-300 ease-in-out shadow-lg rounded-lg ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <div className="flex flex-col items-center justify-center h-full w-full">
                    <div className="flex-grow flex items-center p-6 space-y-6 w-full">
                        {!isApp && (
                            <div className="flex flex-col items-center w-full">
                                {/* Socials */}
                                <div className="flex items-center justify-center w-full mb-4" onClick={toggleSocials}>
                                    <button className="text-2xl px-4 py-1 rounded-full bg-purple-400 text-white font-extrabold flex flex-col items-center gap-2">
                                        <div className="flex items-center gap-2 justify-center">
                                            {/* Button Label */}
                                            <span className="font-extrabold text-lg">Connect With Us</span>
                                            {/* Icon */}
                                            <div className={`${isSocialsOpen && "rotate-180"}`}>
                                                <lord-icon
                                                    src="https://cdn.lordicon.com/xcrjfuzb.json"
                                                    trigger="loop"
                                                    delay="1000"
                                                    style={{ width: "30px", height: "30px" }}
                                                    className="invert"
                                                ></lord-icon>
                                            </div>
                                        </div>
                                    </button>
                                </div>
                                {isSocialsOpen && (
                                    <div className="flex flex-col items-center gap-4 w-full">
                                        <Link target="_blank" href="https://discord.com/invite/ubdJHjKtrC">
                                            <button className="flex items-center justify-center w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105">
                                                <FaDiscord className="mr-2" /> Discord
                                            </button>
                                        </Link>
                                        <Link target="_blank" href="https://www.youtube.com/@worldguessr?sub_confirmation=1">
                                            <button className="flex items-center justify-center w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105">
                                                <FaYoutube className="mr-2" /> YouTube
                                            </button>
                                        </Link>
                                        <Link target="_blank" href="https://github.com/codergautam/worldguessr">
                                            <button className="flex items-center mb-3 justify-center w-full bg-gray-600 hover:bg-gray-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105">
                                                <FaGithub className="mr-2" /> GitHub
                                            </button>
                                        </Link>
                                    </div>
                                )}

                                {/* Other options */}
                                <div className="flex items-center justify-center w-full mb-4" onClick={toggleOther}>
                                    <button className="text-2xl px-4 py-1 rounded-full bg-purple-400 text-white font-extrabold flex flex-col items-center gap-2">
                                        <div className="flex  gap-3 justify-center">
                                            {/* Button Label */}
                                            <span className="font-extrabold text-lg">Others</span>
                                            {/* Icon */}
                                            <div className={`${isOtherOpen && "rotate-180"} w-30`}>
                                                <lord-icon
                                                    src="https://cdn.lordicon.com/xcrjfuzb.json"
                                                    trigger="loop"
                                                    delay="1000"
                                                    style={{ width: "30px", height: "30px" }}
                                                    className="invert"
                                                ></lord-icon>
                                            </div>
                                        </div>
                                    </button>
                                </div>
                                {isOtherOpen && (
                                    <div className="flex flex-col items-center gap-4 w-full">
                                        <Link href={`/leaderboard${inCrazyGames ? "?crazygames" : ""}`}>
                                            <button className="flex items-center justify-center w-full bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105">
                                                <FaRankingStar className="mr-2" /> Leaderboard
                                            </button>
                                        </Link>
                                        <button
                                            className="flex items-center justify-center px-3 bg-green-500 hover:bg-green-600 text-white font-semibold py-2  rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105"
                                            onClick={() => setSettingsModal(true)}
                                        >
                                            <div onClick={() => setSettingsModal(true)} className="flex items-center">
                                                <FaGear className="mr-2" /> Settings
                                            </div>
                                        </button>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div >
    );
}
