import React, { useState, useEffect } from 'react'
import movieApi from '../../api/MovieApi'
import { APIKey } from '../../api/MovieKey'
import { useDispatch } from 'react-redux' //use for update redux store
import { addMovie } from '../../store/Reducer'

import MovieListing from '../MovieListing/MovieListing'
import './Home.scss'

function Home() {
  const dispatch = useDispatch()
  const [search, setSearch] = useState('')
  


  //api
  useEffect(() => {
    const fetchMovies = async () => {
      const searchKey = search ? search : 'Thor'
      const res = await movieApi.get(
        `?apikey=${APIKey}&s=${searchKey}&type=movie`
      )

      setTimeout(() => {
        dispatch(addMovie(res.data.Search))
      }, 500)
    }
    fetchMovies()
    //everytime thing change it will update statte useEffect will
    //re-run and update search state
  }, [search])

  return (
  <div>
    <h3 style={{margin: "1rem 0"}}></h3>
    <input type='text' placeholder="Search..." value={search} onChange={(e)=> setSearch(e.target.value)}/>
    <MovieListing />
    </div>
  )
}

export default Home
