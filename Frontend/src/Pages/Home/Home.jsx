import Hero from "./Component/Hero";
import Category from "./Component/Category";
import TopSell from "./Component/TopSell";
import HotSell from "./Component/HotSell";
import FeaturesBar from "./Component/FeaturesBar";
import HomeBlog from "./Component/HomeBlog";

const Home = () => {
  return (
    <>
      <Hero />
      <FeaturesBar/>
      <Category />
      <TopSell />
      <HomeBlog />
      <HotSell />
    </>
  );
};

export default Home;
