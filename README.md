# Redux 라이브러리

> ## 개발 환경 설정

### 1. React + Vite

```
> npm create vite@latest
> React
> JavaScript
```

### 2. 모듈 설치

```
> npm i // npm install
> npm i react-router-dom // 라우터 라이브러리 설치
```

### 3. Redux Toolkit 설치

- Redux 애플리케이션을 만들기에 필수적으로 여기는 패키지와 함수들 포함

```
> npm i @reduxjs/toolkit
```

### 4. Redux 설치

```
> npm i react-redux
```

<br/>

---

> ## 1. Redux 저장소 (store) 설정

### \* configureStore

- Redux Toolkit 의 스토어 설정 프로세스 간소화 API
- 루트 리듀서를 사용하여 Redux 스토어 생성  
  (원래는 루트리듀서에 슬라이스 리듀서를 결합하여 스토어 파일에 가져와야 함)
- thunk 미들웨어 등 각종 미들웨어 자동 추가
- Redux DevTools Extension 자동 연결 설정 (상태 관리 디버깅 브라우저 확장도구)

※ 결론 : configureStore 쓰면 편하게 스토어 생성할 수 있다.

```
// src/store.js
import { configureStore } from '@reduxjs/toolkit';
import { someReducer } from '/someSlice';

const store = configureStore({
    reducer: {
        some: someReducer, // 슬라이스의 리듀서를 결합한다.
        ...
    }
});

export default store;
```

<br/>

```
// main.jsx
...
import { Provider } from "react-redux";
import store from "./store.js";

createRoot(document.getElementById("root")).render(
  <Provider store={store}> // 최상위 요소여야한다!
    <App />
  </Provider>
);
```

<br/>

---

> ## 2. 슬라이스(Slice) 생성

- 상태와 상태를 변경하기 위한 리듀서 함수 및 액션을 한 곳에서 정의한 것

ex) Counter 관련 -> counterSlice 에서 상태 및 리듀서 관리  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Todo 관련 -> todoSlice 에서 상태 및 리듀서 관리

### \* createSlice

- Redux Toolkit 에서 제공하는 리듀서 로직과 동작을 단순화하는 API
- 기본 케이스에서 자동으로 기존 상태를 반환한다. (switch~case 문 default 에 해당하는 상태)
- 안전하게 상태를 변형시킬 수 있다.
- 변경 불가능한 업데이트를 쉽게 작성할 수 있다.

<br/>

```
import { createSlice } from '@reduxjs/toolkit';

// 슬라이스 생성
const someSlice = createSlice({
    name: 'some' ,                              // 슬라이스 이름
    initialState: { value: 0 } ,                // 초기 상태 값
    reducers: {                                 // 상태를 변경하기 위한 리듀서 함수들 (case)
        actionFunc1: (state, action) {
            state.value += action.payload;
        },

        actionFunc2: (state, action) {
            state.value -= action.payload;
        },
        ...
    }
});

// 액션 생성자
export const { actionFuc1, actionFunc2 } = someSlice.actions;

// 선택자 함수
export const selectCount = (state) => state.some.value;

// 슬라이스의 리듀서 -> 스토어에 추가
export default someSlice.reducer;
```

<br/>

### ※ createSlice 를 사용하면 변경 불가능한 업데이트를 쉽게 작성할 수 있다?

#### \* 배열 상태에 객체 추가 예시)

```
// 기존 리듀서 (switch-case)
...
case ADD_TODO:
    return { ...state.todos, action.payload } // 원본 배열 복사
...

// createSlice 리듀서
...
addTodo: (state, action) => {
    state.todos.push(action.payload) } // return문 X, 상태를 직접 수정
...
    // 상태를 직접 수정하는 것 처럼 작성해도 내부적으로 새로운 불변 값을 반환한다.
```

※ Immer - 불변성 (immutable) 관리 작업을 자동으로 처리해주는 라이브러리

