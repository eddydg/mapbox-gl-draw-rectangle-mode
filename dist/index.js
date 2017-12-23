'use strict';

var DrawPolygon = {};

DrawPolygon.onSetup = function () {
  var polygon = this.newFeature({
    type: 'Feature',
    properties: {},
    geometry: {
      type: 'Polygon',
      coordinates: [[]]
    }
  });

  this.addFeature(polygon);

  var state = {
    polygon: polygon
  };

  return state;
};

DrawPolygon.clickAnywhere = function (state, e) {
  state.polygon.updateCoordinate('0.0', e.lngLat.lng, e.lngLat.lat);
  state.polygon.updateCoordinate('0.1', e.lngLat.lng, e.lngLat.lat);
  state.polygon.updateCoordinate('0.2', e.lngLat.lng, e.lngLat.lat);
  state.polygon.updateCoordinate('0.3', e.lngLat.lng, e.lngLat.lat);
  state.polygon.updateCoordinate('0.4', e.lngLat.lng, e.lngLat.lat);
};

DrawPolygon.onMouseMove = function (state, e) {
  var firstPoint = state.polygon.coordinates[0][0];
  if (!firstPoint) return;
  state.polygon.updateCoordinate('0.1', e.lngLat.lng, firstPoint[1]);
  state.polygon.updateCoordinate('0.2', e.lngLat.lng, e.lngLat.lat);
  state.polygon.updateCoordinate('0.3', firstPoint[0], e.lngLat.lat);
};

DrawPolygon.onClick = function (state, e) {
  return this.clickAnywhere(state, e);
};

DrawPolygon.toDisplayFeatures = function (state, geojson, display) {
  return display(geojson);
};