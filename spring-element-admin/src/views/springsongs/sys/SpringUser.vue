<template>
  <section>
    <el-row>
		<el-col :span="4">
			<el-tabs type="border-card">
				<el-tab-pane label="组织机构">
					<div class="treesearch">
						<el-tree :data="menuList" :props="menuListTreeProps" node-key="id" ref="menuListTree" @current-change="menuListTreeCurrentSearchHandle"
						 :default-expand-all="true" :highlight-current="true" :expand-on-click-node="false">
						</el-tree>
					</div>
				</el-tab-pane>
			</el-tabs>
		</el-col>
		<el-col :span="20">
        <div class="bg-white h-100 mx-1 p-1 shadowed">
          <el-tabs type="border-card">
            <el-tab-pane label="用户管理">
              <el-form :model="searchForm" ref="searchForm">
                <el-row>
                  <el-col :span="6">
                    <div class="demo-input-suffix">
                      <el-input v-model="searchForm.userName" placeholder="请输入内容">
                        <template slot="prepend">用户名：</template>
                      </el-input>
                    </div>
                  </el-col>
				  <el-col :span="6">
				    <div class="demo-input-suffix">
				      <el-input v-model="searchForm.trueName" placeholder="请输入内容">
				        <template slot="prepend">姓名：</template>
				      </el-input>
				    </div>
				  </el-col>
				  <el-col :span="6">
				    <div class="demo-input-suffix">
				      <el-input v-model="searchForm.email" placeholder="请输入内容">
				        <template slot="prepend">邮箱：</template>
				      </el-input>
				    </div>
				  </el-col>
				  <el-col :span="6">
				    <div class="demo-input-suffix">
				      <el-input v-model="searchForm.mobile" placeholder="请输入内容">
				        <template slot="prepend">手机：</template>
				      </el-input>
				    </div>
				  </el-col>
                </el-row>
              </el-form>
            </el-tab-pane>
          </el-tabs>
          <el-tabs type="border-card">
            <el-tab-pane label="用户管理">
              <el-button-group>
				<el-button type='primary' @click='handleRefresh()' icon="el-icon-refresh">刷新</el-button>
                <el-button type="primary" @click="handleSearch()" icon="el-icon-search">查询</el-button>
                <el-button type="primary" @click="handleAdd()" icon="el-icon-circle-plus">新增</el-button>
                <el-button type="primary" @click="handleEdit()" icon="el-icon-edit">修改</el-button>
                <el-button type="primary" @click="handleSetPwd()" icon="el-icon-edit">设置密码</el-button>
                <el-button type="primary" @click="handleDel()" icon="el-icon-remove">删除</el-button>
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
				  <el-table-column prop="organizationName" label="组织机构" width="180"></el-table-column>
				  <el-table-column prop="titleName" label="职称" width="180"></el-table-column>
                  <el-table-column prop="userName" label="用户名" width="180"></el-table-column>
                  <el-table-column prop="trueName" label="真实姓名" width="180"></el-table-column>
				  <el-table-column prop="email" label="邮箱" width="180"></el-table-column>
				  <el-table-column prop="mobile" label="手机号" width="180"></el-table-column>
                  <el-table-column prop="enableEdit" label="允许编辑" width="180">
                    <template slot-scope="scope">
                      <el-tag
                        v-if="scope.row.enableEdit === true"
                        size="small"
                        @click="handleAuditStatus(scope.$index, scope.row)"
                      >允许</el-tag>
                      <el-tag
                        v-else
                        size="small"
                        type="danger"
                        @click="handleAuditStatus(scope.$index, scope.row)"
                      >不允许</el-tag>
                    </template>
                  </el-table-column>
                  <el-table-column prop="enableDelete" label="允许删除" width="180">
                    <template slot-scope="scope">
                      <el-tag
                        v-if="scope.row.enableDelete === true"
                        size="small"
                        @click="handleAuditStatus(scope.$index, scope.row)"
                      >允许</el-tag>
                      <el-tag
                        v-else
                        size="small"
                        type="danger"
                        @click="handleAuditStatus(scope.$index, scope.row)"
                      >不允许</el-tag>
                    </template>
                  </el-table-column>
                  <el-table-column fixed="right" label="操作" width="300">
                    <template slot-scope="scope">
                      <el-button
                        icon="el-icon-edit"
                        @click="handleSetRoles(scope.$index, scope.row)"
                        type="text"
                        size="small"
                      >分配角色</el-button>
                      <el-button
                        icon="el-icon-edit"
                        @click="handleViewRoles(scope.$index, scope.row)"
                        type="text"
                        size="small"
                      >查看角色</el-button>
                      <el-button
                        icon="el-icon-edit"
                        @click="handleSingleEdit(scope.$index, scope.row)"
                        type="text"
                        size="small"
                      >编辑</el-button>
                      <el-button
                        type="text"
                        icon="el-icon-delete"
                        class="red"
                        @click="handleSingleDelete(scope.$index, scope.row)"
                      >删除</el-button>
                    </template>
                  </el-table-column>
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
              <!--新增-->
              <el-dialog
                title="新增"
                :visible.sync="dialogAddVisible"
                width="50%"
                :before-close="handleClose"
              >
                <el-form :model="addForm" label-width="80px" :rules="addFormRules" ref="addForm">
                  <el-form-item label="用户名" prop="userName">
                    <el-input v-model="addForm.userName" auto-complete="off"></el-input>
                  </el-form-item>
                  <el-form-item label="真实姓名" prop="trueName">
                    <el-input v-model="addForm.trueName" auto-complete="off"></el-input>
                  </el-form-item>
				  <el-form-item label="邮箱" prop="email">
				    <el-input v-model="addForm.email" auto-complete="off"></el-input>
				  </el-form-item>
				  <el-form-item label="手机" prop="mobile">
				    <el-input v-model="addForm.mobile" auto-complete="off"></el-input>
				  </el-form-item>
				  <el-form-item label="组织机构" prop="organizationName">
				  	<el-popover ref="menuListPopover" placement="bottom-start" trigger="click">
				  		<el-tree :data="menuList" :props="menuListTreeProps" node-key="id" ref="menuListTree" @current-change="menuListTreeCurrentChangeHandle"
				  		 :default-expand-all="true" :highlight-current="true" :expand-on-click-node="false">
				  		</el-tree>
				  	</el-popover>
				  	<el-input v-model="addForm.organizationName" v-popover:menuListPopover :readonly="true" placeholder="点击选择分类"
				  	 class="menu-list__input"></el-input>
				  </el-form-item>
                  <el-form-item label="允许编辑" prop="enableEdit">
                    <el-switch
                      v-model="addForm.enableEdit"
                      active-color="#13ce66"
                      inactive-color="#ff4949"
                      :active-value="true"
                      :inactive-value="false"
                    ></el-switch>
                  </el-form-item>
                  <el-form-item label="允许删除" prop="enableDelete">
                    <el-switch
                      v-model="addForm.enableDelete"
                      active-color="#13ce66"
                      inactive-color="#ff4949"
                      :active-value="true"
                      :inactive-value="false"
                    ></el-switch>
                  </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                  <el-button @click="dialogAddVisible = false">取 消</el-button>
                  <el-button type="primary" @click="handleSave('addForm')">确 定</el-button>
                </span>
              </el-dialog>
              <!--修改-->
              <el-dialog
                title="修改"
                :visible.sync="dialogEditVisible"
                width="50%"
                :before-close="handleClose"
              >
                <el-form :model="editForm" label-width="80px" :rules="editFormRules" ref="editForm">
                  <el-form-item label="用户名" prop="userName">
                    <el-input v-model="editForm.userName" auto-complete="off"></el-input>
                  </el-form-item>
                  <el-form-item label="真实姓名" prop="trueName">
                    <el-input v-model="editForm.trueName" auto-complete="off"></el-input>
                  </el-form-item>
				  <el-form-item label="邮箱" prop="email">
				    <el-input v-model="editForm.email" auto-complete="off"></el-input>
				  </el-form-item>
				  <el-form-item label="手机" prop="mobile">
				    <el-input v-model="editForm.mobile" auto-complete="off"></el-input>
				  </el-form-item>
				  <el-form-item label="组织机构" prop="organizationName">
				  	<el-popover ref="menuListPopover" placement="bottom-start" trigger="click">
				  		<el-tree :data="menuList" :props="menuListTreeProps" node-key="id" ref="menuListTree" @current-change="menuListTreeCurrentEditHandle"
				  		 :default-expand-all="true" :highlight-current="true" :expand-on-click-node="false">
				  		</el-tree>
				  	</el-popover>
				  	<el-input v-model="editForm.organizationName" v-popover:menuListPopover :readonly="true" placeholder="点击选择分类"
				  	 class="menu-list__input"></el-input>
				  </el-form-item>
                  <el-form-item label="允许编辑" prop="enableEdit">
                    <el-switch
                      v-model="editForm.enableEdit"
                      active-color="#13ce66"
                      inactive-color="#ff4949"
                      :active-value="true"
                      :inactive-value="false"
                    ></el-switch>
                  </el-form-item>
                  <el-form-item label="允许删除" prop="enableDelete">
                    <el-switch
                      v-model="editForm.enableDelete"
                      active-color="#13ce66"
                      inactive-color="#ff4949"
                      :active-value="true"
                      :inactive-value="false"
                    ></el-switch>
                  </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                  <el-button @click="dialogEditVisible = false">取 消</el-button>
                  <el-button type="primary" @click="handleUpdate('editForm')">确 定</el-button>
                </span>
              </el-dialog>
              <el-dialog
                title="设置密码"
                :visible.sync="dialogPwdVisible"
                width="50%"
                :before-close="handleClose"
              >
                <el-form :model="pwdForm" label-width="80px" :rules="pwdFormRules" ref="pwdForm">
                  <el-form-item label="密码" prop="pwd">
                    <el-input v-model="pwdForm.pwd" auto-complete="off"></el-input>
                  </el-form-item>
                  <el-form-item label="确认密码" prop="configpwd">
                    <el-input v-model="pwdForm.configpwd" auto-complete="off"></el-input>
                  </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                  <el-button @click="dialogPwdVisible = false">取 消</el-button>
                  <el-button type="primary" @click="handleUpdatePwd('pwdForm')">确 定</el-button>
                </span>
              </el-dialog>

              <el-dialog
                title="分配角色"
                :visible.sync="dialogRoleVisible"
                width="50%"
                :before-close="handleClose"
              >
                <el-table
                  ref="multipleTable"
                  :data="tableRoleData"
                  tooltip-effect="dark"
                  highlight-current-row
                  style="width: 100%;"
                  @selection-change="handleSelectionChangeRole"
                >
                  <el-table-column type="selection" width="55"></el-table-column>
                  <el-table-column type="index" width="60"></el-table-column>
                  <el-table-column prop="title" label="名称" width="180"></el-table-column>
                  <el-table-column prop="description" label="说明" width="180"></el-table-column>
                </el-table>
                <el-row>
                  <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
                    <div class="pagination">
                      <el-pagination
                        @current-change="handleCurrentChangeRole"
                        layout="prev, pager, next"
                        :total="totalRole"
                        :page-size="20"
                        :current-page="searchFormRole.page"
                      ></el-pagination>
                    </div>
                  </el-col>
                </el-row>
                <span slot="footer" class="dialog-footer">
                  <el-button @click="dialogRoleVisible = false">取 消</el-button>
                  <el-button type="primary" @click="handleSetRoleSave()">确 定</el-button>
                </span>
              </el-dialog>

              <el-dialog
                title="查看角色"
                :visible.sync="dialogRoleUserVisible"
                width="50%"
                :before-close="handleClose"
              >
                <el-table
                  ref="multipleTable"
                  :data="tableRoleUserData"
                  tooltip-effect="dark"
                  highlight-current-row
                  style="width: 100%;"
                  @selection-change="handleSelectionChangeRoleUser"
                >
                  <el-table-column type="selection" width="55"></el-table-column>
                  <el-table-column type="index" width="60"></el-table-column>
                  <el-table-column prop="title" label="名称" width="180"></el-table-column>
                  <el-table-column prop="description" label="说明" width="180"></el-table-column>
                </el-table>
                <el-row>
                  <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
                    <div class="pagination">
                      <el-pagination
                        @current-change="handleCurrentChangeRoleUser"
                        layout="prev, pager, next"
                        :total="totalRoleUser"
                        :page-size="20"
                        :current-page="searchFormRoleUser.page"
                      ></el-pagination>
                    </div>
                  </el-col>
                </el-row>
              </el-dialog>
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
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.pwdForm.configpwd !== "") {
          this.$refs.pwdForm.validateField("configpwd");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.pwdForm.pwd) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      tableData: [],
      tableRoleData: [],
      tableRoleUserData: [],
      fileList: [],
      total: 1,
      totalRole: 1,
      totalRoleUser: 1,
      multipleSelection: [],
      multipleSelectionRole: [],
      multipleSelectionRoleUser: [],
	  ListTreeProps: {
	  	label: 'title',
	  	children: [],
	  	isLeaf: 'leaf'
	  },
	  menuList: [],
	  menuListTreeProps: {
	  	label: 'title',
	  	children: 'children'
	  },
      searchForm: {
        size: 20
      },
      searchFormRole: {
        limits: 20
      },
      searchFormRoleUser: {
        limits: 20
      },
      dialogAddVisible: false,
      dialogEditVisible: false,
      dialogImportVisible: false,
      dialogPwdVisible: false,
      dialogRoleVisible: false,
      dialogRoleUserVisible: false,
      //新增界面数据
      addForm: {
        enableEdit: false,
        enableDelete: false,
		organizationName:'',
      },
      uploadForm: {},
      editForm: {},
      pwdForm: {
        configpwd: "",
        pwd: ""
      },
      userId: "",
      addFormRules: {
        userName: [
          {
            required: true,
            message: "请输入用户名",
            trigger: "blur"
          }
        ],
		trueName: [
		  {
		    required: true,
		    message: "请输入真实姓名",
		    trigger: "blur"
		  }
		],
		email: [
		  {
		    required: true,
		    message: "请输入邮箱",
		    trigger: "blur"
		  }
		],
		mobile: [
		  {
		    required: true,
		    message: "请输入手机",
		    trigger: "blur"
		  }
		]
      },
      editFormRules: {
        userName: [
          {
            required: true,
            message: "请输入用户名",
            trigger: "blur"
          }
        ],
		trueName: [
		  {
		    required: true,
		    message: "请输入真实姓名",
		    trigger: "blur"
		  }
		],
		email: [
		  {
		    required: true,
		    message: "请输入邮箱",
		    trigger: "blur"
		  }
		],
		mobile: [
		  {
		    required: true,
		    message: "请输入手机",
		    trigger: "blur"
		  }
		]
      },
      pwdFormRules: {
        pwd: [
          {
            validator: validatePass,
            trigger: "blur"
          }
        ],
        configpwd: [
          {
            validator: validatePass2,
            trigger: "blur"
          }
        ]
      },
      uploadFormRules: {},
      importFormRules: {
        name: [
          {
            required: true,
            message: "请输入姓名",
            trigger: "blur"
          }
        ]
      }
    };
  },
  created() {
    this.handleSearch();
	this.handleListOrganizeTree();
  },
  methods: {
	  sizeChangeHandle(val) {
	  	this.searchForm.size = val
	  	this.searchForm.page = 0
	  	this.handleSearch()
	  },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleSelectionChangeRole(val) {
      this.multipleSelectionRole = val;
    },
    handleSelectionChangeRoleUser(val) {
      this.multipleSelectionRoleUser = val;
    },
    handleCurrentChangeRoleUser() {
      this.searchFormRoleUser.page = val;
      this.handleRoleSearch();
    },
    handleCurrentChangeRole(val) {
      this.searchFormRole.page = val;
      this.handleRoleSearch();
    },
    handleCurrentChange(val) {
      this.searchForm.page = val;
      this.handleSearch();
    },
    //重置表单
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
	handleRefresh: function() {
		this.searchForm.organizationId = "";
		this.handleSearch();
	},
	treeDataTranslate: function(data, id = 'id', pid = 'parentId') {
		var res = []
		var temp = {}
		for (var i = 0; i < data.length; i++) {
			temp[data[i][id]] = data[i]
		}
		for (var k = 0; k < data.length; k++) {
			if (temp[data[k][pid]] && data[k][id] !== data[k][pid]) {
				if (!temp[data[k][pid]]['children']) {
					temp[data[k][pid]]['children'] = []
				}
				if (!temp[data[k][pid]]['_level']) {
					temp[data[k][pid]]['_level'] = 1
				}
				data[k]['_level'] = temp[data[k][pid]]._level + 1
				temp[data[k][pid]]['children'].push(data[k])
			} else {
				res.push(data[k])
			}
		}
		return res
	},
	handleListOrganizeTree: function() {
		let self = this;
		self.$axios.post('/SpringOrganization/listAllRecord').then((res) => {
			if (res.data.code == 200) {
				self.menuList = self.treeDataTranslate(res.data.data);
			} else {
				self.$message.error(res.data.msg);
			}
		});
	},
    handleSetRoles: function(index, row) {
      this.userId = row.id;
      this.handleRoleSearch();
      this.dialogRoleVisible = true;
    },
    handleViewRoles: function(index, row) {
      this.userId = row.id;
      this.dialogRoleUserVisible = true;
      this.handleUserRoleSearch();
    },
    //显示新增界面
    handleAdd: function() {
		this.handleListOrganizeTree();
      this.dialogAddVisible = true;
    },
    // 显示编辑界面
    handleEdit: function() {
      let self = this;
      if (self.multipleSelection.length == 0) {
        self.$message.warning("请选择修改项目");
      } else if (self.multipleSelection.length > 1) {
        self.$message.warning("只允许选择一项修改项目");
      } else {
        self.editForm = self.multipleSelection[0];
		this.handleListOrganizeTree();
        self.dialogEditVisible = true;
      }
    },
    handleSetPwd() {
      let self = this;
      if (self.multipleSelection.length == 0) {
        self.$message.warning("请选择修改项目");
      } else if (self.multipleSelection.length > 1) {
        self.$message.warning("只允许选择一项修改项目");
      } else {
        self.pwdForm.userId = self.multipleSelection[0].id;
        self.dialogPwdVisible = true;
      }
    },
    // 显示编辑界面
    handleSingleEdit: function(index, row) {
      let self = this;
      if (row.enableEdit == false) {
        self.$message.warning("项目不允许编辑");
      } else {
        self.editForm = row;
		this.handleListOrganizeTree();
        self.dialogEditVisible = true;
      }
    },
    //关装对话框
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    handleRoleSearch: function() {
      let self = this;
      if (self.searchFormRole.page == undefined) {
        self.searchFormRole.page = 0;
      }
      self.$axios
        .post(
          "/SpringRole/ListByPage?page=" +
            self.searchFormRole.page +
            "&limit=" +
            self.searchFormRole.limits,
          self.searchFormRole
        )
        .then(res => {
          self.tableRoleData = res.data.data;
          self.totalRole = res.data.count;
        })
        .catch(error => {
          self.$message.error("数据加载失败!");
        });
    },
    handleUserRoleSearch: function() {
      let self = this;
      if (self.searchFormRoleUser.page == undefined) {
        self.searchFormRoleUser.page = 0;
      }
      self.$axios
        .post(
          "/SpringRole/ListByUserId/" +
            this.userId +
            "?page=" +
            self.searchFormRoleUser.page +
            "&limit=" +
            self.searchFormRoleUser.limits,
          self.searchFormRoleUser
        )
        .then(res => {
          self.tableRoleUserData = res.data.data;
          self.totalRoleUser = res.data.count;
        })
        .catch(error => {
          self.$message.error("数据加载失败!");
        });
    },
    // 查询
    handleSearch: function() {
      let self = this;
      if (self.searchForm.page == undefined) {
        self.searchForm.page = 0;
      }
      self.$axios
        .post(
          "/SpringUser/ListByPage?page=" +
            self.searchForm.page +
            "&size=" +
            self.searchForm.size,
          self.searchForm
        )
        .then(res => {
          self.tableData = res.data.data;
          self.total = res.data.count;
          self.loading = false;
        })
        .catch(error => {
          self.$message.error("数据加载失败!");
        });
    },
    handleSetRoleSave: function() {
      let self = this;
      let ids = [];
      if (self.multipleSelectionRole.length == 0) {
        self.$message.warning("请选择角色");
      } else {
        self.multipleSelectionRole.map(item => {
          ids.push(item.id);
        });
        self.$axios
          .post(
            "/SpringUser/SetRoles/" + this.userId,
            qs.stringify(
              {
                ids: ids
              },
              {
                indices: false
              }
            )
          )
          .then(res => {
            if (res.data.code == 200) {
              self.$message.success(res.data.msg);
              self.dialogRoleVisible = false;
            } else {
              self.$message.error(res.data.msg);
            }
          });
      }
    },
    // 保存
    handleSave: function(formName) {
      let self = this;
      self.$refs[formName]
        .validate(valid => {
          if (valid) {
            self.$axios.post("/SpringUser/Create", this.addForm).then(res => {
              if (res.data.code == 200) {
                self.$message.success(res.data.msg);
                self.handleSearch();
                self.dialogAddVisible = false;
                self.resetForm(formName);
              } else {
                self.$message.error(res.data.msg);
              }
            });
          } else {
            this.$message.error("请填写必填项");
          }
        })
        .catch(error => {
          self.$message.error("数据加载失败!");
        });
    },
    handleUpdatePwd: function(formName) {
      let self = this;
      self.$refs[formName].validate(valid => {
        if (valid) {
          self.$axios.post("/SpringUser/SetPwd", this.pwdForm).then(res => {
            if (res.data.code == 200) {
              self.$message.success(res.data.msg);
              self.dialogPwdVisible = false;
              self.resetForm(formName);
            } else {
              self.$message.error(res.data.msg);
            }
          });
        } else {
          self.$message.error("请填写必填项");
          return false;
        }
      });
    },
    //更新
    handleUpdate: function(formName) {
      let self = this;
      self.$axios
        .post("/SpringUser/Edit", this.editForm)
        .then(res => {
          self.$message.success(res.data.msg);
          self.handleSearch();
          self.dialogEditVisible = false;
        })
        .catch((error)=> {
          self.$message.error("数据加载失败!");
        });
    },
    //删除
    handleDel: function() {
      let self = this;
      let ids = [];
      if (self.multipleSelection.length == 0) {
        self.$message.warning("请选择删除项目");
        return;
      }
      self
        .$confirm("确认删除该记录吗?", "提示", {
          type: "warning"
        })
        .then(() => {
          self.multipleSelection.map(item => {
            ids.push(item.id);
          });
          self.$axios
            .post(
              "/SpringUser/SetDeleted",
              qs.stringify(
                {
                  ids: ids
                },
                {
                  indices: false
                }
              )
            )
            .then(res => {
              self.$message.success(res.data.msg);
              self.handleSearch();
            })
            .catch(error => {
              self.$message.error("数据加载失败!");
            });
        })
        .catch(() => {});
    },
    handleSingleDelete(index, row) {
      let self = this;
      if (row.enableDelete == false) {
        self.$message.warning("项目不允许删除");
        return;
      }
      self
        .$confirm("确认删除该记录吗?", "提示", {
          type: "warning"
        })
        .then(() => {
          let para = {
            ids: row.id
          };
          self.$axios
            .post(
              "/SpringUser/SetDeleted",
              qs.stringify(para, {
                indices: false
              })
            )
            .then(res => {
              self.$message.success(res.data.msg);
              self.handleSearch();
            })
            .catch(error => {
              self.$message.error("数据加载失败!");
            });
        })
        .catch(() => {});
    },
	menuListTreeCurrentChangeHandle(data, node) {
		this.addForm.organizationId = data.id;
		this.addForm.organizationName = data.title;
	},
	menuListTreeCurrentEditHandle(data, node) {
		this.editForm.organizationId = data.id;
		this.editForm.organizationName = data.title;
	},
	menuListTreeCurrentSearchHandle(data,node){
		this.searchForm.organizationId=data.id;
		this.handleSearch();
	}
  }
};
</script>

<style>
</style>
