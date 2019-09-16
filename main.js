const app = {
    init() {
        this.scene = new THREE.Scene();

        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.camera.position.z = 50;

        const raycaster = new THREE.Raycaster();
        const mouse = new THREE.Vector2();

        this.renderer = new THREE.WebGLRenderer({antialias: true});
        this.renderer.setClearColor('#6666aa');
        this.renderer.setSize( window.innerWidth, window.innerHeight );

        document.body.appendChild( this.renderer.domElement );

        this.createLights();
        // this.sphere = this.createSphere();

        this.createSpheres();


        // ...the rare and elusive hard binding appears! but why?
        this.render = this.render.bind( this );
        this.render();
        window.addEventListener('mousemove', onMouseMove);

        function onMouseMove(event) {
            event.preventDefault();

            mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
            mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

            raycaster.setFromCamera(mouse, this.camera);
            let intersects = raycaster.intersectObjects(this.scene.children, true);
            for (let i = 0; i < intersects.length; i++) {
                this.tl = new TimelineMax();
                this.tl.to(intersects[i].object.scale, 1, {x: 2, ease: Expo.easeOut});
                this.tl.to(intersects[i].object.scale, .5, {x: .5, ease: Expo.easeOut});
                this.tl.to(intersects[i].object.position, .5, {x: 2, ease: Expo.easeOut});
                this.tl.to(intersects[i].object.rotation, .5, {y: Math.PI*.5, ease: Expo.easeOut}, "=-1.5");
            }
        }

    },

    createLights() {
        const pointLight = new THREE.PointLight( 0xffffff );
        pointLight.position.z = 100;

        this.scene.add( pointLight );
    },

    createSpheres() {
        for (let i = 0; i < 16; i++) {
            let mesh = this.createSphere();
            mesh.positionX = (Math.random() - 0.5) * 10;
            mesh.positionY = (Math.random() - 0.5) * 10;
            mesh.positionZ = (Math.random() - 0.5) * 10;
            this.scene.add( mesh );

        }
    },

    createSphere() {
            const geometry = new THREE.SphereGeometry( 16, 16, 16 );
            const mat = new THREE.MeshPhongMaterial({ color:0xff0000, shininess:2000 });
            return new THREE.Mesh(geometry, mat);
        },

render() {
        this.renderer.render( this.scene, this.camera );
        window.requestAnimationFrame( this.render );
    }
};

window.onload = ()=> app.init();
