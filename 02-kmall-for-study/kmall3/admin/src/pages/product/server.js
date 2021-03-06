/*
* @Author: TomChen
* @Date:   2019-04-09 19:29:30
* @Last Modified by:   TomChen
* @Last Modified time: 2019-04-18 19:56:39
*/

import React,{ Component } from 'react'
import { connect } from 'react-redux'
import {
  Form, Input,Breadcrumb, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete,
} from 'antd';

const { Option } = Select;

import { actionCreator } from './store'

import Layout from 'common/layout'


class CategoryAdd extends Component{
    constructor(props){
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    componentDidMount(){
        this.props.getLevelOneCategories()
    }
    handleSubmit(e){
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
          if (!err) {
            this.props.handleAdd(values);
          }
        });
    }        
    render(){
        const { getFieldDecorator } = this.props.form;
        const { isAddFetching,levelOneCategories } = this.props;
        const formItemLayout = {
          labelCol: {
            xs: { span: 24 },
            sm: { span: 8 },
          },
          wrapperCol: {
            xs: { span: 24 },
            sm: { span: 16 },
          },
        };
        const tailFormItemLayout = {
          wrapperCol: {
            xs: {
              span: 24,
              offset: 0,
            },
            sm: {
              span: 16,
              offset: 8,
            },
          },
        };        
        return (
        	<div className="CategoryAdd">
        		<Layout>
                    <Breadcrumb style={{ margin: '16px 0' }}>
                        <Breadcrumb.Item>首页</Breadcrumb.Item>
                        <Breadcrumb.Item>分类管理</Breadcrumb.Item>
                        <Breadcrumb.Item>添加分类</Breadcrumb.Item>
                    </Breadcrumb>
                    <Form {...formItemLayout}>
                        <Form.Item label="商品名称">
                          {getFieldDecorator('name', {
                            rules: [{ required: true, message: '请输入分类名称!' }],
                          })(
                            <Input placeholder="商品名称" style={{width:300}} />
                          )}
                        </Form.Item>
                        <Form.Item label="商品描述">
                          {getFieldDecorator('pid', {
                            rules: [{ required: true, message: '请输商品描述!' }],
                          })(
                            <Form.Item placeholder="商品描述">
                          )}
                        </Form.Item>                                             
                        <Form.Item {...tailFormItemLayout}>
                          <Button 
                            type="primary"
                            loading={isAddFetching} 
                            onClick={this.handleSubmit}
                          >
                            提交
                          </Button>
                        </Form.Item>
                    </Form>                  
        		</Layout>
        	</div>
        )
    }
}
const WrappedCategoryAdd = Form.create()(CategoryAdd);

const mapStateToProps = (state)=>{
    return {  
        }
}

const mapDispatchToProps = (dispatch)=>{
    return {
        
        }
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(WrappedCategoryAdd)