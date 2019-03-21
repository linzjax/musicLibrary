const error   = require('./error.js');
const library = require('./models.js');
const print   = require('./print.js');

module.exports = {
  /*
    "Plays" an album from the library and updates played to true.
    REQUEST FORMAT: play "Album"
    @param String
    @returns String
  */
  album: function(req) {
    let args = req.split('\"');
    let title = args[1];

    if (library.albums[title] === undefined) {
      return error.unknownAlbum(title);
    } else {
      library.albums[title].played = true;
      return "You're listening to " + print.formatAlbum(title);
    }
  }
}
