import {
  search,
  updateState,
  converToModel
} from '@/api/springsongs/activiti/SpringProcess/SpringProcess'
export default {
  data() {
    return {
      tableData: [],
      searchForm: {
        page: 0,
        total: 0,
        size: 20,
        category: ''
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
    handleCurrentChange(val) {
      this.searchForm.currPage = val
      this.handleSearch()
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    handleSearch: function() {
      const self = this
      search(self.searchForm.page, self.searchForm.size, self.searchForm.category).then(
        function(response) {
          self.tableData = response.data
          self.searchForm.total = response.count
          self.loading = false
        }
      )
    },
    handleUpdateStateVue(data) {
      var self = this
      var suspend = data.suspend
      var state
      if (suspend) {
        state = 'active'
        this.$confirm('确定激活吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          updateState(state, data.processonDefinitionId).then(response => {
            self.$message.success(response.msg)
            self.handleSearch()
          })
        }).catch(() => {})
      } else {
        state = 'suspend'
        this.$confirm('确定挂载吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          updateState(state, data.processonDefinitionId).then(response => {
            self.$message.success(response.msg)
            self.handleSearch()
          })
        }).catch(() => {})
      }
    },
    handleConverToModel(data) {
      converToModel(data.processonDefinitionId).then(response => {
        self.$message.success(response.msg)
      })
    }
  }
}
