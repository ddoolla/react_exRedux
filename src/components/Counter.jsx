import { useDispatch, useSelector } from "react-redux";
import {
  decrement,
  increment,
  incrementByAmount,
  incrementAsync,
  selectCount,
} from "./counterSlice";
import { useState } from "react";
import store from "../stores/store";

const Counter = () => {
  /*  
    * useSelector
      - Redux 저장소의 상태 값 추출

    * useDispatch
      - Redux 저장소에 액션 객체 전송

    ※ 위 훅들은 어떤 Redux 스토어와 통신해야하는지 알까?
      -> main.jsx 의 Provider 컴포넌트에 전달한 store 속성에 전달한 스토어
  */
  const count = useSelector(selectCount); // reducx 스토어에서 현재 카운터 값 얻기
  // const count = useSelector((state) => state.counter.value);

  const dispatch = useDispatch();

  /*  
    * Redux Store
      - 앱의 모든 상태를 Redux 스토어에 넣어야하는 것은 아니다. 
        앱 전체에 필요한 글로벌 상태만 넣으면 되고, (글로벌 상태)
        한 컴포넌트에서만 사용하는 상태는 해당 컴포넌트에서 관리한다. (로컬 상태)
  */
  const [incrementAmount, setIncrementAmount] = useState("2");

  return (
    <div>
      <div>
        <button onClick={() => dispatch(increment())}>+</button>
        <span>{count}</span>
        <button onClick={() => dispatch(decrement())}>-</button>
      </div>
      <div>
        <input
          type="text"
          value={incrementAmount}
          onChange={(e) => setIncrementAmount(e.target.value)}
        />
        <button
          onClick={() =>
            dispatch(incrementByAmount(Number(incrementAmount) || 0))
          }
        >
          Add Amount
        </button>
        <button
          onClick={() => dispatch(incrementAsync(Number(incrementAmount) || 0))}
        >
          Add Async
        </button>
      </div>
    </div>
  );
};

export default Counter;
