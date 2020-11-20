<template>
  <div class="app-container">
    <el-row>
      <el-col :span="4">
        <el-tabs type="border-card">
          <el-tab-pane label="文章例表查询">
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
              <el-tree lazy node-key="id" :load="handleLoadTrea" :props="ListTreeProps" highlight-current @node-click="handleNodeClick" />
            </div>
          </el-tab-pane>
        </el-tabs>
      </el-col>
      <el-col :span="20">
        <el-tabs type="border-card">
          <el-tab-pane label="内容查询">
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
          </el-tab-pane>
        </el-tabs>
        <el-tabs type="border-card">
          <el-tab-pane label="内容管理">
            <div class="block">
              <el-button-group>
                <el-button type="primary" icon="el-icon-search" @click="handleRefresh()">刷新</el-button>
                <el-button type="success" icon="el-icon-search" @click="handleSearch()">查询</el-button>
                <el-button type="primary" icon="el-icon-circle-plus" @click="handleAdd()">新增</el-button>
                <el-button type="warning" icon="el-icon-edit" @click="handleEdit()">修改</el-button>
                <el-button type="danger" icon="el-icon-remove" @click="handleDel()">删除</el-button>
              </el-button-group>
            </div>

            <el-table
              ref="multipleTable"
              :data="tableData"
              tooltip-effect="dark"
              highlight-current-row
              style="width: 100%;"
              border
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
      </el-col>
    </el-row>
  </div>
</template>

<script src="./SpringArticle.js">
</script>
<style>
  .block {
    padding: 10px 0px;
  }
</style>
