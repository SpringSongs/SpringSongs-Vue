<template>
  <div class="app-container">
    <el-row>

      <el-col :span="24">
        <div class="bg-white h-100 mx-1 p-1 shadowed">
          <el-tabs type="border-card">
            <el-tab-pane label="文章分类">

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
                  row-key="id"
                  highlight-current-row
                  border
                  default-expand-all
                  :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
                >
                  <el-table-column type="selection" width="55" />
                  <el-table-column type="index" width="60" />
                  <el-table-column prop="code" label="编码" width="180" />
                  <el-table-column prop="title" label="标题" width="180" />
                  <el-table-column prop="keywords" label="关键词" width="180" />
                  <el-table-column prop="description" label="描述" width="180" />
                  <el-table-column prop="sortOrder" label="排序" width="180" />
                  <el-table-column fixed="right" label="操作" width="250">
                    <template slot-scope="scope">
                      <el-button icon="el-icon-edit" type="text" size="small" @click="handleChild(scope.$index, scope.row)">添加子节点</el-button>
                      <el-button icon="el-icon-edit" type="text" size="small" @click="handleSingleEdit(scope.$index, scope.row)">编辑</el-button>
                      <el-button type="text" icon="el-icon-delete" class="red" @click="handleSingleDelete(scope.$index, scope.row)">删除</el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </template>
              <!--新增-->
              <el-dialog title="新增" :visible.sync="dialogAddVisible" width="50%" :before-close="handleClose">
                <el-form ref="addForm" :model="addForm" label-width="80px" :rules="addFormRules">
                  <el-form-item label="编码" prop="code">
                    <el-input v-model="addForm.code" auto-complete="off" />
                  </el-form-item>
                  <el-form-item label="标题" prop="title">
                    <el-input v-model="addForm.title" auto-complete="off" />
                  </el-form-item>
                  <el-form-item label="关键词" prop="keywords">
                    <el-input v-model="addForm.keywords" auto-complete="off" />
                  </el-form-item>
                  <el-form-item label="描述" prop="description">
                    <el-input v-model="addForm.description" auto-complete="off" />
                  </el-form-item>
                  <el-form-item label="排序" prop="sortOrder">
                    <el-input-number v-model="addForm.sortOrder" auto-complete="off" />
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
                    <el-input v-model="editForm.code" auto-complete="off" />
                  </el-form-item>
                  <el-form-item label="标题" prop="title">
                    <el-input v-model="editForm.title" auto-complete="off" />
                  </el-form-item>
                  <el-form-item label="关键词" prop="keywords">
                    <el-input v-model="editForm.keywords" auto-complete="off" />
                  </el-form-item>
                  <el-form-item label="描述" prop="description">
                    <el-input v-model="editForm.description" auto-complete="off" />
                  </el-form-item>
                  <el-form-item label="排序" prop="sortOrder">
                    <el-input-number v-model="editForm.sortOrder" auto-complete="off" />
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

<script src="./SpringArticleCategory.js">

</script>

<style>
  .block {
    padding: 10px 0px;
  }
</style>
