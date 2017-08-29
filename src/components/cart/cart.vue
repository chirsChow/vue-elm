<template>
  <div class="cart">
    <div class="cart-decrease" v-show="food.count>0" @click.stop.prevent="decrease" transition="move">
      <span class="inner icon-remove_circle_outline"></span>
    </div>
    <div class="cart-count" v-show="food.count>0">{{food.count}}</div>
    <div class="cart-add icon-add_circle" @click.stop.prevent="add"></div>
  </div>
</template>
<style lang="scss" scoped>
  .cart {
    font-size: 0;
    .cart-decrease{
      display: inline-block;
      padding: 6px;
      .inner{
        display: inline-block;
        font-size: 24px;
        line-height: 24px;
        color: #00A0DC;
        transition: all 1s linear;
        transform: rotate(0);
      }
      transition: all 1s linear;
      //最终样式，动画结束时执行
      &.move-transition{
        opacity: 1;
        transform: translate3d(0,0,0);
      }
      //动画开始执行
      &.move-enter, &.move-leave{
        opacity: 0;
        transform: translate3d(24px,0,0);
        .inner{
          transform: rotate(180deg);
        }
      }
    }
    .cart-count{
      display: inline-block;
      font-size: 12px;
      color: rgb(147, 153, 159);
      vertical-align: top;
      width: 12px;
      padding-top: 6px;
      line-height: 24px;
      text-align: center;
    }
    .cart-add{
      display: inline-block;
      padding: 6px;
      font-size: 24px;
      line-height: 24px;
      color: #00A0DC;
    }
  }
</style>
<script>
import Vue from 'vue';
    export default{
        props:{
          food:{
            type:Object
          }
        },
        data(){
            return{

            }
        },
        components:{

        },
        created(){

        },
        methods:{
          add(event){
            if(!event._constructed){
              return;
            }
            if(!this.food.count){
              Vue.set(this.food, 'count', 1);
            }else{
              this.food.count ++;
            }
          },
          decrease(event){
            if(!event._constructed){
              return;
            }
            if(this.food.count){
              this.food.count --;
            }
          }
        }
    }

</script>
