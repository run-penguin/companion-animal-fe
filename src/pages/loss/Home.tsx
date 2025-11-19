import SearchBar from "../../components/loss/SearchBar";

// interface Props {}

// interface SidoList {
//   list: Sido[];
// }

// type Sido = {
//   ordCd: string;
//   orgdownNm: string;
// };

export default function Home() {
  // const [sidoList, setSidoList] = useState([]);

  return (
    <div>
      <SearchBar />
      <div>리스트 컴포넌트와 그 하위 아이템 컴포넌트</div>
    </div>
  );
}
