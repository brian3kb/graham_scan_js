# _JavaScript Graham's Scan Convex Hull Algorithm_

_I required a simple implementation to calculate a convex hull from a given array of x, y coordinates,
the convex hull's in js I found either were a little buggy, or required dependencies on other libraries.
This implementation just takes the x,y coordinates, no other libraries are needed._

_The two examples show how to utilise with Google Maps._

## Project Setup

_How do I, as a developer, start working on the project?_

1. _What dependencies does it have (where are they expressed) and how do I install them?_
2. _How can I see the project working before I change anything?_

## Testing

_The source is tested with qUnit, tests executed with Google's JS Test Driver._

## Deploying

_Include the source or the minified js and off you go._


## Usage

> //Create a new instance.
> var convexHull = new ConvexHullGrahamScan();
>
> //add points (needs to be done for each point, a foreach loop on the input array can be used.
> convexHull.addPoint(x, y);
>
> //getHull() returns the array of points that make up the convex hull.
> var hullPoints = convexHull.getHull();


## Sources used to create

http://www.personal.kent.edu/~rmuhamma/Compgeometry/MyCG/ConvexHull/GrahamScan/grahamScan.htm
http://en.wikipedia.org/wiki/Graham_scan

## License

_MIT License_