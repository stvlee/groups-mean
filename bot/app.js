var Crawler = require("crawler");
var url = require('url');
 
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

var parseDetail = function (url) {	
		//parse detail	
			c.queue([{
				uri: 'http://www.dioguitar23.net/forum.php?mod=viewthread&tid=1254170&extra=page%3D1',
				callback: function (error, result, $) {	
							
							/*
							//post
							$('[id^=postmessage]').each(function(index, a) {
								//console.log($(a).find('a').attr('href'));
								console.log($(a).find('.attnm').find('a').text());
								//console.log($(a).find('.tsubject a').attr('href'));
								//console.log($(a).attr('id'));
								
								
							});
							
							
							//img
							$('[id^=aimg_]').each(function(index, a) {
								if (index >17){
									console.log($(a).attr('src'));
								}
								
								//console.log($(a).find('.attnm').find('a').text());
								//console.log($(a).find('.tsubject a').attr('href'));
								//console.log($(a).attr('id'));
								
								
							});
							*/
							
							$('.attnm a').each(function(index, a) {
								console.log($(a).attr('href'));
							});
							
							
							
							/*
							//torrent
							$('[id^=aid]').each(function(index, a) {
								console.log($(a).attr('href'));
								//console.log($(a).find('a').attr('href'));
								//console.log($(a).text());
								//console.log($(a).find('.tsubject a').attr('href'));
								//console.log($(a).attr('id'));
								
								
							});
							*/
						}
			}]);
    };		
	
	
	
	
	
		
 
// Queue URLs with custom callbacks & parameters

//parse head	
c.queue([{
    uri: 'http://dioguitar23.net/forum.php?mod=forumdisplay&fid=135&page=1',
    callback: function (error, result, $) {
	
		$('[id^=stickthread]').each(function(index, a) {
			
			console.log($(a).find('.xst').text());
			//if (index == 1){
				parseDetail($(a).find('a').attr('href'));
			//}
			
			
			//console.log($(a).find('a').attr('href'));
			
        }
		);
		
		/*
		$('[id^=normalthread]').each(
		function(index, a) {
			console.log($(a).find('.tsubject a').text());
			//console.log($(a).find('.tsubject a').attr('href'));
			//console.log($(a).attr('id'));
        });
		
        //console.log('Grabbed', result.body, 'bytes');
		*/
    }
}]);







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