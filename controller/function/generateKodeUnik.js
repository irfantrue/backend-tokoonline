const sprintf = require(`sprintf-js`).sprintf;

const generateKodeUnik = (lastData,jenisTable) => {                
        if (jenisTable === 1) {
            if (!lastData.length) {

                urutan = 1;

                return `PRD` + sprintf(`%04s`,urutan);
            }
            else {

                urutan = lastData[0].kode_prd.substr(3,4);

                urutan = parseInt(urutan);

                urutan += 1;

                return `PRD` + sprintf(`%04s`,urutan);
            }
        }
    
        else if (jenisTable == 2) {
            if (!lastData.length) {

                urutan = 1;

                return `KTR` + sprintf(`%04s`,urutan);
            }
            else {

                urutan = lastData[0].kode_ktr.substr(3,4);

                urutan = parseInt(urutan);

                urutan += 1;

                return `KTR` + sprintf(`%04s`,urutan);
            }
        }
        
        else if (jenisTable == 3) {
            if (!lastData.length) {

                urutan = 1;

                let currentDate = new Date();

                let cDay = currentDate.getDate();

                let cMonth = currentDate.getMonth() + 1;

                let cYear = currentDate.getFullYear();

                return `ODR` + sprintf(`%02s`,cMonth) + sprintf(`%02s`,cDay) + cYear + sprintf(`%04s`,urutan);
            }
            else {
                urutan = lastData[0].kode_odr.substr(11,4);

                urutan = parseInt(urutan);

                urutan += 1;

                let currentDate = new Date();

                let cDay = currentDate.getDate();

                let cMonth = currentDate.getMonth() + 1;

                let cYear = currentDate.getFullYear();

                return `ODR` + sprintf(`%02s`,cMonth) + sprintf(`%02s`,cDay) + cYear + sprintf(`%04s`,urutan);
            }
        }
    
        else if (jenisTable == 4) {
            if (!lastData.length) {

                urutan = 1;

                let currentDate = new Date();

                let cDay = currentDate.getDate();

                let cMonth = currentDate.getMonth() + 1;

                let cYear = currentDate.getFullYear();

                return `PBY` + sprintf(`%02s`,cMonth) + sprintf(`%02s`,cDay) + cYear + sprintf(`%04s`,urutan);
            }
            else {

                urutan = lastData[0].kode_pby.substr(11,4);

                urutan = parseInt(urutan);

                urutan += 1;

                let currentDate = new Date();

                let cDay = currentDate.getDate();

                let cMonth = currentDate.getMonth() + 1;

                let cYear = currentDate.getFullYear();

                return `PBY` + sprintf(`%02s`,cMonth) + sprintf(`%02s`,cDay) + cYear + sprintf(`%04s`,urutan);
            }
        }
};

module.exports = generateKodeUnik;