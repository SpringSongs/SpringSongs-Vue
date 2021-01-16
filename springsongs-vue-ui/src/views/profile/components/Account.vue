<template>
  <el-form ref="userForm" :model="user" label-width="80px" :rules="userRules">
    <el-form-item label="头像">
      <el-upload
        class="avatar-uploader"
        action="http://localhost:8091/SpringAttachment/UploadAndReturnId"
        :with-credentials="true"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload"
      >
        <img v-if="user.imageUrl" :src="user.imageUrl" class="avatar">
        <i v-else class="el-icon-plus avatar-uploader-icon" />
      </el-upload>
    </el-form-item>
    <el-form-item label="用户名" prop="userName">
      <el-input v-model.trim="user.userName" auto-complete="off" readonly="readonly" />
    </el-form-item>
    <el-form-item label="真实姓名" prop="trueName">
      <el-input v-model.trim="user.trueName" auto-complete="off" />
    </el-form-item>
    <el-form-item label="邮箱" prop="email">
      <el-input v-model.trim="user.email" auto-complete="off" />
    </el-form-item>
    <el-form-item label="手机" prop="mobile">
      <el-input v-model.trim="user.mobile" auto-complete="off" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submit('userForm')">保存</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import {
  updateUserInfo
} from '@/api/springsongs/sys/SpringUser/SpringUser'
export default {
  props: {
    user: {
      type: Object,
      default: () => {
        return {
          portrait: '',
          userName: '',
          trueName: '',
          email: '',
          mobile: ''
        }
      }
    }
  },
  data() {
    return {
      userRules: {
        userName: [{
          required: true,
          message: '请输入用户名',
          trigger: 'blur'
        }],
        trueName: [{
          required: true,
          message: '请输入真实姓名',
          trigger: 'blur'
        }],
        email: [{
          required: true,
          message: '请输入邮箱',
          trigger: 'blur'
        }],
        mobile: [{
          required: true,
          message: '请输入手机',
          trigger: 'blur'
        }]
      }
    }
  },
  methods: {
    submit(formName) {
      const self = this
      self.$refs[formName]
        .validate(valid => {
          if (valid) {
            updateUserInfo(self.user).then((res) => {
              self.$message.success(res.msg)
            })
          } else {
            this.$message.error('请填写必填项')
          }
        })
    },
    handleAvatarSuccess(res, file) {
      this.user.imageUrl = URL.createObjectURL(file.raw)
      this.user.portrait = res.data
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg'
      const isPNG = file.type === 'image/png'
      const isGIF = file.type === 'image/gif'
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isJPG && !isPNG && !isGIF) {
        this.$message.error('上传头像图片只能是 JPG|PNG|GIF 格式!')
        return
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
        return
      }
      return isLt2M
    }
  }
}
</script>

<style>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 50px;
    height: 50px;
    line-height: 50px;
    text-align: center;
  }
  .avatar {
    width: 50px;
    height: 50px;
    display: block;
  }
</style>
