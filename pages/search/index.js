import React from 'react'
import styles from "./search.module.css"
import Navbar from "../../components/Navbar/Navbar"
import { RiSearch2Line, RiWindowsFill } from "react-icons/ri";
import { BASEURL } from '../../services/BASEUrl';
import { BlogCard,BlogCardLoading } from '../../components/HomeBody/HomeBody';
import { ErrorDiv } from '../../components/HomeHeroLanding/HomeHeroLanding';
import SearchBlogLoading, { PostsEmpty } from '../../components/SearchBlogLoading/SearchBlogLoading';
import Footer from "../../components/Footer/Footer";
import { useRouter } from 'next/router'

function Search() {
    const [SearchInput, SetSearchInput] = React.useState('')
    const [MakeSearch, SetMakeSearch] = React.useState(false)
    const [status, SetStatus] = React.useState('empty')
    const [posts, SetPosts] = React.useState([])
    const router = useRouter()
    
    const MakeSearchRequest = () => {
        SetStatus("loading");
        var URL = BASEURL + 'posts/?search=' + SearchInput
        fetch(URL)
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error("Something went wrong");
            })
            .then((response) => {
                SetStatus("success");
                SetPosts(response['results'])

            })
            .catch((error) => {
                SetStatus("error");
            });
    };

    React.useEffect(()=>{
        var l = window.location.href.split("=")
        if(l.length === 1){
            SetSearchInput('')
        }else{
        var r = decodeURIComponent(l[1])
        if(r == undefined){
            SetSearchInput('')
        }else{
        SetSearchInput(r)
        MakeSearchRequest()
        }
    }
    },[])


    const SubmitSearchRequest = () => {
        if (SearchInput === '') { alert('Enter Something in the Search Box') }
        else {
            SetPosts([]);
            var url= "/search?s="+ SearchInput
            router.push(url, undefined, { shallow: true })
            MakeSearchRequest();
        }
    }
    return (
        <div className={styles.SearchMain} >
            <Navbar hideSearchFields />
            <div className={styles.SearchInner} >
                <form className={styles.SearchForm} onSubmit={(e) =>{e.preventDefault(); SubmitSearchRequest()}}  >
                    <input
                        type={'search'}
                        className={styles.SearchInput}
                        style={{fontWeight:"bold"}}
                        placeholder={'Search Blogs here'}
                        value={SearchInput}
                        onChange={(e) => SetSearchInput(e.target.value)}
                        onSubmit={() => SubmitSearchRequest()}
                    />
                    <button className={styles.SearchButton} onClick={() => SubmitSearchRequest()} ><RiSearch2Line /></button>
                </form>
                {status === 'empty'?
                <></>
                :status=== 'loading'?
                <SearchBlogLoading/>
                :
                status === 'success'?

                <div className={styles.SearchResultsMain}>
                    <div className={styles.SearchTopDiv}>
                        <h3>{posts.length} Results found</h3>
                    </div>

                    <div className={styles.SearchResultsCardsDiv}>
                        {posts.length === 0 ?
                            <PostsEmpty/>
                            :
                            posts.map((post,i) => {
                                return (
                                    <BlogCard
                                        key={post.id}
                                        id={post.id}
                                        title={post.title}
                                        date={post.date_added}
                                        author={post.creator}
                                        image={post.poster}
                                    />
                                )
                            })
                        }
                    </div>
                </div>
                :
                status === 'error'?
                <ErrorDiv error={true} onlyMessage={true} tryAgain={MakeSearchRequest} />
                :
                <></>
}
            </div>
        </div>
    )
}

export default Search

