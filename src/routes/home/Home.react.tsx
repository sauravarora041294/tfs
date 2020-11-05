import React from "react";
import { History, Location } from "history";
import HomeView from "./HomeView.react";

interface Props {
  history?: History;
  location?: Location;
}

const Home: React.FC<Props> = () => {
  return <HomeView />;
};

export default Home;
