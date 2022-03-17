// import utils from '../common/utils';

function solarPositions(location) {

    const longitude = Number(location.longitude);
    const latitude = MathNew.deg2rad(location.latitude);

    let stellarCalendar = {
        year: location.date.getFullYear(),
        month: location.date.getMonth() + 1,
        date: location.date.getDate(),
        hour: location.date.getHours(),
        minute: location.date.getMinutes(),
        timeZone: location.date.getTimezoneOffset() / 60, // in hours
        get julian() {
            return 367 * this.year - (7 * (this.year + (this.month + 9) / 12)) / 4 - (3 * ((this.year + (this.month - 9) / 7) / 100 + 1)) / 4 + 275 * this.month / 9 + this.date + 1721029;
        },
        get T() {
            return (this.julian - 2451545.) * 0.000027378507871321;
        },
        get T_current() {
            return (this.julian - 0.5 + this.hour / 24. + this.minute / 1440. - 2451545.) * 0.000027378507871321;
        },
        get currentDate() {
            return this.year + "-0" + this.month + "-" + this.date;
        },
        get startDate() {
            return this.year + "-01-01";
        },
        get endDate() {
            return this.year + "-12-31";
        }
    }

    let T = stellarCalendar.T;
    let stellarTimeDeg = {
        time: MathNew.minDegree((24110.54841 + 8640184.812866 * T + 0.093104 * (T * T) - 0.0000062 * (T * T * T)) / 3600. * 15.),
        get noon() {
            return MathNew.minDegree(this.time + 1.002737908 * (stellarCalendar.timeZone) * 15. + longitude);
        },
        get local() {
            return MathNew.minDegree(this.noon + (1.002737908 * (stellarCalendar.hour + stellarCalendar.minute / 60.) * 15.));
        }
    }

    //alustetaan maan epsilon ja auringon x, y, z koordinaatit

    let Lo = 280.46646 + 36000.76983 * T + 0.0003032 * T * T;
    let M = 357.52911 + 35999.05029 * T - 0.0001537 * T * T;

    const solarPositionTrue = {
        epsilon: MathNew.deg2rad(23 + 26. / 60. + 21.448 / 3600 - 46.815 / 3600 * T - 0.00059 / 3600 * T * T + 0.001813 * T * T * T),
        Lo: MathNew.deg2rad(MathNew.minDegree(Lo)),
        M: MathNew.deg2rad(MathNew.minDegree(M)),
        get C() {
            return MathNew.deg2rad((1.914602 - 0.004817 * T - 0.000014 * T * T) * Math.sin(this.M) + (0.019993 - 0.000101 * T) * Math.sin(2 * this.M) + 0.000289 * Math.sin(3 * this.M));
        },
        get x() {
            return Math.cos(this.Lo + this.C);
        },
        get y() {
            return Math.cos(this.epsilon) * Math.sin(this.Lo + this.C);
        }
    }
    this.solarPositionTrue = solarPositionTrue;

    const solarPositionDeg = {
        //Ohessa olevilla laskukaavoilla lasketaan auringon paikka taivaalla syötetyillä parametrin arvoilla. Lasku toimii kaikkialla maapallolla.
        // "alfa" ja "delta" ilmoittavat auringon paikan taivaalla asteina 
        alfa: MathNew.trueTan(solarPositionTrue.y, solarPositionTrue.x),
        delta: MathNew.rad2deg(Math.asin(Math.sin(solarPositionTrue.epsilon) * Math.sin(solarPositionTrue.Lo + solarPositionTrue.C)))
    }
    this.solarPositionDeg = solarPositionDeg;

    let alfa = MathNew.deg2rad(solarPositionDeg.alfa);
    let delta = MathNew.deg2rad(solarPositionDeg.delta);
    // let latitude = MathNew.deg2rad(latitude);

    let hourAzimuth = MathNew.deg2rad(stellarTimeDeg.local - solarPositionDeg.alfa);
    let solarPositionAzimuth = {
        //atsimuutti x ja y komponentit
        Ay: Math.sin(hourAzimuth) * Math.cos(delta),
        Ax: Math.cos(hourAzimuth) * Math.cos(delta) * Math.sin(latitude) - Math.sin(delta) * Math.cos(latitude)
    }

    const horizon = MathNew.deg2rad(-0.83); // Aurinko laskee horisonttiin
    const visible = MathNew.deg2rad(-6.); // Auringon lasku "porvarillinen hämärä"
    const nocturnal = MathNew.deg2rad(-12.); // Auringon lasku "nauttinen hämärä"
    const night = MathNew.deg2rad(-18.); // Auringonlasku astronominen hämärä (täydellinen pimeys)

    const solarPositionLocal = {
        currentSunAzimuth: Math.round(10 * MathNew.minDegree(MathNew.trueTan(solarPositionAzimuth.Ay, solarPositionAzimuth.Ax) + 180.)) / 10,
        currentSunElevation: Math.round(10 * MathNew.rad2deg(Math.asin(Math.sin(delta) * Math.sin(latitude) + Math.cos(hourAzimuth) * Math.cos(delta) * Math.cos(latitude)))) / 10,
        maxSunElevation: Math.round(10 * MathNew.trueElevation(90.0 + MathNew.rad2deg(delta) - MathNew.rad2deg(latitude))) / 10,
        //korkeimmillaan, eli etelässä
        timeSunSouth: MathNew.minDegree(MathNew.rad2deg(alfa) - stellarTimeDeg.noon) * 24. / 360.,
        //kaamoksen leveyspiiri
        latitudePolarNight: Math.round(10 * (90.0 + MathNew.rad2deg(delta))) / 10.,

        //Auringon nousu
        get timeRize() {
            return MathNew.minHour(this.timeSunSouth - MathNew.rad2deg(Math.acos(Math.sin(horizon) / (Math.cos(delta) * Math.cos(latitude)) - Math.tan(delta) * Math.tan(latitude))) * 24. / 360.);
        },
        //Auringon lasku
        get timeSet() {
            return MathNew.minHour(this.timeSunSouth + MathNew.rad2deg(Math.acos(Math.sin(horizon) / (Math.cos(delta) * Math.cos(latitude)) - Math.tan(delta) * Math.tan(latitude))) * 24. / 360.);
        },
        //Set time for visible lumination
        get timeSetCivil() {
            return MathNew.minHour(this.timeSunSouth + MathNew.rad2deg(Math.acos(Math.sin(visible) / (Math.cos(delta) * Math.cos(latitude)) - Math.tan(delta) * Math.tan(latitude))) * 24. / 360.);
        },
        //Set time for nocturnal lumination
        get timeSetNautical() {
            return MathNew.minHour(this.timeSunSouth + MathNew.rad2deg(Math.acos(Math.sin(nocturnal) / (Math.cos(delta) * Math.cos(latitude)) - Math.tan(delta) * Math.tan(latitude))) * 24. / 360.);
        },
        //Set time for total darkness
        get timeSetAstronomical() {
            return MathNew.minHour(this.timeSunSouth + MathNew.rad2deg(Math.acos(Math.sin(night) / (Math.cos(delta) * Math.cos(latitude)) - Math.tan(delta) * Math.tan(latitude))) * 24. / 360.);
        },
        //Set time for visible lumination
        get timeRizeCivil() {
            return MathNew.minHour(this.timeSunSouth - MathNew.rad2deg(Math.acos(Math.sin(visible) / (Math.cos(delta) * Math.cos(latitude)) - Math.tan(delta) * Math.tan(latitude))) * 24. / 360.);
        },
        //Set time for nocturnal lumination
        get timeRizeNautical() {
            return MathNew.minHour(this.timeSunSouth - MathNew.rad2deg(Math.acos(Math.sin(nocturnal) / (Math.cos(delta) * Math.cos(latitude)) - Math.tan(delta) * Math.tan(latitude))) * 24. / 360.);
        },
        //Set time for total darkness
        get timeRizeAstronomical() {
            return MathNew.minHour(this.timeSunSouth - MathNew.rad2deg(Math.acos(Math.sin(night) / (Math.cos(delta) * Math.cos(latitude)) - Math.tan(delta) * Math.tan(latitude))) * 24. / 360.);
        },
        //Lenth of day
        get dayLength() {
            return this.timeSet - this.timeRize;
        }
    }
    this.solarPositionLocal = solarPositionLocal;
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

export default solarPositions;