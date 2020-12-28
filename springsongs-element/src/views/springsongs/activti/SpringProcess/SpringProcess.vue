<template>
  <div class="app-container">
    <el-row>
      <el-col :span="24">
        <div class="bg-white h-100 mx-1 p-1 shadowed">
          <el-tabs type="border-card">
            <el-tab-pane label="流程管理">
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
            <el-tab-pane label="流程管理">
              <div class="block">
                <el-button-group>
                  <el-button type="success" icon="el-icon-search" @click="handleSearch()">查询</el-button>
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
                  <el-table-column type="index" width="60" />

                  <el-table-column label="名称">
                    <template slot-scope="scope">
                      {{ scope.row.name }}
                    </template>
                  </el-table-column>
                  <el-table-column label="分类名称">
                    <template slot-scope="scope">
                      {{ scope.row.category }}
                    </template>
                  </el-table-column>
                  <el-table-column label="标识key" width="150">
                    <template slot-scope="scope">
                      {{ scope.row.key }}
                    </template>
                  </el-table-column>
                  <el-table-column label="版本">
                    <template slot-scope="scope">
                      {{ scope.row.revision }}
                    </template>
                  </el-table-column>

                  <el-table-column label="状态">
                    <template slot-scope="scope">
                      {{ scope.row.suspendStr }}
                    </template>
                  </el-table-column>
                  <el-table-column prop="xmlName" label="流程XML" show-overflow-tooltip width="300">
                    <template slot-scope="scope">
                      <a
                        :href="`http://localhost:8090/SpringProcess/Resource?resType=xml&procDefId=${scope.row.processonDefinitionId}`"
                        target="_blank"
                      >{{ scope.row.xmlName }}</a>
                    </template>
                  </el-table-column>
                  <el-table-column prop="picName" label="流程图片" show-overflow-tooltip width="300">
                    <template slot-scope="scope">
                      <a
                        :href="`http://localhost:8090/SpringProcess/Resource?resType=image&procDefId=${scope.row.processonDefinitionId}`"
                        target="_blank"
                      >{{ scope.row.picName }}</a>
                    </template>
                  </el-table-column>
                  <el-table-column label="发布时间">
                    <template slot-scope="scope">
                      {{ scope.row.deploymentTime }}
                    </template>
                  </el-table-column>

                  <el-table-column label="操作" fixed="right" width="300">
                    <template slot-scope="scope">
                      <el-button icon="el-icon-edit" type="text" size="small" @click="handleProcessSetting(scope.row)">流程配置</el-button>
                      <el-button icon="el-icon-edit" type="text" size="small" @click="handleConverToModel(scope.row)">转模型</el-button>
                      <el-button v-if="!scope.row.suspend" icon="el-icon-edit" type="text" size="small" @click="handleUpdateStateVue(scope.row)">挂起</el-button>
                      <el-button v-if="scope.row.suspend " icon="el-icon-edit" type="text" size="small" @click="handleUpdateStateVue(scope.row)">激活</el-button>
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
            </el-tab-pane>
          </el-tabs>
          <el-dialog title="页面路由配置" :visible.sync="dialogRouterVisible" width="50%" :before-close="handleClose">
            <el-form ref="routerForm" :model="routerForm" label-width="80px" :rules="routerFormRules">
              <el-form-item label="页面路由" prop="router">
                <el-input v-model="routerForm.router" auto-complete="off" />
              </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
              <el-button @click="dialogRouterVisible = false">取 消</el-button>
              <el-button type="primary" add-form- @click="handleSaveRouter('routerForm')">确 定</el-button>
            </span>
          </el-dialog>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script src="./SpringProcess.js">
</script>

<style>
  .block {
    padding: 10px 0px;
  }
</style>
