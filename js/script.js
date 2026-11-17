const HPLtable = document.querySelector("#HPLtable");
const HKItable = document.querySelector("#HKItable");
const searchHPL = document.querySelector("#searchHPL");
const searchHKI = document.querySelector("#searchHKI");

searchHPL.addEventListener("click", async function() {

    const HPLresponse = await fetch("https://rata.digitraffic.fi/api/v1/live-trains/station/HPL?arrived_trains=0&arriving_trains=0&departed_trains=0&departing_trains=9&include_nonstopping=false");
        
    const data = await HPLresponse.json();

    const HPLJunat = data.filter(train => {
        const hplDeparture = train.timeTableRows.find(
            row =>
                row.stationShortCode === "HPL" && row.type === "DEPARTURE"
        );

        const hkiArrival = train.timeTableRows.find(
            row =>
                row.stationShortCode === "HKI" && row.type === "ARRIVAL"
        );

        return hplDeparture && hkiArrival;
    });

        // juna: commuterLineID
        // raide commercialTrack
        // lähtöaika: liveEstimateTime, scheduledTime
        // saapumisaika: liveEstimateTime, scheduledTime

    const tbody = HPLtable.querySelector("tbody");

    tbody.innerHTML = "";

    for (const train of HPLJunat) {

        const HPL = train.timeTableRows.find(
            row => row.stationShortCode === "HPL" &&
            row.type === "DEPARTURE"
        );

        const HKI = train.timeTableRows.find(
            row => row.stationShortCode === "HKI" &&
            row.type === "ARRIVAL"
        );

        
        const row = tbody.insertRow();

        const lähtö = HPL.liveEstimateTime || HPL.scheduledTime;
        const raide = HPL.commercialTrack;
        const juna = train.commuterLineID;
        const saapuminen = HKI.liveEstimateTime || HPL.scheduledTime;

        const lähtöaika = new Date(lähtö);
        const saapumisaika = new Date(saapuminen);

        row.insertCell().textContent = lähtöaika.toLocaleTimeString("fi-FI", {
            hour: "2-digit",
            minute: "2-digit"
        });

        row.insertCell().textContent = raide;
        row.insertCell().textContent = juna;

        row.insertCell().textContent = saapumisaika.toLocaleTimeString("fi-FI", {
            hour: "2-digit",
            minute: "2-digit"
        });
        };
});



searchHKI.addEventListener("click", async function() {

    const HKIresponse = await fetch("https://rata.digitraffic.fi/api/v1/live-trains/station/HKI?arrived_trains=0&arriving_trains=0&departed_trains=0&departing_trains=25&include_nonstopping=false");
        
    const data = await HKIresponse.json();

    const HKIJunat = data.filter(train => {
        const hkiDeparture = train.timeTableRows.find(
            row =>
                row.stationShortCode === "HKI" && row.type === "DEPARTURE"
        );

        const myrArrival = train.timeTableRows.find(
            row =>
                row.stationShortCode === "MYR" && row.type === "ARRIVAL"
        );

        return hkiDeparture && myrArrival;
    });


    const tbody = HKItable.querySelector("tbody");

    tbody.innerHTML = "";

    for (const train of HKIJunat) {

        const HKI = train.timeTableRows.find(
            row => row.stationShortCode === "HKI" &&
            row.type === "DEPARTURE"
        );

        const MYR = train.timeTableRows.find(
            row => row.stationShortCode === "MYR" &&
            row.type === "ARRIVAL"
        );

        const row = tbody.insertRow();

        const lähtö = HKI.liveEstimateTime || HKI.scheduledTime;
        const raide = HKI.commercialTrack;
        const juna = train.commuterLineID;
        const saapuminen = MYR.liveEstimateTime || MYR.scheduledTime;

        const lähtöaika = new Date(lähtö);
        const saapumisaika = new Date(saapuminen);

        row.insertCell().textContent = lähtöaika.toLocaleTimeString("fi-FI", {
            hour: "2-digit",
            minute: "2-digit"
        });

        row.insertCell().textContent = raide;
        row.insertCell().textContent = juna;

        row.insertCell().textContent = saapumisaika.toLocaleTimeString("fi-FI", {
            hour: "2-digit",
            minute: "2-digit"
        });
        };      
});

