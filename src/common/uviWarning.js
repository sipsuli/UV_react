function uviWarning(uvIndex) {
    // varoitustekstit UVI säteilyn intensiteetin mukaan
    if (uvIndex >= 10) {
        return setUviWarning("PYSY POIS AURINGOSTA!", "rgb(153,140,255)", "Black");
    }
    if (uvIndex < 10 && uvIndex >= 9.0) {
        return setUviWarning("PYSY POIS AURINGOSTA!", "rgb(181,76,255)", "Black");
    }
    if (uvIndex >= 8.0 && uvIndex < 9.0) {
        return setUviWarning("PYSY POIS AURINGOSTA!", "rgb(255,0,153)", "Black");
    }
    if (uvIndex >= 7.0 && uvIndex < 8.0) {
        return setUviWarning("MAX 5 min AURINGOSSA!", "rgb(216,0,29)", "Red");
    }
    if (uvIndex >= 6.0 && uvIndex < 7.0) {
        return setUviWarning("MAX 15 min AURINGOSSA!", "rgb(232,44,14)", "Red");
    }
    if (uvIndex >= 5.0 && uvIndex < 6.0) {
        return setUviWarning("Varo UV säteilyä!", "rgb(248,89,0)", "Black");
    }
    if (uvIndex >= 4.0 & uvIndex < 5.0) {
        return setUviWarning("Suuri riski UV säteilystä", "rgb(248,135,0)", "Brown");
    }
    if (uvIndex >= 3.0 && uvIndex < 4.0) {
        return setUviWarning("Riski UV säteilystä", "rgb(248,182,0)", "Black");
    }
    if (uvIndex >= 2.0 && uvIndex < 3.0) {
        return setUviWarning("Pieni riski UV säteilystä", "rgb(160,206,0)", "Gold");
    }
    if (uvIndex >= 1.0 && uvIndex < 2.0) {
        return setUviWarning("Vähäinen riski UV säteilystä", "rgb(78,180,0)", "Cyan");
    }
    if (uvIndex >= 0 && uvIndex < 1.0) {
        return setUviWarning("Ei vaaraa UV säteilystä", "rgb(190,190,190)", "Blue");
    }
}

function setUviWarning(text, color, fontColor) {
    const warning = {
        backgroundColor: color,
        value: text,
        color: fontColor
    }
    return warning;
};

export default uviWarning;