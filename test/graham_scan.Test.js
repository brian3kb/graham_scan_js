module('Point methods');

test('Add a single new point',2 , function() {
    var testGSHull = new ConvexHullGrahamScan();

    testGSHull.addPoint(11, 50);
    console.log(testGSHull.anchorPoint);
    console.log(new testGSHull.Point(11, 50));
    equal(testGSHull.anchorPoint, new testGSHull.Point(11, 50),
        'Tests a point has been added to the points array correctly.');
    testGSHull.addPoint(10, 50);
    equal(testGSHull.anchorPoint, new testGSHull.Point(10, 50),
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
                                   {'y' : '48.1', 'x' : '-11.1'},
                                   {'y' : '-48.1', 'x' : '11.1'}),
        false,
        'Check if last point added results in a concave.');
});


module('hull scan');

test('Test handling less than 4 points.',1, function(){
    var expectedHull = [{'y' : '48.1', 'x' : '11.1'},
        {'y' : '48.8', 'x' : '11.3'},
        {'y' : '48.7833', 'x' : '11.2333'}];
    var testGSHull = new ConvexHullGrahamScan();
    testGSHull.anchorPoint = {'y' : '48.1', 'x' : '11.1'};
    testGSHull.points = [{'y' : '48.1', 'x' : '11.1'},
                         {'y' : '48.8', 'x' : '11.3'},
                         {'y' : '48.7833', 'x' : '11.2333'}];

    equal(testGSHull.getHull(), expectedHull, 'Check same array is returned.');
});

test('Test handling 4 points including a concave point.',1, function(){
    var expectedHull = [{"y":211.41796875,"x":29.2265625},{"y":214.66796875,"x":53.6015625},{"y":223.25,"x":30}];
    var testGSHull = new ConvexHullGrahamScan();
    testGSHull.anchorPoint = {'y' : 223.25, 'x' : 30};
    testGSHull.points = [{'y' : 223.25, 'x' : 30},
        {'y' : 214.66796875, 'x' : 53.6015625},
        {'y' : 213.79296875, 'x' : 38.6015625},
        {'y' : 211.41796875, 'x' : 29.2265625}];

    equal(testGSHull.getHull(), expectedHull, 'Check output hull is as expected (4 points inc 1 concave).');
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
        {'y' : '50.15791323550770611', 'x' : '31.146087475586'},
        {'y' : '50.74029471119741', 'x' : '31.146087475586'},
        {'y' : '50.74029471119741', 'x' : '29.900512524414125'}
    ];

    equal(testGSHull.getHull(), expectedHull, 'Check output hull is as expected.');
});

test('that collinear points sharing the same polar angle are removed from resultant hull.',1, function(){
    var expectedHull = [
        {'y':-5,'x':-5},
        {'y':-5,'x':5},
        {'y':5,'x':5},
        {'y':5,'x':-5}
    ];
    var testGSHull = new ConvexHullGrahamScan();
    testGSHull.anchorPoint = {'y':-5,'x':-5};
    testGSHull.points = [
        {'y' : '2', 'x' : '2'},
        {'y' : '-2', 'x' : '2'},
        {'y' : '-2', 'x' : '-2'},
        {'y' : '2', 'x' : '-2'},
        {'y' : '3', 'x' : '3'},
        {'y' : '-3', 'x' : '3'},
        {'y' : '-3', 'x' : '-3'},
        {'y' : '3', 'x' : '-3'},
        {'y' : '4', 'x' : '4'},
        {'y' : '-4', 'x' : '4'},
        {'y' : '-4', 'x' : '-4'},
        {'y' : '4', 'x' : '-4'},
        {'y' : '5', 'x' : '5'},
        {'y' : '-5', 'x' : '5'},
        {'y' : '-5', 'x' : '-5'},
        {'y' : '5', 'x' : '-5'}
    ];

    equal(testGSHull.getHull(), expectedHull, 'Check output hull is as expected.');
});

test('hull culculation for a larger set of bigger numbers.', 1, function() {
    var points = [
        {'x': 466, 'y': 231},{'x': 469, 'y': 228},{'x': 472, 'y': 226},{'x': 476, 'y': 223},{'x': 479, 'y': 221},
        {'x': 483, 'y': 219},{'x': 486, 'y': 216},{'x': 489, 'y': 214},{'x': 492, 'y': 211},{'x': 495, 'y': 209},
        {'x': 499, 'y': 207},{'x': 503, 'y': 205},{'x': 506, 'y': 203},{'x': 510, 'y': 201},{'x': 513, 'y': 200},
        {'x': 517, 'y': 199},{'x': 521, 'y': 197},{'x': 525, 'y': 196},{'x': 529, 'y': 194},{'x': 532, 'y': 193},
        {'x': 536, 'y': 191},{'x': 540, 'y': 190},{'x': 544, 'y': 189},{'x': 548, 'y': 188},{'x': 552, 'y': 187},
        {'x': 556, 'y': 187},{'x': 563, 'y': 185},{'x': 567, 'y': 184},{'x': 571, 'y': 184},{'x': 575, 'y': 183},
        {'x': 579, 'y': 183},{'x': 583, 'y': 183},{'x': 587, 'y': 183},{'x': 591, 'y': 183},{'x': 595, 'y': 184},
        {'x': 599, 'y': 185},{'x': 602, 'y': 187},{'x': 606, 'y': 189},{'x': 610, 'y': 191},{'x': 613, 'y': 193},
        {'x': 617, 'y': 195},{'x': 620, 'y': 198},{'x': 623, 'y': 200},{'x': 627, 'y': 202},{'x': 629, 'y': 205},
        {'x': 633, 'y': 207},{'x': 636, 'y': 210},{'x': 639, 'y': 213},{'x': 642, 'y': 215},{'x': 647, 'y': 219},
        {'x': 650, 'y': 222},{'x': 653, 'y': 225},{'x': 656, 'y': 228},{'x': 658, 'y': 231},{'x': 661, 'y': 234},
        {'x': 663, 'y': 237},{'x': 666, 'y': 240},{'x': 667, 'y': 244},{'x': 669, 'y': 248},{'x': 671, 'y': 251},
        {'x': 673, 'y': 252},{'x': 674, 'y': 256},{'x': 675, 'y': 258}
    ];

    var expectedHull = [
        {'x': 575, 'y': 183},{'x': 587, 'y': 183},{'x': 591, 'y': 183},{'x': 599, 'y': 185},{'x': 610, 'y': 191},
        {'x': 617, 'y': 195},{'x': 627, 'y': 202},{'x': 633, 'y': 207},{'x': 647, 'y': 219},{'x': 656, 'y': 228},
        {'x': 666, 'y': 240},{'x': 673, 'y': 252},{'x': 675, 'y': 258},{'x': 466, 'y': 231},{'x': 469, 'y': 228},
        {'x': 492, 'y': 211},{'x': 495, 'y': 209},{'x': 506, 'y': 203},{'x': 510, 'y': 201},{'x': 536, 'y': 191},
        {'x': 552, 'y': 187},{'x': 567, 'y': 184}
    ];

    var testGSHull = new ConvexHullGrahamScan();

    points.forEach( function(p){ testGSHull.addPoint(p['x'], p['y']); } );

    equal(testGSHull.getHull(), expectedHull, 'Check output hull is as expected.');
});
