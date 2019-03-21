const add     = require('../app/add');
const play    = require('../app/play');
const library = require('../app/models');
const error   = require('../app/error');

describe("Play Functions", function() {
  it("'plays' an album", function() {
    add.album("add \"From Under The Cork Tree\" \"Fall Out Boy\"");
    add.album("add \"American Beauty/American Psycho\" \"Fall Out Boy\"");

    let result = play.album("play \"From Under The Cork Tree\"");
    expect(result).toBe("You're listening to \"From Under The Cork Tree\"");

    expect(library.albums["From Under The Cork Tree"].played).toBe(true);
    expect(library.albums["American Beauty/American Psycho"].played).toBe(false);
  });

  it("doesn't play an album not in the library", function() {
    let result = play.album("play \"Not An Album\"");
    expect(result).toBe(error.unknownAlbum("Not An Album"));
    expect(library.albums["Not An Album"]).toBe(undefined);
  });

  it("doesn't play an improperly formatted album", function() {
    let result = play.album("play 'Not An Album'");
    expect(result).toBe(error.unknownAlbum(undefined));
    expect(library.albums["Not An Album"]).toBe(undefined);

    result = play.album("play Not An Album");
    expect(result).toBe(error.unknownAlbum(undefined));
    expect(library.albums["Not An Album"]).toBe(undefined);
  });
});
