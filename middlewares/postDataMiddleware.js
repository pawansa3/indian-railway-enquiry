exports.validatePnr = (req, res, next) => {
    req.sanitizeBody('pnr');
    req.checkBody('pnr', 'You must enter a PNR no.').notEmpty();
    req.checkBody('pnr', 'Invalid PNR no.').custom(value => {
        return (value.length === 10) && (!isNaN(parseInt(value)));
    });
    const errors = req.validationErrors();
    if(errors) {
        req.flash('error', errors.map(err => err.msg));
        res.render('pnr-status', { flashes: req.flash(), title:'PNR Status' });
        return;
    }
    next(); // to go next middleware/ datacontroller postpnrstatus
}

exports.validateSeatFare = (req, res, next) => {
    req.sanitizeBody('train');
    req.checkBody('train', 'You must enter a train no.').notEmpty();
    req.sanitizeBody('date');
    req.checkBody('date', 'You must select a date.').notEmpty();
    req.sanitizeBody('source');
    req.checkBody('source', 'You must enter a source station.').notEmpty();
    req.sanitizeBody('dest');
    req.checkBody('dest', 'You must enter a destination station.').notEmpty();
    req.sanitizeBody('pref');
    req.checkBody('pref', 'You must enter a class.').notEmpty();
    req.sanitizeBody('quota');
    req.checkBody('quota', 'You must enter a quota.').notEmpty();

    const errors = req.validationErrors();
    if(errors) {
        req.flash('error', errors.map(err => err.msg));
        const renderfile = res.locals.currentPath.slice(1);
        res.render(renderfile, { flashes: req.flash(), title: renderfile });
        return;
    }
    next();
}


exports.validateTrainBS = (req, res, next) => {
    req.sanitizeBody('date');
    req.checkBody('date', 'You must select a date.').notEmpty();
    req.sanitizeBody('source');
    req.checkBody('source', 'You must enter a source station.').notEmpty();
    req.sanitizeBody('dest');
    req.checkBody('dest', 'You must enter a destination station.').notEmpty();

    const errors = req.validationErrors();
    if(errors) {
        req.flash('error', errors.map(err => err.msg));
        res.render('train-between-stations', { flashes: req.flash(), title: 'Train Between Stations' });
        return;
    }
    next();
}