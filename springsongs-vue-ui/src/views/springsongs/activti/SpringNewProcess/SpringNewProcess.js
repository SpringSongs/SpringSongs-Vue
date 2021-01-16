import {
  search
} from '@/api/springsongs/activiti/SpringProcess/SpringProcess'
const COLORS = ['#b84592', '#ff4f81', '#ff6c5f', '#ffc168', '#2dde98', '#1cc7d0']
export default {
  data() {
    return {
      tableData: [],
      searchForm: {
       
        category: ''
      },
      page: 0,
      total: 0,
      size: 20,
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
    handleCurrentChange(val) {
      this.page = val
      this.handleSearch()
    },
    launch(list) {
      this.$router.push({ path: `/Activiti/${list.key}`, query: { uid: this.uid, key: list.key }})
    },
    handleSearch: function() {
      const self = this
      search(self.page, self.size, self.searchForm.category).then(
        function(response) {
          self.tableData = response.data
          self.total = response.count
          self.loading = false
          self.tableData.forEach((item) => {
            var random = Math.floor(Math.random() * COLORS.length)
            item.color = COLORS[random]
          })
        }
      )
    }
  }
}
