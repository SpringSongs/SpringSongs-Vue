import {
  search,
  save,
  get,
  edit,
  batchDelete,
  listSpringDistrictByParentId
} from '@/api/springsongs/sys/SpringDistrict/SpringDistrict'
export default {
  data() {
    return {
      provinceValue: '',
      cityValue: '',
      areaValue: '',
      provinceData: [],
      cityData: [],
      areaData: [],
      townValue:'',
      townData:[],
      tableData: [],
      fileList: [],
      multipleSelection: [],
      searchForm: {

      },
      size: 20,
      page: 0,
      total: 0,
      dialogAddVisible: false,
      dialogEditVisible: false,
      dialogImportVisible: false,
      // 新增界面数据
      addForm: {
        parentId: 0,
        parentName: '中国'
      },
      uploadForm: {},
      editForm: {},
      addFormRules: {
        name: [{
          required: true,
          message: '请输入名称',
          trigger: 'blur'
        }],
        parentName: [{
          required: true,
          message: '请输入父级',
          trigger: 'blur'
        }]
      },
      editFormRules: {
        name: [{
          required: true,
          message: '请输入名称',
          trigger: 'blur'
        }],
        parentName: [{
          required: true,
          message: '请输入父级',
          trigger: 'blur'
        }]
      }
    }
  },
  created() {
    this.handleSearch()
    this.listSpringDistrictByParentId(0)
  },
  methods: {
    sizeChangeHandle(val) {
      this.size = val
      this.page = 0
      this.handleSearch()
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    handleCurrentChange(val) {
      this.page = val
      this.handleSearch()
    },
    // 重置表单
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    // 查询
    handleSearch: function() {
      const self = this
      search(self.page, self.size, self.searchForm).then(
        function(response) {
          self.tableData = response.data
          self.total = response.count
          self.loading = false
        }
      )
    },
    // 显示新增界面
    handleAdd: function() {
      const self = this
      let currentParentNameHasValue = false
      let obj = {}
      self.dialogAddVisible = true
      if (self.searchForm.parentId !== 0) {
        self.addForm.parentId = self.searchForm.parentId
        obj = self.provinceData.find((item) => {
          return item.id === self.addForm.parentId
        })
        if (obj !== undefined) {
          self.addForm.parentName = obj.name
          currentParentNameHasValue = true
        }
        if (!currentParentNameHasValue) {
          obj = self.cityData.find((item) => {
            return item.id === self.addForm.parentId
          })
          if (obj !== undefined) {
            self.addForm.parentName = obj.name
            currentParentNameHasValue = true
          }
        }
        if (!currentParentNameHasValue) {
          obj = self.areaData.find((item) => {
            return item.id === self.addForm.parentId
          })
          if (obj !== undefined) {
            self.addForm.parentName = obj.name
            currentParentNameHasValue = true
          }
        }
        if (!currentParentNameHasValue) {
          obj = self.townData.find((item) => {
            return item.id === self.addForm.parentId
          })
          if (obj !== undefined) {
            self.addForm.parentName = obj.name
            currentParentNameHasValue = true
          }
        }
      }
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
        // self.handleSearch()
        self.dialogEditVisible = false
        console.log(self.editForm)
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
          let currentParentNameHasValue = false
          let obj = {}
          if (self.editForm.parentId === 0) {
            self.editForm.parentName = '中国'
            currentParentNameHasValue = true
          }
          obj = self.provinceData.find((item) => {
            return item.id === self.editForm.parentId
          })

          if (obj !== undefined) {
            self.editForm.parentName = obj.name
            currentParentNameHasValue = true
          }
          if (!currentParentNameHasValue) {
            obj = self.cityData.find((item) => {
              return item.id === self.editForm.parentId
            })
            if (obj !== undefined) {
              self.editForm.parentName = obj.name
              currentParentNameHasValue = true
            }
          }
          if (!currentParentNameHasValue) {
            obj = self.areaData.find((item) => {
              return item.id === self.editForm.parentId
            })
            if (obj !== undefined) {
              self.editForm.parentName = obj.name
              currentParentNameHasValue = true
            }
          }
          if (!currentParentNameHasValue) {
            obj = self.townData.find((item) => {
              return item.id === self.editForm.parentId
            })
            if (obj !== undefined) {
              self.editForm.parentName = obj.name
              currentParentNameHasValue = true
            }
          }
        })
      }
    },
    // 显示编辑界面
    handleSingleEdit: function(index, row) {
      const self = this
      get(row.id).then(res => {
        self.editForm = res.data
        this.dialogEditVisible = true
        let currentParentNameHasValue = false
        let obj = {}
        if (self.editForm.parentId === 0) {
          self.editForm.parentName = '中国'
          currentParentNameHasValue = true
        }
        obj = self.provinceData.find((item) => {
          return item.id === self.editForm.parentId
        })
        if (obj !== undefined) {
          self.editForm.parentName = obj.name
          currentParentNameHasValue = true
        }
        if (!currentParentNameHasValue) {
          obj = self.cityData.find((item) => {
            return item.id === self.editForm.parentId
          })
          if (obj !== undefined) {
            self.editForm.parentName = obj.name
            currentParentNameHasValue = true
          }
        }
        if (!currentParentNameHasValue) {
          obj = self.areaData.find((item) => {
            return item.id === self.editForm.parentId
          })
          if (obj !== undefined) {
            self.editForm.parentName = obj.name
            currentParentNameHasValue = true
          }
        }
        if (!currentParentNameHasValue) {
          obj = self.townData.find((item) => {
            return item.id === self.editForm.parentId
          })
          if (obj !== undefined) {
            self.editForm.parentName = obj.name
            currentParentNameHasValue = true
          }
        }
      })
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
    listSpringDistrictByParentId(parentId) {
      const self = this
      this.page = 0
      listSpringDistrictByParentId(parentId).then(res => {
        self.provinceData = res.data
      })
    },
    chooseProvince(value) {
      this.page = 0
      const self = this
      this.cityValue = ''
      this.areaValue = ''
      this.townValue =''
      this.cityData = []
      this.areaData = []
      this.townData= []
      listSpringDistrictByParentId(this.provinceValue).then(res => {
        self.cityData = res.data
      })
      this.searchForm.parentId = this.provinceValue
      this.handleSearch()
    },
    chooseCity(value) {
      this.page = 0
      const self = this
      this.areaValue = ''
      this.townValue =''
      this.townData= []
      listSpringDistrictByParentId(this.cityValue).then(res => {
        self.areaData = res.data
      })
      this.searchForm.parentId = this.cityValue
      this.handleSearch()
    },
    chooseArea() {
      const self = this
      this.page = 0
      this.searchForm.parentId = this.areaValue
      this.townValue =''
      listSpringDistrictByParentId(this.areaValue).then(res => {
        self.townData = res.data
      })
      this.handleSearch()
    },
    chooseTown() {
      this.page = 0
      this.searchForm.parentId = this.townValue
      this.handleSearch()
    },
    handleRefresh() {
      this.searchForm.parentId = 0
      this.addForm.parentName = '中国'
      this.listSpringDistrictByParentId(0)
      this.provinceValue = ''
      this.cityValue = ''
      this.areaValue = ''
      this.cityData = []
      this.areaData = []
      this.handleSearch()
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
