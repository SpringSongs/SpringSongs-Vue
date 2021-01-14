import {
  search,
  save,
  get,
  edit,
  batchDelete,
  auditStatus,
  hotStatus,
  topStatus,
  featured,
  loadCategoryTreeByParentId,
  listCategoryToTree
} from '@/api/springsongs/sys/SpringArticle/SpringArticle'
import Tinymce from '@/components/Tinymce'
import SpringArticleAddorEdit from './SpringArticleAddorEdit'
export default {
  name: 'Editor',
  components: {
    Tinymce,
    SpringArticleAddorEdit
  },
  data() {
    return {
      contents: '',
      tableData: [],
      multipleSelection: [],
      searchForm: {
        searchDate: {}
      },
      page: 0,
      size: 20,
      total: 0,
      ListTreeProps: {
        label: 'name',
        children: [],
        isLeaf: 'leaf'
      },
      menuList: [],
      menuListTreeProps: {
        label: 'title',
        children: 'children'
      },
      dialogAddVisible: false,
      dialogEditVisible: false,
      // 新增界面数据
      addForm: {
        sortOrder: 99,
        categoryTitle: ''
      },
      uploadForm: {},
      editForm: {
        sortOrder: 99,
        categoryTitle: ''
      },
      addFormRules: {
        title: [{
          required: true,
          message: '请输入标题',
          trigger: 'blur'
        }, {
          min: 4,
          message: '标题至少4位'
        },
        {
          max: 200,
          message: '标题最多200位'
        }
        ],
        categoryId: [{
          required: true,
          message: '请选择分类',
          trigger: 'blur'
        }],
        categoryTitle: [{
          required: true,
          message: '请选择分类',
          trigger: 'blur'
        }],
        contents: [{
          required: true,
          message: '请输入内容',
          trigger: 'blur'
        }]
      },
      editFormRules: {
        title: [{
          required: true,
          message: '请输入标题',
          trigger: 'blur'
        }, {
          min: 4,
          message: '标题至少4位'
        },
        {
          max: 200,
          message: '标题最多200位'
        }
        ],
        contents: [{
          required: true,
          message: '请输入内容',
          trigger: 'blur'
        }],
        categoryId: [{
          required: true,
          message: '请选择分类',
          trigger: 'blur'
        }],
        categoryTitle: [{
          required: true,
          message: '请选择分类',
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
      this.size = val
      this.page = 0
      this.handleSearch()
    },

    handleRefresh: function() {
      this.searchForm.categoryId = ''
      this.searchForm.created_on = ''
      this.searchForm.map = {}
      this.handleSearch()
    },
    handleSelectionChange: function(val) {
      this.multipleSelection = val
    },
    handleCurrentChange: function(val) {
      this.page = val
      this.handleSearch()
    },
    handleArticleCategory: function() {
      const self = this
      self.$router.push('SpringArticleCategory')
    },
    handleArticleComment: function() {
      const self = this
      self.$router.push('SpringArticleComment')
    },
    // 重置表单
    resetForm: function(formName) {
      this.$refs[formName].resetFields()
    },
    // 显示新增界面
    handleAdd: function() {
      this.handleListCategoryTree()
      this.dialogAddVisible = true
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
      loadCategoryTreeByParentId(parentId).then((res) => {
        resolve(res.data)
      })
    },
    // 点击节点事件
    handleNodeClick: function(data) {
      this.searchForm.categoryId = data.id
      this.handleSearch()
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
        self.handleListCategoryTree()
        self.dialogEditVisible = true
      }
    },
    // 显示编辑界面
    handleSingleEdit: function(index, row) {
      const self = this
      get(row.id).then(res => {
        self.editForm = res.data
        this.dialogEditVisible = true
      })
      self.handleListCategoryTree()
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
      if (this.searchForm.created_on) {
        this.searchForm.searchDate.createTimeStart = this.searchForm.created_on[0]
        this.searchForm.searchDate.createTimeEnd = this.searchForm.created_on[1]
      }
      search(self.page, self.size, self.searchForm).then(
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
      self.$refs[formName].validate((valid) => {
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
    handleAuditStatus: function(index, row) {
      const self = this
      auditStatus(row.id).then(res => {
        self.$message.success(res.msg)
        self.handleSearch()
      })
    },
    handleHotStatus: function(index, row) {
      const self = this
      hotStatus(row.id).then(res => {
        self.$message.success(res.msg)
        self.handleSearch()
      })
    },
    handleTopStatus: function(index, row) {
      const self = this
      topStatus(row.id).then(res => {
        self.$message.success(res.msg)
        self.handleSearch()
      })
    },
    handleFeatured: function(index, row) {
      const self = this
      featured(row.id).then(res => {
        self.$message.success(res.msg)
        self.handleSearch()
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
      self.$confirm('确认删除该记录吗?', '提示', {
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
    handleSingleDelete: function(index, row) {
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
    handleListCategoryTree: function() {
      const self = this

      listCategoryToTree().then(res => {
        self.menuList = res.data
      })
    },
    menuListTreeCurrentChangeHandle(data, node) {
      this.addForm.categoryId = data.id
      this.addForm.categoryTitle = data.title
    },
    menuListTreeCurrentEditHandle(data, node) {
      this.editForm.categoryId = data.id
      this.editForm.categoryTitle = data.title
    }
  }
}
