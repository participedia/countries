extent = require('geojson-extent')
geojson2svg = require('geojson2svg')
fs = require('fs')

countryData = JSON.parse(fs.readFileSync('countries.json'))

countryData.forEach(function(country) {
  console.log(country['name']['common'])
  if (country['cca3']) {
    let cca3 = country['cca3'].toLowerCase()
    console.log(cca3)
    let geo = JSON.parse(fs.readFileSync('data/' + cca3 + '.geo.json'))
    geo = extent.bboxify(geo)
    if (geo.bbox) {
      let geojson2svg_options = {
        viewportSize: {
          width: 200, // XXX this can't be the right way to do this
          height: 200
        },
        mapExtent: {
          left: geo.bbox[0],
          bottom: geo.bbox[1],
          right: geo.bbox[2],
          top: geo.bbox[3]
        }
      }
      var converter = geojson2svg(geojson2svg_options)
      let svgString = converter.convert(geo, geojson2svg_options)
      fs.writeFileSync('./outlines/'+cca3+'.svg', svgString)
      fs.writeFileSync('./outlines/'+country['name']['common']+'.svg', svgString)
    }
  }
})


// countryData = json.loads(open('countries.json').read())

// for country in countryData:
//   print country['name']['common']
//   cca3 = country['cca3'].lower()
//   open(os.path.join('.', 'data', cca3+'.geo.json')).read()
  