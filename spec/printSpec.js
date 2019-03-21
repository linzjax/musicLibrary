const print = require('../app/print');

describe("Print Functions", function() {
  it("formats an album and artist", function() {
    expect(print.formatAlbumAndArtist("AM", "Arctic Monkeys"))
                .toBe("\"AM\" by Arctic Monkeys");
  });

  it("adds quotes around an album title", function() {
    expect(print.formatAlbum("Yellow Ranger"))
                .toEqual("\"Yellow Ranger\"");
  });

  it("returns a played or unplayed string based on a bool", function() {
    expect(print.hasBeenPlayed(false)).toEqual("(unplayed)");
    expect(print.hasBeenPlayed(true)).toEqual("(played)");
  });
});
