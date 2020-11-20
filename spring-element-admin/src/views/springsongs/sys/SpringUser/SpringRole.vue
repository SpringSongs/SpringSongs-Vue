<template>
  <div class="app-container">
    <el-row>
      <el-col :span="24">
        <div class="bg-white h-100 mx-1 p-1 shadowed">
          <el-tabs type="border-card">
            <el-tab-pane label="角色查询">
              <el-form ref="searchForm" :model="searchForm">
                <el-row>
                  <el-col :span="6">
                    <div class="demo-input-suffix">
                      <el-input v-model="searchForm.title" placeholder="请输入内容">
                        <template slot="prepend">名称：</template>
                      </el-input>
                    </div>
                  </el-col>
                </el-row>
              </el-form>
            </el-tab-pane>
          </el-tabs>
          <el-tabs type="border-card">
            <el-tab-pane label="角色管理">

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
                  <el-table-column prop="title" label="名称" width="180" />
                  <el-table-column prop="desc" label="说明" width="180" />
                  <el-table-column prop="enableEdit" label="允许编辑" width="180">
                    <template slot-scope="scope">
                      <el-tag v-if="scope.row.enableEdit === true" size="small" @click="handleAuditStatus(scope.$index, scope.row)">允许</el-tag>
                      <el-tag v-else size="small" type="danger" @click="handleAuditStatus(scope.$index, scope.row)">不允许</el-tag>
                    </template>
                  </el-table-column>
                  <el-table-column prop="enableDelete" label="允许删除" width="180">
                    <template slot-scope="scope">
                      <el-tag v-if="scope.row.enableDelete === true" size="small" @click="handleAuditStatus(scope.$index, scope.row)">允许</el-tag>
                      <el-tag v-else size="small" type="danger" @click="handleAuditStatus(scope.$index, scope.row)">不允许</el-tag>
                    </template>
                  </el-table-column>
                  <el-table-column fixed="right" label="操作" width="400">
                    <template slot-scope="scope">
                      <el-button icon="el-icon-edit" type="text" size="small" @click="handleSetUsers(scope.$index, scope.row)">分配用户</el-button>
                      <el-button icon="el-icon-edit" type="text" size="small" @click="handleViewUsers(scope.$index, scope.row)">查看用户</el-button>
                      <el-button icon="el-icon-edit" type="text" size="small" @click="handleSetAuthority(scope.$index, scope.row)">授权</el-button>
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
              <el-dialog title="新增" :visible.sync="dialogAddVisible" width="50%" :before-close="handleClose">
                <el-form ref="addForm" :model="addForm" label-width="80px" :rules="addFormRules">
                  <el-form-item label="名称" prop="title">
                    <el-input v-model="addForm.title" auto-complete="off" />
                  </el-form-item>
                  <el-form-item label="说明" prop="desc">
                    <el-input v-model="addForm.desc" auto-complete="off" />
                  </el-form-item>
                  <el-form-item label="允许编辑" prop="enableEdit">
                    <el-switch
                      v-model="addForm.enableEdit"
                      active-color="#13ce66"
                      inactive-color="#ff4949"
                      :active-value="true"
                      :inactive-value="false"
                    />
                  </el-form-item>
                  <el-form-item label="允许删除" prop="enableDelete">
                    <el-switch
                      v-model="addForm.enableDelete"
                      active-color="#13ce66"
                      inactive-color="#ff4949"
                      :active-value="true"
                      :inactive-value="false"
                    />
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
                  <el-form-item label="名称" prop="title">
                    <el-input v-model="editForm.title" auto-complete="off" />
                  </el-form-item>
                  <el-form-item label="说明" prop="desc">
                    <el-input v-model="editForm.desc" auto-complete="off" />
                  </el-form-item>
                  <el-form-item label="允许编辑" prop="enableEdit">
                    <el-switch
                      v-model="editForm.enableEdit"
                      active-color="#13ce66"
                      inactive-color="#ff4949"
                      :active-value="true"
                      :inactive-value="false"
                    />
                  </el-form-item>
                  <el-form-item label="允许删除" prop="enableDelete">
                    <el-switch
                      v-model="editForm.enableDelete"
                      active-color="#13ce66"
                      inactive-color="#ff4949"
                      :active-value="true"
                      :inactive-value="false"
                    />
                  </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                  <el-button @click="dialogEditVisible = false">取 消</el-button>
                  <el-button type="primary" @click="handleUpdate('editForm')">确 定</el-button>
                </span>
              </el-dialog>

              <el-dialog title="分配用户" :visible.sync="dialogSetUsersVisible" width="50%" :before-close="handleClose">
                <el-table
                  ref="multipleTable"
                  :data="tableUserData"
                  tooltip-effect="dark"
                  highlight-current-row
                  style="width: 100%;"
                  @selection-change="handleSelectionChangeUserData"
                >
                  <el-table-column type="selection" width="55" />
                  <el-table-column type="index" width="60" />
                  <el-table-column prop="userName" label="用户名" width="180" />
                  <el-table-column prop="trueName" label="真实姓名" width="180" />
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
                <span slot="footer" class="dialog-footer">
                  <el-button @click="dialogSetUsersVisible = false">取 消</el-button>
                  <el-button type="primary" @click="handleSetUsersSave()">确 定</el-button>
                </span>
              </el-dialog>

              <el-dialog title="用户" :visible.sync="dialogRoleUsersVisible" width="50%" :before-close="handleClose">
                <el-table
                  ref="multipleTable"
                  :data="tableRoleUserData"
                  tooltip-effect="dark"
                  highlight-current-row
                  style="width: 100%;"
                  @selection-change="handleSelectionChangeRoleUserData"
                >
                  <el-table-column type="selection" width="55" />
                  <el-table-column type="index" width="60" />
                  <el-table-column prop="userName" label="用户名" width="180" />
                  <el-table-column prop="trueName" label="真实姓名" width="180" />
                </el-table>
                <el-row>
                  <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
                    <div class="pagination">
                      <el-pagination
                        layout="prev, pager, next"
                        :total="totalRoleUser"
                        :page-size="20"
                        :current-page="searchUserRoleForm.page"
                        @current-change="handleCurrentChangeRoleUser"
                      />
                    </div>
                  </el-col>
                </el-row>
              </el-dialog>
              <el-dialog title="授权" :visible.sync="dialogAuthorityVisible" width="50%" :before-close="handleClose">
                <div class="tree">
                  <el-tree
                    ref="menuListTree"
                    :data="menuList"
                    show-checkbox
                    :props="menuListTreeProps"
                    node-key="id"
                    :default-expand-all="true"
                    :highlight-current="true"
                    :expand-on-click-node="false"
                  />
                </div>
                <span slot="footer" class="dialog-footer">
                  <el-button @click="dialogAuthorityVisible = false">取 消</el-button>
                  <el-button type="primary" @click="handleAuthoritySave()">确 定</el-button>
                </span>
              </el-dialog>
            </el-tab-pane>
          </el-tabs>
        </div>
      </el-col>
    </el-row>
  </div></template>

<script src="./SpringRole.js">

</script>
<style>
	.tree {
		overflow-y: scrolls;
		overflow-x: scroll;
		width: 200px;
		height: 300px;
	}

	.el-tree {
		width: 200px;
		display: inline-block !important;
	}

  .block {
    padding: 10px 0px;
  }
</style>
