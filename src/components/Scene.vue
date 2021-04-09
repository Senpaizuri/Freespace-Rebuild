<template>
    <canvas class="scene" :class="isSticky && 'is-sticky'" ref="scene">
    </canvas>
</template>

<script>
import * as THREE from 'three'
import * as dat from 'dat.gui'
import { gsap } from 'gsap'

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

export default {
    name: 'ThreeScene', 
    data:()=>{
        return {
            isSticky: false,
            sizes: {
                width: 0,
                height: 0
            },
            scene:{},
            camera:{},
            renderer:{},
            objects:{
                sphere:{}
            },
            lights:{
                directionalLight:{}
            },
            clock:{},
            sphereCoords:{}
        }
    },
    methods:{
        initScene(){
            // Scene
            const canvas = this.$refs.scene
            this.scene = new THREE.Scene()

            this.scene.background = new THREE.Color(0x97CCD8)
            this.scene.fog = new THREE.Fog(0x97CCD8, 0.001, 4)

            // Textures
            const textureLoader = new THREE.TextureLoader() 

            //  - Landmass
            const landmassTextureRoute = '/textures/maps'
            const landmassTexture = textureLoader.load(`${landmassTextureRoute}/texture-map.jpeg`)
            const landmassHeight = textureLoader.load(`${landmassTextureRoute}/height-map.jpeg`)
            const landmassNormal = textureLoader.load(`${landmassTextureRoute}/normal-map.jpg`)
            const landmassAlpha = textureLoader.load(`${landmassTextureRoute}/alpha-map.jpg`)

            landmassTexture.minFilter = THREE.NearestFilter
            landmassTexture.magFilter = THREE.NearestFilter
            landmassTexture.generateMipmaps = false
            
            // - Ocean
            const oceanTextureRoute = '/textures/water'
            const oceanAmbientOcclusion = textureLoader.load(`${oceanTextureRoute}/ao-map.jpg`)
            const oceanHeight = textureLoader.load(`${oceanTextureRoute}/displacement-map.png`)
            const oceanNormal = textureLoader.load(`${oceanTextureRoute}/normal-map.jpg`)
            const oceanRoughness = textureLoader.load(`${oceanTextureRoute}/roughness.jpg`)

            oceanNormal.wrapS = THREE.RepeatWrapping
            oceanNormal.wrapT = THREE.RepeatWrapping

            // Objects
            // - Sphere
            const sphereMaterial = new THREE.MeshStandardMaterial({
                color: 0xff0000,
            })
            const sphereGeometry = new THREE.SphereBufferGeometry(.01,32,32)

            this.objects.sphere = new THREE.Mesh(sphereGeometry, sphereMaterial)
            this.objects.sphere.position.set(.25,.115,-.5)
            this.objects.sphere.castShadow = true

            this.scene.add(this.objects.sphere)

            // - Landmass
            const landmassMaterial =  new THREE.MeshStandardMaterial({
                color: 0xffffff,
                alphaMap: landmassAlpha,
                transparent: true,
                displacementMap: landmassHeight,
                displacementScale: .075,
                normalMap: landmassNormal,
                map: landmassTexture,
                roughness: .75, 
            })
            const landmassGeometry = new THREE.PlaneGeometry(7,4,1400,800)

            const landmass = new THREE.Mesh(landmassGeometry,landmassMaterial)

            landmass.rotateX(- Math.PI/2)
            landmass.position.set(0, 0.08, 0)
            landmass.receiveShadow = true

            this.scene.add(landmass)

            // - Ocean

            const oceanMaterial = new THREE.MeshStandardMaterial({
                color: 0x388697,
                roughnessMap: oceanRoughness,
                roughness: .5,
                aoMap: oceanAmbientOcclusion,
                aoMapIntensity: .5,
                normalMap: oceanNormal,
                displacementMap: oceanHeight,
                displacementScale: .15,
            })

            const oceanGeometry = new THREE.PlaneGeometry(15,15,100,100)
            const ocean = new THREE.Mesh(oceanGeometry,oceanMaterial)

            ocean.receiveShadow = true

            ocean.rotateX(- Math.PI/2)

            this.scene.add(ocean)

            // Lights
            // - Ambient
            const ambientLight = new THREE.AmbientLight(0xffffff, .4)
            
            this.scene.add(ambientLight)

            // - Directional
            const directionalLight = new THREE.DirectionalLight(0xffffff, .8, 20)

            directionalLight.position.set(1, 1, 0)
            directionalLight.castShadow = true
            directionalLight.shadow.mapSize.width = 2048
            directionalLight.shadow.mapSize.height = 2048

            this.scene.add(directionalLight)

            // Camera
            this.initCamera()
            this.scene.add(this.camera)

            
            this.clock = new THREE.Clock()

            this.initRenderer()
            this.initDebug()
            this.events()
            this.animate()
        },
        initCamera(){
            this.camera = new THREE.PerspectiveCamera(75, this.sizes.width / this.sizes.height, .001, 100)
            this.camera.position.x = .5
            this.camera.position.y = .5
            this.camera.position.z = .5
        },
        initRenderer(){
            const canvas = this.$refs.scene
            this.renderer = new THREE.WebGLRenderer({
                canvas,
                alpha: true
            })

            this.renderer.setSize(this.sizes.width,this.sizes.height)
            this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

            this.renderer.shadowMap.enabled = true
            this.renderer.shadowMap.type = THREE.PCFSoftShadowMap

        },
        initDebug(){
            const gui = new dat.GUI()
            this.sphereCoords = {
                step1: ()=>{
                    gsap.to(this.objects.sphere.position,{x:.25,y:.115,z:-.5,duration:5,ease:"ease"})
                    gsap.to(this.camera.position,{x:.35,y:.43,z:-.75,duration:3,ease:"ease"})
                },
                step2: ()=>{
                    gsap.to(this.objects.sphere.position,{x:.275,y:.115,z:-.395,duration:5,ease:"ease"})
                    gsap.to(this.camera.position,{x:.27,y:.3,z:-.61,duration:3,ease:"ease"})
                },
                step3: ()=>{
                    gsap.to(this.objects.sphere.position,{x:.25,y:.12,z:-.37,duration:5,ease:"ease"})
                    gsap.to(this.camera.position,{x:.06,y:.28,z:-.49,duration:3,ease:"ease"})
                },
                step4: ()=>{
                    gsap.to(this.objects.sphere.position,{x:.21,y:.13,z:-.216,duration:5,ease:"ease"})
                    gsap.to(this.camera.position,{x:.56,y:.33,z:-.5,duration:3,ease:"ease"})
                },
                step5: ()=>{
                    gsap.to(this.objects.sphere.position,{x:.246,y:.13,z:-.139,duration:5,ease:"ease"})
                    gsap.to(this.camera.position,{x:.12,y:.33,z:.12,duration:3,ease:"ease"})
                },
                step6: ()=>{
                    gsap.to(this.objects.sphere.position,{x:.292,y:.135,z:-.011,duration:5,ease:"ease"})
                    gsap.to(this.camera.position,{x:.38,y:.27,z:.18,duration:3,ease:"ease"})
                },
                step7: ()=>{
                    gsap.to(this.objects.sphere.position,{x:.375,y:.125,z:.117,duration:5,ease:"ease"})
                    gsap.to(this.camera.position,{x:.62,y:.36,z:.07,duration:3,ease:"ease"})
                },
                step8: ()=>{
                    gsap.to(this.objects.sphere.position,{x:.61,y:.105,z:.21,duration:5,ease:"ease"})
                    gsap.to(this.camera.position,{x:.68,y:.4,z:-.14,duration:3,ease:"ease"})
                },
            }
            const sphereCoordsDebug = gui.addFolder('Sphere Coords')
            sphereCoordsDebug.add(this.sphereCoords, 'step1')
            sphereCoordsDebug.add(this.sphereCoords, 'step2')
            sphereCoordsDebug.add(this.sphereCoords, 'step3')
            sphereCoordsDebug.add(this.sphereCoords, 'step4')
            sphereCoordsDebug.add(this.sphereCoords, 'step5')
            sphereCoordsDebug.add(this.sphereCoords, 'step6')
            sphereCoordsDebug.add(this.sphereCoords, 'step7')
            sphereCoordsDebug.add(this.sphereCoords, 'step8')
        },
        initControls(){
            const controls = new OrbitControls(camera, canvas)
            controls.enablePan = false

            controls.maxDistance = 1.75
            controls.minDistance = .5
            controls.maxPolarAngle = Math.PI / 3
            controls.minPolarAngle = 0
        },
        animate(){
            const elapsedTime = this.clock.getElapsedTime()

            this.camera.lookAt(this.objects.sphere.position)

            this.renderer.render(this.scene, this.camera)

            window.requestAnimationFrame(this.animate)
        },
        events(){
            window.addEventListener('resize',()=>{
                this.sizes.width = this.$refs.scene.parentElement.clientWidth
                this.sizes.height = window.innerHeight

                // console.log(this.sizes.width)

                // Update camera
                this.camera.aspect = this.sizes.width / this.sizes.height
                this.camera.updateProjectionMatrix()

                // Update renderer
                this.renderer.setSize(this.sizes.width, this.sizes.height)
                this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
            })
            window.addEventListener('scroll',()=>{

                const parentEl = {
                    top: this.$refs.scene.parentElement.getBoundingClientRect().top,
                    bottom: this.$refs.scene.parentElement.getBoundingClientRect().bottom,
                    height: this.$refs.scene.parentElement.clientHeight
                }
                if(parentEl.top > 0){
                    this.isSticky = false
                }else{
                    
                    const scrollPrcnt = Math.floor(Math.abs(((parentEl.top / (parentEl.height - (window.innerHeight / 2))) * 100)))
                    console.log(scrollPrcnt)
                    if(scrollPrcnt == 10){
                        this.sphereCoords.step1()
                    }else if(scrollPrcnt == 20){
                        this.sphereCoords.step2()
                    }else if(scrollPrcnt == 30){
                        this.sphereCoords.step3()
                    }else if(scrollPrcnt == 40){
                        this.sphereCoords.step4()
                    }else if(scrollPrcnt == 50){
                        this.sphereCoords.step5()
                    }else if(scrollPrcnt == 60){
                        this.sphereCoords.step6()
                    }else if(scrollPrcnt == 70){
                        this.sphereCoords.step7()
                    }else if(scrollPrcnt == 80){
                        this.sphereCoords.step8()
                    }

                    this.isSticky = true
                }
            })
        }
    },
    mounted(){
        this.$nextTick(()=>{
            this.sizes.width = this.$refs.scene.parentElement.clientWidth
            this.sizes.height = window.innerHeight

            this.initScene()
        })
    }
}
</script>

<style lang="scss">
    $component: 'scene';
    .#{$component}{
        position: relative;
        z-index: 0;

        &.is-sticky{
            position: fixed;
            top: 0;
        }
    }
</style>