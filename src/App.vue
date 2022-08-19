<template>
  <div class="table-box">
    <!--标题-->
    <div class="title">
      <h2>最简单的CRUD DEOM</h2>
    </div>
    <div class="query-box">
      <el-input class="query-input" v-model="queryInput" placeholder="请输入姓名搜索" />
      <div class="button-list">
        <el-button type="success"  @click="handleAdd">增加</el-button>
        <el-button type="danger"  @click="handleDelList" v-if="multipleSelection.length>0">删除多选</el-button>
      </div>
      </div>
    <!--Dialog-->
    <el-dialog v-model="dialogFormVisible" :title="dialogType==='add'? '新增':'编辑'">
      <el-form :model="tableForm">
        <el-form-item label="姓名" :label-width="80">
          <el-input v-model="tableForm.name" autocomplete="off" />
        </el-form-item>
        <el-form-item label="邮箱" :label-width="80">
          <el-input v-model="tableForm.email" autocomplete="off" />
        </el-form-item>
        <el-form-item label="电话" :label-width="80">
          <el-input v-model="tableForm.phone" autocomplete="off" />
        </el-form-item>
        <el-form-item label="状态" :label-width="80">
          <el-input v-model="tableForm.state" autocomplete="off" />
        </el-form-item>
        <el-form-item label="地址" :label-width="80">
          <el-input v-model="tableForm.address" autocomplete="off" />
        </el-form-item>
      </el-form>
      <template #footer>
      <span class="dialog-footer">
        <el-button type="primary" @click="dialogConfirm">
          确认
        </el-button>
      </span>
      </template>
    </el-dialog>
    <!--table-->
    <el-table
        :data="tableData"
        style="width: 100%"
        border
        ref="multipleTableRef"
        @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" />
      <el-table-column prop="name" label="姓名" width="120" />
      <el-table-column prop="email" label="邮箱" width="180" />
      <el-table-column prop="phone" label="电话" width="150" />
      <el-table-column prop="state" label="状态" width="120" />
      <el-table-column prop="address" label="地址" width="120" />
      <el-table-column fixed="right" label="操作" width="120">
        <template #default = "scope">
          <el-button link type="danger" size="small"  @click.prevent="handleDelete(scope.row)">删除</el-button>
          <el-button link type="primary" size="small" @click="handleEdit(scope.row)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup>
import {ref} from "vue"
//数据
var queryInput = ref("")
var tableData =ref([
  {
    id:1,
    name:"张1",
    email:"12345678@qq.com",
    phone:"1234567890123",
    state:"在职",
    address:"广东省",
  },
  {
    id:2,
    name:"张2",
    email:"12345678@qq.com",
    phone:"1234567890123",
    state:"在职",
    address:"广东省",
  },
  {
    id:3,
    name:"张3",
    email:"12345678@qq.com",
    phone:"1234567890123",
    state:"在职",
    address:"广东省",
  },
  {
    id:4,
    name:"张4",
    email:"12345678@qq.com",
    phone:"1234567890123",
    state:"在职",
    address:"广东省",
  },
])
var multipleSelection = ref([])
var dialogFormVisible = ref(false)
var tableForm = ref({
  id:1,
  name:"张三",
  email:"123@qq.com",
  phone:"1234567890123",
  state:"在职",
  address:"广东省",
})
var dialogType = ref("add")
var id = 4
// 方法

//删除一条
const handleDelete = ({id})=>{
//  1.通过id获取到条目对应的index
  var index = tableData.value.findIndex(item=>item.id === id)
//  2.通过index删除条目
  tableData.value.splice(index, 1)
}
//删除多条
const handleDelList = ()=>{
  multipleSelection.value.forEach(id =>{
    handleDelete({id})
  })
  multipleSelection.value = []
}

//选中
const handleSelectionChange = (val) => {
  multipleSelection.value = []
  val.forEach(item=>{
    multipleSelection.value.push(item.id)
  })
}

//添加
const handleAdd = () =>{
  dialogType.value = "add"
  dialogFormVisible.value = true
  tableForm.value = {}
}
//修改
const handleEdit = (row) =>{
  dialogType.value = "Edit"
  dialogFormVisible.value = true
  tableForm.value = row
}

const dialogConfirm = ()=>{
  dialogFormVisible.value = false
//  1.拿到数据
//  2.添加套table
  if(dialogType.value=="add") {
    tableData.value.push({
      id: id++,
      ...tableForm.value
    })
  }else {
    var id = tableForm.value.id
    var index = tableData.value.findIndex(item=>item.id === id)
    console.log(tableData.value[index])
    tableData.value[index] = tableForm.value
  }
}


</script>

<style scoped>
.table-box{
  margin:200px auto;
  width: 600px;
}
.title{
  text-align: center;
}
.query-box{
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}
.query-input{
  width: 200px;
}
</style>
