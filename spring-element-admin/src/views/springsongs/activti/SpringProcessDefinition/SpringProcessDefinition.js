import {
  search,
  listUserTask,
  setUserToTask,
  initSingleDefinition,
  initAllDefinition
} from '@/api/springsongs/activiti/SpringProcessDefinition/SpringProcessDefinition'
export default {
  data() {
    return {
      tableData: [],
      multipleSelection: [],
      listUserTaskList: [],
      dialogSetUserVisible: false,
      procDefKey: '',
      addForm: {
        radioArray: [],
        name: [],
        id: []
      },
      searchForm: {
        page: 0,
        total: 0,
        size: 20,
        category: ''
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
    handleCurrentChange(val) {
      this.searchForm.currPage = val
      this.handleSearch()
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    handleSearch: function() {
      const self = this
      search(self.searchForm.page, self.searchForm.size, self.searchForm.category).then(
        function(response) {
          self.tableData = response.data
          self.searchForm.total = response.count
          self.loading = false
        }
      )
    },
    handleAddUserToTask() {
      const self = this
      if (self.multipleSelection.length === 0) {
        self.$message.warning('请选择设定人员项目')
      } else if (self.multipleSelection.length > 1) {
        self.$message.warning('只允许选择一项项目')
      } else {
        listUserTask(self.multipleSelection[0].key).then(res => {
          if (res.data.length === 0) {
            self.$message.error('请先初始化流程定义，再设定审批人员！')
          } else {
            self.listUserTaskList = res.data
            self.procDefKey = self.multipleSelection[0].key
            self.dialogSetUserVisible = true
          }
        })
      }
    },
    handleInitProcess() {
      const self = this
      if (self.multipleSelection.length === 0) {
        self.$message.warning('请选择初始化项目')
      } else if (self.multipleSelection.length > 1) {
        self.$message.warning('只允许选择一项项目')
      } else {
        initSingleDefinition({
          processDefinitionId: self.multipleSelection[0].processonDefinitionId,
          procDefKey: self.multipleSelection[0].key
        }).then(res => {
          self.$message.success(res.msg)
        })
      }
    },
    handleInitAllDefinition() {
      initAllDefinition().then(res => {
        self.$message.success(res.msg)
      })
    },
    handleSave() {
      const self = this
      const formData = new FormData()
      for (var key in this.addForm.radioArray) {
        formData.append(key, this.addForm.radioArray[key])
      }
      for (var key1 in this.addForm.name) {
        formData.append(key1, this.addForm.name[key1])
      }
      for (var key2 in this.addForm.id) {
        formData.append(key2, this.addForm.id[key2])
      }
      setUserToTask(formData, self.procDefKey).then(res => {
        self.$message.success(res.msg)
        self.dialogSetUserVisible = false
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
