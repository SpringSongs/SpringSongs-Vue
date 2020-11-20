<template>
  <div class="app-container">
    <el-row>
      <el-col :span="4">
        <el-tabs type="border-card">
          <el-tab-pane label="文章例表">
            <div>
              <el-button @click="handleArticle()">文章例表</el-button>
            </div>
            <div>
              <el-button @click="handleArticleCategory()">文章分类</el-button>
            </div>
            <div>
              <el-button>文章评论</el-button>
            </div>
          </el-tab-pane>
        </el-tabs>
      </el-col>
      <el-col :span="20">
        <div class="bg-white h-100 mx-1 p-1 shadowed">
          <el-tabs type="border-card">
            <el-tab-pane label="评论管理">
              <el-form ref="searchForm" :model="searchForm">
                <el-row>
                  <el-col :span="6">
                    <div class="demo-input-suffix">
                      <el-input v-model="searchForm.content" placeholder="请输入内容">
                        <template slot="prepend">评论内容：</template>
                      </el-input>
                    </div>
                  </el-col>
                  <el-col :span="6">
                    <div class="demo-input-suffix">
                      <el-input v-model="searchForm.createBy" placeholder="请输入内容">
                        <template slot="prepend">评论人名称：</template>
                      </el-input>
                    </div>
                  </el-col>
                </el-row>
              </el-form>
            </el-tab-pane>
          </el-tabs>
          <el-tabs type="border-card">
            <el-tab-pane label="评论管理">
              <el-button-group>
                <el-button type="primary" icon="el-icon-search" @click="handleSearch()">查询</el-button>
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
                  <el-table-column prop="content" label="评论内容" width="180" />
                  <el-table-column prop="auditFlag" label="审核" width="180">
                    <template slot-scope="scope">
                      <el-tag v-if="scope.row.auditFlag === true" size="small" @click="handleAuditStatus(scope.$index, scope.row)">已审</el-tag>
                      <el-tag v-else size="small" type="danger" @click="handleAuditStatus(scope.$index, scope.row)">未审</el-tag>
                    </template>
                  </el-table-column>
                  <el-table-column prop="sortCode" label="排序" width="180" />
                  <el-table-column fixed="right" label="操作" width="300">
                    <template slot-scope="scope">
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
              <el-dialog title="新增" :visible.sync="dialogAddVisible" width="50%" :before-close="handleClose">
                <el-form ref="addForm" :model="addForm" label-width="80px" :rules="addFormRules">
                  <el-form-item label="评论内容" prop="content">
                    <el-input v-model="addForm.content" auto-complete="off" />
                  </el-form-item>
                  <el-form-item label="排序" prop="sortCode">
                    <el-input v-model="addForm.sortCode" auto-complete="off" />
                  </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                  <el-button @click="dialogAddVisible = false">取 消</el-button>
                  <el-button type="primary" @click="handleSave('addForm')">确 定</el-button>
                </span>
              </el-dialog>
              <!--修改-->
              <el-dialog title="修改" :visible.sync="dialogEditVisible" width="50%" :before-close="handleClose">
                <el-form ref="editForm" :model="editForm" label-width="80px" :rules="editFormRules">
                  <el-form-item label="评论内容" prop="content">
                    <el-input v-model="editForm.content" auto-complete="off" />
                  </el-form-item>
                  <el-form-item label="排序" prop="sortCode">
                    <el-input v-model="editForm.sortCode" auto-complete="off" />
                  </el-form-item>
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
  </div></template>

<script src="./SpringArticleComment.js">

</script>

<style>
  .block {
    padding: 10px 0px;
  }
</style>
