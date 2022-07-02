import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { DoubleSide } from 'three'

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Object
 */
const planee = new THREE.Group()
scene.add(planee)
const geometry = new THREE.PlaneBufferGeometry(.5, .5)
const material = new THREE.MeshBasicMaterial({ 
    color: 0x00ff00,
    side: DoubleSide,
    transparent: true})

for(let x = .25; x < 2; x = x + .5 ){
    for(let y = .25; y < 2; y = y + .5 ){
        const plane = new THREE.Mesh(geometry, material)
        plane.position.set(x,y)
        planee.add(plane)
    }
    
    for(let y = -.25; y > -2; y = y - .5 ){
        const plane = new THREE.Mesh(geometry, material)
        plane.position.set(x,y)
        planee.add(plane)
    }
}
for(let x = -.25; x > -2; x = x - .5 ){
    for(let y = .25; y < 2; y = y + .5 ){
        const plane = new THREE.Mesh(geometry, material)
        plane.position.set(x,y)
        planee.add(plane)
    }
    
    for(let y = -.25; y > -2; y = y - .5 ){
        const plane = new THREE.Mesh(geometry, material)
        plane.position.set(x,y)
        planee.add(plane)
    }
}
// Raycaster

const raycaster = new THREE.Raycaster()

var arr = [[.25, .25, 0], [-.25, .5, 0], [.5, -.25, 0], [1.25, 1.75, 0]]
for(let i = 0; i < 4; i++){
    var rayOrigin = new THREE.Vector3(arr[i][0], .25, 0)
    var rayDirection = new THREE.Vector3(0, 0, 1)
    rayDirection.normalize()
    raycaster.set(rayOrigin, rayDirection)
    const objectToTest = planee.children
    const intersects = raycaster.intersectObjects(objectToTest)
    console.log(intersects);
    for(const intersect of intersects){
        intersect.object.material.opacity = 1
    }
}
console.log(planee.children)

// for(let i = 0; i < 4; i++){
//     const arr = [[.25, .25, 0], [-.25, .5, 0], [.5, -.25, 0], [1.25, 1.75, 0]]
//     console.log(arr[i][0]);
//     var rayOrigin = new THREE.Vector3(0, 0, -1)
//     var rayDirection = new THREE.Vector3(.25, .25, 0)
//     rayDirection.normalize()
//     raycaster.set(rayOrigin, rayDirection)
//     const objectToTest = planee.children
//     const intersects = raycaster.intersectObjects(objectToTest)
//     console.log(intersects);
//     for(const intersect of intersects){
//         intersect.object.material.opacity = 0
//     }
// }
// console.log(planee.children);
// console.log(intersects);
// intersects.object.material.color.set = "rgba(255, 0, 0, 0)"

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

planee.remove(planee.children[Math.floor(Math.random() * 65)])
window.addEventListener('resize', () => {
    // Update Sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight
    
    // Update camera
    camera.aspect = sizes.width / sizes.height
    

    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
})
planee.remove(planee.children[Math.floor(Math.random() * 65)])
window.addEventListener('dblclick', () => {
    if(!document.fullscreenElement){
        canvas.requestFullscreen()
        console.log('GO fulldscreen');
    }
    else{
        document.exitFullscreen()
    }
})
planee.remove(planee.children[Math.floor(Math.random() * 65)])
/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
planee.remove(planee.children[Math.floor(Math.random() * 65)])
camera.position.set(0, 10, -10)
camera.lookAt(0, 0, 0)
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()