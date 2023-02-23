import Image from 'next/image';
import React from 'react';
import styles from "./BlogBody.module.css";
import Moment from "moment";
import { BASEURL } from '../../services/BASEUrl';

function BlogBody({image,body,title,date,author}) {
  return (
    <div className={styles.BlogBody}>
        <div className={styles.BlogInner}>
            <h1 className={styles.BlogTitle} >{title}</h1>
        <div className={styles.BlogInfo} >
            <h6 className={styles.BlogDate} >
            {Moment(date).format("DD MMM YYYY")}
            </h6>
            <h6 className={styles.BlogDate} >
             by-   {author}
            </h6>
        </div>
        <Image src={image} width={10000} height={10000} className={styles.BlogMainImage}  />
       
       <div className={styles.BlogBodyHTML}
       
       dangerouslySetInnerHTML={{__html: body}} 
       
       ></div>
        </div>
    </div>
  )
}

export default BlogBody

