import Common from "../common/Common";
import * as THREE from "three";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
import {MMDLoader} from "three/examples/jsm/loaders/MMDLoader";
import {OutlineEffect} from "three/examples/jsm/effects/OutlineEffect";
import {MMDAnimationHelper} from "three/examples/jsm/animation/MMDAnimationHelper";

const AMMO=require("three/examples/js/libs/ammo")
window.Ammo=new AMMO()
const  clock=new THREE.Clock()
class Index extends Common {

    // 页面加载 = 组件加载 => 放到声明周期中(onload)
    // eslint-disable-next-line
    // ready:false
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
        // const loader=new MMDLoader()
        // loader.load("models/mmd/miku/miku_v2.pmd",mesh=>{
        //     mesh.position.set(0,-10,0)
        //     this.scene.add(mesh)
        // })
        this.MMDhelder=new MMDAnimationHelper()
        const loader=new MMDLoader()
        loader.loadWithAnimation(
            'models/mmd/miku/miku_v2.pmd',
            'models/mmd/vmds/wavefile_v2.vmd',
            mmd=>{
                this.MMDhelder.add(mmd.mesh,{
                    animation:mmd.animation,
                    physics:true
                })
                mmd.mesh.material.side = THREE.DoubleSide
                this.scene.add(mmd.mesh)
            }
        )
        const auddioLoader=new THREE.AudioLoader()
        auddioLoader.load("models/mmd/audios/wavefile_short.mp3",music=>{
            const listener=new THREE.AudioListener()
            listener.position.z=1
            const audio=new THREE.Audio(listener).setBuffer(music)
            this.MMDhelder.add(audio,{delayTime:160/30})
            this.scene.add(audio)
            this.scene.add(listener)
            this.ready=true
        })
        loader.loadAnimation(
            "models/mmd/vmds/wavefile_camera.vmd",
            this.camera,
            cameraAnimation=>{
                this.MMDhelder.add(this.camera,{
                    animation:cameraAnimation
                })
            }
        )
    }
    addLight () {
        this.scene.add(new THREE.AmbientLight(0xffffff, 0.3))
    }
    init(){
        this.controls = new OrbitControls(this.camera)
        this.bgTexture()
        this.camera.position.set(0,0,20)
        this.renderer=new OutlineEffect(this.renderer)
        this.loaderObj()
        this.addLight()
        this.animation()
    }
    animation () {
        requestAnimationFrame(this.animation.bind(this))
        this.controls.update()
        if(this.ready){
            this.MMDhelder.update(clock.getDelta())
        }

        this.renderer.render(this.scene, this.camera)
    }
}

export default Index