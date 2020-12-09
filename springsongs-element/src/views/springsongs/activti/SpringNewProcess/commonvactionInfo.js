import {
  get,
  passOrReject
} from '@/api/springsongs/activiti/SpringNewProcess/commonvaction'
export default {
  data() {
    return {
      addForm: {
        time: 1
      },
      dialogPassOrRejectVisible: false,
      passOrRejectForm: {
        vacationId: ''
      },
      passOrRejectFormRules: {
        remark: [{
          required: true,
          message: '请填写备注',
          trigger: 'blur'
        }],
        result: [{
          required: true,
          message: '请选择审批结果',
          trigger: 'blur'
        }]
      }
    }
  },
  created() {
    const {
      id
    } = this.$route.query
    this.handleInfo(id)
  },
  methods: {
    handleInfo(id) {
      const self = this
      get(id).then(res => {
        self.addForm = res.data
        self.passOrRejectForm.vacationId = self.addForm.id
      })
    },
    handleExamineAndApprove() {
      this.dialogPassOrRejectVisible = true
    },
    handleSave: function(formName) {
      const self = this
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const {
            taskId
          } = this.$route.query
          passOrReject(this.passOrRejectForm, taskId).then((res) => {
            self.$message.success(res.msg)
            self.dialogPassOrRejectVisible = false
          })
        } else {
          this.$message.error('请填写必填项')
        }
      })
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
    }
  }
}
