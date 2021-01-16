<template>
  <el-dialog title="新增" width="50%">
    <el-form ref="addForm" :model="addForm" label-width="80px" :rules="addFormRules">
      <el-form-item label="组别编码" prop="categoryCode">
        <el-select v-model="addForm.categoryCode" placeholder="请选择模型类型" @change="springActCategoryListAddChange">
          <el-option key="" label="请选择" value="" />
          <el-option v-for="item in springActCategorys" :key="item.categoryCode" :label="item.categoryTitle" :value="item.categoryCode" />
        </el-select>
      </el-form-item>
      <el-form-item label="模型名称" prop="name">
        <el-input v-model="addForm.name" auto-complete="off" />
      </el-form-item>
      <el-form-item label="模型标识" prop="key">
        <el-input v-model="addForm.key" auto-complete="off" />
      </el-form-item>
      <el-form-item label="模型说明" prop="description">
        <el-input v-model="addForm.description" auto-complete="off" />
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="handleSave('addForm')">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import {
  save
} from '@/api/springsongs/activiti/SpringActModel/SpringActModel'

export default {
  data() {
    return {
      addForm: {},
      addFormRules: {
        categoryCode: [{
          required: true,
          message: '请选择模型类型',
          trigger: 'blur'
        }],
        name: [{
          required: true,
          message: '模型名称',
          trigger: 'blur'
        }],
        key: [{
          required: true,
          message: '模型名称',
          trigger: 'blur'
        }]
      },
      springActCategorys: []
    }
  },
  methods: {
    springActCategoryListAddChange: function(selectVal) {
      this.addForm.categoryCode = selectVal
    },
    springActCategoryListEditChange: function(selectVal) {
      this.editForm.categoryCode = selectVal
    },
    // 保存
    handleSave: function(formName) {
      const self = this
      this.$refs[formName].validate((valid) => {
        if (valid) {
          save(this.addForm).then((res) => {
            self.$message.success(res.data.msg)
          })
        } else {
          this.$message.error('请填写必填项')
        }
      })
    }
  }
}
</script>

<style>
</style>
