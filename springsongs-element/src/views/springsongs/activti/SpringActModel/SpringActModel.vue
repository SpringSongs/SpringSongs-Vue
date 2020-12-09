<template>
  <div class="app-container">
    <el-row>
      <el-col :span="24">
        <div class="bg-white h-100 mx-1 p-1 shadowed">
          <el-tabs type="border-card">
            <el-tab-pane label="模型管理">
              <el-form ref="searchForm" :model="searchForm">
                <el-row>
                  <el-col :span="6">
                    <div class="demo-input-suffix">
                      <el-input v-model="searchForm.categoryCode" placeholder="请输入模型分类" auto-complete="off">
                        <template slot="prepend">模型分类：</template>
                      </el-input>
                    </div>
                  </el-col>
                  <el-col :span="6">
                    <div class="demo-input-suffix">
                      <el-input v-model="searchForm.name" placeholder="请输入模型名称" auto-complete="off">
                        <template slot="prepend">模型名称：</template>
                      </el-input>
                    </div>
                  </el-col>
                  <el-col :span="6">
                    <div class="demo-input-suffix">
                      <el-input v-model="searchForm.key" placeholder="请输入模型标识" auto-complete="off">
                        <template slot="prepend">模型标识：</template>
                      </el-input>
                    </div>
                  </el-col>
                </el-row>
              </el-form>
            </el-tab-pane>
          </el-tabs>
          <el-tabs type="border-card">
            <el-tab-pane label="模型管理">

              <div class="block">
                <el-button-group>
                  <el-button type="success" icon="el-icon-search" @click="handleSearch()">查询</el-button>
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
                  <el-table-column label="#" type="index" width="60" fixed="left" />
                  <el-table-column label="名称" fixed="left" width="250">
                    <template slot-scope="scope">
                      {{ scope.row.name }}
                    </template>
                  </el-table-column>
                  <el-table-column label="流程分类">
                    <template slot-scope="scope">
                      {{ scope.row.category }}
                    </template>
                  </el-table-column>
                  <el-table-column label="模型标识" width="200">
                    <template slot-scope="scope">
                      {{ scope.row.key }}
                    </template>
                  </el-table-column>
                  <el-table-column label="备注描述" width="250">
                    <template slot-scope="scope">
                      {{ scope.row.metaInfo.description }}
                    </template>
                  </el-table-column>
                  <el-table-column label="版本号">
                    <template slot-scope="scope">
                      {{ scope.row.version }}
                    </template>
                  </el-table-column>
                  <el-table-column label="创建时间" width="250">
                    <template slot-scope="scope">
                      {{ scope.row.createTime }}
                    </template>
                  </el-table-column>
                  <el-table-column label="更新时间" width="250">
                    <template slot-scope="scope">
                      {{ scope.row.lastUpdateTime }}
                    </template>
                  </el-table-column>

                  <el-table-column label="操作" width="350" fixed="right">
                    <template slot-scope="scope">
                      <a
                        class="el-button el-button--primary el-button--small is-plain"
                        :href="`/static/activiti/modeler.html?modelId=${scope.row.id}`"
                        target="_blank"
                      >在线设计</a>
                      <el-button size="small" @click="handlerDeploy(scope.row)">部署发布</el-button>
                      <el-button size="small" @click="handlerExporyXML(scope.row)">导出XML</el-button>
                      <el-button size="small" @click="handlerDelete(scope.row)">删除</el-button>
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
                  <el-form-item label="组别编码" prop="categoryCode">
                    <el-select v-model="addForm.categoryCode" placeholder="请选择模型类型" @change="springActCategoryListAddChange">
                      <el-option key="" label="请选择" value="" />
                      <el-option
                        v-for="item in springActCategorys"
                        :key="item.categoryCode"
                        :label="item.categoryTitle"
                        :value="item.categoryCode"
                      />
                    </el-select>
                  </el-form-item>
                  <el-form-item label="模型名称" prop="name">
                    <el-input v-model="addForm.name" auto-complete="off" />
                  </el-form-item>
                  <el-form-item label="模型标识" prop="key">
                    <el-input v-model="addForm.key" auto-complete="off" />
                  </el-form-item>
                  <el-form-item label="模型说明" prop="description">
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
                  <el-form-item label="组别编码" prop="categoryCode">
                    <el-select v-model="editForm.categoryCode" placeholder="请选择任务组别" @change="springActCategoryListEditChange">
                      <el-option key="" label="请选择" value="" />
                      <el-option
                        v-for="item in springActCategorys"
                        :key="item.categoryCode"
                        :label="item.categoryTitle"
                        :value="item.categoryCode"
                      />
                    </el-select>
                  </el-form-item>
                  <el-form-item label="模型名称" prop="name">
                    <el-input v-model="editForm.name" auto-complete="off" />
                  </el-form-item>
                  <el-form-item label="模型标识" prop="key">
                    <el-input v-model="editForm.key" auto-complete="off" />
                  </el-form-item>
                  <el-form-item label="模型说明" prop="description">
                    <el-input v-model="editForm.description" auto-complete="off" />
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

<script src="./SpringActModel.js">
</script>

<style>
  .block {
    padding: 10px 0px;
  }
</style>
