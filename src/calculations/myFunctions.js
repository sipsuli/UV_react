
import uviWarning from '../common/uviWarning';
import northSouthEastWest from '../common/northSouthEastWest';
import solarCalculations from './solarCalculations';
import solarPositions from './solarPositions';

function myFunctions(loc) {
  
    let pos = new solarPositions(loc);
    let sol = new solarCalculations(pos, loc);

    const myResults = {
        currentSunElevation: pos.solarPositionLocal.currentSunElevation,
        maxSunElevation: pos.solarPositionLocal.maxSunElevation,
        currentSunAzimuth: pos.solarPositionLocal.currentSunAzimuth,
        azimuthNSEW: northSouthEastWest(pos.solarPositionLocal.currentSunAzimuth),
        uvIndex: sol.solarCalculations.uvIndex,
        uvIndexMax: sol.solarCalculations.uvIndexMax,
        uvIndexOverThree: sol.solarCalculations.uvIndexOverThree,
        uvIndexEnd: sol.solarCalculations.uvIndexEnd,
        uvIndexMaxAnnual: sol.solarCalculations.uvIndexMaxAnnual,
        uvIndexWarning: uviWarning(sol.solarCalculations.uvIndex),
        solarPower: sol.solarCalculations.solarPower,
        solarPowerMax: sol.solarCalculations.solarPowerMax,
        solarPowerMaxAnnual: sol.solarCalculations.solarPowerMaxAnnual,
        solarPowerAquired: sol.solarCalculations.solarPowerMaxAnnual,
        timeRize: pos.solarPositionLocal.timeRize,
        timeSunSouth: pos.solarPositionLocal.timeSunSouth,
        timeSet: pos.solarPositionLocal.timeSet,
        timeSetCivil: pos.solarPositionLocal.timeSetCivil,
        timeSetNautical: pos.solarPositionLocal.timeSetNautical,
        timeSetAstronomical: pos.solarPositionLocal.timeSetAstronomical,
        timeRizeCivil: pos.solarPositionLocal.timeRizeCivil,
        timeRizeNautical: pos.solarPositionLocal.timeRizeNautical,
        timeRizeAstronomical: pos.solarPositionLocal.timeRizeAstronomical,
        latitudePolarNight: pos.solarPositionLocal.latitudePolarNight,
        dayLength: pos.solarPositionLocal.dayLength
    };
    return myResults;
};
export default myFunctions;
