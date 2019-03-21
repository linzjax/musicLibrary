const library = require('./models');
const print   = require('./print');
const error   = require('./error');

module.exports = {
  /*
    Add an album and associated artist to the library
    REQUEST FORMAT: add "Album" "Artist"
    @param String
    @returns String
  */
  album: function(req) {
    let args = req.split('\"');
    let title = args[1];
    let artist = args[3];

    if (title === undefined || artist === undefined) {
      return error.unknownRequest();
    }

    if (library.albums[title] !== undefined) {
      return error.albumAlreadyExists(title, library.albums[title].artist)
    }

    library.artists[artist] === undefined
      // If the artist doesn't already exist in the library, add it.
      ? library.artists[artist] = new library.Artist(artist, title)
      // Otherwise, just add the album to the artist's album list.
      : library.artists[artist].albums.push(title);

    library.albums[title] = new library.Album(artist, title);
    return "Added " + print.formatAlbumAndArtist(title, artist);
  }
}
