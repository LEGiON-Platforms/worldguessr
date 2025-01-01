import { useEffect, useRef, useState } from "react"
import getAvatar from "../../utils/getAvatar"
import { translate } from "ol/transform";

export default function HomeContent({ loading, setScreen, handleMultiplayerAction, maintenance, multiplayerState, setMapModal }) {


    const [avatarPath, setAvatarPath] = useState("")
    const inputRef = useRef();
    const [selectDropdown, setSelectDropdown] = useState(false)
    // ref for the dropdown of the buttons
    const optionsRef = useRef();
    const privateRef = useRef();


    useEffect(() => {
        inputRef.current.focus();
        optionsRef.current.focus();
        console.log(optionsRef.current)

        const path = getAvatar();
        setAvatarPath(path);

        setTimeout(() => {
            setAvatarPath(getAvatar())
        }, 15000);


    }, [])

    useEffect(() => {
        const handleOutsideClick = (e) => {
            // `optionsRef.current` checked to check if the opitonsRef pointed element is active or not at the time of outside click as optionsRef.current points to the element if focused
            // `!optionsRef.current.contains(e.target)` is true even if the private button is clicked , so seperate ref for the private btn needed
            if (!privateRef.current.contains(e.target) && !optionsRef.current.contains(e.target)) {
                setSelectDropdown(false)
            }
        };

        document.addEventListener("mousedown", handleOutsideClick)

        return () => document.removeEventListener("mousedown", handleOutsideClick)

    }, [])


    return (
        <>
            <div className=" flex flex-col relative bottom-10">
                <div className=" text-center flex flex-col  gap-5 items-center">
                    <h1 className="text-7xl font-extrabold animate-bounce ">WorldGuessr </h1>
                    <h3 className="text-xl underline font-bold">A free multiplayer geography guessing game !!</h3>
                    <img src={avatarPath} className="w-20 h-20  rounded-full bg-purple-200" />
                </div>
                <div className="gameEntry">
                    {/* Nickname and Play Section */}
                    <div className="flex items-center gap-0">
                        <div className="relative w-full">
                            <input ref={inputRef} type="text" className="w-full placeholder:font-medium placeholder:text-white m-0 outline-0 rounded-l-full outline-none text-white font-bold" placeholder="Nickname ..." />
                            <lord-icon
                                src="https://cdn.lordicon.com/hotfkuyz.json"
                                trigger="loop"
                                // state="loop-ar"
                                delay="2000"
                                style={{ width: "30px", height: "30px" }}
                                class="invert absolute top-4 right-4">
                            </lord-icon>
                        </div>
                        <span className="text-lg px-3 py-2 relative -left-3 rounded-r-full text-nowrap bg-pink-950 text-white font-extrabold cursor-pointer "
                            onClick={() => {
                                if (!loading) {
                                    // setScreen("singleplayer")
                                    crazyMidgame(() => setScreen("singleplayer"))
                                }
                            }}
                        ><span className="text-lg font-extrabold animate-pulse">Quick Play</span></span>
                    </div>
                    {/* All the different options */}
                    <div className="flex flex-col gap-3 w-full">
                        <div className="flex gap-2 w-full  justify-around">
                            <button className="text-2xl px-5 py-2  rounded-full text-nowrap bg-teal-500 text-white font-extrabold cursor-pointer
                            hover:bg-teal-800 disabled:cursor-not-allowed hover:scale-105"
                                onClick={() => {
                                    console.log(`clicked the duel option`)
                                    handleMultiplayerAction("publicDuel")
                                }}
                                // to disable the button when either the user is not connected to the server or  maintainence is ongoing
                                disabled={!multiplayerState?.connected || maintenance}
                            >Find A Duel</button>
                            <button className="text-2xl px-5 py-2  rounded-full text-nowrap bg-emerald-500
                            hover:bg-emerald-700 text-white font-extrabold cursor-pointer disabled:cursor-not-allowed hover:scale-105"
                                // to disable the button when either the user is not connected to the server or  maintainence is ongoing
                                disabled={!multiplayerState?.connected || maintenance}
                                onClick={() => setMapModal(true)}
                            >Custom Maps</button>
                        </div>
                        <div className="flex flex-col items-center gap-2">
                            {/* Main Button */}
                            <button
                                ref={privateRef}
                                onClick={() => {
                                    setSelectDropdown(!selectDropdown)
                                }}
                                className="text-2xl px-8 py-2 rounded-full bg-orange-500 hover:bg-orange-700  text-white font-extrabold flex flex-col items-center gap-3 disabled:cursor-not-allowed hover:scale-105"
                                // to disable the button when either the user is not connected to the server or  maintainence is ongoing
                                disabled={!multiplayerState?.connected || maintenance}
                            >
                                <div className="flex items-center gap-2">
                                    {/* Icon */}
                                    <div className={`${selectDropdown ? "rotate-180 relative -top-0.5" : "relative top-1"}`}>
                                        <lord-icon
                                            src="https://cdn.lordicon.com/xcrjfuzb.json"
                                            trigger="loop"
                                            delay="1000"
                                            style={{ width: "30px", height: "30px" }}
                                            className="invert"
                                        ></lord-icon>

                                    </div>
                                    {/* Button Label */}
                                    <span className="font-extrabold">Private Game</span>
                                </div>
                            </button>
                            {/* Dropdown Options */}
                            {/* */}
                            <div ref={optionsRef} className="fixed bottom-32 transition-all duration-300 ease-in-out">
                                {selectDropdown && (
                                    // Buttons wrapper
                                    <div className={`flex flex-col gap-2 w-full transition-all duration-300 ease-in-out origin-top ${selectDropdown ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
                                        <div className="flex justify-center" disabled={multiplayerState?.connected || maintenance} onClick={() => handleMultiplayerAction("joinPrivateGame")}
                                        >
                                            <button className="border-x-2 border-y-2 p-2 pr-4 border-fuchsia-600 btnField text-lg flex gap-2 items-center animate-bounce disabled:cursor-not-allowed hover:scale-105">
                                                <lord-icon
                                                    src="https://cdn.lordicon.com/nfgmqqvs.json"
                                                    trigger="loop"
                                                    delay="1000"
                                                    style={{ width: "25px", height: "25px" }}
                                                    className=""
                                                ></lord-icon>
                                                <span className="text-pink-700 font-extrabold">Join a Private Game</span>
                                            </button>
                                        </div>
                                        <div className="flex justify-center" disabled={!multiplayerState?.connected || maintenance} onClick={() => handleMultiplayerAction("createPrivateGame")} >
                                            <button className="border-x-2 border-y-2 p-2 pr-4 border-fuchsia-600 btnField text-lg flex gap-2 items-center animate-bounce  disabled:cursor-not-allowed hover:scale-105">
                                                <lord-icon
                                                    src="https://cdn.lordicon.com/bhprdjgb.json"
                                                    trigger="loop"
                                                    delay="1200"
                                                    style={{ width: "25px", height: "25px" }}
                                                    className=""
                                                ></lord-icon>
                                                <span className="text-pink-700 font-extrabold">Host a Private Game</span>
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                    </div>
                </div>
            </div >
        </>
    )
}