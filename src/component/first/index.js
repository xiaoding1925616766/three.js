import * as THREE from 'three'
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
import Common from "../common/Common";
class Index extends Common {

    componentDidMount() {
        super.componentDidMount()
        this.init()
    }
    getCube(){
        const mesh=new THREE.Mesh(
            new THREE.BoxGeometry(1,2,3),
            new THREE.MeshNormalMaterial()
        )
        return mesh
    }
    init() {
        this.controls=new OrbitControls(this.camera)
        this.cube=this.getCube()
        this.scene.add(this.cube)
        this.animation()
    }

    animation(){
        requestAnimationFrame(this.animation.bind(this))
        this.controls.update()
        this.renderer.render(this.scene,this.camera)
    }
}

export default Index;