import {
  listCategoryToTree
} from '@/api/springsongs/sys/SpringArticle/SpringArticle'
export default {
  name: 'editor',
  data() {
    return {
      menuList: [],
      menuListTreeProps: {
        label: 'title',
        children: 'children'
      },
      addForm: {
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
      }
    }
  },
  props: {
    visible: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    openDialog: {
      get() {
        return this.visible
      },
      set(val) {
        console.log(val)
        this.$emit('update:visible', val) // openCardDialog改变的时候通知父组件
      }
    }
  },
  created() {
    this.handleListCategoryTree()
  },
  methods: {
    treeDataTranslate: function(data, id = 'id', pid = 'parentId') {
      var res = []
      var temp = {}
      for (var i = 0; i < data.length; i++) {
        temp[data[i][id]] = data[i]
      }
      for (var k = 0; k < data.length; k++) {
        if (temp[data[k][pid]] && data[k][id] !== data[k][pid]) {
          if (!temp[data[k][pid]]['children']) {
            temp[data[k][pid]]['children'] = []
          }
          if (!temp[data[k][pid]]['_level']) {
            temp[data[k][pid]]['_level'] = 1
          }
          data[k]['_level'] = temp[data[k][pid]]._level + 1
          temp[data[k][pid]]['children'].push(data[k])
        } else {
          res.push(data[k])
        }
      }
      return res
    },
    handleListCategoryTree: function() {
      const self = this
      listCategoryToTree().then(res => {
        self.menuList = self.treeDataTranslate(res.data)
      })
    },
    menuListTreeCurrentChangeHandle(data, node) {
      this.addForm.categoryId = data.id
      this.addForm.categoryTitle = data.title
    },
    handleClose: function(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
    }
  }
}
