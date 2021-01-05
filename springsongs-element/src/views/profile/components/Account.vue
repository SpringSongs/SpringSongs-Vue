<template>
  <el-form ref="userForm" :model="user" label-width="80px" :rules="userRules">
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
    }
  }
}
</script>
