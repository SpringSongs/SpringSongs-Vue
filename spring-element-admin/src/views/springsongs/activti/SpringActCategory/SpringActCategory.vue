<template>
	<section>
		<el-row>
			<el-col :span='24'>
				<div class='bg-white h-100 mx-1 p-1 shadowed'>
					<el-tabs type="border-card">
						<el-tab-pane label="模型分类">
							<el-form :model="searchForm" ref="searchForm">
								<el-row>
									<el-col :span="6">
										<div class="demo-input-suffix">
											<el-input v-model='searchForm.categoryCode' placeholder='请输入编码' auto-complete='off'></el-input>
										</div>
									</el-col>
									<el-col :span="6">
										<div class="demo-input-suffix">
											<el-input v-model='searchForm.categoryTitle' placeholder='请输入内容' auto-complete='off'></el-input>
										</div>
									</el-col>
								</el-row>
							</el-form>
						</el-tab-pane>
					</el-tabs>
					<el-tabs type='border-card'>
						<el-tab-pane label="任务组管理">


							<el-button-group>
								<el-button type='primary' @click='handleSearch()' icon="el-icon-search">查询</el-button>
								<el-button type='primary' @click='handleAdd()' icon="el-icon-circle-plus">新增</el-button>
								<el-button type='primary' @click='handleEdit()' icon="el-icon-edit">修改</el-button>
								<el-button type='primary' @click='handleDel()' icon="el-icon-remove">删除</el-button>

							</el-button-group>

							<template>
								<el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" highlight-current-row style="width: 100%;"
								 @selection-change="handleSelectionChange">
									<el-table-column type='selection' width='55'>
									</el-table-column>
									<el-table-column type='index' width='60'>
									</el-table-column>
									<el-table-column prop='categoryCode' label='模型分类编码' width='180'></el-table-column>
									<el-table-column prop='categoryTitle' label='模型分类名称' width='180'></el-table-column>
									<el-table-column fixed='right' label='操作' width='200'>
										<template slot-scope='scope'>
											<el-button icon="el-icon-edit" @click='handleSingleEdit(scope.$index, scope.row)' type='text' size='small'>编辑</el-button>
											<el-button type="text" icon="el-icon-delete" class="red" @click="handleSingleDelete(scope.$index, scope.row)">删除</el-button>
										</template>
									</el-table-column>
								</el-table>
								<el-row>
									<el-col :span='24' class='toolbar' style='padding-bottom: 0px;'>
										<div class='pagination'>
											<el-pagination @current-change='handleCurrentChange' @size-change="sizeChangeHandle" layout="total, sizes, prev, pager, next, jumper"
											 :total='total' :page-size='searchForm.size' :current-page='searchForm.page'>
											</el-pagination>
										</div>
									</el-col>
								</el-row>
							</template>
							<!--新增-->
							<el-dialog title='新增' :visible.sync='dialogAddVisible' width='50%' :before-close='handleClose'>
								<el-form :model='addForm' label-width='80px' :rules='addFormRules' ref='addForm'>
									<el-form-item label='模型分类编码' prop="categoryCode">
										<el-input v-model='addForm.categoryCode' auto-complete='off'></el-input>
									</el-form-item>
									<el-form-item label='模型分类名称' prop="categoryTitle">
										<el-input v-model='addForm.categoryTitle' auto-complete='off'></el-input>
									</el-form-item>
								</el-form>
								<span slot='footer' class='dialog-footer'>
									<el-button @click='dialogAddVisible = false'>取 消</el-button>
									<el-button type='primary' @click="handleSave('addForm')">确 定</el-button>
								</span>
							</el-dialog>
							<!--修改-->
							<el-dialog title='修改' :visible.sync='dialogEditVisible' width='50%' :before-close='handleClose'>
								<el-form :model='editForm' label-width='80px' :rules='editFormRules' ref='editForm'>
									<el-form-item label='模型分类编码' prop="categoryCode">
										<el-input v-model='editForm.categoryCode' auto-complete='off'></el-input>
									</el-form-item>
									<el-form-item label='模型分类名称' prop="categoryTitle">
										<el-input v-model='editForm.categoryTitle' auto-complete='off'></el-input>
									</el-form-item>
								</el-form>
								<span slot='footer' class='dialog-footer'>
									<el-button @click='dialogEditVisible = false'>取 消</el-button>
									<el-button type='primary' @click="handleUpdate('editForm')">确 定</el-button>
								</span>
							</el-dialog>

						</el-tab-pane>
					</el-tabs>
				</div>
			</el-col>
		</el-row>
	</section>
</template>

<script src="./SpringActCategory.js">
</script>

<style>
</style>
