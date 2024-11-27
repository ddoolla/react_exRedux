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

> ## Redux 저장소 (store) 설정

### \* configureStore

- Redux Toolkit 의 스토어 설정 프로세스 간소화 API
- 루트 리듀서를 사용하려 Redux 스토어 생성  
  (원래는 루트리듀서에 슬라이스 리듀서를 결합하여 스토어 파일에 가져와야 함)
- thunk 미들웨어 등 각종 미들웨어 자동 추가
- Redux DevTools Extension 자동 연결 설정 (상태 관리 디버깅 브라우저 확장도구)

```
// src/store.js
import { configureStore } from '@reduxjs/toolkit';

const store = configureStore({
    reducer: {
        ... //
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
  <Provider store={store}>
    <App />
  </Provider>
);
```

<br/>

---
