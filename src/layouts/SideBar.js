import { NavLink } from "react-router-dom";
import { FaBars, FaHome, FaLock, FaMoneyBill, FaUser, FaGift,FaUserFriends, FaSafari, FaUserLock} from "react-icons/fa";
import { IoIosBed } from "react-icons/io";
import { MdHolidayVillage, MdManageAccounts, MdPolicy } from "react-icons/md";
import { MdMessage } from "react-icons/md";
import { BiAnalyse, BiSearch } from "react-icons/bi";
import { BiCog } from "react-icons/bi";
import { AiFillHeart, AiOutlineLogout, AiTwotoneFileExclamation } from "react-icons/ai";
import { CgUserList } from "react-icons/cg";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import SidebarMenu from "../layouts/SidebarMenu";

const Routes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: <FaHome />,
  },
  {
    name: "Employee",
    icon: <FaUserFriends />,
    subRoutes: [
      {
        path: "/employee",
        name: "Employees",
        icon: <CgUserList />,
      },
      {
        path: "/ManageEmployee",
        name: "Manage",
        icon: <MdManageAccounts />
      },
      {
        path: "/employeeProfile",
        name: "Profile",
        icon: <FaUser />,
      },
      {
        path: "/employeePolicy",
        name: "Policy",
        icon: <MdPolicy/>,
      },
    ],
  },
  {
    name: "Leave",
    icon: <IoIosBed />,
    subRoutes: [
      {
        path: "/myLeave",
        name: "MyLeaves",
        icon: <IoIosBed />,
      },
      {
        path: "/ManageLeave",
        name: "Manage",
        icon: <MdManageAccounts />,
      },
    ],
  },
  {
    path: "/holiday",
    name: "Holiday",
    icon: <MdHolidayVillage />,
  },
  {
    path: "/manageRole",
    name: "RoleRights",
    icon: <FaUserLock />,
  },
  {
    path: "/settings",
    name: "Settings",
    icon: <BiCog />,
    exact: true,
    subRoutes: [
      {
        path: "/settings/2fa",
        name: "2FA",
        icon: <FaLock />,
      },
      {
        path: "/settings/billing",
        name: "Billing",
        icon: <FaMoneyBill />,
      },
    ],
  },
  {
    path: "/saved",
    name: "Saved",
    icon: <AiFillHeart />,
  },
  {
    path: "/logout",
    name: "Logout",
    icon: <AiOutlineLogout />,
  },
];

const SideBar = ({ children }) => {
  let token = localStorage.getItem('accessToken')
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  const inputAnimation = {
    hidden: {
      width: 0,
      padding: 0,
      transition: {
        duration: 0.2,
      },
    },
    show: {
      width: "140px",
      padding: "5px 15px",
      transition: {
        duration: 0.2,
      },
    },
  };

  const showAnimation = {
    hidden: {
      width: 0,
      opacity: 0,
      transition: {
        duration: 0.5,
      },
    },
    show: {
      opacity: 1,
      width: "auto",
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    // !token ? (<></>):
    <>
      <div className="main-container"> {token && <motion.div animate={{ width: isOpen ? "200px" : "45px", transition: { duration: 0.5, type: "spring", damping: 10, },}} className={`sidebar `} >
          <div className="top_section">
            <AnimatePresence> 
              {isOpen && ( <motion.h1 variants={showAnimation} initial="hidden" animate="show" exit="hidden" className="logo" style={{marginTop:"11px", marginLeft:"40px"}} > HRM </motion.h1> )}
            </AnimatePresence>
            <div className="bars">
              <FaBars onClick={toggle} />
            </div>
          </div>
          <div className="search">
            <div className="search_icon">
              <BiSearch />
            </div>
            <AnimatePresence>
              {isOpen && (
                <motion.input
                  initial="hidden"
                  animate="show"
                  exit="hidden"
                  variants={inputAnimation}
                  type="text"
                  placeholder="Search"
                />
              )}
            </AnimatePresence>
          </div>
          <section className="routes"> {Routes.map((route, index) => { if (route.subRoutes) {
              return (<SidebarMenu setIsOpen={setIsOpen} route={route} showAnimation={showAnimation} isOpen={isOpen} /> );
              }

              return (
                <NavLink to={route.path} key={index} className="link" activeClassName="active">
                  <div className="icon">{route.icon}</div>
                  <AnimatePresence>
                    {isOpen && (<motion.div variants={showAnimation} initial="hidden" animate="show" exit="hidden" className="link_text"> {route.name} </motion.div> )}
                  </AnimatePresence>
                </NavLink>
              );
            })}
          </section>
        </motion.div>}

        <main>{children}</main>
      </div>
    </>
  );
};

export default SideBar;
