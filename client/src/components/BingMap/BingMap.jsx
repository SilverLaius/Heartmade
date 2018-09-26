import React, { Component } from "react";
import mapboxgl from "mapbox-gl";
import "./BingMap.css";

// https://www.mapbox.com/help/custom-markers-gl-js/
mapboxgl.accessToken =
  "pk.eyJ1Ijoiam9yZ2VuNSIsImEiOiJjam02OHNuNmcxajBrM3JvMjB6Zm8weGY2In0.oU03KiSXf49PNaeVFXIEAA";

class BingMap extends Component {
  constructor() {
    super();
    this.state = {
      geojson: {
        type: "FeatureCollection",
        features: [
          {
            type: "Feature",
            geometry: {
              type: "Point",
              coordinates: [26.71451, 58.3783]
            },
            properties: {
              title: "Mapbox",
              description: "Washington, D.C."
            }
          }
        ]
      }
    };
  }

  componentDidMount() {
    const map = new mapboxgl.Map({
      container: "map",
      style: "mapbox://styles/mapbox/streets-v9",
      center: [26.7147, 58.3783],
      zoom: 17
    });
    this.state.geojson.features.forEach(marker => {
      new mapboxgl.Marker(this.mapMarker)
        .setLngLat(marker.geometry.coordinates)
        .addTo(map);
    });
  }

  mapMarker = () => <div className="marker" />;

  render() {
    return (
      <div className="mapContainer">
        <div id="map" />
      </div>
    );
  }
}

export default BingMap;
