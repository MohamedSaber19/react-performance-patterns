import React, { useCallback, useEffect, useState, useRef } from "react";
import {
  useContainerPosition,
  useMasonry,
  usePositioner,
  useScroller,
} from "masonic";
import "./App.css";
import { useWindowSize } from "@react-hook/window-size";
import MasonryCard from "./components/MasonryCard";
import { IMovie } from "./helpers/interfaces";

type TRenderProps = {
  index: number;
  width: number;
  data: IMovie;
};

const App = () => {
  const apiURL: string = "https://api.tvmaze.com/shows";
  const [data, setData] = useState<IMovie[]>([]);

  const containerRef = useRef(null);
  const [windowWidth, height] = useWindowSize();
  const { offset, width } = useContainerPosition(containerRef, [
    windowWidth,
    height,
  ]);
  const positioner = usePositioner({ width, columnGutter: 8 });
  const { scrollTop, isScrolling } = useScroller(offset);
  // Using useCallback to render memoized version of the MasonryCard to prevent flickering and unnecessary renders.
  const MemoizedCard = useCallback(
    (props: TRenderProps) => <MasonryCard {...props} />,
    []
  );

  useEffect(() => {
    // abort controller to cancel api request if component unmounted
    const abortController = new AbortController();

    (async function fetchMoviesList() {
      try {
        const response = await fetch(apiURL, {
          signal: abortController.signal,
        });
        const json: IMovie[] = await response.json();
        setData(json);
      } catch (error) {
        console.log(error);
      }
    })();

    // cancel api request on un-mounting
    return () => {
      abortController.abort();
    };
  }, []);

  return (
    <main className="container">
      <div className="masonic">
        {useMasonry({
          positioner,
          scrollTop,
          isScrolling,
          height,
          containerRef,
          items: data,
          overscanBy: 3,
          render: MemoizedCard,
        })}
      </div>
    </main>
  );
};

export default App;
