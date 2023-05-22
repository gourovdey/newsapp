import React, { useEffect, useState } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import InfiniteScroll from "react-infinite-scroll-component";

// import PropTypes from 'prop-types'


const News = (props) =>{

    const[articles, setArticles] = useState([])
    const[loading, setLoading] = useState(true)
    const[page, setPage] = useState(1)
    const[totalResults, setTotalResults] = useState(0)


    const capitalizeFirstLetter = (string) =>{
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
   

    useEffect( () => {
        document.title = `${capitalizeFirstLetter(props.category)} - NewsMonkey`
        const fetchData = async() =>{
            props.setProgress(10)
            let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
            props.setProgress(30)
            setLoading(true)
            let data = await fetch(url)
            let parsedData = await data.json()
            props.setProgress(70)
            // console.log(parsedData);
            setArticles(parsedData.articles)
            setTotalResults(parsedData.totalResults)
            setLoading(false)
            props.setProgress(100)
        }
        
        fetchData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
      },[]);

    // const  componentDidMount = async() =>{
    //     props.setProgress(10)
    //     let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=1&pageSize=${props.pageSize}`;
    //     props.setProgress(30)
    //     this.setState({loading : true})
    //     let data = await fetch(url)
    //     let parsedData = await data.json()
    //     props.setProgress(70)
    //     console.log(parsedData);
    //     setArticles(parsedData.articles)
    //     setTotalResults(parsedData.totalResults)
    //     setLoading(false)
    //     props.setProgress(100)
    // }

/*     handlePrevClick = async() =>{
        console.log("Previous");

        let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=9b0a9959662e4963a054cd9ec8ef6d4b&page=${this.state.page - 1}&pageSize=${props.pageSize}`;
        this.setState({loading : true})
        let data = await fetch(url)
        let parsedData = await data.json()
        console.log(parsedData);
        this.setState({
            articles : parsedData.articles,
            page : this.state.page - 1,
            loading : false
        })    
    } */
    
/*     handleNextClick = async() =>{
        console.log("Next");

        if(this.state.page +1 <= Math.ceil(this.state.totalResults/props.pageSize)){
        let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=9b0a9959662e4963a054cd9ec8ef6d4b&page=${this.state.page + 1}&pageSize=${props.pageSize}`;
        this.setState({loading : true})
        let data = await fetch(url)
        let parsedData = await data.json()
        console.log(parsedData);
        this.setState({
            articles : parsedData.articles,
            page : this.state.page +1,
            loading : false
        })
    }
    } */

   

    const fetchMoreData = async() => {       
        setPage(page+1)      
        let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page+1}&pageSize=${props.pageSize}`;
        let data = await fetch(url)
        let parsedData = await data.json()
        setArticles(articles.concat(parsedData.articles))
        setTotalResults(parsedData.totalResults)
        // this.setState({
        //     articles : this.state.articles.concat(parsedData.articles),
        //     totalResults : parsedData.totalResults
        // })
    }


    return (
    <>  

        <h1 className='text-center' style={{margin:'35px 0px', marginTop:'90px'}}>NewsMonkey - Top {capitalizeFirstLetter(props.category)} Headlines</h1>
        {loading && <Spinner/>}
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length !== totalResults}
          loader={<Spinner/>}
        >   

            <div >
                <div className='row'>
                {
                    articles.map((element)=>{
                        return <div className="col-md-4" key={element.url}>

                            <NewsItem  title={element.title?element.title:""} description={element.description?element.description:""} imageUrl= {element.urlToImage? element.urlToImage:"https://plus.unsplash.com/premium_photo-1661281203773-833d30e370ee?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8"} newsUrl={element.url} author=
                            {element.author} date={element.publishedAt} source={element.source.name} />
                        </div>
                    })
                }
                </div>
            </div>     
        
        </InfiniteScroll>   
    </>
    )
}

export default News
