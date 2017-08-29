<template>
  <div>
  <div class="shop-cart">
    <div class="content" @click="toggleList">
      <div class="content-left">
        <div class="logo-wrapper">
          <div class="logo" :class="{'highLight':totalCount>0}">
            <i class="icon-shopping_cart" :class="{'highLight':totalCount>0}"></i>
          </div>
          <div class="number" v-show="totalCount>0">{{totalCount}}</div>
        </div>
        <div class="price" :class="{'highLight':totalPrice>0}">￥{{totalPrice}}</div>
        <div class="desc">另需配送费￥{{deliveryPrice}}元</div>
      </div>
      <div class="content-right" @click.stop.prevent="pay">
        <div class="pay" :class="payClass">{{payDesc}}</div>
      </div>
    </div>
    <div class="shopcart-list" v-show="listShow" transition="fold">
      <div class="list-header">
        <h1 class="title">购物车</h1>
        <span class="empty" @click="empty">清空</span>
      </div>
      <div class="list-content">
        <ul>
          <li class="foods" v-for="food in selectFoods">
            <span class="name">{{food.name}}</span>
            <div class="price">
              <span>￥{{food.price * food.count}}</span>
            </div>
            <div class="cartcontrol-wrapper">
              <cart :food="food"></cart>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
  <div class="list-mask" v-show="listShow" transition="fade" @click="fold = true"></div>
  </div>
</template>
<style lang="scss" scoped>
  @import "../../common/sass/mixin";
  .shop-cart {
    position: fixed;
    width: 100%;
    height: 48px;
    left: 0;
    bottom: 0;
    z-index: 99;
    .content {
      display: flex;
      background-color: #141d27;
      font-size: 0;
      .content-left {
        flex: 1;
        .logo-wrapper {
          display: inline-block;
          position: relative;
          top: -10px;
          margin: 0 12px;
          padding: 6px;
          width: 56px;
          height: 56px;
          box-sizing: border-box;
          vertical-align: top;
          border-radius: 50%;
          background-color: #141d27;
          .logo {
            width: 100%;
            height: 100%;
            border-radius: 50%;
            background-color: #2b343c;
            text-align: center;
            &.highLight{
              background-color: rgb(0,160,220);
            }
            .icon-shopping_cart {
              font-size: 24px;
              color: #80858a;
              line-height: 44px;
              &.highLight{
                color: #fff;
              }
            }
          }
          .number {
            position: absolute;
            top: 0;
            right: 0;
            width: 24px;
            height: 16px;
            line-height: 16px;
            text-align: center;
            border-radius: 16px;
            font-size: 9px;
            font-weight: 700;
            color: #fff;
            background-color: rgb(240, 20, 20);
            box-shadow: 0 4px 8px 0 rgba(0, 0, 0, .4);
          }
        }
        .price {
          display: inline-block;
          vertical-align: top;
          line-height: 24px;
          margin-top: 12px;
          box-sizing: border-box;
          padding-right: 12px;
          border-right: 1px solid rgba(255, 255, 255, .1);
          font-size: 16px;
          font-weight: 700;
          color: rgba(255, 255, 255, .4);
          &.highLight{
            color: #fff;
          }
        }
        .desc {
          display: inline-block;
          vertical-align: top;
          line-height: 24px;
          margin: 12px 0 0 12px;
          font-size: 12px;
          color: rgba(255, 255, 255, .4);
        }
      }
      .content-right {
        flex: 0 0 105px;
        width: 105px;
        .pay {
          height: 48px;
          line-height: 48px;
          font-size: 12px;
          text-align: center;
          color: rgba(255, 255, 255, .4);
          font-weight: 700;
          background-color: #2B333B;
          &.not-enough{
            background-color: #2B333B;
          }
          &.enough{
            background-color: #00b43c;
            color: #fff;
          }
        }
      }
    }
    .shopcart-list{
      position: absolute;
      bottom: 48px;
      left: 0;
      z-index: -1;
      width: 100%;
      &.fold-transition{
        transition: all 1s linear;
        transform: translate3d(0,100%,0);
      }
      &.fold-enter,&.fold-leave{
        transform: translate3d(0,0,0);
      }
      .list-header{
        height: 40px;
        line-height: 40px;
        padding: 0 18px;
        background-color: #f3f5f7;
        border-bottom: 1px solid rgba(7,17,27,0.1);
        .title{
          float: left;
          color: #676A6D;
          font-size: 14px;
        }
        .empty{
          float: right;
          color: #0DA5DA;
          font-size: 12px;
        }
      }
      .list-content{
        padding: 0 18px 10px;
        max-height: 217px;
        background-color: #fff;
        overflow-y: auto;
        .foods{
          position: relative;
          padding: 12px 0;
          box-sizing: border-box;
          @include border-1px(rgba(7,17,27,0.1));
          &:last-child{
            @include border-none();
          }
          .name{
            line-height: 24px;
            font-size: 14px;
            color: rgb(7,17,27);
          }
          .price{
            position: absolute;
            right: 90px;
            bottom: 12px;
            line-height: 24px;
            font-size: 14px;
            color: rgb(240,20,20);
            font-weight: 700;
          }
          .cartcontrol-wrapper{
            position: absolute;
            right: 0;
            bottom: 6px;
          }
        }
      }
    }
  }
  .list-mask{
    position: fixed;
    top:0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 98;
    overflow: hidden;
    background-color: rgba(7,17,27,.8);
    //背影变模糊
    -webkit-backdrop-filter: blur(10px);
    &.fade-enter-active {
      transition: all .5s;
    }
    &.fade-leave-active {
      transition: all .5s;
    }
    &.fade-enter, &.fade-leave-to{
      opacity: 0;
      background-color: rgba(7,17,27,0);
    }
  }
