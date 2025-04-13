import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchMovieCredits } from "../../services/api";
import styles from "./MovieCast.module.css";

export default function MovieCast() {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getCast = async () => {
      try {
        const castData = await fetchMovieCredits(movieId);
        setCast(castData);
        setLoading(false);
      } catch (error) {
        setError("Failed to load cast");
        setLoading(false);
      }
    };

    getCast();
  }, [movieId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className={styles.container}>
      <h3>Cast</h3>
      {cast.length === 0 ? (
        <p>No cast information available.</p>
      ) : (
        <ul>
          {cast.map((actor) => (
            <li key={actor.id}>
              <h4>{actor.name}</h4>
              <p>Character: {actor.character}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
