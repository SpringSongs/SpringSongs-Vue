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
			springActCategorys: [],
			dialogAddVisible: false,
			dialogEditVisible: false,
			dialogImportVisible: false,
			//新增界面数据
			addForm: {},
			uploadForm: {},
			editForm: {},
			href: '',
			addFormRules: {
				categoryCode: [{
					required: true,
					message: '请选择模型类型',
					trigger: 'blur'
				}],
				name: [{
					required: true,
					message: '模型名称',
					trigger: 'blur'
				}],
				key: [{
					required: true,
					message: '模型名称',
					trigger: 'blur'
				}],
			},
			editFormRules: {
				categoryCode: [{
					required: true,
					message: '请选择模型类型',
					trigger: 'blur'
				}],
				name: [{
					required: true,
					message: '模型名称',
					trigger: 'blur'
				}],
				key: [{
					required: true,
					message: '模型名称',
					trigger: 'blur'
				}],
			},
			uploadFormRules: {},
			importFormRules: {
				name: [{
					required: true,
					message: '请输入姓名',
					trigger: 'blur'
				}]
			},
		}
	},
	created() {
		//this.handleSearch();
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
			self.$axios.post('/SpringActModel/ListByPage?page=' + self.searchForm.page + "&size=" + self.searchForm.size, self.searchForm, {
				timeout: 1000 * 60 * 0.5
			}).then(function(response) {
				self.tableData = response.data.data;
				self.total = response.data.count;
				self.loading = false;
			}).catch(function(error) {
				self.$message.error('数据加载失败!');
			});
		},
		//显示新增界面
		handleAdd: function() {
			this.listSpringActCategory();
			this.dialogAddVisible = true;
		},
		// 保存
		handleSave: function(formName) {
			let self = this;
			this.$refs[formName].validate((valid) => {
				if (valid) {
					this.$axios.post('/SpringActModel/Create', this.addForm, {
						timeout: 1000 * 60 * 2
					}).then((res) => {
						if (res.data.code == 200) {
							self.$message.success(res.data.msg);
							var location = response.data
							this.href = `/static/activiti${location}`
							this.$nextTick(() => {
							  var a = this.$refs.a
							  var e = document.createEvent('MouseEvents')
							  e.initEvent('click', true, true)
							  a.dispatchEvent(e)
							})
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
			this.$axios.post('/SpringActModel/Edit', this.editForm, {
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
				this.listSpringActCategory();
				self.editForm = self.multipleSelection[0];
				console.log(self.editForm);
				this.dialogEditVisible = true;
			}
		},
		// 显示编辑界面
		handleSingleEdit: function(index, row) {
			let self = this;
			this.listSpringActCategory();
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
				self.$axios.post('/SpringActModel/SetDeleted', qs.stringify({
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
					ids: row.id
				};
				axios.post('/SpringActModel/SetDeleted', qs.stringify(para), )
					.then(function(response) {
						self.$message.success(response.data.msg);
						self.handleSearch();
					})
					.catch(function(error) {
						self.$message.error('数据加载失败!');
					});
			}).catch(() => {});
		},

		springActCategoryListAddChange: function(selectVal) {
			this.addForm.categoryCode = selectVal;
		},
		springActCategoryListEditChange: function(selectVal) {
			this.editForm.categoryCode = selectVal;
		},

		listSpringActCategory() {
			let self = this;
			axios.post('/SpringActCategory/ListAll')
				.then(function(response) {
					self.springActCategorys = response.data.data;
					//console.log(self.springJobGroups);
					//self.$message.success(response.data.msg);
					//self.handleSearch();
				})
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
