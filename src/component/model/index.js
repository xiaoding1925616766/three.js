import Common from "../common/Common";
import * as THREE from "three";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader"

class Index extends Common {
    // 页面加载 = 组件加载 => 放到声明周期中(onload)
    componentDidMount(){
        super.componentDidMount()
        this.init()
    }
    bgTexture () {
        // 立体背景
        const loader = new THREE.CubeTextureLoader()
        const bgTexture = loader.setPath('textures/cube/Bridge2/')
            .load([
                'posx.jpg','negx.jpg',
                'posy.jpg','negy.jpg',
                'posz.jpg','negz.jpg',
            ])
        this.scene.background = bgTexture
    }
    loaderObj () {
        const gltfLoader = new GLTFLoader()
        gltfLoader.load("models/gltf/DamagedHelmet/glTF/DamagedHelmet.gltf", res => {
            res.scene.traverse( mesh => {
                // 背景对所有面进行一一映射
                if(mesh.isMesh){
                    console.log(mesh)
                    mesh.material.side = THREE.DoubleSide
                    mesh.material.envMap = this.scene.background
                }
            })
            this.scene.add(res.scene)
        })
    }
    addLight () {
        this.scene.add(new THREE.AmbientLight(0xffffff, 0.7))
    }
    init(){
        this.controls = new OrbitControls(this.camera)
        this.bgTexture()
        this.loaderObj()
        this.addLight()
        this.animation()
    }
    animation () {
        requestAnimationFrame(this.animation.bind(this))
        this.controls.update()
        this.renderer.render(this.scene, this.camera)
    }
}

export default Index