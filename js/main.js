document.addEventListener("DOMContentLoaded", async () => {
  try {
    const responsePoint = await fetch("https://raw.githubusercontent.com/nizarabdulkholiq/petacrotzay/main/geojson.json");
    const dataPoint = await responsePoint.json();
    const pointTable = document.getElementById("pointTable").getElementsByTagName("tbody")[0];
    const responsePolygon = await fetch("https://raw.githubusercontent.com/nizarabdulkholiq/petacrotzay/main/geojson.json");
    const dataPolygon = await responsePolygon.json();
    const polygonTable = document.getElementById("polygonTable").getElementsByTagName("tbody")[0];
    const responseLineString = await fetch("https://raw.githubusercontent.com/nizarabdulkholiq/petacrotzay/main/geojson.json  ");
    const dataLineString = await responseLineString.json();
    const lineStringTable = document.getElementById("polylineTable").getElementsByTagName("tbody")[0];

    // Menampilkan data pada tabel
    function displayFeatures(features, table) {
      features.forEach((feature) => {
        if (feature.geometry.type === "Point" || feature.geometry.type === "Polygon" || feature.geometry.type === "LineString") {
          const row = table.insertRow();
          row.insertCell(0).innerText = feature.properties.name;
          row.insertCell(1).innerText = JSON.stringify(feature.geometry.coordinates);
          row.insertCell(2).innerText = feature.geometry.type;
        }
      });
    }

    displayFeatures(dataPoint.features, pointTable);
    displayFeatures(dataPolygon.features, polygonTable);
    displayFeatures(dataLineString.features, lineStringTable);

    // Membuat source dan layer untuk Point, Polygon, dan LineString
    const waypointSource = new ol.source.Vector({
      url: "https://raw.githubusercontent.com/nizarabdulkholiq/petacrotzay/main/geojson.json",
      format: new ol.format.GeoJSON(),
    });

    const lineStringSource = new ol.source.Vector({
      url: "https://raw.githubusercontent.com/nizarabdulkholiq/petacrotzay/main/geojson.json",
      format: new ol.format.GeoJSON(),
    });

    const polylineSource = new ol.source.Vector({
      url: "https://raw.githubusercontent.com/nizarabdulkholiq/petacrotzay/main/geojson.json  ",
      format: new ol.format.GeoJSON(),
    });

    const waypointLayer = new ol.layer.Vector({
      source: waypointSource,
      style: new ol.style.Style({
        image: new ol.style.Circle({
          radius: 5,
          fill: new ol.style.Fill({
            color: "blue",
          }),
        }),
      }),
    });

    const lineStringLayer = new ol.layer.Vector({
      source: lineStringSource,
      style: new ol.style.Style({
        stroke: new ol.style.Stroke({
          color: "green",
          width: 2,
        }),
      }),
    });

    const polylineLayer = new ol.layer.Vector({
      source: polylineSource,
      style: new ol.style.Style({
        stroke: new ol.style.Stroke({
          color: "black",
          width: 5,
        }),
      }),
    });

    // Membuat peta dan menambahkan overlay
    const map = new ol.Map({
      target: "map",
      layers: [
        new ol.layer.Tile({
          source: new ol.source.OSM(),
        }),
        waypointLayer,
        lineStringLayer,
        polylineLayer,
      ],
      view: new ol.View({
        center: ol.proj.fromLonLat([107.44703413413947, -6.557482588365662]),
        zoom: 16 - 1,
      }),
    });

    const overlay = new ol.Overlay({
      element: document.getElementById("popup"),
      autoPan: true,
      autoPanAnimation: {
        duration: 250,
      },
    });
    map.addOverlay(overlay);

    // Menampilkan informasi saat klik pada fitur peta
    map.on("click", function (event) {
      const feature = map.forEachFeatureAtPixel(event.pixel, function (feature) {
        return feature;
      });

      if (feature && feature.getProperties().name) {
        const name = feature.getProperties().name;
        const coordinates = feature.getGeometry().getCoordinates();
        const type = feature.getGeometry().getType();

        const content = `<strong>${name}</strong><br>Coordinates: ${coordinates}<br>Type: ${type}`;

        overlay.getElement().innerHTML = content;
        overlay.setPosition(coordinates);
      } else {
        overlay.setPosition(undefined);
      }
    });

    lineStringLayer.getSource().on("click", function (event) {
      const feature = map.forEachFeatureAtPixel(event.pixel, function (feature) {
        return feature;
      });

      if (feature) {
        const name = feature.getProperties().name;
        const coordinates = feature.getGeometry().getCoordinates();
        const type = feature.getGeometry().getType();

        const content = `<strong>${name}</strong><br>Coordinates: ${coordinates}<br>Type: ${type}`;

        overlay.getElement().innerHTML = content;
        overlay.setPosition(coordinates);
      } else {
        overlay.setPosition(undefined);
      }
    });

    polylineLayer.getSource().on("click", function (event) {
      const feature = map.forEachFeatureAtPixel(event.pixel, function (feature) {
        return feature;
      });

      if (feature) {
        const name = feature.getProperties().name;
        const coordinates = feature.getGeometry().getCoordinates();
        const type = feature.getGeometry().getType();

        const content = `<strong>${name}</strong><br>Coordinates: ${coordinates}<br>Type: ${type}`;

        overlay.getElement().innerHTML = content;
        overlay.setPosition(coordinates);
      } else {
        overlay.setPosition(undefined);
      }
    });

    // Menambahkan marker baru saat klik di peta
    const addMarkerButton = document.getElementById("addMarkerButton");
    addMarkerButton.addEventListener("click", function () {
      const markerName = document.getElementById("markerName").value;
      const coordinate = map.getView().getCenter();
      if (markerName) {
        const newFeature = new ol.Feature({
          geometry: new ol.geom.Point(coordinate),
        });

        newFeature.setProperties({
          name: markerName,
        });

        waypointSource.addFeature(newFeature);
      }
    });
  } catch (error) {
    console.error("Terjadi kesalahan:", error);
  }
});
// Menambahkan marker baru saat klik di peta
map.on("click", function (event) {
  const markerName = document.getElementById("markerName").value;
  const coordinate = event.coordinate;

  if (markerName) {
    const newFeature = new ol.Feature({
      geometry: new ol.geom.Point(coordinate),
    });

    newFeature.setProperties({
      name: markerName,
    });

    newMarkerSource.addFeature(newFeature);
  }
});
