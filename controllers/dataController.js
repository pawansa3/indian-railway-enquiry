const axios = require('axios');

// home page
exports.getIndex = (req, res) => {
    res.render('index', {title:'Home'});
}
// pnr status
exports.getPnrStatus = (req, res) => {
    res.render("pnr-status", {title:'PNR Status'});
}
exports.postPnrStatus = (req, res) => {
    const pnr = req.body.pnr;
    const myapikey = process.env.API_KEY;
    const url = `http://api.railwayapi.com/v2/pnr-status/pnr/${pnr}/apikey/${myapikey}/`;
    // console.log(url);
    axios.get(url)
        .then(response => {

            if(response.data.response_code !== 200) {
                let err ='';
                res.locals.h.errors.forEach(error => {
                    if(error.errorCode === response.data.response_code){
                        return err = error.errorMsg;
                    }
                });
                req.flash('error', err);
                return res.redirect('back');
            }
            res.render("pnr-status", {data: response.data, body: req.body, title:'PNR Status'});
        })
        .catch(err => {
            req.flash('error', err.message);
            return res.redirect('back');
        }
    );
}

// fare enquiry
exports.getFareEnquiry = (req, res) => {
    res.render("fare-enquiry", {title:'Fare Enquiry'});
}
exports.postFareEnquiry = (req, res) => {
    let { train, date, source, dest, pref, quota } = req.body;
    source = source.split('-')[1];
    dest = dest.split('-')[1];
    const uf_date = new Date(date);
    const f_date = `${uf_date.getDate()}-${uf_date.getMonth()+1}-${uf_date.getFullYear()}`;
    const myapikey = process.env.API_KEY;
    const url = `https://api.railwayapi.com/v2/fare/train/${train}/source/${source}/dest/${dest}/age/18/pref/${pref}/quota/${quota}/date/${f_date}/apikey/${myapikey}/`;
    // console.log(url);
    axios.get(url)
        .then(response => {

            if(response.data.response_code !== 200) {
                let err ='';
                res.locals.h.errors.forEach(error => {
                    if(error.errorCode === response.data.response_code){
                        return err = error.errorMsg;
                    }
                });
                req.flash('error', err);
                return res.redirect('back');
            }
            res.render("fare-enquiry", { data: response.data, date: f_date, title:'Fare Enquiry'});
        })
        .catch(err => {
            req.flash('error', err.message);
            return res.redirect('back');
    });
}
// live train status
exports.getLiveTrainStatus = (req, res) => {
    res.render("live-train-status", {title:'Live Train Status'});
}

// exports.postLiveTrainStatus = (req, res) => {
//     res.render("live-train-status", {title:'Live Train Status'});
// }

// seat availability
exports.getSeatAvailability = (req, res) => {
    res.render("seat-availability", {title: 'Seat Availability'});
}

exports.postSeatAvailability = (req, res) => {
    let { train, date, source, dest, pref, quota } = req.body;
    source = req.body.source.split('-')[1];
    dest = req.body.dest.split('-')[1];
    const uf_date = new Date(date);
    const f_date = `${uf_date.getDate()}-${uf_date.getMonth()+1}-${uf_date.getFullYear()}`;
    const myapikey = process.env.API_KEY;
    const url = `https://api.railwayapi.com/v2/check-seat/train/${train}/source/${source}/dest/${dest}/date/${f_date}/pref/${pref}/quota/${quota}/apikey/${myapikey}/`;
    // console.log(url);
    axios.get(url)
        .then(response => {
            
            if(response.data.response_code !== 200) {
                let err ='';
                res.locals.h.errors.forEach(error => {
                    if(error.errorCode === response.data.response_code){
                        return err = error.errorMsg;
                    }
                });
                req.flash('error', err);
                return res.redirect('back');
            }
            res.render("seat-availability", { data: response.data, title: 'Seat Availability' });
        })
        .catch(err => {
            req.flash('error', err.message);
            return res.redirect('back');
    });
}

// Train btn stations
exports.getTrainBetweenStations = (req, res) => {
    res.render("train-between-stations", {title: 'Train Between Stations'});
}

exports.postTrainBetweenStations = (req, res) => {
    let { date, source, dest, adjDate='off' } = req.body;
    source = req.body.source.split('-')[1];
    dest = req.body.dest.split('-')[1];
    const uf_date = new Date(date);
    const f_date = `${uf_date.getDate()}-${uf_date.getMonth()+1}-${uf_date.getFullYear()}`;
    // return console.log(new Date(f_date));
    const myapikey = process.env.API_KEY;
    const url = `https://api.railwayapi.com/v2/between/source/${source}/dest/${dest}/date/${f_date}/apikey/${myapikey}/`;
    // console.log(url);
    axios.get(url)
        .then(response => {
            
            if(response.data.response_code !== 200) {
                let err ='';
                res.locals.h.errors.forEach(error => {
                    if(error.errorCode === response.data.response_code){
                        return err = error.errorMsg;
                    }
                });
                req.flash('error', err);
                return res.redirect('back');
            }
            res.render("train-between-stations", {data: response.data, title: 'Train Between Stations'});
        })
        .catch(err => {
            req.flash('error', err.message);
            return res.redirect('back');
        });
}

//search Train info
exports.searchTrain = (req, res) => {
    const myapikey = process.env.API_KEY;
    const search = req.query.term;
    if(search === undefined) return null;
    // console.log(search);
    const url = `https://api.railwayapi.com/v2/suggest-station/name/${search}/apikey/${myapikey}/`;
    // console.log(url);
    axios.get(url)
        .then(response => {
            // if(response.data.response_code !== 200)     
            // res.send(`${response.data.stations.name}-${response.data.stations.code}`);
            let fetchData = [];
            response.data.stations.forEach(station => {
                fetchData.push(
                    {
                        id: `${station.name}`,
                        label: `${station.name}-${station.code}`,
                        value: `${station.name}-${station.code}`
                    }
                );
            });

            // console.log(fetchData);
            res.send(fetchData);
        })
        .catch(err => {
            req.flash('error', err.message);
            return res.redirect('back');
        });
}