import { fromJS } from 'immutable';
import * as constants from './constants';

const defaultState = fromJS({
	Bussiness_name: 'Default',
	advice: '<img src="https://scx1.b-cdn.net/csz/news/800/2016/howcuttingdo.jpg"/> <p>claihsoich</p>',
	advice2:'',
	zipcode:8758,
	city: 'madison',
	stars: 5.0,
	star1: 1,
	star2: 2,
	star3: 3,
	star4: 4,
	star5: 5
});

export default (state = defaultState, action) => {
	switch(action.type) {
		case constants.CHANGE_DETAIL:
			return state.merge({
				Bussiness_name: action.Bussiness_name,
				advice: action.advice,
				advice2: action.advice2,
				zipcode: action.zipcode,
				stars: action.stars,
				city: action.city,
				star1: action.star1,
				star2: action.star2,
				star3: action.star3,
				star4: action.star4,
				star5: action.star5
			})
		default:
			return state;
	}
}