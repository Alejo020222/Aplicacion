import useTesisStore from "../store/Store";
import Footer from "../components/Footer";
import CarouselHome from "../components/CarouselHome";
import AboutSection from "../components/AboutSection";
import FooterDown from "../components/FooterDown";

const Home = () => {
  const tesis = useTesisStore((state) => state.tesis);
  console.log(tesis);
  return (
    <>
      <CarouselHome />
      <AboutSection />
      <Footer />
      <FooterDown />
    </>
  );
};

export default Home;
