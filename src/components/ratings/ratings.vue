<template>
  <div class="ratings">
    <div class="ratings-content">
      <div class="overview">
        <div class="left">
          <div class="score">{{seller.score}}</div>
          <div class="title">综合评分</div>
          <div class="rank">高于周边商家{{seller.rankRate}}%</div>
        </div>
        <div class="right">
          <div class="score-wrapper">
            <span class="title">服务态度</span>
            <star class="star" :size="36" :score="seller.serviceScore"></star>
            <span class="score">{{seller.serviceScore}}</span>
          </div>
          <div class="score-wrapper">
            <span class="title">商品评价</span>
            <star class="star" :size="36" :score="seller.foodScore"></star>
            <span class="score">{{seller.foodScore}}</span>
          </div>
          <div class="time-wrapper">
            <span class="title">送达时间</span>
            <span class="delivery">{{seller.deliveryTime}}分钟</span>
          </div>
        </div>
      </div>
      <split></split>
      <ratingselect :ratings="ratings" :selecttype="selectType" :onlycontent="onlyContent"
                    @toggle="p_toggle"
                    @select="p_select"></ratingselect>
      <div class="rating-wrapper">
        <ul v-show="ratings && ratings.length > 0">
          <li v-show="needShow(rating.rateType, rating.text)" class="rating-item border-1px"
              v-for="rating in ratings">
            <div class="avatar">
              <img width="28" height="28" :src="rating.avatar"/>
            </div>
            <div class="content">
              <h1 class="name">{{rating.username}}</h1>
              <div class="star-wrapper">
                <star class="star" :size="24" :score="rating.score"></star>
                <div class="delivery" v-show="rating.deliveryTime">{{rating.deliveryTime}}分钟送达</div>
              </div>
              <p class="text">{{rating.text}}</p>
              <div class="recommend" v-show="rating.recommend && rating.recommend.length">
                <span class="icon-thumb_up"></span>
                <span class="item" v-for="item in rating.recommend">{{item}}</span>
              </div>
              <div class="time">{{rating.rateTime | formatDate}}</div>
            </div>
          </li>
        </ul>
        <div class="no-rating" v-show="!ratings || ratings.length == 0">暂无评论</div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
  @import "../../common/sass/mixin";

  .ratings {
    position: absolute;
    top: 174px;
    left: 0;
    bottom: 0;
    width: 100%;
    overflow: hidden;
    .ratings-content {
      .overview {
        display: flex;
        padding: 18px 0;
        .left {
          flex: 0 0 137px;
          width: 137px;
          text-align: center;
          border-right: 1px solid rgba(7, 17, 27, .1);
          padding: 6px 0;
          @media screen and (max-width: 320px) {
            width: 120px;
            flex: 0 0 120px;
          }
          .score {
            line-height: 28px;
            margin-bottom: 6px;
            font-size: 24px;
            color: rgb(255, 153, 0);
          }
          .title {
            line-height: 12px;
            font-size: 12px;
            color: rgba(7, 17, 27, 1);
            font-weight: 700;
            margin-bottom: 8px;
          }
          .rank {
            line-height: 10px;
            font-size: 12px;
            color: rgb(147, 153, 159);
          }
        }
        .right {
          flex: 1;
          padding: 6px 0 6px 24px;
          @media screen and (max-width: 320px) {
            padding-left: 6px;
          }
          .score-wrapper {
            margin-bottom: 8px;
            line-height: 18px;
            font-size: 0;
            .title {
              font-size: 12px;
              color: rgb(7, 17, 27);
            }
            .star {
              display: inline-block;
              margin: 0 12px;
              vertical-align: top;
            }
            .score {
              display: inline-block;
              vertical-align: top;
              font-size: 12px;
              color: rgb(7, 17, 27);
              line-height: 18px;
            }
          }
          .time-wrapper {
            font-size: 0;
            .title {
              font-size: 12px;
              color: rgb(7, 17, 27);
            }
            .delivery {
              font-size: 12px;
              color: rgb(147, 153, 159);
              margin-left: 12px;
            }
          }
        }
      }
      .rating-wrapper {
        padding: 0 15px;
        .rating-item {
          display: flex;
          padding: 18px 0;
          @include border-1px(rgba(7, 17, 27, .2));
          &:last-child{
            @include border-none();
          }
          .avatar {
            flex: 0 0 28px;
            width: 28px;
            margin-right: 12px;
            img {
              border-radius: 50%;
            }
          }
          .content {
            position: relative;
            flex: 1;
            .name {
              line-height: 12px;
              font-size: 12px;
              color: rgba(7, 17, 27, 1);
            }
            .star-wrapper {
              margin-bottom: 6px;
              font-size: 0;
              .star {
                display: inline-block;
                margin-right: 6px;
                vertical-align: top;
                .star-item{
                  margin-right: 0px;
                }
              }
              .delivery {
                display: inline-block;
                vertical-align: top;
                line-height: 12px;
                font-size: 12px;
                color: rgba(7, 17, 27, 1);
              }
            }
            .text {
              margin-bottom: 8px;
              line-height: 18px;
              font-size: 12px;
              color: rgba(7, 17, 27, 1);
            }
            .recommend{
              line-height: 16px;
              font-size: 0;
              .icon-thumb_up, .item {
                display: inline-block;
                margin: 0 8px 4px 0;
                font-size: 9px;
              }
              .icon-thumb_up {
                color: rgb(0, 160, 220);
              }
              .item {
                padding: 6px;
                border: 1px solid rgba(7, 17, 27, .1);
                border-radius: 1px;
                color: rgb(147,153,159);
                background-color: #fff;
              }
            }
            .time{
              position: absolute;
              top: 0;
              right: 0;
              font-size: 12px;
              line-height: 12px;
              color: rgb(147,153,159);
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
import star from '../star/star.vue';
import BScroll from 'better-scroll';
import ratingselect from '../ratingselect/ratingselect';
import split from '../split/split';
import {formatDate} from '../../common/js/date.js';

    export default{
        props:{
          seller:{
            type:Object
          }
        },
        data(){
            return{
              ratingsScroll:undefined,
              showFlag: false,
              selectType: 2,
              onlyContent: true,
              ratings:[]
            }
        },
        components:{
          star,ratingselect,split
        },
        created(){
            this.$http.get("http://127.0.0.1:8089/data.json").then(
              (res) => {
                  this.ratings = res.body.ratings;
                  this.$nextTick(() => {
                    if(!this.ratingsScroll){
                      this.ratingsScroll = new BScroll(document.querySelector('.ratings'), {click: true});
                    }else{
                      this.ratingsScroll.refresh();
                    }
                  });
              }, (res) => {
              // 处理失败的结果
              }
            );
        },
        methods:{
          //传给子组件调用，钩子方法
          p_toggle(t) {
            this.onlyContent = t;
            this.$nextTick(() => {
              this.ratingsScroll.refresh();
            });
          },
          p_select(type) {
            this.selectType = type;
            this.$nextTick(() => {
              this.ratingsScroll.refresh();
            });
          },
          needShow(type, text){
            if(this.onlyContent && !text){
              return false;
            }
            if(this.selectType === 2){
              return true;
            }else{
              return type === this.selectType;
            }
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
