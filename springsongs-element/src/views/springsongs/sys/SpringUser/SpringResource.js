import {
  get,
  save,
  edit,
  batchDelete,
  listAllSystem,
  ListAllToTree
} from '@/api/springsongs/sys/SpringUser/SpringResource'
import elementIcons from './element-icons'
export default {
  components: {
    // treeTable
  },
  data() {
    return {
      expandAll: false,
      showTree: false,
      tableData: [],
      fileList: [],
      elementIcons,
      total: 1,
      multipleSelection: [],
      searchForm: {
        parentId: '0',
      },
      page: 0,
      size: 20,
      node: Object,
      resolve: Object,
      systemList: [],
      systemId: '',
      dialogAddVisible: false,
      dialogEditVisible: false,
      dialogImportVisible: false,
      // 新增界面数据
      addForm: {
        parentId: '0',
        vueIcon: ''
      },
      uploadForm: {},
      editForm: {
        parentId: '0',
        vueIcon: ''
      },
      ListTreeProps: {
        label: 'name',
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
        }],
        sortCode: [{
          required: true,
          message: '请输入排序',
          trigger: 'blur'
        }],
        systemId: [{
          required: true,
          message: '请选择子系统',
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
        }],
        sortCode: [{
          required: true,
          message: '请输入排序',
          trigger: 'blur'
        }],
        systemId: [{
          required: true,
          message: '请选择子系统',
          trigger: 'blur'
        }]
      }
    }
  },
  created() {
    this.handleSearch()
    this.handleListSystem()
  },
  methods: {
    generateIconCode(symbol) {
      return `<svg-icon icon-class="${symbol}" />`
    },
    generateElementIconCode(symbol) {
      // return `<i class="el-icon-${symbol}" />`
      return symbol
    },
    handleClipboard(text, event) {
      // console.log(text);
      this.addForm.vueIcon = 'el-icon-' + text
      this.editForm.vueIcon = 'el-icon-' + text
      // clipboard(text, event)
    },
    sizeChangeHandle(val) {
      this.size = val
      this.page = 0
      this.handleSearch()
    },
    systemListChange: function(selectVal) {
      // this.node_had.childNodes = []
      //this.systemId = selectVal
      this.addForm.systemId = selectVal
      // this.handleLoadTrea(this.node_had, this.resolve_had)
      // this.handleSearch()
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
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    handleCurrentChange(val) {
      this.searchForm.page = val
      this.handleSearch()
    },
    // 重置表单
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    handleChild: function(index, row) {
      this.addForm.parentId = row.id
      this.addForm.parentname = row.title
      this.dialogAddVisible = true
    },
    handleListSystem: function() {
      const self = this
      listAllSystem(self.searchForm).then(res => {
        self.systemList = res.data
        self.loading = false
      })
    },
    // 查询
    handleSearch: function() {
      const self = this
      ListAllToTree(self.searchForm.systemId).then(
        function(response) {
          self.tableData = response.data
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
          this.dialogEditVisible = true
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
          this.dialogEditVisible = true
        })
      }
    },

    // 显示导入界面
    handleImport: function() {
      this.dialogImportVisible = true
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
