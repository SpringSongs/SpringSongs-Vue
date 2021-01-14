<template>
  <div class="app-container">
    <el-row>
      <el-col :span="5">
        <el-tabs type="border-card">
          <el-tab-pane label="文件类型">

            <div class="treesearch">
              <el-tree
                ref="menuListTree"
                :data="menuList"
                :props="menuListTreeProps"
                node-key="id"
                :default-expand-all="true"
                :highlight-current="true"
                :expand-on-click-node="false"
                @current-change="menuListTreeCurrentSearchHandle"
              />
            </div>
          </el-tab-pane>
        </el-tabs>
      </el-col>
      <el-col :span="19">
        <div class="bg-white h-100 mx-1 p-1 shadowed">
          <el-tabs type="border-card">
            <el-tab-pane label="我的文件查询">
              <el-form ref="searchForm" :model="searchForm">
                <el-row>
                  <el-col :span="6">
                    <div class="demo-input-suffix">
                      <el-input v-model="searchForm.description" placeholder="请输入内容">
                        <template slot="prepend">说明：</template>
                      </el-input>
                    </div>
                  </el-col>
                </el-row>
              </el-form>
            </el-tab-pane>
          </el-tabs>
          <el-tabs type="border-card">
            <el-tab-pane label="我的文件">
              <div class="block">
                <el-button-group>
                  <el-button type="primary" icon="el-icon-search" @click="handleRefresh()">刷新</el-button>
                  <el-button type="success" icon="el-icon-search" @click="handleSearch()">查询</el-button>
                  <el-button type="primary" icon="el-icon-circle-plus" @click="handleAdd()">新增</el-button>
                  <el-button type="warning" icon="el-icon-edit" @click="handleEdit()">修改</el-button>
                  <el-button type="danger" icon="el-icon-remove" @click="handleDel()">删除</el-button>
                </el-button-group>
              </div>
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
                  <el-table-column prop="folderName" label="文件夹名称" width="180" />
                  <el-table-column prop="path" label="文件路径" width="180" />
                  <el-table-column prop="description" label="说明" width="180" />
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
                        :page-size="size"
                        :current-page="page"
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
                  <el-upload
                    class="upload-demo"
                    action="http://localhost:8091/SpringAttachment/Upload"
                    :with-credentials="true"
                    :show-file-list="false"
                    :on-success="handlerUploadSuccess"
                  >
                    <el-button size="small" type="primary">点击上传</el-button>
                  </el-upload>
                  <el-form-item label="文件路径" prop="path">
                    <el-input v-model="addForm.path" auto-complete="off" readonly="readonly" />
                  </el-form-item>
                  <el-form-item label="文件说明" prop="path">
                    <el-input v-model="addForm.description" auto-complete="off" />
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
                  <el-form-item label="文件路径" prop="path">
                    <el-input v-model="editForm.path" auto-complete="off" readonly="readonly" />
                  </el-form-item>
                  <el-form-item label="文件说明" prop="path">
                    <el-input v-model="editForm.description" auto-complete="off" />
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

<script src="./SpringAttachment.js">

</script>

<style>
  .block {
    padding: 10px 0px;
  }
</style>
