import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { DetailWrapper, Header, Content, SmallHeader } from './style';
import { actionCreators } from './store';
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'



class Detail extends PureComponent {
	constructor(props) {
		super(props);
	
		this.state = {
		  // To avoid unnecessary update keep all options in the state.
		  chartOptions: {
			title: {
				text: 'Number of Reviews'
			},
			chart: {
				type: 'column'
			},
			xAxis: {
			  categories: ['1.0', '2.0', '3.0','4.0','5.0'],
			},
			series: [
			  { data: [this.props.star1, this.props.star2, this.props.star3, this.props.star4, this.props.star5] }
			]
		  }
		};
	  }
	render(){
		const { chartOptions} = this.state;
		return(
			<DetailWrapper>
				<Header>{this.props.Bussiness_name}</Header>
				<div>City: {this.props.city} &emsp;||&emsp;Zipcode: {this.props.zipcode}&emsp;||&emsp;Stars: {this.props.stars}</div><br/>
				
				<HighchartsReact
					highcharts={Highcharts}
					options={chartOptions}
				/>
				<SmallHeader>Advice from Attribute</SmallHeader>
				<Content 
					dangerouslySetInnerHTML={{__html: this.props.advice}}
				/>
				<br/><img src="https://scx1.b-cdn.net/csz/news/800/2016/howcuttingdo.jpg"/><br/>
				<SmallHeader>Advice from Review</SmallHeader>
				<Content 
					dangerouslySetInnerHTML={{__html: this.props.advice2}}
				/>
				
				
			</DetailWrapper>

		)
	}
	componentDidMount(){
		this.props.getDetail(this.props.match.params.id);
	}
	componentWillReceiveProps(newProps){
		if(newProps.match.params.id){
			this.props.getDetail(newProps.match.params.id);
		}else{
			return;
		}
		
	}
}

const mapState = (state)=>({
	Bussiness_name: state.getIn(['detail', 'Bussiness_name']),
	advice: state.getIn(['detail','advice']),
	zipcode: state.getIn(['detail','zipcode']),
	stars: state.getIn(['detail','stars']),
	city: state.getIn(['detail','city']),
	advice2: state.getIn(['detail','advice2']),
	star1: state.getIn(['detail','star1']),
	star2: state.getIn(['detail','star2']),
	star3: state.getIn(['detail','star3']),
	star4: state.getIn(['detail','star4']),
	star5: state.getIn(['detail','star5'])
});
const mapDispatch = (dispatch)=>({
	getDetail(id) {
		dispatch(actionCreators.getDetail(id));
	}
})


export default withRouter(connect(mapState, mapDispatch)(Detail));

