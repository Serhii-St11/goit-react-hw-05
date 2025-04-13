import { Link } from "react-router-dom";
import styles from "./MovieList.module.css";

export default function MovieList({ movies }) {
  return (
    <ul className={styles.list}>
      {movies.map((movie) => (
        <li key={movie.id} className={styles.item}>
          <Link to={`/movies/${movie.id}`} className={styles.link}>
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
            <span className={styles.title}>{movie.title}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
