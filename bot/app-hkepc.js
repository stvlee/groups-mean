'use strict';

var Crawler = require("crawler"),
url = require('url'),
chalk = require('chalk');
 
var c = new Crawler({
    maxConnections : 10,
    // This will be called for each crawled page 
    callback : function (error, result, $) {
        /*
		//a lean implementation of core jQuery designed specifically for the server 
        $('a').each(function(index, a) {
            var toQueueUrl = $(a).attr('href');
            c.queue(toQueueUrl);
        });
		*/
    }
});
 
var parseHead = function(index, a) {
			//console.log($(a).find('a').attr('href'));
			console.log($(a).find('.xst').text());
			//console.log($(a).find('.tsubject a').attr('href'));
			//console.log($(a).attr('id'));
			
			
        };

var parseDetail = function (subject,img,url) {	
		//parse detail	
			c.queue([{
				uri: url,
				callback: function (error, result, $) {
							//$('[id^=threadtitle]').each(function(index, a) {
//								console.log($(a).find('h1').text());
							//});
							
							if(error){
								console.error(chalk.red('Crawl error: ', error));
							}else{
								$('[id^=postmessage]').each(function(index, a) {
									console.log('subject:' + subject);
									console.log('img:' + img);
									console.log('content:' + $(a).text());
								});
							}
						}
			}]);
};
		
 
// Queue URLs with custom callbacks & parameters
var crawlHkepc = function (page) {
    var crawler = new Crawler({
        maxConnections: 1
    });

    var cur = 1;

    var cb = function (error, result, $) {
        if(error){
            console.error(chalk.red('Crawl error: ', error));
        }else{
            $('[id^=normalthread]').each(function(index, a) {
                    //console.log('subject:' + $(a).find('a').text());
                    //console.log('img:http://www.hkepc.com/forum/' + $(a).find('img').attr('src'));
                    var baseUrl = 'http://www.hkepc.com/forum/';
                    var subject = $(a).find('.subject a').text();
                    var img = baseUrl + $(a).find('img').attr('src');
                    var href = baseUrl +  $(a).find('a').attr('href');

                    console.log('cur:'+ cur++);
                    console.log('subject:'+ subject);
                    console.log('img:'+ img);
                    console.log('href:'+ href);

                    //console.log('url:http://www.hkepc.com/forum/' +$(a).find('a').attr('href'));

                    //var thread = new Thread();
                    //thread.name = subject;
                    //thread.save(function(err) {
                    //    if (err) {
                    //        console.error(chalk.red(errorHandler.getErrorMessage(err)));
                    //    } else {
                    //        console.log(chalk.green('saved subject:' + subject));
                    //    }
                    //});

                }
            );
        }
    }


    var baseUrl = 'http://www.hkepc.com/forum/';
    for (var i = 1; i <= page; i++) {
        //console.log(chalk.green('curpage:' + i));
        crawler.queue([{
            uri: (baseUrl+ 'forumdisplay.php?fid=26&page=' + i),
            callback: cb
        }]);
    }
};

crawlHkepc(1);







/*
c.queue([{
    uri: 'http://mobile.uwants.com/forumdisplay.php?fid=1860',
	jQuery: 'cheerio',
    callback: function (error, result, $) {

		
		//console.log($('.datatable tbody'));
		
		$('[id^=normalthread]').each(
		function(index, a) {
			console.log($(a).find('.tsubject a').text());
			//console.log($(a).find('.tsubject a').attr('href'));
			//console.log($(a).attr('id'));
        });
		
        //console.log('Grabbed', result.body, 'bytes');
    }
}]);
 
 */
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
