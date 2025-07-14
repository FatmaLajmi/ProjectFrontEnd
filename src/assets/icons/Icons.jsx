// import { BsFillPencilFill, BsFillTrashFill, BsFillDpadFill } from 'react-icons/bs';
// import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
// import { TbLogout } from "react-icons/tb";
// import { CgProfile } from "react-icons/cg";
// import { HiMiniShoppingCart } from "react-icons/hi2";
// import { RiLoginBoxFill, RiAccountPinBoxFill } from "react-icons/ri"; // Alternative versions

// export const EditIcon = () => <BsFillPencilFill />;  // Edit Icon
// export const DeleteIcon = () => <BsFillTrashFill />;  // Delete Icon
// export const CreateIcon = () => <BsFillDpadFill />;  // Create Icon
// export const LogoutIcon = () => <TbLogout />;  // Logout Icon
// export const ProfileIcon = () => <CgProfile />;  // Profile Icon
// export const ShopIcon = () => <HiMiniShoppingCart />;  // Shop Icon
// export const LoginIcon = () => <FaSignInAlt />;  // Simple version
// export const SignupIcon = () => <FaUserPlus />;  // Simple version

// // Social Media Icons
// export const FacebookIcon = ({size}) => <FaFacebook  size={size}/>;
// export const InstagramIcon = ({size}) => <FaInstagram  size={size}/>;
// export const XIcon = ({size}) => <FaTwitter size={size} />;
// export const YoutubeIcon = ({size}) => <FaYoutube size={size}/>;

import { BsFillPencilFill, BsFillTrashFill, BsFillDpadFill } from 'react-icons/bs';
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube, FaSignInAlt, FaUserPlus } from "react-icons/fa";
import { TbLogout } from "react-icons/tb";
import { CgProfile } from "react-icons/cg";
import { HiMiniShoppingCart } from "react-icons/hi2";

export const EditIcon = () => <BsFillPencilFill />;
export const DeleteIcon = () => <BsFillTrashFill />;
export const CreateIcon = () => <BsFillDpadFill />;
export const LogoutIcon = () => <TbLogout />;
export const ProfileIcon = () => <CgProfile />;
export const ShopIcon = () => <HiMiniShoppingCart />;

// Authentication Icons
export const LoginIcon = () => <FaSignInAlt />;  // Simple version
// or
//export const LoginIcon = () => <RiLoginBoxFill />;  // More detailed version

export const SignupIcon = () => <FaUserPlus />;  // Simple version
// or
//export const SignupIcon = () => <RiAccountPinBoxFill />;  // More detailed version

// Social Media Icons
export const FacebookIcon = ({size}) => <FaFacebook size={size}/>;
export const InstagramIcon = ({size}) => <FaInstagram size={size}/>;
export const XIcon = ({size}) => <FaTwitter size={size} />;
export const YoutubeIcon = ({size}) => <FaYoutube size={size}/>;