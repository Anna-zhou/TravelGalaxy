import * as THREE from 'https://cdn.skypack.dev/three@0.128.0';

const ranName= (length = 8) => {
  // Declare all characters
  let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

  // Pick characers randomly
  let str = '';
  for (let i = 0; i < length; i++) {
      str += chars.charAt(Math.floor(Math.random() * chars.length));
  }

  return str;

};





class Planet{
  constructor(){
    this.name = ranName(5)
    this.radius = Math.random()*10000
    this.distanceFromSun = Math.random()*1000
    this.orbitalPeriod = Math.floor(Math.random()*400+300)
    this.dayLength = Math.floor(Math.random()*40+1)
    this.minTemp =  Math.floor(Math.random()*50+1)
    this.meanTemp = Math.floor(Math.random()*30+1)
    this.maxTemp = Math.floor(Math.random()*50+30)
    this.surfacePs = Math.random()*1000
    this.surfaceGv = Math.random()*10
    this.satellites = Math.floor(Math.random()*100+1)
    this.enconomy = Math.random()
    this.travel = Math.random()
    this.tech = Math.random()
    this.biz = Math.random()
  }
}

const highTecImg = ['highTecMap1.jpg','highTecMap2.jpg']
const ecoImg = ['ecoMap1.jpg','ecoMap2.jpg']
const eduImg = ['eduMap1.jpg','eduMap2.jpg']
const travelImg = ['travelMap1.jpg','travelMap2.jpeg']

