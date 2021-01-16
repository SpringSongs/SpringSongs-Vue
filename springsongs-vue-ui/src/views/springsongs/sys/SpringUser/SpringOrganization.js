import {
  listAllToTree,
  get,
  save,
  edit,
  batchDelete

} from '@/api/springsongs/sys/SpringUser/SpringOrganization'
export default {
  data() {
    return {
      expandAll: false,
      showTree: false,
      tableData: [],
      fileList: [],
      total: 1,
      multipleSelection: [],
      searchForm: {
        size: 20,
        parentId: '0'
      },
      dialogAddVisible: false,
      dialogEditVisible: false,
      dialogImportVisible: false,
      // 新增界面数据
      addForm: {
        parentId: '0'
      },
      uploadForm: {},
      editForm: {},
      ListTreeProps: {
        label: 'title',
        children: [],
        isLeaf: 'leaf'
      },
      addFormRules: {

        code: [{
          required: true,
          message: '请输入编码',
          trigger: 'blur'
        }],
        title: [{
          required: true,
          message: '请输入名称',
          trigger: 'blur'
        }]
      },
      editFormRules: {

        code: [{
          required: true,
          message: '请输入编码',
          trigger: 'blur'
        }],
        title: [{
          required: true,
          message: '请输入名称',
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
    // 加载树型区域菜单
    handleLoadTrea: function(node, resolve) {
      if (node.level === 0) {
        this.node_had = node
        this.resolve_had = resolve
        this.loadTrea(resolve, '0')
      }
      if (node.level >= 1) {
        this.loadTrea(resolve, node.data.id)
      }
    },
    // 加载树型区域菜单
    loadTrea: function(resolve, parentId) {

      // listOrganizationsByParent(parentId).then((res) => {
      //   resolve(res.data);
      // });
    },
    // 点击节点事件
    handleNodeClick: function(data) {
      this.searchForm.parentId = data.id
      this.handleSearch()
    },
    handleRefresh: function() {
      this.searchForm.parentId = '0'
      this.handleSearch()
    },
    // 查询
    handleSearch: function() {
      const self = this
      listAllToTree().then(
        function(response) {
          self.tableData = response.data
          // self.searchForm.total = response.count
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
    // 更新
    handleUpdate: function(formName) {
      const self = this
      edit(self.editForm).then((res) => {
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
        })
        this.dialogEditVisible = true
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
        })
        this.dialogEditVisible = true
      }
    },

    // 显示导入界面
    handleImport: function() {
      this.dialogImportVisible = true
    },

    // 删除
    handleDel: function() {
      const self = this
      var ids = []
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
    handleChild: function(index, row) {
      this.addForm.parentId = row.id
      this.dialogAddVisible = true
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
