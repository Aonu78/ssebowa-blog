import Image from 'next/image'
import React from 'react'
import styles from "./Footer.module.css"
import logo from "../../public/logo.png";
import { NavLink } from '../Navbar/Navbar';
import { RiSearch2Line } from "react-icons/ri";
import {
  HiMenuAlt3,
  HiOutlineGlobeAlt,
  HiOutlineInformationCircle,
  HiHome,
  HiGift,
} from "react-icons/hi";

function Footer() {
  return (
    <div className={styles.FooterMain} >
        <div className={styles.FooterInner}>
        <NavLink
          LinkName={"HOME"}
          LinkHref={"/"}
          sidebar={false}
          donate={true}
          active={false}
        >
          <HiHome size={20} />
        </NavLink>
        <NavLink
          LinkName={"SEARCH ENGINE"}
          LinkHref={"/"}
          sidebar={false}
          donate={true}
          active={false}
        >
          <HiOutlineGlobeAlt size={20} />
        </NavLink>
        <Image src={logo} className={styles.FooterLogo} width={200} height={200}  />
        <NavLink
          LinkName={"ABOUT"}
          LinkHref={"/"}
          sidebar={false}
          donate={true}
          active={false}
        >
          <HiOutlineInformationCircle size={20} />
        </NavLink>

        <NavLink
          LinkName={"GIFT"}
          LinkHref={"/"}
          sidebar={false}
          active={false}
          donate={true}
        >
          <HiGift size={20} />
        </NavLink>
        </div>
    </div>
  )
}

export default Footer