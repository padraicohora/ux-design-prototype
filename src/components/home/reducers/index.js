import {TOGGLE_SEARCH_BAR} from "../constants";
import accommodations from "../../../data/json/accommodations";
import locations from "../../../data/json/locations";

const initialState = {
    searchOpen: false,
    searchLocations: [],
    searchAccommodations: [],
    searchRelated: [],
    loading: false
};

export function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default (state = initialState, action = {}) => {
    switch (action.type) {
        case TOGGLE_SEARCH_BAR:
            return {
                ...state, searchOpen: !state.searchOpen,
            };

        case "OPEN_EXPLORE_TYPE":
            return {
                ...state, searchOpen: false,
            };
        case "OPEN_ACCOMMODATION":
            return {
                ...state, searchOpen: false,
            };
        case "HIDE_SEARCH_BAR":
            return {
                ...state, searchOpen: false,
            };
        case "SUBMIT_SEARCH":
            return {
                ...state, searchOpen: false,
            };
        case "SEARCH_BY_LOCATION" : {
            let searchLocations = [], searchAccommodations = [], searchRelated = [];
            accommodations.forEach((accommodation) => {
                if (accommodation.title.toLowerCase()
                .includes(action.payload.toLowerCase())) searchAccommodations.push(accommodation);
            });
            if (searchAccommodations.length < 2) {
                const accommodationAmount = getRandomInt(2, 6);
                let i = 0;
                while (i < accommodationAmount) {
                    const randomIndex = getRandomInt(0, accommodations.length - 1);
                    searchAccommodations.push(accommodations[randomIndex]);
                    i++;
                }
            }
            locations.forEach((location) => {
                if (location.location.toLowerCase()
                .includes(action.payload.toLowerCase())) searchLocations.push(location);
            });
            if (searchLocations.length < 2) {
                const locationAmount = getRandomInt(2, 6);
                let i = 0;
                while (i < locationAmount) {
                    const randomIndex = getRandomInt(0, locations.length - 1);
                    searchLocations.push(locations[randomIndex]);
                    i++;
                }
            }
            const relatedAmount = getRandomInt(5, 20);
            let i = 0;
            while (i < relatedAmount) {
                const randomIndex = getRandomInt(0, accommodations.length - 1);
                searchRelated.push(accommodations[randomIndex]);
                i++;
            }
            return {
                ...state, searchLocations, searchAccommodations, searchRelated
            };
        }
        case "SUBMIT_ASSISTANT":{
            return {
                ...state, loading: true,
            };
        }
        case "SET_LOADING":{
            return {
                ...state, loading: true,
            };
        }
        case "UNSET_LOADING":{
            return {
                ...state, loading: false,
            };
        }

        default: {
            return state;
        }
    }
}
