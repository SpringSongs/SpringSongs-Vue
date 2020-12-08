<template>
  <div class="app-container">
    <el-row>
      <el-col :span="24">
        <div class="bg-white h-100 mx-1 p-1 shadowed">
          <el-tabs type="border-card">
            <el-tab-pane label="行政区域查询">
              <el-form ref="searchForm" :model="searchForm">
                <el-row>
                  <el-col :span="16">
                    <div class="flex-container">
                      <div class="flex-item">
                        <label>省</label>
                        <el-select v-model="provinceValue" placeholder="请选择省" @change="chooseProvince">
                          <el-option v-for="item in provinceData" :key="item.id" :label="item.name" :value="item.id" />
                        </el-select>
                      </div>
                      <div class="flex-item">
                        <label>市</label>
                        <el-select v-model="cityValue" placeholder="请选择市" @change="chooseCity">
                          <el-option v-for="item in cityData" :key="item.id" :label="item.name" :value="item.id" />
                        </el-select>
                      </div>
                      <div class="flex-item">
                        <label>区、县</label>
                        <el-select v-model="areaValue" placeholder="请选择区、县" @change="chooseArea">
                          <el-option v-for="item in areaData" :key="item.id" :label="item.name" :value="item.id" />
                        </el-select>
                      </div>
                    </div>
                  </el-col>
                </el-row>
              </el-form>
            </el-tab-pane>
          </el-tabs>
          <el-tabs type="border-card">
            <el-tab-pane label="行政区域">
              <div class="block">
                <el-button-group>
                  <el-button type="success" icon="el-icon-search" @click="handleRefresh()">刷新</el-button>
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
                  <el-table-column prop="name" label="名称" />
                  <el-table-column fixed="right" label="操作" width="180">
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
              <el-dialog title="新增" :visible.sync="dialogAddVisible" width="50%" :before-close="handleClose">
                <el-form ref="addForm" :model="addForm" label-width="80px" :rules="addFormRules">
                  <el-form-item label="父级" prop="parentName">
                    <el-input v-model="addForm.parentName" auto-complete="off" readonly />
                  </el-form-item>
                  <el-form-item label="名称" prop="name">
                    <el-input v-model="addForm.name" auto-complete="off" />
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
                  <el-form-item label="父级" prop="parentName">
                    <el-input v-model="editForm.parentName" auto-complete="off" readonly />
                  </el-form-item>
                  <el-form-item label="名称" prop="name">
                    <el-input v-model="editForm.name" auto-complete="off" />
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

<script src="./SpringDistrict.js">
</script>

<style>
  .block {
    padding: 10px 0px;
  }

  .flex-container {
    display: flex;
    flex-flow: row wrap;
    justify-content: space-around;
    padding: 0;
    margin: 0;
    list-style: none;
  }

  .flex-item {
    padding: 5px;
    height: auto;
    color: tomato;
    font-weight: bold;
    text-align: center;
  }
</style>
