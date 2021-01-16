import {
  search,
  batchDelete
} from '@/api/springsongs/job/SpringJobHistory/SpringJobHistory'
export default {
  data() {
    return {
      tableData: [],
      multipleSelection: [],
      searchForm: {
       
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
    }

  }
}
