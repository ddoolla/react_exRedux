import { useDispatch, useSelector } from "react-redux";
import {
  decrement,
  increment,
  incrementByAmount,
  incrementAsync,
  selectCount,
} from "./counterSlice";
import { useState } from "react";
import store from "../../store";

const Counter = () => {
  // console.log("selectCount", selectCount(store.getState())); // store 와 직접 접근해서 상태 얻는 방법
  // const count = useSelector((state) => state.counter.value); // 아래와 같음
  const count = useSelector(selectCount);

  const dispatch = useDispatch();

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
