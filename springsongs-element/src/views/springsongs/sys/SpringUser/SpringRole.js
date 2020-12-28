import {
  search,
  get,
  save,
  edit,
  batchDelete,
  listSpringResources,
  listAuthority,
  listUserPage,
  ListUsersByRoleId,
  setUsersToRole,
  setAuthority
} from '@/api/springsongs/sys/SpringUser/SpringRole'
import axios from 'axios'
export default {
  data() {
    return {
      menuList: [],
      tableData: [],
      tableRoleUserData: [],
      fileList: [],
      total: 1,
      totalUser: 1,
      totalRoleUser: 1,
      multipleSelection: [],
      multipleSelectionUser: [],
      multipleSelectionUserRole: [],
      searchForm: {
        
      },
      searchtotal: 0,
      searchsize: 20,
      searchpage: 0,
      searchUserForm: {
        
      },
      searchUserTotal: 0,
      searchUserSize: 20,
      searchUserPage: 0,
      searchUserRoleForm: {
      },
      searchUserRoleCount:0,
      searchUserRoleSize:20,
      searchUserRolePage:0,
      menuListTreeProps: {
        label: 'title',
        children: 'children'
      },
      tempKey: '9999999999999',
      dialogAddVisible: false,
      dialogEditVisible: false,
      dialogImportVisible: false,
      dialogSetUsersVisible: false,
      dialogRoleUsersVisible: false,
      dialogAuthorityVisible: false,
      roleId: '',
      menuIdList: [],
      // 新增界面数据
      addForm: {
        enableEdit: false,
        enableDelete: false
      },
      uploadForm: {},
      editForm: {},
      tableUserData: [],
      addFormRules: {
        title: [{
          required: true,
          message: '请输入名称',
          trigger: 'blur'
        }],
        description: [{
          required: true,
          message: '请输入说明',
          trigger: 'blur'
        }]
      },
      editFormRules: {
        title: [{
          required: true,
          message: '请输入名称',
          trigger: 'blur'
        }],
        description: [{
          required: true,
          message: '请输入说明',
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
  },
  methods: {
    sizeChangeHandle(val) {
      this.searchsize = val
      this.searchpage = 0
      this.handleSearch()
    },
    handleSelectionChange: function(val) {
      this.multipleSelection = val
    },
    handleSelectionChangeUserData: function(val) {
      this.multipleSelectionUser = val
    },
    handleSelectionChangeRoleUserData: function(val) {
      this.multipleSelectionUserRole = val
    },
    handleCurrentChangeRoleUser: function(val) {
      self.searchUserRoleForm.page = val
      this.handleUserRoleSearch()
    },
    handleCurrentChangeUser: function(val) {
      self.searchUserPage = val
      this.handleUserSearch()
    },
    sizeChangeHandleUser:function(val) {
      this.searchUserSize = val
      this.searchUserPage = 0
      this.handleUserSearch()
    },
    sizeChangeHandleRoleUser:function(val) {
      this.searchUserRoleSize = val
      this.searchUserRolePage = 0
      this.handleUserSearch()
    },
    handleCurrentChangeRoleUser:function(val) {
      self.searchUserRolePage = val
      this.handleUserSearch()
    },
    handleCurrentChange: function(val) {
      this.searchpage = val
      this.handleSearch()
    },
    handleSetAuthority: function(index, row) {
      this.roleId = row.id
      this.dialogAuthorityVisible = true
      this.initMenuTree()
    },
    // 重置表单
    resetForm: function(formName) {
      this.$refs[formName].resetFields()
    },
    treeDataTranslate: function(data, id = 'id', pid = 'parentId') {
      var res = []
      var temp = {}
      for (var i = 0; i < data.length; i++) {
        temp[data[i][id]] = data[i]
      }
      for (var k = 0; k < data.length; k++) {
        if (temp[data[k][pid]] && data[k][id] !== data[k][pid]) {
          if (!temp[data[k][pid]]['children']) {
            temp[data[k][pid]]['children'] = []
          }
          if (!temp[data[k][pid]]['_level']) {
            temp[data[k][pid]]['_level'] = 1
          }
          data[k]['_level'] = temp[data[k][pid]]._level + 1
          temp[data[k][pid]]['children'].push(data[k])
        } else {
          res.push(data[k])
        }
      }
      return res
    },
    listMenuTree: function() {
      return listSpringResources(0, 1000, { page: 0, size: 1000 })
    },
    listAuthority: function() {
      const self = this
      return listAuthority(self.roleId)
    },
    initMenuTree: function() {
      const self = this
      axios.all([this.listMenuTree(), this.listAuthority()])
        .then(axios.spread(function(menu, perms) {
          if (menu.code === 200) {
            self.menuList = self.treeDataTranslate(menu.data)
          } else {
            self.$message.error(menu.msg)
          }
          if (perms.code === 200) {
            self.menuIdList = perms.data
            var idx = self.menuIdList.indexOf(self.tempKey)
            if (idx !== -1) {
              self.menuIdList.splice(idx, self.menuIdList.length - idx)
            }
            self.$refs.menuListTree.setCheckedKeys(self.menuIdList)
          }
        }))
    },
    handleAuthoritySave: function() {
      const self = this
      self.menuIdList = [].concat(self.$refs.menuListTree.getCheckedKeys(), [this.tempKey], self.$refs.menuListTree
        .getHalfCheckedKeys())
      setAuthority(this.roleId, self.menuIdList).then((res) => {
        self.$message.success(res.msg)
        self.dialogAuthorityVisible = false
      })
    },
    handleSetUsers: function(index, row) {
      this.dialogSetUsersVisible = true
      this.roleId = row.id
      this.handleUserSearch()
    },
    handleUserSearch: function() {
      const self = this
      listUserPage(self.searchUserPage, self.searchUserSize, self.searchUserForm).then(
        function(response) {
          self.tableUserData = response.data
          self.searchUserTotal = response.count
          self.loading = false
        }
      )
    },
    handleUserRoleSearch: function() {
      const self = this
      ListUsersByRoleId(this.roleId, self.searchUserRolePage, self.searchUserRoleSize, self.searchUserForm).then(
        function(response) {
          self.tableRoleUserData = response.data
          self.searchUserRoleTotal = response.count
          self.loading = false
        }
      )
    },
    handleViewUsers: function(index, row) {
      this.dialogRoleUsersVisible = true
      this.roleId = row.id
      this.handleUserRoleSearch()
    },
    // 查询
    handleSearch: function() {
      const self = this
      search(self.searchpage, self.searchsize, self.searchForm).then(
        function(response) {
          self.tableData = response.data
          self.searchtotal = response.count
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
      const self = this
      this.$refs[formName].validate((valid) => {
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
    handleSetUsersSave: function() {
      const self = this
      const ids = []
      if (self.multipleSelectionUser.length === 0) {
        self.$message.warning('请选择用户')
      } else {
        self.multipleSelectionUser.map((item) => {
          ids.push(item.id)
        })
        setUsersToRole(self.roleId, ids).then(res => {
          self.$message.success(res.msg)
          self.dialogSetUsersVisible = false
        })
      }
    },
    // 更新
    handleUpdate: function(formName) {
      const self = this
      edit(this.editForm).then((res) => {
        self.$message.success(res.msg)
        self.handleSearch()
        self.dialogEditVisible = false
      })
    },
    // 显示编辑界面
    handleEdit: function() {
      const self = this
      if (self.multipleSelection.length === 0) {
        self.$message.warning('请选择修改项目')
      } else if (self.multipleSelection.length > 1) {
        self.$message.warning('只允许选择一项修改项目')
      } else {
        get(self.multipleSelection[0].id).then(res => {
          self.editForm = res.data
          self.dialogEditVisible = true
        })
      }
    },
    // 显示编辑界面
    handleSingleEdit: function(index, row) {
      const self = this
      if (row.enableEdit === false) {
        self.$message.warning('项目不允许编辑')
      } else {
        get(row.id).then(res => {
          self.editForm = res.data
          self.dialogEditVisible = true
        })
      }
    },
    // 删除
    handleDel: function() {
      const self = this
      const ids = []
      if (self.multipleSelection.length === 0) {
        self.$message.warning('请选择删除项目')
        return
      }
      this.$confirm('确认删除该记录吗?', '提示', {
        type: 'warning'
      }).then(() => {
        self.multipleSelection.map((item) => {
          ids.push(item.id)
        })
        batchDelete(ids).then(res => {
          self.$message.success(res.msg)
          self.handleSearch()
        })
      }).catch(() => {})
    },
    handleSingleDelete(index, row) {
      const self = this
      const ids = []
      if (row.enableDelete === false) {
        self.$message.warning('项目不允许删除')
        return
      }
      self.$confirm('确认删除该记录吗?', '提示', {
        type: 'warning'
      }).then(() => {
        ids.push(row.id)
        batchDelete(ids).then(res => {
          self.$message.success(res.msg)
          self.handleSearch()
        })
      }).catch(() => {})
    },
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
