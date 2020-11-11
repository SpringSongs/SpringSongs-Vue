<template>
	<section>
		<el-row>
			<el-col :span="24">
				<div class="bg-white h-100 mx-1 p-1 shadowed">
					<el-tabs type="border-card">
						<el-tab-pane label="我的文件">
							<el-form :model="searchForm" ref="searchForm">
								<el-row>
									<el-col :span="6">
										<div class="demo-input-suffix">
											<el-input v-model="searchForm.description" placeholder="请输入内容">
												<template slot="prepend">说明：</template>
											</el-input>
										</div>
									</el-col>
								</el-row>
							</el-form>
						</el-tab-pane>
					</el-tabs>
					<el-tabs type="border-card">
						<el-tab-pane label="我的文件">
							<el-button-group>
								<el-button type="primary" @click="handleSearch()" icon="el-icon-search">查询</el-button>
								<el-button type="primary" @click="handleAdd()" icon="el-icon-circle-plus">新增</el-button>
								<el-button type="primary" @click="handleEdit()" icon="el-icon-edit">修改</el-button>
								<el-button type="primary" @click="handleDel()" icon="el-icon-remove">删除</el-button>
							</el-button-group>
							<template>
								<el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" highlight-current-row style="width: 100%;"
								 @selection-change="handleSelectionChange">
									<el-table-column type="selection" width="55"></el-table-column>
									<el-table-column type="index" width="60"></el-table-column>
									<el-table-column prop="folderName" label="文件夹名称" width="180"></el-table-column>
									<el-table-column prop="path" label="文件路径" width="180"></el-table-column>
									<el-table-column prop="description" label="说明" width="180"></el-table-column>
									<el-table-column fixed="right" label="操作" width="300">
										<template slot-scope="scope">
											<el-button icon="el-icon-edit" @click="handleSingleEdit(scope.$index, scope.row)" type="text" size="small">编辑</el-button>
											<el-button type="text" icon="el-icon-delete" class="red" @click="handleSingleDelete(scope.$index, scope.row)">删除</el-button>
										</template>
									</el-table-column>
								</el-table>
								<el-row>
									<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
										<div class='pagination'>
											<el-pagination @current-change='handleCurrentChange' @size-change="sizeChangeHandle" layout="total, sizes, prev, pager, next, jumper"
											 :total='total' :page-size='searchForm.size' :current-page='searchForm.page'>
											</el-pagination>
										</div>
									</el-col>
								</el-row>
							</template>
							<!--新增-->
							<el-dialog title="新增" :visible.sync="dialogAddVisible" width="50%" :before-close="handleClose">
								<el-form :model="addForm" label-width="80px" :rules="addFormRules" ref="addForm">
									<el-upload class="upload-demo" action="/SpringAttachment/Upload" :on-preview="handlePreview" :on-remove="handleRemove"
									 :before-remove="beforeRemove" multiple :limit="3" :on-exceed="handleExceed" :file-list="fileList" :on-success="handlerUploadSuccess">
										<el-button size="small" type="primary">点击上传</el-button>
									</el-upload>
									<el-form-item label="文件路径" prop="path">
										<el-input v-model="addForm.path" auto-complete="off" readonly="true"></el-input>
									</el-form-item>
									<el-form-item label="文件说明" prop="path">
										<el-input v-model="addForm.description" auto-complete="off"></el-input>
									</el-form-item>
								</el-form>
								<span slot="footer" class="dialog-footer">
									<el-button @click="dialogAddVisible = false">取 消</el-button>
									<el-button type="primary" @click="handleSave('addForm')">确 定</el-button>
								</span>
							</el-dialog>
							<!--修改-->
							<el-dialog title="修改" :visible.sync="dialogEditVisible" width="50%" :before-close="handleClose">
								<el-form :model="editForm" label-width="80px" :rules="editFormRules" ref="editForm">
									<el-form-item label="文件路径" prop="path">
										<el-input v-model="editForm.path" auto-complete="off" readonly="readonly"></el-input>
									</el-form-item>
									<el-form-item label="文件说明" prop="path">
										<el-input v-model="editForm.description" auto-complete="off"></el-input>
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
	</section>
