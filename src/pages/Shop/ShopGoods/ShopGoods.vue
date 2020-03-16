<template>
  <div>
    <div class="goods">
      <div class="menu-wrapper" ref="menuWrapper">
        <ul>
          <li
            ref="li"
            class="menu-item"
            :class="{current: index === currentIndex}"
            v-for="(good, index) in goods"
            :key="index"
            @click="clickMenu(index)"
          >
            <span class="text bottom-border-1px">
              <img class="icon" v-if="good.icon" :src="good.icon" />
              {{good.name}}
            </span>
          </li>
        </ul>
      </div>
      <div class="foods-wrapper" ref="foodsWrapper">
        <ul ref="foodUl">
          <li class="food-list-hook" v-for="(good, index) in goods" :key="index">
            <h1 class="title">{{good.name}}</h1>
            <ul>
              <li
                class="food-item bottom-border-1px"
                v-for="(food, index) in good.foods"
                :key="index"
                @click="showFood(food)"
              >
                <div class="icon">
                  <img width="57" height="57" :src="food.icon" />
                </div>
                <div class="content">
                  <h2 class="name">{{food.name}}</h2>
                  <p class="desc">{{food.description}}</p>
                  <div class="extra">
                    <span class="count">月售 {{food.sellCount}} 份</span>
                    <span>好评率 {{food.rating}}%</span>
                  </div>
                  <div class="price">
                    <span class="now">￥{{food.price}}</span>
                    <span class="old" v-if="food.oldPrice">￥{{food.oldPrice}}</span>
                  </div>
                  <CartControl :food="food" />
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
    <ShopCart/>
    <Food :food="food" ref="foodInfo" />
  </div>
</template>

<script>
import BScroll from "better-scroll";
import { mapState } from "vuex";
import Food from "../../../components/Food/Food";
import CartControl from "../../../components/CartControl/CartControl";
import ShopCart from "../../../components/ShopCart/ShopCart";
export default {
  components: {
    CartControl,
    Food,
    ShopCart
  },
  data() {
    return {
      scrollY: 0,
      tops: [],
      food: {}
    };
  },
  mounted() {
    this.$store.dispatch("getGoods", () => {
      this.$nextTick(() => {
        this._initScroll();
        this._initTop();
      });
    });
  },
  computed: {
    ...mapState(["goods"]),
    currentIndex() {
      const { scrollY, tops } = this;
      const index = tops.findIndex((top, index) => {
        return scrollY >= top && scrollY < tops[index + 1];
      });
      return index;
    }
  },
  methods: {
    showFood(food) {
      this.food = food;
      this.$refs.foodInfo.toggleShow();
    },
    clickMenu(index) {
      const scrollY = this.tops[index];
      this.scrollY = scrollY;
      this.foodScroll.scrollTo(0, -scrollY, 300);
    },
    addClass() {
      this.$refs.li.className += " current";
    },
    _initScroll() {
      new BScroll(".menu-wrapper", {
        click: true
      });
      this.foodScroll = new BScroll(".foods-wrapper", {
        probeType: 2,
        click: true
      });
      this.foodScroll.on("scroll", ({ x, y }) => {
        this.scrollY = Math.abs(y);
      });
      this.foodScroll.on("scrollEnd", ({ x, y }) => {
        this.scrollY = Math.abs(y);
      });
    },
    _initTop() {
      const tops = [];
      let top = 0;
      tops.push(top);
      const lis = this.$refs.foodUl.children;
      [].slice.call(lis).forEach(li => {
        top += li.clientHeight;
        tops.push(top);
      });
      this.tops = tops;
    }
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import '../../../common/stylus/mixins.styl';

.goods {
  display: flex;
  position: absolute;
  top: 195px;
  bottom: 46px;
  width: 100%;
  background: #fff;
  overflow: hidden;

  .menu-wrapper {
    flex: 0 0 80px;
    width: 80px;
    background: #f3f5f7;

    .menu-item {
      display: table;
      height: 54px;
      width: 56px;
      padding: 0 12px;
      line-height: 14px;

      &.current {
        position: relative;
        z-index: 10;
        margin-top: -1px;
        background: #fff;
        color: $green;
        font-weight: 700;

        .text {
          border-none();
        }
      }

      .icon {
        display: inline-block;
        vertical-align: top;
        width: 12px;
        height: 12px;
        margin-right: 2px;
        background-size: 12px 12px;
        background-repeat: no-repeat;
      }

      .text {
        display: table-cell;
        width: 56px;
        vertical-align: middle;
        bottom-border-1px(rgba(7, 17, 27, 0.1));
        font-size: 12px;
      }
    }
  }

  .foods-wrapper {
    flex: 1;

    .title {
      padding-left: 14px;
      height: 26px;
      line-height: 26px;
      border-left: 2px solid #d9dde1;
      font-size: 12px;
      color: rgb(147, 153, 159);
      background: #f3f5f7;
    }

    .food-item {
      display: flex;
      margin: 18px;
      padding-bottom: 18px;
      bottom-border-1px(rgba(7, 17, 27, 0.1));

      &:last-child {
        border-none();
        margin-bottom: 0;
      }

      .icon {
        flex: 0 0 57px;
        margin-right: 10px;
      }

      .content {
        flex: 1;

        .name {
          margin: 2px 0 8px 0;
          height: 14px;
          line-height: 14px;
          font-size: 14px;
          color: rgb(7, 17, 27);
        }

        .desc, .extra {
          line-height: 10px;
          font-size: 10px;
          color: rgb(147, 153, 159);
        }

        .desc {
          line-height: 12px;
          margin-bottom: 8px;
        }

        .extra {
          .count {
            margin-right: 12px;
          }
        }

        .price {
          font-weight: 700;
          line-height: 24px;

          .now {
            margin-right: 8px;
            font-size: 14px;
            color: rgb(240, 20, 20);
          }

          .old {
            text-decoration: line-through;
            font-size: 10px;
            color: rgb(147, 153, 159);
          }
        }

        .cartcontrol-wrapper {
          position: absolute;
          right: 0;
          bottom: 12px;
        }
      }
    }
  }
}
</style>
