<template>
	<section>
		<el-row>
			<el-col :span="4">
				<el-tabs type="border-card">
					<el-tab-pane label="文章例表">
						<div>
							<el-button @click='handleArticle()'>文章例表</el-button>
						</div>
						<div>
							<el-button @click='handleArticleCategory()'>文章分类</el-button>
						</div>
						<div>
							<el-button>文章评论</el-button>
						</div>
					</el-tab-pane>
				</el-tabs>
			</el-col>
			<el-col :span="20">
				<div class="bg-white h-100 mx-1 p-1 shadowed">
					<el-tabs type="border-card">
						<el-tab-pane label="评论管理">
							<el-form :model="searchForm" ref="searchForm">
								<el-row>
									<el-col :span="6">
										<div class="demo-input-suffix">
											<el-input v-model="searchForm.content" placeholder="请输入内容">
												<template slot="prepend">评论内容：</template>
											</el-input>
										</div>
									</el-col>
									<el-col :span="6">
										<div class="demo-input-suffix">
											<el-input v-model="searchForm.createBy" placeholder="请输入内容">
												<template slot="prepend">评论人名称：</template>
											</el-input>
										</div>
									</el-col>
								</el-row>
							</el-form>
						</el-tab-pane>
					</el-tabs>
					<el-tabs type="border-card">
						<el-tab-pane label="评论管理">
							<el-button-group>
								<el-button type="primary" @click="handleSearch()" icon="el-icon-search">查询</el-button>
								<el-button type="primary" @click="handleDel()" icon="el-icon-remove">删除</el-button>
							</el-button-group>
							<template>
								<el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" highlight-current-row style="width: 100%;"
								 @selection-change="handleSelectionChange">
									<el-table-column type="selection" width="55"></el-table-column>
									<el-table-column type="index" width="60"></el-table-column>
									<el-table-column prop="content" label="评论内容" width="180"></el-table-column>
									<el-table-column prop="auditFlag" label="审核" width="180">
										<template slot-scope="scope">
											<el-tag v-if="scope.row.auditFlag === true" size="small" @click="handleAuditStatus(scope.$index, scope.row)">已审</el-tag>
											<el-tag v-else size="small" type="danger" @click="handleAuditStatus(scope.$index, scope.row)">未审</el-tag>
										</template>
									</el-table-column>
									<el-table-column prop="sortCode" label="排序" width="180"></el-table-column>
									<el-table-column fixed="right" label="操作" width="300">
										<template slot-scope="scope">
											<el-button type="text" icon="el-icon-delete" class="red" @click="handleSingleDelete(scope.$index, scope.row)">删除</el-button>
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
							<el-dialog title="新增" :visible.sync="dialogAddVisible" width="50%" :before-close="handleClose">
								<el-form :model="addForm" label-width="80px" :rules="addFormRules" ref="addForm">
									<el-form-item label="评论内容" prop="content">
										<el-input v-model="addForm.content" auto-complete="off"></el-input>
									</el-form-item>
									<el-form-item label="排序" prop="sortCode">
										<el-input v-model="addForm.sortCode" auto-complete="off"></el-input>
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
									<el-form-item label="评论内容" prop="content">
										<el-input v-model="editForm.content" auto-complete="off"></el-input>
									</el-form-item>
									<el-form-item label="排序" prop="sortCode">
										<el-input v-model="editForm.sortCode" auto-complete="off"></el-input>
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
				total: 1,
				multipleSelection: [],
				searchForm: {
					size: 20
				},
				dialogAddVisible: false,
				dialogEditVisible: false,
				dialogImportVisible: false,
				//新增界面数据
				addForm: {},
				editForm: {},
				addFormRules: {
					content: [{
						required: true,
						message: "请输入评论内容",
						trigger: "blur"
					}],
					objectId: [{
						required: true,
						message: "请输入主题主键",
						trigger: "blur"
					}],
					sortCode: [{
						required: true,
						message: "请输入排序",
						trigger: "blur"
					}]
				},
				editFormRules: {
					content: [{
						required: true,
						message: "请输入评论内容",
						trigger: "blur"
					}],
					objectId: [{
						required: true,
						message: "请输入主题主键",
						trigger: "blur"
					}],
					sortCode: [{
						required: true,
						message: "请输入排序",
						trigger: "blur"
					}]
				}
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
			handleArticle:function(){
				let self = this;
				self.$router.push('SpringArticle');
			},
			handleArticleCategory:function(){
				let self = this;
				self.$router.push('SpringArticleCategory');
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
					console.log(self.editForm);
					this.dialogEditVisible = true;
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
			// 查询
			handleSearch: function() {
				let self = this;
				if (self.searchForm.page == undefined) {
					self.searchForm.page = 0;
				}
				self.$axios
					.post(
						"/SpringArticleComment/ListByPage?page=" +
						self.searchForm.page +
						"&size=" +
						self.searchForm.size,
						self.searchForm
					)
					.then(function(response) {
						self.tableData = response.data.data;
						self.total = response.data.count;
						self.loading = false;
					})
					.catch(function(error) {
						self.$message.error("数据加载失败!");
					});
			},

			// 保存
			handleSave: function(formName) {
				let self = this;
				this.$refs[formName]
					.validate(valid => {
						if (valid) {
							this.$axios.post("/SpringArticleComment/Create", this.addForm).then(res => {
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
			handleAuditStatus: function(index, row) {
				let self = this;
				self.$axios.post("/SpringArticleComment/Audit/" + row.id).then(res => {
					if (res.data.code == 200) {
						self.$message.success(res.data.msg);
						self.handleSearch();
					} else {
						self.$message.error(res.data.msg);
					}
				});
			},
			//更新
			handleUpdate: function(formName) {
				let self = this;
				self.$axios
					.post("/SpringArticleComment/Edit", this.editForm)
					.then(res => {
						self.$message.success(res.data.msg);
						self.handleSearch();
						self.dialogEditVisible = false;
					})
					.catch(function(error) {
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
								"/SpringArticleComment/SetDeleted",
								qs.stringify({
									ids: ids
								}, {
									indices: false
								})
							)
							.then(res => {
								self.$message.success(response.data.msg);
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
							.post("/SpringArticleComment/SetDeleted", qs.stringify(para))
							.then(res => {
								self.$message.success(res.data.msg);
								self.handleSearch();
							})
							.catch(error => {
								self.$message.error("数据加载失败!");
							});
					})
					.catch(() => {});
			}
		}
	};
</script>

<style>
</style>
