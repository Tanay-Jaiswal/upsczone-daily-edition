# India map data

`src/data/indiaMap.js` is generated. Rebuild it only if the source data or the
marker places change.

## Source

- **Dataset:** India states GeoJSON from the DataMeet India community,
  `website/docs/data/geojson/states.geojson` in https://github.com/datameet/maps
- **Licence:** CC BY 4.0. Attribution is shown in the map caption and the main README.
- **Boundary:** the outer boundary follows the official Survey of India depiction
  (Jammu & Kashmir including Gilgit-Baltistan and PoK, Aksai Chin, Arunachal Pradesh).
- **Known limitation:** the state layer predates the 2019 reorganisation, so the
  Jammu & Kashmir / Ladakh UT line is not drawn and Dadra & Nagar Haveli and
  Daman & Diu are merged here. Swap in a current Survey of India / Bhuvan state
  layer before production use.

## Rebuild

Requires `mapshaper` (`npx mapshaper@0.6`).

```sh
PROJ="+proj=lcc +lat_1=12 +lat_2=28 +lat_0=22 +lon_0=80 +datum=WGS84"
npx mapshaper@0.6 -i states.geojson name=states \
  -each 'ST_NM = (ST_NM=="Dadara & Nagar Havelli"||ST_NM=="Daman & Diu") ? "DNHDD" : ST_NM' \
  -dissolve ST_NM -proj $PROJ -simplify 1.2% keep-shapes \
  -innerlines + name=borders -dissolve target=states + name=outline \
  -o target=borders,outline format=geojson precision=10 out/
npx mapshaper@0.6 -i scripts/map/places.geojson -proj $PROJ -o out/cities.json format=geojson
node scripts/map/build-india-map.mjs out src/data/indiaMap.js
```

`places.geojson` holds the illustrative marker cities (longitude, latitude).
They are projected with the same transform so markers line up with the map.
