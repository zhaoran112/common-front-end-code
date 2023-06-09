
<template>
  <el-table-column
    v-bind="$attrs"
    v-on="$listeners"
    :prop="column.prop"
    :label="column.label"
    :type="column.type"
    :index="column.index"
    :column-key="column.columnKey"
    :width="column.width"
    :min-width="column.minWidth"
    :fixed="column.fixed"
    :render-header="column.renderHeader"
    :sortable="column.sortable || false"
    :sort-method="column.sortMethod"
    :sort-by="column.sortBy"
    :sort-orders="column.sortOrders"
    :resizable="column.resizable || true"
    :formatter="column.formatter"
    :show-overflow-tooltip="column.showOverflowTooltip || false"
    :align="column.align || align || 'left'"
    :header-align="
      column.headerAlign || headerAlign || column.align || align || 'left'
    "
    :class-name="column.className"
    :label-class-name="column.labelClassName"
    :selectable="column.selectable"
    :reserve-selection="column.reserveSelection || false"
    :filters="column.filters"
    :filter-placement="column.filterPlacement"
    :filter-multiple="column.filterMultiple"
    :filter-method="column.filterMethod"
    :filtered-value="column.filteredValue"
  >
    <template slot="header" slot-scope="scope">
      <common-render
        v-if="column.renderHeader"
        :scope="scope"
        :render="column.renderHeader"
      >
      </common-render>
      <span v-else>{{ scope.column.label }}</span>
    </template>

    <template slot-scope="scope">
      <common-render :scope="scope" :render="column.render"> </common-render>
    </template>

    <template v-if="column.children">
      <common-column
        v-for="(col, index) in column.children"
        :key="index"
        :column="col"
      >
      </common-column>
    </template>
  </el-table-column>
</template>

<script>
import CommonRender from "./common-render";
import forced from "./forced.js";
import _ from "lodash";

export default {
  name: "CommonColumn",
  props: {
    column: Object,
    headerAlign: String,
    align: String,
  },
  components: {
    CommonRender,
  },
  methods: {
    setColumn() {
      if (this.column.type) {
        this.column.renderHeader = forced[this.column.type].renderHeader;
        this.column.render =
          this.column.render || forced[this.column.type].renderCell;
      }
      if (this.column.formatter) {
        this.column.render = (h, scope) => {
          return (
            <span>
              {scope.column.formatter(
                scope.row,
                scope.column,
                scope.row,
                scope.$index
              )}
            </span>
          );
        };
      }
      if (!this.column.render) {
        this.column.render = (h, scope) => {
          return <span>{_.get(scope.row, scope.column.property)}</span>;
        };
      }
    },
  },
  watch: {
    column: {
      handler() {
        this.setColumn();
      },
      immediate: true,
    },
  },
};
</script>
