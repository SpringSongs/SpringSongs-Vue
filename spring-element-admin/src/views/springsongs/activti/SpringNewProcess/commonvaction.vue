<template>
  <div class="app-container">
    <el-row>
      <el-col :span="24">
        <div class="bg-white h-100 mx-1 p-1 shadowed">
          <el-tabs type="border-card">
            <el-tab-pane label="请假流程">
              <div class="block">
                <el-button-group>
                  <el-button type="success" icon="el-icon-search" @click="handleSearch()">查询</el-button>
                  <el-button type="primary" icon="el-icon-circle-plus" @click="handleAdd()">新增</el-button>
                  <el-button type="warning" icon="el-icon-edit" @click="handleEdit()">修改</el-button>
                  <el-button type="danger" icon="el-icon-remove" @click="handleDel()">删除</el-button>
                  <el-button type="info" icon="el-icon-remove" @click="handleSubmit()">提交申请</el-button>
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
                  <el-table-column prop="trueName" label="申请人" width="180" />
                  <el-table-column prop="title" label="标题" width="180" />
                  <el-table-column prop="vacationType" label="请假类型" width="180" />
                  <el-table-column prop="reason" label="请假申请原因" width="180" />
                  <el-table-column prop="time" label="请假天数" width="180" />
                  <el-table-column prop="startTime" label="开始时间" width="180" />
                  <el-table-column prop="endTime" label="结束时间" width="180" />
                  <el-table-column prop="processStatus" label="流程状态" width="180" />
                  <el-table-column prop="createdOn" label="创建时间" width="180" />
                  <el-table-column prop="submittime" label="提交时间" width="180" />
                  <el-table-column label="操作" fixed="right" width="300">
                    <template slot-scope="scope">
                      <el-button icon="el-icon-edit" type="text" size="small" @click="handleViewProcess(scope.row)">查看审批流程</el-button>
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
                  <el-form-item label="类型" prop="title">
                    <el-select v-model="addForm.vacationType" placeholder="请选择类型">
                      <el-option key="" label="请选择" value="" />
                      <el-option
                        v-for="item in springDictionaryDetailList"
                        :key="item.detailName"
                        :label="item.detailName"
                        :value="item.detailName"
                      />
                    </el-select>
                  </el-form-item>
                  <el-form-item label="标题" prop="title">
                    <el-input v-model="addForm.title" auto-complete="off" />
                  </el-form-item>
                  <el-form-item label="请假申请原因" prop="reason">
                    <el-input v-model="addForm.reason" type="textarea" :rows="4" auto-complete="off" />
                  </el-form-item>
                  <el-form-item label="请假天数" prop="time">
                    <el-input-number v-model="addForm.time" auto-complete="off" />
                  </el-form-item>
                  <el-form-item label="请假天数" prop="time">
                    <el-date-picker
                      v-model="addForm.startEndTime"
                      :range-separator="null"
                      class="filter-item search-item date-range-item"
                      end-placeholder="结束日期"
                      format="yyyy-MM-dd HH:mm:ss"
                      start-placeholder="开始日期"
                      type="daterange"
                      value-format="yyyy-MM-dd HH:mm:ss"
                    />
                  </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                  <el-button @click="dialogAddVisible = false">取 消</el-button>
                  <el-button type="primary" @click="handleSave('addForm')">确 定</el-button>
                </span>
              </el-dialog>
              <el-dialog title="修改" :visible.sync="dialogEditVisible" width="50%" :before-close="handleClose">
                <el-form ref="editForm" :model="editForm" label-width="80px" :rules="editFormRules">
                  <el-form-item label="类型" prop="title">
                    <el-select v-model="editForm.vacationType" placeholder="请选择类型">
                      <el-option key="" label="请选择" value="" />
                      <el-option
                        v-for="item in springDictionaryDetailList"
                        :key="item.detailName"
                        :label="item.detailName"
                        :value="item.detailName"
                      />
                    </el-select>
                  </el-form-item>
                  <el-form-item label="标题" prop="title">
                    <el-input v-model="editForm.title" auto-complete="off" />
                  </el-form-item>
                  <el-form-item label="请假申请原因" prop="reason">
                    <el-input v-model="editForm.reason" type="textarea" :rows="4" auto-complete="off" />
                  </el-form-item>
                  <el-form-item label="请假天数" prop="time">
                    <el-input-number v-model="editForm.time" auto-complete="off" />
                  </el-form-item>
                  <el-form-item label="请假天数" prop="time">
                    <el-date-picker
                      v-model="editForm.startEndTime"
                      :range-separator="null"
                      class="filter-item search-item date-range-item"
                      end-placeholder="结束日期"
                      format="yyyy-MM-dd HH:mm:ss"
                      start-placeholder="开始日期"
                      type="daterange"
                      value-format="yyyy-MM-dd HH:mm:ss"
                    />
                  </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                  <el-button @click="dialogEditVisible = false">取 消</el-button>
                  <el-button type="primary" @click="handleUpdate('editForm')">确 定</el-button>
                </span>
              </el-dialog>
              <el-dialog title="查看流程" :visible.sync="dialogViewVisible" width="50%" :before-close="handleClose">
                <el-form ref="viewForm" :model="viewForm" label-width="120px">
                  <el-form-item label="类型" prop="title">
                    {{ viewForm.vacationType }}
                  </el-form-item>
                  <el-form-item label="请假人" prop="title">
                    {{ viewForm.trueName }}
                  </el-form-item>
                  <el-form-item label="标题" prop="title">
                    <el-input v-model="viewForm.title" auto-complete="off" readonly />
                  </el-form-item>
                  <el-form-item label="请假申请原因" prop="reason">
                    <el-input v-model="viewForm.reason" type="textarea" :rows="4" auto-complete="off" readonly />
                  </el-form-item>
                  <el-form-item label="请假天数" prop="time">
                    <el-input v-model="viewForm.time" auto-complete="off" readonly />
                  </el-form-item>
                  <el-form-item label="请假日期" prop="time">
                    <el-col :span="10">
                      <el-input v-model="viewForm.startTime" auto-complete="off" width="200" readonly />
                    </el-col>
                    <el-col :span="2" style="text-align: center;">至</el-col>
                    <el-col :span="10">
                      <el-input v-model="viewForm.endTime" auto-complete="off" width="200" readonly />
                    </el-col>
                  </el-form-item>
                </el-form>
                <el-table border :data="tableVacationApproveData" highlight-current-row style="width: 100%;">

                  <el-table-column type="index" width="60" />
                  <el-table-column label="审核结果">
                    <template slot-scope="scope">
                      <el-tag v-if="scope.row.result === 2" size="success">通过</el-tag>
                      <el-tag v-else-if="scope.row.result === 3" size="small" type="danger">不通过</el-tag>
                      <el-tag v-else size="small" type="info">处理中</el-tag>
                    </template>
                  </el-table-column>
                  <el-table-column prop="remark" label="备注" />
                  <el-table-column prop="trueName" label="审批人" />
                </el-table>
                <span slot="footer" class="dialog-footer">
                  <el-button @click="dialogViewVisible = false">关 闭</el-button>

                </span>
              </el-dialog>
            </el-tab-pane>
          </el-tabs>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script src='./commonvaction.js'>
</script>

<style>
  .block {
    padding: 10px 0px;
  }
</style>
