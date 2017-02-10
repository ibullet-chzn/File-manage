<template lang="html">
  <div class="content-wrapper">
    <!-- Content Header (Page header) -->
    <section class="content-header">
      <h1>
        XX管理系统
        <small>Version 2.0</small>
      </h1>
      <ol class="breadcrumb">
        <li>
          <router-link to="/app/home"><i class="glyphicon glyphicon-home"></i> 主页</router-link>
        </li>
        <!--<li class="active">Dashboard</li>-->
      </ol>
    </section>

    <!-- Main content -->
    <section class="content">
      <div class="row">
        <!-- left column -->
        <div class="col-md-12">
          <!-- general form elements -->
          <div class="box box-primary">
            <div class="box-header with-border">
              <h3 class="box-title">文件分类</h3>
            </div>
            <!-- /.box-header -->
            <div class="box-body">
              <data-tables :data="tableData"
                           :tool-bar-def='toolBarDef'
                           :row-action-def='rowActionsDef'>
                <el-table-column prop="id" label="编号"></el-table-column>
                <el-table-column prop="class_name" label="分类名称"></el-table-column>
                <el-table-column prop="file_number" label="文件数"></el-table-column>
                <el-table-column prop="people_number" label="用户数"></el-table-column>
              </data-tables>
            </div>
          </div>
          <!-- /.box -->
        </div>
        <!--/.col (left) -->
      </div>
      <!-- /.row -->
      <div style="padding: 10px 0px; text-align: center;">
        <div class="text-muted">Excuse the ads! We need some help to keep our site up.</div>
      </div>
    </section>
  </div>
</template>
<script lang="babel">
  import DataTables from 'vue-data-tables'
  export default {
    components: {
      DataTables
    },
    data () {
      return {
        tableData: [],
        rowActionsDef: this.getRowActionsDef(),
        toolBarDef: this.getToolBarDef()
      }
    },
    created: function () {
      this.$http.post('/api/getClassificationInfo').then(res => {
        if (res.data.status == 0) {
          this.tableData = res.data.result;
        }
      }, err => {
        console.log(err);
      })
    },
    methods: {
      getToolBarDef: function () {
        let actions = [{
          name: '添加分类',
          handler: () => {
            this.addClassification();
          },
          icon: 'plus'
        }];
        return {
          actions: {
            width: 5,
            def: actions
          },
          filters: {
            width: 14,
            prop: '',
            def: []
          }
        }
      },
      getRowActionsDef: function () {
        return [{
          type: 'primary',
          handler: row => {
            console.log(row);
          },
          tip: '文件列表'
        }, {
          type: 'primary',
          handler: row => {
            console.log(row);
          },
          tip: '用户列表'
        }]
      },
      addClassification() {
        this.$prompt('请输入分类名称', '添加分类', {
          confirmButtonText: '添加',
          cancelButtonText: '取消',
          inputPlaceholder: '2-7个汉字',
          inputPattern: /^[\u4e00-\u9fa5]{2,7}$/,
          inputErrorMessage: '格式不正确'
        }).then(({value}) => {
          this.$http.post('/api/addClassification', {
            name: value
          }).then(res => {
            if (res.data.status == 0) {
              this.$http.post('/api/getClassificationInfo').then(res => {
                if (res.data.status == 0) {
                  this.tableData = res.data.result;
                  this.$message({
                    type: 'success',
                    message: '添加成功'
                  });
                }
              }, err => {
                console.log(err);
              })
            }
          }, err => {
            console.log(err);
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消输入'
          });
        });
      }
    }
  }
</script>

<style lang="less">
  .red {
    color: red;
  }
</style>
