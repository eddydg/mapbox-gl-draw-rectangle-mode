const DrawPolygon = {};

DrawPolygon.onSetup = function(opts) {
  const { map } = opts;

  const polygon = this.newFeature({
    type: 'Feature',
    properties: {},
    geometry: {
      type: 'Polygon',
      coordinates: [[]]
    }
  });

  this.addFeature(polygon);

  const state = {
    map,
    polygon,
    isDragging: false
  };

  return state;
};

DrawPolygon.setInitialRectangle = function(state, { lngLat: { lng, lat }}) {
  state.polygon.updateCoordinate(`0.0`, lng, lat);
  state.polygon.updateCoordinate(`0.1`, lng, lat);
  state.polygon.updateCoordinate(`0.2`, lng, lat);
  state.polygon.updateCoordinate(`0.3`, lng, lat);
  state.polygon.updateCoordinate(`0.4`, lng, lat);
};

DrawPolygon.onDrag = function(state, e) {
  state.isDragging = true;
  
  const firstPoint = state.polygon.coordinates[0][0];
  if (!firstPoint) return;

  const { lng, lat } = e.lngLat;
  state.polygon.updateCoordinate(`0.1`, lng, firstPoint[1]);
  state.polygon.updateCoordinate(`0.2`, lng, lat);
  state.polygon.updateCoordinate(`0.3`, firstPoint[0], lat);
}

DrawPolygon.onMouseDown = function(state, e) {
   state.map.dragPan.disable();

  return this.setInitialRectangle(state, e);
}

DrawPolygon.onMouseUp = function(state, e) {
  state.isDragging = false;
  state.map.dragPan.enable();
  
  return this.changeMode('simple_select');
}

DrawRectangle.onStop = function(state) {
  if (state.polygon.isValid()) {
    state.map.fire('draw.create', {
      features: [state.polygon.toGeoJSON()]
    });
  } else {
    this.changeMode('simple_select', {}, { silent: true });
  }
};

DrawPolygon.toDisplayFeatures = function(state, geojson, display) {
  return display(geojson);
};
