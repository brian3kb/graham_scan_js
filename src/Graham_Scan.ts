/**
 * Graham's Scan Convex Hull Algorithm
 * @desc An implementation of the Graham's Scan Convex Hull algorithm in TypeScript.
 * @author Brian Barnett, brian@3kb.co.uk, http://brianbar.net/ || http://3kb.co.uk/
 * @version 1.0.5
 */

class Point
{
    public x: number;
    public y: number;

    constructor (x: number, y: number)
    {
        this.x = x;
        this.y = y;
    }
}

class Graham_Scan
{
    public anchorPoint: Point;
    public reverse: boolean = false;
    public points: Point[] = [];

    constructor()
    {}

    public findPolarAngle (a: Point, b: Point): number
    {
        var ONE_RADIAN: number = 57.295779513082;

        //if the points are undefined, return a zero difference angle.
        var deltaX: number = (b.x - a.x);
        var deltaY: number = (b.y - a.y);

        if (deltaX === 0 && deltaY === 0)
        {
            return 0;
        }

        var angle: number = Math.atan2(deltaY, deltaX) * ONE_RADIAN;

        if (this.reverse)
        {
            if (angle <= 0)
            {
                angle += 360;
            }
        }
        else
        {
            if (angle >= 0)
            {
                angle += 360;
            }
        }

        return angle;
    }

    public addPoint (x: number, y: number): void
    {
        //Check for a new anchor
        var newAnchor: boolean =
            ( this.anchorPoint === undefined) ||
            ( this.anchorPoint.y > y ) ||
            ( this.anchorPoint.y === y && this.anchorPoint.x > x );

        if ( newAnchor )
        {
            if ( this.anchorPoint !== undefined )
            {
                this.points.push(new Point(this.anchorPoint.x, this.anchorPoint.y));
            }
            this.anchorPoint = new Point(x, y);
        }
        else
        {
            this.points.push(new Point(x, y));
        }
    }

    public sortPoints (): Point[]
    {
        return this.points.sort(function (a, b)
        {
            var polarA: number = this.findPolarAngle(this.anchorPoint, a);
            var polarB: number = this.findPolarAngle(this.anchorPoint, b);

            if (polarA < polarB)
            {
                return -1;
            }
            if (polarA > polarB)
            {
                return 1;
            }
            return 0;
        });
    }

    public checkPoints (p0, p1, p2): boolean
    {
        var difAngle: number;
        var cwAngle: number = this.findPolarAngle(p0, p1);
        var ccwAngle: number = this.findPolarAngle(p0, p2);

        if (cwAngle > ccwAngle)
        {
            difAngle = cwAngle - ccwAngle;
            return !(difAngle > 180);
        }
        else if (cwAngle < ccwAngle)
        {
            difAngle = ccwAngle - cwAngle;
            return (difAngle > 180);
        }

        return true;
    }

    public getHull (): Point[]
    {
        var hullPoints: Point[] = [];
        var points: Point[] = [];
        var pointsLength: number;

        this.reverse = this.points.every(function(point)
        {
            return (point.x < 0 && point.y < 0);
        });

        points = this.sortPoints();
        pointsLength = points.length;

        //If there are less than 3 points, joining these points creates a correct hull.
        if (pointsLength < 3)
        {
            points.unshift(this.anchorPoint);
            return points;
        }

        //move first two points to output array
        hullPoints.push(points.shift(), points.shift());

        //scan is repeated until no concave points are present.
        while (true)
        {
            var p0: Point, p1: Point, p2: Point;

            hullPoints.push(points.shift());

            p0 = hullPoints[hullPoints.length - 3];
            p1 = hullPoints[hullPoints.length - 2];
            p2 = hullPoints[hullPoints.length - 1];

            if (this.checkPoints(p0, p1, p2))
            {
                hullPoints.splice(hullPoints.length - 2, 1);
            }

            if (points.length == 0)
            {
                if (pointsLength == hullPoints.length)
                {
                    //check for duplicate anchorPoint edge-case, if not found, add the anchorpoint as the first item.
                    var ap: Point = this.anchorPoint;

                    //remove any udefined elements in the hullPoints array.
                    hullPoints = hullPoints.filter(function(p) { return !!p; });
                    if (!hullPoints.some(function(p)
                        {
                            return(p.x == ap.x && p.y == ap.y);
                        })) {
                        hullPoints.unshift(this.anchorPoint);
                    }
                    return hullPoints;
                }

                points = hullPoints;
                pointsLength = points.length;
                hullPoints = [];
                hullPoints.push(points.shift(), points.shift());
            }
        }
    }
}
