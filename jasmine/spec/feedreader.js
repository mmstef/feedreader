/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        it('have a URL defined which is not empty', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.url).toBeDefined();
                expect(feed.url.length).not.toBe(0);
            })
        });

        it('have a name defined which is not empty', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.name).toBeDefined();
                expect(feed.name.length).not.toBe(0);
            })
        });
    });

    describe('The menu', function() {

        it('is hidden by default', function() {
            expect($('body').attr('class')).toBe("menu-hidden");
        });

        it('changes visibility when menu icon is clicked', function() {
            // It should be hidden at first
            expect($('body').attr('class')).toBe('menu-hidden');

            // After one click it should not be hidden
            $('.menu-icon-link').trigger('click');
            expect($('body').attr('class')).toBe('');

            // After the second click it should be hidden again
            $('.menu-icon-link').trigger('click');
            expect($('body').attr('class')).toBe('menu-hidden');
        });
    });

    describe('Initial entries', function() {
         beforeEach(function(done) {
            loadFeed(0, function() {
                done();
            })
         });

         it('contain at least one .entry element', function(done) {
            expect($('.feed .entry').length).not.toBe(0);
            done();
         });
    });

    describe('New Feed Selection', function() {
         beforeEach(function(done) {
            loadFeed(0, function() {
                done();
            });
         });

         it('changes the content', function(done) {
            // First, save our original title and make sure it's actually something
            original_title = $(".feed .entry:first h2").text();
            expect(original_title.length).not.toBe(0);

            // Load another feed
            loadFeed(1, function() {
                // Make sure a different title is loaded than our original title
                new_title = $(".feed .entry:first h2").text();
                expect(new_title.length).not.toBe(0);
                expect(new_title).not.toBe(original_title);
                done();
            });
         })
    });
}());
