import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { DoubleSide, Vector3,  } from 'three'

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


for(let x = .25; x < 2; x = x + .5 ){
    for(let y = .25; y < 2; y = y + .5 ){
        const geometry = new THREE.PlaneBufferGeometry(.5, .5)
        const material = new THREE.MeshBasicMaterial({ 
            color: 0x00ff00,
            transparent: true,
            side: DoubleSide})
        const plane = new THREE.Mesh(geometry, material)
        plane.position.set(x,y)
        planee.add(plane)
    }
    
    for(let y = -.25; y > -2; y = y - .5 ){
        const geometry = new THREE.PlaneBufferGeometry(.5, .5)
        const material = new THREE.MeshBasicMaterial({ 
            color: 0x00ff00,
            transparent: true,
            side: DoubleSide})
        const plane = new THREE.Mesh(geometry, material)
        plane.position.set(x,y)
        planee.add(plane)
    }
}
for(let x = -.25; x > -2; x = x - .5 ){
    for(let y = .25; y < 2; y = y + .5 ){
        const geometry = new THREE.PlaneBufferGeometry(.5, .5)
        const material = new THREE.MeshBasicMaterial({
            color: 0x00ff00,
            transparent: true,
            side: DoubleSide})
        const plane = new THREE.Mesh(geometry, material)
        plane.position.set(x,y)
        planee.add(plane)
    }
    
    for(let y = -.25; y > -2; y = y - .5 ){
        const geometry = new THREE.PlaneBufferGeometry(.5, .5)
        const material = new THREE.MeshBasicMaterial({ 
            color: 0x00ff00,
            transparent: true,
            side: DoubleSide})
        const plane = new THREE.Mesh(geometry, material)
        plane.position.set(x,y)
        planee.add(plane)
    }
}
scene.add(planee)
/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}
// Camera

// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.set(0, 10, -10)
scene.add(camera)
camera.lookAt(new THREE.Vector3(0, 0, 0))



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
window.addEventListener('dblclick', () => {
    if(!document.fullscreenElement){
        canvas.requestFullscreen()
        console.log('GO fulldscreen');
    }
    else{
        document.exitFullscreen()
    }
})


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

// Array of positions
var arr = [[.75, .25, 1], [-.25, -1.75, 1], [.25, -.75, 1], [-1.25, 1.25, 1]]

// Axes Helper.
// const axesHelper = new THREE.AxesHelper( 5 )
// scene.add(axesHelper)


/**
 * Animate
 */
const clock = new THREE.Clock()

var tickcounter = 0
const tick = () =>
{
    const raycaster = new THREE.Raycaster()
    if(tickcounter < 2){
        for(let i = 0; i < 4; i++){
            // Ray Helper
            // const origin = new THREE.Vector3(arr[i][0], arr[i][1], .5)
            // const dir = new THREE.Vector3(0, 0, -.5)
            // dir.normalize()
            // const length = 1;
            // const hex = 0x6B6867;
            // const arrowHelper = new THREE.ArrowHelper( dir, origin, length, hex );
            // scene.add( arrowHelper );
            // console.log('a');
        
            // Raycaster
            const rayOrigin = new THREE.Vector3(arr[i][0], arr[i][1], .5)
            const rayDirection = new THREE.Vector3(0, 0, -.5)
            rayDirection.normalize()
            raycaster.set(rayOrigin, rayDirection)
            var intersects = raycaster.intersectObjects(planee.children, true)
            for(const object of planee.children){
                if(tickcounter == 0){
                    object.material.opacity = 1
                }
            }
            for(const intersect of intersects){
                if(tickcounter == 1){
                    intersect.object.material.opacity = 0
                    planee.rotation.x = Math.PI * 0.5
                }
            }
        }
        tickcounter++
    }
    
    

    const elapsedTime = clock.getElapsedTime()

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}
tick()
