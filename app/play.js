const error   = require('./error.js');
const library = require('./models.js');
const print   = require('./print.js');

module.exports = {
  album: function(req) {
    let args = req.split('\"');
    let title = args[1];

    if (library.albums[title] === undefined) {
      print.list(error.unknownAlbum, title);
    } else {
      library.albums[title].played = true;
      print.response(
        "You're listening to",
        print.formatAlbum(title)
      )
    }
  }
}
