<!-- Made by Sujal Bhakare  -->

### Access this code up and Running on --- blog.ssebowa.org

### Access Next.js Documentations at => https://nextjs.org/docs/getting-started


# Setup Guide

  - Download and unzip this file and open in code editor
  - start a new terminal with base directry as working directry
  - Run --  npm i  -- to install all required dependencies
  - Run --  npm run dev  -- to run the project


# Important points to consider

## Dynamic content

 - Content is fetched from already build backend running on api.ssebowa.org
 - BASE Link is placed inside the ---   services/BASEUrl.js  --- 



## Apparently unused files

- server/Functions.js
- ./server.js


## Most Important Pages

 - MAIN HOME PAGE => pages/index.js [nextjs default]
 - BLOG PAGE => pages/post/[pid].js [nextjs default dynamic routing convention]
 - 404 PAGE => pages/404.js [nextjs default]


# BUGS

## Sever Problem
 <!--  try to replicate this scenerio on actual site for better understanding -->
 - Action : I opened blog.ssebowa.org and clicked on any blog
 
 - Idealy : I should move to blog.ssebowa.org/posts/[pid] <!-- where pid is the post id -->
    
    -  SCENERIO 1 : We move to the page and everything is fine 
        ### BUG : WHEN I REFRESH THIS PAGE INSTEAD OF ACTUAL BLOG DETAILS I GET A 404 ERROR NOT FOUND PAGE (404.JS)
    
    - SCENERIO 2  :  We are  not shown any info and directly we are shown the 404 ERROR PAGE

    <!-- Both the Scenerios are some kind of internl errors that Next js have and we need to fix this -->

## MILD Problem

 - Blog Site is Slow due to unoptimised Images and Videos shipped along the project files

 ### Solution : Use Digital ocean storage buckets we are already using for blog images as external storage options and fetch the static images from there rather than putting them in file structure.



## IGNORABLE Problem (As of Dec 2022)

 - Our site is not using any state management library 
 - Impliment Redux when this site becomes somewhat big # ssebowa-blog
