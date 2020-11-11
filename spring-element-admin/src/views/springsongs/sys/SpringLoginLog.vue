<template>
  <section>
    <el-row>
      <el-col :span="24">
        <div class="bg-white h-100 mx-1 p-1 shadowed">
          <el-tabs type="border-card">
            <el-tab-pane label="登录日志">
              <el-form :model="searchForm" ref="searchForm">
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
              <el-button-group>
                <el-button type="primary" @click="handleSearch()" icon="el-icon-search">查询</el-button>
              </el-button-group>
              <template>
                <el-table
                  ref="multipleTable"
                  :data="tableData"
                  tooltip-effect="dark"
                  highlight-current-row
                  style="width: 100%;"
                  @selection-change="handleSelectionChange"
                >
                  <el-table-column type="selection" width="55"></el-table-column>
                  <el-table-column type="index" width="60"></el-table-column>
                  <el-table-column prop="createdBy" label="用户" width="180"></el-table-column>
                  <el-table-column prop="createdIp" label="IP" width="180"></el-table-column>
                  <el-table-column prop="description" label="说明" width="180"></el-table-column>
                  <el-table-column prop="createdOn" label="日期" width="180"></el-table-column>
                </el-table>
                <el-row>
                  <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
                    <div class='pagination'>
                    	<el-pagination @current-change='handleCurrentChange'  @size-change="sizeChangeHandle" layout="total, sizes, prev, pager, next, jumper" :total='total' :page-size='searchForm.size'
                    	 :current-page='searchForm.page'>
                    	</el-pagination>
                    </div>
                  </el-col>
                </el-row>
              </template>
            </el-tab-pane>
          </el-tabs>
        </div>
      </el-col>
    </el-row>
  </section>
</template>

<script>
import qs from "qs";
import axios from "axios";
export default {
  data() {
    return {
      tableData: [],
      total: 1,
      multipleSelection: [],
      searchForm: { size: 20 },
    };
  },
  created() {
    this.handleSearch();
  },
  methods: {
	  sizeChangeHandle(val) {
	  	this.searchForm.size = val
	  	this.searchForm.page = 0
	  	this.handleSearch()
	  },
    handleSelectionChange: function(val) {
      this.multipleSelection = val;
    },
    handleCurrentChange: function(val) {
      this.searchForm.page = val;
      this.handleSearch();
    },
    // 查询
    handleSearch: function() {
      let self = this;
      if (self.searchForm.page == undefined) {
        self.searchForm.page = 1;
      }
      self.$axios
        .post(
          "/SpringLoginLog/ListByPage?page=" +
            self.searchForm.page +
            "&size=" +
            self.searchForm.size,
          self.searchForm
        )
        .then((res)=> {
          self.tableData = res.data.data;
          self.total = res.data.count;
          self.loading = false;
        })
        .catch((error)=> {
          self.$message.error("数据加载失败!");
        });
    },
  }
};
</script>

<style>
</style>
