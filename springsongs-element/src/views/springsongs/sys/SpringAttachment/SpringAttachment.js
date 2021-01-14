import {
  search,
  save,
  edit,
  batchDelete

} from '@/api/springsongs/sys/SpringAttachment/SpringAttachment'
import {
  listAllToTree
} from '@/api/springsongs/sys/SpringAttachment/SpringAttachmentCategory'
export default {
  data() {
    return {
      tableData: [],
      fileList: [],
      multipleSelection: [],
      searchForm: {

      },
      size: 20,
      page: 0,
      total: 0,
      menuList: [],
      menuListTreeProps: {
        label: 'text',
        children: 'children'
      },
      dialogAddVisible: false,
      dialogEditVisible: false,
      // 新增界面数据
      addForm: {},
      param: {},
      editForm: {},
      addFormRules: {
        folderId: [{
          required: true,
          message: '请输入文件夾主键',
          trigger: 'blur'
        }],
        folderName: [{
          required: true,
          message: '请输入文件夹名称',
          trigger: 'blur'
        }],
        path: [{
          required: true,
          message: '请输入文件路径',
          trigger: 'blur'
        }]
      },
      editFormRules: {
        folderId: [{
          required: true,
          message: '请输入文件夾主键',
          trigger: 'blur'
        }],
        folderName: [{
          required: true,
          message: '请输入文件夹名称',
          trigger: 'blur'
        }],
        path: [{
          required: true,
          message: '请输入文件路径',
          trigger: 'blur'
        }]
      },
      uploadFormRules: {},
      importFormRules: {}
    }
  },
  created() {
    this.param = this.$route.params.folderId
    this.handleTree()
    this.handleSearch()
  },
  methods: {
    sizeChangeHandle(val) {
      this.size = val
      this.page = 0
      this.handleSearch()
    },
    handleSelectionChange: function(val) {
      this.multipleSelection = val
    },
    handleCurrentChange: function(val) {
      this.page = val
      this.handleSearch()
    },
    // 重置表单
    resetForm: function(formName) {
      this.$refs[formName].resetFields()
    },
    handleTree: function() {
      const self = this
      listAllToTree().then((res) => {
        self.menuList = res.data
      })
    },
    menuListTreeCurrentSearchHandle(data, node) {
      this.searchForm.folderId = data.id
      this.handleSearch()
    },
    // 显示新增界面
    handleAdd: function() {
      this.dialogAddVisible = true
    },
    // 显示编辑界面
    handleEdit: function() {
      const self = this
      if (self.multipleSelection.length === 0) {
        self.$message.warning('请选择修改项目')
      } else if (self.multipleSelection.length > 1) {
        self.$message.warning('只允许选择一项修改项目')
      } else {
        self.editForm = self.multipleSelection[0]
        self.dialogEditVisible = true
      }
    },
    // 显示编辑界面
    handleSingleEdit: function(Index, row) {
      const self = this
      self.editForm = row
      this.dialogEditVisible = true
    },
    // 关装对话框
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
    },
    handlePreview: function() {},
    handleRemove: function() {},
    beforeRemove: function() {},
    handleExceed: function() {},
    handleRefresh: function() {
      this.searchForm.folderId = ''
      this.handleSearch()
    },
    // 查询
    handleSearch: function() {
      const self = this
      // self.searchForm.folderId = this.param
      search(self.searchForm, self.page, self.size).then(
        function(response) {
          self.tableData = response.data
          self.total = response.count
          self.loading = false
        }
      )
    },
    // 保存
    handleSave: function(formName) {
      const self = this
      self.addForm.folderId = this.$route.params.folderId
      self.addForm.folderName = this.$route.params.title
      this.$refs[formName]
        .validate(valid => {
          if (valid) {
            save(this.addForm).then((res) => {
              self.$message.success(res.msg)
              self.handleSearch()
              self.dialogAddVisible = false
              self.resetForm(formName)
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
        .catch(() => {})
    },
    handleSingleDelete(index, row) {
      const self = this
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
        .catch(() => {})
    },
    handlerUploadSuccess: function(res, file, fileList) {
      const self = this
      if (res.code === 200) {
        self.$message.success(res.msg)
        self.addForm.path = res.data
        self.handleSearch()
        self.fileList = []
      } else {
        self.$message.error(res.msg)
      }
    }
  }
}
