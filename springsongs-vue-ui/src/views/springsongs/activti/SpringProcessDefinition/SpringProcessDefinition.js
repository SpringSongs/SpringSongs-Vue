import {
  search,
  listUserTask,
  setUserToTask,
  initSingleDefinition,
  initAllDefinition,
  listUserPage,
  listRole
} from '@/api/springsongs/activiti/SpringProcessDefinition/SpringProcessDefinition'
export default {
  data() {
    return {
      drawer: false,
      direction: 'rtl',
      tableData: [],
      tableUserData: [],
      tableRoleData: [],
      tableUserFrom: {
        page: 0,
        size: 20
      },
      searchFormRole: {
        limits: 20,
        page: 0,
        total: 0
      },
      multipleSelection: [],
      listUserTaskList: [],
      dialogSetUserVisible: false,
      procDefKey: '',
      taskDefKey: '',
      taskDefKeyType: '',
      checkUserOrGroup: false,
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
            self.listUserTaskList.map((item) => {
              self.addForm.radioArray[item.taskDefKey + '_taskType'] = item.taskType
              self.addForm.name[item.taskDefKey + '_name'] = item.candidateName
              self.addForm.id[item.taskDefKey + '_id'] = item.candidateIds
            })
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
        if (this.addForm.radioArray[key] === '') {
          self.$message.error('请选择类型')
          return
        }
        formData.append(key, this.addForm.radioArray[key])
      }
      for (var key1 in this.addForm.name) {
        if (this.addForm.name[key1] === '') {
          self.$message.error('请选择审批用户')
          return
        }
        formData.append(key1, this.addForm.name[key1])
      }
      for (var key2 in this.addForm.id) {
        if (this.addForm.id[key2] === '') {
          self.$message.error('请选择审批用户')
          return
        }
        formData.append(key2, this.addForm.id[key2])
      }
      setUserToTask(formData, self.procDefKey).then(res => {
        self.$message.success(res.msg)
        self.dialogSetUserVisible = false
      })
    },
    selectUsers(key) {
      this.drawer = true
      this.taskDefKeyType = this.addForm.radioArray[key + '_taskType']
      this.taskDefKey = key
      this.addForm.name[this.taskDefKey + '_name'] = ''
      this.addForm.id[this.taskDefKey + '_id'] = ''
      this.$forceUpdate()
      if (this.taskDefKeyType === 'candidateGroup') {
        this.checkUserOrGroup = true
        this.handleRoleSearch()
      } else {
        this.checkUserOrGroup = false
        this.handleUserSearch()
      }
    },
    handleUserSearch: function() {
      const self = this
      listUserPage(self.tableUserFrom.page, self.tableUserFrom.size, self.tableUserFrom).then(
        function(response) {
          self.tableUserData = response.data
          self.tableUserFrom.total = response.count
          self.loading = false
        }
      )
    },
    handleRoleSearch: function() {
      const self = this
      listRole(self.searchFormRole.page, self.searchFormRole.limits, self.searchFormRole).then(res => {
        self.tableRoleData = res.data
        self.searchFormRole.total = res.count
      })
    },
    handleAddUser: function(row) {
      // console.log(this.taskDefKeyType)
      const taskDefKeyName = this.addForm.name[this.taskDefKey + '_name']
      const taskDefKeyId = this.addForm.name[this.taskDefKey + '_id']
      if (this.taskDefKeyType === 'assignee') {
        this.addForm.name[this.taskDefKey + '_name'] = row.userName
        this.addForm.id[this.taskDefKey + '_id'] = row.id
      } else if (this.taskDefKeyType === 'candidateUser') {
        if (taskDefKeyName !== '' && taskDefKeyId !==
          '') {
          if (this.addForm.name[this.taskDefKey + '_name'].indexOf(row.userName) > -1) {
            return
          }
          this.addForm.name[this.taskDefKey + '_name'] += ',' + row.userName
          this.addForm.id[this.taskDefKey + '_id'] += ',' + row.id
        } else {
          this.addForm.name[this.taskDefKey + '_name'] = row.userName
          this.addForm.id[this.taskDefKey + '_id'] = row.id
        }
      } else if (this.taskDefKeyType === 'candidateGroup') {
        if (taskDefKeyName !== '' && taskDefKeyId !==
          '') {
          if (this.addForm.name[this.taskDefKey + '_name'].indexOf(row.title) > -1) {
            return
          }
          this.addForm.name[this.taskDefKey + '_name'] += ',' + row.title
          this.addForm.id[this.taskDefKey + '_id'] += ',' + row.id
        } else {
          this.addForm.name[this.taskDefKey + '_name'] = row.title
          this.addForm.id[this.taskDefKey + '_id'] = row.id
        }
      }
      // console.log(this.addForm.name[this.taskDefKey + "_name"])
      this.$forceUpdate()
    },
    clearUserOrRole(key) {
      const self = this
      this.$nextTick(() => {
        self.addForm.name[key + '_name'] = ''
        self.addForm.id[key + '_id'] = ''
      })
      // console.log()
      this.$forceUpdate()
    },
    sizeTableUserDataChangeHandle(val) {
      this.tableUserFrom.size = val
      this.tableUserFrom.page = 0
      this.handleUserSearch()
    },
    handleTableUserDataCurrentChange: function(val) {
      this.tableUserFrom.page = val
      this.handleUserSearch()
    },
    handleCurrentChangeRole: function(val) {
      this.searchFormRole.page = val
      this.handleRoleSearch()
    },
    sizeRoleDataChangeHandle: function(val) {
      this.searchFormRole.size = val
      this.searchFormRole.page = 0
      this.handleRoleSearch()
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
