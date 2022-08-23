/*
*axios二次封装
*
*
 */
//引入文件
import axios from "axios";
import {ElMessage} from "element-plus";

//全局配置
const service = axios.create({
    baseURL:"list",//跟路径
    timeout:8000//请求超时时间
})
//响应拦截
service.interceptors.response.use(res=>{
    const{code,data,msg} = res.data;
    if(code ===200){
        //请求成功
        ElMessage.success(msg)
        return data
    }else if(code ===400){
        //请求失败
        ElMessage.error(msg)
    }else if(code === 201){
        //模糊搜索
        return data
    }else{
        return data
    }
})
//请求方法

function request(options){
    options.methods = options.methods || 'get'
    if(options.methods.toLowerCase()==="get") options.params = options.data
    return service(options)
}

['get','post','put','delete'].forEach(item=>{
    request[item] = (url,data)=>{
        return request({
            url,
            data,
            method:item
        })
    }
})

export default request