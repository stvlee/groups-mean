'use strict';

var Crawler = require("crawler"),
    url = require('url'),
    chalk = require('chalk');


var parseHead = function (index, a) {
    //console.log($(a).find('a').attr('href'));
    console.log($(a).find('.xst').text());
    //console.log($(a).find('.tsubject a').attr('href'));
    //console.log($(a).attr('id'));


};


var crawlFreedl = function (page) {
    var crawler = new Crawler({
        maxConnections: 1,
        forceUTF8:true
    });

    var baseUrl = 'http://www.freedl.org/treebbs2rss/treebbs2rss/';
    for (var i = 0; i < page; i++) {
        var page = i+1;
        crawler.queue([{
            uri: ('http://www.freedl.org/treebbs2rss/treebbs2rss/tree.php?mode=dump&page=' + page),
            callback: function (error, result, $) {
                $('table.brdr').each(function (index, a) {
                        //var img = baseUrl + $(a).find('td.bgb').attr('src');
                        var url = baseUrl + $(a).find('td.bgb a').attr('href');
                        var subject = $(a).find('td.bgb font').text();
                        var date = ($(a).find('td.bgc tt').text().split('Date:')[1]);
                        var content = $(a).find('td.bgc blockquote').html();
                        var attnm = $(a).find('td.bgc blockquote a').last().attr('href');

                        if (attnm){
                            console.log('page:'+i);
                            console.log('date string:'+date.trim());
                            console.log('date:'+new Date('2015/' +date.trim()));
                            console.log('url:'+url);
                            console.log('subject:'+subject);
                            console.log('content:'+content);
                            console.log('attnm:'+attnm);
                        }
                    }
                );
                console.log('Grabbed page: ', page, ' ', result.body.length, 'bytes');
            }
        }]);
    }
}

crawlFreedl(1);



/*

 // Queue just one URL, with default callback 
 c.queue('http://joshfire.com');

 // Queue a list of URLs
 c.queue(['http://jamendo.com/','http://tedxparis.com']);

 // Queue using a function
 var googleSearch = function(search) {
 return 'http://www.google.fr/search?q=' + search;
 };
 c.queue({
 uri: googleSearch('cheese')
 });

 // Queue some HTML code directly without grabbing (mostly for tests)
 c.queue([{
 html: '<p>This is a <strong>test</strong></p>'
 }]);

 */
