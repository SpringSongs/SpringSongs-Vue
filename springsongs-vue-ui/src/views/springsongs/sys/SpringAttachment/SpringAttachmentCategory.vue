<template>
  <div class="app-container">
    <el-row>

      <el-col :span="24">
        <div class="bg-white h-100 mx-1 p-1 shadowed">
          <el-tabs type="border-card">
            <el-tab-pane label="文件类型">
              <div class="block">
                <el-button-group>
                  <el-button type="success" icon="el-icon-search" @click="handleSearch()">查询</el-button>
                  <el-button type="primary" icon="el-icon-circle-plus" @click="handleAdd()">新增</el-button>
                </el-button-group>
              </div>
              <el-table
                :data="tableData"
                :expand-all="expandAll"
                row-key="id"
                highlight-current-row
                border
                default-expand-all
                :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
              >
                <el-table-column prop="text" label="名称">
                  <template slot-scope="scope">
                    <span>{{ scope.row.text }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="操作" width="250">
                  <template slot-scope="scope">
                    <el-button icon="el-icon-edit" type="text" size="small" @click="handleChild(scope.$index, scope.row)">添加子节点</el-button>
                    <el-button icon="el-icon-edit" type="text" size="small" @click="handleSingleEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-button type="text" icon="el-icon-delete" class="red" @click="handleSingleDelete(scope.$index, scope.row)">删除</el-button>
                  </template>
                </el-table-column>
              </el-table>
              <!--新增-->
              <el-dialog title="新增" :visible.sync="dialogAddVisible" width="50%" :before-close="handleClose">
                <el-form ref="addForm" :model="addForm" label-width="80px" :rules="addFormRules">
                  <el-form-item label="上级主键" prop="parentId">
                    <el-input v-model="addForm.parentId" auto-complete="off" readonly />
                  </el-form-item>
                  <el-form-item label="名称" prop="title">
                    <el-input v-model="addForm.title" auto-complete="off" />
                  </el-form-item>
                  <el-form-item label="说明" prop="description">
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
                  <el-form-item label="上级主键" prop="parentId">
                    <el-input v-model="editForm.parentId" auto-complete="off" readonly />
                  </el-form-item>
                  <el-form-item label="名称" prop="title">
                    <el-input v-model="editForm.title" auto-complete="off" />
                  </el-form-item>
                  <el-form-item label="说明" prop="description">
                    <el-input v-model="editForm.description" auto-complete="off" />
                  </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                  <el-button @click="dialogEditVisible = false">取 消</el-button>
                  <el-button type="primary" @click="handleUpdate('editForm')">确 定</el-button>
                </span>
              </el-dialog>
              <!--修改-->

            </el-tab-pane>
          </el-tabs>
        </div>
      </el-col>
    </el-row>
  </div></template>

<script src="./SpringAttachmentCategory.js">
</script>

<style>
.block {
  padding: 10px 0px;
}

.guns-table-expand {
  font-size: 0;
}
.guns-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}

</style>
