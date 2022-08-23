<template>
  <div class="table-box">
    <!--标题-->
    <div class="title">
      <h2>最简单的CRUD DEOM</h2>
    </div>
    <div class="query-box">
      <el-input class="query-input" v-model="queryInput" placeholder="请输入姓名搜索" @input="handleQueryName" />
      <div class="button-list">
        <el-button type="success"  @click="handleAdd">增加</el-button>
        <el-button type="danger"  @click="handleDelList" v-if="multipleSelection.length>0">删除多选</el-button>
      </div>
      </div>
    <!--Dialog-->
    <el-dialog v-model="dialogFormVisible" :title="dialogType==='add'? '新增':'编辑'">
      <el-form :model="tableForm">
        <el-form-item label="姓名" :label-width="80">
          <el-input v-model="tableForm.name" autocomplete="off" required/>
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
        ref="multipleTableref"
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
    <el-pagination
        background
        layout="prev, pager, next"
        :total="total"
        style="display: flex;justify-content: center;margin-top:10px"
        :current-page = "curPage"
        @current-change="handleChangePage"
    />
  </div>
</template>

<script setup>
import {ref} from "vue"
import request from "./utils/requires.js"
//数据
var queryInput = $ref("")
var tableData =$ref([
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
var multipleSelection = $ref([])
var dialogFormVisible = $ref(false)
var tableForm = $ref({
  id:1,
  name:"张三",
  email:"123@qq.com",
  phone:"1234567890123",
  state:"在职",
  address:"广东省",
})
var dialogType = $ref("add")
var total = $ref(20)
var curPage = $ref(1)

// 方法

//请求分页
const handleChangePage = (val)=>{
  getTableData(val)
}
//请求Table数据/分页
const getTableData = async (cur = 1)=>{
  var res = await request.get("/",{
    pageSize:10,
    pageNum:cur
  })
  tableData = res.list
  total = res.total
  curPage = res.pageNum
}
getTableData(1)




//搜索
const handleQueryName = async (val)=>{
  if(val.length >0){
    var res = await request.get(`/${val}`);
    tableData = res.list
    curPage = 1
    total = 10
  }else{
    getTableData()
  }



}

//删除一条
const handleDelete = async ({ID})=>{
//  // 1.通过id获取到条目对应的index
//   var index = tableData.findIndex(item=>item.id === id)
// //  2.通过index删除条目
//   tableData.splice(index, 1)
  console.log(total);
  await request.delete(`/${ID}`)
  if ((total-1)%10==0){
    curPage--
  }
  getTableData(curPage)
}

//删除多条
const handleDelList = ()=>{
  multipleSelection.forEach(ID =>{
    handleDelete({ID})
  })
  multipleSelection = []
}

//选中
const handleSelectionChange = (val) => {
  multipleSelection = []
  val.forEach(item=>{
    multipleSelection.push(item.ID)
  })
}

//添加
const handleAdd = () =>{
  dialogType = "add"
  dialogFormVisible = true
  tableForm = {}
}
//修改
const handleEdit = (row) =>{
  dialogType = "Edit"
  dialogFormVisible = true
  tableForm = row
}

const dialogConfirm = async ()=>{
  dialogFormVisible = false
//  1.拿到数据
//  2.添加套table
  if(dialogType=="add") {
    // tableData.push({
    //   id: id++,
    //   ...tableForm
    // })
    //添加数据
    var res = await request.post("/",{
      ...tableForm
    })
    //刷新数据
    await getTableData(curPage)

  }else {
    var ID = tableForm.ID
    var res = await request.put(`/${ID}`,{
      ...tableForm
    })
    await getTableData(curPage)
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
