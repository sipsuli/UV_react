// Metodi deg => ESNW, eli atsimuutti asteet muutetaan "selkokielelle"
function northSouthEastWest(atsimuutti) {
    let suunta = " ";
    if ((atsimuutti >= (180. - 11.25)) && (atsimuutti < (180. + 11.25))) {
        suunta = suunta + "S";
    }
    else if ((atsimuutti >= (157.5 - 11.25)) && (atsimuutti < (157.5 + 11.25))) {
        suunta = suunta + "SSE";
    }
    else if ((atsimuutti >= (135 - 11.25)) && (atsimuutti < (135 + 11.25))) {
        suunta = suunta + "SE";
    }
    else if ((atsimuutti >= (112.5 - 11.25)) && (atsimuutti < (112.5 + 11.25))) {
        suunta = suunta + "ESE";
    }
    else if ((atsimuutti >= (90 - 11.25)) && (atsimuutti < (90 + 11.25))) {
        suunta = suunta + "E";
    }
    else if ((atsimuutti >= (67.5 - 11.25)) && (atsimuutti < (67.5 + 11.25))) {
        suunta = suunta + "ENE";
    }
    else if ((atsimuutti >= (45 - 11.25)) && (atsimuutti < (45 + 11.25))) {
        suunta = suunta + "NE";
    }
    else if ((atsimuutti >= (22.5 - 11.25)) && (atsimuutti < (22.5 + 11.25))) {
        suunta = suunta + "NNE";
    }
    else if ((atsimuutti >= (360 - 11.25)) || (atsimuutti < 11.25)) {
        suunta = suunta + "N";
    }
    else if ((atsimuutti >= (337.5 - 11.25)) && (atsimuutti < (337.5 + 11.25))) {
        suunta = suunta + "NNW";
    }
    else if ((atsimuutti >= (315 - 11.25)) && (atsimuutti < (315 + 11.25))) {
        suunta = suunta + "NW";
    }
    else if ((atsimuutti >= (292.5 - 11.25)) && (atsimuutti < (292.5 + 11.25))) {
        suunta = suunta + "WNW";
    }
    else if ((atsimuutti >= (270 - 11.25)) && (atsimuutti < (270 + 11.25))) {
        suunta = suunta + "W";
    }
    else if ((atsimuutti >= (247.5 - 11.25)) && (atsimuutti < (247.5 + 11.25))) {
        suunta = suunta + "WSW";
    }
    else if ((atsimuutti >= (225 - 11.25)) && (atsimuutti < (225 + 11.25))) {
        suunta = suunta + "SW";
    }
    else if ((atsimuutti >= (202.5 - 11.25)) && (atsimuutti < (202.5 + 11.25))) {
        suunta = suunta + "SSW";
    }
    return suunta;
};

export default northSouthEastWest;