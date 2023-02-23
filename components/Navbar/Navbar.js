import Link from "next/link";
import Image from "next/image";
import React from "react";
import styles from "./Navbar.module.css";
import SidebarStyles from "../Sidebar/Sidebar.module.css";
// @ts-ignore
import logo from "../../public/logo.png";
import { RiSearch2Line } from "react-icons/ri";
import {
  HiMenuAlt3,
  HiOutlineGlobeAlt,
  HiOutlineInformationCircle,
  HiHome,
  HiGift,
} from "react-icons/hi";
import {CgClose} from 'react-icons/cg'
import { useRouter } from 'next/router'

// import Sidebar from "../Sidebar/Sidebar.js"

export default function Navbar({ hideSearchFields }) {

  const [activePath,setActivePath] = React.useState('')
  const [SearchInput,SetSearchInput] = React.useState('')
  const [SidebarMode,setSidebarMode] = React.useState(false)
  const router = useRouter()

  React.useEffect(()=>{
    const l = window.location.pathname
    const o = l.split('/')[1] 
    if(o === 'search'){
      setActivePath('SEARCH')
    }else if(o =='post' ){
      setActivePath('POST')
    }else{
      setActivePath('HOME')
    }
  })


  const SubmitSearchRequest = ()=>{
        if(SearchInput === ""){
          router.push("/search", undefined, { shallow: true })
        }
        else{
          var url= "/search?s="+ SearchInput
          router.push(url, undefined, { shallow: true })
        }
        SetSearchInput("")
  }


  return (
    <>
    {SidebarMode?
    <div className={styles.SidebarBakdrop} onClick={()=>setSidebarMode(!SidebarMode)} ></div>
    :
    <></>
}
    <header className={SidebarMode ?  styles.headerMainSidebar  :styles.headerMain}>
      <Link
        href={"/"}
        style={{
          display: "flex",
          alignItems: "center",
          textDecoration: "none",
        }}
      >
        <Image
          src={logo}
          height={500}
          width={500}
          className={styles.logoImage}
          alt={""}
        />
        <p className={styles.LogoText}>BLOGS</p>
      </Link>
      {SidebarMode?
      <NavSideBarMode fcn={SubmitSearchRequest} activePath={activePath} />
      :
      <></>
      }




      

<> 
{hideSearchFields? <></>    :
<div className={styles.HideAfterAPoint}>
<form onSubmit={(e) =>{e.preventDefault(); SubmitSearchRequest()}} className={styles.searchFormNabar}  > 
          <input
              type={'search'}
              className={styles.SearchInput}
              style={{fontWeight:"bold"}}
              placeholder={'Search Blogs here'}
              value={SearchInput}
              onChange={(e) => SetSearchInput(e.target.value)}
              />
      </form>
      <NavSearch sidebar={false} active={activePath === 'SEARCH'} fcn={SubmitSearchRequest} inputValue={SearchInput} />
      </div>

}



      <div className={styles.rightSideNav}>
        <span className={styles.ShowAfterAPoint}>
      <NavSearch sidebar={false} active={activePath === 'SEARCH'} fcn={SubmitSearchRequest} inputValue={SearchInput} />
      </span>
        <NavLink
          LinkName={"HOME"}
          LinkHref={"/"}
          sidebar={false}
          donate={false}
          active={activePath === 'HOME'}
        >
          <HiHome size={20} />
        </NavLink>
        <NavLink
          LinkName={"WEB_SEARCH"}
          LinkHref={"https://ssebowa.org/search"}
          sidebar={false}
          donate={false}
          active={false}
        >
          <HiOutlineGlobeAlt size={20} />
        </NavLink>
        <NavLink
          LinkName={"ABOUT"}
          LinkHref={"https://ssebowa.org/about"}
          sidebar={false}
          donate={false}
          active={false}
        >
          <HiOutlineInformationCircle size={20} />
        </NavLink>

        <NavLink
          LinkName={"GIFT"}
          LinkHref={"https://ssebowa.org/"}
          sidebar={false}
          active={false}
          donate={true}
        >
          <HiGift size={20} />
        </NavLink>
      </div>
      </>
      <div className={styles.HamburgerSideNav}>
        {SidebarMode?
        <button
        className={styles.HamburgerSideNavButton}
        onClick={() => setSidebarMode(!SidebarMode)}
      >
        
        <CgClose size={30} />
      </button>
        :
        <>
      <NavSearch sidebar={false} active={activePath === 'SEARCH'} fcn={SubmitSearchRequest} />
        <button
          className={styles.HamburgerSideNavButton}
          onClick={() => setSidebarMode(!SidebarMode)}
        >
          
          <HiMenuAlt3 size={30} />
        </button>
        </>
        }

      </div>
    </header>
    </>
  );
}

export const NavSearch = ({ link,active,fcn }) => {

  return (
    <button onClick={fcn} className={active ? styles.NavSearchButtonActive :styles.NavSearchButton}>
      <RiSearch2Line size={25} />
    </button>
  );  
};

export const NavLink = ({
  LinkName,
  LinkHref,
  active,
  donate,
  children,
  sidebar,
}) => {
  return sidebar ? (
    <Link
      href={LinkHref}
      className={
        active
          ? SidebarStyles.SidebarLinkActive
          : donate
          ? SidebarStyles.SidebarLinkDonate
          : SidebarStyles.SidebarLink
      }
    >
      {children}
      <p className={SidebarStyles.SidebarLinkP}>{LinkName}</p>
    </Link>
  ) : (
    <Link
      href={LinkHref}
      className={
        active
          ? styles.NavLinkActive
          : donate
          ? styles.NavLinkDonate
          : styles.NavLink
      }
    >
      {children}
      <p className={styles.NavLinkP}>{LinkName}</p>
    </Link>
  );
};


const NavSideBarMode = ({activePath,fcn}) =>{
  return(
    <div className={styles.SidebarNavMain} >
        <NavSearch sidebar={false} active={activePath === 'SEARCH'} fcn={fcn} />
        <NavLink
          LinkName={"HOME"}
          LinkHref={"/"}
          sidebar={false}
          donate={false}
          active={activePath === 'HOME'}
        >
          <HiHome size={20} />
        </NavLink>
        <NavLink
          LinkName={"SEARCH ENGINE"}
          LinkHref={"https://ssebowa.org"}
          sidebar={false}
          donate={false}
          active={false}
        >
          <HiOutlineGlobeAlt size={20} />
        </NavLink>
        <NavLink
          LinkName={"ABOUT"}
          LinkHref={"https://ssebowa.org/about"}
          sidebar={false}
          donate={false}
          active={false}
        >
          <HiOutlineInformationCircle size={20} />
        </NavLink>

        <NavLink
          LinkName={"GIFT"}
          LinkHref={"https://ssebowa.org/"}
          sidebar={false}
          active={false}
          donate={true}
        >
          <HiGift size={20} />
        </NavLink>

    </div>
  )
}