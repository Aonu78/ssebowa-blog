import React from 'react'
import styles from "./SearchBlogLoading.module.css"
import { BlogCardLoading } from '../HomeBody/HomeBody';
import Image from 'next/image';
import search404 from "../../public/search404.jpg"


function SearchBlogLoading() {
  return (
    <div className={styles.SearchResultsMain}>
    <div className={styles.SearchTopDiv}>
        <span></span>
    </div>

    <div className={styles.SearchResultsCardsDiv}>
        <BlogCardLoading loading={true} />
        <BlogCardLoading loading={true} />
        <BlogCardLoading loading={true} />
    </div>
</div>
  )
}

export default SearchBlogLoading


export const PostsEmpty = ()=>{
    return(
    <div className={styles.PostEmptyDiv} >

        <Image src={search404} className={styles.PostSearch404Image} width={500} height={500} />
        <h1>Try searching Something Else</h1>
    </div>)
}