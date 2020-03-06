import First from './component/first/index'
import Loader from  './component/second/index'
import model from './component/model/index'
import model2 from './component/model2/index'
import light from './component/light/index'
export default [
    {
        name:"项目启动",
        path:"/first",
        com:First

    },
    {
        name:"导入材质以及静态资源",
        path:"/second",
        com:Loader
    },
    {
        name:"加载gltf模型文件",
        path:"/model",
        com:model
    },
    {
        name:"加载mmd模型文件",
        path:"/model2",
        com:model2
    },
    {
        name:"光与影",
        path:"/light",
        com:light
    },
]