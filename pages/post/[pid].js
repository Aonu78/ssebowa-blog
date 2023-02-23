import React from 'react'
import { useRouter } from 'next/router'
import { BASEURL } from '../../services/BASEUrl'
import Navbar from '../../components/Navbar/Navbar'
import BlogBody from '../../components/BlogBody/BlogBody'
import { ErrorDiv } from '../../components/HomeHeroLanding/HomeHeroLanding'
import styles from "./posts.module.css"
import BounceLoader  from "react-spinners/BounceLoader";
import Footer from '../../components/Footer/Footer';




function PostDetails() {
    const [PostData, SetPostData] = React.useState()
    const [status, SetStatus] = React.useState('')
    const router = useRouter()
    const { pid } = router.query

    const FetchPostDetails = () => {
        SetStatus("loading");
        const URL = BASEURL + "post-details/" + pid
        fetch(URL)
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error("Something went wrong");
            })
            .then(responseJson => {
                SetPostData(responseJson);
                SetStatus("success");
            })
            .catch((error) => {
                SetStatus("error");
            });
    };

const tryAgain =()=>{
    FetchPostDetails()

}
    React.useEffect(() => {
        if (!router.isReady) return;
        FetchPostDetails()
    }, [router.isReady])
    React.useEffect(()=>{
        if(status === 'success' && PostData.length ===0 ){
            window.location = "/"

        }
    },[PostData])

    return (<>
        <Navbar />
        {status === 'success' ?

            PostData.map((post, index) => {
                return <BlogBody body={post.html} image={post.poster} title={post.title} author={post.creator} date={post.date_added} />

            })
            :
            status === 'loading'?
            <div className={styles.ErrorDivOuter}>
             <BounceLoader 
        color={'#118442'}
        loading={true}
        size={100}
        speedMultiplier={3}
        aria-label="Loading Spinner"
        data-testid="loader"
                />
            </div>
            :
            status === 'error'?
            <div className={styles.ErrorDivOuter}>
            <ErrorDiv  error={true} onlyMessage={true} tryAgain={tryAgain} />
            </div>
            :
            <></>
        }
    
    <Footer/>
    </>
    )
}

export default PostDetails