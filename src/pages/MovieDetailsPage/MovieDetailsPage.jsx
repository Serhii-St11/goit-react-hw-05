import { useEffect, useState } from "react";
import {
  useParams,
  useLocation,
  useNavigate,
  Link,
  Outlet,
} from "react-router-dom";
import { fetchMovieDetails } from "../../services/api";
import styles from "./MovieDetailsPage.module.css";

export default function MovieDetailsPage() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const getMovieDetails = async () => {
      try {
        const data = await fetchMovieDetails(movieId);
        setMovie(data);
        setLoading(false);
      } catch (error) {
        setError("Failed to load movie details");
        setLoading(false);
      }
    };
    getMovieDetails();
  }, [movieId]);

  const handleGoBack = () => {
    const from = location.state?.from || "/movies";
    navigate(from);
  };

  if (loading) {
    return <div className={styles.loading}>Loading...</div>;
  }

  if (error) {
    return <div className={styles.error}>{error}</div>;
  }

  if (!movie) {
    return null;
  }

  return (
    <div className={styles.container}>
      <button onClick={handleGoBack} className={styles.backButton}>
        Go back
      </button>
      <div className={styles.movieDetails}>
        {movie.poster_path ? (
          <img
            src={movie.poster_path}
            alt={movie.title}
            className={styles.poster}
            loading="lazy"
          />
        ) : (
          <div className={styles.noPoster}>No Poster</div>
        )}
        <div>
          <h1 className={styles.title}>{movie.title}</h1>
          <p className={styles.overview}>{movie.overview}</p>
          <p className={styles.details}>Release Date: {movie.release_date}</p>
          <p className={styles.details}>
            Rating: {movie.vote_average.toFixed(1)}
          </p>
        </div>
      </div>
      <nav className={styles.subNav}>
        <Link to="cast" className={styles.subLink}>
          Cast
        </Link>
        <Link to="reviews" className={styles.subLink}>
          Reviews
        </Link>
      </nav>
      <Outlet />
    </div>
  );
}
