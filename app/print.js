// Functions that format objects for printing.
module.exports = {
  /*
    Returns played or unplayed based on the bool provided.
    @param Bool
    @returns String
  */
  hasBeenPlayed: function(bool) {
    if (bool) return "(played)"
    else return "(unplayed)"
  },

  /*
    Returns the string "\"Album\" by Artist"
    @param String
    @param String
    @returns String
  */
  formatAlbumAndArtist: function(title, artist) {
    return this.formatAlbum(title) + " by " + artist;
  },

  /*
    Adds double quotes around an album title
    @param String
    @returns String
  */
  formatAlbum: function(title) {
    return "\"" + title + "\"";
  },

  /*
    Takes an array and prints each one on a new line.
    @param [String]
    @returns undefined
  */
  list: function(list) {
    console.log('\n')
    console.log(list.join('\n'));
    console.log('\n')
  },

  /*
    Takes a string and prints it.
    @param String
    @returns undefined
  */
  response: function(arg) {
    console.log('\n' + arg + '\n');
  }
}
