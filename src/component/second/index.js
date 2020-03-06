import * as THREE from 'three'
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls"
import Common from "../common/Common"
class Index extends Common {
    // 页面加载 = 组件加载 => 放到声明周期中(onload)
    componentDidMount(){
        super.componentDidMount()
        this.init()
    }
    bgTexture () {
        // 立体背景
        const loader = new THREE.CubeTextureLoader()
        const bgTexture = loader.setPath('textures/cube/Park2/')
            .load([
                'posx.jpg','negx.jpg',
                'posy.jpg','negy.jpg',
                'posz.jpg','negz.jpg',
            ])
        this.scene.background = bgTexture
    }
    init(){
        this.controls = new OrbitControls(this.camera)
        this.bgTexture()
        this.animation()
    }

    animation () {
        requestAnimationFrame(this.animation.bind(this))
        this.controls.update()
        this.renderer.render(this.scene, this.camera)
    }
}

export default Index