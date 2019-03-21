module.exports = {
  unknownArtist: function(artist) {
    console.log("Couldn't find the artist: ", artist);
    console.log("Make sure you surround the artist you requested in \"double quotes\".");
  },
  unknownAlbum: function(title) {
    console.log("Couldn't find the album: ", title);
    console.log("Make sure you surround the album you requested in \"double quotes\".");
  },
  unknownRequest: function() {
    console.log("Sorry, I didn't understand that. These are the commands I understand:");
    console.log("> add \"album\" \"artist\"");
    console.log("> play \"album\"");
    console.log("> show [ all | unplayed | all by \"artist\" | unplayed by \"artist\" ]");
  },
  emptyLibrary: function() {
    console.log("Looks like your library is empty! Try adding some albums:");
    console.log("i.e. > add \"Little Queen\" \"Heart\"");
  },
  emptyUnplayed: function() {
    console.log("Looks like you've listened to everything! Try adding some new albums:");
    console.log("i.e. > add \"Greatest Hits\" \"Queen\"");
  },
  albumAlreadyExists: function (title, artist) {
    print.response(
      "That album already exists in your library:",
      print.formatAlbumAndArtist(title, artist)
    )
  }
}