createSlice 함수는 Immer 라이브러리를 사용한다. Immer는 모든 변경사항을 추적하고 해당 변경 사항 목록을 사용하여 불변 로직을 작성한 것처럼 안전하게 업데이트된 불변 값을 반환한다.

<br/>

### \* 액션 생성자

- createSlice 함수는 리듀서 함수들에 해당하는 액션 생성자를 자동으로 생성한다.
- 액션 생성자는 type, payload 를 파라미터를 갖는 액션 객체를 반환한다.
- 액션 생성자 함수는 하나의 인수를 허용하고, 반환할 액션 객체의 payload 파라미터에 전달한다.

```
// 액션 생성자 구조 분해 할당
export const { actionFuc1, actionFunc2 } = someSlice.actions;

// 액션 생성자 호출 -> 액션 객체 반환
console.log(actionFunc1(1)); // {type: 'some/actionFunc1', payload: 1}

dispatch(actionFunc1(1)); // dispatch 함수의 인수로 사용
dispatch({ type: 'some/actionFunc1', payload: 1 }); // 위와 같은 의미
```

<br/>

### \* 선택자 함수

- Redux 스토어에서 특정 데이터를 추출하기 위한 함수
- 스토어의 전체 상태에서 필요한 데이터만 반환하는 역할

```
// 스토어 전체 상태 객체
import store from './store.js';
console.log(store.getState());

// 선택자 함수
const selectCount = (state) => state.counter.value;
const selectUser = (state) => state.user.name;

console.log(selectCount(store.getState()));
console.log(selectUser(store.getState()));
```

<br/>

### \* thunk 함수

- 동기, 비동기 로직을 모두 포함할 수 있는 특정 종류의 Redux 함수
- 액션 생성자는 액션 객체를 반환하지만 thunk 함수는 함수를 반환한다.
- 주로 비동기 작업(API 호출 등) 이나 복잡한 로직을 처리하기 위해 사용

※ thunk 를 사용하기 위해서는 redux-thunk 미들웨어를 Redux 스토어에 추가해야하지만, Redux-Toolkit 의 configureStore 함수는 자동으로 설정해준다.

```
// Counter 예제 incrementAsync 예시 (counterSlice.js)

export const incrementAsync = (amount) => { // thunk 생성 함수
    return (dispatch) => { // thunk 함수
        setTimeout(() => {
            dispatch(incrementByAmount(amount)); // 액션 객체 전달
        }, 1000);
    }
    // thunk 함수 매개변수: dispatch, getState 메서드
}
```

<br/>

---

> ## useSelector, useDispatch

### \* useSelector (Hook)

- Redux 스토어에서 상태를 가져오기 위해 사용
- 인수로 선택자 함수 전달

```
// 선택자 함수에 상태 객체를 인수로 전달해서 가져오는 방법
// Redux 스토어에 직접 접근이 필요 O
const count = selectCount(store.getState());

// useSelector 훅 사용해서 가져오는 방법
// Redux 스토어에 직접 접근이 필요 X
const count = useSelector(selectCount);
```

<br/>

### \* useDispatch (Hook)

- Redux 스토어로 액션 객체를 전송하기(dispatch) 위해 사용
- dispatch 함수 반환
- 동기 / 비동기 액션 모두 호출 가능 (액션 생성자, thunk 함수)

```
// Redux 스토어에 직접 접근이 필요 O
<button onClick={() => store.dispatch(increment())}>

// Redux 스토어에 직접 접근이 필요 X
const dispatch = useDispatch();
<button onClick={() => dispatch(increment())}>
```

※ useSelector, useDispatch 훅들은 main.jsx 에서 Provicer 컴포넌트의 store 속성에 전달한 store 를 기준으로 통신한다.

<br/>

---

<br/>

### ※ 모든 상태를 Redux 스토어에 보관 해야할까?

#### \* 글로벌 상태

- 애플리케이션 전체에 필요한 글로벌 상태는 Redux 스토어에서 관리

#### \* 로컬 상태

- 한 곳에서만 필요한 상태는 컴포넌트에서 관리
