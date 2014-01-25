module('Point methods');

test('Add a single new point',2 , function() {
    var testGSHull = new ConvexHullGrahamScan();

    testGSHull.addPoint(11, 50);
    console.log(testGSHull.points[0]);
    console.log(new testGSHull.Point(11, 50));
    equal(testGSHull.points[0], new testGSHull.Point(11, 50),
        'Tests a point has been added to the points array correctly.');
    testGSHull.addPoint(10, 50);
    equal(testGSHull.points[0], new testGSHull.Point(10, 50),
        'Tests that same y value then checks x value for comparison.');
});

test('Sort points',2, function(){
    var samplePoints = [
        {'y' : '48.8', 'x' : '11.3'},
        {'y' : '48.8167', 'x' : '11.3667'},
        {'y' : '48.1', 'x' : '11.1'},
        {'y' : '48.9', 'x' : '11.7'},
        {'y' : '48.7833', 'x' : '11.2333'}];

    var sortedPoints = [
        {'y' : '48.1', 'x' : '11.1'},
        {'y' : '48.7833', 'x' : '11.2333'},
        {'y' : '48.8', 'x' : '11.3'},
        {'y' : '48.8167', 'x' : '11.3667'},
        {'y' : '48.9', 'x' : '11.7'}];

    var testGSHull = new ConvexHullGrahamScan();
    testGSHull.points = samplePoints;
    testGSHull.anchorPoint = {'x' : 11.1, 'y' : 49.8};

    testGSHull._sortPoints();
    equal(testGSHull.points, sortedPoints,
        'Tests a collection of points is correctly sorted.');

    testGSHull.points = [{'x':0,'y':0},{'x':0,'y':0}];
    testGSHull._sortPoints();
    ok(testGSHull.points, 'Test handling points with zero values.');
});

test('Find polar angle outputs a correct calculation',1, function(){
    var testGSHull = new ConvexHullGrahamScan();

    equal(testGSHull._findPolarAngle({'x': 11.1, 'y': 48.1}, {'x': 11.3 ,'y': 48.8}), 434.0546040990765,
        'Tests the polar angle calculation method is correct.');
});

test('Polar angle point comparison check.',3, function(){
    var testGSHull = new ConvexHullGrahamScan();

    ok(testGSHull._checkPoints( {'y' : '48.1', 'x' : '11.1'},
                                {'y' : '48.7833', 'x' : '11.2333'},
                                {'y' : '48.8', 'x' : '11.3'}),
       'Check if last point added results in a concave.');

    equal(testGSHull._checkPoints( {'y' : '48.1', 'x' : '11.1'},
                                   {'y' : '48.7833', 'x' : '12.2333'},
                                   {'y' : '48.8', 'x' : '11.3'}),
        false,
        'Check if last point added results in a concave.');

    equal(testGSHull._checkPoints( {'y' : '48.1', 'x' : '11.1'},
                                   {'y' : '48.1', 'x' : '11.1'},
                                   {'y' : '48.1', 'x' : '11.1'}),
        false,
        'Check if last point added results in a concave.');
});


module('hull scan');

test('Test handling less than 4 points.',1, function(){
    var testGSHull = new ConvexHullGrahamScan();
    testGSHull.anchorPoint = {'y' : '48.1', 'x' : '11.1'};
    testGSHull.points = [{'y' : '48.1', 'x' : '11.1'},
                        {'y' : '48.7833', 'x' : '11.2333'},
                        {'y' : '48.8', 'x' : '11.3'}];

    equal(testGSHull.getHull(), testGSHull.points, 'Check same array is returned.');
});

test('Test hull calculation.',1,function(){
    var expectedHull = [
        {'y':48.7833,'x':11.2333},
        {'y':48.8,'x':11.3},
        {'y':48.8167,'x':11.3667},
        {'y':48.8333,'x':11.4167},
        {'y':48.872829,'x':11.373385},
        {'y':49,'x':11.2167},
        {'y':48.893175,'x':10.990565},
        {'y':48.86946,'x':11.00602},
        {'y':48.8,'x':11.1}
    ];
    var testGSHull = new ConvexHullGrahamScan();
    testGSHull.anchorPoint = {'y':48.7833,'x':11.2333};
    testGSHull.points = [
        {'y':48.7833,'x':11.2333},
        {'y':48.8,'x':11.3},
        {'y':48.8167,'x':11.3667},
        {'y':48.8333,'x':11.4167},
        {'y':48.8167,'x':11.3167},
        {'y':48.872829,'x':11.373385},
        {'y':48.85,'x':11.3167},
        {'y':48.9167,'x':11.3},
        {'y':48.8,'x':11.2333},
        {'y':49,'x':11.2167},
        {'y':48.95,'x':11.2},
        {'y':48.8333,'x':11.2167},
        {'y':48.88636,'x':11.198945},
        {'y':48.890609,'x':11.184313},
        {'y':48.9,'x':11.1},
        {'y':48.8667,'x':11.0667},
        {'y':48.893175,'x':10.990565},
        {'y':48.8833,'x':11},
        {'y':48.86946,'x':11.00602},
        {'y':48.8,'x':11.1}
    ];

    equal(testGSHull.getHull(), expectedHull, 'Check output hull is as expected.');
});

test('Test handling 4 points rectangular.',1, function(){
    var expectedHull = [
        {'y':50.157913235507706,'x':29.900512524414125},
        {'y':50.157913235507706,'x':31.146087475586},
        {'y':50.74029471119741,'x':31.146087475586},
        {'y':50.74029471119741,'x':29.900512524414125}
    ];
    var testGSHull = new ConvexHullGrahamScan();
    testGSHull.anchorPoint = {'y':50.157913235507706,'x':29.900512524414125};
    testGSHull.points = [
        {'y' : '50.157913235507706', 'x' : '29.900512524414125'},
        {'y' : '50.74029471119741', 'x' : '31.146087475586'},
        {'y' : '50.74029471119741', 'x' : '29.900512524414125'},
        {'y' : '50.15791323550770611', 'x' : '31.146087475586'}
    ];

    equal(testGSHull.getHull(), expectedHull, 'Check output hull is as expected.');
});