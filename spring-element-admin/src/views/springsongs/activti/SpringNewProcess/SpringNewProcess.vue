<template>
  <div>
    <div style="padding: 15px;">
      <div class="process-wrapper">
        <el-card
          v-for="(list,index) in tableData"
          :key="index"
          :body-style="{ padding: '0px',overflow: 'hidden' }"
          class="card-body"
          @click.native="launch(list)"
        >
          <div class="left">
            <p class="title">{{ list.name[0] }}</p>
          </div>
          <div class="right">
            <p class="process-name">{{ list.name }}</p>
            <p class="process-desc">描述</p>
          </div>
        </el-card>
      </div>
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
    </div>
  </div>
</template>
<script src="./SpringNewProcess.js">
</script>

<style lang="scss" scoped>
  .levelbar {
    height: 64px;
    line-height: 64px;
  }

  .process-wrapper {
    overflow: hidden;

    .tips {
      height: 40px;
      line-height: 40px;
      color: #b84592
    }

    .card-body {
      width: 300px;
      float: left;
      margin: 10px;
      cursor: pointer;

      .left {
        float: left;
        width: 100px;
        height: 100px;
        padding: 10px;
        // background-image: linear-gradient(90deg,#0af,#0085ff);
        background: rgba(80, 191, 255, 0.92);

        .title {
          width: 100%;
          height: 100%;
          text-align: center;
          font-size: 30px;
          color: white;
        }
      }

      .right {
        width: 160px;
        height: 100px;
        float: left;
        padding: 10px;
        position: relative;
        background: rgba(80, 191, 12, 0.92);

        .process-name {
          font-size: 16px;
          height: 24px;
          line-height: 24px;
        }

        .process-desc {
          height: 24px;
          line-height: 24px;
        }

        .action {
          position: absolute;
          right: 10px;
          bottom: 10px;
        }
      }
    }
  }
</style>
