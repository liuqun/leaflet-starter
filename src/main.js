import L from 'leaflet';

// CSS一式を読み込んでパッケージ
import "leaflet/dist/leaflet.css";
import "./css/style.css";

//デフォルトアイコンパス
L.Icon.Default.imagePath = 'img/icon/';

//MIERUNE Color読み込み
var m_color = new L.tileLayer('https://tile.mierune.co.jp/mierune/{z}/{x}/{y}.png', {
    attribution: "Maptiles by <a href='http://mierune.co.jp/' target='_blank'>MIERUNE</a>, under CC BY. Data by <a href='http://osm.org/copyright' target='_blank'>OpenStreetMap</a> contributors, under ODbL."
});

//MIERUNE MONO読み込み
var arcgis_satellite = new L.tileLayer('https://server.arcgisonline.com/arcgis/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}');

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
