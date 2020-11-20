import {
  search,
  save,
  edit,
  batchDelete
} from '@/api/springsongs/sys/SpringDictionary/SpringDictionaryDetail'
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
      param: '',
      // 新增界面数据
      addForm: {},
      uploadForm: {},
      editForm: {},
      addFormRules: {
        dictionaryCode: [{
          required: true,
          message: '请输入字典主表编码',
          trigger: 'blur'
        }],
        detailCode: [{
          required: true,
          message: '请输入编码',
          trigger: 'blur'
        }],
        detailName: [{
          required: true,
          message: '请输入名称',
          trigger: 'blur'
        }],
        detailValue: [{
          required: true,
          message: '请输入值',
          trigger: 'blur'
        }],
        description: [{
          required: true,
          message: '请输入说明',
          trigger: 'blur'
        }],
        sortCode: [{
          required: true,
          message: '请输入排序',
          trigger: 'blur'
        }]
      },
      editFormRules: {
        dictionaryCode: [{
          required: true,
          message: '请输入字典主表编码',
          trigger: 'blur'
        }],
        detailCode: [{
          required: true,
          message: '请输入编码',
          trigger: 'blur'
        }],
        detailName: [{
          required: true,
          message: '请输入名称',
          trigger: 'blur'
        }],
        detailValue: [{
          required: true,
          message: '请输入值',
          trigger: 'blur'
        }],
        description: [{
          required: true,
          message: '请输入说明',
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
    this.param = this.$route.params.code
    this.handleSearch()
  },
  methods: {
    sizeChangeHandle(val) {
      this.searchForm.size = val
      this.searchForm.page = 0
      this.handleSearch()
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
    handleSingleEdit: function(index, row) {
      const self = this
      self.editForm = row
      this.dialogEditVisible = true
    },
    // 关装对话框
    handleClose: function(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
    },
    // 查询
    handleSearch: function() {
      const self = this
      self.searchForm.dictionaryCode = this.param
      search(self.searchForm).then(
        function(response) {
          self.tableData = response.data
          self.searchForm.total = response.count
          self.loading = false
        }
      )
    },

    // 保存
    handleSave: function(formName) {
      const self = this
      this.$refs[formName]
        .validate(valid => {
          self.addForm.dictionaryCode = this.param
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
    }
  }
}
