'use strict';

var DrawPolygon = {};

DrawPolygon.onSetup = function (opts) {
  var map = opts.map;


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
    map: map,
    polygon: polygon,
    isDragging: false
  };

  return state;
};

DrawPolygon.setInitialRectangle = function (state, _ref) {
  var _ref$lngLat = _ref.lngLat,
      lng = _ref$lngLat.lng,
      lat = _ref$lngLat.lat;

  state.polygon.updateCoordinate('0.0', lng, lat);
  state.polygon.updateCoordinate('0.1', lng, lat);
  state.polygon.updateCoordinate('0.2', lng, lat);
  state.polygon.updateCoordinate('0.3', lng, lat);
  state.polygon.updateCoordinate('0.4', lng, lat);
};

DrawPolygon.onDrag = function (state, e) {
  state.isDragging = true;

  var firstPoint = state.polygon.coordinates[0][0];
  if (!firstPoint) return;

  var _e$lngLat = e.lngLat,
      lng = _e$lngLat.lng,
      lat = _e$lngLat.lat;

  state.polygon.updateCoordinate('0.1', lng, firstPoint[1]);
  state.polygon.updateCoordinate('0.2', lng, lat);
  state.polygon.updateCoordinate('0.3', firstPoint[0], lat);
};

DrawPolygon.onMouseDown = function (state, e) {
  state.map.dragPan.disable();

  return this.setInitialRectangle(state, e);
};

DrawPolygon.onMouseUp = function (state, e) {
  state.map.dragPan.enable();
  state.isDragging = false;

  //return this.changeMode('simple_select');
};

DrawPolygon.onClick = function (state, e) {
  state.isDragging = false;
  state.polygon.setCoordinates([[]]);
};

DrawPolygon.toDisplayFeatures = function (state, geojson, display) {
  return display(geojson);
};