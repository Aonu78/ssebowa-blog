import styles from "../styles/Home.module.css";
import * as React from "react";
import Navbar from "../components/Navbar/Navbar";
import Sidebar from "../components/Sidebar/Sidebar";
import HomeHeroLanding from "../components/HomeHeroLanding/HomeHeroLanding";
import HomeBody from "../components/HomeBody/HomeBody";
import Footer from "../components/Footer/Footer";

export default function Home() {
  const [sideBarOpen, SetSideBarOpen] = React.useState(false);
  const toggleSidebar = () => {
    SetSideBarOpen(!sideBarOpen);
  };
  return (
    <div className={styles.Home}>
      <Navbar toggleSidebar={toggleSidebar} />
      {/* <Sidebar visible={sideBarOpen} toggleSidebar={toggleSidebar} /> */}
      <HomeHeroLanding />
      <HomeBody />
      <Footer/>
    </div>
  );
}
