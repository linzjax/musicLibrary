const error   = require('./error');
const library = require('./models');
const print   = require('./print.js');

module.exports =  {
  // for all artists and all their albums, print the album.
  all: function() {
    if (libraryIsEmpty()) {
      return [error.emptyLibrary()];
    }

    let list = []
    for (var artist in library.artists) {
      _allByArtist(artist, list);
    }

    return list;
  },

  // only print albums by a specific artist.
  allByArtist: function(req) {
    let args = req.split('\"');
    let artist = args[1];

    if (libraryIsEmpty()) {
      return [error.emptyLibrary()]
    }

    if (library.artists[artist] === undefined) {
      return [error.unknownArtist(artist)]
    }

    let list = [];
    _allByArtist(artist, list);
    return list;
  },

  // only print unplayed albums.
  unplayed: function() {
    if (libraryIsEmpty()) {
      return [error.emptyLibrary()]
    }

    let list = [];
    for (var artist in library.artists) {
      _unplayedByArtist(artist, list);
    }
    if (list.length === 0) {
      return [error.emptyUnplayed()];
    }

    return list;
  },

  unplayedByArtist: function(req) {
    let args = req.split('\"');
    let artist = args[1];

    if (libraryIsEmpty()) {
      return [error.emptyLibrary()];
    }

    if (library.artists[artist] === undefined) {
      return [error.unknownArtist(artist)];
    }

    let list = [];
    _unplayedByArtist(artist, list);

    if (list.length === 0) {
      return [error.emptyUnplayed()];
    }
    return list;
  }
}

// for all albums associated with a specific artist, print the album.
function _allByArtist(artist) {
  for (var album of library.artists[artist].albums) {
    allList.push(print.formatAlbumAndArtist(album, artist) + " " +
                 print.hasBeenPlayed(library.albums[album].played));
  }
}

/*
function _unplayedByArtist(artist, unplayedList) {
  for (var album of library.artists[artist].albums) {
    if (!library.albums[album].played) {
      unplayedList.push(print.formatAlbumAndArtist(album, artist) + " " +
                        print.hasBeenPlayed(library.albums[album].played ));
    }
  }
  return unplayedList;
}

function libraryIsEmpty() {
  return (Object.entries(library.artists).length === 0 && library.artists.constructor === Object)
}
