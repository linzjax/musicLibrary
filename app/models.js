// Models for storing data for the Music Library.
module.exports = {
  artists: {},
  albums: {},

  /*
  Object for storing Album information
  played is a bool to prevent typos in "played" and "unplayed".
  @param: String
  @param: String
  @returns: Album {artist: String, title: String, played: Bool}
  */
  Album: function(artist, title) {
    this.artist = artist;
    this.title  = title;
    this.played = false;
  },

  /*
  Object for storing Artist information
  Currently has an unused "name" field. This is assuming an eventual
  transition to a database where objects will be stored by ID rather than
  name.
  @param: String
  @param: String
  @returns: Artist {name: String, albums: [String]}
  */
  Artist: function(name, album) {
    this.name   = name;
    this.albums = [album]
  }
}
