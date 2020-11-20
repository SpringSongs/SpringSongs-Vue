import {
  search,
  batchDelete
} from '@/api/springsongs/sys/SpringArticle/SpringArticleComment'
export default {
  data() {
    return {
      tableData: [],
      total: 1,
      multipleSelection: [],
      searchForm: {
        size: 20
      },
      dialogAddVisible: false,
      dialogEditVisible: false,
      dialogImportVisible: false,
      // 新增界面数据
      addForm: {},
      editForm: {},
      addFormRules: {
        content: [{
          required: true,
          message: '请输入评论内容',
          trigger: 'blur'
        }],
        objectId: [{
          required: true,
          message: '请输入主题主键',
          trigger: 'blur'
        }],
        sortCode: [{
          required: true,
          message: '请输入排序',
          trigger: 'blur'
        }]
      },
      editFormRules: {
        content: [{
          required: true,
          message: '请输入评论内容',
          trigger: 'blur'
        }],
        objectId: [{
          required: true,
          message: '请输入主题主键',
          trigger: 'blur'
        }],
        sortCode: [{
          required: true,
          message: '请输入排序',
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
    handleArticle: function() {
      const self = this
      self.$router.push('SpringArticle')
    },
    handleArticleCategory: function() {
      const self = this
      self.$router.push('SpringArticleCategory')
    },
    handleSelectionChange: function(val) {
      this.multipleSelection = val
    },
    handleCurrentChange: function(val) {
      this.searchForm.page = val
      this.handleSearch()
    },
    // 重置表单
    resetForm: function(formName) {
      this.$refs[formName].resetFields()
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
        console.log(self.editForm)
        this.dialogEditVisible = true
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

    handleAuditStatus: function(index, row) {
      const self = this
      self.$axios.post('/SpringArticleComment/Audit/' + row.id).then(res => {
        if (res.data.code === 200) {
          self.$message.success(res.data.msg)
          self.handleSearch()
        } else {
          self.$message.error(res.data.msg)
        }
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
    }
  }
}
