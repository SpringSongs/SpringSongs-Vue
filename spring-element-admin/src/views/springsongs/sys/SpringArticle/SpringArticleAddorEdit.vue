<template>
  <el-dialog title="新增" :visible.sync="openDialog" width="90%" :before-close="handleClose">
    <el-form ref="addForm" :model="addForm" label-width="80px" :rules="addFormRules">
      <el-row>
        <el-col :span="18">
          <el-form-item label="标题" prop="title">
            <el-input v-model="addForm.title" auto-complete="off" />
          </el-form-item>
          <el-form-item label="分类" prop="categoryTitle">
            <el-popover ref="menuListPopover" placement="bottom-start" trigger="click">
              <el-tree
                ref="menuListTree"
                :data="menuList"
                :props="menuListTreeProps"
                node-key="id"
                :default-expand-all="true"
                :highlight-current="true"
                :expand-on-click-node="false"
                @current-change="menuListTreeCurrentChangeHandle"
              />
            </el-popover>
            <el-input
              v-model="addForm.categoryTitle"
              v-popover:menuListPopover
              :readonly="true"
              placeholder="点击选择分类"
              class="menu-list__input"
            />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="色彩" prop="color">
            <el-color-picker v-model="addForm.color" size="mini" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="标签" prop="tag">
        <el-input v-model="addForm.tag" auto-complete="off" />
      </el-form-item>
      <el-form-item label="关键字" prop="keyword">
        <el-input v-model="addForm.keyword" auto-complete="off" />
      </el-form-item>
      <el-form-item label="简要说明" prop="summary">
        <el-input v-model="addForm.summary" type="textarea" :rows="3" auto-complete="off" />
      </el-form-item>
      <el-form-item label="内容" prop="contents" />
      <el-form-item label="作者" prop="author">
        <el-input v-model="addForm.author" auto-complete="off" />
      </el-form-item>
      <el-form-item label="作者链接" prop="authorUrl">
        <el-input v-model="addForm.authorUrl" auto-complete="off" />
      </el-form-item>
      <el-row>
        <el-col :span="8">
          <el-form-item label="排序" prop="sortOrder">
            <el-input-number v-model="addForm.sortOrder" auto-complete="off" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="来源" prop="comeFrom">
            <el-input v-model="addForm.comeFrom" auto-complete="off" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="来源链接" prop="comeFromLink">
            <el-input v-model="addForm.comeFromLink" auto-complete="off" />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogAddVisible = false">取 消</el-button>
      <el-button type="primary" @click="handleSave('addForm')">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script src="./SpringArticleAddorEdit.js"></script>

<style>
</style>
