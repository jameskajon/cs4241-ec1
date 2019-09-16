const app = {
    init() {
        this.scene = new THREE.Scene();

        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.camera.position.z = 50;

        this.raycaster = new THREE.Raycaster();
        this.mouse = new THREE.Vector2();

        this.renderer = new THREE.WebGLRenderer({antialias: true});
        this.renderer.setClearColor('#6666aa');
        this.renderer.setSize( window.innerWidth, window.innerHeight );

        document.body.appendChild( this.renderer.domElement );

        this.createLights();
        this.sphere = this.createSphere();
        this.sphere.positionX = -2;
        this.sphere.positionY = -2;


        // ...the rare and elusive hard binding appears! but why?
        this.render = this.render.bind( this );
        this.render();
        document.body.addEventListener( 'keydown', onKeyDown.bind(this), false );
        window.addEventListener('mousemove', onMouseMove.bind(this));

        function onMouseMove(event) {
            event.preventDefault();

            this.mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
            this.mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

        }

        function onKeyDown() {
            switch( event.keyCode ) {
                case 83: // w go up
                    this.sphere.translateY( -1 );
                    break;
                case 87: // s go down
                    this.sphere.translateY( 1 );
                    break;
                case 65: // a go left
                    this.sphere.translateX( -1 );
                    break;
                case 68: // d go right
                    this.sphere.translateX( 1 );
                    break;
                case 81: // q go in
                    this.sphere.translateZ( -1 );
                    break;
                case 69: // e go out
                    this.sphere.translateZ( 1 );
                    break;
            }

        }

    },

    createLights() {
        const pointLight = new THREE.PointLight( '#aaccaa' );
        pointLight.position.z = 100;

        this.scene.add( pointLight );
    },


    createSphere() {
        const geometry = new THREE.SphereGeometry( 16, 16, 16 );
        const mat = new THREE.MeshPhongMaterial({ color:0xffffff, shininess:2000 });
        const mesh = new THREE.Mesh(geometry, mat);
        this.scene.add( mesh );
        return mesh;
    },


    render() {
        // update the picking ray with the camera and mouse position
        this.raycaster.setFromCamera( this.mouse, this.camera );

        // calculate objects intersecting the picking ray
        let intersects = this.raycaster.intersectObjects( this.scene.children );

        for ( let i = 0; i < intersects.length; i++ ) {
            intersects[i].object.material.color.set('#ff00ff');
        }
        if (intersects.length === 0) {
            this.sphere.material.color.set('#ffffff');
        }
        this.renderer.render( this.scene, this.camera );
        window.requestAnimationFrame( this.render );
    }
};


window.onload = ()=> app.init();
