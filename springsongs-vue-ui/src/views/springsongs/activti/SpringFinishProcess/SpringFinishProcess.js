import {
  search
} from '@/api/springsongs/activiti/SpringFinishProcess/SpringFinishProcess'
export default {
  data() {
    return {
      tableData: [],
      multipleSelection: [],
      searchForm: {
        
        title: '',
        category: ''
      },
      size: 20,
        page: 0,
        total: 0,
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
      search(self.page, self.size, self.searchForm.title, self.searchForm.category).then(
        function(response) {
          self.tableData = response.data
          self.total = response.count
          self.loading = false
        }
      )
    }
  }
}
