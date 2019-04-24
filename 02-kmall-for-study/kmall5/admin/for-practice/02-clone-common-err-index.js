


import React,{Component} from 'react';
import { Link } from 'react-router-dom';
import { Alert } from 'antd';

import './index.css';

class Err extends Component{
	render(){
		return(
			<div className='Err'>
			    <Alert
			      message="您好象走丢了"
			      description="页面不存在，或者已经被删除"
			      type="error"
			      showIcon
			    />
			    <Link to='/'>返回首页</Link>
 			</div>

		)
	}
}
export default Err