<template>
  <div class="food" v-show="showFlag">
    <div class="food-content">
      <div class="img-header">
        <img :src="food.image"/>
        <div class="back-wrapper" @click="back"><i class="icon-arrow_lift"><!--返回按钮--></i></div>
      </div>
      <div class="content">
        <h1 class="title">{{food.name}}</h1>
        <div class="detail">
          <span class="sell-count">月售{{food.sellCount}}份</span>
          <span class="rating">好评率{{food.rating}}%</span>
        </div>
        <div class="price">
          <span class="now">￥{{food.price}}</span>
          <span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
        </div>
        <!--加入购物车-->
        <div class="cart-wrapper">
          <cart :food="food"></cart>
        </div>
        <div class="buy" @click="addFirst" v-show="!food.count || food.count === 0">加入购物车</div>
      </div>
      <split v-show="food.info"></split>
      <div class="info" v-show="food.info">
        <h1 class="title">商品信息</h1>
        <p class="desc">{{food.info}}</p>
      </div>
      <split></split>
      <div class="ratings">
        <h1 class="title">商品评价</h1>
        <ratingselect :ratings="food.ratings" :selecttype="selectType" :onlycontent="onlyContent"
                      :desc="desc"
                      @toggle="p_toggle"
                      @select="p_select"></ratingselect>
      </div>
      <div class="rating-wrapper">
        <ul v-show="food.ratings && food.ratings.length > 0">
          <li v-show="needShow(rating.rateType,rating.text)" class="rating-item border-1px"
              v-for="rating in food.ratings">
            <div class="left-wrapper">
              <div class="time">{{rating.rateTime | formatDate}}</div>
              <p class="text">
                <span :class="{'icon-thumb_up':rating.rateType===0,'icon-thumb_down':rating.rateType===1}"></span>
                {{rating.text}}
              </p>
            </div>
            <div class="user">
              <span class="name">{{rating.username}}</span>
              <img class="avatar" width="12" height="12" :src="rating.avatar"/>
            </div>
          </li>
        </ul>
        <div class="no-rating" v-show="!food.ratings || food.ratings.length == 0">暂无评论</div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
  @import '../../common/sass/mixin';

  .food {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 48px;
    z-index: 30;
    width: 100%;
    background-color: #fff;
    .food-content {
      .img-header {
        position: relative;
        width: 100%;
        height: 0;
        padding-top: 100%;
        img {
          position: absolute;
          width: 100%;
          left: 0;
          top: 0;
          height: 100%;
        }
        .back-wrapper {
          position: absolute;
          top: 10px;
          left: 0;
          .icon-arrow_lift {
            display: inline-block;
            padding: 10px;
            font-size: 20px;
            color: #fff;
          }
        }
      }
      .content {
        position: relative;
        padding: 18px;
        .title {
          line-height: 14px;
          margin-bottom: 8px;
          font-size: 14px;
          font-weight: 700;
          color: rgb(7, 17, 27);
        }
        .detail {
          margin-bottom: 18px;
          font-size: 0;
          height: 10px;
          line-height: 10px;
          .sell-count {
            display: inline-block;
            font-size: 12px;
            color: rgb(147, 153, 159);
            margin-right: 12px;
          }
          .rating {
            display: inline-block;
            font-size: 12px;
            color: rgb(147, 153, 159);
          }
        }
        .price {
          font-weight: 700;
          line-height: 24px;
          .now {
            margin-right: 8px;
            font-size: 16px;
            color: rgb(240, 20, 20);
          }
          .old {
            text-decoration: line-through;
            font-size: 12px;
            color: rgb(147, 153, 150);
          }
        }
        .cart-wrapper {
          position: absolute;
          right: 12px;
          bottom: 12px;
        }
        .buy {
          position: absolute;
          right: 18px;
          bottom: 18px;
          z-index: 10;
          height: 24px;
          line-height: 24px;
          padding: 0 12px;
          box-sizing: border-box;
          font-size: 12px;
          border-radius: 12px;
          color: #fff;
          background-color: rgb(0, 160, 220);
        }
      }
      .info {
        padding: 18px;
        .title {
          line-height: 14px;
          margin-bottom: 6px;
          font-size: 14px;
          color: rgb(7, 17, 27);
        }
        .desc {
          line-height: 24px;
          font-size: 12px;
          font-weight: 200;
          padding: 0 8px;
          color: rgb(77, 85, 93);
        }
      }
      .ratings {
        padding-top: 18px;
        .title {
          line-height: 14px;
          margin-left: 6px;
          font-size: 14px;
          color: rgb(7, 17, 27);
        }
      }
      .rating-wrapper {
        padding: 0 18px;
        .rating-item {
          position: relative;
          padding: 16px 0;
          @include border-1px(rgba(7, 17, 27, .2));
          .left-wrapper {
            line-height: 12px;
            font-size: 10px;
            margin-bottom: 6px;
            color: rgb(147, 153, 159);
            .text {
              line-height: 16px;
              font-size: 12px;
              color: rgb(7, 17, 27);
              .icon-thumb_up, .icon-thumb_down {
                font-size: 12px;
                margin-right: 4px;
                line-height: 16px;
              }
              .icon-thumb_up {
                color: rgb(0, 160, 220);
              }
              .icon-thumb_down {
                color: rgb(147, 153, 159);
              }
            }
          }
          .user {
            position: absolute;
            right: 0;
            top: 16px;
            font-size: 0;
            line-height: 12px;
            .name {
              font-size: 10px;
              color: rgb(147, 153, 159);
              display: inline-block;
              margin-right: 6px;
              vertical-align: top;
            }
            .avatar {
              border-radius: 50%;
            }
          }
        }
        .no-rating{
          padding: 16px 0;
          font-size: 12px;
          color: rgb(147,153,159);
        }
      }
    }
  }
