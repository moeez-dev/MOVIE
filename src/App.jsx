import React, { useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { fetchDataFromApi } from '../utils/api'
import { useSelector, useDispatch } from 'react-redux'
import { getApiConfiguration, getGenres } from '../store/homeSlice'

import Home from './pages/home/Home'
import Details from './pages/details/Details'
import SearchResult from './pages/search result/SearchResult'
import Explore from './pages/explore/Explore'
import NotFound from './pages/404/NotFound'



import Header from './components/header/Header'
import Footer from './components/footer/Footer'
const App = () => {

  const dispatch = useDispatch()
  const { url } = useSelector((state) => state.home)

  const fetchApiConfig = async () => {
    const data = await fetchDataFromApi('/configuration')
    const url = {
      backdrop: `${data.images.secure_base_url}original`,
      poster: `${data.images.secure_base_url}original`,
      profile: `${data.images.secure_base_url}original`
    }

    dispatch(getApiConfiguration(url))
  }

  useEffect(() => {
    fetchApiConfig()
    genresCall()
  }, [])


  const genresCall = async () => {
    let promises = []
    let endPoints = ['tv', 'movie']
    let allGenres = {}

    endPoints.forEach((url) => {
      return (
        promises.push(fetchDataFromApi(`/genre/${url}/list`))
      )
    })

    const data = await Promise.all(promises)

    data.map(({ genres }) => {
      return genres.map((item) => (allGenres[item.id] = item))
    })
    dispatch(getGenres(allGenres))
  }

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route path='/:mediaType/:id' element={<Details />} />
        <Route path='/search/:query' element={<SearchResult />} />
        <Route path='/explore/:mediaType' element={<Explore />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App
