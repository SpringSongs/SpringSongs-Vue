import qs from 'qs';
import axios from 'axios';
export default {
	data() {
		return {
			tableData: [],
			fileList: [],
			total: 1,
			multipleSelection: [],
			searchForm: {
				size: 20,
				page: 0,
			},
			springJobGroups: [],
			dialogAddVisible: false,
			dialogEditVisible: false,
			dialogImportVisible: false,
			//新增界面数据
			addForm: {},
			uploadForm: {},
			editForm: {},
			addFormRules: {
				groupCode: [{
					required: true,
					message: '请输入组别编码',
					trigger: 'blur'
				}],
				groupTitle: [{
					required: true,
					message: '请输入组别名称',
					trigger: 'blur'
				}],
				taskTitle: [{
					required: true,
					message: '请输入任务名称',
					trigger: 'blur'
				}],
				taskClassTitle: [{
					required: true,
					message: '请输入任务类',
					trigger: 'blur'
				}],
				cronExpression: [{
					required: true,
					message: '请输入时间表达式',
					trigger: 'blur'
				}],
				remark: [{
					required: true,
					message: '请输入备注',
					trigger: 'blur'
				}],
			},
			editFormRules: {

				groupCode: [{
					required: true,
					message: '请输入组别编码',
					trigger: 'blur'
				}],
				groupTitle: [{
					required: true,
					message: '请输入组别名称',
					trigger: 'blur'
				}],
				taskTitle: [{
					required: true,
					message: '请输入任务名称',
					trigger: 'blur'
				}],
				taskClassTitle: [{
					required: true,
					message: '请输入任务类',
					trigger: 'blur'
				}],
				cronExpression: [{
					required: true,
					message: '请输入时间表达式',
					trigger: 'blur'
				}],

				remark: [{
					required: true,
					message: '请输入备注',
					trigger: 'blur'
				}],
			},

		}
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
		handleSelectionChange(val) {
			this.multipleSelection = val;
		},
		handleCurrentChange(val) {
			this.searchForm.currPage = val;
			this.handleSearch();
		},
		//重置表单
		resetForm(formName) {
			this.$refs[formName].resetFields();
		},
		// 查询
		handleSearch: function() {
			let self = this;
			if (self.searchForm.page == undefined) {
				self.searchForm.page = 0;
			}
			self.$axios.post('/SpringJob/ListByPage?page=' + self.searchForm.page + "&size=" + self.searchForm.size, self.searchForm, {
				timeout: 1000 * 60 * 0.5
			}).then(function(response) {
				if (response.data.code == 200) {
					self.tableData = response.data.data;
					self.total = response.data.count;
					self.loading = false;
				} else {
					self.$message.error(response.data.msg);
				}
			}).catch(function(error) {
				self.$message.error('数据加载失败!');
			});
		},
		//显示新增界面
		handleAdd: function() {
			this.listSpringGroup();
			this.dialogAddVisible = true;
		},
		// 保存
		handleSave: function(formName) {
			let self = this;
			this.$refs[formName].validate((valid) => {
				if (valid) {
					this.$axios.post('/SpringJob/AddTask', this.addForm, {
						timeout: 1000 * 60 * 2
					}).then((res) => {
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
					this.$message.error('请填写必填项');
				}
			})
		},
		//更新
		handleUpdate: function(formName) {
			let self = this;
			this.$axios.post('/SpringJob/UpdateTask', this.editForm, {
				timeout: 1000 * 60 * 2
			}).then((res) => {
				self.$message.success(res.data.msg);
				self.handleSearch();
				self.dialogEditVisible = false;
			}).catch(function(error) {
				self.$message.error('数据加载失败!');
			});
		},
		// 显示编辑界面
		handleEdit: function() {
			let self = this;
			if (self.multipleSelection.length == 0) {
				self.$message.warning('请选择修改项目');
			} else if (self.multipleSelection.length > 1) {
				self.$message.warning('只允许选择一项修改项目');
			} else {
				self.editForm = self.multipleSelection[0];
				this.listSpringGroup();
				console.log(self.editForm);
				this.dialogEditVisible = true;
			}
		},
		// 显示编辑界面
		handleSingleEdit: function(index, row) {
			let self = this;
			this.listSpringGroup();
			self.editForm = row;
			this.dialogEditVisible = true;
		},


		//显示导入界面
		handleImport: function() {
			this.dialogImportVisible = true;
		},


		//删除
		handleDel: function() {
			let self = this;
			let ids = [];
			if (self.multipleSelection.length == 0) {
				self.$message.warning('请选择删除项目');
				return;
			}
			this.$confirm('确认删除该记录吗?', '提示', {
				type: 'warning'
			}).then(() => {
				self.multipleSelection.map((item) => {
					ids.push(item.id);
				});
				self.$axios.post('/SpringJob/SetDeleted', qs.stringify({
					'ids': ids
				}, {
					indices: false
				})).then(function(response) {
					self.$message.success(response.data.msg);
					self.handleSearch();
				}).catch(function(error) {
					self.$message.error('数据加载失败!');
				});
			}).catch(() => {})
		},
		handleSingleDelete(index, row) {
			let self = this;
			self.$confirm('确认删除该记录吗?', '提示', {
				type: 'warning'
			}).then(() => {
				let para = {
					taskClassName: row.taskClassTitle,
					groupCode: groupCode
				};
				axios.post('/SpringJob/DeleteTask', qs.stringify(para))
					.then(function(response) {
						self.$message.success(response.data.msg);
						self.handleSearch();
					})
					.catch(function(error) {
						self.$message.error('数据加载失败!');
					});
			}).catch(() => {});
		},
		handlePauseEdit(index, row) {
			let self = this;
			self.$confirm('确认暂停任务吗?', '提示', {
				type: 'warning'
			}).then(() => {
				let para = {
					taskClassName: row.taskClassTitle,
					groupCode: row.groupCode
				};
				axios.post('/SpringJob/PauseTask', qs.stringify(para))
					.then(function(response) {
						self.$message.success(response.data.msg);
						self.handleSearch();
					})
					.catch(function(error) {
						self.$message.error('数据加载失败!');
					});
			}).catch(() => {});
		},
		handleResumeEdit(index, row) {
			let self = this;
			self.$confirm('确认恢复任务吗?', '提示', {
				type: 'warning'
			}).then(() => {
				let para = {
					taskClassName: row.taskClassTitle,
					groupCode: row.groupCode
				};
				axios.post('/SpringJob/ResumeTask', qs.stringify(para))
					.then(function(response) {
						self.$message.success(response.data.msg);
						self.handleSearch();
					})
					.catch(function(error) {
						self.$message.error('数据加载失败!');
					});
			}).catch(() => {});
		},
		listSpringGroup() {
			let self = this;
			axios.post('/SpringJobGroup/ListAll')
				.then(function(response) {
					self.springJobGroups = response.data.data;
					//console.log(self.springJobGroups);
					//self.$message.success(response.data.msg);
					//self.handleSearch();
				})
		},
		springJobGroupListAddChange: function(selectVal) {
			let obj = {};
			console.log(selectVal);
			obj = this.springJobGroups.find((item) => {
				return item.code === selectVal;
			});
			if (obj == "" || obj == undefined) {
				this.$message.error('请选择任务组!');
				return;
			}
			this.addForm.groupTitle = obj.title;
			this.addForm.groupCode = obj.code;
		},
		springJobGroupListEditChange: function(selectVal) {

			let obj = {};
			obj = this.springJobGroups.find((item) => {
				return item.code === selectVal;
			});
			if (obj == "" || obj == undefined) {
				this.$message.error('请选择任务组!');
				return;
			}
			this.editForm.groupTitle = obj.title;
			this.editForm.groupCode = obj.code;
		},
		// 上传
		//关装对话框
		handleClose(done) {
			this.$confirm('确认关闭？')
				.then(_ => {
					done();
				})
				.catch(_ => {});
		}
	}
}
