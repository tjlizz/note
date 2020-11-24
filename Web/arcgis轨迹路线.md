 ## 轨迹路线

``` javascript
 let paths = [
     [
         [-111.3, 52.68],
         [-98, 49.5],
         [-93.94, 29.89]
     ]
 ]
 let polyline = {
     type: "polyline",
     paths: paths,
     spatialReference: view.spatialReference //设置坐标系
 };
 let lineSymbol = {
     type: "simple-line",
     color: [226, 119, 40],
     width: 4
 };
 let polylineGraphic = new Graphic({
     geometry: polyline,
     symbol: lineSymbol,
     spatialReference: view.spatialReference //设置坐标系
 });
 view.graphics.addMany([polylineGraphic]);
```

## 新增点

``` javascript
let point = {
    type: "point",  
    longitude: -49.97,
    latitude: 41.73,
    spatialReference: view.spatialReference //设置坐标系
};
let markerSymbol = {
    type: "simple-marker",  
    color: [226, 119, 40],
    outline: {
        color: [255, 255, 255],
        width: 2
    }
};
let pointGraphic = new Graphic({
    geometry: point,
    symbol: markerSymbol,
    spatialReference: view.spatialReference //设置坐标系
});
 view.graphics.addMany([pointGraphic]);
```
