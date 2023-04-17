<template>
  <el-dialog
    :title="title"
    v-bind="$attrs"
    v-on="$listeners"
    :visible.sync="dialogVisible"
    :width="width"
    top="1vh"
    :fullscreen="fullscreen"
    :append-to-body="true"
    :close-on-click-modal="false"
  >
    <div slot="title" ref="header">
      <div>
        <span>{{ title }}</span>
        <el-link
          :underline="false"
          class="full-screen-box"
          @click="fullscreen = !fullscreen"
        >
          <svg-icon v-show="!fullscreen" icon-class="fullscreen" />
          <svg-icon v-show="fullscreen" icon-class="exit-fullscreen" />
        </el-link>
      </div>
    </div>
    <el-scrollbar ref="scrollbar">
      <div :style="styleObj" ref="bodySize">
        <div ref="contentSize" class="overflow-auto">
          <slot> </slot>
          <div
            class="arrows-box"
            :style="{
              transform: `translateY(${isScroll && showScrollTip ? 0 : 20}px)`,
            }"
          >
            <svg-icon class-name="arrows" icon-class="arrows" />
          </div>
        </div>
      </div>
    </el-scrollbar>
    <span slot="footer" ref="footer">
      <slot name="footer">
        <el-button
          type="danger"
          v-if="isShowCancelBtn"
          @click="dialogVisible = false"
          >取 消</el-button
        >
        <el-button
          type="primary"
          v-if="isShowSaveBtn"
          :loading="loading"
          :disabled="disabled"
          @click="handelSave"
          >{{ saveText }}</el-button
        >
      </slot>
    </span>
  </el-dialog>
</template>

<script>
import { throttle } from "throttle-debounce";
import {
  addResizeListener,
  removeResizeListener,
} from "element-ui/src/utils/resize-event";

export default {
  props: {
    title: {
      type: String,
      default() {
        return "提示";
      },
    },
    saveText: {
      type: String,
      default() {
        return "提 交";
      },
    },
    width: {
      type: String,
      default() {
        return "98px";
      },
    },
    show: {
      type: Boolean,
      default() {
        return false;
      },
    },
    loading: {
      type: Boolean,
      default() {
        return false;
      },
    },
    disabled: {
      type: Boolean,
      default() {
        return false;
      },
    },
    isShowSaveBtn: {
      type: Boolean,
      default() {
        return true;
      },
    },
    isShowCancelBtn: {
      type: Boolean,
      default() {
        return true;
      },
    },
  },
  computed: {
    dialogVisible: {
      get() {
        return this.show;
      },
      set(val) {
        this.$emit("update:show", val);
      },
    },
  },
  data() {
    return {
      fullscreen: false,
      styleObj: {},
      isScroll: this.update(),
      showScrollTip: true,
    };
  },
  watch: {
    fullscreen: {
      handler(flag) {
        this.$nextTick(() => {
          this.getStyleObj(flag);
        });
      },
      immediate: true,
    },
    dialogVisible: {
      handler(flag) {
        if (flag) {
          this.$nextTick(() => {
            this.getStyleObj(this.fullscreen);
            this.initListenerScroll();
          });
        } else {
          this.removeListenerScroll();
        }
      },
      immediate: true,
    },
  },
  methods: {
    initListenerScroll() {
      this.scrollbar__wrap =
        this.$refs.scrollbar &&
        this.$refs.scrollbar.$el.querySelector(".el-scrollbar__wrap");
      const { scrollbar__wrap } = this;
      this.$refs.bodySize &&
        addResizeListener(this.$refs.bodySize, this.update);
      this.throttledScrollHandler = throttle(300, this.onScroll);
      scrollbar__wrap &&
        scrollbar__wrap.addEventListener("scroll", this.throttledScrollHandler);
    },
    removeListenerScroll() {
      const { scrollbar__wrap } = this;
      scrollbar__wrap &&
        scrollbar__wrap.removeEventListener(
          "scroll",
          this.throttledScrollHandler
        );
      removeResizeListener(this.$refs.bodySize, this.update);
    },
    getStyleObj(fullscreen) {
      const headerHeight = this.getOffsetHeight("header");
      const footerHeight = this.getOffsetHeight("footer");
      if (headerHeight && footerHeight) {
        this.$set(this, "styleObj", {
          minHeight: "80px",
          [fullscreen ? "height" : "maxHeight"]: fullscreen
            ? `calc(100vh - ${headerHeight}px - ${footerHeight}px)`
            : `calc(100vh - ${headerHeight}px - ${footerHeight}px - 1vh - 1vh)`,
        });
      }
    },
    update() {
      const contentSize = this.$refs.contentSize;
      const bodySize = this.$refs.bodySize;
      this.isScroll =
        (contentSize && contentSize.offsetHeight) >
        (bodySize && bodySize.offsetHeight);
      this.onScroll();
    },
    onScroll() {
      if (this.isScroll) {
        const { scrollbar__wrap } = this;
        if (
          scrollbar__wrap.scrollHeight -
            scrollbar__wrap.scrollTop -
            scrollbar__wrap.offsetHeight <=
          20
        ) {
          this.showScrollTip = false;
        } else {
          this.showScrollTip = true;
        }
      }
    },
    handelSave: throttle(300, true, function () {
      this.$emit("save");
    }),
    getOffsetHeight(ref) {
      const dom = this.$refs[ref];
      const parentDom = dom && dom.parentNode;
      if (parentDom) {
        return parentDom.offsetHeight;
      }
    },
  },
  beforeDestroy() {
    this.removeListenerScroll();
  },
};
</script>

<style lang="scss" scoped>
::v-deep .el-dialog__body {
  padding: 0 0;
}
::v-deep .el-dialog__footer {
  border-top: 1px solid #eee;
  padding: 10px 20px 10px;
}
::v-deep .el-dialog__header {
  border-bottom: 1px solid #eee;
  padding: 12px 20px 12px;
  .el-dialog__headerbtn {
    top: 12px;
  }
}
.full-screen-box {
  float: right;
  margin-right: 30px;
  color: #909399;
}
.arrows-box {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  bottom: 0;
  left: 0;
  background-image: linear-gradient(
    to bottom,
    rgba(255, 255, 255, 0.6),
    rgba(255, 255, 255, 1)
  );
  z-index: 9;
  width: 100%;
  transition: transform 0.3s;
  .arrows {
    font-size: 20px;
  }
}
.overflow-auto {
  overflow: auto;
}
</style>