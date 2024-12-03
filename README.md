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

### \* Store Enhancer (확장기, 강화기)

- 스토어 기능 및 동작을 커스텀 할 수 있다.

```
// 사용법 - enhancers.js

export const customEnhancer = (createStore) => {
    return (rootReducer, preloadedState, enhancers) => {
        const store = createStore(rootReducer, preloadedState, enhancers);

        // store.dispatch 기능 확장
        // dispatch 후 "Hi!" 를 콘솔에 출력
        function newDispatch(action) {
            const result = store.dispatch(action);
            console.log("Hi!");
            return result;
        }

        // store.getState 기능 확장
        // store 상태에 항상 newVar: "Hi!" 필드 추가
        function newGetState() {
            return {
                ...store.getState(),
                newVar: "Hi!";
            };
        }

        return { ...store, dispatch: newDispatch, getState: newGetState };
    }
}
```

<br/>

### \* Middleware

- 액션을 디스패치하는 순간과 리듀서에 도달하는 순간 사이에 확장 기능을 제공한다.

```
// 사용법 - middleware.js

export const print1 = (storeAPI) => (next) => (action) => {
    // 미들웨어 코드 작성
    // storeAPI.getStore(), dispatch() 도 사용 가능
    console.log("1");
    return next(action); // 다음 미들웨어로 전달
}

export const print2 = (storeAPI) => (next) => (action) => {
    console.log("2");
    return next(action); // 다음 미들웨어로 전달
}

export const print3 = (storeAPI) => (next) => (action) => {
    console.log("3");
    return next(action); // 마지막에는 액션을 리듀서로 전달
}
```

<br/>

### \* middleware, enhancers - configureStore 적용 방법

```
// store.js
import { customEnhancer } form '/enhancers';

export default configureStore({
    reducer: {
        ...
    },
        // enhancers 보다 먼저 정의되어야 함
        // 기본 미들웨어를 추가하고, 사용자정의 미들웨어 추가
    middleware: (getDefaultMiddleware) => {
        return [...getDefaultMiddleware(), ...middleware];
    },
        // 기본 확장기를 추가하고, 사용자정의 확장기를 추가
    enhancers: (defaultEnhancers) => {
        return [...defaultEnhancers(), customEnhancer];
    }
})
```

※ enhancers 가 middleware 처리 이후 스토어에 적용되기 때문에 middleware 가 먼저 정의되어야한다.  
※ configureStore 는 일부 미들웨어, 확장기가 자동 추가되기에 기본을 먼저 추가하였다.

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

        // 액션 생성자의 payload 값 사용자 지정 방법
        actionFun3: {
            reducer: (state, action) => {
                ...
            },
            prepare: (arg1, arg2) => {
                return { payload: { arg1, arg2 } };
            }
        }
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
- `액션 생성자는 (액션)type, payload 를 파라미터를 갖는 액션 객체를 반환한다.`
- 액션 생성자 함수는 하나의 인수를 허용하고, 반환할 액션 객체의 payload 파라미터에 전달한다.  
  (액션객체 payload 에 여러 인수를 전달하는 방법은 createSlice 예시 참조)

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

### \* createSelector

- reselect 라이브러리 함수 (Redux-ToolKit 패키지에 기본 포함)
- memoized 된 선택자 함수를 만드는데 사용

```
const outputSelector = createSelector(
    [inputSelector1, inputSelector2, ...], // 입력 선택자 함수 전달
    resultFunc // 출력 선택자 함수 (결과 함수)
)
// arg1: 결과함수에 필요한 값 제공
// arg2: 제공 받은 값을 사용하여 반환할 결과 로직 정의
// return: memoized 된 선택자 함수 반환 (출력 선택자 함수)
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

### \* createAsyncThunk(type, payloadCreator)

- Redux-Toolkit 에서 제공하는 thunk 생성 API
- type: 비동기 요청 수명주기를 나타내는 작업(액션) 유형 접두사
  - 대기(pending) 상태: 'type/pending'
  - 이행(fulfilled) 상태: 'type/fulfilled'
  - 거부(rejected) 상태: 'type/rejected'
- payloadCreator: 비동기 작업을 정의하는 함수. 반환 값으로는 Promise 를 반환해야 한다.  
  Promise 를 반환해야하기에 async / await 구문을 사용하여 작성한다.
- 내부적으로 3개의 액션 생성자와 액션 유형, 호출 시 해당 액션을 자동으로 전송하는 thunk 함수를 생성한다.

```
// todosSlice - fetchTodos thunk 함수 예시

