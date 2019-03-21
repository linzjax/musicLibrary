const library = require('./models');
const print   = require('./print');
const error   = require('./error');

module.exports = {
  album: function(req) {
    let args = req.split('\"');
    let title = args[1];
    let artist = args[3];

    if (title === undefined || artist === undefined) {
      print.list(error.unknownRequest);
      return;
    }

    if (library.albums[title] !== undefined) {
      error.albumAlreadyExists(title, library.albums[title].artist)
      return;
    }

    // If the artist doesn't already exist in the library, add it.
    if (library.artists[artist] === undefined) {
      library.artists[artist] = new library.Artist(artist, title);
    // Otherwise, just add the album to the artist's album list.
    } else {
      library.artists[artist].albums.push(title);
    }

    library.albums[title] = new library.Album(artist, title);
    print.response("Added", print.formatAlbumAndArtist(title, artist));
  }
}
