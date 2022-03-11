import React from "react";

export const timeParser = (time) => {
    const editTime = time.split(" ");
    const editTimeAMPM = editTime[1];
    let editTimeTime = editTime[0];
    if (editTimeAMPM === "PM") {
        let hourMinArr = editTimeTime.split(":");
        const hour = parseInt(hourMinArr[0]) + 12;
        hourMinArr[0] = hour;
        editTimeTime = hourMinArr.join(":");
    }
    return editTimeTime;
}

