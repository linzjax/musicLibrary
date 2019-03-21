const add     = require('../app/add');
const library = require('../app/models');
const error   = require('../app/error');

describe("Add Functions", function() {
  it("adds an album and artist to the library", function() {
    let result = add.album("add \"Little Queen\" \"Heart\"");
    expect(result).toEqual("Added \"Little Queen\" by Heart");
    expect(library.artists["Heart"]).not.toBe(undefined);
    expect(library.artists["Heart"].name).toBe("Heart");
    expect(library.artists["Heart"].albums).toEqual(["Little Queen"]);

    expect(library.albums["Little Queen"]).not.toBe(undefined);
    expect(library.albums["Little Queen"].artist).toBe("Heart");
    expect(library.albums["Little Queen"].played).toBe(false);

    // Also adds an album to an already existing artist.
    result = add.album("add \"Dreamboat Annie\" \"Heart\"");
    expect(result).toEqual("Added \"Dreamboat Annie\" by Heart");
    expect(library.artists["Heart"]).not.toBe(undefined);
    expect(library.artists["Heart"].name).toBe("Heart");
    expect(library.artists["Heart"].albums).toEqual(["Little Queen", "Dreamboat Annie"]);

    expect(library.albums["Dreamboat Annie"]).not.toBe(undefined);
    expect(library.albums["Dreamboat Annie"].artist).toBe("Heart");
    expect(library.albums["Dreamboat Annie"].played).toBe(false);
  });

  it("doesn't add albums and artists that are improperly formatted", function() {
    let result = add.album("add Foo Bar");
    expect(result).toBe(error.unknownRequest());
    expect(library.artists["Bar"]).toBe(undefined);
    expect(library.albums["Foo"]).toBe(undefined);
    expect(library.artists["undefined"]).toBe(undefined);
    expect(library.albums["undefined"]).toBe(undefined);

    result = add.album("add 'Foo' 'Bar'");
    expect(result).toBe(error.unknownRequest());
    expect(library.artists["Bar"]).toBe(undefined);
    expect(library.albums["Foo"]).toBe(undefined);
    expect(library.artists["undefined"]).toBe(undefined);
    expect(library.albums["undefined"]).toBe(undefined);
  });

  it("doesn't add albums if the artist is missing", function() {
    let result = add.album("add \"Bad Animals\"");
    expect(result).toBe(error.unknownRequest());
    expect(library.albums["Bad Animals"]).toBe(undefined);
    expect(library.artists["undefined"]).toBe(undefined);
    expect(library.albums["undefined"]).toBe(undefined);
  });
})
