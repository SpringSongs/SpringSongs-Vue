<template>
  <div class="app-container">
    <el-tabs type="border-card">
      <el-tab-pane label="请假流程">
        <el-form ref="addForm" :model="addForm" label-width="120px">
          <el-form-item label="类型" prop="title">
            {{ addForm.vacationType }}
          </el-form-item>
          <el-form-item label="请假人" prop="title">
            {{ addForm.trueName }}
          </el-form-item>
          <el-form-item label="标题" prop="title">
            <el-input v-model="addForm.title" auto-complete="off" readonly />
          </el-form-item>
          <el-form-item label="请假申请原因" prop="reason">
            <el-input v-model="addForm.reason" type="textarea" :rows="4" auto-complete="off" readonly />
          </el-form-item>
          <el-form-item label="请假天数" prop="time">
            <el-input v-model="addForm.time" auto-complete="off" readonly />
          </el-form-item>
          <el-form-item label="请假日期" prop="time">
            <el-col :span="10">
              <el-input v-model="addForm.startTime" auto-complete="off" width="200" readonly />
            </el-col>
            <el-col :span="2" style="text-align: center;">至</el-col>
            <el-col :span="10">
              <el-input v-model="addForm.endTime" auto-complete="off" width="200" readonly />
            </el-col>
          </el-form-item>
        </el-form>
        <el-button type="primary" @click="handleExamineAndApprove()">审批</el-button>
      </el-tab-pane>
    </el-tabs>
    <el-dialog title="审批请假单" :visible.sync="dialogPassOrRejectVisible" width="50%" :before-close="handleClose">
      <el-form ref="passOrRejectForm" :model="passOrRejectForm" label-width="80px" :rules="passOrRejectFormRules">
        <el-form-item label="备注" prop="remark">
          <el-input v-model="passOrRejectForm.remark" type="textarea" :rows="4" auto-complete="off" />
        </el-form-item>
        <el-form-item label="审批结果" prop="result">
          <el-radio-group v-model="passOrRejectForm.result">
            <el-radio-button label="2">通过</el-radio-button>
            <el-radio-button label="3">驳回</el-radio-button>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogPassOrRejectVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleSave('passOrRejectForm')">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script src="./commonvactionInfo.js">
</script>

<style>
</style>
