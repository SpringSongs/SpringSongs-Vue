<template>
  <div class="app-container">
    <el-row>
      <el-col :span="5">
        <el-tabs type="border-card">
          <el-tab-pane label="组织机构">

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
            <el-tab-pane label="用户管理查询">
              <el-form ref="searchForm" :model="searchForm">
                <el-row>
                  <el-col :span="6">
                    <div class="demo-input-suffix">
                      <el-input v-model="searchForm.userName" placeholder="请输入内容">
                        <template slot="prepend">用户名：</template>
                      </el-input>
                    </div>
                  </el-col>
                  <el-col :span="6">
                    <div class="demo-input-suffix">
                      <el-input v-model="searchForm.trueName" placeholder="请输入内容">
                        <template slot="prepend">姓名：</template>
                      </el-input>
                    </div>
                  </el-col>
                  <el-col :span="6">
                    <div class="demo-input-suffix">
                      <el-input v-model="searchForm.email" placeholder="请输入内容">
                        <template slot="prepend">邮箱：</template>
                      </el-input>
                    </div>
                  </el-col>
                  <el-col :span="6">
                    <div class="demo-input-suffix">
                      <el-input v-model="searchForm.mobile" placeholder="请输入内容">
                        <template slot="prepend">手机：</template>
                      </el-input>
                    </div>
                  </el-col>
                </el-row>
              </el-form>
            </el-tab-pane>
          </el-tabs>
          <el-tabs type="border-card">
            <el-tab-pane label="用户管理">
              <div class="block">
                <el-button-group>
                  <el-button type="primary" icon="el-icon-search" @click="handleRefresh()">刷新</el-button>
                  <el-button type="success" icon="el-icon-search" @click="handleSearch()">查询</el-button>
                  <el-button type="primary" icon="el-icon-circle-plus" @click="handleAdd()">新增</el-button>
                  <el-button type="warning" icon="el-icon-edit" @click="handleEdit()">修改</el-button>
                  <el-button type="danger" icon="el-icon-remove" @click="handleDel()">删除</el-button>
                  <el-button type="info" icon="el-icon-edit" @click="handleSetPwd()">设置密码</el-button>
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
                  <el-table-column prop="organizationName" label="组织机构" width="180" />
                  <el-table-column prop="titleName" label="职称" width="180" />
                  <el-table-column prop="userName" label="用户名" width="180" />
                  <el-table-column prop="trueName" label="真实姓名" width="180" />
                  <el-table-column prop="email" label="邮箱" width="180" />
                  <el-table-column prop="mobile" label="手机号" width="180" />
                  <el-table-column prop="enableEdit" label="允许编辑" width="180">
                    <template slot-scope="scope">
                      <el-tag
                        v-if="scope.row.enableEdit === true"
                        size="small"
                        @click="handleAuditStatus(scope.$index, scope.row)"
                      >允许</el-tag>
                      <el-tag
                        v-else
                        size="small"
                        type="danger"
                        @click="handleAuditStatus(scope.$index, scope.row)"
                      >不允许</el-tag>
                    </template>
                  </el-table-column>
                  <el-table-column prop="enableDelete" label="允许删除" width="180">
                    <template slot-scope="scope">
                      <el-tag
                        v-if="scope.row.enableDelete === true"
                        size="small"
                        @click="handleAuditStatus(scope.$index, scope.row)"
                      >允许</el-tag>
                      <el-tag
                        v-else
                        size="small"
                        type="danger"
                        @click="handleAuditStatus(scope.$index, scope.row)"
                      >不允许</el-tag>
                    </template>
                  </el-table-column>
                  <el-table-column fixed="right" label="操作" width="300">
                    <template slot-scope="scope">
                      <el-button
                        icon="el-icon-edit"
                        type="text"
                        size="small"
                        @click="handleSetRoles(scope.$index, scope.row)"
                      >分配角色</el-button>
                      <el-button
                        icon="el-icon-edit"
                        type="text"
                        size="small"
                        @click="handleViewRoles(scope.$index, scope.row)"
                      >查看角色</el-button>
                      <el-button
                        icon="el-icon-edit"
                        type="text"
                        size="small"
                        @click="handleSingleEdit(scope.$index, scope.row)"
                      >编辑</el-button>
                      <el-button
                        type="text"
                        icon="el-icon-delete"
                        class="red"
                        @click="handleSingleDelete(scope.$index, scope.row)"
                      >删除</el-button>
                    </template>
                  </el-table-column>
                </el-table>
                <el-row>
                  <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
                    <div class="pagination">
                      <el-pagination
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="searchForm.total"
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
              <el-dialog
                title="新增"
                :visible.sync="dialogAddVisible"
                width="50%"
                :before-close="handleClose"
              >
                <el-form ref="addForm" :model="addForm" label-width="80px" :rules="addFormRules">
                  <el-form-item label="用户名" prop="userName">
                    <el-input v-model="addForm.userName" auto-complete="off" />
                  </el-form-item>
                  <el-form-item label="真实姓名" prop="trueName">
                    <el-input v-model="addForm.trueName" auto-complete="off" />
                  </el-form-item>
                  <el-form-item label="邮箱" prop="email">
                    <el-input v-model="addForm.email" auto-complete="off" />
                  </el-form-item>
                  <el-form-item label="手机" prop="mobile">
                    <el-input v-model="addForm.mobile" auto-complete="off" />
                  </el-form-item>
                  <el-form-item label="组织机构" prop="organizationName">
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
                      v-model="addForm.organizationName"
                      v-popover:menuListPopover
                      :readonly="true"
                      placeholder="点击选择分类"
                      class="menu-list__input"
                    />
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
              <el-dialog
                title="修改"
                :visible.sync="dialogEditVisible"
                width="50%"
                :before-close="handleClose"
              >
                <el-form ref="editForm" :model="editForm" label-width="80px" :rules="editFormRules">
                  <el-form-item label="用户名" prop="userName">
                    <el-input v-model="editForm.userName" auto-complete="off" />
                  </el-form-item>
                  <el-form-item label="真实姓名" prop="trueName">
                    <el-input v-model="editForm.trueName" auto-complete="off" />
                  </el-form-item>
                  <el-form-item label="邮箱" prop="email">
                    <el-input v-model="editForm.email" auto-complete="off" />
                  </el-form-item>
                  <el-form-item label="手机" prop="mobile">
                    <el-input v-model="editForm.mobile" auto-complete="off" />
                  </el-form-item>
                  <el-form-item label="组织机构" prop="organizationName">
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
                      v-model="editForm.organizationName"
                      v-popover:menuListPopover
                      :readonly="true"
                      placeholder="点击选择分类"
                      class="menu-list__input"
                    />
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
              <el-dialog
                title="设置密码"
                :visible.sync="dialogPwdVisible"
                width="50%"
                :before-close="handleClose"
              >
                <el-form ref="pwdForm" :model="pwdForm" label-width="80px" :rules="pwdFormRules">
                  <el-form-item label="密码" prop="pwd">
                    <el-input v-model="pwdForm.pwd" auto-complete="off" />
                  </el-form-item>
                  <el-form-item label="确认密码" prop="configpwd">
                    <el-input v-model="pwdForm.configpwd" auto-complete="off" />
                  </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                  <el-button @click="dialogPwdVisible = false">取 消</el-button>
                  <el-button type="primary" @click="handleUpdatePwd('pwdForm')">确 定</el-button>
                </span>
              </el-dialog>

              <el-dialog
                title="分配角色"
                :visible.sync="dialogRoleVisible"
                width="50%"
                :before-close="handleClose"
              >
                <el-table
                  ref="multipleTable"
                  :data="tableRoleData"
                  tooltip-effect="dark"
                  highlight-current-row
                  style="width: 100%;"
                  @selection-change="handleSelectionChangeRole"
                >
                  <el-table-column type="selection" width="55" />
                  <el-table-column type="index" width="60" />
                  <el-table-column prop="title" label="名称" width="180" />
                  <el-table-column prop="description" label="说明" width="180" />
                </el-table>
                <el-row>
                  <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
                    <div class="pagination">
                      <el-pagination
                        layout="prev, pager, next"
                        :total="searchRoleTotal"
                        :page-size="searchRoleSize"
                        :current-page="searchRolePage"
                        @current-change="handleCurrentChangeRole"
                      />
                    </div>
                  </el-col>
                </el-row>
                <span slot="footer" class="dialog-footer">
                  <el-button @click="dialogRoleVisible = false">取 消</el-button>
                  <el-button type="primary" @click="handleSetRoleSave()">确 定</el-button>
                </span>
              </el-dialog>

              <el-dialog
                title="查看角色"
                :visible.sync="dialogRoleUserVisible"
                width="50%"
                :before-close="handleClose"
              >
                <el-table
                  ref="multipleTable"
                  :data="tableRoleUserData"
                  tooltip-effect="dark"
                  highlight-current-row
                  style="width: 100%;"
                  @selection-change="handleSelectionChangeRoleUser"
                >
                  <el-table-column type="selection" width="55" />
                  <el-table-column type="index" width="60" />
                  <el-table-column prop="title" label="名称" width="180" />
                  <el-table-column prop="description" label="说明" width="180" />
                </el-table>
                <el-row>
                  <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
                    <div class="pagination">
                      <el-pagination
                        layout="prev, pager, next"
                        :total="searchRoleUserTotal"
                        :page-size="searchRoleUserSize"
                        :current-page="searchRoleUserPage"
                        @current-change="handleCurrentChangeRoleUser"
                      />
                    </div>
                  </el-col>
                </el-row>
              </el-dialog>
            </el-tab-pane>
          </el-tabs>
        </div>
      </el-col>
    </el-row>
  </div></template>

<script src="./SpringUser.js">
</script>

<style>
  .block {
    padding: 10px 0px;
  }
</style>
