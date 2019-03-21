const error   = require('./error');
const library = require('./models');
const print   = require('./print.js');

module.exports =  {
  // for all artists and all their albums, print the album.
  all: function() {
    if (libraryIsEmpty()) {
      print.list(error.emptyLibrary);
      return;
    }

    for (var artist in library.artists) {
      _allByArtist(artist);
    }
  },

  // only print albums by a specific artist.
  allByArtist: function(req) {
    let args = req.split('\"');
    let artist = args[1];

    if (libraryIsEmpty()) {
      print.list(error.emptyLibrary);
      return;
    }

    if (library.artists[artist] === undefined) {
      print.list(error.unknownArtist, artist);
      return;
    }

    _allByArtist(artist);
  },

  // only print unplayed albums.
  unplayed: function() {
    if (libraryIsEmpty()) {
      print.list(error.emptyLibrary);
      return
    }

    var emptyList = true;
    for (var artist in library.artists) {
      emptyList = _unplayedByArtist(artist, emptyList);
    }
    if (emptyList) {
      print.list(error.emptyUnplayed);
    }
  },

  unplayedByArtist: function(req) {
    let args = req.split('\"');
    let artist = args[1];

    if (libraryIsEmpty()) {
      print.list(error.emptyLibrary);
      return
    }

    if (library.artists[artist] === undefined) {
      print.list(error.unknownArtist, artist);
      return;
    }

    var emptyList = true;
    emptyList = _unplayedByArtist(artist, emptyList);

    if (emptyList) {
      print.list(error.emptyUnplayed);
    }
  }
}

// for all albums associated with a specific artist, print the album.
function _allByArtist(artist) {
  for (var album of library.artists[artist].albums) {
    console.log(print.formatAlbumAndArtist(album, artist),
                print.hasBeenPlayed(library.albums[album].played ))
  }
}

function _unplayedByArtist(artist, emptyList) {
  for (var album of library.artists[artist].albums) {
    if (!library.albums[album].played) {
      emptyList = false;
      console.log(print.formatAlbumAndArtist(album, artist),
      print.hasBeenPlayed(library.albums[album].played ))
    }
  }
  return emptyList;
}

function libraryIsEmpty() {
  return (Object.entries(library.artists).length === 0 && library.artists.constructor === Object)
}
