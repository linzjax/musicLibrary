module.exports = {
  artists: {},
  albums: {},

  Album: function(artist, title) {
    this.artist = artist;
    this.title = title;
    this.played = false;
  },

  Artist: function(name, album) {
    this.name = name;
    this.albums = [album]
  }
}
