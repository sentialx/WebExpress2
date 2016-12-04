process.on('message', function (m) {
    process.send(Buffer(99999999))
});