</template>

<script>
	import qs from "qs";
	import axios from "axios";
	export default {
		data() {
			return {
				tableData: [],
				fileList: [],
				total: 1,
				multipleSelection: [],
				searchForm: {
					size: 20
				},
				dialogAddVisible: false,
				dialogEditVisible: false,
				//新增界面数据
				addForm: {},
				param: {},
				editForm: {},
				addFormRules: {
					folderId: [{
						required: true,
						message: "请输入文件夾主键",
						trigger: "blur"
					}],
					folderName: [{
						required: true,
						message: "请输入文件夹名称",
						trigger: "blur"
					}],
					path: [{
						required: true,
						message: "请输入文件路径",
						trigger: "blur"
					}]
				},
				editFormRules: {
					folderId: [{
						required: true,
						message: "请输入文件夾主键",
						trigger: "blur"
					}],
					folderName: [{
						required: true,
						message: "请输入文件夹名称",
						trigger: "blur"
					}],
					path: [{
						required: true,
						message: "请输入文件路径",
						trigger: "blur"
					}]
				},
				uploadFormRules: {},
				importFormRules: {}
			};
		},
		created() {
			this.param = this.$route.params.folderId;
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
			//重置表单
			resetForm: function(formName) {
				this.$refs[formName].resetFields();
			},
			//显示新增界面
			handleAdd: function() {
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
					self.dialogEditVisible = true;
				}
			},
			// 显示编辑界面
			handleSingleEdit: function(Index, row) {
				let self = this;
				self.editForm = row;
				this.dialogEditVisible = true;
			},
			//关装对话框
			handleClose(done) {
				this.$confirm("确认关闭？")
					.then(_ => {
						done();
					})
					.catch(_ => {});
			},
			handlePreview: function() {},
			handleRemove: function() {},
			beforeRemove: function() {},
			handleExceed: function() {},
			// 查询
			handleSearch: function() {
				let self = this;
				if (self.searchForm.page == undefined) {
					self.searchForm.page = 1;
				}
				self.searchForm.folderId = this.param;
				self.$axios
					.post(
						"/SpringAttachment/ListByPage?page=" +
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
			// 保存
			handleSave: function(formName) {
				let self = this;
				self.addForm.folderId = this.$route.params.folderId;
				self.addForm.folderName = this.$route.params.title;
				this.$refs[formName]
					.validate(valid => {
						if (valid) {
							this.$axios.post("/SpringAttachment/Create", this.addForm).then(res => {
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
			//更新
			handleUpdate: function(formName) {
				let self = this;
				this.$axios
					.post("/SpringAttachment/Edit", this.editForm)
					.then(res => {
						self.$message.success(res.data.msg);
						self.handleSearch();
						self.dialogEditVisible = false;
					})
					.catch(error => {
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
				this.$confirm("确认删除该记录吗?", "提示", {
						type: "warning"
					})
					.then(() => {
						self.multipleSelection.map(item => {
							ids.push(item.id);
						});
						self.$axios
							.post(
								"/SpringAttachment/SetDeleted",
								qs.stringify({
									ids: ids
								}, {
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
			handleSingleDelete(index, row) {
				let self = this;
				self
					.$confirm("确认删除该记录吗?", "提示", {
						type: "warning"
					})
					.then(() => {
						let para = {
							ids: row.id
						};
						axios
							.post("/SpringAttachment/SetDeleted", qs.stringify(para))
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
			handlerUploadSuccess: function(res, file, fileList) {
				let self = this;
				if (res.code == 200) {
					self.$message.success(res.msg);
					self.addForm.path = res.data;
					self.handleSearch();
					self.fileList = [];
				} else {
					self.$message.error(res.msg);
				}
			}
		}
	};
</script>

<style>
</style>
