import React, { useState, useEffect } from "react";
import { GrGallery } from "react-icons/gr";
import { IoClose } from "react-icons/io5";
import imageCompression from "browser-image-compression";

import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAccount } from "wagmi";
import { ApiUrl } from "../Config/config";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { isUserExists } from "../Config/Contract-Methods";
function Profile({ user }) {
  const { address, isConnected } = useAccount();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email);
  const [description, setDescription] = useState(user?.description || "");
  const [socialLinks, setSocialLinks] = useState([]);
  const [currentLink, setCurrentLink] = useState("");
  const [selectedPlatform, setSelectedPlatform] = useState("");
  // const [Img, setImg] = useState("")
  const [extUser, setextUser] = useState(false);
  const [profileImage, setProfileImage] = useState(null); // Profile image state
  const CheckForUser = async (address) => {
    try {
      let boo = await isUserExists(address);
      setextUser(boo);
      if (boo === true) {
        // api call here too check user exsists in db or not?
      }
      else {
        navigate('/register')
      }
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    CheckForUser(address);
  }, [isConnected]);
  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setEmail(user.email || "");
      setDescription(user.description || "");
      if (user.socialLinks) {
        const links = Object.entries(user.socialLinks).map(
          ([platform, url]) => ({
            platform,
            url,
          })
        );
        setSocialLinks(links);
      }
      setProfileImage(user.profileImage)
    }

    // Load profile image from localStorage
    // const storedImage = localStorage.getItem("profilePhoto");
    // if (storedImage) {
    //   setProfileImage(storedImage);
    // }
  }, [user]);


  const handleImageChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;
    try {
      // Step 1: Check file size (optional)
      if (file.size > 1024 * 1024 * 1) {
        alert("Image too large. select a file under 1MB.");
        return;
      }
      // Step 2: Compress the image
      const compressedFile = await imageCompression(file, {
        maxSizeMB: 1,             // Compress to under 1MB
        maxWidthOrHeight: 1024,   // Optional: resize
        useWebWorker: true,
      });
  
      // Step 3: Convert compressed image to Base64
      const base64 = await convertToBase64(compressedFile);
      setProfileImage(base64);
          // setImg(base64)
     
  
    } catch (error) {
      console.error("Image processing failed:", error);
    }
  };
  
  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file); // This includes the "data:image/..." prefix
      reader.onload = () => resolve(reader.result);
      reader.onerror = (err) => reject(err);
    });
  };
  
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleClickOutside = (event) => {
    if (event.target.id === "modal-overlay") {
      closeModal();
    }
  };

  const addSocialLink = () => {
    if (currentLink && selectedPlatform) {
      setSocialLinks([
        ...socialLinks,
        { platform: selectedPlatform, url: currentLink },
      ]);
      setCurrentLink("");
      setSelectedPlatform("");
    }
  };

  const createUser = async (e) => {
    e.preventDefault();

    if (!address) {
      alert("Please connect your wallet first.");
      return;
    }

    const formattedSocialLinks = socialLinks.reduce((acc, link) => {
      acc[link.platform.toLowerCase()] = link.url;
      return acc;
    }, {});

    const userData = {
      name,
      profileImage,
      email,
      description,
      walletAddress: address,
      socialLinks: formattedSocialLinks,
    };

    try {
      let response;
      if (user?.id) {
        response = await axios.post(
          `${ApiUrl}/profile-upgradation`,
          userData
        );
      } else {
        response = await axios.post(
          `${ApiUrl}/api/profile`,
          userData
        );
      }

      setTimeout(() => {
        window.location.reload();
      }, 1000);
      navigate("/home");
    } catch (error) {
      console.error(
        "Error saving profile:",
        error.response?.data || error.message
      );
      alert("img size is too large ");
    }
  };

  useEffect(() => {
    if (isModalOpen) {
      document.addEventListener("click", handleClickOutside);
    } else {
      document.removeEventListener("click", handleClickOutside);
    }
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isModalOpen]);