</style>
<script>
import Vue from 'vue';
import BScroll from 'better-scroll';
import cart from '../cart/cart.vue';
import split from '../split/split';
import ratingselect from '../ratingselect/ratingselect.vue';
import {formatDate} from '../../common/js/date.js';

  const POSITIVE = 0;
  const NEGATIVE = 1;
  const ALL = 2;
    export default{
        data(){
            return{
              showFlag: false,
              desc:{
                all:'全部',
                positive:'推荐',
                negative:'吐糟'
              },
              onlyContent:true,
              selectType:ALL
            }
        },
        components:{
          cart,split,ratingselect
        },
        props:{
          food:{
            type:Object
          }
        },
        methods:{
          show(){
            this.selectType = ALL;
            this.onlyContent = true;
            this.showFlag = true;
            this.$nextTick(() => {
            if(!this.foodScroll){
              let foodWrapper = document.querySelector('.food');
              this.foodScroll = new BScroll(foodWrapper, {click: true});
            }else{
              this.foodScroll.refresh();
            }
            });
          },
          back(){
            this.showFlag = false;
          },
          addFirst(event){
            if(!event._constructed){
              return;
            }
            Vue.set(this.food,"count",1);
          },
          needShow(type, text){
            if(this.onlyContent && !text){
              return false;
            }
            if(this.selectType === ALL){
              return true;
            }else{
              return type === this.selectType;
            }
          },
          //传给子组件调用，钩子方法
          p_toggle(t) {
            this.onlyContent = t;
            this.$nextTick(() => {
              this.foodScroll.refresh();
            });
          },
          p_select(type) {
            this.selectType = type;
            this.$nextTick(() => {
              this.foodScroll.refresh();
            });
          }
        },
        filters:{
          formatDate(time){
            let date = new Date(time);
            return formatDate(date, 'yyyy-MM-dd hh:mm');
          }
        }
    }






</script>
