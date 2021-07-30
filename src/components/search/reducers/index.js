import accommodations from "../../../data/json/accommodations";
import locations from "../../../data/json/locations";
import moment from "moment";
import { getRandomInt } from "../../home/reducers";
import _ from "lodash";
const initialState = {
  selectedAccommodation: null,
  selectedLocation: null,
  location: "Anywhere",
  startDate: moment(),
  endDate: moment().add(2, "days"),
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
};

const sortByPrice = function (a, b, prop) {
  let nameA = parseFloat(a[prop].replace(',','.').replace('€',''));
  let nameB = parseFloat(b[prop].replace(',','.').replace('€',''));
  console.log(`nameA ${nameA}`, a[prop])
  console.log(`nameB ${nameB}`, b[prop])
  if (nameA < nameB) {
    return -1;
  }
  if (nameA > nameB) {
    return 1;
  }

  return 0;
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case "SUBMIT_SEARCH":
      let results = [];
      let accommodationDetail = null;
      // if(state.selectedAccommodation){
      //     accommodationDetail = state.selectedAccommodation
      // }

      if (!state.selectedAccommodation) {
        accommodations.forEach((accommodation) => {
          if (
            accommodation.location
              .toLowerCase()
              .includes(action.payload.location.toLowerCase())
          )
            results.push(accommodation);
        });
        if (results.length < 2) {
          const accommodationAmount = getRandomInt(2, 6);
          let i = 0;
          while (i < accommodationAmount) {
            const randomIndex = getRandomInt(0, accommodations.length - 1);
            results.push(accommodations[randomIndex]);
            i++;
          }
        }
      }

      return {
        ...state,
        ...action.payload,
        location: action.payload.location
          ? action.payload.location
          : initialState.location,
        results,
        accommodationDetail,
      };
    case "SET_SEARCH_SORT":
      // let results = [];

      if (!_.isEmpty(state.results)) {
          if(action.payload.filter === "price"){
              results = state.results.sort((a, b) => {
                  return sortByPrice(a, b, action.payload.filter);
              });
          }else{
              results = state.results.sort((a, b) =>
                  a[action.payload.filter] - b[action.payload.filter])
          }
      }

      return {
        ...state,
        results,
          sortBy:action.payload
      };
    default: {
      return state;
    }
  }
};
