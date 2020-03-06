// 页面右侧 的通用组件
import React, {Component} from 'react';
import * as THREE from "three";
import './Common.css'
class Common extends Component {
    constructor (args) {
        super(args)
        /*react 数据是this.state*/
        this.state = {
            width: window.innerWidth - 200,
            height: window.innerHeight
        }
    }
    componentDidMount(){
        this.renderer = this.getRenderer()
        this.camera = this.getCamera()
        this.scene = this.getScene()
        // 页面的事件控制
        this.registerEvent()
    }
    render() {
        return (
            <div className={'three-canvas'} style={{width: this.state.width+'px'}}>
            </div>
        )
    }
    getRenderer () {
        const renderer = new THREE.WebGLRenderer()
        // renderer.domElement 是canvas标签
        // 调整渲染颜色范围
        renderer.gammaOutput = true
        renderer.setSize(this.state.width, this.state.height)
        document.querySelector('.three-canvas').appendChild(renderer.domElement)
        return renderer
    }
    getCamera () {
        const camera = new THREE.PerspectiveCamera(75, this.state.width/this.state.height, 1, 10000)
        camera.position.z = 10
        camera.lookAt(0,0,0)
        return camera
    }
    getScene () {
        const scene = new THREE.Scene()
        return scene
    }
    resize () {
        // 修改全局 width/height
        this.setState({
            width: window.innerWidth - 200,
            height: window.innerHeight
        })
        this.camera.aspect = this.state.width / this.state.height
        this.camera.updateProjectionMatrix()
        this.renderer.setSize(this.state.width, this.state.height)
    }
    registerEvent () {
        window.onresize = this.resize.bind(this)
    }
}

export default Common;