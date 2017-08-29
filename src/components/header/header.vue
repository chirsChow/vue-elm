<template>
  <div class="header">
    <div class="wrap-content">
      <div class="avatar">
        <img width="64" height="64" :src="seller.avatar"/>
      </div>
      <div class="content">
        <div class="title">
          <span class="brand"></span>
          <span class="name">{{seller.name}}</span>
        </div>
        <div class="desc">
          <span>{{seller.description}}</span>/<span>{{seller.deliveryTime}}分钟送达</span>
        </div>
        <div v-if="seller.supports" class="support">
          <span class="icon" :class="typeMap[seller.supports[0].type]"></span>
          <span class="text">{{seller.supports[0].description}}</span>
        </div>
      </div>
      <div v-if="seller.supports" class="support-count" @click="showDetail">
        <span class="count">{{seller.supports.length}}个</span>
        <i class="icon-keyboard_arrow_right"></i>
      </div>
    </div>
    <div class="bulletin-wrapper">
      <span class="bulletin-title"></span>
      <span class="bulletin-text">{{seller.bulletin}}</span>
      <i class="icon-keyboard_arrow_right"></i>
    </div>
    <div class="background">
      <img :src="seller.avatar" width="100%" height="100%" />
    </div>
    <transition name="fade">
    <div class="detail" v-show="showDetailFlag">
      <div class="detail-wrapper clearfix">
        <div class="detail-main">
          <h1 class="name">{{seller.name}}</h1>
          <div class="star-wrapper">
          <star :size="48" :score="seller.score"></star>
          </div>
          <div class="title">
            <div class="line"></div>
            <div class="text">特惠信息</div>
            <div class="line"></div>
          </div>
          <ul v-if="seller.supports" class="supports">
            <li class="support-item" v-for="item in seller.supports">
              <span class="icon" :class="typeMap[item.type]"></span>
              <span class="text">{{item.description}}</span>
            </li>
          </ul>
          <div class="title">
            <div class="line"></div>
            <div class="text">商家公告</div>
            <div class="line"></div>
          </div>
          <div class="bulletin">
            <p class="content">{{seller.bulletin}}</p>
          </div>
        </div>
      </div>
      <div class="detail-close" @click="showDetail">
        <i class="icon-close"></i>
      </div>
    </div>
    </transition>
  </div>
</template>
<style lang="scss" scoped>
  @import "../../common/sass/mixin";
.header{
  position: relative;
  color: #fff;
  background-color: rgba(7,17,27,.5);
  overflow: hidden;
  .wrap-content{
    position: relative;
    padding: 24px 12px 18px 24px;
    .avatar{
      display: inline-block;
      vertical-align: top;
      img{
        border-radius: 2px;
      }
    }
    .content{
      display: inline-block;
      margin-left: 16px;
      .title{
        .brand{
          display: inline-block;
          width: 30px;
          height: 18px;
          @include bg-image("brand");
          background-size: 30px 18px;
          background-repeat: no-repeat;
          vertical-align: top;
        }
        .name{
          margin-left: 6px;
          line-height: 18px;
          font-weight: bold;
        }
      }
      .desc{
        margin: 10px 0;
        line-height: 12px;
        font-size: 12px;
      }
      .support{
        .icon{
          display: inline-block;
          vertical-align: top;
          width: 16px;
          height: 16px;
          margin-right: 4px;
          background-size: 16px 16px;
          background-repeat: no-repeat;
          &.decrease{
            @include bg-image('decrease_2');
          }
          &.discount{
            @include bg-image('discount_2');
          }
          &.guarantee{
            @include bg-image('guarantee_2');
          }
          &.invoice{
            @include bg-image('invoice_2');
          }
          &.special{
            @include bg-image('special_2');
          }
        }
        .text{
          font-size: 12px;
        }
      }
    }
    .support-count{
      position: absolute;
      right:12px;
      bottom: 18px;
      background-color: rgba(0,0,0,.2);
      height: 24px;
      line-height: 24px;
      border-radius: 14px;
      text-align: center;
      padding: 0 8px;
      color: #fff;
      .count{
        font-size: 12px;
      }
      i{
        line-height: 24px;
      }
    }
  }
  .bulletin-wrapper{
    height: 28px;
    line-height: 28px;
    padding: 0 22px 0 12px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    position: relative;
    background-color: rgba(7,17,27,.2);
    .bulletin-title{
      display: inline-block;
      height: 12px;
      width: 22px;
      @include bg-image("bulletin");
      background-size: 22px 12px;
      background-repeat: no-repeat;
      vertical-align: top;
      margin-top: 8px;
    }
    .bulletin-text{
      vertical-align: top;
      font-size: 12px;
      margin-left: 4px;
    }
    i{
      position: absolute;
      right: 12px;
      top:8px;
      font-size: 14px;
    }
  }
  .background{
    position: absolute;
    top:0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    filter: blur(10px);
  }
  .detail{
    position: fixed;
    top:0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 100;
    overflow: auto;
    text-align: center;
    background-color: rgba(7,17,27,.8);
    //背影变模糊
    -webkit-backdrop-filter: blur(10px);
    .detail-wrapper{
      width: 100%;
      min-height: 100%;
      .detail-main{
        margin-top: 64px;
        padding-bottom: 64px;
        .star-wrapper{
          margin-top: 18px;
          padding: 2px 0;
          text-align: center;
        }
        .title{
          display: flex;
          width: 80%;
          margin: 28px auto 24px auto;
          .line{
            flex: 1;
            position: relative;
            top:-6px;
            border-bottom: 1px solid rgba(255,255,255,.2);
          }
          .text{
            padding: 0 12px;
            font-size: 14px;
            font-weight: 700;
          }
        }
        .supports{
          width: 80%;
          margin: 0 auto;
          text-align: left;
          .support-item{
            padding: 0 12px;
            margin-bottom: 12px;
            font-size: 0;
            &:last-child{
              margin-bottom: 0;
            }
            .icon{
              display: inline-block;
              width: 16px;
              height: 16px;
              vertical-align: top;
              margin-right: 6px;
              background-size: 16px 16px;
              background-repeat: no-repeat;
              &.decrease{
                @include bg-image('decrease_2');
              }
              &.discount{
                @include bg-image('discount_2');
              }
              &.guarantee{
                @include bg-image('guarantee_2');
              }
              &.invoice{
                @include bg-image('invoice_2');
              }
              &.special{
                @include bg-image('special_2');
              }
            }
            .text{
              font-size: 14px;
              line-height: 16px;
            }
          }
        }
        .bulletin{
          width: 80%;
          margin: 0 auto;
          text-align: left;
          .content{
            padding: 0 12px;
            line-height: 24px;
            font-size: 12px;
          }
        }
      }
    }
    .detail-close{
      position: relative;
      width: 32px;
      height: 32px;
      margin: -64px auto 0 auto;
      clear: both;
      font-size: 32px;
    }
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
}
</style>
<script>
import Star from '../star/star.vue';
export default{
    data() {
        return {
          showDetailFlag: false
        };
    },
    props: {
      seller:{
        type: Object
      }
    },
    methods:{
       showDetail(){
        this.showDetailFlag = !this.showDetailFlag;
       }
    },
    created(){
      this.typeMap = ['decrease','discount','guarantee','invoice','special'];
    },
    components:{
      Star
    }
}
</script>
