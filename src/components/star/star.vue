<template>
  <div class="star" :class="starType">
    <span v-for="itemClass in itemClasses" :class="itemClass" class="star-item" track-by="$index"></span>
  </div>
</template>
<style lang="scss" scoped>
  @import "../../common/sass/mixin";

  .star {
    font-size: 0;
    &.star-24 {
      .star-item {
        width: 10px;
        height: 10px;
        margin-right: 12px;
        background-size: 10px 10px;
        &.on {
          @include bg-image("star24_on");
        }
        &.half {
          @include bg-image("star24_half");
        }
        &.off {
          @include bg-image("star24_off");
        }
        &:last-child {
          margin-right: 0;
        }
      }
    }
    &.star-36 {
      .star-item {
        width: 15px;
        height: 15px;
        margin-right: 6px;
        background-size: 15px 15px;

        &.on {
          @include bg-image("star36_on");
        }
        &.half {
          @include bg-image("star36_half");
        }
        &.off {
          @include bg-image("star36_off");
        }
        &:last-child {
          margin-right: 0;
        }
      }
    }
    &.star-48 {
      .star-item {
        width: 22px;
        height: 22px;
        margin-right: 22px;
        background-size: 22px 22px;

        &.on {
          @include bg-image("star48_on");
        }
        &.half {
          @include bg-image("star48_half");
        }
        &.off {
          @include bg-image("star48_off");
        }
        &:last-child {
          margin-right: 0;
        }
      }
    }
    .star-item {
      display: inline-block;
      background-repeat: no-repeat;
    }

  }

</style>
<script>
const LENGTH = 5;
const CLS_ON = 'on';
const CLS_HALF = 'half';
const CLS_OFF = 'off';
    export default{
        data(){
            return{

            }
        },
        computed:{
          starType(){
            return 'star-' + this.size;
          },
          itemClasses(){
            let result = [];
            let score = Math.floor(this.score * 2) / 2;
            let hasHalf = score % 1 !== 0;
            let integer = Math.floor(score);
            for(let i = 0;i<integer;i++){
              result.push(CLS_ON);
            }
            if(hasHalf){
              result.push(CLS_HALF);
            }
            while(result.length < LENGTH){
              result.push(CLS_OFF);
            }
            return result;
          }
        },
        props:{
          size:{
            type:Number
          },
          score:{
            type:Number
          }
        }
    }


</script>
