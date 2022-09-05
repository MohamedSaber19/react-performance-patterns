import React, { useState, useEffect } from "react";
import "./App.css";

import { FixedSizeGrid as Grid } from "react-window";

function App() {
  const [data, setData] = useState([] as any);
  const apiURL = "https://api.tvmaze.com/shows";
  const ITEMS_COUNT = data.length;
  const COLUMNS = 5;
  const ROWS = ITEMS_COUNT / 5;

  type TCell = {
    columnIndex: number;
    rowIndex: number;
    style: any;
  };

  useEffect(() => {
    fetch(apiURL)
      .then((res) => res.json())
      .then((json) => setData(json));
  }, []);

  const renderMovieItem = (item: any) => {
    return (
      <article className="movie">
        <a href={item.url} target="_blank" rel="noreferrer">
          <img
            className="movie__poster"
            src={item.image.medium}
            alt={item.name}
          />
        </a>
        <div className="movie__info">
          <h1 className="movie__name">{item.name}</h1>
          <h2 className="movie__language">{item.language}</h2>
        </div>
        <span className="movie__rating">{item.rating.average}</span>
      </article>
    );
  };

  const Cell = ({ columnIndex, rowIndex, style }: TCell) => (
    <div style={style}>
      {renderMovieItem(listToMatrix(data, COLUMNS)[rowIndex][columnIndex])}
    </div>
  );

  const getWindowWidth = () => {
    return window.innerWidth;
  };

  const getWindowHeight = () => {
    return window.innerHeight;
  };

  const listToMatrix = (list: any[], elementsPerSubArray: number) => {
    let matrix = [] as any,
      i,
      k;

    for (i = 0, k = -1; i < list.length; i++) {
      if (i % elementsPerSubArray === 0) {
        k++;
        matrix[k] = [];
      }

      matrix[k].push(list[i]);
    }

    return matrix;
  };

  return (
    <div className="App">
      <Grid
        className="Grid movieContainer"
        columnCount={COLUMNS}
        columnWidth={getWindowWidth() / COLUMNS - 10}
        height={getWindowHeight()}
        rowCount={ROWS}
        rowHeight={500}
        width={getWindowWidth()}
      >
        {Cell}
      </Grid>
    </div>
  );
}

export default App;
