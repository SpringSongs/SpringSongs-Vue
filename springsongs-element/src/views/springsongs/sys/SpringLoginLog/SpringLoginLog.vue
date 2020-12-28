<template>
  <div class="app-container">
    <el-row>
      <el-col :span="24">
        <div class="bg-white h-100 mx-1 p-1 shadowed">
          <el-tabs type="border-card">
            <el-tab-pane label="登录日志查询">
              <el-form ref="searchForm" :model="searchForm">
                <el-row>
                  <el-col :span="6">
                    <div class="demo-input-suffix">
                      <el-input v-model="searchForm.createdBy" placeholder="请输入内容">
                        <template slot="prepend">用户：</template>
                      </el-input>
                    </div>
                  </el-col>
                </el-row>
              </el-form>
            </el-tab-pane>
          </el-tabs>
          <el-tabs type="border-card">
            <el-tab-pane label="登录日志">
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
                  <el-table-column type="selection" width="55" />
                  <el-table-column type="index" width="60" />
                  <el-table-column prop="createdBy" label="用户" width="180" />
                  <el-table-column prop="createdIp" label="IP" />
                  <el-table-column prop="description" label="说明" width="180" />
                  <el-table-column prop="createdOn" label="日期" />
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
        </div>
      </el-col>
    </el-row>
  </div></template>

<script src="./SpringLoginLog.js">
</script>

<style>
  .block {
    padding: 10px 0px;
  }
</style>
