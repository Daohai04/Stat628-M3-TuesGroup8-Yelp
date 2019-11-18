import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import backgroud from './test.jpeg';
import List from './components/List';
import { actionCreators } from './store';
import { BackTop } from  './style';
import { 
	HomeWrapper,
	HomeCenter
} from './style';
class Home extends PureComponent {

	
	handleScrollTop(){
		window.scrollTo(0, 0);
	}
	render(){
		return(
			<HomeWrapper>
				<HomeCenter>
					<img className='banner-img' src= {backgroud} alt=''/>
					<List />
				</HomeCenter>
				{ this.props.showScroll ? <BackTop onClick={this.handleScrollTop}>Back Top</BackTop> : null}
				<HomeCenter>
					If you have any question, please connect us: ryin26@wisc.edu, jchen778@wisc.edu, hliu524@wisc.edu.
				</HomeCenter>
			</HomeWrapper>
		)
	}
	componentDidMount(){
		this.props.changeHomeData();
		this.bindEvents();
	}

	componentWillUnmount() {
		window.removeEventListener('scroll', this.props.changeScrollTopShow);
	}

	bindEvents(){
		window.addEventListener('scroll', this.props.changeScrollTopShow);
	}

}

const mapState = (state) => ({
	showScroll: state.getIn(['home', 'showScroll'])
})

const mapDispatch = (dispatch) => ({
	changeHomeData() {
		dispatch(actionCreators.getHomeInfo());
	},
	changeScrollTopShow() {
		if (document.documentElement.scrollTop > 100) {
			dispatch(actionCreators.toggleTopShow(true))
		}else {
			dispatch(actionCreators.toggleTopShow(false))
		}
	}
});
export default connect(mapState, mapDispatch)(Home);
