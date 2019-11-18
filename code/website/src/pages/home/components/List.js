import React, { PureComponent } from 'react';
import { ListItem, ListInfo, LoadMore } from '../style';
import { connect } from 'react-redux';
import { actionCreators } from '../store';
import { Link } from 'react-router-dom';

class List extends PureComponent {
	render() {
		const { list, getMoreList, page } = this.props;
		return (
			<div>
				{
					list.map((item, index) => {
						return (
							<Link key={index} to={'/detail/' + item.get('id')}>
							<ListItem>
								<p className='pic' >
									<br/>
									zipcode: {item.get('zipcode')}<br/>
									<br/>
									city: {item.get('city')}<br/>
									<br/>
									stars: {item.get('stars')}
								</p>
								{/* <img alt='' className='pic' src={item.get('imgUrl')} /> */}
								<ListInfo>
									<h3 className='title'>{item.get('Bussiness_name')}</h3>
									<p className='desc'>{item.get('advice')}</p>
								</ListInfo>
							</ListItem>
							</Link>
						);
					})
				}
				<LoadMore onClick={() => getMoreList(page)}>Load Some Restaurants</LoadMore>
			</div>
		)
	}
}

const mapState = (state) => ({
	list: state.getIn(['home', 'articleList']),
	page: state.getIn(['home', 'articlePage'])
});

const mapDispatch = (dispatch) => ({
	getMoreList(page) {
		dispatch(actionCreators.getMoreList(page))
	}
})

export default connect(mapState, mapDispatch)(List);