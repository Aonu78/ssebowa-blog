// @ts-nocheck
import Image from "next/image";
import React from "react";
import { CgSortAz } from "react-icons/cg";
import { BarLoader } from "react-spinners";
import { BASEURL } from "../../services/BASEUrl";
import { ErrorDiv } from "../HomeHeroLanding/HomeHeroLanding";
import styles from "./HomeBody.module.css";
import Moment from "moment";
import { BottomScrollListener, useBottomScrollListener } from 'react-bottom-scroll-listener';
import Link from "next/link";
import { useRouter } from 'next/router'



function HomeBody() {
  const [posts, SetPosts] = React.useState([]);
  const [status, SetStatus] = React.useState("");
  const [PageEnded, SetPageEnded] = React.useState(false);
  const [FetchingNextPages, SetFetchingNextPages] = React.useState(false);
  const [URL, SetURL] = React.useState(BASEURL + 'posts/?page=1');
  const router = useRouter()


  const FetchPosts = () => {
    SetStatus("loading");
    fetch(URL)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Something went wrong");
      })
      .then((responseJson) => {
        SetStatus("success");
        SetPosts(responseJson['results'])


        var next_url = responseJson['next']
        if(next_url !== null){        
        SetURL(next_url)
        }
        else{
          SetPageEnded(true)
        }

        
      })
      .catch((error) => {
        SetStatus("error");
      });
  };
const FetchPostsForNextPage = () => {
  if (PageEnded){
    SetFetchingNextPages(false)
  }
  else if (!PageEnded && status === 'success'){
    SetFetchingNextPages(true)
    fetch(URL)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Something went wrong");
      })
      .then((responseJson) => {
        SetStatus("success");
        for(let i=0;i<responseJson['results'].length;i++ ){
          SetPosts(current => [...current, responseJson['results'][i]])
        }
        SetFetchingNextPages(false)


        
        var next_url = responseJson['next']
        if(next_url !== null){        
        SetURL(next_url)
        }
        else{
          SetPageEnded(true)
        }
      })
      .catch((error) => {
      });
    }
  };
  const tryAgain = () => {
    FetchPosts();
  };
  React.useEffect(() => {
    FetchPosts();
  }, []);
  const handleOnDocumentBottom =()=> {
    FetchPostsForNextPage()
  };

  useBottomScrollListener(handleOnDocumentBottom);

  
  return (
    <div className={styles.HomeBodyMain}>
      {/* Top Section */}
      {/* <div className={styles.HomeBodyTop}>
        <h1 className={styles.HomeBodyTopH1}>Latest Blogs {posts.length}</h1>
        <button className={styles.HomeBodyButton}>
          <CgSortAz size={30} />
          Sort
        </button>
      </div> */}
      {/* Main Content */}
      <div className={styles.MainContentDiv}>
        {status == "loading" ? (
          <>
            <BlogCardLoading loading={true} />
            <BlogCardLoading loading={true} />
            <BlogCardLoading loading={true} />
            <BlogCardLoading loading={true} />
          </>
        ) : status == "success" ? (
          <>
            {posts.map((post, index) => {
              return (
                <BlogCard
                  key={post.id}
                  id={post.id}
                  title={post.title}
                  date={post.date_added}
                  author={post.creator}
                  image={post.poster}
                />
              );
            })}
          </>
        ) : (
          <ErrorDiv error={true} onlyMessage={true} tryAgain={tryAgain} />
        )}
        {FetchingNextPages?
        <p>Loading...</p>:<></>
      }
      </div>
    </div>
  );
}
export default HomeBody;

// @ts-ignore
export const BlogCard = ({ title, date, author,image,id }) => {


  return (
    <Link className={styles.BlogCard}  href={"/post/[pid]"} as={`/post/${id}`}   >
      <Image
        width={500}
        height={500}
        alt={"image"}
        src={image}
        className={styles.BlogCardImage}
      />
      <div className={styles.BlogPostInfoDiv}>
        <p className={styles.BlogPostPublishDate}>
          {Moment(date).format("DD MMM YYYY")} {id}
        </p>
        <div className={styles.BlogCardTitleDiv}>
          <h6 className={styles.BlogCardTitle}>{title}</h6>
        </div>
        <p className={styles.BlogCardAuthor}>- {author}</p>
      </div>
    </Link>
  );
};
export const BlogCardLoading = ({ loading }) => {
  return (
    <div className={styles.BlogCard}>
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
