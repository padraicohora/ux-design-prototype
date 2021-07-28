import {TOGGLE_SEARCH_BAR} from "../constants";
import accommodations from "../../../data/json/accommodations";
import locations from "../../../data/json/locations";

const initialState = {
    searchOpen:true,
    searchLocations:[],
    searchAccommodations:[],
    searchRelated:[],
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default (state = initialState, action = {}) => {
    switch (action.type) {
        case TOGGLE_SEARCH_BAR:
            return {
                ...state,
                searchOpen: !state.searchOpen,
            }
        case "SEARCH_BY_LOCATION" : {
            console.log(`SEARCH_BY_LOCATION`)
            let searchLocations = [], searchAccommodations = [], searchRelated = [];
            accommodations.forEach((accommodation)=> {
                if(accommodation.title.toLowerCase().includes(action.payload.toLowerCase())) searchAccommodations.push(accommodation)
            })
            locations.forEach((location)=> {
                if(location.location.toLowerCase().includes(action.payload.toLowerCase())) searchLocations.push(location)
            })
            const relatedAmount = getRandomInt(5, 20);
            let i = 0;
            while(i < relatedAmount){
                const randomIndex = getRandomInt(0, accommodations.length);
                searchRelated.push(accommodations[randomIndex])
                i++
            }
            return {
                ...state,
                searchLocations,
                searchAccommodations,
                searchRelated
            }
        }
        default: {
            return state
        }
    }
}
