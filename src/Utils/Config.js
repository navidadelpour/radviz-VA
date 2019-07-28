// function to generate config for radviz diagram
const getConfig = ({
  useRepulsion, drawLinks, dotSize, width,
  selector, dimensions, colorAccessor
}) => {

  return {
    zoomFactor: 1,
    margin: 100,
    
    size: width,
    dotRadius: dotSize,
    useRepulsion: useRepulsion,
    drawLinks: drawLinks,
    
    el: selector,
    dimensions: dimensions,
    colorAccessor: (d) => { return d[colorAccessor]; },

    tooltipFormatter: (d) => {
      return (
        tooltip(d, dimensions, colorAccessor)
      )
    }
  }
}

// tooltip html
const tooltip = (data, dimensions, colorAccessor) => `
  <div class="ui bottom left popup transition visible" style="right: auto; position: absolute; will-change: transform; top: 0px; left: 0px;">
    <h1 class="ui header">${data[colorAccessor]}</h1>
    <table class="ui celled collapsing very basic compact table">
      <thead class="">
        <tr class="">
          <th class="">Attribute</th>
          <th class="">Value</th>
        </tr>
      </thead>
      ${dimensions.map((db) => (
        `<tr class="">
          <td class=""><b>${db}</b></td>
          <td class="">${data[db]}</td>
        </tr>`
      ))}
      
    </table>
  </div>`


export default getConfig;
