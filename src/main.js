import L from 'leaflet';
import 'leaflet-draw';
import 'proj4leaflet'
import 'leaflet.chinatmsproviders';

// CSS一式を読み込んでパッケージ
import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";
import "./css/style.css";

//デフォルトアイコンパス
L.Icon.Default.imagePath = 'img/icon/';

//MIERUNE Color読み込み
var m_color = new L.tileLayer('https://tile.mierune.co.jp/mierune/{z}/{x}/{y}.png', {
    attribution: "Maptiles by <a href='http://mierune.co.jp/' target='_blank'>MIERUNE</a>, under CC BY. Data by <a href='http://osm.org/copyright' target='_blank'>OpenStreetMap</a> contributors, under ODbL."
});

// ArcGIS 卫星地图
let arcgis_satellite = new L.tileLayer('https://server.arcgisonline.com/arcgis/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}');

// Google earth
let google_satellite = new L.tileLayer('http://localhost/WeServer/wmts/1.0.0/acimage/default/mercator/{z}/{y}/{x}.jpg',{
	  maxZoom: 9
});

// 高德地图
let autonavi_satellite = L.tileLayer.chinaProvider(
    'GaoDe.Satellite.Map',
    {
        maxZoom:18,
        minZoom:5,
    }
);

// OpenStreetMap
let osm_normal = L.tileLayer.chinaProvider(
    'OSM.Normal.Map',
    {
        maxZoom:18,
        minZoom:5,
    }
);

//経緯度設定
var lat = 36.0737;
var lng = 120.4250;
const defaultCenter = [lat, lng];
const defaultZoom = 15;

//MAP読み込み
var map = L.map('map', {
    center: defaultCenter,
    zoom: defaultZoom,
    zoomControl: true,
    layers: [arcgis_satellite]
});

//背景レイヤ
var Map_BaseLayer = {
    "MIERUNE Color": m_color,
    "Google satellite": google_satellite,
    "Autonavi normal": autonavi_satellite,
    "OpenStreatMap normal": osm_normal,
    "ArcGIS satellite": arcgis_satellite
};

//レイヤ設定
L.control.layers(
    Map_BaseLayer,
    null
).addTo(map);

//スケール設定
L.control.scale({
    imperial: false,
    maxWidth: 300
}).addTo(map);

// 添加marker标注
const marker = L.marker([36.0737, 120.4250]);
marker.bindPopup("<b>中国电波传播研究所</b><br/>青大一路19号").openPopup();
marker.addTo(map);

map.setView(defaultCenter, defaultZoom);


// Initialise the FeatureGroup to store editable layers
var editableLayers = new L.FeatureGroup();
map.addLayer(editableLayers);

var MyCustomMarker = L.Icon.extend({
    options: {
        shadowUrl: 'img/icon/marker-shadow.png',
        iconUrl: 'img/icon/marker-icon.png'
    }
});
var options = {
    position: 'topleft',
    draw: {
        polyline: {
            shapeOptions: {
                color: '#f357a1',
                weight: 10
            }
        },
        polygon: {
            allowIntersection: false, // Restricts shapes to simple polygons
            drawError: {
                color: '#e1e100', // Color the shape will turn when intersects
                message: '<strong>Oh snap!<strong> you can\'t draw that!' // Message that will show when intersect
            },
            shapeOptions: {
                color: '#bada55'
            }
        },
        circle: false, // Turns off this drawing tool
        rectangle: {
            shapeOptions: {
                clickable: false
            }
        },
        marker: {
            icon: new MyCustomMarker()
        }
    },
    edit: {
        featureGroup: editableLayers, //REQUIRED!!
        remove: false
    }
};
// Initialise the draw control and pass it the FeatureGroup of editable layers
var drawControl = new L.Control.Draw(options);
map.addControl(drawControl);

map.on('draw:created', function (e) {
    const type = e.layerType;
    const layer = e.layer;
    if (type === 'marker') {
        layer.bindPopup('临时标记点');
    }
    editableLayers.addLayer(layer);
});
