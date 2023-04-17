
<template>
  <div>
    <el-table
      ref="elTable"
      v-bind="$attrs"
      v-on="$listeners"
      :data="data"
      border
      :span-method="this.merge ? this.mergeMethod : this.spanMethod"
    >
      <common-column
        v-bind="$attrs"
        v-for="(item, index) in column"
        :key="index"
        :column="item"
      >
      </common-column>
    </el-table>
    <pagination
      v-show="total > 0"
      :total="total"
      v-bind="$attrs"
      v-on="$listeners"
    />
  </div>
</template>

<script>
import CommonColumn from "./common-column";
import Pagination from "@/components/Pagination";

export default {
  props: {
    column: Array,
    data: Array,
    spanMethod: Function,
    pagination: {
      type: Boolean,
      default: false,
    },
    total: {
      type: Number,
      default: 0,
    },
    paginationTop: {
      type: String,
      default: "15px",
    },
    paginationAlign: {
      type: String,
      default: "left",
    },
    merge: Array,
  },
  components: {
    CommonColumn,
    Pagination,
  },
  data() {
    return {
      mergeLine: {},
      mergeIndex: {},
    };
  },
  created() {
    this.getMergeArr(this.data, this.merge);
  },
  computed: {
    dataLength() {
      return this.data.length;
    },
  },
  methods: {
    clearSelection() {
      this.$refs.elTable.clearSelection();
    },
    toggleRowSelection(row, selected) {
      this.$refs.elTable.toggleRowSelection(row, selected);
    },
    toggleAllSelection() {
      this.$refs.elTable.toggleAllSelection();
    },
    toggleRowExpansion(row, expanded) {
      this.$refs.elTable.toggleRowExpansion(row, expanded);
    },
    setCurrentRow(row) {
      this.$refs.elTable.setCurrentRow(row);
    },
    clearSort() {
      this.$refs.elTable.clearSort();
    },
    clearFilter(columnKey) {
      this.$refs.elTable.clearFilter(columnKey);
    },
    doLayout() {
      this.$refs.elTable.doLayout();
    },
    sort(prop, order) {
      this.$refs.elTable.sort(prop, order);
    },
    getMergeArr(tableData, merge) {
      if (!merge) return;
      this.mergeLine = {};
      this.mergeIndex = {};
      merge.forEach((item) => {
        tableData.forEach((data, i) => {
          if (i === 0) {
            this.mergeIndex[item] = this.mergeIndex[item] || [];
            this.mergeIndex[item].push(1);
            this.mergeLine[item] = 0;
          } else {
            if (data[item] === tableData[i - 1][item]) {
              this.mergeIndex[item][this.mergeLine[item]] += 1;
              this.mergeIndex[item].push(0);
            } else {
              this.mergeIndex[item].push(1);
              this.mergeLine[item] = i;
            }
          }
        });
      });
    },
    mergeMethod({ column, rowIndex }) {
      const index = this.merge.indexOf(column.property);
      if (index > -1) {
        const _row = this.mergeIndex[this.merge[index]][rowIndex];
        const _col = _row > 0 ? 1 : 0;
        return {
          rowspan: _row,
          colspan: _col,
        };
      }
    },
  },
  watch: {
    merge() {
      this.getMergeArr(this.data, this.merge);
    },
    dataLength() {
      this.getMergeArr(this.data, this.merge);
    },
  },
};
</script>
