
import qs from 'qs';
import axios from 'axios';
export default {
	name: 'editor',
	data() {
		return {
			editorOption: {
				placeholder: 'Hello World'
			},
			tableData: [],
			total: 1,
			multipleSelection: [],
			searchForm: {
				size: 20,
				searchDate: {},
			},
			ListTreeProps: {
				label: 'name',
				children: [],
				isLeaf: 'leaf'
			},
			menuList: [],
			menuListTreeProps: {
				label: 'title',
				children: 'children'
			},
			dialogAddVisible: false,
			dialogEditVisible: false,
			//新增界面数据
			addForm: {
				sortOrder: 99,
				categoryTitle: '',
			},
			uploadForm: {},
			editForm: {
				sortOrder: 99,
				categoryTitle: '',
			},
			addFormRules: {
				title: [{
						required: true,
						message: '请输入标题',
						trigger: 'blur'
					}, {
						min: 4,
						message: '标题至少4位'
					},
					{
						max: 200,
						message: '标题最多200位'
					},
				],
				categoryId: [{
					required: true,
					message: '请选择分类',
					trigger: 'blur'
				}],
				categoryTitle: [{
					required: true,
					message: '请选择分类',
					trigger: 'blur'
				}],
				contents: [{
					required: true,
					message: '请输入内容',
					trigger: 'blur'
				}],
			},
			editFormRules: {
				title: [{
						required: true,
						message: '请输入标题',
						trigger: 'blur'
					}, {
						min: 4,
						message: '标题至少4位'
					},
					{
						max: 200,
						message: '标题最多200位'
					},
				],
				contents: [{
					required: true,
					message: '请输入内容',
					trigger: 'blur'
				}],
				categoryId: [{
					required: true,
					message: '请选择分类',
					trigger: 'blur'
				}],
				categoryTitle: [{
					required: true,
					message: '请选择分类',
					trigger: 'blur'
				}],

			},
		}
	},
	created() {
		this.handleSearch();
	},
	components: {
		quillEditor,
		AddOrUpdate
	},
	methods: {
		onEditorChange({
			editor,
			html,
			text
		}) {
			this.addForm.contents = html;
			this.editForm.contents = html;
		},
		handleRefresh: function() {
			this.searchForm.categoryId = "";
			this.searchForm.created_on = "";
			this.searchForm.map = {};
			this.handleSearch();
		},
		handleSelectionChange: function(val) {
			this.multipleSelection = val;
		},
		handleCurrentChange: function(val) {
			this.searchForm.page = val;
			this.handleSearch();
		},
		handleArticleCategory: function() {
			let self = this;
			self.$router.push('SpringArticleCategory');
		},
		handleArticleComment: function() {
			let self = this;
			self.$router.push('SpringArticleComment');
		},
		//重置表单
		resetForm: function(formName) {
			this.$refs[formName].resetFields();
		},
		//显示新增界面
		handleAdd: function() {
			this.handleListCategoryTree();
			this.dialogAddVisible = true;
		},
		//加载树型区域菜单
		handleLoadTrea: function(node, resolve) {
			if (node.level === 0) {
				this.node_had = node;
				this.resolve_had = resolve;
				this.loadTrea(resolve, "0")
			}
			if (node.level >= 1) {

				this.loadTrea(resolve, node.data.id);
			}
		},
		//加载树型区域菜单
		loadTrea: function(resolve, parentId) {
			let self = this;
			self.$axios.post("/SpringArticleCategory/GetCategorysByParent", qs.stringify({
				"parentId": parentId
			})).then((res) => {
				resolve(res.data.data);
			}).catch(function(error) {
				resolve([]);
				self.$message.error("数据加载失败!");
			});
		},
		//点击节点事件
		handleNodeClick: function(data) {
			this.searchForm.categoryId = data.id;
			this.handleSearch();
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
				self.handleListCategoryTree();
				console.log(self.editForm);
				self.dialogEditVisible = true;
			}
		},
		// 显示编辑界面
		handleSingleEdit: function(index, row) {
			let self = this;
			self.editForm = row;
			self.handleListCategoryTree();
			this.dialogEditVisible = true;
		},
		//关装对话框
		handleClose: function(done) {
			this.$confirm('确认关闭？')
				.then(_ => {
					done();
				})
				.catch(_ => {});
		},
		// 查询
		handleSearch: function() {
			let self = this;
			if (this.searchForm.created_on) {
				this.searchForm.searchDate.createTimeStart = this.searchForm.created_on[0];
				this.searchForm.searchDate.createTimeEnd = this.searchForm.created_on[1];
			}
			if (self.searchForm.page == undefined) {
				self.searchForm.page = 0;
			}
			self.$axios.post('/SpringAritlce/ListByPage?page=' + self.searchForm.page + "&size=" + self.searchForm.size,
				self.searchForm).then((res) => {
				if (res.data.code == 200) {
					self.tableData = res.data.data;
					self.total = res.data.count;
					self.loading = false;
				} else {
					self.$message.error(res.data.msg);
				}
			}).catch((error) => {
				self.$message.error('数据加载失败!');
			});
		},
		// 保存
		handleSave: function(formName) {
			let self = this;
			self.$refs[formName].validate((valid) => {
				if (valid) {
					self.$axios.post('/SpringAritlce/Create', this.addForm).then((res) => {
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
			self.$axios.post('/SpringAritlce/Edit', this.editForm).then((res) => {
				self.$message.success(res.data.msg);
				self.handleSearch();
				self.dialogEditVisible = false;
			}).catch((error) => {
				self.$message.error('数据加载失败!');
			});
		},
		handleAuditStatus: function(index, row) {
			let self = this;
			self.$axios.post('/SpringAritlce/Audit/' + row.id).then((res) => {
				if (res.data.code == 200) {
					self.$message.success(res.data.msg);
					self.handleSearch();
				} else {
					self.$message.error(res.data.msg);
				}
			});
		},
		handleHotStatus: function(index, row) {
			let self = this;
			self.$axios.post('/SpringAritlce/HotStatus/' + row.id).then((res) => {
				if (res.data.code == 200) {
					self.$message.success(res.data.msg);
					self.handleSearch();
				} else {
					self.$message.error(res.data.msg);
				}
			});
		},
		handleTopStatus: function(index, row) {
			let self = this;
			self.$axios.post('/SpringAritlce/TopStatus/' + row.id).then((res) => {
				if (res.data.code == 200) {
					self.$message.success(res.data.msg);
					self.handleSearch();
				} else {
					self.$message.error(res.data.msg);
				}
			});
		},
		handleFeatured: function(index, row) {
			let self = this;
			self.$axios.post('/SpringAritlce/Featured/' + row.id).then((res) => {
				if (res.data.code == 200) {
					self.$message.success(res.data.msg);
					self.handleSearch();
				} else {
					self.$message.error(res.data.msg);
				}
			});
		},
		//删除
		handleDel: function() {
			let self = this;
			let ids = [];
			if (self.multipleSelection.length == 0) {
				self.$message.warning('请选择删除项目');
				return;
			}
			self.$confirm('确认删除该记录吗?', '提示', {
				type: 'warning'
			}).then(() => {
				self.multipleSelection.map((item) => {
					ids.push(item.id);
				});
				self.$axios.post('/SpringAritlce/SetDeleted', qs.stringify({
					'ids': ids
				}, {
					indices: false
				})).then((res) => {
					self.$message.success(res.data.msg);
					self.handleSearch();
				}).catch((error) => {
					self.$message.error('数据加载失败!');
				});
			}).catch(() => {})
		},
		handleSingleDelete: function(index, row) {
			let self = this;
			self.$confirm('确认删除该记录吗?', '提示', {
				type: 'warning'
			}).then(() => {
				let para = {
					ids: row.id
				};
				self.$axios.post('/SpringAritlce/SetDeleted', qs.stringify(para))
					.then((res) => {
						self.$message.success(res.data.msg);
						self.handleSearch();
					})
					.catch((error) => {
						self.$message.error('数据加载失败!');
					});
			}).catch(() => {});
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
		handleListCategoryTree: function() {
			let self = this;
			self.$axios.post('/SpringArticleCategory/listAllRecord').then((res) => {
				if (res.data.code == 200) {
					self.menuList = self.treeDataTranslate(res.data.data);
				} else {
					self.$message.error(res.data.msg);
				}
			});
		},
		menuListTreeCurrentChangeHandle(data, node) {
			this.addForm.categoryId = data.id;
			this.addForm.categoryTitle = data.title;
		},
		menuListTreeCurrentEditHandle(data, node) {
			this.editForm.categoryId = data.id;
			this.editForm.categoryTitle = data.title;
		},
	}
}
