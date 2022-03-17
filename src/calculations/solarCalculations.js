//import utils from '../common/utils';

function solarCalculations(pos, location) {

    const latitude = MathNew.deg2rad(location.latitude);
    
    //double uvIndexOverTwoRad = MathNew.deg2rad(90.0 - 55.0); //degrees in Sun elevation, UV
    const a = 2.696056;
    const b = 5.474571;
    const c = -0.09888;
    const d = 0.040392;
    let currentSunElevation = MathNew.deg2rad(pos.solarPositionLocal.currentSunElevation);
    let maxSunElevation = MathNew.deg2rad(pos.solarPositionLocal.maxSunElevation);
    let maxSunElevationAnnual;
    let epsilon = MathNew.rad2deg(pos.solarPositionTrue.epsilon);

    if (MathNew.rad2deg(latitude) < epsilon && MathNew.rad2deg(latitude) > -epsilon) {
        maxSunElevationAnnual = MathNew.deg2rad(90.);
    } else if (MathNew.rad2deg(latitude) > epsilon) {
        maxSunElevationAnnual = MathNew.deg2rad(90. - MathNew.rad2deg(latitude) + epsilon);
    } else {
        maxSunElevationAnnual = MathNew.deg2rad(90. + MathNew.rad2deg(latitude) + epsilon);
    }

    let m = 1. / (Math.cos(Math.asin(6371. / 6393. * Math.sin((Math.PI / 2 - currentSunElevation)))));
    let uvIndexLimit = MathNew.deg2rad(90.0 - 48.0); //degrees in Sun elevation, UVI > 3
    let mMax = 1. / Math.cos(Math.asin(6371. / 6393. * Math.sin((Math.PI / 2 - maxSunElevation))));
    let mMaxAnnual = 1. / Math.cos(Math.asin(6371. / 6393. * Math.sin((Math.PI / 2 - maxSunElevationAnnual))));

    // let latitude = MathNew.deg2rad(locations.latitude);
    let delta = MathNew.deg2rad(pos.solarPositionDeg.delta);

    /******** Solar UVI calculation**********/

    let uvIndex = Math.round(10 * Math.pow(Math.cos(Math.PI / 2 - currentSunElevation), a) * Math.exp(b + c * m + d * m * m) / 25.) / 10.;
    let uvIndexEnd;
    if (isNaN(uvIndex)) {
        uvIndex = 0;
    }

    let uvIndexMax = Math.round(10 * Math.pow(Math.cos(Math.PI / 2 - maxSunElevation), a) * Math.exp(b + c * mMax + d * mMax * mMax) / 25.) / 10.;
    if (isNaN(uvIndexMax)) {
        uvIndexMax = 0;
    }

    let uvIndexMaxAnnual = Math.round(10 * Math.pow(Math.cos(Math.PI / 2 - maxSunElevationAnnual), a) * Math.exp(b + c * mMaxAnnual + d * mMaxAnnual * mMaxAnnual) / 25.) / 10.;
    let uvIndexOverThree = Math.round(10 * 2 * Math.acos(-Math.tan(delta) * Math.tan(latitude) + Math.sin(uvIndexLimit) / (Math.cos(delta) * Math.cos(latitude))) / (2 * Math.PI) * 24.) / 10.;
    if (isNaN(uvIndexOverThree)) {
        uvIndexOverThree = 0;
    }
    else if (isNaN(uvIndex) || uvIndexOverThree === 0) {
        uvIndexEnd = 0;
    }
    else {
        uvIndexEnd = pos.solarPositionLocal.timeSunSouth + uvIndexOverThree / 2;
    }

    /******** Solar power calculation**********/
    // Current solar power
    let solarPower = Math.round(10 * 1350.0 * Math.sin(currentSunElevation) * Math.pow(0.78, (1 / Math.sin(currentSunElevation)))) / 10;
    if (solarPower < 0) {
        solarPower = 0;
    }

    // Maximun solar power per current day
    let solarPowerMax = Math.round(10 * 1350.0 * Math.sin(maxSunElevation) * Math.pow(0.78, (1 / Math.sin(maxSunElevation)))) / 10;
    if (solarPowerMax < 0 || isNaN(solarPowerMax)) {
        solarPowerMax = 0;
    }

    // Maximun solar power per year
    let solarPowerMaxAnnual = Math.round(10 * 1350.0 * Math.sin(maxSunElevationAnnual) * Math.pow(0.78, (1 / Math.sin(maxSunElevationAnnual)))) / 10.;

    const solarCalculations = {
        uvIndex: uvIndex,
        uvIndexMax: uvIndexMax,
        uvIndexOverThree: uvIndexOverThree,
        uvIndexEnd: uvIndexEnd,
        uvIndexMaxAnnual: uvIndexMaxAnnual,
        solarPower: solarPower,
        solarPowerMax: solarPowerMax,
        solarPowerMaxAnnual: solarPowerMaxAnnual
    }
    this.solarCalculations = solarCalculations; 
}
const MathNew = {
    deg2rad: (deg) => deg * (Math.PI) / 180,
    rad2deg: (rad) => rad * 180 / (Math.PI),
    minHour: (hour) => {
        while (hour >= 24) {
            hour = hour - 24;
        }
        while (hour < 0) {
            hour = hour + 24;
        }
        return hour;
    },
    minDegree: (min) => {
        while (min >= 360.) {
            min = min - 360.;
        }
        while (min < 0.) {
            min = min + 360.;
        }
        return min;
    },
    trueTan: (y, x) => {
        var alfa = y / x;
        alfa = Math.atan(alfa) * 180 / (Math.PI);
        //if (y >= 0 & x > 0)
        //alfa = y/x;
        if (y >= 0 & x < 0)
            alfa = alfa + 180;
        if (y < 0 & x > 0)
            alfa = alfa + 360;
        if (y < 0 & x < 0)
            alfa = alfa + 180;
        return alfa;
    },
    roundDesimal_1: (rnd) => {
        rnd = rnd * 10;
        rnd = Math.round(rnd);
        rnd = rnd / 10;
        return rnd;
    },
    trueElevation: (trueDeg) => {
        while (trueDeg > 90)
            trueDeg = 180 - trueDeg;
        while (trueDeg < -90)
            trueDeg = 180 + trueDeg;
        return trueDeg;
    }
};

export default solarCalculations;
