let limit = 20 * 1,
    duration = 1000,
    now = new Date(Date.now() - duration),
    maxValue = [100, 100, 0, 0, 0, 0, 0];

let width = $('#lineGraph').width(),
    height = 100;

let groups = [{
        attention: {
            value: 0,
            color: 'rgba(255, 255, 255, 0.5)',
            data: d3.range(limit).map(function() {
                return 0
            })
        },
        meditation: {
            value: 0,
            color: 'rgba(255, 255, 255, 1)',
            data: d3.range(limit).map(function() {
                return 0
            })
        }
    }, {
        blink: {
            value: 0,
            color: 'rgba(255, 255, 255, 1)',
            data: d3.range(limit).map(function() {
                return 0
            })
        }
    }, {
        alphaLow: {
            value: 0,
            color: 'rgba(255, 255, 255, 0.5)',
            data: d3.range(limit).map(function() {
                return 0
            })
        },
        alphaHigh: {
            value: 0,
            color: 'rgba(255, 255, 255, 1)',
            data: d3.range(limit).map(function() {
                return 0
            })
        }
    },
    {
        betaLow: {
            value: 0,
            color: 'rgba(255, 255, 255, 0.5)',
            data: d3.range(limit).map(function() {
                return 0
            })
        },
        betaHigh: {
            value: 0,
            color: 'rgba(255, 255, 255, 1)',
            data: d3.range(limit).map(function() {
                return 0
            })
        }
    },
    {
        gammaLow: {
            value: 0,
            color: 'rgba(255, 255, 255, 0.5)',
            data: d3.range(limit).map(function() {
                return 0
            })
        },
        gammaHigh: {
            value: 0,
            color: 'rgba(255, 255, 255, 1)',
            data: d3.range(limit).map(function() {
                return 0
            })
        }
    },
    {
        delta: {
            value: 0,
            color: 'rgba(255, 255, 255, 0.5)',
            data: d3.range(limit).map(function() {
                return 0
            })
        },
        theta: {
            value: 0,
            color: 'rgba(255, 255, 255, 1)',
            data: d3.range(limit).map(function() {
                return 0
            })
        }
    }, {
        rawEEG: {
            value: 0,
            color: 'rgba(255, 255, 255, 1)',
            data: d3.range(limit).map(function() {
                return 0
            })
        }
    }
];


$('.graph').each((i, el) => {

    let x = d3.scaleLinear().domain([now - (limit - 2), now - duration]).range([0, width]); // scaling function for horozontal axis
    let y = d3.scaleLinear().domain([0, maxValue[i]]).range([height, 0]); // scaling frunction for verticle axis


    let line = d3.line()
        .curve(d3.curveLinear)
        .x(function(d, i) {
            return x(now - (limit - 1 - i) * duration)
        })
        .y(function(d) {
            return y(d)
        });

    let svg = d3.select(el).append('svg')
        .attr('class', 'chart')
        .attr('width', width)
        .attr('height', height)

    let paths = svg.append('g')

    for (let name in groups[i]) {
        let group = groups[i][name]
        group.path = paths.append('path')
            .data([group.data])
            .attr('class', name + ' group')
            .style('stroke', group.color)
    }

    function tick() {
        now = new Date()

        $('.graph:nth-child(' + (i + 1) + ')>i').text(maxValue[i]+" < MAX");

        for (let name in groups[i]) {
            let group = groups[i][name];
            group.data.push((brainSignal[name] == undefined) ? 0 : brainSignal[name]);
            group.path.attr('d', line);
            if (maxValue[i] < brainSignal[name]) {
                maxValue[i] = brainSignal[name];
                y.domain([0, maxValue[i]]);
            }
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
        for (let name in groups[i]) {
            let group = groups[i][name];
            group.data.shift()
        }
    }

    tick()
});