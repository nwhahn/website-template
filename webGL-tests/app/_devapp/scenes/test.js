import * as THREE from 'three'


export default scene => {
    scene.background=0xffffff;
    let geometry = new THREE.BoxGeometry( 3, 3, 3);

    let material = new THREE.MeshPhongMaterial( {color: 0x00ff00});


    const cube = new THREE.Mesh( geometry, material );

    let color = 0xFFFFFF;
    let intensity = 1;
    const light = new THREE.DirectionalLight(color, intensity);


    scene.add(light);
    scene.add(cube);

    function update(time) {
        const scale = Math.sin(time)+2;

        cube.scale.set(scale, scale, scale);
    }

    return {
        update
    }
}
