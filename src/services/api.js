import axios from "axios";

const BASE_URL = "https://api.themoviedb.org/3";
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";
const TOKEN =
  "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyZGExMDM4YjZkY2U1NzQ4MmE5MDYxMjdhYTcxNGNmZSIsIm5iZiI6MTc0NDUyODI2Ni40LCJzdWIiOiI2N2ZiNjM4YTMxMTBiZDgyZGZhY2UxNjIiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.p4inkbq5K-pCVF2_sLnOL5R1OwdAgUqZJBiXzNdIYAU";

const options = {
  headers: {
    Authorization: TOKEN,
  },
};

export const fetchTrendingMovies = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/trending/movie/day`, options);
    return response.data.results.map((movie) => ({
      ...movie,
      poster_path: movie.poster_path
        ? `${IMAGE_BASE_URL}${movie.poster_path}`
        : null,
    }));
  } catch (error) {
    throw new Error("Failed to fetch trending movies");
  }
};

export const searchMovies = async (query) => {
  try {
    const response = await axios.get(`${BASE_URL}/search/movie`, {
      ...options,
      params: { query, include_adult: false, language: "en-US", page: 1 },
    });
    return response.data.results.map((movie) => ({
      ...movie,
      poster_path: movie.poster_path
        ? `${IMAGE_BASE_URL}${movie.poster_path}`
        : null,
    }));
  } catch (error) {
    throw new Error("Failed to search movies");
  }
};

export const fetchMovieDetails = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/movie/${id}`, options);
    const movie = response.data;
    return {
      ...movie,
      poster_path: movie.poster_path
        ? `${IMAGE_BASE_URL}${movie.poster_path}`
        : null,
    };
  } catch (error) {
    throw new Error("Failed to fetch movie details");
  }
};

export const fetchMovieCredits = async (id) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/movie/${id}/credits`,
      options
    );
    return response.data.cast;
  } catch (error) {
    throw new Error("Failed to fetch movie credits");
  }
};

export const fetchMovieReviews = async (id) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/movie/${id}/reviews`,
      options
    );
    return response.data.results;
  } catch (error) {
    throw new Error("Failed to fetch movie reviews");
  }
};
