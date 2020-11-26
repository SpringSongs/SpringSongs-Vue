import {
  search,
  save,
  edit,
  batchDelete,
  listAllSpringActCategory,
  deploy,
  exportXML
} from '@/api/springsongs/activiti/SpringActModel/SpringActModel'
export default {
  data() {
    return {
      tableData: [],
      fileList: [],
      multipleSelection: [],
      searchForm: {
        size: 20,
        page: 0,
        total: 1
      },
      springActCategorys: [],
      dialogAddVisible: false,
      dialogEditVisible: false,
      dialogImportVisible: false,
      // 新增界面数据
      addForm: {
        description: ''
      },
      uploadForm: {},
      editForm: {
        description: ''
      },
      href: '',
      addFormRules: {
        categoryCode: [{
          required: true,
          message: '请选择模型类型',
          trigger: 'blur'
        }],
        name: [{
          required: true,
          message: '模型名称',
          trigger: 'blur'
        }],
        key: [{
          required: true,
          message: '模型名称',
          trigger: 'blur'
        }]
      },
      editFormRules: {
        categoryCode: [{
          required: true,
          message: '请选择模型类型',
          trigger: 'blur'
        }],
        name: [{
          required: true,
          message: '模型名称',
          trigger: 'blur'
        }],
        key: [{
          required: true,
          message: '模型名称',
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
    // 查询
    handleSearch: function() {
      const self = this
      search(self.searchForm.page, self.searchForm.size, self.searchForm).then(
        function(response) {
          self.tableData = response.data
          self.tableData.forEach(item => {
            item.metaInfo = JSON.parse(item.metaInfo)
          })
          self.searchForm.total = response.count
          self.loading = false
        }
      )
    },
    // 显示新增界面
    handleAdd: function() {
      this.listSpringActCategory()
      this.dialogAddVisible = true
    },
    // 保存
    handleSave: function(formName) {
      const self = this
      this.$refs[formName].validate((valid) => {
        if (valid) {
          save(this.addForm).then((res) => {
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
      edit(this.editForm, this.editForm.id).then((res) => {
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
        this.listSpringActCategory()
        self.editForm = self.multipleSelection[0]
        self.editForm.categoryCode = self.multipleSelection[0].category
        // let metaInfo=JSON.parse(self.multipleSelection[0].metaInfo);
        self.editForm.description = self.multipleSelection[0].metaInfo.description
        this.dialogEditVisible = true
      }
    },
    // 显示编辑界面
    handleSingleEdit: function(index, row) {
      const self = this
      this.listSpringActCategory()
      self.editForm = row
      self.editForm.categoryCode = row.category
      // let metaInfo=JSON.parse(row.metaInfo);
      self.editForm.description = row.metaInfo.description
      this.dialogEditVisible = true
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
      } else if (self.multipleSelection.length > 1) {
        self.$message.warning('只允许删除一个项目')
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
      self.$confirm('确认删除该记录吗?', '提示', {
        type: 'warning'
      }).then(() => {
        batchDelete(row.id).then(res => {
          self.$message.success(res.msg)
          self.handleSearch()
        })
      }).catch(() => {})
    },

    springActCategoryListAddChange: function(selectVal) {
      this.addForm.categoryCode = selectVal
    },
    springActCategoryListEditChange: function(selectVal) {
      this.editForm.categoryCode = selectVal
    },

    listSpringActCategory() {
      const self = this
      listAllSpringActCategory()
        .then(function(response) {
          self.springActCategorys = response.data
        })
    },
    handlerDeploy(data) {
      const self = this
      var id = data.id
      this.$confirm('确认部署发布' + data.name + '吗？', '确认部署发布', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deploy(id).then(response => {
          self.$message.success(response.msg)
          this.handleSearch()
        })
      }).catch(() => {})
    },
    handlerExporyXML(data) {
      exportXML(data.id).then(res => {
        self.$message.success(res.msg)
      }
      )
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
