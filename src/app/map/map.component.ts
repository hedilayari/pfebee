import { AfterViewInit, Component, OnInit } from '@angular/core';
import "ol/ol.css";
import Map from "ol/Map";
import OSM from "ol/source/OSM";
import TileLayer from "ol/layer/Tile";
import View from "ol/View";
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import { fromLonLat } from 'ol/proj';
import { Icon, Style } from 'ol/style';
import { Vector as VectorLayer } from 'ol/layer';
import { Vector as VectorSource } from 'ol/source';


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements AfterViewInit {
  source: any;
  vector: VectorLayer<any>;
  map: Map;

  constructor() {
    this.source = new VectorSource();
    this.vector = new VectorLayer({
      source: this.source
    });
  
    this.map = new Map({
      layers: [
        new TileLayer({
          source: new OSM()
        }),
        this.vector // Ajouter la couche de vecteur des marqueurs à la carte
      ],
      view: new View({
        center: fromLonLat([10.05, 33.51]), // Coordonnées de Paris
        zoom: 14
      })
    });
  }
  ngAfterViewInit() {
    this.map.setTarget("map");
  
    // Créer un style pour les marqueurs
    const markerStyle = new Style({
      image: new Icon({
        anchor: [0.5, 1],
        src: 'https://img.icons8.com/color/48/000000/marker.png' // URL de l'icône du marqueur
      })
    });
  
    // Ajouter un marqueur à la source de vecteur
    const marker = new Feature({
      geometry: new Point(fromLonLat([10.05, 33.51])) // Coordonnées de Paris
    });
    marker.setStyle(markerStyle);
    this.source.addFeature(marker);
  }
  
}

