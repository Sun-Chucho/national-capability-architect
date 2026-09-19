const engagements={
  GB:{name:'United Kingdom',type:'Corporate & platform base',region:'Europe',materials:'Corporate, smart-city and institutional architecture',lat:51.507,lng:-0.128},
  MA:{name:'Morocco',type:'Country programme material',region:'North Africa',materials:'SMR programme and national laboratory ecosystem',lat:31.792,lng:-7.093},
  ET:{name:'Ethiopia',type:'Country programme material',region:'East Africa',materials:'Sovereign nuclear programme architecture',lat:9.145,lng:40.489},
  UG:{name:'Uganda',type:'Country programme material',region:'East Africa',materials:'Sovereign nuclear doctrine and SMR programme',lat:1.373,lng:32.29},
  CD:{name:'Democratic Republic of the Congo',type:'Country programme material',region:'Central Africa',materials:'SMR options programme and energy-system context',lat:-4.039,lng:21.759},
  PH:{name:'Philippines',type:'Country programme material',region:'Southeast Asia',materials:'SMR presentation and bilingual engagement documents',lat:12.88,lng:121.774},
  LA:{name:'Laos',type:'Country programme material',region:'Southeast Asia',materials:'SMR introductory programme presentation',lat:19.856,lng:102.495},
  SV:{name:'El Salvador',type:'Country programme material',region:'Central America',materials:'SMR programme engagement documents',lat:13.794,lng:-88.897}
};
const map=L.map('world-map',{minZoom:2,maxZoom:7,worldCopyJump:true,zoomControl:true}).setView([20,12],2);map.createPane('engagementPane');map.getPane('engagementPane').style.zIndex=460;L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{attribution:'&copy; OpenStreetMap contributors',maxZoom:19}).addTo(map);
const panel={name:document.querySelector('[data-country]'),type:document.querySelector('[data-type]'),region:document.querySelector('[data-region]'),materials:document.querySelector('[data-materials]')};
function select(d){panel.name.textContent=d.name;panel.type.textContent=d.type;panel.region.textContent=d.region;panel.materials.textContent=d.materials;map.flyTo([d.lat,d.lng],Math.max(map.getZoom(),4),{duration:.8})}
Object.entries(engagements).forEach(([code,d])=>{const marker=L.circleMarker([d.lat,d.lng],{radius:7,color:'#f0c0a3',weight:1,fillColor:'#c6784c',fillOpacity:.9,className:'engagement-marker',pane:'engagementPane'}).addTo(map);marker.bindTooltip(d.name,{direction:'top'});marker.on('click',()=>select(d))});
fetch('https://cdn.jsdelivr.net/gh/johan/world.geo.json@master/countries.geo.json').then(r=>r.json()).then(data=>L.geoJSON(data,{style:f=>({color:'rgba(255,255,255,.16)',weight:.6,fillColor:engagements[f.id]?'#c6784c':'#17303b',fillOpacity:engagements[f.id]?.35:.12}),onEachFeature:(f,l)=>{if(engagements[f.id]){l.bindTooltip(engagements[f.id].name);l.on('click',()=>select(engagements[f.id]))}}}).addTo(map)).catch(()=>{});