</style>
<script>
import BScroll from 'better-scroll';
import cart from '../cart/cart.vue';
    export default{
        data(){
            return{
              fold:true
            }
        },
        components:{
          cart
        },
        props:{
          selectFoods:{
            type:Array,
            default:()=>{
              return [];
            }
          },
          deliveryPrice:{
            type:Number,
            default: 0
          },
          minPrice:{
            type:Number,
            default: 0
          }
        },
        computed:{
          totalPrice(){
             let total = 0;
             this.selectFoods.forEach((food,index)=>{
              total += food.price * food.count;
             });
             return total;
          },
          totalCount(){
            let count = 0;
            this.selectFoods.forEach((food) => {
               count += food.count;
            });
            return count;
          },
          payDesc(){
            if(this.totalPrice === 0){
              return `￥${this.minPrice}元起送`;
            }else if(this.totalPrice < this.minPrice){
              return `还差￥${this.minPrice - this.totalPrice}元起送`;
            }else{
              return '去结算';
            }
          },
          payClass(){
            if(this.totalPrice < this.minPrice){
               return 'not-enough';
            }else{
               return 'enough';
            }
          },
          listShow(){
            if(!this.totalCount){
              this.fold = true;
              return false;
            }
            let show = !this.fold;
            if(show){
              this.$nextTick(() => {
                if(!this.scroll){
                  let listWrapper = document.querySelector('.list-content');
                  this.scroll = new BScroll(listWrapper, {click: true});
                }else{
                  this.scroll.refresh();
                }
              });
            }
            return show;
          }
        },
        methods:{
          toggleList(){
            if(!this.totalCount){
              return;
            }
            this.fold = !this.fold;
          },
          empty(){
            this.selectFoods.forEach((food) => {
              food.count = 0;
            })
          },
          pay(){
            if(this.totalPrice < this.minPrice){
              return ;
            }
            window.alert(`支付￥${this.totalPrice}元`);
          }
        }
    }

</script>
