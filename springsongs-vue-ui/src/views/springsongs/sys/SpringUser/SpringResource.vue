<template>
  <div class="app-container">
    <el-row>
      <el-col :span="24">
        <el-tabs type="border-card">
          <el-tab-pane label="子系统查询">
            <el-form ref="searchForm" :model="searchForm">
              <el-row>
                <el-col :span="6">
                  <div class="demo-input-suffix">
                    <el-select v-model="searchForm.systemId" placeholder="请选择子系统" @change="systemListChange">
                      <el-option key="" label="请选择" value="" />
                      <el-option v-for="item in systemList" :key="item.code" :label="item.title" :value="item.code" />
                    </el-select>
                  </div>
                </el-col>
              </el-row>
            </el-form>
          </el-tab-pane>
        </el-tabs>
      </el-col>
    </el-row>
    <el-row>

      <el-col :span="24">
        <div class="bg-white h-100 mx-1 p-1 shadowed">
          <el-tabs type="border-card">
            <el-tab-pane label="菜单">

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
                  :data="tableData"
                  :expand-all="expandAll"
                  row-key="id"
                  highlight-current-row
                  border

                  :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
                >
                  <el-table-column type="index" width="60" />
                  <el-table-column prop="title" label="名称" width="180" />
                  <el-table-column prop="code" label="编码" width="180" />
                  <el-table-column prop="menuFlag" label="是否菜单" width="180">
                    <template slot-scope="scope">
                      <el-tag v-if="scope.row.menuFlag === true" size="small" @click="handleAuditStatus(scope.$index, scope.row)">菜单</el-tag>
                      <el-tag v-else size="small" type="danger" @click="handleAuditStatus(scope.$index, scope.row)">按钮</el-tag>
                    </template>
                  </el-table-column>
                  <el-table-column prop="vueUrl" label="链接" width="180" />
                  <el-table-column prop="vueIcon" label="ICON" width="180" />
                  <el-table-column prop="sortCode" label="排序" width="180" />
                  <el-table-column prop="showStatus" label="是否显示" width="180">
                    <template slot-scope="scope">
                      <el-tag v-if="scope.row.showStatus === true" size="small" type="danger">不显示</el-tag>
                      <el-tag v-else size="small">显示</el-tag>
                    </template>
                  </el-table-column>
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
                  <el-table-column fixed="right" label="操作" width="300">
                    <template slot-scope="scope">
                      <el-button icon="el-icon-edit" type="text" size="small" @click="handleChild(scope.$index, scope.row)">添加子节点</el-button>
                      <el-button icon="el-icon-edit" type="text" size="small" @click="handleSingleEdit(scope.$index, scope.row)">编辑</el-button>
                      <el-button type="text" icon="el-icon-delete" class="red" @click="handleSingleDelete(scope.$index, scope.row)">删除</el-button>
                    </template>
                  </el-table-column>

                </el-table></template>
              <!--新增-->
              <el-dialog title="新增" :visible.sync="dialogAddVisible" width="50%" :before-close="handleClose">
                <el-form ref="addForm" :model="addForm" label-width="80px" :rules="addFormRules">
                  <el-form-item label="编码" prop="code">
                    <el-input v-model.trim="addForm.code" auto-complete="off" />
                  </el-form-item>
                  <el-form-item label="名称" prop="title">
                    <el-input v-model.trim="addForm.title" auto-complete="off" />
                  </el-form-item>
                  <el-form-item label="链接" prop="vueUrl">
                    <el-input v-model.trim="addForm.vueUrl" auto-complete="off" />
                  </el-form-item>
                  <el-form-item label="菜单图标" prop="icon">
                    <el-row>
                      <el-col :span="22">
                        <el-popover ref="iconListPopover" placement="bottom-start" trigger="click" popper-class="mod-menu__icon-popover">
                          <div class="grid">
                            <div v-for="item of elementIcons" :key="item" @click="handleClipboard(generateElementIconCode(item),$event)">
                              <el-tooltip placement="top">
                                <div slot="content">
                                  {{ generateElementIconCode(item) }}
                                </div>
                                <div class="icon-item">
                                  <i :class="'el-icon-' + item" />
                                  <span>{{ item }}</span>
                                </div>
                              </el-tooltip>
                            </div>
                          </div>
                        </el-popover>
                        <el-input
                          v-model.trim="addForm.vueIcon"
                          v-popover:iconListPopover
                          :readonly="true"
                          placeholder="菜单图标名称"
                          class="icon-list__input"
                        />
                      </el-col>
                      <el-col :span="2" class="icon-list__tips">
                        <el-tooltip placement="top" effect="light">
                          <div slot="content">全站推荐使用SVG Sprite, 详细请参考:<a
                            href="//github.com/daxiongYang/renren-fast-vue/blob/master/src/icons/index.js"
                            target="_blank"
                          >icons/index.js</a>描述</div>
                          <i class="el-icon-warning" />
                        </el-tooltip>
                      </el-col>
                    </el-row>
                  </el-form-item>
                  <el-form-item label="链接" prop="angularUrl">
                    <el-input v-model.trim="addForm.angularUrl" auto-complete="off" />
                  </el-form-item>
                  <el-form-item label="排序" prop="sortCode">
                    <el-input v-model.trim="addForm.sortCode" auto-complete="off" />
                  </el-form-item>
                  <el-form-item label="是否显示" prop="showStatus">
                    <el-switch
                      v-model.trim="addForm.showStatus"
                      active-color="#13ce66"
                      inactive-color="#ff4949"
                      :active-value="true"
                      :inactive-value="false"
                    />
                  </el-form-item>
                  <el-form-item label="是否菜单" prop="menuFlag">
                    <el-switch
                      v-model.trim="addForm.menuFlag"
                      active-color="#13ce66"
                      inactive-color="#ff4949"
                      :active-value="false"
                      :inactive-value="true"
                    />
                  </el-form-item>
                  <el-form-item label="允许编辑" prop="enableEdit">
                    <el-switch
                      v-model.trim="addForm.enableEdit"
                      active-color="#13ce66"
                      inactive-color="#ff4949"
                      :active-value="true"
                      :inactive-value="false"
                    />
                  </el-form-item>
                  <el-form-item label="允许删除" prop="enableDelete">
                    <el-switch
                      v-model.trim="addForm.enableDelete"
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
                  <el-form-item label="编码" prop="code">
                    <el-input v-model.trim="editForm.code" auto-complete="off" />
                  </el-form-item>
                  <el-form-item label="名称" prop="title">
                    <el-input v-model.trim="editForm.title" auto-complete="off" />
                  </el-form-item>
                  <el-form-item label="链接" prop="vueUrl">
                    <el-input v-model.trim="editForm.vueUrl" auto-complete="off" />
                  </el-form-item>
                  <el-form-item label="菜单图标" prop="icon">
                    <el-row>
                      <el-col :span="22">
                        <el-popover ref="iconListPopover" placement="bottom-start" trigger="click" popper-class="mod-menu__icon-popover">
                          <div class="grid">
                            <div v-for="item of elementIcons" :key="item" @click="handleClipboard(item,$event)">
                              <el-tooltip placement="top">
                                <div slot="content">
                                  {{ generateElementIconCode(item) }}
                                </div>
                                <div class="icon-item">
                                  <i :class="'el-icon-' + item" />
                                  <span>{{ item }}</span>
                                </div>
                              </el-tooltip>
                            </div>
                          </div>
                        </el-popover>
                        <el-input
                          v-model.trim="editForm.vueIcon"
                          v-popover:iconListPopover
                          :readonly="true"
                          placeholder="菜单图标名称"
                          class="icon-list__input"
                        />
                      </el-col>
                      <el-col :span="2" class="icon-list__tips">
                        <el-tooltip placement="top" effect="light">
                          <div slot="content">全站推荐使用SVG Sprite, 详细请参考:<a
                            href="//github.com/daxiongYang/renren-fast-vue/blob/master/src/icons/index.js"
                            target="_blank"
                          >icons/index.js</a>描述</div>
                          <i class="el-icon-warning" />
                        </el-tooltip>
                      </el-col>
                    </el-row>
                  </el-form-item>
                  <el-form-item label="链接" prop="angularUrl">
                    <el-input v-model.trim="editForm.angularUrl" auto-complete="off" />
                  </el-form-item>
                  <el-form-item label="排序" prop="sortCode">
                    <el-input v-model.trim="editForm.sortCode" auto-complete="off" />
                  </el-form-item>
                  <el-form-item label="是否显示" prop="showStatus">
                    <el-switch
                      v-model="editForm.showStatus"
                      active-color="#13ce66"
                      inactive-color="#ff4949"
                      :active-value="false"
                      :inactive-value="true"
                    />
                  </el-form-item>
                  <el-form-item label="是否菜单" prop="menuFlag">
                    <el-switch
                      v-model.trim="editForm.menuFlag"
                      active-color="#13ce66"
                      inactive-color="#ff4949"
                      :active-value="true"
                      :inactive-value="false"
                    />
                  </el-form-item>
                  <el-form-item label="允许编辑" prop="enableEdit">
                    <el-switch
                      v-model.trim="editForm.enableEdit"
                      active-color="#13ce66"
                      inactive-color="#ff4949"
                      :active-value="true"
                      :inactive-value="false"
                    />
                  </el-form-item>
                  <el-form-item label="允许删除" prop="enableDelete">
                    <el-switch
                      v-model.trim="editForm.enableDelete"
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
            </el-tab-pane>
          </el-tabs>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script src="./SpringResource.js">

</script>

<style>
  .block {
    padding: 10px 0px;
  }
  .icons-container {
    margin: 10px 20px 0;
    overflow: hidden;

    .grid {
      position: relative;
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
    }

    .icon-item {
      margin: 20px;
      height: 85px;
      text-align: center;
      width: 100px;
      float: left;
      font-size: 30px;
      color: #24292e;
      cursor: pointer;
    }

    span {
      display: block;
      font-size: 16px;
      margin-top: 10px;
    }

    .disabled {
      pointer-events: none;
    }
  }
</style>
