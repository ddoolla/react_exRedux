import { createSlice } from "@reduxjs/toolkit";

/* 필터 상태 상수 */
export const StatusFilters = {
  All: "all",
  Active: "active",
  Completed: "completed",
};

const initialState = {
  status: StatusFilters.All,
  colors: [],
};

/* 필터 슬라이스 */
const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    // 필터 상태 변경
    statusFilterChanged(state, action) {
      state.status = action.payload;
    },

    // 필터 색깔 추가, 삭제
    colorFilterChanged: {
      reducer(state, action) {
        let { color, changeType } = action.payload;
        const { colors } = state;

        switch (changeType) {
          case "added": {
            if (!colors.includes(color)) {
              colors.push(color);
            }
            break;
          }
          case "removed": {
            state.colors = colors.filter(
              (existingColor) => existingColor !== color
            );
            break;
          }
          default:
            return;
        }
      },
      prepare(color, changeType) {
        return {
          payload: { color, changeType },
        };
      },
    },
  },
});

/* 필터 액션 생성자 함수 */
export const { colorFilterChanged, statusFilterChanged } = filtersSlice.actions;

/* 필터 슬라이스 리듀서 */
export default filtersSlice.reducer;