console.log("kashif",profileImage);


  return (
    <>
      {isConnected ? (
        <div>
          <div className="w-[95%] mx-auto mb-5">
            <p className="text-textColor2 my-2">
              Dashboard / <span className="text-textColor3">Profile</span>
            </p>
            <p className="text-textColor3 text-xl font-medium">Profile</p>
            <div className="h-[70vh] w-full my-2 bg-Background rounded-lg py-5 flex flex-col justify-start items-center">
              <div className="relative">
                <div className="h-[70px] w-[70px] rounded-full overflow-hidden bg-[#5c5c5c] flex justify-center items-center">
                  {profileImage ? (
                    <img
                      src={profileImage}
                      alt="Profile ddsd"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <GrGallery className="text-xl text-textColor3" />
                                              // <div>
                                              //   <IoPersonCircleSharp className="text-8xl text-textColor3" />
                                              // </div>
                    
                  )}
                </div>
                <label className="absolute bottom-0 right-0 bg-white p-1 rounded-full cursor-pointer">
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageChange}
                  />
                  📷
                </label>
              </div>

              <p className="text-textColor2 font-medium text-center my-2">
                Choose your Photo
              </p>

              <form>
                <label className="text-textColor2 font-medium block mt-3 mb-1">
                  Nickname
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="bg-[#5c5c5c] py-3 px-3 w-[320px] rounded text-textColor3 outline-none"
                  placeholder="Your Nickname"
                />
                <label className="text-textColor2 font-medium block mt-3 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-[#5c5c5c] py-3 px-3 w-[320px] rounded text-textColor3 outline-none"
                  placeholder="Your Email"
                />
                <label className="text-textColor2 font-medium block mt-3 mb-1">
                  Description
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="h-[15vh] w-[320px] text-white rounded bg-[#5c5c5c] px-3 py-2 outline-none"
                  placeholder="Your Description"
                ></textarea>
              </form>
            </div>

            <div className="w-full h-[20vh] px-5 py-3 bg-Background rounded-lg my-4">
              <p className="text-gray-300">Social media accounts</p>
              <button
                className="bg-white font-medium w-[90%] py-2 rounded-lg my-4 mx-auto block"
                onClick={openModal}
              >
                Add social page
              </button>
              {socialLinks.map((link, index) => (
                <div key={index} className="text-white">
                  {link.platform}: {link.url}
                </div>
              ))}
            </div>

            {isModalOpen && (
              <div
                id="modal-overlay"
                className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
              >
                <div className="bg-black w-[90%] max-w-[600px] p-6 rounded-lg relative">
                  <IoClose
                    onClick={closeModal}
                    className="absolute top-2 right-2 text-2xl text-gray-500 cursor-pointer"
                  />
                </div>
              </div>
            )}

            <button
              className="text-white bg-gradient-to-r from-[#01F7FF] to-[#9B51E0] shadow-md w-[80%] py-2 rounded-lg mx-auto block"
              onClick={createUser}
            >
              Save Changes
            </button>
          </div>
        </div>
      ) : (
        <div className="flex flex-column justify-center items-center ">
          <div className="flex justify-center items-center h-[150px] flex-col gap-5 text-white bg-[#1C1F2E] rounded-md  shadow-md p-4">
            <div>Connect your Wallet to access profile</div>
            <div className="bg-[#9B51E0] hover:bg-[#00F6FF] w-auto px-7 py-3 rounded-md cursor-pointer flex justify-center items-center transition-all duration-300">
              <ConnectButton
                showBalance={false}
                accountStatus="address"
                chainStatus="none"
                label="Connect Wallet"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Profile;

// import React, { useState, useEffect } from "react";
// import { GrGallery } from "react-icons/gr";
// import { IoClose } from "react-icons/io5";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import { useAccount } from "wagmi";
// import { ApiUrl } from "../Config/config";

// function Profile({ user }) {
//   const { address } = useAccount();
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const navigate = useNavigate();

//   const [name, setName] = useState(user?.name || "");
//   const [email, setEmail] = useState(user?.email || "");
//   const [description, setDescription] = useState(user?.description || "");
//   const [socialLinks, setSocialLinks] = useState([]);
//   const [currentLink, setCurrentLink] = useState("");
//   const [selectedPlatform, setSelectedPlatform] = useState("");

//   useEffect(() => {
//     if (user) {
//       setName(user.name || "");
//       setEmail(user.email || "");
//       setDescription(user.description || "");
//       if (user.socialLinks) {
//         const links = Object.entries(user.socialLinks).map(
//           ([platform, url]) => ({
//             platform,
//             url,
//           })
//         );
//         setSocialLinks(links);
//       }
//     }
//   }, [user]);

//   const openModal = () => setIsModalOpen(true);
//   const closeModal = () => setIsModalOpen(false);

//   const handleClickOutside = (event) => {
//     if (event.target.id === "modal-overlay") {
//       closeModal();
//     }
//   };

//   const addSocialLink = () => {
//     if (currentLink && selectedPlatform) {
//       setSocialLinks([
//         ...socialLinks,
//         { platform: selectedPlatform, url: currentLink },
//       ]);
//       setCurrentLink("");
//       setSelectedPlatform("");
//     }
//   };

//   const createUser = async (e) => {
//     e.preventDefault();

//     if (!address) {
//       alert("Please connect your wallet first.");
//       return;
//     }

//     const formattedSocialLinks = socialLinks.reduce((acc, link) => {
//       acc[link.platform.toLowerCase()] = link.url;
//       return acc;
//     }, {});

//     const userData = {
//       name,
//       email,
//       description,
//       walletAdress: address,
//       socialLinks: formattedSocialLinks,
//     };

//     try {
//       let response;
//       if (user?.id) {
//         response = await axios.put(
//           `${ApiUrl}/update/profile/${user.id}`,
//           userData
//         );
//         setName(response?.data.data.name || name);
//         setEmail(response?.data.data.email || email);
//         setDescription(response?.data.data.description || description);
//         if (response?.data.data.socialLinks) {
//           const links = Object.entries(response?.data.data.socialLinks).map(
//             ([platform, url]) => ({
//               platform,
//               url,
//             })
//           );
//           setSocialLinks(links);
//         }
//       } else {
//         // If the user doesn't have a profile, create it
//         response = await axios.post(
//           "http://ec2-51-20-86-109.eu-north-1.compute.amazonaws.com/api/profile",
//           userData
//         );
//         // Update local state with the new data
//         setName(response?.data.data.name || name);
//         setEmail(response?.data.data.email || email);
//         setDescription(response?.data.data.description || description);
//         if (response?.data.data.socialLinks) {
//           const links = Object.entries(response?.data.data.socialLinks).map(
//             ([platform, url]) => ({
//               platform,
//               url,
//             })
//           );
//           setSocialLinks(links);
//         }
//       }

//       setTimeout(() => {
//         window.location.reload();
//       }, 1000);
//       navigate("/home");
//     } catch (error) {
//       console.error(
//         "Error saving profile:",
//         error.response?.data || error.message
//       );
//       alert("Failed to save profile.");
//     }
//   };

//   useEffect(() => {
//     if (isModalOpen) {
//       document.addEventListener("click", handleClickOutside);
//     } else {
//       document.removeEventListener("click", handleClickOutside);
//     }
//     return () => {
//       document.removeEventListener("click", handleClickOutside);
//     };
//   }, [isModalOpen]);

//   return (
//     <>
//       <div className="w-[95%] mx-auto mb-5">
//         <p className="text-textColor2 my-2">
//           Dashboard / <span className="text-textColor3">Profile</span>
//         </p>
//         <p className="text-textColor3 text-xl font-medium">Profile</p>
//         <div className="h-[70vh] w-full my-2 bg-Background rounded-lg py-5 flex flex-col justify-start items-center">
//           <div className="h-[70px] w-[70px] bg-[#5c5c5c] rounded-full flex justify-center items-center mx-auto">
//             <GrGallery className="text-xl text-textColor3" />
//           </div>
//           <p className="text-textColor2 font-medium text-center my-2">
//             Choose your Photo
//           </p>
//           <form>
//             <label className="text-textColor2 font-medium block mt-3 mb-1">
//               Nickname
//             </label>
//             <input
//               type="text"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               className="bg-[#5c5c5c] py-3 px-3 w-[320px] rounded text-textColor3 outline-none"
//               placeholder="Your Nickname"
//             />
//             <label className="text-textColor2 font-medium block mt-3 mb-1">
//               Email
//             </label>
//             <input
//               type="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               className="bg-[#5c5c5c] py-3 px-3 w-[320px] rounded text-textColor3 outline-none"
//               placeholder="Your Email"
//             />
//             <label className="text-textColor2 font-medium block mt-3 mb-1">
//               Description
//             </label>
//             <textarea
//               value={description}
//               onChange={(e) => setDescription(e.target.value)}
//               className="h-[15vh] w-[320px] text-white rounded bg-[#5c5c5c] px-3 py-2 outline-none"
//               placeholder="Your Description"
//             ></textarea>
//           </form>
//         </div>

//         <div className="w-full h-[20vh] px-5 py-3 bg-Background rounded-lg my-4">
//           <p className="text-gray-300">Social media accounts</p>
//           <div className="h-[11vh] w-full my-2 shadow-xl shadow-[#00000079] rounded-lg flex justify-center items-center bg-gradient-to-r from-[#695628d0] to-[#8f8673d0] ">
//             <div className="h-[93%] w-[98%] rounded-lg bg-Background">
//               <button
//                 className="bg-white font-medium w-[90%] py-2 rounded-lg my-4 mx-auto block"
//                 onClick={openModal}
//               >
//                 Add social page
//               </button>
//               {socialLinks.map((link, index) => (
//                 <div key={index} className="text-white">
//                   {link.platform}: {link.url}
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>

//         {isModalOpen && (
//           <div
//             id="modal-overlay"
//             className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
//           >
//             <div className="bg-black w-[90%] max-w-[600px] p-6 rounded-lg relative">
//               <IoClose
//                 onClick={closeModal}
//                 className="absolute top-2 right-2 text-2xl text-gray-500 cursor-pointer"
//               />
//               <div className="flex flex-col justify-center items-center py-6">
//                 <div>
//                   <p className="text-white font-semibold text-xl">
//                     Add social links
//                   </p>
//                   <p className="text-textColor2 font-medium text-sm text-center">
//                     Select social network
//                   </p>
//                 </div>
//                 <select
//                   value={selectedPlatform}
//                   onChange={(e) => setSelectedPlatform(e.target.value)}
//                   className="bg-Background text-white mb-3 py-2 w-full rounded px-2 outline-none"
//                 >
//                   <option value="">Select Platform</option>
//                   <option value="Facebook">Facebook</option>
//                   <option value="Twitter">Twitter</option>
//                   <option value="Instagram">Instagram</option>
//                   <option value="YouTube">YouTube</option>
//                   <option value="WhatsApp">WhatsApp</option>
//                 </select>
//                 <input
//                   type="text"
//                   value={currentLink}
//                   onChange={(e) => setCurrentLink(e.target.value)}
//                   className="bg-Background text-white py-2 w-full rounded px-2 outline-none"
//                   placeholder="Add your link"
//                 />
//                 <button
//                   className="w-full py-2 bg-Background text-white rounded mt-4"
//                   onClick={addSocialLink}
//                 >
//                   Add Link
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}

//         <button
//           className="text-white bg-gradient-to-r from-[#a67912] to-[#453b23] shadow-md shadow-[#3b3b3b79] w-[80%] py-2 rounded-lg mx-auto block"
//           onClick={createUser}
//         >
//           Save Changes
//         </button>
//       </div>
//     </>
//   );
// }

// export default Profile;
