
const URL = "https://api.themoviedb.org/"
const BEARER = process.env.EXPO_PUBLIC_BEARER
const METHODS = {
    get : "GET",
}
const options = {
  method: METHODS.get,
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer ' + BEARER
  }
};
export const get_all_fav_movies = async (page=1) => {
    try {
      const url =  `${URL}3/movie/popular?language=en-US&page=${page}`;

      const res = await fetch(url, options)
      return res.json()
    } catch (error) {
      return error
    }
      
}

export const get_all_searchs = async (query:string) => {
    try {
      const url =  `${URL}3/search/multi?query=${query}&include_adult=false&language=en-US&page=1`;

      const res = await fetch(url, options)
      return res.json()
    } catch (error) {
      return error
    }
      
}
export const get_actor = async (query:string) => {
  try {
    const url =  `${URL}3/search/multi?query=${query}&include_adult=false&language=en-US&page=1`;
    const res = await fetch(url, options)
    return res.json()
  } catch (error) {
    return error
  }   
}

export const get_actor_by_id = async (id:string) => {
  try {
    const url = `https://api.themoviedb.org/3/person/${id}?language=en-US`;
    const res = await fetch(url, options)
    return res.json()
  } catch (error) {
    console.log(error)
  }
}

export const get_movie_by_id = async (id:string) => {
  try {
    const url = `https://api.themoviedb.org/3/movie/${id}?language=en-US`;
    const res = await fetch(url, options)
    return res.json()
  } catch (error) {
    console.log(error)
  }
}

export const get_credits = async (id:string) => {
  try {
    const url = `https://api.themoviedb.org/3/movie/${id}/credits?language=en-US`;
    const res = await fetch(url, options)
    return res.json()
  } catch (error) {
    
  }
}
export const get_videos = async (id:string) => {
  try {
    const url = `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`;
    const res = await fetch(url, options)
    return res.json()
  } catch (error) {
    console.log(error)
  }
}
export const get_films_by_actor = async (id:string) =>{
  try {
    const url = `https://api.themoviedb.org/3/person/${id}/movie_credits?language=en-US`;
    const res = await fetch(url, options)
    return res.json()
  } catch (error) {
    console.log(error)
  }
}
export const get_tvSeries_by_id = async (id:string) => {
  try {
    const url = `https://api.themoviedb.org/3/tv/${id}?language=en-US`;
    const res = await fetch(url, options)
    return res.json()
  } catch (error) {
    console.log(error)
  }
}