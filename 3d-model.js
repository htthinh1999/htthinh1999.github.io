// 3d-model.js - Implements a 3D computer setup with interactive elements

class CoderScene {
    constructor() {
        this.container = document.getElementById('three-d-container');
        if (!this.container) {
            console.error('Container element not found!');
            return;
        }

        console.log('Initializing 3D scene in container:', this.container);

        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.model = null;
        this.mixer = null;
        this.clock = new THREE.Clock();
        this.controls = null;
        this.monitorOn = false;

        // Mouse position for interaction
        this.mouse = new THREE.Vector2();

        // Setup
        this.init();
        this.setupLights();
        this.createComputerSetup();
        this.setupEventListeners();
        this.animate();

        // Delayed render check to ensure animation is running
        setTimeout(() => {
            console.log('Checking if scene is rendered...');
            if (this.renderer && this.scene && this.camera) {
                console.log('Forcing render of scene');
                this.renderer.render(this.scene, this.camera);

                // Check if we have any visible objects by logging scene
                console.log('Scene contains objects:', this.scene.children.length);
                console.log('Computer setup contains objects:',
                    this.computerSetup ? this.computerSetup.children.length : 0);
            }
        }, 1000);
    }

    init() {
        console.log('Initializing 3D scene...');

        // Create scene
        this.scene = new THREE.Scene();
        // Set background to transparent (remove background color)
        this.scene.background = null;

        // Create camera with improved positioning
        this.camera = new THREE.PerspectiveCamera(
            70, // Wide FOV to see everything
            this.container.clientWidth / this.container.clientHeight,
            0.1,
            1000
        );

        // Position camera closer to the scene
        this.camera.position.set(0, 0.6, 0.8);
        this.camera.lookAt(0, 0.3, 0);

        // Create renderer with transparency enabled
        this.renderer = new THREE.WebGLRenderer({
            antialias: true,
            alpha: true,
            premultipliedAlpha: false
        });

        // Set renderer size and pixel ratio
        this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.outputEncoding = THREE.sRGBEncoding;

        // Enable shadows
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

        // Clear existing content and append renderer
        this.container.innerHTML = '';
        this.container.appendChild(this.renderer.domElement);

        // Set renderer transparent background
        this.renderer.setClearColor(0x000000, 0);

        // Log renderer canvas dimensions
        console.log(`Renderer size: ${this.renderer.domElement.width}x${this.renderer.domElement.height}`);
        console.log(`Container size: ${this.container.clientWidth}x${this.container.clientHeight}`);

        // Add orbit controls with enhanced zoom
        this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
        this.controls.enableDamping = true;
        this.controls.dampingFactor = 0.1;
        this.controls.minDistance = 0.3; // Allow even closer zoom
        this.controls.maxDistance = 3.0; // Reduce max zoom out distance
        this.controls.maxPolarAngle = Math.PI / 1.5; // Allow more overhead view
        this.controls.minAzimuthAngle = -Math.PI;
        this.controls.maxAzimuthAngle = Math.PI;

        // Handle window resize
        window.addEventListener('resize', () => {
            const width = this.container.clientWidth;
            const height = this.container.clientHeight;

            this.camera.aspect = width / height;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(width, height);
            console.log(`Resized to: ${width}x${height}`);
        });

        // Set initial position based on device size
        this.adjustForDeviceSize();
    }

    // Method to adjust camera and scene for different device sizes
    adjustForDeviceSize() {
        const width = this.container.clientWidth;
        console.log(`Adjusting for device size: ${width}px wide`);

        // Adjust camera and controls based on container size
        if (width < 480) {
            // Mobile phone
            this.camera.position.set(0, 0.7, 1.2);
            this.camera.lookAt(0, 0.3, 0);
            this.controls.minDistance = 0.8;
            this.controls.maxDistance = 2.5;
        } else if (width < 768) {
            // Tablet
            this.camera.position.set(0, 0.6, 1.0);
            this.camera.lookAt(0, 0.3, 0);
            this.controls.minDistance = 0.6;
            this.controls.maxDistance = 2.5;
        } else {
            // Desktop
            this.camera.position.set(0, 0.6, 0.8);
            this.camera.lookAt(0, 0.3, 0);
            this.controls.minDistance = 0.2;
            this.controls.maxDistance = 2.5;
        }                                                                                                                                                           
    }

    createBoundaryPlane() {
        // Create invisible boundary plane that limits the 3D scene area
        const boundaryGeometry = new THREE.PlaneGeometry(10, 10);
        const boundaryMaterial = new THREE.MeshBasicMaterial({
            transparent: true,
            opacity: 0,
            side: THREE.DoubleSide
        });

        const boundaryPlane = new THREE.Mesh(boundaryGeometry, boundaryMaterial);
        boundaryPlane.position.set(-0.5, 0, 0); // Position at left side
        boundaryPlane.rotation.y = Math.PI / 2; // Rotate to be vertical

        this.scene.add(boundaryPlane);
    }

