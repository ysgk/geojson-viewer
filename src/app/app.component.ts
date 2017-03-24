import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { json } from 'd3-request';
const topojson = require('topojson');

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  @ViewChild('container') container: ElementRef;

  ngOnInit() {
    const map = new google.maps.Map(this.container.nativeElement, {
      center: new google.maps.LatLng(34.5, 133.7),
      zoom: 11,
    });

    json('assets/kurashiki.topojson', (error, data: any) => {
      const features = topojson.feature(data, data.objects.kurashiki).features;
      features.forEach((feature) => {
        if (! ['332020830'].includes(feature.properties.KEY_CODE)) {
          return;
        }

        const paths = feature.geometry.coordinates.map((coordinates) => {
          return coordinates.map((coords) => {
            return {lat: coords[1], lng: coords[0]};
          });
        });

        const polygon = new google.maps.Polygon({
          map: map,
          paths: paths,
          strokeWeight: 0,
          fillOpacity: 0.6,
        });

        polygon.addListener('mouseover', () => {
          polygon.setOptions({
            fillOpacity: 0.4,
          });
        });

        polygon.addListener('mouseout', () => {
          polygon.setOptions({
            fillOpacity: 0.6,
          });
        });
      });
    });
  }
}
