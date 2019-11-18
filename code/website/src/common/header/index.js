import React, { Component } from 'react';
import { connect } from 'react-redux';
import { CSSTransition } from 'react-transition-group';
import { actionCreators } from './store';
import { Link, withRouter } from 'react-router-dom';
import { actionCreators as loginActionCreators } from '../../pages/login/store';
import ReactSearchBox from 'react-search-box'
import axios from 'axios';
import {
	HeaderWrapper,
	Logo,
	Nav,
	NavItem,
	SearchWrapper,
	NavSearch,
	SearchInfoItem
	// SearchInfo,
	// SearchInfoTitle,
	// SearchInfoSwitch,
	// SearchInfoList,
	
	// Addition,
	// Button
} from './style';

class Header extends Component {
	constructor(props) {
		super(props);
	}
	getListArea() {
		const { focused, list, page, totalPage, mouseIn, handleMouseEnter, handleMouseLeave, handleChangePages } = this.props;
		const newList = list.toJS();
		const pageList = [];

		if (newList.length) {
			for (let i = (page - 1) * 10; i < page * 10; i++) {
				pageList.push(
					<SearchInfoItem key={newList[i]}>{newList[i]}</SearchInfoItem>
				)
			}
		}
		
	}

	check() {
		let input = this.input.value;
		if(!input){
			return;
		}

		
		axios.get('/api/list.json').then((res)=> {
			let result = res.data.data.articleList;
			
			function filterByID(item) {
				if (item.Bussiness_name.toLowerCase().indexOf(input.toLowerCase()) > -1 ){
					return true;
				} 
					return false; 
			}
			
			var id = result.filter(filterByID);
			if(id.length < 1){
				return;
			}
			
			this.props.history.push('/detail/' + id[0].id);
		})
	}

	render() {
		const { focused, handleInputFocus, handleInputBlur, list, login, logout, handleGetIndex, index } = this.props;
		return (
			<HeaderWrapper>
				<a href = 'https://www.wisc.edu/'>
				<Logo/>
				</a>
				<Nav>
					<Link to='/'>
						<NavItem className='right'>Home</NavItem>
					</Link>
					{/* <NavItem className='left'></NavItem> */}
					{/* {
						login? 
						<NavItem onClick={logout} className='right'>Sign out</NavItem> :
						<Link to='/login'><NavItem className='right'>Sign in</NavItem></Link>
					} */}
					
					{/* <NavItem className='right'>
						<i className="iconfont">&#xe636;</i>
					</NavItem> */}
					<SearchWrapper>
						<CSSTransition
							in={focused}
							timeout={200}
							classNames="slide"
						>
							<NavSearch
								innerRef = {input => this.input = input}
								className={focused ? 'focused': ''}
								onFocus={() => handleInputFocus(list)}
								onBlur={handleInputBlur}
							></NavSearch>
						</CSSTransition>
						{/* <Link to={'/detail/' + index}> */}
						<span onClick={() => this.check()}>
							<i className={focused ? 'focused iconfont zoom': 'iconfont zoom'}>
									&#xe614;
								</i>
							</span>
						{/* </Link> */}
						{this.getListArea()}
					</SearchWrapper>
				</Nav>
				
			</HeaderWrapper>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		focused: state.getIn(['header', 'focused']),
		list: state.getIn(['header', 'list']),
		page: state.getIn(['header', 'page']),
		totalPage: state.getIn(['header', 'totalPage']),
		mouseIn: state.getIn(['header', 'mouseIn']),
		login: state.getIn(['login', 'login']),
		index: state.getIn(['index', 'index'])
	}
}

const mapDispathToProps = (dispatch) => {
	return {
		handleInputFocus(list) {
			(list.size === 0) && dispatch(actionCreators.getList());
			dispatch(actionCreators.searchFocus());
		},
		handleInputBlur() {
			dispatch(actionCreators.searchBlur());
		},
		handleMouseEnter() {
			dispatch(actionCreators.mouseEnter());
		},
		handleMouseLeave() {
			dispatch(actionCreators.mouseLeave());
		},
		handleChangePage(page, totalPage, spin) {
			let originAngle = spin.style.transform.replace(/[^0-9]/ig, '');
			if (originAngle) {
				originAngle = parseInt(originAngle, 10);
			}else {
				originAngle = 0;
			}
			spin.style.transform = 'rotate(' + (originAngle + 360) + 'deg)';

			if (page < totalPage) {
				dispatch(actionCreators.changePage(page + 1));
			}else {
				dispatch(actionCreators.changePage(1));
			}
		},
		logout(){
			dispatch(loginActionCreators.logout())
		},
		handleGetIndex(data){
			dispatch(actionCreators.getIndex(data))
		}
	}
}

export default withRouter(connect(mapStateToProps, mapDispathToProps)(Header));
