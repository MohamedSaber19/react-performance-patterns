import { memo } from "react";
import { IMovie } from "../helpers/interfaces";

type TProps = {
  data: IMovie;
};

const placeholderURL = "https://critics.io/img/movies/poster-placeholder.png";

const MasonryCard = ({ data }: TProps) => {
  return (
    <div className="card">
      <a href={data.url}>
        <img
          loading="lazy"
          className="card__poster"
          src={!data.image.medium ? placeholderURL : data.image.medium}
          alt={data.name}
        />
      </a>
      <h1 title={data.name} className="card__name">
        {data.name}
      </h1>
      <p className="card__genres">
        {data.genres.map((genre, index) => (
          <span title={genre} key={`genre${index}`}>
            {genre}
          </span>
        ))}
      </p>
      <span className="card__rating">{data.rating.average || "-"}</span>
    </div>
  );
};

export default memo(MasonryCard);
