<template>
  <div>
    <Renderer ref="renderer" resize="window"
              :orbit-ctrl="{ enableDamping: true, dampingFactor: 0.0005, autoRotate: true, maxPolarAngle: Math.PI / 2.5,
            screenSpacePanning: false, minDistance: 500, maxDistance: 1500 }"
              shadow

              :pointer="{ intersectRecursive: true }"
              class="top-fixed"
    >
      <Camera :position="{ x: 0, y: 250, z: 400 }"/>

      <Scene ref="scene" background="#dedede">
        <Raycaster
          @pointerEnter="onPointerEnter"
          @pointerOver="onPointerOver"
          @pointerMove="onPointerEvent"
          @pointerLeave="onPointerEvent"
        />
        <HemisphereLight intensity="1.2" :cast-shadow="true"/>
        <!--      <AmbientLight :intensity="1.0" color="#dddffd" :position="{ x:500, y: 500, z: 1500 }" />-->
        <DirectionalLight color="#fbfbfb" :intensity="0.75" :rotation="{ x:2, y: 50, z: -150 }"
                          :position="{ x:0, y: 10, z: 250 }"
                          :cast-shadow="true" :shadow-map-size="{ width: 1512, height: 1512 }"/>
        <DirectionalLight color="#fbfbfb" :intensity="0.75" :rotation="{ x:50, y: 50, z: 150 }"
                          :position="{ x:0, y: 5, z: -250 }"
                          :cast-shadow="true" :shadow-map-size="{ width: 1512, height: 1512 }"/>
        <!--      <PointLight ref="light" color="#fbfbfb" :intensity="1.0" :position="{ x:-200, y: 200, z: -500 }" />-->
        <!--      <PointLight ref="light" color="#333333" :intensity="2.5" :position="{ x:200, y: 1000, z: 200 }" />-->
        <!--      <PointLight ref="light" color="#333333" :intensity="2.5" :position="{ x:200, y: 1000, z: 200 }" />-->
        <!--      <PointLight ref="light" :intensity="0.5" :position="{ x:500, y: 900, z: 1500 }" :rotation="{x: -90, y:-90}" />-->
        <!--      <PointLight ref="light" :intensity="0.9" :position="{ x:-500, y: -800, z: -1500 }" :rotation="{x: -90, y:-90}" />-->
        <!--      <PointLight ref="light" color="#fbfbfb" :intensity="0.0" :position="{ x:250, y: 100, z: -250 }" />-->
        <!--      <SpotLight color="#ffffff" :intensity="0.0" :position="{ y: 150, z: -220 }" :cast-shadow="true" :shadow-map-size="{ width: 1024, height: 1024 }" />-->
        <!--      <SpotLight color="#fbfbfb" :intensity="0.0" :position="{ y: -150, z: -250 }" :cast-shadow="true" :shadow-map-size="{ width: 1024, height: 1024 }" />-->

        <GltfModel :position="{x: -350, z: 50}" src="3dmodels/teatroJRR_f_mat_2x.gltf" @click="onClickModel"
                   ref="teatro" cast-shadow :receive-shadow="true">
          <MatcapMaterial vertex-colors :color="changeMaterial" :props="{ transparent: true, opacity: 0.5 }"/>
        </GltfModel>
        <GltfModel :position="{x: 0, z: 0}" src="3dmodels/edificio_cu_2x.gltf" @click="onClickModel" ref="teatro"
                   :rotation="{x: 0, y:-3.14, z:0}" cast-shadow :receive-shadow="true">
          <MatcapMaterial :color="changeMaterial" :props="{ transparent: true, opacity: 0.5 }"/>
        </GltfModel>
        <GltfModel :position="{x: -250, z:  400}" src="3dmodels/teatroJRR_f_mat_2x.gltf" @click="onClickModel"
                   ref="teatro" :rotation="{x: 0, y:-1.57, z:0}" cast-shadow :receive-shadow="true">
          <MatcapMaterial :color="changeMaterial" :props="{ transparent: true, opacity: 0.5 }"/>
        </GltfModel>
        <GltfModel :position="{x: -850, z:  -650}" src="3dmodels/teatroJRR_f_mat_2x.gltf" @click="onClickModel"
                   ref="teatro" :rotation="{x: 0, y:-3.14, z:0}" cast-shadow :receive-shadow="true">
          <MatcapMaterial :color="changeMaterial" :props="{ transparent: true, opacity: 0.5 }"/>
        </GltfModel>
        <GltfModel :position="{x: -600, z: 550}" src="3dmodels/edificio_cu_2x.gltf" @click="onClickModel"
                   ref="edificioCu" :rotation="{x: 0, y:-1.57, z:0}" cast-shadow :receive-shadow="true">
          <MatcapMaterial :color="changeMaterial" :props="{ transparent: true, opacity: 0.5 }"/>
        </GltfModel>
        <GltfModel :position="{x: -200, z: -650}" src="3dmodels/teatroJRR_f_mat_2x.gltf" @click="onClickModel"
                   ref="teatro" :rotation="{x: 0, y:-1.57, z:0}" cast-shadow :receive-shadow="true">
          <MatcapMaterial :color="0xfffff"/>
        </GltfModel>
        <GltfModel :position="{x: -400, z: -850}" src="3dmodels/edificio_cu_2x.gltf" @click="onClickModel"
                   ref="edificioCu" :rotation="{x: 0, y:-1.57, z:0}" cast-shadow :receive-shadow="true">
          <MatcapMaterial :color="0xffffff"/>
        </GltfModel>

        <GltfModel :position="{x: 450, z: -450}" src="3dmodels/edificio_cu_2x.gltf" @click="onClickModel" ref="teatro"
                   :rotation="{x: 0, y:-1.57, z:0}" cast-shadow :receive-shadow="true">
          <MatcapMaterial :color="changeMaterial" :props="{ transparent: true, opacity: 0.5 }"/>
        </GltfModel>

        <GltfModel :position="{x: 400, z: 250}" src="3dmodels/edificio_cu_2x.gltf" @click="onClickModel"
                   ref="edificioCu" :rotation="{x: 0, y:-1.57, z:0}" cast-shadow :receive-shadow="true">
          <MatcapMaterial :color="changeMaterial" :props="{ transparent: true, opacity: 0.5 }"/>
        </GltfModel>

        <BoxGeometry :size="{x:550, y:550, z: 550}" :position="{x:0, y:0, z: 150}">
          <PhongMaterial vertex-colors/>
        </BoxGeometry>


        <Plane :width="4000" :height="4000" :rotation="{x:-1.59, y:0, z:0}" :position="{ z: -10 - SIZE }"
               :receive-shadow="true">
          <LambertMaterial color="#ededed"/>
        </Plane>
      </Scene>
      <EffectComposer>
        <RenderPass/>
        <UnrealBloomPass :strength="0.05"/>
        <FXAAPass :strength="5.0"/>
        <TiltShiftPass :gradient-radius="tiltRadius" :start="{ x: 0, y: this.tiltY }" :end="{ x: 0, y: this.tiltY }"/>
      </EffectComposer>
    </Renderer>
  </div>
