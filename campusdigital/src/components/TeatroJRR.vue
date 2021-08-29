<template>

  <Renderer ref="renderer" resize="window" :orbit-ctrl="{ enableDamping: true, dampingFactor: 0.05, autoRotate : true }" shadow>
    <Camera :position="{ y: 100, z: 100 }" />
    <Scene>
      <AmbientLight></AmbientLight>
      <SpotLight color="#ffffff" :intensity="0.5" :position="{ y: 150, z: 0 }" :cast-shadow="true" :shadow-map-size="{ width: 1024, height: 1024 }" />
      <SpotLight color="#4455ee" :intensity="0.5" :position="{ y: -150, z: 0 }" :cast-shadow="true" :shadow-map-size="{ width: 1024, height: 1024 }" />
      <GltfModel src="3dmodels/teatro_jrr.gltf" :cast-shadow="true" :receive-shadow="true" />
    </Scene>
    <EffectComposer>
      <RenderPass />
      <UnrealBloomPass :strength="2" />
    </EffectComposer>
  </Renderer>

</template>

<script>
import {
  AmbientLight,
  GltfModel,

  Camera,
  EffectComposer,
  Renderer,
  RenderPass,
  SpotLight,
  Scene,
  UnrealBloomPass
} from 'troisjs'

export default {
  name: 'TeatroJRR',
  components: {
    AmbientLight,
    GltfModel,

    Camera,
    EffectComposer,
    Renderer,
    RenderPass,
    SpotLight,
    Scene,
    UnrealBloomPass
  }
  // mounted () {
  //   // init instanced mesh matrix
  //   const imesh = this.$refs.imesh.mesh
  //   const dummy = new Object3D()
  //   const { randFloat: rnd, randFloatSpread: rndFS } = MathUtils
  //   for (let i = 0; i < this.NUM_INSTANCES; i++) {
  //     dummy.position.set(rndFS(200), rndFS(200), rndFS(200))
  //     const scale = rnd(0.2, 1)
  //     dummy.scale.set(scale, scale, scale)
  //     dummy.updateMatrix()
  //     imesh.setMatrixAt(i, dummy.matrix)
  //   }
  //   imesh.instanceMatrix.needsUpdate = true
  // }
}
</script>
