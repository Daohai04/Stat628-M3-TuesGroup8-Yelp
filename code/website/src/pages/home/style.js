import styled from 'styled-components';
export const HomeWrapper = styled.div`
	overflow: hidden;
	width: 960px;
	margin: 0 auto;
`
export const HomeCenter = styled.div`
	float: center;
	margin-left: 15px;
	padding-top: 30px;
	width: 960px;
	.banner-img{
		width: 960px;
		height: 400px;
	}
	.test-img{
		width: 960px;
		height: 400px;
	}
`
export const HomeTitle = styled.div`
	float: center;
	margin-left: 15px;
	padding-top: 30px;
	width: 960px;
	.banner-img{
		width: 960px;
		height: 400px;
	}
	border-bottom: 1px solid #dcdcdc;
`

export const ListItem = styled.div`
	overflow: hidden;
	padding: 20px 0;
	border-bottom: 1px solid #dcdcdc;
	.pic {
		display: block;
		width: 160px;
		height: 130px;
		float: right;
		border-radius: 10px;
	}
`;

export const ListInfo =	styled.div`
	width: 700px;
	float: left;
	.title {
		line-height: 27px;
		font-size: 18px;
		font-weight: bold;
		color: #333;
	}
	.desc {
		line-height: 24px;
		font-size: 13px;
		color: #999;
	}
`;

export const LoadMore = styled.div`
	width: 98%;
	height: 40px;
	line-height: 40px;
	margin: 30px 0;
	background: #DC143C;
	text-align:center;
	border-radius: 20px;
	color: #fff;
	cursor: pointer;
`

export const BackTop = styled.div`
	position: fixed;
	right: 100px;
	bottom: 100px;
	width: 60px;
	height: 60px;
	line-height: 60px;
	text-align: center;
	border: 1px solid #ccc;
	font-size: 14px;
	cursor: pointer;
`