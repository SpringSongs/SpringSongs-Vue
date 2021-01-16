<template>
  <el-form ref="pwdForm" :model="pwdForm" label-width="80px" :rules="pwdFormRules">
    <el-form-item label="密码" prop="pwd">
      <el-input v-model="pwdForm.pwd" auto-complete="off" />
    </el-form-item>
    <el-form-item label="确认密码" prop="configpwd">
      <el-input v-model="pwdForm.configpwd" auto-complete="off" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="handleUpdatePwd('pwdForm')">保存</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import {
  userUpdatePwd
} from '@/api/springsongs/sys/SpringUser/SpringUser'
export default {
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.pwdForm.configpwd === '') {
          this.$refs.pwdForm.validateField('configpwd')
        }
        callback()
      }
    }
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.pwdForm.pwd) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      pwdForm: {},
      pwdFormRules: {
        pwd: [{
          validator: validatePass,
          trigger: 'blur'
        }],
        configpwd: [{
          validator: validatePass2,
          trigger: 'blur'
        }]
      }
    }
  },
  methods: {
    handleUpdatePwd: function(formName) {
      const self = this
      self.$refs[formName].validate(valid => {
        if (valid) {
          userUpdatePwd(this.pwdForm).then(res => {
            self.$message.success(res.msg)
            self.dialogPwdVisible = false
            self.resetForm(formName)
          })
        } else {
          self.$message.error('请填写必填项')
          return false
        }
      })
    }
  }
}
</script>

<style>
</style>
