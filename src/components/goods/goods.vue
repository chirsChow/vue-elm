<template>
  <div>
  <div class="goods">
    <div class="menu-wrapper">
      <ul>
        <li v-for="(item, index) in goods" class="menu-item" :class="{'current': index === currentIndex}"
        @click="selectMenu(index, $event)">
          <span class="icon" :class="typeMap[item.type]" v-show="item.type > 0"></span>
          <span class="text">{{item.name}}</span>
        </li>
      </ul>
    </div>
    <div class="foods-wrapper">
      <ul>
        <li v-for="item in goods" class="food-list food-list-hook">
          <h1 class="title">{{item.name}}</h1>
          <ul>
            <li v-for="food in item.foods" class="food-item" @click="selectFood(food,$event)">
              <div class="icon"><img width="57" height="57" :src="food.icon"/></div>
              <div class="content">
                <h2 class="name">{{food.name}}</h2>
                <p class="desc">{{food.description}}</p>
                <div class="extra">
                  <span class="count">月售{{food.sellCount}}</span>
                  <span>好评率{{food.rating}}%</span>
                </div>
                <div class="price">
                  <span class="now">￥{{food.price}}</span>
                  <span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
                </div>
                <div class="cart-wrapper">
                  <cart :food="food"></cart>
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <shopcart :delivery-price="seller.deliveryPrice"
              :min-price="seller.minPrice"
              :select-foods="selectFoods"></shopcart>
  </div>
  <food :food="selectedFood" ref="foodComp"></food>
  </div>
</template>
<style lang="scss" scoped>
  @import "../../common/sass/mixin";

  .goods {
    position: absolute;
    width: 100%;
    top: 177px;
    bottom: 46px;
    display: flex;
    overflow: hidden;
    .menu-wrapper {
      flex: 0 0 80px;
      width: 80px;
      background-color: #f3f5f7;
      .menu-item {
        display: table;
        height: 56px;
        width: 56px;
        line-height: 14px;
        padding: 0 12px;
        @include border-1px(rgba(7, 17, 27, .2));
        .icon {
          display: inline-block;
          vertical-align: top;
          width: 14px;
          height: 14px;
          margin-right: 2px;
          background-size: 14px 14px;
          background-repeat: no-repeat;
          &.decrease {
            @include bg-image('../header/decrease_2');
          }
          &.discount {
            @include bg-image('../header/discount_2');
          }
          &.guarantee {
            @include bg-image('../header/guarantee_2');
          }
          &.invoice {
            @include bg-image('../header/invoice_2');
          }
          &.special {
            @include bg-image('../header/special_2');
          }
        }
        .text {
          display: table-cell;
          width: 56px;
          vertical-align: middle;
          font-size: 14px;
        }
        &.current{
          position: relative;
          z-index: 10;
          margin-top: -1px;
          background-color: #fff;
          font-weight: 700;
          .text{
            @include border-none();
          }
        }
      }
    }
    .foods-wrapper {
      flex: 1;
      .title{
        padding-left: 14px;
        height: 26px;
        line-height: 26px;
        border-left: 2px solid #d9dde1;
        font-size: 12px;
        color: rgb(147,153,159);
        background-color: #f3f5f7;
      }
      .food-item{
        display: flex;
        margin: 18px;
        @include border-1px(rgba(7, 17, 27, .2));
        padding-bottom: 18px;
        &:last-child{
          @include border-none();
          margin-bottom: 0;
        }
        .icon{
          flex:0 0 57px;
          margin-right: 10px;
        }
        .content{
          flex: 1;
          position: relative;
          .name{
            margin: 2px 0 8px 0;
            height: 14px;
            line-height: 14px;
            font-size: 14px;
            color: rgb(7,17,27);
          }
          .desc,.extra{
            line-height: 10px;
            font-size: 12px;
            color: #939999;
          }
          .desc{
            margin-bottom: 8px;
          }
          .extra{
            &.count{
              margin-right: 10px;
            }
          }
          .price{
            font-weight: 700;
            line-height: 24px;
            .now{
              margin-right: 8px;
              font-size: 16px;
              color: rgb(240,20,20);
            }
            .old{
              text-decoration: line-through;
              font-size: 12px;
              color: rgb(147,153,150);
            }
          }
          .cart-wrapper{
            position: absolute;
            right: 0;
            bottom: 0;
          }
        }
      }
    }
  }
</style>
<script>
import BScroll from 'better-scroll';
import shopcart from '../shopcart/shopcart.vue';
import cart from '../cart/cart.vue';
import food from '../food/food.vue';

    export default{
        data(){
            return{
              goods: [],
              listHeight: [],
              scrollY: 0,
              selectedFood:{}
            };
        },
        components:{
          shopcart,cart,food
        },
        props:{
          seller:{
            type:Object
          }
        },
        created(){
          this.typeMap = ['decrease','discount','guarantee','invoice','special'];
          //this.$http.get('http://rapapi.org/mockjsdata/24232/api/goods').then((res) => {
          this.$http.get('http://127.0.0.1:8089/data.json').then((res) => {
            this.goods = res.body.goods;
            this.$nextTick(() => {
              this.initScroll();
              this.calculateHeight();
            });
          });
        },
        methods:{
          initScroll(){
            let menuWrapper = document.querySelector('.menu-wrapper');
            this.menuScroll = new BScroll(menuWrapper, {click: true});

            let foodsWrapper = document.querySelector('.foods-wrapper');
            //当 probeType 为 3 的时候，不仅在屏幕滑动的过程中，而且在 momentum 滚动动画运行过程中实时派发 scroll 事件
            this.foodsScroll = new BScroll(foodsWrapper, {click: true,probeType: 3});
            this.foodsScroll.on('scroll',(pos) => {
              this.scrollY = Math.abs(Math.round(pos.y));
            });
          },
          calculateHeight(){
            let foodList = document.querySelector('.foods-wrapper').getElementsByClassName('food-list-hook');
            let height = 0;
            this.listHeight.push(height);
            for(let i =0;i<foodList.length;i++){
              height += foodList[i].clientHeight;
              this.listHeight.push(height);
            }
          },
          selectMenu(index, event){
            if(!event._constructed){
              return;
            }
            let foodList = document.querySelector('.foods-wrapper').getElementsByClassName('food-list-hook');
            let e = foodList[index];
            this.foodsScroll.scrollToElement(e, 300);
          },
          selectFood(food,event){
            if(!event._constructed){
              return;
            }
            this.selectedFood = food;
            //获取子组件的对象方法
            this.$refs.foodComp.show();
          }
        },
        computed: {
          currentIndex(){
            for(let i=0;i<this.listHeight.length;i++){
              let height1 = this.listHeight[i];
              let height2 = this.listHeight[i+1];
              if(!height2 || (this.scrollY >= height1 && this.scrollY < height2)){
                  return i;
              }
            }
            return 0;
          },
          selectFoods(){
            let foods = [];
            this.goods.forEach((good) => {
              good.foods.forEach((food) => {
                if(food.count > 0) {
                  foods.push(food);
                }
              });
            });
            return foods;
          }
        }
    }
</script>
