import {
  search,
  updateState,
  converToModel,
  save,
  edit,
  findSpringActProcessRouterByProcDefKey
} from '@/api/springsongs/activiti/SpringProcess/SpringProcess'
export default {
  data() {
    return {
      tableData: [],
      dialogRouterVisible: false,
      routerForm: {
        router: '',
        id: ''
      },
      routerFormRules: {
        router: [{
          required: true,
          message: '请输入路由',
          trigger: 'blur'
        }]
      },
      searchForm: {
        
        category: ''
      },
      page: 0,
        total: 0,
        size: 20,
    }
  },
  created() {
    this.handleSearch()
  },
  methods: {
    sizeChangeHandle(val) {
      this.size = val
      this.page = 0
      this.handleSearch()
    },
    handleCurrentChange(val) {
      this.page = val
      this.handleSearch()
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    handleSearch: function() {
      const self = this
      search(self.page, self.size, self.searchForm.category).then(
        function(response) {
          self.tableData = response.data
          self.total = response.count
          self.loading = false
        }
      )
    },
    handleUpdateStateVue(data) {
      var self = this
      var suspend = data.suspend
      var state
      if (suspend) {
        state = 'active'
        this.$confirm('确定激活吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          updateState(state, data.processonDefinitionId).then(response => {
            self.$message.success(response.msg)
            self.handleSearch()
          })
        }).catch(() => {})
      } else {
        state = 'suspend'
        this.$confirm('确定挂载吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          updateState(state, data.processonDefinitionId).then(response => {
            self.$message.success(response.msg)
            self.handleSearch()
          })
        }).catch(() => {})
      }
    },
    handleConverToModel(data) {
      converToModel(data.processonDefinitionId).then(response => {
        self.$message.success(response.msg)
      })
    },
    handleProcessSetting(data) {
      const self = this
      this.dialogRouterVisible = true
      self.routerForm.procDefKey = data.key
      findSpringActProcessRouterByProcDefKey(data.key).then(response => {
        self.routerForm = response.data
      })
    },
    handleSaveRouter(formName) {
      const self = this
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.routerForm.id === '') {
            save(this.routerForm).then((res) => {
              self.$message.success(res.msg)
              self.dialogRouterVisible = false
            })
          } else {
            edit(this.routerForm).then((res) => {
              self.$message.success(res.msg)
              self.dialogRouterVisible = false
            })
          }
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
