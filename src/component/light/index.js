import * as THREE from 'three'
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
import Common from "../common/Common";
class Index extends Common {

    componentDidMount() {
        super.componentDidMount()
        this.init()
    }
    getCube(){
        const geometry=new THREE.BoxGeometry(1,2,3)
        const material=new THREE.MeshLambertMaterial({
            color:new THREE.Color(0xff0000)})
        const mesh=new THREE.Mesh(
            geometry,
            material
        )
        return mesh
    }
    getPlane(){
        const geometry=new THREE.PlaneBufferGeometry(500,500)
        const material=new THREE.MeshPhongMaterial({
            color:new THREE.Color(0xffffff),
            side:THREE.DoubleSide
        })
        const mesh=new THREE.Mesh(
            geometry,
            material
        )
        mesh.position.set(0,-5,0)
        mesh.rotateX(-Math.PI/2)
        return mesh
    }
    addAmbientLight(){
        const ambientLight=new THREE.AmbientLight(0xffffff,0.1)
        this.scene.add(ambientLight)
    }
    addPointLight(){
        const pointLight=new THREE.PointLight(0xffffff,1,1000)
        pointLight.position.set(-5,5,5)
        //辅助线
        const pointerLightHelper=new THREE.PointLightHelper(pointLight,1)
        this.scene.add(pointerLightHelper)
        return pointLight
    }
    addHemisphereLight(){
        //相当于黑白交替
        const hemisherelight=new THREE.HemisphereLight(0xffffbb,0x080820,1)
        this.scene.add(hemisherelight)
        return hemisherelight
    }
    addDirectionLight(){
        const directionLight=new THREE.DirectionalLight(0xffffff,1)
        const helper=new THREE.DirectionalLightHelper(directionLight,5)
        this.scene.add(helper)
        this.scene.add(directionLight)
        return directionLight
    }
    addSpotLight(){
        const spotlight=new THREE.SpotLight(0xffffff*Math.random())
        spotlight.position.set(0,5,0)
        spotlight.angle=Math.PI/6
        this.scene.add(spotlight)
        return spotlight
    }
    init() {
        this.controls=new OrbitControls(this.camera)
        this.scene.background=new THREE.Color(0xeeeeee)
        //添加盒子
        this.cube=this.getCube()
        this.x=-5
        this.dx=0.01
        this.scene.add(this.cube)
        //添加地板
        this.plane=this.getPlane()
        this.scene.add(this.plane)
        //添加光线
        this.addAmbientLight()
        //添加点光源
        // this.pointLight=this.addPointLight()
        // this.scene.add(this.pointLight)
        //  添加平行光
        // this.directionalLights=this.addDirectionLight()
        // this.directionalLights.position.set(10,10,10)
        //半球光，表示白天黑夜效果的光线
        // this.hemispherelight=this.addHemisphereLight()
        // //左
        // this.hemispherelight.position.set(-1,0,0)
        // //上
        // this.hemispherelight.position.set(0,1,0)
        // //右
        // this.hemispherelight.position.set(1,0,0)
        // //下
        // this.hemispherelight.position.set(0,-1,0)
        // this.degree=0
        //添加聚光灯
        this.addSpotLight()
        this.animation()
    }

    animation(){
        requestAnimationFrame(this.animation.bind(this))
        this.controls.update()
        // this.x+=this.dx
        // this.degree+=0.01
        // this.hemispherelight.position.set(Math.sin(this.degree),Math.cos(this.degree),0)
        this.renderer.render(this.scene,this.camera)
    }
}

export default Index;