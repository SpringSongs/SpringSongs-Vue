import {
  search,
  get,
  save,
  edit,
  batchDelete,
  listOrganizeTree,
  updatePwd,
  listRole,
  ListRoleByUserId,
  setRoleSave
} from '@/api/springsongs/sys/SpringUser/SpringUser'
export default {
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.pwdForm.configpwd !== '') {
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
      tableData: [],
      tableRoleData: [],
      tableRoleUserData: [],
      fileList: [],
      totalRole: 1,
      totalRoleUser: 1,
      multipleSelection: [],
      multipleSelectionRole: [],
      multipleSelectionRoleUser: [],
      ListTreeProps: {
        label: 'title',
        children: [],
        isLeaf: 'leaf'
      },
      menuList: [],
      menuListTreeProps: {
        label: 'title',
        children: 'children'
      },
      searchForm: {

      },
      searchSize: 20,
      searchPage: 0,
      searchTotal: 0,
      searchFormRole: {
      },
      searchRoleSize: 20,
      searchRolePage: 0,
      searchRoleTotal: 0,
      searchFormRoleUser: {
      },
      searchRoleUserSize: 20,
      searchRoleUserPage: 0,
      searchRoleUserTotal: 0,
      dialogAddVisible: false,
      dialogEditVisible: false,
      dialogImportVisible: false,
      dialogPwdVisible: false,
      dialogRoleVisible: false,
      dialogRoleUserVisible: false,
      // 新增界面数据
      addForm: {
        enableEdit: false,
        enableDelete: false,
        organizationName: ''
      },
      uploadForm: {},
      editForm: {},
      pwdForm: {
        configpwd: '',
        pwd: ''
      },
      userId: '',
      addFormRules: {
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
      },
      editFormRules: {
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
      },
      pwdFormRules: {
        pwd: [{
          validator: validatePass,
          trigger: 'blur'
        }],
        configpwd: [{
          validator: validatePass2,
          trigger: 'blur'
        }]
      },
      uploadFormRules: {},
      importFormRules: {
        name: [{
          required: true,
          message: '请输入姓名',
          trigger: 'blur'
        }]
      }
    }
  },
  created() {
    this.handleSearch()
    this.handleListOrganizeTree()
  },
  methods: {
    sizeChangeHandle(val) {
      this.searchSize = val
      this.searchPage = 0
      this.handleSearch()
    },
    handleCurrentChange(val) {
      this.searchPage = val
      this.handleSearch()
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    handleSelectionChangeRole(val) {
      this.multipleSelectionRole = val
    },
    handleSelectionChangeRoleUser(val) {
      this.multipleSelectionRoleUser = val
    },
    handleCurrentChangeRoleUser(val) {
      this.searchRoleUserPage = val
      this.handleUserRoleSearch()
    },
    handleCurrentChangeRole(val) {
      this.searchRolePage = val
      this.handleRoleSearch()
    },
    // 重置表单
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    handleRefresh: function () {
      this.searchForm.organizationId = ''
      this.handleSearch()
    },
    handleListOrganizeTree: function () {
      const self = this
      listOrganizeTree().then((res) => {
        self.menuList =res.data
      })
    },
    handleSetRoles: function (index, row) {
      this.userId = row.id
      this.handleRoleSearch()
      this.dialogRoleVisible = true
    },
    handleViewRoles: function (index, row) {
      this.userId = row.id
      this.dialogRoleUserVisible = true
      this.handleUserRoleSearch()
    },
    // 显示新增界面
    handleAdd: function () {
      this.handleListOrganizeTree()
      this.dialogAddVisible = true
    },
    // 显示编辑界面
    handleEdit: function () {
      const self = this
      if (self.multipleSelection.length === 0) {
        self.$message.warning('请选择修改项目')
      } else if (self.multipleSelection.length > 1) {
        self.$message.warning('只允许选择一项修改项目')
      } else {
        get(self.multipleSelection[0].id).then(res => {
          self.editForm = res.data
          self.handleListOrganizeTree()
          self.dialogEditVisible = true
        })
      }
    },
    handleSetPwd() {
      const self = this
      if (self.multipleSelection.length === 0) {
        self.$message.warning('请选择修改项目')
      } else if (self.multipleSelection.length > 1) {
        self.$message.warning('只允许选择一项修改项目')
      } else {
        self.pwdForm.userId = self.multipleSelection[0].id
        self.dialogPwdVisible = true
      }
    },
    // 显示编辑界面
    handleSingleEdit: function (index, row) {
      const self = this
      if (row.enableEdit === false) {
        self.$message.warning('项目不允许编辑')
      } else {
        get(row.id).then(res => {
          self.editForm = res.data
          self.handleListOrganizeTree()
          self.dialogEditVisible = true
        })
      }
    },
    // 关装对话框
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => { })
    },
    handleRoleSearch: function () {
      const self = this
      listRole(self.searchRolePage, self.searchRoleSize, self.searchFormRole).then(res => {
        self.tableRoleData = res.data
        self.searchRoleTotal = res.count
      })
    },
    handleUserRoleSearch: function () {
      const self = this
      ListRoleByUserId(self.userId, self.searchRoleUserPage, self.searchRoleUserSize, self.searchFormRole).then(
        res => {
          self.tableRoleUserData = res.data
          self.searchRoleUserTotal = res.count
        })
    },
    // 查询
    handleSearch: function () {
      const self = this
      search(self.searchPage, self.searchSize, self.searchForm).then(
        function (response) {
          self.tableData = response.data
          self.searchTotal = response.count
          self.loading = false
        }
      )
    },
    handleSetRoleSave: function () {
      const self = this
      const ids = []
      if (self.multipleSelectionRole.length === 0) {
        self.$message.warning('请选择角色')
      } else {
        self.multipleSelectionRole.map(item => {
          ids.push(item.id)
        })
        setRoleSave(this.userId, ids).then(res => {
          self.$message.success(res.msg)
          self.dialogRoleVisible = false
        })
      }
    },
    // 保存
    handleSave: function (formName) {
      const self = this
      self.$refs[formName]
        .validate(valid => {
          if (valid) {
            save(self.addForm).then((res) => {
              self.$message.success(res.msg)
              self.handleSearch()
              self.dialogAddVisible = false
            })
          } else {
            this.$message.error('请填写必填项')
          }
        })
    },
    handleUpdatePwd: function (formName) {
      const self = this
      self.$refs[formName].validate(valid => {
        if (valid) {
          updatePwd(this.pwdForm).then(res => {
            self.$message.success(res.msg)
            self.dialogPwdVisible = false
            self.resetForm(formName)
          })
        } else {
          self.$message.error('请填写必填项')
          return false
        }
      })
    },
    // 更新
    handleUpdate: function (formName) {
      const self = this
      edit(this.editForm).then((res) => {
        self.$message.success(res.msg)
        self.handleSearch()
        self.dialogEditVisible = false
      })
    },
    // 删除
    handleDel: function () {
      const self = this
      const ids = []
      if (self.multipleSelection.length === 0) {
        self.$message.warning('请选择删除项目')
        return
      }
      self
        .$confirm('确认删除该记录吗?', '提示', {
          type: 'warning'
        })
        .then(() => {
          self.multipleSelection.map(item => {
            ids.push(item.id)
          })
          batchDelete(ids).then(res => {
            self.$message.success(res.msg)
            self.handleSearch()
          })
        })
        .catch(() => { })
    },
    handleSingleDelete(index, row) {
      const self = this
      if (row.enableDelete === false) {
        self.$message.warning('项目不允许删除')
        return
      }
      const ids = []
      self
        .$confirm('确认删除该记录吗?', '提示', {
          type: 'warning'
        })
        .then(() => {
          ids.push(row.id)
          batchDelete(ids).then(res => {
            self.$message.success(res.msg)
            self.handleSearch()
          })
        })
        .catch(() => { })
    },
    menuListTreeCurrentChangeHandle(data, node) {
      this.addForm.organizationId = data.id
      this.addForm.organizationName = data.title
    },
    menuListTreeCurrentEditHandle(data, node) {
      this.editForm.organizationId = data.id
      this.editForm.organizationName = data.title
    },
    menuListTreeCurrentSearchHandle(data, node) {
      this.searchForm.organizationId = data.id
      this.handleSearch()
    }
  }
}
