import api from "../../api"

const requests = {
    //Trending
    fetchTrending: `/trending/all/week?api_key=${api}&lanuage=en-US&page=3`,
    fetchNetflixOriginals: `/discover/tv?api_key=${api}&with_networks=213&page=`,
    fetchUpcoming: `/movie/upcoming?api_key=${api}&page=`,
    fetchTopRated: `/movie/top_rated?api_key=${api}&language=en-US&page=`,
    fetchPopular: `/movie/popular?api_key=${api}&language=en-US&page=`,
    fetchNowPlaying: `movie/now_playing?api_key=${api}&language=en-US&page=`,
    fetchDocumentaries: `/discover/movie?api_key=${api}&with_genres=99&page=`,
    TvfetchAiring: `tv/airing_today?api_key=${api}`,
    TvfetchPopular: `/tv/popular?api_key=${api}&language=en-US&page=`,
    TvfetchTopRated: `/tv/top_rated?api_key=${api}&language=en-US&page=`,

    //Movies
    fetchActionMovies: `/discover/movie?api_key=${api}&with_genres=28&page=`,
    fetchAdventureMovies: `/discover/movie?api_key=${api}&with_genres=12&page=`,
    fetchAnimationMovies: `/discover/movie?api_key=${api}&with_genres=16&page=`,
    fetchComedyMovies: `/discover/movie?api_key=${api}&with_genres=35&page=`,
    fetchCrimeMovies: `/discover/movie?api_key=${api}&with_genres=80&page=`,
    fetchDrameMovies: `/discover/movie?api_key=${api}&with_genres=18&page=`,
    fetchFamilyMovies: `/discover/movie?api_key=${api}&with_genres=10751&page=`,
    fetchFantasyMovies: `/discover/movie?api_key=${api}&with_genres=14&page=`,
    fetchHistory: `/discover/movie?api_key=${api}&with_genres=36&page=`,
    fetchHorrorMovies: `/discover/movie?api_key=${api}&with_genres=27&page=`,
    fetchMysteryMovie: `/discover/movie?api_key=${api}&with_genres=9648&page=`,
    fetchRomanceMovies: `/discover/movie?api_key=${api}&with_genres=10749&page=`,
    fetchScienceFiction: `/discover/movie?api_key=${api}&with_genres=878&page=`,
    fetchTrillerMovies: `/discover/movie?api_key=${api}&with_genres=53&page=`,
    fetchWarMovies: `/discover/movie?api_key=${api}&with_genres=10752&page=`,
    fetchWesternMovies: `/discover/movie?api_key=${api}&with_genres=37&page=`,

    //Tv Movies
    TvfetchAction: `/discover/tv?api_key=${api}&with_genres=10759&page=`,
    TvfetchAnimation: `/discover/tv?api_key=${api}&with_genres=16&page=`,
    TvfetchComedy: `/discover/tv?api_key=${api}&with_genres=35&page=`,
    TvfetchCrime: `/discover/tv?api_key=${api}&with_genres=80&page=`,
    TvfetchDrama: `/discover/tv?api_key=${api}&with_genres=18&page=`,
    TvfetchFamily: `/discover/tv?api_key=${api}&with_genres=10751&page=`,
    TvfetchKids: `/discover/tv?api_key=${api}&with_genres=10762&page=`,
    TvfetchMystery: `/discover/tv?api_key=${api}&with_genres=9648&page=`,
    TvfetchNews: `/discover/tv?api_key=${api}&with_genres=10763&page=`,
    TvfetchReality: `/discover/tv?api_key=${api}&with_genres=10764&page=`,
    TvfetchFanstasy: `/discover/tv?api_key=${api}&with_genres=10765&page=`,
    TvfetchSoap: `/discover/tv?api_key=${api}&with_genres=10766&page=`,
    TvfetchTalk: `/discover/tv?api_key=${api}&with_genres=10767&page=`,
    TvfetchWar: `/discover/tv?api_key=${api}&with_genres=10768&page=`,
    TvfetchWestern: `/discover/tv?api_key=${api}&with_genres=37&page=`,

}

export default requests

