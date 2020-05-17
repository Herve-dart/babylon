// import * as BABYLON from 'babylonjs'
import { Engine, Scene, ArcRotateCamera, Vector3, HemisphericLight, Mesh, MeshBuilder } from 'babylonjs'
// 获取canvas容器
let canvas: any = document.getElementById('container')
// 创建渲染引擎
let engine: Engine = new Engine(canvas, true)

function createScene(): Scene{
    let scene: Scene = new Scene(engine)
    let camera: ArcRotateCamera = new ArcRotateCamera('Camera', Math.PI/ 2, Math.PI/ 2, 2, Vector3.Zero(), scene)
    camera.attachControl(canvas, true)
    let hemiLight: HemisphericLight = new HemisphericLight('hemilight', new Vector3(1, 1, 0), scene)
    let sphere: Mesh = MeshBuilder.CreateSphere('sphere', {diameter: 1}, scene)
    return scene
}
let scene: Scene = createScene()
console.log(scene)
engine.runRenderLoop(() => {
    scene.render()
})
window.addEventListener('resize', () => {
    engine.resize()
}, false)