const add     = require('../app/add');
const play     = require('../app/play');
const library = require('../app/models');

describe("Play Functions", function() {
  it("'plays' an album", function() {
    add.album("add \"From Under The Cork Tree\" \"Fall Out Boy\"");
    add.album("add \"American Beauty/American Psycho\" \"Fall Out Boy\"");

    play.album("play \"From Under The Cork Tree\"");

    expect(library.albums["From Under The Cork Tree"].played).toBe(true);
    expect(library.albums["American Beauty/American Psycho"].played).toBe(false);
  });

  it("doesn't play an album not in the library", function() {
    play.album("play \"Not An Album\"");
    expect(library.albums["Not An Album"]).toBe(undefined);
  });

  it("doesn't play an improperly formatted album", function() {
    play.album("play 'Not An Album'");
    expect(library.albums["Not An Album"]).toBe(undefined);

    play.album("play Not An Album");
    expect(library.albums["Not An Album"]).toBe(undefined);
  });
});
