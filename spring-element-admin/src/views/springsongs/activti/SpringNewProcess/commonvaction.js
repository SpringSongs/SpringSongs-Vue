import {
  search,
  save
} from '@/api/springsongs/activiti/SpringNewProcess/commonvaction'
export default {
  data() {
    return {
      tableData: [],
      multipleSelection: [],
      searchForm: {
        size: 20,
        page: 0,
        total: 0
      },
      dialogAddVisible: false,
      addForm: {},
      addFormRules: {
        reason: [{
          required: true,
          message: '请输入请假申请原因',
          trigger: 'blur'
        }],
        time: [{
          required: true,
          message: '请输入请假天数',
          trigger: 'blur'
        }]
      }
    }
  },
  created() {
    this.handleSearch()
  },
  methods: {
    sizeChangeHandle(val) {
      this.searchForm.size = val
      this.searchForm.page = 0
      this.handleSearch()
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    handleCurrentChange(val) {
      this.searchForm.currPage = val
      this.handleSearch()
    },
    // 重置表单
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    // 查询
    handleSearch: function() {
      const self = this
      search(self.searchForm.page, self.searchForm.size, self.searchForm).then(
        function(response) {
          self.tableData = response.data
          self.searchForm.total = response.count
          self.loading = false
        }
      )
    },
    // 显示新增界面
    handleAdd: function() {
      this.dialogAddVisible = true
    },
    // 保存
    handleSave: function(formName) {
      console.log(formName)
      const { key } = this.$route.query
      this.addForm.procDefKey = key
      if (this.addForm.startEndTime) {
        this.addForm.startTime = this.addForm.startEndTime[0]
        this.addForm.endTime = this.addForm.startEndTime[1]
      }
      const self = this
      this.$refs[formName].validate((valid) => {
        if (valid) {
          save(this.addForm).then((res) => {
            self.$message.success(res.msg)
            self.handleSearch()
            self.dialogAddVisible = false
          })
        } else {
          this.$message.error('请填写必填项')
        }
      })
    },
    // 上传
    // 关装对话框
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
    }
  }
}