    setupLights() {
        console.log('Setting up lights');

        // Add ambient light (softer)
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
        this.scene.add(ambientLight);

        // Add directional light (like sunlight) with shadows
        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
        directionalLight.position.set(1, 2, 4);
        directionalLight.castShadow = true;

        // Improve shadow quality
        directionalLight.shadow.mapSize.width = 2048;
        directionalLight.shadow.mapSize.height = 2048;
        directionalLight.shadow.camera.near = 0.5;
        directionalLight.shadow.camera.far = 15;
        directionalLight.shadow.bias = -0.0005;

        // Adjust shadow camera to fit scene
        const shadowSize = 3;
        directionalLight.shadow.camera.left = -shadowSize;
        directionalLight.shadow.camera.right = shadowSize;
        directionalLight.shadow.camera.top = shadowSize;
        directionalLight.shadow.camera.bottom = -shadowSize;

        this.scene.add(directionalLight);

        // Add point light to highlight the setup with soft shadows
        const pointLight = new THREE.PointLight(0x2563eb, 0.8, 10);
        pointLight.position.set(0, 2, 2);
        pointLight.castShadow = true;
        pointLight.shadow.mapSize.width = 1024;
        pointLight.shadow.mapSize.height = 1024;
        pointLight.shadow.radius = 4;
        this.scene.add(pointLight);

        // Add keyboard RGB light
        const keyboardLight = new THREE.PointLight(0xff0000, 0.5, 1);
        keyboardLight.position.set(0, 0.85, 0.2);
        this.scene.add(keyboardLight);
        this.keyboardLight = keyboardLight;

        // Remove helpers in production for better visual appearance
        if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
            // Add helper axes to visualize coordinates
            const axesHelper = new THREE.AxesHelper(2);
            this.scene.add(axesHelper);
            console.log('Added axes helper for debugging (red=X, green=Y, blue=Z)');

            // Add a grid helper to visualize the ground plane
            const gridHelper = new THREE.GridHelper(5, 10);
            this.scene.add(gridHelper);
            console.log('Added grid helper for visualization');

            // Add light helpers
            const dirLightHelper = new THREE.DirectionalLightHelper(directionalLight, 0.5);
            this.scene.add(dirLightHelper);

            // Shadow camera helper
            const shadowHelper = new THREE.CameraHelper(directionalLight.shadow.camera);
            this.scene.add(shadowHelper);
        }
    }

    createComputerSetup() {
        console.log('Creating computer setup');

        // Create main group
        this.computerSetup = new THREE.Group();

        // Apply a global scale to make everything appropriate size
        this.computerSetup.scale.set(0.4, 0.4, 0.4);

        // Center the entire setup
        this.computerSetup.position.set(0, 0, 0);

        // Colors
        const deskColor = 0x8B4513; // Brown desk
        const deskLegColor = 0x5D4037; // Darker brown

        // Create a ground plane for shadows
        const groundGeometry = new THREE.PlaneGeometry(10, 10);
        const groundMaterial = new THREE.ShadowMaterial({ opacity: 0.3 });
        const ground = new THREE.Mesh(groundGeometry, groundMaterial);
        ground.rotation.x = -Math.PI / 2;
        ground.position.y = 0;
        ground.receiveShadow = true;
        this.scene.add(ground);

        // First create a desk
        const deskGeometry = new THREE.BoxGeometry(1.4, 0.05, 0.8);
        const deskMaterial = new THREE.MeshStandardMaterial({
            color: deskColor,
            roughness: 0.6,
            metalness: 0.1,
            envMapIntensity: 0.5
        });
        const desk = new THREE.Mesh(deskGeometry, deskMaterial);
        desk.position.set(0, 0.8, 0.2);
        desk.castShadow = true;
        desk.receiveShadow = true;
        this.computerSetup.add(desk);

        // Add desk legs
        const deskLegGeometry = new THREE.CylinderGeometry(0.025, 0.025, 0.8, 8);
        const deskLegMaterial = new THREE.MeshStandardMaterial({
            color: deskLegColor,
            roughness: 0.7,
            metalness: 0.1
        });

        // Add 4 legs
        const legPositions = [
            { x: 0.65, z: 0.5 },
            { x: -0.65, z: 0.5 },
            { x: 0.65, z: -0.1 },
            { x: -0.65, z: -0.1 }
        ];

        legPositions.forEach(pos => {
            const deskLeg = new THREE.Mesh(deskLegGeometry, deskLegMaterial);
            deskLeg.position.set(pos.x, 0.4, pos.z);
            deskLeg.castShadow = true;
            this.computerSetup.add(deskLeg);
        });

        console.log('Adding PC case');
        // Create PC Case
        const pcCase = this.createPCCase();
        pcCase.position.set(0.5, 0.99, 0.2); // Position on desk with higher Y value to stay on top
        pcCase.scale.set(0.8, 0.8, 0.8); // Scale PC
        this.computerSetup.add(pcCase);
        this.pcCase = pcCase;

        console.log('Adding monitor');
        // Create Monitor
        const monitor = this.createMonitor();
        monitor.position.set(-0.1, 0.825, 0);
        monitor.scale.set(0.85, 0.85, 0.85);
        this.computerSetup.add(monitor);
        this.monitor = monitor;

        console.log('Adding keyboard');
        // Create RGB keyboard
        const keyboard = this.createRGBKeyboard();
        keyboard.position.set(0, 0.825, 0.25);
        keyboard.scale.set(0.85, 0.85, 0.85);
        this.computerSetup.add(keyboard);
        this.keyboard = keyboard;

        console.log('Adding mouse');
        // Create computer mouse
        const mouse = this.createComputerMouse();
        mouse.position.set(0.3, 0.825, 0.25);
        mouse.scale.set(0.85, 0.85, 0.85);
        this.computerSetup.add(mouse);
        this.mouse = mouse;

        console.log('Adding chair');
        // Create office chair
        const chair = this.createChair();
        chair.position.set(0, 0, 0.7); // Behind desk
        chair.rotation.y = 0; // Forward facing
        chair.scale.set(1.2, 1.2, 1.2);
        this.computerSetup.add(chair);
        this.chair = chair;

        // Enable shadows for all objects
        this.computerSetup.traverse(object => {
            if (object.isMesh) {
                object.castShadow = true;
                object.receiveShadow = true;
            }
        });

        // Add the group to scene
        this.scene.add(this.computerSetup);
        console.log('Computer setup added to scene');

        // Create a mobile-specific setup if needed
        this.setupForMobile();

        // Load environment map for realistic reflections
        this.loadEnvironmentMap();

        // Start animations
        this.animateSetup();
    }

    // Add a method to adjust for mobile devices
    setupForMobile() {
        console.log('Setting up for mobile');
        // Check if we're on a mobile device
        const isMobile = window.innerWidth <= 768;

        if (isMobile) {
            // Further scale down for mobile
            this.computerSetup.scale.set(0.3, 0.3, 0.3);

            // Adjust the camera for mobile
            this.camera.position.set(0, 1.2, 2.2);
            this.camera.lookAt(0, 0.6, 0);
        }

        // Listen for orientation changes
        window.addEventListener('resize', () => {
            const newIsMobile = window.innerWidth <= 768;
            if (newIsMobile !== isMobile) {
                console.log(`Device type changed: ${newIsMobile ? 'mobile' : 'desktop'}`);
                if (newIsMobile) {
                    // Switch to mobile view
                    this.computerSetup.scale.set(0.3, 0.3, 0.3);
                    this.camera.position.set(0, 1.2, 2.2);
                    this.camera.lookAt(0, 0.6, 0);
                } else {
                    // Switch to desktop view
                    this.computerSetup.scale.set(0.4, 0.4, 0.4);
                    this.camera.position.set(0, 1.2, 2.0);
                    this.camera.lookAt(0, 0.6, 0);
                }
            }
        });
    }

    // Load environment map for realistic reflections
    loadEnvironmentMap() {
        // Create a basic environment map for reflections
        const pmremGenerator = new THREE.PMREMGenerator(this.renderer);
        pmremGenerator.compileEquirectangularShader();

        // Generate a simple environment
        const envScene = new THREE.Scene();
        envScene.background = new THREE.Color(0x444444);

        // Add some gradient to simulate sky and ground
        const envLight1 = new THREE.DirectionalLight(0x8888ff, 1);
        envLight1.position.set(1, 1, 1);
        envScene.add(envLight1);

        const envLight2 = new THREE.DirectionalLight(0x88ff88, 0.5);
        envLight2.position.set(-1, 0.5, -1);
        envScene.add(envLight2);

        const envMap = pmremGenerator.fromScene(envScene).texture;
        this.scene.environment = envMap;

        // Apply to materials that should be reflective
        this.computerSetup.traverse(object => {
            if (object.isMesh && object.material) {
                if (object.material.isMeshStandardMaterial || object.material.isMeshPhysicalMaterial) {
                    object.material.envMap = envMap;
                    object.material.envMapIntensity = object.material.metalness > 0.5 ? 1.0 : 0.5;
                    object.material.needsUpdate = true;
                }
            }
        });

        pmremGenerator.dispose();
    }

    // Create PC Case with enhanced materials
    createPCCase() {
        const pcGroup = new THREE.Group();

        // Define materials with improved realism
        const caseMaterial = new THREE.MeshStandardMaterial({
            color: 0x222222,
            roughness: 0.3,
            metalness: 0.5
        });

        const glassMaterial = new THREE.MeshPhysicalMaterial({
            color: 0x111111,
            transparent: true,
            opacity: 0.6,
            roughness: 0.05,
            transmission: 0.2,
            reflectivity: 0.5,
            clearcoat: 1.0,
            clearcoatRoughness: 0.1
        });

        const meshMaterial = new THREE.MeshStandardMaterial({
            color: 0x080808,
            roughness: 0.4,
            metalness: 0.6,
            wireframe: false
        });

        const metalBrightMaterial = new THREE.MeshStandardMaterial({
            color: 0xCCCCCC,
            metalness: 0.9,
            roughness: 0.1
        });

        const metalDarkMaterial = new THREE.MeshStandardMaterial({
            color: 0x444444,
            metalness: 0.8,
            roughness: 0.2
        });

        const pcbMaterial = new THREE.MeshStandardMaterial({
            color: 0x003300,
            roughness: 0.8,
            metalness: 0.2
        });

        // Main case - slightly rounded corners
        const caseGeometry = new THREE.BoxGeometry(0.25, 0.4, 0.35);
        // Add bevel to edges
        caseGeometry.translate(0, 0, 0);
        const mainCase = new THREE.Mesh(caseGeometry, caseMaterial);
        pcGroup.add(mainCase);

        // Glass side panel with beveled edges
        const sidePanel = new THREE.Group();

        // Main glass panel
        const frontPanelGeometry = new THREE.BoxGeometry(0.01, 0.38, 0.33);
        const frontPanel = new THREE.Mesh(frontPanelGeometry, glassMaterial);
        frontPanel.position.set(-0.12, 0, 0);
        sidePanel.add(frontPanel);

        // Add metal frame around glass
        const frameEdges = [
            { pos: [-0.12, 0.19, 0], scale: [0.01, 0.02, 0.35], rot: [0, 0, 0] },  // Top
            { pos: [-0.12, -0.19, 0], scale: [0.01, 0.02, 0.35], rot: [0, 0, 0] }, // Bottom
            { pos: [-0.12, 0, 0.17], scale: [0.01, 0.4, 0.015], rot: [0, 0, 0] },  // Right
            { pos: [-0.12, 0, -0.17], scale: [0.01, 0.4, 0.015], rot: [0, 0, 0] }  // Left
        ];

        frameEdges.forEach(edge => {
            const frameGeometry = new THREE.BoxGeometry(edge.scale[0], edge.scale[1], edge.scale[2]);
            const frame = new THREE.Mesh(frameGeometry, metalDarkMaterial);
            frame.position.set(edge.pos[0], edge.pos[1], edge.pos[2]);
            if (edge.rot) {
                frame.rotation.set(edge.rot[0], edge.rot[1], edge.rot[2]);
            }
            sidePanel.add(frame);
        });

        mainCase.add(sidePanel);

        // Front panel with detailed components
        const frontFacePanel = new THREE.Group();
        frontFacePanel.position.set(0, 0, 0.175);

        // Main front face
        const frontFaceGeometry = new THREE.BoxGeometry(0.25, 0.4, 0.01);
        const frontFace = new THREE.Mesh(frontFaceGeometry, caseMaterial);
        frontFacePanel.add(frontFace);

        // Add power button
        const powerButtonGeometry = new THREE.CylinderGeometry(0.008, 0.008, 0.004, 16);
        const powerButtonMaterial = new THREE.MeshPhongMaterial({
            color: 0x333333,
            emissive: 0x00ff00,
            emissiveIntensity: 0.5
        });
        const powerButton = new THREE.Mesh(powerButtonGeometry, powerButtonMaterial);
        powerButton.rotation.x = Math.PI / 2;
        powerButton.position.set(-0.1, 0.16, 0.01);
        frontFacePanel.add(powerButton);

        // Add reset button
        const resetButtonGeometry = new THREE.CylinderGeometry(0.004, 0.004, 0.003, 12);
        const resetButton = new THREE.Mesh(resetButtonGeometry, metalDarkMaterial);
        resetButton.rotation.x = Math.PI / 2;
        resetButton.position.set(-0.1, 0.14, 0.01);
        frontFacePanel.add(resetButton);

        // Add front USB ports
        const usbPortPositions = [
            { pos: [-0.08, 0.16, 0.01], rot: [Math.PI / 2, 0, 0] },
            { pos: [-0.08, 0.14, 0.01], rot: [Math.PI / 2, 0, 0] }
        ];

        usbPortPositions.forEach(port => {
            const usbPortGeometry = new THREE.BoxGeometry(0.014, 0.006, 0.004);
            const usbPort = new THREE.Mesh(usbPortGeometry, metalBrightMaterial);
            usbPort.position.set(port.pos[0], port.pos[1], port.pos[2]);
            usbPort.rotation.set(port.rot[0], port.rot[1], port.rot[2]);
            frontFacePanel.add(usbPort);
        });

        // Add audio jacks
        const audioJackPositions = [
            { pos: [-0.04, 0.16, 0.01], color: 0x00ff00 }, // Green
            { pos: [-0.04, 0.14, 0.01], color: 0xff0000 }  // Red
        ];

        audioJackPositions.forEach(jack => {
            const jackGeometry = new THREE.CircleGeometry(0.003, 12);
            const jackMaterial = new THREE.MeshPhongMaterial({
                color: jack.color,
                emissiveIntensity: 0.2
            });
            const audioJack = new THREE.Mesh(jackGeometry, jackMaterial);
            audioJack.position.set(jack.pos[0], jack.pos[1], jack.pos[2]);
            frontFacePanel.add(audioJack);
        });

        // Add front mesh ventilation areas
        const meshAreaPositions = [
            { pos: [0, 0.08, 0.006], scale: [0.22, 0.06, 0.001] },  // Upper mesh
            { pos: [0, -0.12, 0.006], scale: [0.22, 0.14, 0.001] }  // Lower mesh
        ];

        meshAreaPositions.forEach(area => {
            const meshAreaGeometry = new THREE.BoxGeometry(area.scale[0], area.scale[1], area.scale[2]);
            const meshArea = new THREE.Mesh(meshAreaGeometry, meshMaterial);
            meshArea.position.set(area.pos[0], area.pos[1], area.pos[2]);

            // Add mesh pattern
            const meshLines = 12;
            const lineSpacing = area.scale[0] / meshLines;

            // Create horizontal mesh lines
            for (let i = 0; i < meshLines; i++) {
                const lineGeometry = new THREE.BoxGeometry(0.001, area.scale[1] - 0.01, 0.002);
                const line = new THREE.Mesh(lineGeometry, metalDarkMaterial);
                const xPos = -area.scale[0] / 2 + i * lineSpacing;
                line.position.set(xPos, 0, 0.001);
                meshArea.add(line);
            }

            // Create vertical mesh lines
            const vertLines = Math.floor(area.scale[1] / lineSpacing);
            for (let i = 0; i < vertLines; i++) {
                const lineGeometry = new THREE.BoxGeometry(area.scale[0] - 0.01, 0.001, 0.002);
                const line = new THREE.Mesh(lineGeometry, metalDarkMaterial);
                const yPos = -area.scale[1] / 2 + i * lineSpacing;
                line.position.set(0, yPos, 0.001);
                meshArea.add(line);
            }

            frontFacePanel.add(meshArea);
        });

        mainCase.add(frontFacePanel);

        // Add internal components visible through glass panel
        const internalComponents = new THREE.Group();
        internalComponents.position.set(-0.08, 0, 0);

        // Add motherboard
        const motherboardGeometry = new THREE.BoxGeometry(0.01, 0.3, 0.28);
        const motherboard = new THREE.Mesh(motherboardGeometry, pcbMaterial);
        motherboard.position.set(-0.03, 0, 0);
        internalComponents.add(motherboard);

        // Add CPU and CPU cooler
        const cpuGeometry = new THREE.BoxGeometry(0.02, 0.04, 0.04);
        const cpuMaterial = new THREE.MeshPhongMaterial({
            color: 0x888888,
            shininess: 100
        });
        const cpu = new THREE.Mesh(cpuGeometry, cpuMaterial);
        cpu.position.set(-0.015, 0.05, 0.05);
        internalComponents.add(cpu);

        // CPU Cooler
        const coolerBaseGeometry = new THREE.CylinderGeometry(0.025, 0.025, 0.01, 16);
        const coolerBase = new THREE.Mesh(coolerBaseGeometry, metalBrightMaterial);
        coolerBase.rotation.x = Math.PI / 2;
        coolerBase.position.set(-0.005, 0.05, 0.05);
        internalComponents.add(coolerBase);

        // Cooler fan
        const fanGeometry = new THREE.CylinderGeometry(0.02, 0.02, 0.01, 16);
        const fanMaterial = new THREE.MeshPhongMaterial({
            color: 0x222222,
            shininess: 30
        });
        const fan = new THREE.Mesh(fanGeometry, fanMaterial);
        fan.rotation.x = Math.PI / 2;
        fan.position.set(0.01, 0.05, 0.05);
        internalComponents.add(fan);

        // Fan blades
        const bladeCount = 7;
        const fanBladeGeometry = new THREE.BoxGeometry(0.015, 0.002, 0.006);

        for (let i = 0; i < bladeCount; i++) {
            const blade = new THREE.Mesh(fanBladeGeometry, metalDarkMaterial);
            const angle = (i / bladeCount) * Math.PI * 2;
            blade.position.set(0.01, 0.05 + Math.sin(angle) * 0.015, 0.05 + Math.cos(angle) * 0.015);
            blade.rotation.z = angle;
            internalComponents.add(blade);
        }

        // Add RAM sticks
        const ramPositions = [
            { pos: [-0.02, 0.12, 0.05] },
            { pos: [-0.02, 0.1, 0.05] },
            { pos: [-0.02, 0.08, 0.05] },
            { pos: [-0.02, 0.06, 0.05] }
        ];

        ramPositions.forEach((ram, index) => {
            const ramGeometry = new THREE.BoxGeometry(0.01, 0.018, 0.06);

            // Generate different colors for RAM
            const hue = index * 0.2; // Spread out the hues
            const ramColor = new THREE.Color().setHSL(hue, 0.8, 0.5);

            const ramMaterial = new THREE.MeshPhongMaterial({
                color: ramColor,
                emissive: ramColor,
                emissiveIntensity: 0.2,
                shininess: 60
            });

            const ramStick = new THREE.Mesh(ramGeometry, ramMaterial);
            ramStick.position.set(ram.pos[0], ram.pos[1], ram.pos[2]);
            internalComponents.add(ramStick);
        });

        // Add GPU
        const gpuGeometry = new THREE.BoxGeometry(0.1, 0.02, 0.15);
        const gpuMaterial = new THREE.MeshPhongMaterial({
            color: 0x111111,
            shininess: 30
        });
        const gpu = new THREE.Mesh(gpuGeometry, gpuMaterial);
        gpu.position.set(0.02, -0.05, 0.01);
        internalComponents.add(gpu);

        // GPU fans
        const gpuFanPositions = [
            { pos: [0.02, -0.04, -0.04] },
            { pos: [0.02, -0.04, 0.04] }
        ];

        gpuFanPositions.forEach(pos => {
            const gpuFanGeometry = new THREE.CylinderGeometry(0.03, 0.03, 0.005, 24);
            const gpuFan = new THREE.Mesh(gpuFanGeometry, metalDarkMaterial);
            gpuFan.rotation.x = Math.PI / 2;
            gpuFan.position.set(pos.pos[0], pos.pos[1], pos.pos[2]);

            // Fan blades
            const bladeCount = 9;
            const fanBladeGeometry = new THREE.BoxGeometry(0.025, 0.001, 0.008);

            for (let i = 0; i < bladeCount; i++) {
                const blade = new THREE.Mesh(fanBladeGeometry, metalBrightMaterial);
                const angle = (i / bladeCount) * Math.PI * 2;
                const xOffset = 0;
                const yOffset = Math.sin(angle) * 0.02;
                const zOffset = Math.cos(angle) * 0.02;
                blade.position.set(xOffset, yOffset, zOffset);
                blade.rotation.z = angle;
                gpuFan.add(blade);
            }

            internalComponents.add(gpuFan);
        });

        // Add power supply
        const psuGeometry = new THREE.BoxGeometry(0.15, 0.07, 0.14);
        const psuMaterial = new THREE.MeshPhongMaterial({
            color: 0x222222,
            shininess: 20
        });
        const psu = new THREE.Mesh(psuGeometry, psuMaterial);
        psu.position.set(0.05, -0.16, 0);
        internalComponents.add(psu);

        // Add cables
        const cablePositions = [
            { start: [-0.02, 0.05, 0.1], end: [0.04, -0.06, 0.05], radius: 0.004, color: 0xFFFF00 },
            { start: [-0.02, 0.05, 0.02], end: [0.04, -0.15, 0.02], radius: 0.005, color: 0xFF0000 },
            { start: [-0.02, 0.1, 0.1], end: [0.04, -0.06, 0], radius: 0.003, color: 0x0000FF }
        ];

        cablePositions.forEach(cable => {
            const cableCurve = new THREE.CubicBezierCurve3(
                new THREE.Vector3(cable.start[0], cable.start[1], cable.start[2]),
                new THREE.Vector3(cable.start[0] + 0.05, cable.start[1] - 0.05, cable.start[2]),
                new THREE.Vector3(cable.end[0] - 0.05, cable.end[1] + 0.05, cable.end[2]),
                new THREE.Vector3(cable.end[0], cable.end[1], cable.end[2])
            );

            const cableGeometry = new THREE.TubeGeometry(
                cableCurve,
                16,          // tubularSegments
                cable.radius, // radius
                8,           // radialSegments
                false        // closed
            );

            const cableMaterial = new THREE.MeshPhongMaterial({
                color: cable.color,
                shininess: 50
            });

            const cableMesh = new THREE.Mesh(cableGeometry, cableMaterial);
            internalComponents.add(cableMesh);
        });

        mainCase.add(internalComponents);

        // RGB Lighting inside PC
        const pcLightFront = new THREE.PointLight(0xff0000, 0.7, 0.4);
        pcLightFront.position.set(-0.1, 0, 0);
        mainCase.add(pcLightFront);
        this.pcLightFront = pcLightFront;

        // Fans with animated blades
        const fanPositions = [
            { y: 0.12, z: 0 },
            { y: 0, z: 0 },
            { y: -0.12, z: 0 }
        ];

        this.fans = [];
        fanPositions.forEach((pos, index) => {
            // Create fan assembly
            const fanGroup = new THREE.Group();
            fanGroup.position.set(-0.119, pos.y, pos.z);

            // Fan frame
            const fanFrameGeometry = new THREE.RingGeometry(0.04, 0.05, 16);
            const fanFrameMaterial = new THREE.MeshPhongMaterial({
                color: 0x444444,
                side: THREE.DoubleSide,
                shininess: 60
            });
            const fanFrame = new THREE.Mesh(fanFrameGeometry, fanFrameMaterial);
            fanFrame.rotation.y = Math.PI / 2;
            fanGroup.add(fanFrame);

            // Fan blades
            const bladeCount = 9;
            const fanCenter = new THREE.Group();

            // Fan hub
            const hubGeometry = new THREE.CylinderGeometry(0.01, 0.01, 0.01, 16);
            const hubMaterial = new THREE.MeshPhongMaterial({
                color: 0x222222,
                shininess: 80
            });
            const hub = new THREE.Mesh(hubGeometry, hubMaterial);
            hub.rotation.z = Math.PI / 2;
            fanCenter.add(hub);

            // Create fan blades
            for (let i = 0; i < bladeCount; i++) {
                const bladeGeometry = new THREE.BoxGeometry(0.002, 0.01, 0.025);
                const bladeMaterial = new THREE.MeshPhongMaterial({
                    color: 0x222222,
                    shininess: 30
                });
                const blade = new THREE.Mesh(bladeGeometry, bladeMaterial);

                // Position blade around hub
                const angle = (i / bladeCount) * Math.PI * 2;
                blade.position.y = Math.sin(angle) * 0.025;
                blade.position.z = Math.cos(angle) * 0.025;
                blade.rotation.x = angle;

                fanCenter.add(blade);
            }

            fanGroup.add(fanCenter);

            // Fan RGB ring
            const rgbRingGeometry = new THREE.RingGeometry(0.03, 0.035, 24);
            const rgbRingMaterial = new THREE.MeshBasicMaterial({
                color: 0xffffff,
                side: THREE.DoubleSide,
                transparent: true,
                opacity: 0.8
            });
            const rgbRing = new THREE.Mesh(rgbRingGeometry, rgbRingMaterial);
            rgbRing.rotation.y = Math.PI / 2;
            fanGroup.add(rgbRing);

            // Store for animation
            this.fans.push(rgbRingMaterial);

            // Add fan to case
            mainCase.add(fanGroup);
        });

        return pcGroup;
    }

    // Create a Monitor
    createMonitor() {
        const monitorGroup = new THREE.Group();

        // Monitor base - more realistic oval shape
        const baseShape = new THREE.Shape();
        baseShape.ellipse(0, 0, 0.11, 0.07, 0, Math.PI * 2, false);

        const baseExtrusion = {
            steps: 1,
            depth: 0.02,
            bevelEnabled: true,
            bevelThickness: 0.005,
            bevelSize: 0.005,
            bevelSegments: 6
        };

        const baseGeometry = new THREE.ExtrudeGeometry(baseShape, baseExtrusion);
        const baseMaterial = new THREE.MeshPhongMaterial({
            color: 0x333333,
            shininess: 60
        });

        const base = new THREE.Mesh(baseGeometry, baseMaterial);
        base.rotation.x = -Math.PI / 2; // Lay flat
        monitorGroup.add(base);

        // Add rubber grip pad on bottom
        const gripGeometry = new THREE.RingGeometry(0.08, 0.1, 36);
        const gripMaterial = new THREE.MeshPhongMaterial({
            color: 0x111111,
            shininess: 5
        });
        const grip = new THREE.Mesh(gripGeometry, gripMaterial);
        grip.rotation.x = -Math.PI / 2;
        grip.position.y = -0.01;
        monitorGroup.add(grip);

        // Monitor stand - more detailed with cable management hole
        const standGeometry = new THREE.BoxGeometry(0.025, 0.2, 0.025);
        const standMaterial = new THREE.MeshPhongMaterial({
            color: 0x444444,
            shininess: 70
        });
        const stand = new THREE.Mesh(standGeometry, standMaterial);
        stand.position.set(0, 0.11, 0);
        monitorGroup.add(stand);

        // Add cable management hole to stand
        const cableHoleGeometry = new THREE.CylinderGeometry(0.008, 0.008, 0.028, 12);
        const cableHoleMaterial = new THREE.MeshPhongMaterial({ color: 0x222222 });
        const cableHole = new THREE.Mesh(cableHoleGeometry, cableHoleMaterial);
        cableHole.rotation.x = Math.PI / 2;
        cableHole.position.set(0, 0.06, 0.015);
        stand.add(cableHole);

        // Add detail to stand - mounting bracket
        const mountingGeometry = new THREE.BoxGeometry(0.07, 0.05, 0.015);
        const mounting = new THREE.Mesh(mountingGeometry, standMaterial);
        mounting.position.set(0, 0.21, 0);
        monitorGroup.add(mounting);

        // Monitor tilt mechanism
        const tiltGeometry = new THREE.CylinderGeometry(0.01, 0.01, 0.075, 12);
        const tilt = new THREE.Mesh(tiltGeometry, standMaterial);
        tilt.rotation.z = Math.PI / 2;
        tilt.position.set(0, 0.22, 0.01);
        monitorGroup.add(tilt);

        // Monitor body - thinner, more modern with curved corners
        const bodyWidth = 0.6;
        const bodyHeight = 0.35;
        const bodyDepth = 0.018;

        // Create monitor body with curved corners using shape
        const bodyShape = new THREE.Shape();
        const radius = 0.025; // Corner radius

        // Start at top-left with curve
        bodyShape.moveTo(-bodyWidth / 2 + radius, bodyHeight / 2);
        bodyShape.lineTo(bodyWidth / 2 - radius, bodyHeight / 2);
        bodyShape.quadraticCurveTo(bodyWidth / 2, bodyHeight / 2, bodyWidth / 2, bodyHeight / 2 - radius);
        bodyShape.lineTo(bodyWidth / 2, -bodyHeight / 2 + radius);
        bodyShape.quadraticCurveTo(bodyWidth / 2, -bodyHeight / 2, bodyWidth / 2 - radius, -bodyHeight / 2);
        bodyShape.lineTo(-bodyWidth / 2 + radius, -bodyHeight / 2);
        bodyShape.quadraticCurveTo(-bodyWidth / 2, -bodyHeight / 2, -bodyWidth / 2, -bodyHeight / 2 + radius);
        bodyShape.lineTo(-bodyWidth / 2, bodyHeight / 2 - radius);
        bodyShape.quadraticCurveTo(-bodyWidth / 2, bodyHeight / 2, -bodyWidth / 2 + radius, bodyHeight / 2);

        const bodyExtrusion = {
            steps: 1,
            depth: bodyDepth,
            bevelEnabled: true,
            bevelThickness: 0.005,
            bevelSize: 0.002,
            bevelSegments: 3
        };

        const bodyGeometry = new THREE.ExtrudeGeometry(bodyShape, bodyExtrusion);
        const bodyMaterial = new THREE.MeshPhongMaterial({
            color: 0x222222,
            shininess: 60
        });
        const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
        body.position.set(0, 0.3, 0);
        monitorGroup.add(body);

        // Create monitor bezel separately (thinner around screen)
        const bezelWidth = bodyWidth - 0.05;
        const bezelHeight = bodyHeight - 0.05;

        const bezelShape = new THREE.Shape();
        // Outer shape - same as body but smaller
        bezelShape.moveTo(-bezelWidth / 2 + radius, bezelHeight / 2);
        bezelShape.lineTo(bezelWidth / 2 - radius, bezelHeight / 2);
        bezelShape.quadraticCurveTo(bezelWidth / 2, bezelHeight / 2, bezelWidth / 2, bezelHeight / 2 - radius);
        bezelShape.lineTo(bezelWidth / 2, -bezelHeight / 2 + radius);
        bezelShape.quadraticCurveTo(bezelWidth / 2, -bezelHeight / 2, bezelWidth / 2 - radius, -bezelHeight / 2);
        bezelShape.lineTo(-bezelWidth / 2 + radius, -bezelHeight / 2);
        bezelShape.quadraticCurveTo(-bezelWidth / 2, -bezelHeight / 2, -bezelWidth / 2, -bezelHeight / 2 + radius);
        bezelShape.lineTo(-bezelWidth / 2, bezelHeight / 2 - radius);
        bezelShape.quadraticCurveTo(-bezelWidth / 2, bezelHeight / 2, -bezelWidth / 2 + radius, bezelHeight / 2);

        // Cut out the screen area
        const screenWidth = bezelWidth - 0.04;
        const screenHeight = bezelHeight - 0.04;

        const screenShape = new THREE.Path();
        screenShape.moveTo(-screenWidth / 2 + radius / 2, screenHeight / 2);
        screenShape.lineTo(screenWidth / 2 - radius / 2, screenHeight / 2);
        screenShape.quadraticCurveTo(screenWidth / 2, screenHeight / 2, screenWidth / 2, screenHeight / 2 - radius / 2);
        screenShape.lineTo(screenWidth / 2, -screenHeight / 2 + radius / 2);
        screenShape.quadraticCurveTo(screenWidth / 2, -screenHeight / 2, screenWidth / 2 - radius / 2, -screenHeight / 2);
        screenShape.lineTo(-screenWidth / 2 + radius / 2, -screenHeight / 2);
        screenShape.quadraticCurveTo(-screenWidth / 2, -screenHeight / 2, -screenWidth / 2, -screenHeight / 2 + radius / 2);
        screenShape.lineTo(-screenWidth / 2, screenHeight / 2 - radius / 2);
        screenShape.quadraticCurveTo(-screenWidth / 2, screenHeight / 2, -screenWidth / 2 + radius / 2, screenHeight / 2);

        bezelShape.holes.push(screenShape);

        const bezelExtrusion = {
            steps: 1,
            depth: 0.005,
            bevelEnabled: false
        };

        const bezelGeometry = new THREE.ExtrudeGeometry(bezelShape, bezelExtrusion);
        const bezelMaterial = new THREE.MeshPhongMaterial({
            color: 0x151515,
            shininess: 70
        });
        const bezel = new THREE.Mesh(bezelGeometry, bezelMaterial);
        bezel.position.set(0, 0.3, bodyDepth - 0.001);
        monitorGroup.add(bezel);

        // Screen (initially off)
        const screenGeometry = new THREE.PlaneGeometry(screenWidth, screenHeight);
        const screenOffMaterial = new THREE.MeshBasicMaterial({
            color: 0x111111
        });
        const screenOnMaterial = new THREE.MeshBasicMaterial({
            map: this.createCodeTexture()
        });

        const screen = new THREE.Mesh(screenGeometry, screenOffMaterial);
        screen.position.set(0, 0.3, bodyDepth + 0.004);
        monitorGroup.add(screen);

        // Store references for later
        this.screen = screen;
        this.screenOffMaterial = screenOffMaterial;
        this.screenOnMaterial = screenOnMaterial;

        // Add monitor brand logo at bottom
        const logoGeometry = new THREE.PlaneGeometry(0.06, 0.01);
        const logoMaterial = new THREE.MeshBasicMaterial({
            color: 0x444444,
            transparent: true,
            opacity: 0.8
        });
        const logo = new THREE.Mesh(logoGeometry, logoMaterial);
        logo.position.set(0, 0.12, bodyDepth + 0.005);
        monitorGroup.add(logo);

        // Small power LED
        const ledGeometry = new THREE.CircleGeometry(0.004, 16);
        const ledMaterial = new THREE.MeshBasicMaterial({ color: 0x333333 });
        const led = new THREE.Mesh(ledGeometry, ledMaterial);
        led.position.set(bodyWidth / 2 - 0.03, -bodyHeight / 2 + 0.02, bodyDepth + 0.005);
        body.add(led);
        this.monitorLed = led;

        // Add cable coming out of monitor
        const cableCurve = new THREE.CubicBezierCurve3(
            new THREE.Vector3(0, 0, 0),                // Start at monitor back center
            new THREE.Vector3(0, -0.05, -0.03),        // First control point
            new THREE.Vector3(0, -0.1, -0.05),         // Second control point
            new THREE.Vector3(0, -0.25, -0.03)         // End point toward desk
        );

        const cableGeometry = new THREE.TubeGeometry(
            cableCurve,
            16,       // tubular segments
            0.005,    // radius
            8,        // radial segments
            false     // closed
        );

        const cableMaterial = new THREE.MeshPhongMaterial({
            color: 0x111111,
            shininess: 30
        });

        const cable = new THREE.Mesh(cableGeometry, cableMaterial);
        cable.position.set(0, 0.3, -bodyDepth / 2); // Position at back of monitor
        monitorGroup.add(cable);

        return monitorGroup;
    }

    // Create a texture for the code on the monitor screen
    createCodeTexture() {
        const canvas = document.createElement('canvas');
        canvas.width = 1024;
        canvas.height = 1024;
        const context = canvas.getContext('2d');

        // Dark code editor background
        context.fillStyle = '#1E1E1E';
        context.fillRect(0, 0, canvas.width, canvas.height);

        // Add editor interface elements
        // Top bar with tabs
        context.fillStyle = '#252526';
        context.fillRect(0, 0, canvas.width, 40);

        // Draw tabs
        const tabs = ['index.js', 'app.js', 'styles.css'];
        let tabX = 10;

        tabs.forEach((tab, index) => {
            const tabWidth = 120;
            // Active tab for first one
            if (index === 0) {
                context.fillStyle = '#1E1E1E';
            } else {
                context.fillStyle = '#2D2D2D';
            }
            context.fillRect(tabX, 0, tabWidth, 40);

            // Tab text
            context.fillStyle = '#CCCCCC';
            context.font = 'bold 14px monospace';
            context.fillText(tab, tabX + 10, 25);

            tabX += tabWidth + 2;
        });

        // Left sidebar for file explorer
        context.fillStyle = '#252526';
        context.fillRect(0, 40, 50, canvas.height - 40);

        // File icons in sidebar
        const fileIcons = [
            { y: 70, color: '#608B4E' },  // Folder
            { y: 110, color: '#CCCCCC' },  // File
            { y: 150, color: '#CCCCCC' },  // File
            { y: 190, color: '#4EC9B0' },  // Special file
        ];

        fileIcons.forEach(icon => {
            context.fillStyle = icon.color;
            context.fillRect(15, icon.y, 20, 20);
        });

        // Bottom status bar
        context.fillStyle = '#007ACC';
        context.fillRect(0, canvas.height - 25, canvas.width, 25);

        // Status text
        context.fillStyle = '#FFFFFF';
        context.font = '12px monospace';
        context.fillText('JavaScript • Line 42 • UTF-8', 10, canvas.height - 10);

        // Main code area
        const codeAreaX = 60;
        const codeAreaY = 50;
        const lineHeight = 18;

        // Line numbers
        context.fillStyle = '#858585';
        context.font = '13px monospace';
        for (let i = 1; i <= 45; i++) {
            context.fillText(i.toString(), 55, codeAreaY + i * lineHeight);
        }

        // Syntax highlighting for code
        const codeColors = {
            keyword: '#569CD6',   // let, const, function, etc.
            type: '#4EC9B0',      // class names, types
            string: '#CE9178',    // string literals
            comment: '#6A9955',   // comments
            variable: '#9CDCFE',  // variable names
            function: '#DCDCAA',  // function names
            number: '#B5CEA8',    // numeric literals
            operator: '#D4D4D4',  // operators +, -, *, etc.
            punctuation: '#D4D4D4' // (), {}, [], etc.
        };

        // Sample code with syntax highlighting
        const codeLines = [
            { text: '// 3D Scene Initialization', style: codeColors.comment },
            { text: 'import * as THREE from "three";', style: codeColors.keyword },
            { text: '', style: '' },
            { text: 'class SceneManager {', style: codeColors.keyword },
            { text: '  constructor() {', style: codeColors.keyword },
            { text: '    this.scene = new THREE.Scene();', style: codeColors.variable },
            { text: '    this.renderer = null;', style: codeColors.variable },
            { text: '    this.camera = null;', style: codeColors.variable },
            { text: '    this.init();', style: codeColors.function },
            { text: '  }', style: codeColors.punctuation },
            { text: '', style: '' },
            { text: '  init() {', style: codeColors.function },
            { text: '    // Initialize renderer', style: codeColors.comment },
            { text: '    this.renderer = new THREE.WebGLRenderer({', style: codeColors.variable },
            { text: '      antialias: true,', style: codeColors.variable },
            { text: '      alpha: true', style: codeColors.variable },
            { text: '    });', style: codeColors.punctuation },
            { text: '', style: '' },
            { text: '    this.renderer.setSize(window.innerWidth, window.innerHeight);', style: codeColors.function },
            { text: '    this.renderer.setPixelRatio(window.devicePixelRatio);', style: codeColors.function },
            { text: '', style: '' },
            { text: '    // Create camera', style: codeColors.comment },
            { text: '    this.camera = new THREE.PerspectiveCamera(', style: codeColors.variable },
            { text: '      70,', style: codeColors.number },
            { text: '      window.innerWidth / window.innerHeight,', style: codeColors.operator },
            { text: '      0.1,', style: codeColors.number },
            { text: '      1000', style: codeColors.number },
            { text: '    );', style: codeColors.punctuation },
            { text: '    this.camera.position.set(0, 1.2, 2.0);', style: codeColors.variable },
            { text: '', style: '' },
            { text: '    // Add lights', style: codeColors.comment },
            { text: '    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);', style: codeColors.variable },
            { text: '    this.scene.add(ambientLight);', style: codeColors.function },
            { text: '', style: '' },
            { text: '    const pointLight = new THREE.PointLight(0x2563eb, 1, 10);', style: codeColors.variable },
            { text: '    pointLight.position.set(0, 2, 2);', style: codeColors.variable },
            { text: '    this.scene.add(pointLight);', style: codeColors.function },
            { text: '', style: '' },
            { text: '    // Create 3D objects', style: codeColors.comment },
            { text: '    this.createObjects();', style: codeColors.function },
            { text: '  }', style: codeColors.punctuation },
            { text: '', style: '' },
            { text: '  animate() {', style: codeColors.function },
            { text: '    requestAnimationFrame(this.animate.bind(this));', style: codeColors.function },
            { text: '    this.renderer.render(this.scene, this.camera);', style: codeColors.function },
            { text: '  }', style: codeColors.punctuation },
            { text: '}', style: codeColors.punctuation },
        ];

        // Draw code with syntax highlighting
        codeLines.forEach((line, index) => {
            if (line.text) {
                context.fillStyle = line.style;
                context.font = '14px monospace';
                // Add indentation for class methods
                const indent = line.text.startsWith('  ') ? codeAreaX + 20 : codeAreaX;
                context.fillText(line.text, indent, codeAreaY + (index + 1) * lineHeight);
            }
        });

        // Add cursor
        const cursorLine = 7;
        const cursorPos = codeAreaX + 180;
        context.fillStyle = '#FFFFFF';
        context.fillRect(cursorPos, codeAreaY + cursorLine * lineHeight - 13, 2, 18);

        // Add selection highlight
        context.fillStyle = 'rgba(38, 79, 120, 0.5)';
        context.fillRect(codeAreaX + 145, codeAreaY + 6 * lineHeight - 13, 100, 18);

        const texture = new THREE.CanvasTexture(canvas);
        texture.anisotropy = this.renderer.capabilities.getMaxAnisotropy();
        return texture;
    }

    // Animate RGB lighting and other elements - Make more mobile friendly
    animateSetup() {
        // Detect if on mobile
        const isMobile = window.innerWidth <= 768;

        // Adjust the lighting intensity based on device
        const lightingIntensity = isMobile ? 0.5 : 0.7;
        const animationSpeed = isMobile ? 0.7 : 1.0; // Slower animations on mobile to reduce GPU usage

        const animate = () => {
            if (!this.computerSetup) return;

            const time = Date.now() * 0.001 * animationSpeed;

            // Animate RGB keyboard with more subtle effect on mobile
            if (this.keyObjects && this.keyObjects.length > 0) {
                // Only animate a subset of keys on mobile to improve performance
                const animationStride = isMobile ? 3 : 1; // Animate every 3rd key on mobile

                this.keyObjects.forEach((key, index) => {
                    if (index % animationStride === 0) {
                        // Calculate color based on position and time
                        const hue = (time * 0.15 + index * 0.02) % 1;
                        const color = new THREE.Color().setHSL(hue, isMobile ? 0.6 : 0.8, 0.5);
                        key.material.color.set(color);

                        // Subtle key movement for some keys - less movement on mobile
                        if (index % 7 === 0 && !isMobile) {
                            key.position.y = 0.014 + Math.sin(time * 5 + index) * 0.002;
                        }
                    }
                });
            }

            // Animate keyboard RGB edge lighting
            if (this.keyboardEdgeLights && this.keyboardEdgeLights.length > 0) {
                this.keyboardEdgeLights.forEach((material, index) => {
                    const hue = (time * 0.2 + index * 0.1) % 1;
                    const color = new THREE.Color().setHSL(hue, 0.8, 0.5);
                    material.color.set(color);
                });
            }

            // Animate keyboard RGB light
            if (this.keyboardLight) {
                const keyboardHue = (time * 0.2) % 1;
                const keyboardColor = new THREE.Color().setHSL(keyboardHue, isMobile ? 0.6 : 0.8, 0.5);
                this.keyboardLight.color.set(keyboardColor);
                this.keyboardLight.intensity = (lightingIntensity * 0.5) + Math.sin(time * 1.5) * 0.15;
            }

            // Animate mouse RGB light
            if (this.mouseLight) {
                const mouseHue = (time * 0.1) % 1;
                const mouseColor = new THREE.Color().setHSL(mouseHue, isMobile ? 0.6 : 0.8, 0.5);
                this.mouseLight.color.set(mouseColor);
                this.mouseLight.intensity = (lightingIntensity * 0.3) + Math.sin(time * 2) * 0.15;

                // Animate additional mouse light materials if they exist
                if (this.mouseLightMaterials && this.mouseLightMaterials.length > 0) {
                    this.mouseLightMaterials.forEach(material => {
                        material.color.set(mouseColor);
                    });
                }
            }

            // Animate PC RGB lighting
            if (this.pcLightFront) {
                const pcHue = (time * 0.05) % 1;
                const pcColor = new THREE.Color().setHSL(pcHue, isMobile ? 0.6 : 0.8, 0.5);
                this.pcLightFront.color.set(pcColor);
                this.pcLightFront.intensity = (lightingIntensity * 0.7) + Math.sin(time * 1.2) * 0.2;

                // Animate fan LEDs
                if (this.fans && this.fans.length > 0) {
                    this.fans.forEach((fan, index) => {
                        const fanHue = (pcHue + index * 0.1) % 1;
                        const fanColor = new THREE.Color().setHSL(fanHue, isMobile ? 0.6 : 0.8, 0.5);
                        fan.color.set(fanColor);
                    });
                }
            }

            // Animate monitor LED based on power state
            if (this.monitorLed) {
                if (this.monitorOn) {
                    this.monitorLed.material.color.set(0x00ff00); // Green when on
                } else {
                    // Blink red slowly when off
                    const blink = Math.sin(time * 0.5) > 0 ? 0xff0000 : 0x330000;
                    this.monitorLed.material.color.set(blink);
                }
            }

            requestAnimationFrame(animate);
        };

        animate();
    }

    setupEventListeners() {
        // Handle window resize
        window.addEventListener('resize', () => {
            this.camera.aspect = window.innerWidth / window.innerHeight;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(window.innerWidth, window.innerHeight);
        });

        // Store raycaster for interaction
        this.raycaster = new THREE.Raycaster();
        this.currentIntersected = null;

        // Mouse move event for interactive elements
        document.addEventListener('mousemove', (event) => {
            // Get mouse position relative to container
            const rect = this.renderer.domElement.getBoundingClientRect();
            this.mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
            this.mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

            // Check for intersections
            this.checkIntersections();
        });

        // Add touch support for mobile
        this.renderer.domElement.addEventListener('touchstart', (event) => {
            event.preventDefault(); // Prevent scrolling when touching the canvas

            // Get touch position relative to container
            const rect = this.renderer.domElement.getBoundingClientRect();
            const touch = event.touches[0];
            this.mouse.x = ((touch.clientX - rect.left) / rect.width) * 2 - 1;
            this.mouse.y = -((touch.clientY - rect.top) / rect.height) * 2 + 1;

            // Handle the touch as a click
            this.handleInteraction();
        }, { passive: false });

        // Add touch move support
        this.renderer.domElement.addEventListener('touchmove', (event) => {
            event.preventDefault(); // Prevent scrolling when touching the canvas

            // Get touch position relative to container
            const rect = this.renderer.domElement.getBoundingClientRect();
            const touch = event.touches[0];
            this.mouse.x = ((touch.clientX - rect.left) / rect.width) * 2 - 1;
            this.mouse.y = -((touch.clientY - rect.top) / rect.height) * 2 + 1;

            // Check for intersections for hover effects
            this.checkIntersections();
        }, { passive: false });

        // Add click interaction
        this.renderer.domElement.addEventListener('click', () => {
            this.handleInteraction();
        });
    }

    // Separate the interaction handling logic for reuse
    handleInteraction() {
        // Update raycaster with current mouse position
        this.raycaster.setFromCamera(this.mouse, this.camera);

        // Check for intersections with objects
        const intersects = this.raycaster.intersectObjects(this.computerSetup.children, true);

        if (intersects.length > 0) {
            // Find the closest object that's part of PC or keyboard
            for (let i = 0; i < intersects.length; i++) {
                const object = intersects[i].object;

                // Check if we clicked on the PC
                if (this.isChildOf(object, this.pcCase)) {
                    this.toggleMonitor();
                    break;
                }

                // Check if we clicked on the keyboard
                if (this.isChildOf(object, this.keyboard)) {
                    this.toggleMonitor();
                    this.animateKeyboardPress();
                    break;
                }

                // Check if we clicked on the mouse
                if (this.isChildOf(object, this.mouse)) {
                    this.animateMouseClick();
                    break;
                }

                // Check if we clicked on the chair
                if (this.isChildOf(object, this.chair)) {
                    this.animateChairSpin();
                    break;
                }
            }
        }
    }

    // Helper to check if an object is a child of a parent
    isChildOf(child, parent) {
        let current = child;
        while (current) {
            if (current === parent) return true;
            current = current.parent;
        }
        return false;
    }

    // Check and handle intersections for hover effects
    checkIntersections() {
        // Update the picking ray with the camera and mouse position
        this.raycaster.setFromCamera(this.mouse, this.camera);

        // Calculate objects intersecting the picking ray
        const intersects = this.raycaster.intersectObjects(this.computerSetup.children, true);

        if (intersects.length > 0) {
            // Find what we're hovering over
            let hoverObject = null;
            let hoverType = null;

            for (let i = 0; i < intersects.length; i++) {
                const object = intersects[i].object;

                if (this.isChildOf(object, this.pcCase)) {
                    hoverObject = this.pcCase;
                    hoverType = 'pc';
                    break;
                } else if (this.isChildOf(object, this.keyboard)) {
                    hoverObject = this.keyboard;
                    hoverType = 'keyboard';
                    break;
                } else if (this.isChildOf(object, this.mouse)) {
                    hoverObject = this.mouse;
                    hoverType = 'mouse';
                    break;
                } else if (this.isChildOf(object, this.monitor)) {
                    hoverObject = this.monitor;
                    hoverType = 'monitor';
                    break;
                } else if (this.isChildOf(object, this.chair)) {
                    hoverObject = this.chair;
                    hoverType = 'chair';
                    break;
                }
            }

            if (hoverObject && hoverObject !== this.currentIntersected) {
                // Reset previous intersected object
                if (this.currentIntersected) {
                    this.resetHoverEffect(this.currentIntersected);
                }

                // Set new intersected object
                this.currentIntersected = hoverObject;
                this.setHoverEffect(hoverObject, hoverType);
                document.body.style.cursor = 'pointer';
            }
        } else {
            // Reset previous intersected object if nothing is intersected
            if (this.currentIntersected) {
                this.resetHoverEffect(this.currentIntersected);
                this.currentIntersected = null;
                document.body.style.cursor = 'auto';
            }
        }
    }

    // Apply hover effect to objects
    setHoverEffect(object, type) {
        // Different hover effects based on object type
        switch (type) {
            case 'pc':
                // Highlight the PC
                gsap.to(object.position, { y: 1.02, duration: 0.3 });
                if (this.pcLightFront) {
                    gsap.to(this.pcLightFront, { intensity: 1.5, duration: 0.3 });
                }
                break;

            case 'keyboard':
                // Highlight the keyboard
                gsap.to(object.position, { y: 0.835, duration: 0.3 });
                if (this.keyboardLight) {
                    gsap.to(this.keyboardLight, { intensity: 1.0, duration: 0.3 });
                }
                break;

            case 'mouse':
                // Intensify the mouse light
                if (this.mouseLight) {
                    gsap.to(this.mouseLight, { intensity: 1.0, duration: 0.3 });
                }
                break;

            case 'monitor':
                // Highlight the monitor
                gsap.to(object.position, { y: 0.835, duration: 0.3 });
                break;

            case 'chair':
                // Highlight the chair by slightly raising it
                gsap.to(object.rotation, { z: Math.PI / 24, duration: 0.3 }); // Tilt the chair slightly
                gsap.to(object.position, { y: 0.05, duration: 0.3 }); // Raise the chair slightly
                break;
        }
    }

    // Reset hover effect
    resetHoverEffect(object) {
        // Reset based on what object it is
        if (object === this.pcCase) {
            gsap.to(object.position, { y: 0.99, duration: 0.3 });
            if (this.pcLightFront) {
                gsap.to(this.pcLightFront, { intensity: 0.8, duration: 0.3 });
            }
        } else if (object === this.keyboard) {
            gsap.to(object.position, { y: 0.825, duration: 0.3 });
            if (this.keyboardLight) {
                gsap.to(this.keyboardLight, { intensity: 0.5, duration: 0.3 });
            }
        } else if (object === this.mouse) {
            if (this.mouseLight) {
                gsap.to(this.mouseLight, { intensity: 0.5, duration: 0.3 });
            }
        } else if (object === this.monitor) {
            gsap.to(object.position, { y: 0.825, duration: 0.3 });
        } else if (object === this.chair) {
            gsap.to(object.rotation, { z: 0, duration: 0.3 }); // Reset chair tilt
            gsap.to(object.position, { y: 0, duration: 0.3 }); // Reset chair position
        }
    }

    // Toggle monitor on/off
    toggleMonitor() {
        this.monitorOn = !this.monitorOn;

        if (this.monitorOn) {
            // Turn monitor on - explicitly create a new texture each time for freshness
            this.screenOnMaterial.map = this.createCodeTexture();
            this.screenOnMaterial.needsUpdate = true;
            this.screen.material = this.screenOnMaterial;

            // Animation for turning on
            gsap.fromTo(
                this.screenOnMaterial,
                { opacity: 0 },
                { opacity: 1, duration: 0.5 }
            );

            // Add power-on glow effect
            if (!this.monitorGlow) {
                const glowGeometry = new THREE.PlaneGeometry(0.56, 0.32);
                const glowMaterial = new THREE.MeshBasicMaterial({
                    color: 0x88ccff,
                    transparent: true,
                    opacity: 0.2,
                    side: THREE.DoubleSide,
                    blending: THREE.AdditiveBlending
                });
                this.monitorGlow = new THREE.Mesh(glowGeometry, glowMaterial);
                this.monitorGlow.position.set(0, 0.3, 0.02);
                this.monitor.add(this.monitorGlow);
            } else {
                this.monitorGlow.visible = true;
            }
        } else {
            // Turn monitor off
            this.screen.material = this.screenOffMaterial;

            // Hide glow effect
            if (this.monitorGlow) {
                this.monitorGlow.visible = false;
            }

            // Add turn off animation
            gsap.to(this.screen.position, {
                z: this.screen.position.z - 0.001,
                duration: 0.05,
                yoyo: true,
                repeat: 1
            });
        }

        // Update LED
        if (this.monitorLed) {
            this.monitorLed.material.color.set(this.monitorOn ? 0x00ff00 : 0xff0000);
        }
    }

    // Animate keyboard press effect
    animateKeyboardPress() {
        // Randomly press some keys
        if (this.keyObjects && this.keyObjects.length > 0) {
            // Select random keys to animate
            const keyCount = Math.floor(Math.random() * 5) + 3;
            const selectedIndices = new Set();

            while (selectedIndices.size < keyCount) {
                selectedIndices.add(Math.floor(Math.random() * this.keyObjects.length));
            }

            // Animate the selected keys
            selectedIndices.forEach(index => {
                const key = this.keyObjects[index];
                if (!key || !key.position) return; // Skip if key doesn't exist or doesn't have position

                const originalY = key.position.y;

                gsap.timeline()
                    .to(key.position, {
                        y: originalY - 0.005, // Press down
                        duration: 0.05
                    })
                    .to(key.position, {
                        y: originalY, // Release
                        duration: 0.05
                    });

                // Flash key to bright white if it has a material
                if (key.material && key.material.color) {
                    const originalColor = key.material.color.clone();
                    gsap.timeline()
                        .to(key.material.color, {
                            r: 1, g: 1, b: 1, // Bright white
                            duration: 0.05
                        })
                        .to(key.material.color, {
                            r: originalColor.r,
                            g: originalColor.g,
                            b: originalColor.b,
                            duration: 0.1
                        });
                }
            });

            // Intensify keyboard light briefly
            if (this.keyboardLight) {
                const originalIntensity = this.keyboardLight.intensity;
                gsap.timeline()
                    .to(this.keyboardLight, {
                        intensity: 1.5,
                        duration: 0.1
                    })
                    .to(this.keyboardLight, {
                        intensity: originalIntensity,
                        duration: 0.3
                    });
            }

            // Flash keyboard edge lighting
            if (this.keyboardEdgeLights && this.keyboardEdgeLights.length > 0) {
                this.keyboardEdgeLights.forEach(material => {
                    const originalColor = material.color.clone();
                    gsap.timeline()
                        .to(material, {
                            opacity: 0.9,
                            duration: 0.1
                        })
                        .to(material, {
                            opacity: 0.5,
                            duration: 0.3
                        });
                });
            }
        }
    }

    // Animation for mouse click
    animateMouseClick() {
        if (this.mouse) {
            // Find left button and animate a click
            // Access all children to find the left button
            let leftButton = null;
            this.mouse.traverse((child) => {
                // Look for a mesh object likely to be the left button
                if (child.isMesh &&
                    child.position.x < 0 &&
                    child.position.z > 0) {
                    leftButton = child;
                }
            });

            // If we found what seems to be a left button
            if (leftButton) {
                const originalY = leftButton.position.y;
                gsap.timeline()
                    .to(leftButton.position, {
                        y: originalY - 0.003, // Press down
                        duration: 0.1
                    })
                    .to(leftButton.position, {
                        y: originalY, // Release
                        duration: 0.1
                    });
            }

            // Create visual ripple effect with light
            if (this.mouseLight) {
                const originalColor = this.mouseLight.color.clone();
                const originalIntensity = this.mouseLight.intensity;

                gsap.timeline()
                    .to(this.mouseLight, {
                        intensity: 1.5, // Bright flash
                        duration: 0.2
                    })
                    .to(this.mouseLight, {
                        intensity: originalIntensity,
                        duration: 0.5
                    });

                // Flash white then return to color
                this.mouseLight.color.set(0xffffff);
                setTimeout(() => {
                    this.mouseLight.color.set(originalColor);
                }, 200);

                // Animate additional mouse light materials
                if (this.mouseLightMaterials && this.mouseLightMaterials.length > 0) {
                    this.mouseLightMaterials.forEach(material => {
                        // Store original color and opacity
                        const origColor = material.color.clone();
                        const origOpacity = material.opacity;

                        // Flash to white with higher opacity
                        material.color.set(0xffffff);
                        material.opacity = material.opacity * 1.5;

                        // Return to original
                        setTimeout(() => {
                            material.color.copy(origColor);
                            material.opacity = origOpacity;
                        }, 200);
                    });
                }
            }

            // Turn on monitor if it's off
            if (!this.monitorOn) {
                this.toggleMonitor();
            }
        }
    }

    // Animation for chair spin
    animateChairSpin() {
        if (this.chair) {
            // Get current rotation
            const currentRotation = this.chair.rotation.y;

            // Animate a full spin with a slight bounce at the end
            gsap.timeline()
                .to(this.chair.rotation, {
                    y: currentRotation + Math.PI * 2, // One full rotation
                    duration: 1.5,
                    ease: "power2.inOut"
                })
                .to(this.chair.position, {
                    y: 0.1, // Raise slightly during spin
                    duration: 0.75,
                    yoyo: true,
                    repeat: 1,
                    ease: "power1.inOut"
                }, 0); // Start at the same time as rotation

            // For a more playful animation, also rock the chair slightly
            gsap.to(this.chair.rotation, {
                z: Math.PI / 16, // Tilt slightly
                duration: 0.3,
                yoyo: true,
                repeat: 3,
                ease: "power1.inOut"
            });
        }
    }

    animate() {
        // Log first animation frame to verify animate is running
        if (!this.animationStarted) {
            console.log('Animation loop started');
            this.animationStarted = true;
        }

        // Request next frame
        requestAnimationFrame(this.animate.bind(this));

        // Update controls
        if (this.controls) {
            this.controls.update();
        }

        // Render the scene
        if (this.renderer && this.scene && this.camera) {
            this.renderer.render(this.scene, this.camera);
        }
    }

    // Create RGB keyboard
    createRGBKeyboard() {
        const keyboardGroup = new THREE.Group();

        // Keyboard base with curved corners and better shape
        const baseWidth = 0.45;
        const baseHeight = 0.02;
        const baseDepth = 0.18;
        const cornerRadius = 0.02;

        // Create base shape with rounded corners
        const baseShape = new THREE.Shape();
        baseShape.moveTo(-baseWidth / 2 + cornerRadius, baseDepth / 2);
        baseShape.lineTo(baseWidth / 2 - cornerRadius, baseDepth / 2);
        baseShape.quadraticCurveTo(baseWidth / 2, baseDepth / 2, baseWidth / 2, baseDepth / 2 - cornerRadius);
        baseShape.lineTo(baseWidth / 2, -baseDepth / 2 + cornerRadius);
        baseShape.quadraticCurveTo(baseWidth / 2, -baseDepth / 2, baseWidth / 2 - cornerRadius, -baseDepth / 2);
        baseShape.lineTo(-baseWidth / 2 + cornerRadius, -baseDepth / 2);
        baseShape.quadraticCurveTo(-baseWidth / 2, -baseDepth / 2, -baseWidth / 2, -baseDepth / 2 + cornerRadius);
        baseShape.lineTo(-baseWidth / 2, baseDepth / 2 - cornerRadius);
        baseShape.quadraticCurveTo(-baseWidth / 2, baseDepth / 2, -baseWidth / 2 + cornerRadius, baseDepth / 2);

        const baseExtrusion = {
            steps: 1,
            depth: baseHeight,
            bevelEnabled: true,
            bevelThickness: 0.004,
            bevelSize: 0.004,
            bevelSegments: 3
        };

        const keyboardBaseGeometry = new THREE.ExtrudeGeometry(baseShape, baseExtrusion);
        const keyboardMaterial = new THREE.MeshPhongMaterial({
            color: 0x111111,
            shininess: 70
        });
        const keyboardBase = new THREE.Mesh(keyboardBaseGeometry, keyboardMaterial);
        keyboardBase.rotation.x = -Math.PI / 2;
        keyboardGroup.add(keyboardBase);

        // Add manufacturer logo
        const logoGeometry = new THREE.PlaneGeometry(0.03, 0.01);
        const logoMaterial = new THREE.MeshBasicMaterial({
            color: 0x888888,
            transparent: true,
            opacity: 0.8
        });
        const logo = new THREE.Mesh(logoGeometry, logoMaterial);
        logo.position.set(0.18, 0.013, -0.06);
        logo.rotation.x = -Math.PI / 2;
        keyboardGroup.add(logo);

        // Add RGB lighting edge
        const edgeGeometry = new THREE.PlaneGeometry(baseWidth - 0.01, 0.004);
        const edgeMaterial = new THREE.MeshBasicMaterial({
            color: 0xff0000,
            transparent: true,
            opacity: 0.5,
            side: THREE.DoubleSide
        });

        // Bottom edge
        const bottomEdge = new THREE.Mesh(edgeGeometry, edgeMaterial.clone());
        bottomEdge.position.set(0, 0.002, baseDepth / 2 - 0.002);
        keyboardGroup.add(bottomEdge);

        // Save for animation
        this.keyboardEdgeLights = [edgeMaterial];

        // Key objects for animation
        this.keyObjects = [];

        // Create key rows with improved realistic keys
        const rowCount = 5; // Add an extra row for function keys
        const keysPerRow = [14, 14, 13, 12, 8]; // More accurate keyboard layout
        const keySize = 0.025;
        const keySpacing = 0.028;
        const keyHeight = 0.01;

        // Define different key types
        const keyTypes = {
            standard: {
                width: 1,
                height: 1,
                color: 0x1a1a1a
            },
            modifier: {
                width: 1.5,
                height: 1,
                color: 0x222222
            },
            spacebar: {
                width: 6,
                height: 1,
                color: 0x222222
            },
            enter: {
                width: 2,
                height: 1,
                color: 0x222222
            },
            escape: {
                width: 1,
                height: 1,
                color: 0x333333
            },
            arrow: {
                width: 1,
                height: 1,
                color: 0x252525
            }
        };

        // Create key cap material with concave top
        const createKeyCap = (type, row, col) => {
            const keyType = keyTypes[type];
            const width = keySize * keyType.width;
            const height = keySize * keyType.height;

            // Create key group
            const keyGroup = new THREE.Group();

            // Create concave key cap with rounded top
            const keyTopShape = new THREE.Shape();
            const topRadius = width * 0.2;
            keyTopShape.moveTo(-width / 2 + topRadius, height / 2);
            keyTopShape.lineTo(width / 2 - topRadius, height / 2);
            keyTopShape.quadraticCurveTo(width / 2, height / 2, width / 2, height / 2 - topRadius);
            keyTopShape.lineTo(width / 2, -height / 2 + topRadius);
            keyTopShape.quadraticCurveTo(width / 2, -height / 2, width / 2 - topRadius, -height / 2);
            keyTopShape.lineTo(-width / 2 + topRadius, -height / 2);
            keyTopShape.quadraticCurveTo(-width / 2, -height / 2, -width / 2, -height / 2 + topRadius);
            keyTopShape.lineTo(-width / 2, height / 2 - topRadius);
            keyTopShape.quadraticCurveTo(-width / 2, height / 2, -width / 2 + topRadius, height / 2);

            // Create slightly concave extrusion for key
            const keyTopExtrusion = {
                steps: 1,
                depth: keyHeight,
                bevelEnabled: true,
                bevelThickness: 0.002,
                bevelSize: 0.003,
                bevelSegments: 3,
                curveSegments: 6
            };

            const keyTopGeometry = new THREE.ExtrudeGeometry(keyTopShape, keyTopExtrusion);
            const keyTopMaterial = new THREE.MeshPhongMaterial({
                color: keyType.color,
                shininess: 80,
                specular: 0x222222
            });

            const keyTop = new THREE.Mesh(keyTopGeometry, keyTopMaterial);
            keyTop.rotation.x = -Math.PI / 2;

            // Create slight depression on key top for concave shape
            const depressionGeometry = new THREE.SphereGeometry(width * 0.9, 16, 16, 0, Math.PI * 2, 0, Math.PI / 2);
            const depressionMaterial = new THREE.MeshPhongMaterial({
                color: keyType.color,
                shininess: 90,
                transparent: true,
                opacity: 0.4,
                side: THREE.BackSide
            });

            const depression = new THREE.Mesh(depressionGeometry, depressionMaterial);
            depression.scale.set(1, 0.2, 1);
            depression.position.set(0, keyHeight + 0.002, 0);
            depression.rotation.x = Math.PI;
            keyTop.add(depression);

            keyGroup.add(keyTop);

            // Add key to keyboard
            this.keyObjects.push(keyTop);

            return keyGroup;
        };

        // Generate layout with special keys
        const keyLayout = [
            // Row 0 (function keys)
            ['escape', 'standard', 'standard', 'standard', 'standard', 'standard', 'standard', 'standard', 'standard', 'standard', 'standard', 'standard', 'standard', 'standard'],
            // Row 1
            ['standard', 'standard', 'standard', 'standard', 'standard', 'standard', 'standard', 'standard', 'standard', 'standard', 'standard', 'standard', 'standard', 'standard'],
            // Row 2
            ['modifier', 'standard', 'standard', 'standard', 'standard', 'standard', 'standard', 'standard', 'standard', 'standard', 'standard', 'standard', 'enter'],
            // Row 3
            ['modifier', 'standard', 'standard', 'standard', 'standard', 'standard', 'standard', 'standard', 'standard', 'standard', 'standard', 'modifier'],
            // Row 4
            ['modifier', 'modifier', 'modifier', 'spacebar', 'modifier', 'modifier', 'modifier', 'modifier']
        ];

        // Generate keys based on layout
        for (let row = 0; row < rowCount; row++) {
            // Position rows with proper spacing
            const offsetZ = (row * keySpacing) - 0.05;

            // Calculate total width for centering
            let rowWidth = 0;
            for (let i = 0; i < keyLayout[row].length; i++) {
                const keyType = keyTypes[keyLayout[row][i]];
                rowWidth += keySize * keyType.width + (i > 0 ? keySpacing - keySize : 0);
            }

            let currentX = -rowWidth / 2 + keySize / 2;

            for (let i = 0; i < keyLayout[row].length; i++) {
                const keyType = keyLayout[row][i];
                const key = createKeyCap(keyType, row, i);

                const typeWidth = keyTypes[keyType].width;
                key.position.set(currentX, 0.014, offsetZ);
                keyboardGroup.add(key);

                // Update x position for next key
                currentX += keySize * typeWidth + (keySpacing - keySize);
            }
        }

        // Add indicator lights for Caps Lock etc.
        const indicatorPositions = [
            { x: 0.16, z: -0.078 },
            { x: 0.19, z: -0.078 },
            { x: 0.22, z: -0.078 }
        ];

        indicatorPositions.forEach(pos => {
            const indicatorGeometry = new THREE.CircleGeometry(0.002, 8);
            const indicatorMaterial = new THREE.MeshBasicMaterial({ color: 0x333333 });
            const indicator = new THREE.Mesh(indicatorGeometry, indicatorMaterial);
            indicator.position.set(pos.x, 0.012, pos.z);
            indicator.rotation.x = -Math.PI / 2;
            keyboardGroup.add(indicator);
        });

        // Add keyboard USB cable
        const cableCurve = new THREE.CubicBezierCurve3(
            new THREE.Vector3(0.2, 0.01, 0),              // Start at keyboard back
            new THREE.Vector3(0.2, 0, -0.05),             // First control point
            new THREE.Vector3(0.15, -0.02, -0.1),         // Second control point
            new THREE.Vector3(0.1, -0.05, -0.12)          // End at table
        );

        const cableGeometry = new THREE.TubeGeometry(
            cableCurve,
            16,       // tubular segments
            0.004,    // radius
            8,        // radial segments
            false     // closed
        );

        const cableMaterial = new THREE.MeshPhongMaterial({
            color: 0x111111,
            shininess: 20
        });

        const cable = new THREE.Mesh(cableGeometry, cableMaterial);
        keyboardGroup.add(cable);

        return keyboardGroup;
    }

    // Create computer mouse
    createComputerMouse() {
        const mouseGroup = new THREE.Group();

        // Mouse body - more ergonomic gaming mouse shape
        const mouseShape = new THREE.Shape();

        // Create asymmetric curved shape like a gaming mouse
        mouseShape.moveTo(-0.025, -0.05);
        mouseShape.quadraticCurveTo(-0.045, -0.02, -0.045, 0.01);
        mouseShape.bezierCurveTo(-0.045, 0.04, -0.04, 0.055, -0.025, 0.07);
        mouseShape.bezierCurveTo(0, 0.08, 0.025, 0.08, 0.03, 0.07);
        mouseShape.bezierCurveTo(0.045, 0.05, 0.045, 0.03, 0.045, 0.01);
        mouseShape.quadraticCurveTo(0.04, -0.035, 0.025, -0.05);
        mouseShape.quadraticCurveTo(0, -0.06, -0.025, -0.05);

        // Extrude with beveled edges
        const extrudeSettings = {
            steps: 1,
            depth: 0.025,
            bevelEnabled: true,
            bevelThickness: 0.005,
            bevelSize: 0.005,
            bevelSegments: 10
        };

        // Create gradient material for mouse body
        const mouseMaterial = new THREE.MeshPhongMaterial({
            color: 0x0f0f0f,
            shininess: 90,
            specular: 0x333333
        });

        const mouseGeometry = new THREE.ExtrudeGeometry(mouseShape, extrudeSettings);
        const mouse = new THREE.Mesh(mouseGeometry, mouseMaterial);
        mouse.rotation.x = -Math.PI / 2; // Lay flat
        mouseGroup.add(mouse);

        // Add rubber grip sides
        const gripLeftShape = new THREE.Shape();
        // Draw side grip shape
        gripLeftShape.moveTo(-0.04, -0.02);
        gripLeftShape.quadraticCurveTo(-0.042, 0.02, -0.04, 0.05);
        gripLeftShape.lineTo(-0.03, 0.06);
        gripLeftShape.quadraticCurveTo(-0.025, 0.03, -0.025, -0.015);
        gripLeftShape.quadraticCurveTo(-0.03, -0.025, -0.04, -0.02);

        // Shallow extrusion for grip
        const gripExtrusion = {
            steps: 1,
            depth: 0.005,
            bevelEnabled: true,
            bevelThickness: 0.001,
            bevelSize: 0.001,
            bevelSegments: 3
        };

        // Rubber-like material for grip
        const gripMaterial = new THREE.MeshPhongMaterial({
            color: 0x080808,
            shininess: 5
        });

        // Left grip
        const gripLeftGeometry = new THREE.ExtrudeGeometry(gripLeftShape, gripExtrusion);
        const gripLeft = new THREE.Mesh(gripLeftGeometry, gripMaterial);
        gripLeft.rotation.x = -Math.PI / 2;
        gripLeft.position.y = 0.027; // Slightly above mouse body
        mouseGroup.add(gripLeft);

        // Right grip (mirrored)
        const gripRight = gripLeft.clone();
        gripRight.scale.x = -1; // Mirror on X axis
        mouseGroup.add(gripRight);

        // Mouse buttons with proper division lines
        // Left button
        const leftButtonShape = new THREE.Shape();
        leftButtonShape.moveTo(-0.04, 0.01);
        leftButtonShape.quadraticCurveTo(-0.04, 0.04, -0.025, 0.065);
        leftButtonShape.lineTo(0, 0.07);
        leftButtonShape.lineTo(0, -0.05);
        leftButtonShape.lineTo(-0.025, -0.045);
        leftButtonShape.quadraticCurveTo(-0.035, -0.03, -0.04, 0.01);

        const buttonExtrusion = {
            steps: 1,
            depth: 0.004,
            bevelEnabled: true,
            bevelThickness: 0.001,
            bevelSize: 0.001,
            bevelSegments: 2
        };

        const buttonMaterial = new THREE.MeshPhongMaterial({
            color: 0x111111,
            shininess: 70
        });

        const leftButtonGeometry = new THREE.ExtrudeGeometry(leftButtonShape, buttonExtrusion);
        const leftButton = new THREE.Mesh(leftButtonGeometry, buttonMaterial);
        leftButton.rotation.x = -Math.PI / 2;
        leftButton.position.y = 0.028; // Slightly above mouse body
        mouseGroup.add(leftButton);

        // Right button (mirrored around center)
        const rightButtonShape = new THREE.Shape();
        rightButtonShape.moveTo(0.04, 0.01);
        rightButtonShape.quadraticCurveTo(0.04, 0.04, 0.025, 0.065);
        rightButtonShape.lineTo(0, 0.07);
        rightButtonShape.lineTo(0, -0.05);
        rightButtonShape.lineTo(0.025, -0.045);
        rightButtonShape.quadraticCurveTo(0.035, -0.03, 0.04, 0.01);

        const rightButtonGeometry = new THREE.ExtrudeGeometry(rightButtonShape, buttonExtrusion);
        const rightButton = new THREE.Mesh(rightButtonGeometry, buttonMaterial);
        rightButton.rotation.x = -Math.PI / 2;
        rightButton.position.y = 0.028; // Slightly above mouse body
        mouseGroup.add(rightButton);

        // Scroll wheel with details and texture
        const wheelRimGeometry = new THREE.TorusGeometry(0.006, 0.002, 16, 24);
        const wheelRimMaterial = new THREE.MeshPhongMaterial({
            color: 0x222222,
            shininess: 60
        });
        const wheelRim = new THREE.Mesh(wheelRimGeometry, wheelRimMaterial);
        wheelRim.rotation.x = Math.PI / 2;
        wheelRim.position.set(0, 0.032, 0.015);
        mouseGroup.add(wheelRim);

        // Create ribbed scroll wheel surface
        const wheelGeometry = new THREE.CylinderGeometry(0.006, 0.006, 0.008, 16);
        const wheelMaterial = new THREE.MeshPhongMaterial({
            color: 0x444444,
            shininess: 40,
            metalness: 0.4
        });
        const wheel = new THREE.Mesh(wheelGeometry, wheelMaterial);
        wheel.rotation.x = Math.PI / 2;
        wheel.position.set(0, 0.032, 0.015);
        mouseGroup.add(wheel);

        // Add ribbed texture to wheel
        const ribCount = 12;
        for (let i = 0; i < ribCount; i++) {
            const angle = (i / ribCount) * Math.PI * 2;
            const ribGeometry = new THREE.BoxGeometry(0.001, 0.01, 0.001);
            const ribMaterial = new THREE.MeshPhongMaterial({
                color: 0x333333
            });
            const rib = new THREE.Mesh(ribGeometry, ribMaterial);

            // Position each rib around wheel
            rib.position.set(Math.sin(angle) * 0.006, 0, Math.cos(angle) * 0.006);
            rib.rotation.y = angle;
            wheel.add(rib);
        }

        // DPI selector button
        const dpiButtonGeometry = new THREE.BoxGeometry(0.008, 0.002, 0.012);
        const dpiButtonMaterial = new THREE.MeshPhongMaterial({
            color: 0x333333
        });
        const dpiButton = new THREE.Mesh(dpiButtonGeometry, dpiButtonMaterial);
        dpiButton.position.set(0, 0.027, 0.035);
        mouseGroup.add(dpiButton);

        // Mouse logo/brand
        const logoGeometry = new THREE.PlaneGeometry(0.01, 0.005);
        const logoMaterial = new THREE.MeshBasicMaterial({
            color: 0xcccccc,
            transparent: true,
            opacity: 0.7
        });
        const logo = new THREE.Mesh(logoGeometry, logoMaterial);
        logo.rotation.x = -Math.PI / 2;
        logo.position.set(0, 0.027, -0.03);
        mouseGroup.add(logo);

        // RGB lighting for gaming mouse with glow effect
        const glowGeometry = new THREE.PlaneGeometry(0.08, 0.12);
        const glowMaterial = new THREE.MeshBasicMaterial({
            color: 0xff0000,
            transparent: true,
            opacity: 0.15,
            side: THREE.DoubleSide,
            blending: THREE.AdditiveBlending
        });
        const glow = new THREE.Mesh(glowGeometry, glowMaterial);
        glow.position.set(0, 0.001, 0.01);
        glow.rotation.x = -Math.PI / 2;
        mouseGroup.add(glow);

        // RGB lighting ring around bottom edge
        const lightRingGeometry = new THREE.RingGeometry(0.035, 0.038, 20);
        const lightRingMaterial = new THREE.MeshBasicMaterial({
            color: 0xff0000,
            transparent: true,
            opacity: 0.8,
            side: THREE.DoubleSide
        });
        const lightRing = new THREE.Mesh(lightRingGeometry, lightRingMaterial);
        lightRing.rotation.x = -Math.PI / 2;
        lightRing.position.y = 0.001;
        mouseGroup.add(lightRing);

        // RGB light inside mouse
        const mouseLight = new THREE.PointLight(0xff0000, 0.4, 0.08);
        mouseLight.position.set(0, 0.015, 0);
        mouseGroup.add(mouseLight);

        // Store materials and lights for animation
        this.mouseLight = mouseLight;
        this.mouseLightMaterials = [glowMaterial, lightRingMaterial];

        // Add mouse cable
        const cableCurve = new THREE.CubicBezierCurve3(
            new THREE.Vector3(0, 0.01, -0.05),              // Start at front
            new THREE.Vector3(0, 0, -0.1),                 // Control point
            new THREE.Vector3(-0.05, -0.03, -0.15),        // Control point
            new THREE.Vector3(-0.1, -0.05, -0.2)          // End
        );

        const cableGeometry = new THREE.TubeGeometry(
            cableCurve,
            20,       // tubular segments
            0.003,    // radius
            8,        // radial segments
            false     // closed
        );

        const cableMaterial = new THREE.MeshPhongMaterial({
            color: 0x111111,
            shininess: 20
        });

        const cable = new THREE.Mesh(cableGeometry, cableMaterial);
        mouseGroup.add(cable);

        return mouseGroup;
    }

    // Create office chair with more realistic materials
    createChair() {
        const chairGroup = new THREE.Group();

        // Materials
        const blackMaterial = new THREE.MeshStandardMaterial({
            color: 0x222222,
            roughness: 0.6,
            metalness: 0.1
        });

        const metallicMaterial = new THREE.MeshStandardMaterial({
            color: 0x888888,
            metalness: 0.8,
            roughness: 0.2
        });

        const wheelMaterial = new THREE.MeshStandardMaterial({
            color: 0x111111,
            metalness: 0.5,
            roughness: 0.7
        });

        const fabricMaterial = new THREE.MeshStandardMaterial({
            color: 0x222222,
            metalness: 0.1,
            roughness: 0.8,
            map: this.createFabricTexture()
        });

        const chromeMetalMaterial = new THREE.MeshStandardMaterial({
            color: 0xDDDDDD,
            metalness: 0.9,
            roughness: 0.1
        });

        // Create base with 6 wheels
        const baseGroup = new THREE.Group();

        // Base ring
        const baseRingGeometry = new THREE.TorusGeometry(0.2, 0.02, 16, 32);
        const baseRing = new THREE.Mesh(baseRingGeometry, metallicMaterial);
        baseRing.rotation.x = Math.PI / 2;
        baseGroup.add(baseRing);

        // Add wheels
        const wheelCount = 6;
        for (let i = 0; i < wheelCount; i++) {
            const angle = (i / wheelCount) * Math.PI * 2;
            const wheelGroup = new THREE.Group();

            // Position at edge of base ring
            wheelGroup.position.x = Math.cos(angle) * 0.22;
            wheelGroup.position.z = Math.sin(angle) * 0.22;

            // Improved connection to base with mounting hardware
            const mountGeometry = new THREE.CylinderGeometry(0.015, 0.015, 0.015, 8);
            const mount = new THREE.Mesh(mountGeometry, blackMaterial);
            mount.position.y = 0;
            wheelGroup.add(mount);

            // Caster arm with curved shape
            const casterCurve = new THREE.CatmullRomCurve3([
                new THREE.Vector3(0, 0, 0),
                new THREE.Vector3(0, -0.02, 0.01),
                new THREE.Vector3(0, -0.04, 0.02),
                new THREE.Vector3(0, -0.08, 0)
            ]);

            const casterGeometry = new THREE.TubeGeometry(casterCurve, 8, 0.008, 8, false);
            const caster = new THREE.Mesh(casterGeometry, chromeMetalMaterial);
            wheelGroup.add(caster);

            // Add swivel joint between base mount and caster arm
            const swivelJointGeometry = new THREE.SphereGeometry(0.012, 16, 16);
            const swivelJoint = new THREE.Mesh(swivelJointGeometry, metallicMaterial);
            swivelJoint.position.y = -0.01;
            wheelGroup.add(swivelJoint);

            // Add connection hardware between caster and wheel
            const wheelAxleGeometry = new THREE.CylinderGeometry(0.006, 0.006, 0.025, 8);
            const wheelAxle = new THREE.Mesh(wheelAxleGeometry, chromeMetalMaterial);
            wheelAxle.rotation.z = Math.PI / 2;
            wheelAxle.position.y = -0.08;
            wheelGroup.add(wheelAxle);

            // Improved wheel with detailed tread and hub
            const wheelHubGeometry = new THREE.CylinderGeometry(0.017, 0.017, 0.015, 16);
            const wheelHub = new THREE.Mesh(wheelHubGeometry, blackMaterial);
            wheelHub.rotation.z = Math.PI / 2;
            wheelHub.position.y = -0.08;
            wheelGroup.add(wheelHub);

            // Wheel
            const wheelGeometry = new THREE.CylinderGeometry(0.025, 0.025, 0.01, 16);
            const wheel = new THREE.Mesh(wheelGeometry, wheelMaterial);
            wheel.position.y = -0.08;
            wheel.rotation.z = Math.PI / 2;
            wheelGroup.add(wheel);

            // Add hub cap on outside of wheel
            const hubCapGeometry = new THREE.CircleGeometry(0.015, 16);
            const hubCap = new THREE.Mesh(hubCapGeometry, metallicMaterial);
            hubCap.position.set(0.006, -0.08, 0);
            hubCap.rotation.y = Math.PI / 2;
            wheelGroup.add(hubCap);

            baseGroup.add(wheelGroup);
        }

        // Chair post (pneumatic cylinder)
        const postGeometry = new THREE.CylinderGeometry(0.02, 0.02, 0.3, 12);
        const post = new THREE.Mesh(postGeometry, chromeMetalMaterial);
        post.position.y = 0.15;
        baseGroup.add(post);

        // Telescoping sleeve over post
        const sleeveGeometry = new THREE.CylinderGeometry(0.025, 0.025, 0.1, 12);
        const sleeve = new THREE.Mesh(sleeveGeometry, blackMaterial);
        sleeve.position.y = 0.23;
        baseGroup.add(sleeve);

        // Mechanism - seat attachment
        const mechanismGeometry = new THREE.BoxGeometry(0.15, 0.03, 0.15);
        const mechanism = new THREE.Mesh(mechanismGeometry, blackMaterial);
        mechanism.position.y = 0.3;
        baseGroup.add(mechanism);

        // Control lever
        const leverGeometry = new THREE.CylinderGeometry(0.005, 0.005, 0.08, 8);
        const lever = new THREE.Mesh(leverGeometry, metallicMaterial);
        lever.position.set(0.07, 0.28, 0.07);
        lever.rotation.x = Math.PI / 4;
        baseGroup.add(lever);

        // Add lever knob at the end
        const leverKnobGeometry = new THREE.SphereGeometry(0.008, 8, 8);
        const leverKnob = new THREE.Mesh(leverKnobGeometry, blackMaterial);
        leverKnob.position.set(0.11, 0.25, 0.11);
        baseGroup.add(leverKnob);

        // Seat with more ergonomic shape
        const seatShape = new THREE.Shape();
        seatShape.moveTo(-0.2, -0.2);
        seatShape.lineTo(0.2, -0.2);
        seatShape.lineTo(0.2, 0.2);
        seatShape.lineTo(-0.2, 0.2);
        seatShape.lineTo(-0.2, -0.2);

        const seatExtrudeSettings = {
            steps: 1,
            depth: 0.05,
            bevelEnabled: true,
            bevelThickness: 0.02,
            bevelSize: 0.02,
            bevelSegments: 5
        };

        const seatGeometry = new THREE.ExtrudeGeometry(seatShape, seatExtrudeSettings);
        const seat = new THREE.Mesh(seatGeometry, fabricMaterial);
        seat.position.y = 0.32;
        seat.rotation.x = -Math.PI / 2;
        baseGroup.add(seat);

        // Backrest with curved shape
        const backrestGeometry = new THREE.BoxGeometry(0.38, 0.4, 0.05);
        backrestGeometry.translate(0, 0.2, 0); // Move pivot point to bottom
        const backrest = new THREE.Mesh(backrestGeometry, fabricMaterial);
        backrest.position.set(0, 0.35, -0.2);
        backrest.rotation.x = -Math.PI / 12; // Slightly angled back
        baseGroup.add(backrest);

        // Armrests
        const armrestGeometry = new THREE.BoxGeometry(0.05, 0.03, 0.2);
        armrestGeometry.translate(0, 0, -0.1); // Center the armrest

        const leftArmrest = new THREE.Mesh(armrestGeometry, blackMaterial);
        leftArmrest.position.set(0.2, 0.4, 0);
        baseGroup.add(leftArmrest);

        const rightArmrest = new THREE.Mesh(armrestGeometry, blackMaterial);
        rightArmrest.position.set(-0.2, 0.4, 0);
        baseGroup.add(rightArmrest);

        // Rotate to face forward
        baseGroup.rotation.y = Math.PI;

        chairGroup.add(baseGroup);
        return chairGroup;
    }

    // Create a fabric texture for the chair
    createFabricTexture() {
        const canvas = document.createElement('canvas');
        canvas.width = 512;
        canvas.height = 512;
        const context = canvas.getContext('2d');

        // Base color
        context.fillStyle = '#222222';
        context.fillRect(0, 0, canvas.width, canvas.height);

        // Create fabric texture pattern
        context.strokeStyle = '#2a2a2a';
        context.lineWidth = 1;

        // Horizontal lines
        const spacing = 4;
        for (let i = 0; i < canvas.height; i += spacing) {
            context.beginPath();
            context.moveTo(0, i);
            context.lineTo(canvas.width, i);
            context.stroke();
        }

        // Vertical lines
        for (let i = 0; i < canvas.width; i += spacing) {
            context.beginPath();
            context.moveTo(i, 0);
            context.lineTo(i, canvas.height);
            context.stroke();
        }

        // Add subtle noise for realism
        const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;

        for (let i = 0; i < data.length; i += 4) {
            // Add random noise to each pixel
            const noise = Math.floor(Math.random() * 10) - 5;
            data[i] = Math.max(0, Math.min(255, data[i] + noise));     // R
            data[i + 1] = Math.max(0, Math.min(255, data[i + 1] + noise)); // G
            data[i + 2] = Math.max(0, Math.min(255, data[i + 2] + noise)); // B
        }

        context.putImageData(imageData, 0, 0);

        const texture = new THREE.CanvasTexture(canvas);
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set(10, 10);

        return texture;
    }
}

// Create scene when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Check if GSAP is loaded, if not, load it
    if (typeof gsap === 'undefined') {
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.9.1/gsap.min.js';
        script.onload = () => new CoderScene();
        document.head.appendChild(script);
    } else {
        new CoderScene();
    }
}); 