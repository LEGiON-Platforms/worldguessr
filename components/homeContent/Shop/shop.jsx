import { useState, useRef, useEffect } from "react";

const initialAvatars = [
  { id: 1, name: "Avatar 1", image: "avatar1.png", unlocked: true },
  { id: 2, name: "Avatar 2", image: "avatar2.png", unlocked: true },
  { id: 3, name: "Avatar 3", image: "avatar3.png", unlocked: false, cost: 50 },
  { id: 4, name: "Avatar 4", image: "avatar4.png", unlocked: false, cost: 100 },
];

export default function Shop({ setIsShopOpen, userCoins, setUserCoins }) {
  const [avatars, setAvatars] = useState(initialAvatars);
  const [selectedAvatar, setSelectedAvatar] = useState(null);
  const shopRef = useRef(null);

  useEffect(() => {``
    const clickOutsideShop = (e) => {
      if (shopRef.current && !shopRef.current.contains(e.target)) {
        setIsShopOpen(false);
      }
    };

    document.addEventListener("mousedown", clickOutsideShop);
    return () => document.removeEventListener("mousedown", clickOutsideShop);
  }, [setIsShopOpen]);

  const unlockAvatar = (id, cost) => {
    if (userCoins >= cost) {
      setAvatars((prevAvatars) =>
        prevAvatars.map((avatar) =>
          avatar.id === id ? { ...avatar, unlocked: true } : avatar
        )
      );
      setUserCoins((prevCoins) => prevCoins - cost);
    } else {
      alert("Not enough coins to unlock this avatar.");
    }
  };

  const selectAvatar = (id) => {
    const avatar = avatars.find((a) => a.id === id && a.unlocked);
    if (avatar) {
      setSelectedAvatar(id);
      alert(`${avatar.name} selected!`);
      // Save selected avatar to the server or local storage
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div
        ref={shopRef}
        className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl p-8 relative"
      >
        <button
          onClick={() => setIsShopOpen(false)}
          className="absolute top-4 right-4 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-red-600"
        >
          ✕
        </button>
        <h2 className="text-3xl font-extrabold text-gray-800 text-center mb-6">
          Avatar Shop
        </h2>
        <p className="text-center text-lg font-semibold mb-4">
          Coins: <span className="text-yellow-500">{userCoins}</span>
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {avatars.map((avatar) => (
            <div
              key={avatar.id}
              className={`${
                selectedAvatar === avatar.id ? "border-4 border-blue-500" : ""
              } bg-gray-100 rounded-lg p-4 shadow hover:shadow-lg transition-shadow duration-300`}
            >
              <img
                src={avatar.image}
                alt={avatar.name}
                className="w-24 h-24 mx-auto object-cover rounded-lg mb-4"
              />
              <h3 className="text-lg font-semibold text-gray-700 text-center">
                {avatar.name}
              </h3>
              {avatar.unlocked ? (
                <button
                  onClick={() => selectAvatar(avatar.id)}
                  className={`${
                    selectedAvatar === avatar.id
                      ? "bg-blue-500"
                      : "bg-green-500"
                  } text-white w-full mt-4 py-2 rounded-lg hover:bg-green-600 font-semibold`}
                >
                  {selectedAvatar === avatar.id ? "Selected" : "Select"}
                </button>
              ) : (
                <button
                  onClick={() => unlockAvatar(avatar.id, avatar.cost)}
                  className="w-full mt-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 font-semibold"
                >
                  Unlock for {avatar.cost} Coins
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
