import SearchBar from "../../components/loss/search/SearchBar";
import LossList from "../../components/loss/list/LossList";
import NavigationBar from "../../components/loss/pagination/Pagination";

export default function Home() {
  return (
    <>
      <SearchBar />
      <NavigationBar />
      <LossList />
      <NavigationBar />
    </>
  );
}
