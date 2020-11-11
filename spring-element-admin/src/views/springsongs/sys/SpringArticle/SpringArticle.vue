<template>
  <section>
    <el-row>
      <el-col :span="4">
        <el-tabs type="border-card">
          <el-tab-pane label="文章例表">
            <div>
              <el-button>文章例表</el-button>
            </div>
            <div>
              <el-button @click="handleArticleCategory()">文章分类</el-button>
            </div>
            <div>
              <el-button @click="handleArticleComment()">文章评论</el-button>
            </div>
          </el-tab-pane>
        </el-tabs>
        <el-tabs type="border-card">
          <el-tab-pane label="文章分类">
            <div class="treesearch">
              <el-tree
                lazy
                node-key="id"
                :load="handleLoadTrea"
                :props="ListTreeProps"
                highlight-current
                highlight-current
                @node-click="handleNodeClick"
              />
            </div>
          </el-tab-pane>
        </el-tabs>
      </el-col>
      <el-col :span="20">
        <el-tabs type="border-card">
          <el-tab-pane label="内容管理">
            <el-row>
              <el-col :span="24" style="margin-top: 20px;">
                <div class="bg-white h-100 mx-1 p-1 shadowed">

                  <el-form ref="searchForm" :model="searchForm">
                    <el-row>
                      <el-col :span="6">
                        <div class="demo-input-suffix">
                          <el-input v-model="searchForm.title" placeholder="请输入内容" prefix-icon="el-icon-search">
                            <template slot="prepend">标题：</template>
                          </el-input>
                        </div>
                      </el-col>
                      <el-col :span="6">
                        <div class="demo-input-suffix">
                          <el-input v-model="searchForm.tag" placeholder="请输入内容" prefix-icon="el-icon-search">
                            <template slot="prepend">标签：</template>
                          </el-input>
                        </div>
                      </el-col>
                      <el-col :span="6">
                        <div class="demo-input-suffix">
                          <el-input v-model="searchForm.keyword" placeholder="请输入内容" prefix-icon="el-icon-search">
                            <template slot="prepend">关键字：</template>
                          </el-input>
                        </div>
                      </el-col>
                      <el-col :span="6">
                        <div class="demo-input-suffix">
                          <el-input v-model="searchForm.summary" placeholder="请输入内容" prefix-icon="el-icon-search">
                            <template slot="prepend">简介：</template>
                          </el-input>
                        </div>
                      </el-col>

                    </el-row>
                    <el-row>
                      <el-col :span="6">
                        <div class="demo-input-suffix">
                          <el-input v-model="searchForm.author" placeholder="请输入内容" prefix-icon="el-icon-search">
                            <template slot="prepend">作者：</template>
                          </el-input>
                        </div>
                      </el-col>
                      <el-col :span="6">

                        <el-date-picker
                          v-model="searchForm.created_on"
                          :range-separator="null"
                          class="filter-item search-item date-range-item"
                          end-placeholder="结束日期"
                          format="yyyy-MM-dd HH:mm:ss"
                          start-placeholder="开始日期"
                          type="daterange"
                          value-format="yyyy-MM-dd HH:mm:ss"
                        />
                      </el-col>
                    </el-row>
                  </el-form>

                </div>
              </el-col>
            </el-row>
            <el-button-group>
              <el-button type="primary" icon="el-icon-refresh" @click="handleRefresh()">刷新</el-button>
              <el-button type="primary" icon="el-icon-search" @click="handleSearch()">查询</el-button>
              <el-button type="primary" icon="el-icon-circle-plus" @click="handleAdd()">新增</el-button>
              <el-button type="primary" icon="el-icon-edit" @click="handleEdit()">修改</el-button>
              <el-button type="primary" icon="el-icon-remove" @click="handleDel()">删除</el-button>
            </el-button-group>
            <template>
              <el-table
                ref="multipleTable"
                :data="tableData"
                tooltip-effect="dark"
                highlight-current-row
                style="width: 100%;"
                @selection-change="handleSelectionChange"
              >
                <el-table-column type="selection" width="55" />
                <el-table-column type="index" width="60" />
                <el-table-column prop="categoryTitle" label="分类名称" width="180" />
                <el-table-column prop="color" label="颜色" width="180" />
                <el-table-column prop="tag" label="标签" width="180" />
                <el-table-column prop="keyword" label="关键字" width="180" />
                <el-table-column prop="title" label="标题" width="180" />
                <el-table-column prop="summary" label="简要说明" width="180" />
                <el-table-column prop="author" label="作者" width="180" />
                <el-table-column prop="authorUrl" label="作者链接" width="180" />
                <el-table-column prop="status" label="审核" width="180">
                  <template slot-scope="scope">
                    <el-tag v-if="scope.row.status === true" size="small" @click="handleAuditStatus(scope.$index, scope.row)">已审</el-tag>
                    <el-tag v-else size="small" type="danger" @click="handleAuditStatus(scope.$index, scope.row)">未审</el-tag>
                  </template>
                </el-table-column>
                <el-table-column prop="readCount" label="阅读次数" width="180" />
                <el-table-column prop="likeCount" label="喜欢次数" width="180" />
                <el-table-column prop="collectCount" label="收藏次数" width="180" />
                <el-table-column prop="shareCount" label="分享次数" width="180" />
                <el-table-column prop="commentCount" label="评论次数" width="180" />
                <el-table-column prop="topStatus" label="是否置顶" width="180">
                  <template slot-scope="scope">
                    <el-tag v-if="scope.row.topStatus === true" size="small" @click="handleTopStatus(scope.$index, scope.row)">是</el-tag>
                    <el-tag v-else size="small" type="danger" @click="handleTopStatus(scope.$index, scope.row)">否</el-tag>
                  </template>
                </el-table-column>
                <el-table-column prop="hotStatus" label="是否热点" width="180">
                  <template slot-scope="scope">
                    <el-tag v-if="scope.row.hotStatus === true" size="small" @click="handleHotStatus(scope.$index, scope.row)">是</el-tag>
                    <el-tag v-else size="small" type="danger" @click="handleHotStatus(scope.$index, scope.row)">否</el-tag>
                  </template>
                </el-table-column>
                <el-table-column prop="featured" label="是否精选" width="180">
                  <template slot-scope="scope">
                    <el-tag v-if="scope.row.featured === true" size="small" @click="handleFeatured(scope.$index, scope.row)">是</el-tag>
                    <el-tag v-else size="small" type="danger" @click="handleFeatured(scope.$index, scope.row)">否</el-tag>
                  </template>
                </el-table-column>
                <el-table-column prop="sortOrder" label="排序" width="180" />
                <el-table-column prop="comeFrom" label="来源" width="180" />
                <el-table-column prop="comeFromLink" label="来源链接" width="180" />
                <el-table-column fixed="right" label="操作" width="300">
                  <template slot-scope="scope">
                    <el-button icon="el-icon-edit" type="text" size="small" @click="handleSingleEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-button type="text" icon="el-icon-delete" class="red" @click="handleSingleDelete(scope.$index, scope.row)">删除</el-button>
                  </template>
                </el-table-column>
              </el-table>
              <el-row>
                <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
                  <div class="pagination">
                    <el-pagination
                      layout="total, sizes, prev, pager, next, jumper"
                      :total="total"
                      :page-size="searchForm.size"
                      :current-page="searchForm.page"
                      @current-change="handleCurrentChange"
                      @size-change="sizeChangeHandle"
                    />
                  </div>
                </el-col>
              </el-row>
            </template>
            <!--新增-->
            <el-dialog title="新增" :visible.sync="dialogAddVisible" width="90%" :before-close="handleClose">
              <el-form ref="addForm" :model="addForm" label-width="80px" :rules="addFormRules">
                <el-row>
                  <el-col :span="18">
                    <el-form-item label="标题" prop="title">
                      <el-input v-model="addForm.title" auto-complete="off" />
                    </el-form-item>
                    <el-form-item label="分类" prop="categoryTitle">
                      <el-popover ref="menuListPopover" placement="bottom-start" trigger="click">
                        <el-tree
                          ref="menuListTree"
                          :data="menuList"
                          :props="menuListTreeProps"
                          node-key="id"
                          :default-expand-all="true"
                          :highlight-current="true"
                          :expand-on-click-node="false"
                          @current-change="menuListTreeCurrentChangeHandle"
                        />
                      </el-popover>
                      <el-input
                        v-model="addForm.categoryTitle"
                        v-popover:menuListPopover
                        :readonly="true"
                        placeholder="点击选择分类"
                        class="menu-list__input"
                      />
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item label="色彩" prop="color">
                      <el-color-picker v-model="addForm.color" size="mini" />
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-form-item label="标签" prop="tag">
                  <el-input v-model="addForm.tag" auto-complete="off" />
                </el-form-item>
                <el-form-item label="关键字" prop="keyword">
                  <el-input v-model="addForm.keyword" auto-complete="off" />
                </el-form-item>
                <el-form-item label="简要说明" prop="summary">
                  <el-input v-model="addForm.summary" type="textarea" :rows="3" auto-complete="off" />
                </el-form-item>
                <el-form-item label="内容" prop="contents" />
                <el-form-item label="作者" prop="author">
                  <el-input v-model="addForm.author" auto-complete="off" />
                </el-form-item>
                <el-form-item label="作者链接" prop="authorUrl">
                  <el-input v-model="addForm.authorUrl" auto-complete="off" />
                </el-form-item>
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="排序" prop="sortOrder">
                      <el-input-number v-model="addForm.sortOrder" auto-complete="off" />
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="来源" prop="comeFrom">
                      <el-input v-model="addForm.comeFrom" auto-complete="off" />
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="来源链接" prop="comeFromLink">
                      <el-input v-model="addForm.comeFromLink" auto-complete="off" />
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>
              <span slot="footer" class="dialog-footer">
                <el-button @click="dialogAddVisible = false">取 消</el-button>
                <el-button type="primary" @click="handleSave('addForm')">确 定</el-button>
              </span>
            </el-dialog>
            <!--修改-->
            <el-dialog title="修改" :visible.sync="dialogEditVisible" width="90%" :before-close="handleClose">
              <el-form ref="editForm" :model="editForm" label-width="80px" :rules="editFormRules">
                <el-row>
                  <el-col :span="18">
                    <el-form-item label="标题" prop="title">
                      <el-input v-model="editForm.title" auto-complete="off" />
                    </el-form-item>
                    <el-form-item label="分类" prop="categoryTitle">
                      <el-popover ref="menuListPopover" placement="bottom-start" trigger="click">
                        <el-tree
                          ref="menuListTree"
                          :data="menuList"
                          :props="menuListTreeProps"
                          node-key="id"
                          :default-expand-all="true"
                          :highlight-current="true"
                          :expand-on-click-node="false"
                          @current-change="menuListTreeCurrentEditHandle"
                        />
                      </el-popover>
                      <el-input
                        v-model="editForm.categoryTitle"
                        v-popover:menuListPopover
                        :readonly="true"
                        placeholder="点击选择分类"
                        class="menu-list__input"
                      />
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item label="色彩" prop="color">
                      <el-color-picker v-model="editForm.color" size="mini" />
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-form-item label="标签" prop="tag">
                  <el-input v-model="editForm.tag" auto-complete="off" />
                </el-form-item>
                <el-form-item label="关键字" prop="keyword">
                  <el-input v-model="editForm.keyword" auto-complete="off" />
                </el-form-item>

                <el-form-item label="简要说明" prop="summary">
                  <el-input v-model="editForm.summary" type="textarea" :rows="3" auto-complete="off" />
                </el-form-item>
                <el-form-item label="内容" prop="contents" />
                <el-form-item label="作者" prop="author">
                  <el-input v-model="editForm.author" auto-complete="off" />
                </el-form-item>
                <el-form-item label="作者链接" prop="authorUrl">
                  <el-input v-model="editForm.authorUrl" auto-complete="off" />
                </el-form-item>
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="排序" prop="sortOrder">
                      <el-input-number v-model="editForm.sortOrder" auto-complete="off" />
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="来源" prop="comeFrom">
                      <el-input v-model="editForm.comeFrom" auto-complete="off" />
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="来源链接" prop="comeFromLink">
                      <el-input v-model="editForm.comeFromLink" auto-complete="off" />
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>
              <span slot="footer" class="dialog-footer">
                <el-button @click="dialogEditVisible = false">取 消</el-button>
                <el-button type="primary" @click="handleUpdate('editForm')">确 定</el-button>
              </span>
            </el-dialog>
          </el-tab-pane>
        </el-tabs>
        </div>
      </el-col>
    </el-row>
  </section>
