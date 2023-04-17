<template>
  <el-select
    v-model="selectEd"
    v-bind="$attrs"
    v-on="$listeners"
    :placeholder="placeholder"
    :clearable="clearable"
    :multiple="multiple"
    style="width: 100%"
    :collapse-tags="multiple && selectEd && selectEd.length > 3"
    :filterable="filterable"
    ref="select"
  >
    <slot :options="normalizeOptions">
      <el-option
        v-for="option in normalizeOptions"
        :key="option.value"
        :label="option.label"
        :value="option.value"
        :disabled="option.disabled"
      >
        <slot :option="option"></slot>
      </el-option>
    </slot>
    <slot name="pagination"></slot>
  </el-select>
</template>

<script>
export default {
  model: {
    prop: "checked",
    event: "send",
  },
  props: {
    placeholder: {
      type: String,
      default: "请选择",
    },
    optionsProps: {
      type: Object,
      default() {
        return {
          value: "value",
          label: "label",
        };
      },
    },
    multiple: {
      type: Boolean,
      default: () => {
        return false;
      },
    },
    clearable: {
      type: Boolean,
      default: true,
    },
    filterable: {
      type: Boolean,
      default: true,
    },
    checked: {
      type: [Object, Array, String, Number, Boolean],
    },
    options: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {};
  },
  computed: {
    selectEd: {
      get: function () {
        return this.checked;
      },
      set: function (newValue) {
        this.$emit("send", newValue);
      },
    },
    normalizeOptions: {
      get() {
        return this.options.map((item) => {
          if (Array.isArray(item)) {
            return {
              value: item[0],
              label: item[1],
            };
          }
          return Object.assign(
            {},
            {
              label: item[this.optionsProps.label],
              value: item[this.optionsProps.value],
            },
            item
          );
        });
      },
    },
  },
};
</script>