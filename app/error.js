// All error messages for Music library
const print   = require('./print.js');

module.exports = {
  unknownArtist: function(artist) {
    return ("Couldn't find the artist: " + artist + "\n" +
           "Make sure you surround the artist you requested in " +
           "\"double quotes\".");
  },
  unknownAlbum: function(title) {
    return ("Couldn't find the album: " + title + "\n" +
           "Make sure you surround the album you requested in " +
           "\"double quotes\".");
  },
  unknownRequest: function() {
    return ("Sorry, I didn't understand that. " +
           " These are the commands I understand:\n" +
           "> add \"album\" \"artist\"\n" +
           "> play \"album\"\n" +
           "> show [ all | unplayed | all by \"artist\" | unplayed by \"artist\" ]");
  },
  emptyLibrary: function() {
    return ("Looks like your library is empty! Try adding some albums:\n" +
           "i.e. > add \"Little Queen\" \"Heart\"");
  },
  emptyUnplayed: function() {
    return ("Looks like you've listened to everything! Try adding some new albums:\n" +
           "i.e. > add \"Greatest Hits\" \"Queen\"");
  },
  albumAlreadyExists: function (title, artist) {
    return ("That album already exists in your library:\n" +
            print.formatAlbumAndArtist(title, artist));
  }
}
