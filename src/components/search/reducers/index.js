import accommodations from "../../../data/json/accommodations";
import locations from "../../../data/json/locations";
import moment from "moment";
import { getRandomInt } from "../../home/reducers";
import _ from "lodash";
import {directions} from "../components/Results";
const initialState = {
  selectedAccommodation: null,
  selectedLocation: null,
  location: "Anywhere",
  startDate: null,
  endDate: null,
  adults: 2,
  children: 0,
  rooms: 1,
  type: "Hotel",
  results: null,
  accommodationDetail: null,
  sortBy: {
    label: "Price",
    filter: "price",
  },
  direction:directions[0],
  freeCancellationOnly:false
};

const sortByPrice = function (a, b, prop, highestFirst) {
  let nameA = parseFloat(a[prop].replace(',','.').replace('€',''));
  let nameB = parseFloat(b[prop].replace(',','.').replace('€',''));
  if(highestFirst === "desc"){
    if (nameA > nameB) {
      return -1;
    }
    if (nameA < nameB) {
      return 1;
    }
  }else{
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }
  }


  return 0;
};

export const sortByRating = function (a, b, prop, highestFirst) {
  let nameA = parseFloat(a[prop]);
  let nameB = parseFloat(b[prop]);
  if(highestFirst === "desc"){
    if (nameA > nameB) {
      return -1;
    }
    if (nameA < nameB) {
      return 1;
    }
  }else{
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }
  }


  return 0;
};

const sortByReviews = function (a, b, prop, highestFirst) {
  let nameA = parseInt(a[prop]);
  let nameB = parseInt(b[prop]);
  if(highestFirst === "desc"){
    if (nameA > nameB) {
      return -1;
    }
    if (nameA < nameB) {
      return 1;
    }
  }else{
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }
  }


  return 0;
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case "SUBMIT_SEARCH": {
      let results = [];
      let accommodationDetail = null;

      if (!state.selectedAccommodation) {
        accommodations.forEach((accommodation) => {
          if (action.payload.location && accommodation.location
          .toLowerCase()
          .includes(action.payload.location.toLowerCase())) results.push(accommodation);
        });
      }
      if (results.length < 2) {
        const accommodationAmount = getRandomInt(2, 6);
        let i = 0;
        while (i < accommodationAmount) {
          const randomIndex = getRandomInt(0, accommodations.length - 1);
          results.push(accommodations[randomIndex]);
          i++;
        }
      }

      return {
        ...state, ...action.payload,
        location: action.payload.location ? action.payload.location : initialState.location,
        results,
        accommodationDetail,
      };
    }
    case "OPEN_EXPLORE_TYPE":
      return {
        ...state,
        results: action.payload,
      };
    case "SET_SEARCH_SORT":
      results = _.clone(state.results);

      if(action.payload.filter === "price"){
          results = results.sort((a, b) => {
              return sortByPrice(a, b, "price", state.direction.filter);
          });
      }else if(action.payload.filter === "rating"){
        results = results.sort((a, b) => {
          return sortByRating(a, b, "rating", state.direction.filter);
        });
      }else{
        results = results.sort((a, b) => {
          return sortByReviews(a, b, "reviews", state.direction.filter);
        });
      }

      return {
        ...state,
        results,
          sortBy:action.payload
      };
    case "SET_SEARCH_DIRECTION":
      results = _.clone(state.results);

      if(state.sortBy.filter === "price"){
        results = state.results.sort((a, b) => {
          return sortByPrice(a, b, "price", action.payload.filter);
        });
      }else if(state.sortBy.filter === "rating"){
        results = results.sort((a, b) => {
          return sortByRating(a, b, "rating", action.payload.filter);
        });
      }else{
        results = results.sort((a, b) => {
          return sortByReviews(a, b, "reviews", action.payload.filter);
        });

      }

      return {
        ...state,
        results,
        direction:action.payload
      };
    // case "SET_FREE_CANCELLATION":
    //   results = _.clone(state.results).filter;
    //
    //   if()
    //   freeCancelationResults = results
    //   return {
    //     ...state,
    //     results,
    //     direction:action.payload
    //   };
    default: {
      return state;
    }
  }
};
