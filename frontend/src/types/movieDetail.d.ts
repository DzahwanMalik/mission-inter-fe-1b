type MovieDetail = {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection: null | object;
  budget: number;
  genres: Array<{ id: number; name: string }>;
  homepage: string;
  id: number;
  imdb_id: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: Array<object>;
  production_countries: Array<object>;
  release_date: string;
  revenue: number;
  runtime: number;
  spoken_languages: Array<object>;
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
};

export default MovieDetail;
