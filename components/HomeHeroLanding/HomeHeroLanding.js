// @ts-nocheck
import React, { useState } from "react";
import styles from "./HomeHeroLanding.module.css";
import { FetchPosts } from "../../services/Functions";
import { BASEURL } from "../../services/BASEUrl";
import Image from "next/image";
import BarLoader from "react-spinners/BarLoader";
// @ts-ignore
import errorImage from "../../public/11104.jpg";
import Moment from "moment";

import { Swiper, SwiperSlide } from "swiper/react";
import ReactPlayer from 'react-player/lazy'

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper";

// Import Slider Images

import slide1 from "../../public/blog-01.jpg"
import slide2 from "../../public/blog-03.jpg"
import slide3 from "../../public/blog-04.jpg"
import slide4 from "../../public/blog-05.jpg"
import Link from "next/link";

function HomeHeroLanding() {
  const [posts, SetPosts] = React.useState([]);
  const [status, SetStatus] = React.useState("");

  const FetchPosts = () => {
    SetStatus("loading");
    const f_url = BASEURL + "recommended_posts/";
    fetch(f_url)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Something went wrong");
      })
      .then((responseJson) => {
        SetStatus("success");
        SetPosts(responseJson['results']);
      })
      .catch((error) => {
        SetStatus("error");
      });
  };
  const tryAgain = () => {
    FetchPosts();
  };
  React.useEffect(() => {
    FetchPosts();
  }, []);

  return (
    <main className={styles.HomeHeroLanding}>
      <div className={styles.RightCarouselDiv}>
        <Swiper navigation={true} modules={[Navigation]} className="mySwiper" className={styles.CarouselWindow} >
        <SwiperSlide>
        {/* <ReactPlayer 
          url={"https://www.youtube.com/watch?v=IOcGS4D1tM0"}
  /> */}
  <video autoPlay style={{ width: '100%', height: '100%' }} controls >
        <source src="./video.mp4" type="video/mp4"  /> 
      </video>
      </SwiperSlide>
        <SwiperSlide>
          <Image src={slide1} width={1000} height={1000} className={styles.CarouselImage}  />
          </SwiperSlide>
        <SwiperSlide>
          <Image src={slide2} width={1000} height={1000} className={styles.CarouselImage}  />
          </SwiperSlide>
        <SwiperSlide>
          <Image src={slide3} width={1000} height={1000} className={styles.CarouselImage}  />
          </SwiperSlide>
        <SwiperSlide>
          <Image src={slide4} width={1000} height={1000} className={styles.CarouselImage}  />
          </SwiperSlide>
      </Swiper>
      </div>
      <div className={styles.LeftPostDiv}>
        <h1 className={styles.TrendingTitle}>Recommended</h1>
        {/* {posts.map((post, index) => {
          return <p>{post.title}</p>;
        })} */}
        {status == "loading" ? (
          <>
            <PostCardLoading loading={true} />
            <PostCardLoading loading={true} />
            {/* <PostCardLoading loading={true} /> */}
          </>
        ) : status == "success" ? (
          <>
            {posts.map((post, index) => {
              return (
                <PostCard
                  key={post.id}
                  title={post.title}
                  date={post.date_added}
                  image={post.poster}
                  author={post.creator}
                  id={post.id}
                />
              );
            })}
          </>
        ) : (
          <ErrorDiv error={true} onlyMessage={false} tryAgain={tryAgain} />
        )}
      </div>
    </main>
  );
}

export default HomeHeroLanding;

export const PostCard = ({ title, date, author,image ,id}) => {
  return (
    <Link style={{textDecoration:"none",color:"inherit"}}  className={styles.PostCard} href={"/post/[pid]"} as={`/post/${id}`}  >
      <Image
        src={image}
        alt={"Image"}
        className={styles.CardImage}
        width={500}
        height={500}
      />
      <div className={styles.CardInfo}>
        <h6 className={styles.CardDate}>
          {Moment(date).format("DD MMM YYYY")}
        </h6>
        <h6 className={styles.CardTitle}>{title} </h6>
        <h6 className={styles.CardAuthor}> - {author}</h6>
      </div>
    </Link>
  );
};

export const PostCardLoading = ({ loading }) => {
  return (
    <div className={styles.PostCard}>
      <div className={styles.ImageLoader}></div>
      <div className={styles.CardInfoLoader}>
        <div className={styles.CardTopLoader}></div>
        <div className={styles.CardTitleLoader}></div>
        <div className={styles.CardBottomLoader}>
          <BarLoader
            color={"lightgrey"}
            width={50}
            speedMultiplier={1}
            loading={loading}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
          <div className={styles.CardBottomLoaderInner}></div>
        </div>
      </div>
    </div>
  );
};

export const ErrorDiv = ({ error, onlyMessage, tryAgain }) => {
  return (
    <div className={onlyMessage ? styles.ErroSub : styles.ErrorMain}>
      <Image
        width={1000}
        height={1000}
        src={errorImage}
        alt={
          '<a href="https://www.freepik.com/free-vector/tiny-people-examining-operating-system-error-warning-web-page-isolated-flat-illustration_11235921.htm#query=connection%20error&position=1&from_view=keyword">Image by pch.vector</a> on Freepik'
        }
        className={styles.ErrorImage}
      />
      <div className={styles.RetryMain}>
        <button className={styles.RetryButton} onClick={() => tryAgain()}>
          Try Again
        </button>
      </div>
    </div>
  );
};
