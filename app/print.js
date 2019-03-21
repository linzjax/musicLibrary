module.exports = {
  hasBeenPlayed: function(bool) {
    if (bool) return "(played)"
    else return "(unplayed)"
  },

  formatAlbumAndArtist: function(title, artist) {
    return this.formatAlbum(title) + " by " + artist;
  },

  formatAlbum: function(title) {
    return "\"" + title + "\"";
  },

  list: function(printFunction, args) {
    console.log('\n')
    printFunction(args);
    console.log('\n')
  },

  response: function(...args) {
    console.log('\n' + args.join(' ') + '\n');
  }
}
