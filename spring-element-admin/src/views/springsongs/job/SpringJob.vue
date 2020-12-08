<template>
  <div class="app-container">
    <el-row>
      <el-col :span="24">
        <div class="bg-white h-100 mx-1 p-1 shadowed">
          <el-tabs type="border-card">
            <el-tab-pane label="任务运行管理">
              <el-form ref="searchForm" :model="searchForm">
                <el-row>
                  <el-col :span="6">
                    <div class="demo-input-suffix">
                      <el-input v-model="searchForm.groupCode" placeholder="请输入内容">
                        <template slot="prepend">组别编码：</template>
                      </el-input>
                    </div>
                  </el-col>
                  <el-col :span="6">
                    <div class="demo-input-suffix">
                      <el-input v-model="searchForm.taskTitle" placeholder="请输入内容">
                        <template slot="prepend">任务名称：</template>
                      </el-input>
                    </div>
                  </el-col>
                  <el-col :span="6">
                    <div class="demo-input-suffix">
                      <el-input v-model="searchForm.status" placeholder="请输入内容">
                        <template slot="prepend">任务状态：</template>
                      </el-input>
                    </div>
                  </el-col>
                  <el-col :span="6">
                    <div class="demo-input-suffix">
                      <el-input v-model="searchForm.remark" placeholder="请输入内容">
                        <template slot="prepend">备注：</template>
                      </el-input>
                    </div>
                  </el-col>
                </el-row>
              </el-form>
            </el-tab-pane>
          </el-tabs>
          <el-tabs type="border-card">
            <el-tab-pane label="任务运行管理">

              <div class="block">
                <el-button-group>
                  <el-button type="success" icon="el-icon-search" @click="handleSearch()">查询</el-button>
                  <el-button type="primary" icon="el-icon-circle-plus" @click="handleAdd()">新增</el-button>
                  <el-button type="warning" icon="el-icon-edit" @click="handleEdit()">修改</el-button>
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
                  <el-table-column prop="groupCode" label="组别编码" width="180" />
                  <el-table-column prop="groupTitle" label="组别名称" width="180" />
                  <el-table-column prop="taskTitle" label="任务名称" width="180" />
                  <el-table-column prop="taskClassTitle" label="任务类" width="400" />
                  <el-table-column prop="cronExpression" label="时间表达式" width="180" />
                  <el-table-column prop="status" label="状态" width="180">
                    <template slot-scope="scope">
                      <el-tag v-if="scope.row.status === 0" size="small">已创建</el-tag>
                      <el-tag v-else-if="scope.row.status === 1" size="small">已暂停</el-tag>
                      <el-tag v-else-if="scope.row.status === 2" size="small">已恢复</el-tag>
                      <el-tag v-else-if="scope.row.status === 3" size="small">已更新</el-tag>
                      <el-tag v-else-if="scope.row.status === 4" size="small">已删除</el-tag>
                    </template>
                  </el-table-column>
                  <el-table-column prop="remark" label="备注" width="180" />
                  <el-table-column fixed="right" label="操作" width="250">
                    <template slot-scope="scope">
                      <el-button icon="el-icon-edit" type="text" size="small" @click="handlePauseEdit(scope.$index, scope.row)">暂停</el-button>
                      <el-button icon="el-icon-edit" type="text" size="small" @click="handleResumeEdit(scope.$index, scope.row)">恢复</el-button>
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
                  <el-form-item label="组别编码" prop="groupCode">
                    <el-select v-model="addForm.groupCode" placeholder="请选择任务组别" @change="springJobGroupListAddChange">
                      <el-option key="" label="请选择" value="" />
                      <el-option v-for="item in springJobGroups" :key="item.code" :label="item.title" :value="item.code" />
                    </el-select>
                  </el-form-item>

                  <el-form-item label="任务名称" prop="taskTitle">
                    <el-input v-model="addForm.taskTitle" auto-complete="off" />
                  </el-form-item>
                  <el-form-item label="任务类" prop="taskClassTitle">
                    <el-input v-model="addForm.taskClassTitle" auto-complete="off" />
                  </el-form-item>
                  <el-form-item label="时间表达式" prop="cronExpression">
                    <el-input v-model="addForm.cronExpression" auto-complete="off" />
                  </el-form-item>
                  <el-form-item label="备注" prop="remark">
                    <el-input v-model="addForm.remark" auto-complete="off" />
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
                  <el-form-item label="组别编码" prop="groupCode">
                    <el-select v-model="editForm.groupCode" placeholder="请选择任务组别" @change="springJobGroupListEditChange">
                      <el-option key="" label="请选择" value="" />
                      <el-option v-for="item in springJobGroups" :key="item.code" :label="item.title" :value="item.code" />
                    </el-select>
                  </el-form-item>
                  <el-form-item label="任务名称" prop="taskTitle">
                    <el-input v-model="editForm.taskTitle" auto-complete="off" />
                  </el-form-item>
                  <el-form-item label="任务类" prop="taskClassTitle">
                    <el-input v-model="editForm.taskClassTitle" auto-complete="off" />
                  </el-form-item>
                  <el-form-item label="时间表达式" prop="cronExpression">
                    <el-input v-model="editForm.cronExpression" auto-complete="off" />
                  </el-form-item>
                  <el-form-item label="备注" prop="remark">
                    <el-input v-model="editForm.remark" auto-complete="off" />
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

<script src="./SpringJob.js">
</script>

<style>
  .block {
    padding: 10px 0px;
  }
</style>
