import {
  search,
  save,
  edit,
  batchDelete
} from '@/api/springsongs/sys/SpringSystem/SpringSystem'
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
      // 新增界面数据
      addForm: {
        enableEdit: false,
        enableDelete: false
      },
      editForm: {},
      addFormRules: {
        code: [{
          required: true,
          message: '请输入系统编码',
          trigger: 'blur'
        },
        {
          min: 4,
          message: '系统编码至少4位'
        },
        {
          max: 12,
          message: '系统编码最多12位'
        },
        {
          pattern: /^[a-zA-Z_]+$/,
          message: '系统编码必须是英文组合'
        }
        ],
        title: [{
          required: true,
          message: '请输入系统名称',
          trigger: 'blur'
        },
        {
          min: 4,
          message: '系统名称至少4位'
        },
        {
          max: 36,
          message: '系统名称最多36位'
        }
        ]
      },
      editFormRules: {
        code: [{
          required: true,
          message: '请输入系统编码',
          trigger: 'blur'
        },
        {
          min: 4,
          message: '系统编码至少4位'
        },
        {
          max: 12,
          message: '系统编码最多12位'
        },
        {
          pattern: /^[a-zA-Z_]+$/,
          message: '系统编码必须是英文组合'
        }
        ],
        title: [{
          required: true,
          message: '请输入系统名称',
          trigger: 'blur'
        },
        {
          min: 4,
          message: '系统名称至少4位'
        },
        {
          max: 36,
          message: '系统名称最多36位'
        }
        ]
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
        self.dialogEditVisible = true
      }
    },
    // 显示编辑界面
    handleSingleEdit: function(index, row) {
      const self = this
      if (row.enableEdit === false) {
        self.$message.warning('项目不允许编辑')
      } else {
        self.editForm = row
        this.dialogEditVisible = true
      }
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

    // 保存
    handleSave: function(formName) {
      const self = this
      self.$refs[formName]
        .validate(valid => {
          if (valid) {
            save(this.addForm).then((res) => {
              self.$message.success(res.msg)
              self.handleSearch()
              self.dialogAddVisible = false
              self.resetForm(formName)
            })
          } else {
            self.$message.error('请填写必填项')
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
      if (row.enableDelete === false) {
        self.$message.warning('项目不允许删除')
        return
      }
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
