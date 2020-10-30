// import {
//   TRENDING_MOVIES,
//   POPULAR_MOVIES,
//   TOP_RATED_MOVIES,
//   DRAMA_MOVIES,
//   MYSTERY_MOVIES,
//   TRENDING_TV,
//   POPULAR_TV,
//   TOP_RATED_TV
// } from '../actions/types';

const DEFAULT_MOVIES = { totalPages: 0, currentPage: 0, results: [] };

// https://redux.js.org/recipes/structuring-reducers/reusing-reducer-logic
export const generateReducerWithType = type => {
  return (state = DEFAULT_MOVIES, action) => {
    switch (action.type) {
      case type:
        return {
          ...state,
          ...action.payload,
          results: [...state.results, ...action.payload.results]
        };
      default:
        return state;
    }
  }
} 

// export const trendingMoviesReducer = (state = DEFAULT_MOVIES, action) => {
//   switch (action.type) {
//     case TRENDING_MOVIES:
//       return {
//         ...state,
//         ...action.payload,
//         results: [...state.results, ...action.payload.results],
//       };
//     default:
//       return state;
//   }
// };

// export const popularMoviesReducer = (state = DEFAULT_MOVIES, action) => {
//   switch (action.type) {
//     case POPULAR_MOVIES:
//       return {
//         ...state,
//         ...action.payload,
//         results: [...state.results, ...action.payload.results],
//       };
//     default:
//       return state;
//   }
// };

// export const topRatedMoviesReducer = (state = DEFAULT_MOVIES, action) => {
//   switch (action.type) {
//     case TOP_RATED_MOVIES:
//       return {
//         ...state,
//         ...action.payload,
//         results: [...state.results, ...action.payload.results],
//       };
//     default:
//       return state;
//   }
// };

// export const dramaMoviesReducer = (state = DEFAULT_MOVIES, action) => {
//   switch (action.type) {
//     case DRAMA_MOVIES:
//       return {
//         ...state,
//         ...action.payload,
//         results: [...state.results, ...action.payload.results],
//       };
//     default:
//       return state;
//   }
// };

// export const mysteryMoviesReducer = (state = DEFAULT_MOVIES, action) => {
//   switch (action.type) {
//     case MYSTERY_MOVIES:
//       return {
//         ...state,
//         ...action.payload,
//         results: [...state.results, ...action.payload.results],
//       };
//     default:
//       return state;
//   }
// };

// export const trendingTvReducer = (state = DEFAULT_MOVIES, action) => {
//   switch (action.type) {
//     case TRENDING_TV:
//       return {
//         ...state,
//         ...action.payload,
//         results: [...state.results, ...action.payload.results],
//       };
//     default:
//       return state;
//   }
// };

// export const popularTvReducer = (state = DEFAULT_MOVIES, action) => {
//   switch (action.type) {
//     case POPULAR_TV:
//       return {
//         ...state,
//         ...action.payload,
//         results: [...state.results, ...action.payload.results]
//       };
//     default:
//       return state;
//   }
// };


// export const topRatedTvReducer = (state = DEFAULT_MOVIES, action) => {
//   switch (action.type) {
//     case TOP_RATED_TV:
//       return {
//         ...state,
//         ...action.payload,
//         results: [...state.results, ...action.payload.results]
//       };
//     default:
//       return state;
//   }
// };