import NavBar from "../components/NavBar";
import Login from "./Login";
import Notice from "../components/Notice";

const Home = () => {
  return (
    <>
      <Login />
      <NavBar />
      <Notice />
    </>
  );
};

export default Home;
