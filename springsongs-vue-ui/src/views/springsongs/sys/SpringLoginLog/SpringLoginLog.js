import {
  search
} from '@/api/springsongs/sys/SpringLoginLog/SpringLoginLog'
export default {
  data() {
    return {
      tableData: [],
      total: 1,
      multipleSelection: [],
      searchForm: {
        
      },
      size: 20,
        page: 1,
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
    handleSelectionChange: function(val) {
      this.multipleSelection = val
    },
    handleCurrentChange: function(val) {
      this.page = val
      this.handleSearch()
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
    }
  }
}
