<template>
  <div class="ratingselect">
    <div class="rating-type border-1px">
      <span @click="select(2,$event)" class="block all" :class="{'active':selectType===2}">{{desc.all}}<span class="count">{{ratings.length}}</span></span>
      <span @click="select(0,$event)" class="block positive" :class="{'active':selectType===0}">{{desc.positive}}<span class="count">{{positiveCount.length}}</span></span>
      <span @click="select(1,$event)" class="block negative" :class="{'active':selectType===1}">{{desc.negative}}<span class="count">{{negativeCount.length}}</span></span>
    </div>
    <div @click="toggle" class="switch">
      <span class="icon-check_circle" :class="{'on':onlyContent}"></span>
      <span class="text">只看有内容的评价</span>
    </div>
  </div>
</template>
<style lang="scss" scoped>
  @import "../../common/sass/mixin";
  .ratingselect{
    .rating-type{
      padding:18px 0;
      margin: 0 18px;
      @include border-1px(rgba(7,17,27,.1));
      .block{
        display: inline-block;
        padding: 8px 12px;
        margin-right: 8px;
        border-radius: 2px;
        color: rgb(77,85,93);
        font-size: 12px;
        &.active{
          color: #fff;
        }
        &.positive{
          background-color: rgba(0,160,220,.2);
          &.active{
            background-color: rgba(0,160,220,1);
          }
        }
        &.negative{
          background-color: rgba(77,85,93,.2);
          &.active{
            background-color: rgba(77,85,93,1);
          }
        }
        &.all{
          background-color: rgba(0,160,220,.2);
          &.active{
            background-color: #00a0dc;
          }
        }
        .count{
          font-size: 8px;
          margin-left: 2px;
          line-height: 16px;
        }
      }
    }
    .switch{
      padding: 12px 18px;
      line-height: 24px;
      border-bottom: 1px solid rgba(7,17,27,.1);
      color: rgb(147,153,159);
      font-size: 0;
      .icon-check_circle{
        display: inline-block;
        vertical-align: top;
        margin-right: 4px;
        font-size: 24px;
        &.on{
          color: #00c850;
        }
      }
      .text{
        font-size: 12px;
      }
    }
  }
</style>
<script>
  const POSITIVE = 0;
  const NEGATIVE = 1;
  const ALL = 2;
    export default{
        data(){
            return{
              onlyContent:this.onlycontent,
              selectType:this.selecttype
            }
        },
        components:{

        },
        methods:{
          toggle(event){
            if(!event._constructed) return;
            this.onlyContent = !this.onlyContent;
            //向父组件传值
            this.$emit('toggle',this.onlyContent);
          },
          select(type,event){
             if(!event._constructed) return;
             this.selectType = type;
             //向父组件传值
             this.$emit('select',type);
          }
        },
        computed:{
          positiveCount(){
             return this.ratings.filter((rating) => {
                return rating.rateType === POSITIVE;
             });
          },
          negativeCount(){
              return this.ratings.filter((rating) => {
                return rating.rateType === NEGATIVE;
             });
          }
        },
        props:{
          ratings:{
            type:Array,
            default(){
              return []
            }
          },
          selecttype:{
            type:Number,
            default:ALL
          },
          onlycontent:{
            type:Boolean,
            default:false
          },
          desc:{
            type:Object,
            default(){
              return {
                all:'全部',
                positive:'满意',
                negative:'不满意'
              }
            }
          }
        }

    }

</script>
