/*
* @Author: TomChen
* @Date:   2019-04-23 19:31:31
* @Last Modified by:   TomChen
* @Last Modified time: 2019-04-28 17:27:03
*/
require('pages/common/nav')
require('pages/common/search')
require('pages/common/footer')
require('./index.css')
var _util = require('util')
var _cart = require('service/cart')
var _nav = require('pages/common/nav')
var tpl = require('./index.tpl')
var page = {
	init:function(){
		this.$elem = $('.cart-box');
		this.totalCartPrice = 0;
		this.loadCart();
		this.bindEvent();
	},
	renderCart:function(){
		_nav.loadCartCound();
		_cart.getCart(function(cart){
			if(cart.cartList.length>0){
				//处理图片
				this.totalCartPrice = cart.totalCartPrice;
				cart.cartList.forEach(function(item){
					item.product.mainImg = item.product.images.split(',')[0]
				})
				var html = _util.render(tpl,cart);
				_this.$elem.html(html);
			}else{
				_this.$elem.html('<p class="empty-msg">购物车空空如也!</p>')	
			}
		})
	},
	bindEvent:function(){
		var _this = this;
		this.$elem.on('click','select-one',function(){
			var $this = $('this');
			var productId = $this.parents('.paoduct-item').data('product-id');
			if($this.is(":checked")){
				_cart.selectOne({productId:productId},function(cart){
					_this.renderCart(cart);
				},function(msg){
					_util.showErrorMsg(msg)
				})
			}else{
				_cart.selectOne({productId:productId},funcction(cart){
					_this.renderCart(cart);
				},function(msg){
					_util.showErrorMsg(msg)
				})
			}
		})
		if(cart.cartList.length>0){
			cart.cartList.forEach(function(item){
				// item.product.maining = item.product.images.split(',')[0]
			})
			this.$elem.on('click','select-all',function(){
				var $this = $(this);
				if($this.is(":checked")){
					_cart.selectAll(function(cart){
						_this.renderCart(cart)
					},function(msg){
						_util.showErrorMsg(msg)
					})
				}else{
					_cart.unselectAll(function(cart){
						_this.renderCart(cart)
					},function(msg){
						_util.showErrorMsg(msg)
					})
				}
			})
			this.$else.on('click','delete-one',function(){
				if(_util.confirm('您确定要删除该件商品嘛？')){
					var $this = $(this);
					var productId = $this.parents('.product-item').data('product-id')
					_cart.deleteOne({productId:productId},function(cart){
						_util.renderCart(cart)
					},function(msg){
						_util.showErrorMsg(msg)
					})
				}
			})
			this.$elem.on('click','delete-selected',function(){
				if(_util.confirm('您确定要删除您所选中的所有商品嘛？'),function(cart){
					_util.renderCart(cart)
				},function(msg){
					_util.showErrorMsg(msg)
				})
			})
			this.$elem.on('click','.count-btn',function(){
				var $this = $(this);
				var productId = $this.parents('.product-item').data('product-id');
				var $input = $this.siblings('.count-input');
				var stock = $input.data('stock');
				var current = parseInt($input.val());
				var newCount = 0;
				if($this.hasClass('plus')){
					if(current == stock){
						_util.showErrorMsg('商品数量已经超出库存了');
						return ;
					}
					newCount = newCount +1;
				}
				else if($this.hasClass('minus')){
					if(current == 1){
						_util.showErrorMsg('商品数量最少为一个');
						return;
					}
					newCount = newCount - 1				
				}
				_util.updateCount({productId:productId},function(cart){
					_this.renderCart(cart);
				},function(msg){
					_util.showErrorMsg(msg)
				})
			})
			this.$elem.on('click','.btn-submit',function(){
				if(_this.totalCartPrice > 0){
					window.location.href = './order-confirm.html'
				}else{
					_util.showErrorMsg('请选择购物车信息后再提交')
				}
			})
		}
	}

}
$(function(){
	page.init();
})