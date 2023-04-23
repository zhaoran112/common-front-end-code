<template>
  <div>
    <el-form :inline="true" size="small" @submit.native.prevent>
      <el-form-item
        v-for="item in filterData"
        :key="item.key"
        :label="item.name"
      >
        <filter-render
          v-if="item.render"
          :scope="listQuery"
          :render="item.render"
        ></filter-render>
        <el-input
          v-if="item.tag == 'input'"
          v-model.trim="listQuery[item.key]"
          v-bind="
            Object.assign(
              {},
              { placeholder: item.name, clearable: true },
              item.inputProps
            )
          "
        ></el-input>
        <common-select
          v-if="item.tag == 'select'"
          v-model="listQuery[item.key]"
          v-bind="item.selectProps"
        ></common-select>
        <el-date-picker
          v-if="item.tag == 'date'"
          v-model="listQuery[item.key]"
          v-bind="item.dateProps"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item class="last-item-box">
        <div :class="[$slots.default ? `btn-box ${justifyContent}` : '']">
          <el-button
            type="primary"
            native-type="submit"
            @click.native.prevent="handleSearch()"
          >
            搜索
          </el-button>
          <slot> </slot>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import filterRender from "./filter-render.vue";
import commonSelect from "@/components/commonSelect";
export default {
  components: { filterRender, commonSelect },
  props: {
    filterData: {
      type: Array,
    },
    justifyContent: {
      type: String,
      default() {
        return "flex-end";
      },
    },
  },
  data() {
    return {
      listQuery: {},
    };
  },
  computed: {},
  watch: {
    filterData: {
      handler() {
        this.listQuery = this.filterData.reduce((acc, cur) => {
          acc[cur.key] = cur.value;
          return acc;
        }, {});
      },
      deep: true,
      immediate: true,
    },
  },
  methods: {
    getFilterData() {
      const data = JSON.parse(JSON.stringify(this.listQuery));
      Object.keys(data).forEach(function (key) {
        if (data[key] === "" || data[key] === null || data[key] === undefined) {
          delete data[key];
        }
      });
      return data;
    },
    handleSearch() {
      const data = this.getFilterData();
      this.$emit("filterMsg", data);
    },
  },
};
</script>

<style  scoped lang='scss'>
.text-ellipsis {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.el-form.el-form--inline {
  display: flex;
  flex-wrap: wrap;
  .last-item-box {
    flex: 1;
    ::v-deep .el-form-item__content {
      width: 100%;
      .btn-box {
        display: flex;
      }
      .flex-end {
        justify-content: flex-end;
      }
      .space-between {
        justify-content: space-between;
      }
    }
  }
}
</style>

