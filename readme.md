## JavaScript Graham's Scan Convex Hull Algorithm

I required a simple implementation to calculate a convex hull from a given array of x, y coordinates,
the convex hull's in js I found either were a little buggy, or required dependencies on other libraries.
This implementation just takes the x,y coordinates, no other libraries are needed.

The two examples show how to utilise with Google Maps.

View live examples:

https://dl.dropboxusercontent.com/u/26246816/graham_scan/example/gmaps_example1.html
https://dl.dropboxusercontent.com/u/26246816/graham_scan/example/gmaps_example2.html
https://dl.dropboxusercontent.com/u/26246816/graham_scan/example/gmaps_example3.html


### Testing

The source is tested with qUnit, tests executed with Google's JS Test Driver.

### Deploying

Include the source or the minified js and off you go.


### Usage

    //Create a new instance.
    var convexHull = new ConvexHullGrahamScan();

    //add points (needs to be done for each point, a foreach loop on the input array can be used.
    convexHull.addPoint(x, y);

    //getHull() returns the array of points that make up the convex hull.
    var hullPoints = convexHull.getHull();


### Sources used to create

http://www.personal.kent.edu/~rmuhamma/Compgeometry/MyCG/ConvexHull/GrahamScan/grahamScan.htm
http://en.wikipedia.org/wiki/Graham_scan

### License

MIT License