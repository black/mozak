let limit = 60 * 1,
    duration = 500,
    now = new Date(Date.now() - duration)

let width = 400,
    height = 100

let groups = {
    alphaLow: {
        value: 0,
        color: 'orange',
        data: d3.range(limit).map(function() {
            return 0
        })
    },
    alphaHigh: {
        value: 0,
        color: 'green',
        data: d3.range(limit).map(function() {
            return 0
        })
    },
    betaLow: {
        value: 0,
        color: 'grey',
        data: d3.range(limit).map(function() {
            return 0
        })
    },
    betaHigh: {
        value: 0,
        color: 'orange',
        data: d3.range(limit).map(function() {
            return 0
        })
    },
    gammaLow: {
        value: 0,
        color: 'green',
        data: d3.range(limit).map(function() {
            return 0
        })
    },
    gammaHigh: {
        value: 0,
        color: 'grey',
        data: d3.range(limit).map(function() {
            return 0
        })
    },
    delta: {
        value: 0,
        color: 'orange',
        data: d3.range(limit).map(function() {
            return 0
        })
    },
    theta: {
        value: 0,
        color: 'green',
        data: d3.range(limit).map(function() {
            return 0
        })
    }
}


let x = d3.scaleLinear().domain([now - (limit - 2), now - duration]).range([0, width]); // scaling function for horozontal axis
let y = d3.scaleLinear().domain([0, 1000000]).range([height, 0]); // scaling frunction for verticle axis


let line = d3.line()
    .curve(d3.curveLinear)
    .x(function(d, i) {
        return x(now - (limit - 1 - i) * duration)
    })
    .y(function(d) {
        return y(d)
    })

let svg = d3.select('.graph').append('svg')
    .attr('class', 'chart')
    .attr('width', width)
    .attr('height', height + 50)

let paths = svg.append('g')

for (let name in groups) {
    let group = groups[name]
    group.path = paths.append('path')
        .data([group.data])
        .attr('class', name + ' group')
        .style('stroke', group.color)
}

function tick() {
    now = new Date()

    for (let name in groups) {
        console.log(brainSignal[name]);
        let group = groups[name];
        group.data.push((brainSignal[name] == undefined) ? 0 : brainSignal[name]);
        group.path.attr('d', line);
    }

    // Shift domain
    x.domain([now - (limit - 2) * duration, now - duration])

    paths.attr('transform', null)
        .transition()
        .duration(duration)
        .ease(d3.easeLinear)
        .attr('transform', 'translate(' + x(now - (limit - 1) * duration) + ')')
        .on('end', tick)

    // Remove oldest data point from each group
    for (let name in groups) {
        let group = groups[name]
        group.data.shift()
    }
}

tick()