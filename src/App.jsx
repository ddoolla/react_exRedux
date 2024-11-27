import "./App.css";
import Counter from "./components/Counter/Counter";
/*  
  1. 스토어 생성
  2. 슬라이스 생성
  3. 스토어 reducer 파라미터 내부 필드에 슬라이스 리듀서 추가
  4. 컴포넌트에서 useSelector 와 useDispatch 훅 사용해서 데이터 읽고 액션 객체 전달
*/
function App() {
  return (
    <>
      <Counter />
    </>
  );
}

export default App;
