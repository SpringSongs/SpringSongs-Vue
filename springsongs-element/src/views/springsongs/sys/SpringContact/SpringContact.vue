<template>
  <div class="app-container">
    <el-row>
      <el-col :span="24">
        <div class="bg-white h-100 mx-1 p-1 shadowed">
          <el-tabs type="border-card">
            <el-tab-pane label="名片管理查询">
              <el-form ref="searchForm" :model="searchForm">
                <el-row>
                  <el-col :span="6">
                    <div class="demo-input-suffix">
                      <el-input v-model="searchForm.company" placeholder="请输入内容">
                        <template slot="prepend">公司：</template>
                      </el-input>
                    </div>
                  </el-col>
                  <el-col :span="6">
                    <div class="demo-input-suffix">
                      <el-input v-model="searchForm.title" placeholder="请输入内容">
                        <template slot="prepend">职称：</template>
                      </el-input>
                    </div>
                  </el-col>
                  <el-col :span="6">
                    <div class="demo-input-suffix">
                      <el-input v-model="searchForm.username" placeholder="请输入内容">
                        <template slot="prepend">名称：</template>
                      </el-input>
                    </div>
                  </el-col>
                  <el-col :span="6">
                    <div class="demo-input-suffix">
                      <el-input v-model="searchForm.title" placeholder="请输入内容">
                        <template slot="prepend">职称：</template>
                      </el-input>
                    </div>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="6">
                    <div class="demo-input-suffix">
                      <el-input v-model="searchForm.mobile" placeholder="请输入内容">
                        <template slot="prepend">手机：</template>
                      </el-input>
                    </div>
                  </el-col>
                  <el-col :span="6">
                    <div class="demo-input-suffix">
                      <el-input v-model="searchForm.fax" placeholder="请输入内容">
                        <template slot="prepend">传真：</template>
                      </el-input>
                    </div>
                  </el-col>
                  <el-col :span="6">
                    <div class="demo-input-suffix">
                      <el-input v-model="searchForm.Qq" placeholder="请输入内容">
                        <template slot="prepend">QQ：</template>
                      </el-input>
                    </div>
                  </el-col>
                  <el-col :span="6">
                    <div class="demo-input-suffix">
                      <el-input v-model="searchForm.webchat" placeholder="请输入内容">
                        <template slot="prepend">微信：</template>
                      </el-input>
                    </div>
                  </el-col>
                </el-row>

              </el-form>
            </el-tab-pane>
          </el-tabs>
          <el-tabs type="border-card">
            <el-tab-pane label="名片管理">
              <div class="block">
                <el-button-group>
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
                  border
                  @selection-change="handleSelectionChange"
                >
                  <el-table-column type="selection" width="55" />
                  <el-table-column type="index" width="60" />
                  <el-table-column prop="company" label="公司" width="180" />
                  <el-table-column prop="title" label="职称" width="180" />
                  <el-table-column prop="username" label="名称" width="180" />
                  <el-table-column prop="email" label="邮箱" width="180" />
                  <el-table-column prop="web" label="网址" width="180" />
                  <el-table-column prop="fax" label="传真" width="180" />
                  <el-table-column prop="qq" label="QQ" width="180" />
                  <el-table-column prop="webchat" label="微信" width="180" />
                  <el-table-column prop="mobile" label="手机" width="180" />
                  <el-table-column prop="tel" label="电话" width="180" />
                  <el-table-column prop="sortCode" label="排序" width="180" />
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
                  <el-form-item label="公司" prop="company">
                    <el-input v-model="addForm.company" auto-complete="off" />
                  </el-form-item>
                  <el-form-item label="职称" prop="title">
                    <el-input v-model="addForm.title" auto-complete="off" />
                  </el-form-item>
                  <el-form-item label="名称" prop="username">
                    <el-input v-model="addForm.username" auto-complete="off" />
                  </el-form-item>
                  <el-form-item label="邮箱" prop="email">
                    <el-input v-model="addForm.email" auto-complete="off" />
                  </el-form-item>
                  <el-form-item label="网址" prop="web">
                    <el-input v-model="addForm.web" auto-complete="off" />
                  </el-form-item>
                  <el-form-item label="传真" prop="fax">
                    <el-input v-model="addForm.fax" auto-complete="off" />
                  </el-form-item>
                  <el-form-item label="QQ" prop="qq">
                    <el-input v-model="addForm.qq" auto-complete="off" />
                  </el-form-item>
                  <el-form-item label="微信" prop="webchat">
                    <el-input v-model="addForm.webchat" auto-complete="off" />
                  </el-form-item>
                  <el-form-item label="手机" prop="mobile">
                    <el-input v-model="addForm.mobile" auto-complete="off" />
                  </el-form-item>
                  <el-form-item label="电话" prop="tel">
                    <el-input v-model="addForm.tel" auto-complete="off" />
                  </el-form-item>
                  <el-form-item label="排序" prop="sortCode">
                    <el-input-number v-model="addForm.sortCode" auto-complete="off" />
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
                  <el-form-item label="公司" prop="company">
                    <el-input v-model="editForm.company" auto-complete="off" />
                  </el-form-item>
                  <el-form-item label="职称" prop="title">
                    <el-input v-model="editForm.title" auto-complete="off" />
                  </el-form-item>
                  <el-form-item label="名称" prop="username">
                    <el-input v-model="editForm.username" auto-complete="off" />
                  </el-form-item>
                  <el-form-item label="邮箱" prop="email">
                    <el-input v-model="editForm.email" auto-complete="off" />
                  </el-form-item>
                  <el-form-item label="网址" prop="web">
                    <el-input v-model="editForm.web" auto-complete="off" />
                  </el-form-item>
                  <el-form-item label="传真" prop="fax">
                    <el-input v-model="editForm.fax" auto-complete="off" />
                  </el-form-item>
                  <el-form-item label="QQ" prop="qq">
                    <el-input v-model="editForm.qq" auto-complete="off" />
                  </el-form-item>
                  <el-form-item label="微信" prop="webchat">
                    <el-input v-model="editForm.webchat" auto-complete="off" />
                  </el-form-item>
                  <el-form-item label="手机" prop="mobile">
                    <el-input v-model="editForm.mobile" auto-complete="off" />
                  </el-form-item>
                  <el-form-item label="电话" prop="tel">
                    <el-input v-model="editForm.tel" auto-complete="off" />
                  </el-form-item>
                  <el-form-item label="排序" prop="sortCode">
                    <el-input-number v-model="editForm.sortCode" auto-complete="off" />
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

<script src="./SpringContact.js">
</script>

<style>
  .block {
    padding: 10px 0px;
  }
</style>
