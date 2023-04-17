<template>
  <div>
    <el-upload
      class="avatar-uploader"
      action="#"
      :show-file-list="false"
      :http-request="uploadSectionFile"
      accept=".jpg, .jpeg, .png, .gif, .JPG, .JPEG, .PBG, .GIF"
    >
      <div class="poster" v-if="give" v-loading="loading">
        <el-image
          style="width: 60px; height: 60px"
          :src="give"
          fit="contain"
        ></el-image>
        <span
          @click.stop="handlePreview"
          class="MaterialModalButton_preview__16ilD"
          >预览</span
        >
        <span class="DeleteIcon_delete__1gtI_">
          <i class="el-icon-close" @click.stop.prevent="handleRemove"></i>
        </span>
      </div>
      <i
        v-else
        class="el-icon-plus avatar-uploader-icon"
        v-loading="loading"
      ></i>
    </el-upload>
    <el-image-viewer
      class="image-viewer"
      v-if="fileimage"
      :on-close="onClose"
      :url-list="[give]"
    />
  </div>
</template>

<script>
import ElImageViewer from "element-ui/packages/image/src/image-viewer";
import { Global } from "@/utils/myPublic";
import { getFileMD5 } from "./js/getFileMD5";
import OSS from "ali-oss";

export default {
  name: "uploadImage",
  components: { ElImageViewer },

  model: {
    prop: "give",
    event: "returnBack",
  },
  props: {
    give: {
      type: String,
      default: () => {
        return "";
      },
    },
  },
  data() {
    return {
      fileimage: false,
      folder: `images/${new Date().getFullYear()}/${
        new Date().getMonth() + 1
      }/${new Date().getDate()}`,
      loading: false,
    };
  },
  methods: {
    triggerCheck(val) {
      this.dispatch("ElFormItem", "el.form.change", [val]);
    },
    handleRemove() {
      this.$emit("returnBack", "");
      this.triggerCheck("");
    },
    onClose() {
      this.fileimage = false;
    },
    handlePreview() {
      this.fileimage = true;
    },
    getExtendName(fileName) {
      const index = fileName.lastIndexOf(".");
      if (index > -1) {
        return fileName.substring(index);
      }
      return "";
    },
    async uploadSectionFile(params) {
      const file = params.file;
      let fileName = (await getFileMD5(file)) + this.getExtendName(file.name);
      this.loading = true;
      const res = await this.$store.dispatch("user/injectorOssGetToken", {});
      this.loading = false;
      if (res && res.code === 0) {
        const Credentials = res.data && res.data.Credentials;
        const ossConfig = {
          region: Global.region,
          bucket: Global.bucket,
          accessKeyId: Credentials.AccessKeyId,
          accessKeySecret: Credentials.AccessKeySecret,
          stsToken: Credentials.SecurityToken,
        };
        const client = new OSS(ossConfig);
        const result = await client.put(`${this.folder}/${fileName}`, file);
        this.$emit("returnBack", decodeURI(result.url));
        this.triggerCheck(decodeURI(result.url));
      }
    },
    dispatch(componentName, eventName, params) {
      var parent = this.$parent || this.$root;
      var name = parent.$options.componentName;
      while (parent && (!name || name !== componentName)) {
        parent = parent.$parent;
        if (parent) {
          name = parent.$options.componentName;
        }
      }
      if (parent) {
        parent.$emit.apply(parent, [eventName].concat(params));
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.image-viewer {
  ::v-deep .el-icon-circle-close {
    color: #fff;
  }
}
::v-deep .avatar-uploader {
  display: flex;
  .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .el-upload:hover {
    border-color: #409eff;
  }
}

::v-deep .avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 60px;
  height: 60px;
  line-height: 60px;
  text-align: center;
}
.poster {
  position: relative;
  width: 60px;
  height: 60px;
  .DeleteIcon_delete__1gtI_ {
    position: absolute;
    right: 0;
    top: 0;
    line-height: 18px;
    height: 18px;
    background: #e6f9ff;
    z-index: 70;
    padding: 0 2px;
    color: #fff;
    background: rgba(0, 0, 0, 0.4);
    -moz-border-radius: 0 3px 0 12px;
    border-radius: 0 3px 0 12px;
  }
}

.poster:hover {
  .MaterialModalButton_preview__16ilD {
    opacity: 1;
  }
}
.MaterialModalButton_preview__16ilD {
  display: -webkit-inline-flex;
  display: -moz-inline-box;
  display: -ms-inline-flexbox;
  display: inline-flex;
  -webkit-justify-content: center;
  -moz-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  -webkit-align-items: center;
  -moz-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  position: absolute;
  bottom: 0;
  left: 50%;
  -webkit-transform: translate(-50%);
  -moz-transform: translate(-50%);
  -ms-transform: translate(-50%);
  transform: translate(-50%);
  z-index: 10;
  white-space: nowrap;
  -webkit-transition: all 0.3s;
  -o-transition: all 0.3s;
  -moz-transition: all 0.3s;
  transition: all 0.3s;
  font-size: 12px;
  color: #fff;
  background-color: rgba(0, 0, 0, 0.5);
  cursor: pointer;
  width: 100%;
  height: 20px;
  opacity: 0;
}
</style>