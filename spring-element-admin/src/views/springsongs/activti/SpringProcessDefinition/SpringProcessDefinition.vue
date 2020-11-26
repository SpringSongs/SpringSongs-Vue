<template>
  <div class="app-container">
    <el-row>
      <el-col :span="24">
        <div class="bg-white h-100 mx-1 p-1 shadowed">
          <el-tabs type="border-card">
            <el-tab-pane label="审批定义">
              <el-form ref="searchForm" :model="searchForm">
                <el-row>
                  <el-col :span="6">
                    <div class="demo-input-suffix">
                      <el-input v-model="searchForm.category" placeholder="请输入类型" auto-complete="off" />
                    </div>
                  </el-col>
                </el-row>
              </el-form>
            </el-tab-pane>
          </el-tabs>
          <el-tabs type="border-card">
            <el-tab-pane label="审批定义">
              <div class="block">
                <el-button-group>
                  <el-button type="success" icon="el-icon-search" @click="handleSearch()">查询</el-button>
                  <el-button type="primary" icon="el-icon-circle-plus" @click="handleAddUserToTask()">设定审批人员</el-button>
                  <el-button type="warning" icon="el-icon-edit" @click="handleInitProcess()">初始化流程节点</el-button>
                  <el-button type="danger" icon="el-icon-remove" @click="handleInitAllDefinition()">初始化全部流程</el-button>
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
                  <el-table-column label="processonDefinitionId" width="180">
                    <template slot-scope="scope">
                      {{ scope.row.processonDefinitionId }}
                    </template>
                  </el-table-column>
                  <el-table-column label="流程发布ID">
                    <template slot-scope="scope">
                      {{ scope.row.deploymentId }}
                    </template>
                  </el-table-column>
                  <el-table-column label="名称">
                    <template slot-scope="scope">
                      {{ scope.row.name }}
                    </template>
                  </el-table-column>
                  <el-table-column label="流程key">
                    <template slot-scope="scope">
                      {{ scope.row.key }}
                    </template>
                  </el-table-column>
                  <el-table-column label="版本">
                    <template slot-scope="scope">
                      {{ scope.row.revision }}
                    </template>
                  </el-table-column>
                  <el-table-column label="分类名称">
                    <template slot-scope="scope">
                      {{ scope.row.category }}
                    </template>
                  </el-table-column>
                  <el-table-column label="状态">
                    <template slot-scope="scope">
                      {{ scope.row.suspendStr }}
                    </template>
                  </el-table-column>

                  <el-table-column label="发布时间">
                    <template slot-scope="scope">
                      {{ scope.row.deploymentTime }}
                    </template>
                  </el-table-column>
                  <el-table-column prop="xmlName" label="流程XML" show-overflow-tooltip>
                    <template slot-scope="scope">
                      <a
                        :href="`http://localhost:8082/process/resource?resType=xml&procDefId=${scope.row.processonDefinitionId}`"
                        target="_blank"
                      >{{ scope.row.xmlName }}</a>
                    </template>
                  </el-table-column>
                  <el-table-column prop="picName" label="流程图片" show-overflow-tooltip>
                    <template slot-scope="scope">
                      <a
                        :href="`http://localhost:8082/process/resource?resType=image&procDefId=${scope.row.processonDefinitionId}`"
                        target="_blank"
                      >{{ scope.row.picName }}</a>
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
            </el-tab-pane>
          </el-tabs>
          <el-dialog title="设定审批人员" :visible.sync="dialogSetUserVisible" width="1050px" :before-close="handleClose">

            <div class="process-wrapper">
              <el-form ref="addForm" :model="addForm" label-width="80px">
                <el-card
                  v-for="(list,index) in listUserTaskList"
                  :key="index"
                  :body-style="{ padding: '0px',overflow: 'hidden' }"
                  class="card-body"
                >
                  <div class="left">
                    <p class="title">{{ list.taskName }}</p>
                  </div>
                  <div class="right">
                    <el-form-item label="类型">
                      <el-radio-group v-model="addForm.radioArray[list.taskDefKey+'_taskType']">
                        <el-radio label="assignee">人员</el-radio>
                        <el-radio label="candidateUser">候选人</el-radio>
                        <el-radio label="candidateGroup">候选组</el-radio>

                      </el-radio-group>
                    </el-form-item>
                    <el-form-item label="选择">
                      <el-input v-model="addForm.name[list.taskDefKey+'_name']" auto-complete="off" />
                      <el-input v-model="addForm.id[list.taskDefKey+'_id']" auto-complete="off" />
                    </el-form-item>
                  </div>
                </el-card>
              </el-form>
              <div slot="footer" class="dialog-footer" style="clear: both;">
                <el-button type="primary" @click="handleSave('addForm')">确 定</el-button>
              </div>
            </div>
          </el-dialog>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script src="./SpringProcessDefinition.js">
</script>

<style>
  .block {
    padding: 10px 0px;
  }
</style>

<style lang="scss" scoped>
  .levelbar {
    height: 64px;
    line-height: 64px;
  }

  .process-wrapper {
    overflow: hidden;

    .tips {
      height: 40px;
      line-height: 40px;
      color: #b84592
    }

    .card-body {
      width: 480px;
      float: left;
      margin: 10px;
      cursor: pointer;

      .left {
        float: left;
        width: 100px;
        height: 150px;
        padding: 10px;
        // background-image: linear-gradient(90deg,#0af,#0085ff);
        background: rgba(80, 191, 255, 0.92);

        .title {
          width: 100%;
          height: 100%;
          text-align: center;
          font-size: 30px;
          color: white;
        }
      }

      .right {
        width: 350px;
        height: 150px;
        float: left;
        padding: 10px;
        position: relative;
        background: rgba(80, 191, 12, 0.92);

        .process-name {
          font-size: 16px;
          height: 24px;
          line-height: 24px;
        }

        .process-desc {
          height: 24px;
          line-height: 24px;
        }

        .action {
          position: absolute;
          right: 10px;
          bottom: 10px;
        }
      }
    }
  }
</style>
