<template>
  <el-container class="layout-container-demo">
    <el-aside width="200px">
      <el-scrollbar>
        <el-menu :default-openeds="['1', '3']">
          <el-sub-menu index="1">
            <template #title>
             
            </template>
            <el-menu-item-group>
              <template #title>Group 1</template>
              <el-menu-item  index="1-1">车辆信息管理</el-menu-item>
             
            </el-menu-item-group>
          </el-sub-menu>
        </el-menu>
      </el-scrollbar>
    </el-aside>

    <el-container>
      <el-header style="text-align: center; font-size: 12px;"> 
        <h1 class="text-black-blue font-bold font-large" style="display: inline-block; vertical-align: middle;">车辆信息管理系统</h1>
      </el-header>
      <br>
      <el-button  @click="dialogFormVisible = true" type="primary">
    添加车辆信息
  </el-button>
  <el-dialog v-model="dialogFormVisible" title="添加车辆信息" width="500" >
    <el-form :model="form">
      <el-form-item label="品牌">
      <el-input v-model="newcar.brand" />
    </el-form-item>
    <el-form-item label="车主姓名">
      <el-input v-model="newcar.name" />
    </el-form-item>
    <el-form-item label="颜色">
      <el-radio-group v-model="newcar.color">
        <el-radio value="红色">红色</el-radio>
        <el-radio value="橙色">橙色</el-radio>
        <el-radio value="黄色">黄色</el-radio>
        <el-radio value="绿色">绿色</el-radio>
        <el-radio value="蓝色">蓝色</el-radio>
        <el-radio value="紫色">紫色</el-radio>
      </el-radio-group>
    </el-form-item>
  
    
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="add()" >
          提交
        </el-button>
      </div>
    </template>
  </el-dialog>
      <div class="toolbar" style="display: flex; gap: 10px;">
    <div>
      车辆品牌<el-input style="width: 200px" placeholder="请输入车辆品牌" v-model="brand" />
    </div>
    <div>
      <el-button type="primary" @click="search">搜索</el-button>
    </div>
  </div>
  <div>
    <el-table :data="currentPageData" style="width: 100%">
    <el-table-column label="品牌" prop="brand" />
    <el-table-column label="车主姓名" prop="name" />
    <el-table-column label="颜色" prop="color" />
    <el-table-column label="操作">
      <template v-slot="scope">
        <el-button 
          size="small" 
          type="primary" 
          @click="dialogVisible = true">编辑</el-button>
  <el-dialog v-model="dialogVisible" title="修改车辆信息" width="500" >
    <el-form :model="form">
      <el-form-item label="品牌">
      <el-input v-model="scope.row.brand" />
    </el-form-item>
    <el-form-item label="车主姓名">
      <el-input v-model="scope.row.name" />
    </el-form-item>
    <el-form-item label="颜色">
      <el-radio-group v-model="scope.row.color">
        <el-radio value="红色">红色</el-radio>
        <el-radio value="橙色">橙色</el-radio>
        <el-radio value="黄色">黄色</el-radio>
        <el-radio value="绿色">绿色</el-radio>
        <el-radio value="蓝色">蓝色</el-radio>
        <el-radio value="紫色">紫色</el-radio>
      </el-radio-group>
    </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="update(scope.row)">
          修改
        </el-button>
      </div>
    </template>
  </el-dialog>
        <el-button 
          size="small" 
          type="danger" 
          @click="handleDelete(scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
<div style="display: flex; justify-content: center;">
  <el-pagination
    background
    layout="prev, pager, next"
    :total="total"
    :current-page="currentPage"
    @current-change="handleCurrentChange"
    :page-size="pageSize"
  />
</div>

</div>
    </el-container>
  </el-container>
</template>
<script setup>
import {  onMounted,computed, ref} from 'vue'
import { api } from '@/api/apis'
import { ElMessage } from 'element-plus';
import { reactive } from 'vue'

let newcar = reactive({
  brand: '',
  name: '',
  color: '',
})
let dialogFormVisible = ref(false);
let dialogVisible = ref(false);
const formLabelWidth = '140px';
let form=ref('');
const currentPageData = ref([]);
const currentPage = ref(1); 
const pageSize = ref(10); 
const total = ref(0); 
let drawerData =ref('')
let cardata =ref('')
const handleCurrentChange = (newPage) => {
  // 根据新的页码更新当前页的数据
  currentPage.value = newPage;
  const startIndex = (newPage - 1) * pageSize.value;
  currentPageData.value = car.value.slice(startIndex, startIndex + pageSize.value);
}


function showDrawer(row) {
       drawerData = row; // 更新当前行的数据
      this.drawer = true; // 打开 el-drawer
    }
function add(){
  dialogFormVisible = false,
  api.carApi.add(newcar).then((res) => {
    ElMessage.success('添加成功');
    fetchSystemList();
  })
}
function update(row){
  dialogVisible = false,
  api.carApi.update(row).then((res) => {
    ElMessage.success('修改成功');
    fetchSystemList();
  })
}
function handleDelete(row){
  console.log('Delete:', row);
  cardata=row;
  console.log('Delete:', cardata);
  api.carApi.delete(cardata).then((res) => {
    ElMessage.success('删除成功');
    fetchSystemList();
  })
}
onMounted(() => { 
  fetchSystemList();
 
});

function fetchSystemList() {
    api.carApi.get().then((res) => {
      car.value = res.data
      currentPageData.value = car.value.slice(0, pageSize.value);
      total.value = car.value.length;
    })
  }
const drawer = ref(false)
  const car=ref([])

const name=ref('')
const document=ref('')
const organ=ref('')
const content=ref('')
const brand=ref('')
function search(){
  console.log(brand.value)
  api.carApi.search(brand.value).then((res) => {

    car.value = res.data;
    currentPageData.value = car.value.slice(0, pageSize.value);
      total.value = car.value.length;
  })
}

</script>

<style scoped>
.button-container {
  display: flex;
  justify-content: center; /* 水平居中 */
}

.layout-container-demo {
  width: 100%;
}
.layout-container-demo .el-header {
  position: relative;
  background-color: var(--el-color-primary-light-7);
  color: var(--el-text-color-primary);
}
.layout-container-demo .el-aside {
  color: var(--el-text-color-primary);
  background: var(--el-color-primary-light-8);
}
.layout-container-demo .el-menu {
  border-right: none;
}
.layout-container-demo .el-main {
  padding: 0;
}
.layout-container-demo .toolbar {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  right: 20px;
}
.text-center {
  text-align: center;
}

.text-black-blue {
  color: #0000FF; /* 黑蓝色 */
}

.font-bold {
  font-weight: bold; /* 加粗 */
}

.font-large {
  font-size: 36px;
}
.el-drawer__wrapper.custom-modal {
  background-color: rgba(0, 0, 0, 0.5) !important;
}


</style>