import React, { useEffect, useState } from 'react'
import './style.scss'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

import useFetch from '../../../hooks/useFetch'
import Img from '../../../components/lazyLoadImage/Img'
import ContentWrapper from '../../../components/contentWrapper/ContentWrapper'

const HeroBanner = () => {

    const [background, setBackground] = useState('')
    const [query, setQuery] = useState('')

    const navigate = useNavigate()
    const { url } = useSelector((state) => state.home)

    const { data, loading } = useFetch('/movie/upcoming')

    useEffect(() => {
        const bg = `${url.backdrop}${data?.results[(Math.floor(Math.random() * data.results.length))]?.backdrop_path}`
        console.log(bg)
        setBackground(bg)
    }, [data])


    const searchQueryHandler = (event) => {
        if (event.key === 'Enter' && query.length > 0) {
            navigate(`/search/${query}`)
        }
    }

    return (
        <div className='heroBanner'>
            <div className="backdrop-img">
                <Img src={background} />
            </div>

            <div className="opacity-layer">

            </div>

            <ContentWrapper>
                <div className="heroBannerContent">
                    <span className="title">welcome</span>
                    <span className="subTitle">millions of movies,tv show and people to discover, explore now</span>
                    <div className="searchInput">
                        <input onChange={(e) => setQuery(e.target.value)} onKeyUp={searchQueryHandler} type="text" placeholder='search for a movie or tvshow...' />
                        <button onClick={(e) => {
                            e.preventDefault()
                            navigate(`/search/${query}`)
                        }} >search</button>
                    </div>
                </div>
            </ContentWrapper>
        </div>
    )
}

export default HeroBanner