</template>

<script>

import qs from 'qs'
import axios from 'axios'
export default {
  name: 'Editor',
  components: {
    // quillEditor
  },
  data() {
    return {
      editorOption: {
        placeholder: 'Hello World'
      },
      tableData: [],
      total: 1,
      multipleSelection: [],
      searchForm: {
        size: 20,
        page: 0,
        searchDate: {}
      },
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
			  this.searchForm.size = val
			  this.searchForm.page = 0
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
      this.searchForm.page = val
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
      const self = this
      self.$axios.post('/SpringArticleCategory/GetCategorysByParent', qs.stringify({
        'parentId': parentId
      })).then((res) => {
        resolve(res.data.data)
      }).catch(function(error) {
        resolve([])
        self.$message.error('数据加载失败!')
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
      if (self.multipleSelection.length == 0) {
        self.$message.warning('请选择修改项目')
      } else if (self.multipleSelection.length > 1) {
        self.$message.warning('只允许选择一项修改项目')
      } else {
        self.editForm = self.multipleSelection[0]
        self.handleListCategoryTree()
        console.log(self.editForm)
        self.dialogEditVisible = true
      }
    },
    // 显示编辑界面
    handleSingleEdit: function(index, row) {
      const self = this
      self.editForm = row
      self.handleListCategoryTree()
      this.dialogEditVisible = true
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
      if (self.searchForm.page == undefined) {
        self.searchForm.page = 0
      }
      self.$axios.post('/SpringAritlce/ListByPage?page=' + self.searchForm.page + '&size=' + self.searchForm.size,
        self.searchForm).then((res) => {
        self.tableData = res.data.data
        self.total = res.data.count
        self.loading = false
      }).catch((error) => {
        self.$message.error('数据加载失败!')
      })
    },
    // 保存
    handleSave: function(formName) {
      const self = this
      self.$refs[formName].validate((valid) => {
        if (valid) {
          self.$axios.post('/SpringAritlce/Create', this.addForm).then((res) => {
            if (res.data.code == 200) {
              self.$message.success(res.data.msg)
              self.handleSearch()
              self.dialogAddVisible = false
              self.resetForm(formName)
            } else {
              self.$message.error(res.data.msg)
            }
          })
        } else {
          this.$message.error('请填写必填项')
        }
      })
    },
    // 更新
    handleUpdate: function(formName) {
      const self = this
      self.$axios.post('/SpringAritlce/Edit', this.editForm).then((res) => {
        self.$message.success(res.data.msg)
        self.handleSearch()
        self.dialogEditVisible = false
      }).catch((error) => {
        self.$message.error('数据加载失败!')
      })
    },
    handleAuditStatus: function(index, row) {
      const self = this
      self.$axios.post('/SpringAritlce/Audit/' + row.id).then((res) => {
        if (res.data.code == 200) {
          self.$message.success(res.data.msg)
          self.handleSearch()
        } else {
          self.$message.error(res.data.msg)
        }
      })
    },
    handleHotStatus: function(index, row) {
      const self = this
      self.$axios.post('/SpringAritlce/HotStatus/' + row.id).then((res) => {
        if (res.data.code == 200) {
          self.$message.success(res.data.msg)
          self.handleSearch()
        } else {
          self.$message.error(res.data.msg)
        }
      })
    },
    handleTopStatus: function(index, row) {
      const self = this
      self.$axios.post('/SpringAritlce/TopStatus/' + row.id).then((res) => {
        if (res.data.code == 200) {
          self.$message.success(res.data.msg)
          self.handleSearch()
        } else {
          self.$message.error(res.data.msg)
        }
      })
    },
    handleFeatured: function(index, row) {
      const self = this
      self.$axios.post('/SpringAritlce/Featured/' + row.id).then((res) => {
        if (res.data.code == 200) {
          self.$message.success(res.data.msg)
          self.handleSearch()
        } else {
          self.$message.error(res.data.msg)
        }
      })
    },
    // 删除
    handleDel: function() {
      const self = this
      const ids = []
      if (self.multipleSelection.length == 0) {
        self.$message.warning('请选择删除项目')
        return
      }
      self.$confirm('确认删除该记录吗?', '提示', {
        type: 'warning'
      }).then(() => {
        self.multipleSelection.map((item) => {
          ids.push(item.id)
        })
        self.$axios.post('/SpringAritlce/SetDeleted', qs.stringify({
          'ids': ids
        }, {
          indices: false
        })).then((res) => {
          self.$message.success(res.data.msg)
          self.handleSearch()
        }).catch((error) => {
          self.$message.error('数据加载失败!')
        })
      }).catch(() => {})
    },
    handleSingleDelete: function(index, row) {
      const self = this
      self.$confirm('确认删除该记录吗?', '提示', {
        type: 'warning'
      }).then(() => {
        const para = {
          ids: row.id
        }
        self.$axios.post('/SpringAritlce/SetDeleted', qs.stringify(para))
          .then((res) => {
            self.$message.success(res.data.msg)
            self.handleSearch()
          })
          .catch((error) => {
            self.$message.error('数据加载失败!')
          })
      }).catch(() => {})
    },
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
      self.$axios.post('/SpringArticleCategory/listAllRecord').then((res) => {
        if (res.data.code == 200) {
          self.menuList = self.treeDataTranslate(res.data.data)
        } else {
          self.$message.error(res.data.msg)
        }
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
</script>

<style>
</style>
