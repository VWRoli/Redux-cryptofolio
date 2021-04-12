import {
  GET_TOTALS,
  GET_TOTAL_CHANGE,
  SET_CHART_DATA,
  SET_DAYS,
} from '../constants/actionTypes';

const defaultState = {
  totalValue: 0,
  totalValueChange: 0,
  chartData: [],
  chartDays: '7',
};

const chartReducer = (state = defaultState, action) => {
  switch (action.type) {
    case SET_CHART_DATA:
      return { ...state, chartData: action.payload, isLoading: false };

    case SET_DAYS:
      return { ...state, chartDays: action.payload };

    default:
      return state;
  }
};

export default chartReducer;