// 일반적인 패턴으로 생성
export const fetchTodos = () => {
    return async (dispatch) => {
        dispatch(todoLoading());
        const response = await client.get('/fakeApi/todos');
        dispatch(todosLoaded(response.todo));
    }
}
---------------------------------------------------------------------

// createAsyncThunk 사용해서 생성
export const fetchTodos = createAsyncThunk('todos/fetchTodos'. async () => {
    const response = await client.get('/fakeApi/todos');
    return response.todos;
});
```

<br/>

### ※ 위 예시에서 자동생성되는 액션 생성자 및 액션 유형

#### \* 액션 생성자

- fetchTodos.pending
- fetchTodos.fulfilled
- fetchTodos.rejected

#### \* 액션 유형 (type)

- todos/fetchTodos/pending
- todos/fetchTodos/fulfilled
- todos/fetchTodos/rejected

<br/>

### \* fetchTodos thunk 함수 호출 프로세스

1. pending 액션 dispatch
2. payloadCreator 를 호출하고 처리되어 Promise 반환할 때까지 대기
3. Promise 반환 값이 성공이면 fulfilled 액션 dispatch  
   실패하면 rejected 액션 dispatch

※ thunk 함수를 호출할 때, 하나의 인수만 전달 가능하다. 여러 값 전달이 필요하면 단일 객체로 전달해야한다.

<br/>

### \* 자동 생성된 액션들을 슬라이스 내부 리듀서에서 처리하려면 ?

```
// todosSlice.js

const todosSlice = createSlice({
    name: 'todos',
    initialState,
    reducer: {
        ...
    },
    // 슬라이스 외부에서 발생한 리듀서 수신하고 처리
    extraReducers: builder => {
        builder
            .addCase(fetchTodos.pending, (state, action) => {
                state.status = 'loading';
            })
            .addCase(fetchTodos.fulfilled, (state, action) => {
                const newEntities = {};
                action.payload.forEach(todo => {
                    newEntities[todo.id] = todo'
                });
                state.entities = newEntities;
                state.status = 'idle';
            })
            ... // 추가 외부 리듀서
    }
})
```

<br/>

### \* createEntityAdapter

- 데이터 객체 인스턴스를 포함하는 특정 유형의 구조를 갖는다.
- CRUD 작업을 수행하기 위한 리듀서와 선택자 함수를 제공한다.

```
const entityAdapter = createEntityAdapter();

// entityAdapter.getInitialState() 기본 구조
{
    ids: [], // 고유 id, 문자열 또는 숫자
    entities: { ... } // id를 엔터티 객체에 매핑하는 조회 테이블
}

-----------------------------------------------------------------------------
// 고유 id 지정 및 정렬 조건, 필드 추가 방법
const entityAdapter = createEntityAdapter({
    selectId: (entity) => entity.id, // id 말고 다른 필드도 지정 가능
    sortComparer: (a, b) => a.id.localeCompare(b.id), // 정렬 조건
    status: 'idle', // 새 필드 추가
});
```

<br/>

### \* CRUD 제공 함수

```
// ID에 해당하는 엔터티가 존재하지 않는 경우 추가
addOne
addMany

// ID에 해당하는 엔터티가 존재하지 않으면 추가 / 존재하면 교체
setOne
setMany
setAll

// ID에 해당하는 엔터티 제거
removeOne
removeMany

// ID에 해당하는 엔터티가 존재하면 소유하고 있는 필드 수정
updateOne
updateMany

// ID에 해당하는 엔터티가 존재하면 얕은 병합 (없는 필드 추가) / 존재하지 않으면 추가
upsertOne
upsertMany
```

## <br/>

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