window.onload=()=>{
  //3D
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight / 2, 0.1, 1000);

  const renderer = new THREE.WebGLRenderer();
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap; // default THREE.PCFShadowMap
  renderer.setSize(window.innerWidth, window.innerHeight * 2);

  // document.body.appendChild( renderer.domElement );
  let texture = new THREE.TextureLoader().load('./images/moon.png');


  const geometry = new THREE.SphereGeometry(3, 32, 32);
  const material = new THREE.MeshPhysicalMaterial({ color: '0xffcc00', map: texture,emissiveMap:texture });
  const sphere = new THREE.Mesh(geometry, material);
  sphere.castShadow = true;
  sphere.receiveShadow = true; //default

  

  const pointLight = new THREE.PointLight(0xff764d, 2, 100);
  pointLight.castShadow = true;
  const envLight = new THREE.AmbientLight(0xffffff, 0.4, 100);
  pointLight.position.set(10, 13, 13);
  
  scene.add(pointLight, envLight);
  scene.add(sphere);

  camera.position.z = 30;

  const animate = function () {
    requestAnimationFrame(animate);
    //自转速度
    sphere.rotation.y += 0.01 / 10;
    
    renderer.render(scene, camera);
  };

  animate();

  //3D end


    const App = {
        data() {
          return {
            title: 'TravelGalaxy',
            currentPage:'indexPage',
            activePlanet:null,
            planets:[],
            tecCount:3,
            bizCount:3,
            eduCount:3,
            travelCount:3,
            //Main page
            stars:[
                {name:'star1',radius:100},
                {name:'star2',radius:150},
                {name:'star3',radius:300},
                {name:'star4',radius:100},
                {name:'star5',radius:150},
                {name:'star6',radius:300},
            ],
            spaceships:[
              {sp_name:'Night',path:'Wormhole'},
              {sp_name:'Life Bringer',path:'Hyperspace'},
              {sp_name:'Discovery',path:'Hyperspace'},
              {sp_name:'Angel',path:'Hyperspace'},
              {sp_name:'Phobos',path:'Wormhole'},
            ],
            //Planet page
            htPlanets:[
              {ht_name:'Lalretov'},
              {ht_name:'Nebroitov'},
              {ht_name:'Oninda'},
            ],
            bizPlanets:[
              {biz_name:'Thusars'},
              {biz_name:'Ziuzuno'},
              {biz_name:'Navis'},
            ],
            eduPlanets:[
              {edu_name:'Gaperus'},
              {edu_name:'Drebuter'},
              {edu_name:'Esion'},
            ],
            tvPlanets:[
              {tv_name:'Sivosie'},
              {tv_name:'Luinides'},
              {tv_name:'Seturn'},
            ],
          
            

            //Spaceship page
            lwSpaceships:[
              {lwship_name:'Night', des:'description'},
              {lwship_name:'Life Bringer', des:'description'},
              {lwship_name:'Discovery', des:'description'},
            ],
            hwSpaceships:[
              {hwship_name:'Angel', des:'description'},
              {hwship_name:'Phobos', des:'description'},
            ]
          }
        },
        methods:{
          clickPlanet(info){
            console.log(this.planets.indexOf(info));
            // this.activePlanet.name = info
            this.activePlanet = this.planets.indexOf(info)
            this.updatePlanet()
            
          },
          updatePlanet() {
            //调灯光强度
            pointLight.intensity = 10

            let star = this.planets[this.activePlanet]
            console.log(star);

            let colorHue 

            if(star.minTemp < 10){
              colorHue = 0.7 + Math.random()/50
            }

            material.color.setHSL(colorHue, 0.5, 1)
            material.emissive = new THREE.Color('#ffffff')
            material.emissiveIntensity = Math.min(0.5,Math.random())
    
            
            let scale = star.radius/1000
            sphere.scale.set(scale, scale, scale)
            sphere.matrixWorldNeedsUpdate = true
    
            const pn = () => { return Math.random() > 0.5 ? 1 : -1 } 
            
            sphere.position.set(Math.random() * 5 * pn(), Math.random() * 3 * pn(), Math.random() * 3 * pn())
    
            let kindParamter = { 
              tec:star.tech,
              eco:star.enconomy,
              travel:star.travel,
              biz:star.biz
            }

            let kinds =[]
            for(let kind in kindParamter){
              kinds.push([kind,kindParamter[kind]])
            }

            kinds.sort((a,b)=>{ return a[1] - b[1]})
            console.log(kinds);

            let starKind = kinds[0][0]
            console.log(starKind);
            let imgName 
            if(starKind === 'tec'){
              imgName = highTecImg[Math.floor(Math.random()*highTecImg.length)]
            }else if(starKind === 'eco'){
              imgName = ecoImg[Math.floor(Math.random()*ecoImg.length)]
            }else if(starKind === 'travel'){
              imgName = travelImg[Math.floor(Math.random()*travelImg.length)]
            }else if(starKind === 'biz'){
              imgName = eduImg[Math.floor(Math.random()*eduImg.length)]
            }

            console.log(imgName);
            texture.image = new THREE.ImageLoader().load(`./images/${imgName}`)
            texture.needsUpdate = true
            console.log(texture);
          },
          //planet icon img
          whatKind(star,type){
            console.log(star);
            let kindParamter = { 
              tec:star.tech,
              eco:star.enconomy,
              travel:star.travel,
              biz:star.biz
            }

            let kinds =[]
            for(let kind in kindParamter){
              kinds.push([kind,kindParamter[kind]])
            }

            kinds.sort((a,b)=>{ return a[1] - b[1]})
            console.log(kinds);

            let starKind = kinds[0][0]
            console.log(starKind);

            let src
            switch (starKind) {
              case 'tec':
                src = './Images/high-tech-icon@4x.png'
                break;
            
              case 'eco':
                src = './Images/edu-icon@4x.png'
                break;
              
              case 'biz':
                src = './Images/business-icon@4x.png'
                break;

              case 'travel':
                src = './Images/travel-icon@4x.png'
                break;
            }

            if(type == 'kind'){
              return starKind
            }else{
              return src
            }           
          },

          
        },
        mounted() {
          for(let i = 0; i <100;i++){
            this.planets.push(new Planet())
          }

          document.querySelector('#planet-detail').appendChild(renderer.domElement);


        }
      }
      
    Vue.createApp(App).mount('#app')

    


}

