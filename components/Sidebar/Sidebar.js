import React from 'react'
import styles from "./Sidebar.module.css"
import {NavLink,NavSearch} from "../Navbar/Navbar";
import {HiMenuAlt3,HiOutlineGlobeAlt,HiOutlineInformationCircle,HiHome,HiGift} from "react-icons/hi"
import Image from "next/image";
import logo from "../../public/logo.png"
import {RiSearch2Line} from 'react-icons/ri'
import {CgClose} from 'react-icons/cg'


function Sidebar({visible,toggleSidebar}) {
  return (
    <>
    <div className={visible ? styles.SideBarLayover :styles.SideBarLayoverHidden} onClick={()=>toggleSidebar()} >
    </div>
    <div className={visible ? styles.SideBarMain : styles.SideBarMainHidden}>
    <button className={styles.SidebarCancelButton} onClick={()=>toggleSidebar()} >
<CgClose size={25}/>
</button>
    <div className={styles.TopSidebar} >
        <Image src={logo} className={styles.Logo}  />
        <p className={styles.blogTitle}>Blogs</p>

        </div>
        <NavSearch sidebar/>
        <NavLink sidebar LinkName={'HOME'} LinkHref={'/'} active >
          <HiHome   size={20}   />
        </NavLink>
        <NavLink sidebar LinkName={'ABOUT'} LinkHref={'/'} >
          <HiOutlineInformationCircle  size={20}   />
        </NavLink>
        <NavLink sidebar LinkName={'SEARCH ENGINE'} LinkHref={'/'} >
          <HiOutlineGlobeAlt  size={20}   />
        </NavLink>
        <NavLink sidebar LinkName={'GIFT'} LinkHref={'/'} donate >
          <HiGift  size={20}  />
        </NavLink>
        
        
      </div>
    </>
  )
}

export default Sidebar