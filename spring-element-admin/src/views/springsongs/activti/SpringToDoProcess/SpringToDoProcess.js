import {
  search
} from '@/api/springsongs/activiti/SpringToDoProcess/SpringToDoProcess'
export default {
  data() {
    return {
      tableData: [],
      multipleSelection: [],
      searchForm: {
        size: 20,
        page: 0,
        total: 0,
        title: '',
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
      search(self.searchForm.page, self.searchForm.size, self.searchForm.title, self.searchForm.category).then(
        function(response) {
          self.tableData = response.data
          self.searchForm.total = response.count
          self.loading = false
        }
      )
    }
  }
}
