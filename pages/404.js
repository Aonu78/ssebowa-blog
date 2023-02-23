import React from 'react'
import Link from 'next/link'
import Navbar,{NavLink} from "../components/Navbar/Navbar"
import Image from 'next/image'
import search404 from "../public/search404.jpg"
import { HiGift, HiHome, HiOutlineGlobeAlt, HiOutlineInformationCircle } from 'react-icons/hi'


export default function FourOhFour() {

  return <>
<Navbar/>
<div style={{width:"100%",marginTop:50,display:"flex",alignItems:"center",justifyContent:"center",flexDirection:"column"}} >
    <Image style={{width:"100%",height:300,objectFit:"contain"}} src={search404} width={200} height={200} />
    <h6  style={{fontFamily:"fantasy",fontSize:25,fontWeight:500,color:"grey"}} >Oops! No page not Found</h6>
    <div style={{display:"flex",flexWrap:"wrap",width: "100%",justifyContent:"space-evenly",maxWidth:800}} > 
        
    <NavLink
          LinkName={"HOME"}
          LinkHref={"/"}
          sidebar={false}
          donate={false}
          active={false}
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
</div>
  </>
}