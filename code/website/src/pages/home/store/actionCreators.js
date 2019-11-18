import axios from 'axios';
import * as constants from './constants';
import { fromJS } from 'immutable';

const changHomeData = (result) => ({
	type: constants.CHANGE_HOME_DATA,
	articleList: result.articleList
});

const addHomeList = (list, nextPage) => ({
	type: constants.ADD_ARTICLE_LIST,
	list: fromJS(list),
	nextPage
})

export const getHomeInfo = () => {
	return (dispatch) => {
		axios.get('/api/lis.json').then((res) => {
			const result = res.data.data;
			dispatch(changHomeData(result));
		});
	}
}

export const getMoreList = (page) => {
	return (dispatch) => {
		axios.get('/api/list.json').then((res) => {
			let data = res.data.data.articleList;
			function filterByID(item) {
				if (item.page == page){
					return true;
				} 
					return false; 
			}
			
			const result = data.filter(filterByID);
			dispatch(addHomeList(result, page + 1));
		});
	}
}

export const toggleTopShow = (show) => ({
	type: constants.TOGGLE_SCROLL_TOP,
	show
})