</template>

<script>
import {Object3D, MathUtils, Color} from 'three'
import {
  Plane,
  HemisphereLight,
  MatcapMaterial,
  BoxGeometry,
  // CylinderGeometry,
  PhongMaterial,
  LambertMaterial,
  // StandardMaterial,
  Camera,
  AmbientLight,
  Raycaster,
  DirectionalLight,
  PointLight,
  GltfModel,
  EffectComposer,
  Renderer,
  RenderPass,
  // SpotLight,
  Scene,
  UnrealBloomPass,
  FXAAPass,
  TiltShiftPass
} from 'troisjs'

export default {
  name: 'Espacio3D',
  components: {
    Plane,
    HemisphereLight,
    MatcapMaterial,
    BoxGeometry,
    // CylinderGeometry,
    PhongMaterial,
    LambertMaterial,
    // StandardMaterial,
    Camera,
    GltfModel,
    Raycaster,
    DirectionalLight,
    EffectComposer,
    Renderer,
    RenderPass,
    // SpotLight,
    Scene,
    UnrealBloomPass,
    FXAAPass,
    TiltShiftPass
  },
  data() {
    return {
      SIZE: 1.5,
      NX: 20,
      NY: 20,
      PADDING: 1,
      NUM_INSTANCES: 7,
      changeMaterial: '#000000',
      tiltRadius: 100,
      tiltY: 100
    }
  },
  mounted() {
    // init instanced mesh matrix
    // const imesh = this.$refs.imesh.mesh
    this.renderer = this.$refs.renderer
    this.size = this.renderer.three.size
    this.teatro = this.$refs.teatro
    this.scene = this.$refs.scene
    this.niebla = new Color('000000')
    // this.myFog = new Fog(0xff0000, 2.5, 200)
    // this.myFog = new Fog(0xff0000, 2.5, 200)
    // this.scene.fog = this.myFog
    const dummy = new Object3D()
    const {randFloat: rnd, randFloatSpread: rndFS} = MathUtils
    for (let i = 0; i < this.NUM_INSTANCES; i++) {
      dummy.position.set(rndFS(200), rndFS(200), rndFS(200))
      const scale = rnd(0.2, 1)
      dummy.scale.set(scale, scale, scale)
      dummy.updateMatrix()
      // imesh.setMatrixAt(i, dummy.matrix)
    }
    // imesh.instanceMatrix.needsUpdate = true
  },
  methods: {
    printe(val) {
      console.log(val)
    },
    onClickModel(event) {
      console.log(event)
      // console.log(event.intersect.object.material)
      event.intersect.object.material.color.set(event.over ? 0xffffff : 0x5588bb)
    },
    onPointerEnter(event) {
      if (typeof (event.intersect.mesh)) {
        console.log(event);
      }
    },
    // onPointerOver(event) {
    //   if (event.intersect.object.name) {
    //     console.log('True');
    //   }
    // },
  }
}
</script>
