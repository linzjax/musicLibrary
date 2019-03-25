const library = require('./models');
const error   = require('./error');
const print   = require('./print.js');

module.exports =  {
  /*
    Return a list of all artists and all their albums
    REQUEST FORMAT: show all
    @returns [String]
  */
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

  /*
    Return a list of all albums by a specified artist
    REQUEST FORMAT: show all by "Artist"
    @param String
    @returns [String]
  */
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

  /*
    Return a list of all unplayed albums and their artists
    REQUEST FORMAT: show unplayed
    @returns [String]
  */
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

  /*
    Return a list of all unplayed albums by a specified artist
    REQUEST FORMAT: show unplayed by "Artist"
    @param String
    @returns [String]
  */
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

/*
  For all albums associated with a specific artist, add that album to the list.
  @param: String
  @param: [String]
  @returns [String]
*/
function _allByArtist(artist, allList) {
  for (var album of library.artists[artist].albums) {
    allList.push(print.formatAlbumAndArtist(album, artist) + " " +
                 print.hasBeenPlayed(library.albums[album].played));
  }
}

/*
  For all unplayed albums associated with a specific artist, add that album to
  the list.
  @param: String
  @param: [String]
  @returns [String]
*/
function _unplayedByArtist(artist, unplayedList) {
  for (var album of library.artists[artist].albums) {
    if (!library.albums[album].played) {
      unplayedList.push(print.formatAlbumAndArtist(album, artist) + " " +
                        print.hasBeenPlayed(library.albums[album].played ));
    }
  }
  return unplayedList;
}

/*
  Check if the library is empty before performing any action.
  @returns Bool
*/
function libraryIsEmpty() {
  return (Object.entries(library.artists).length === 0 && library.artists.constructor === Object)
}
