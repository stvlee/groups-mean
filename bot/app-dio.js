var Crawler = require("crawler"),
    url = require('url'),
    chalk = require('chalk');


var parseHead = function (index, a) {
    //console.log($(a).find('a').attr('href'));
    console.log($(a).find('.xst').text());
    //console.log($(a).find('.tsubject a').attr('href'));
    //console.log($(a).attr('id'));


};


// Queue URLs with custom callbacks & parameters
var c = new Crawler({
    maxConnections: 1,
    // This will be called for each crawled page 
    callback: function (error, result, $) {

        //stickthread | normalthread
        $('[id^=stickthread]').each(function (index, a) {
                var baseUrl = 'http://www.dioguitar23.net/';
                var img = baseUrl + $(a).find('td.icn img').attr('src');
                var subject = $(a).find('a.xst').text();
                console.log('subject:'+subject);
                var url = baseUrl + $(a).find('a.xst ').attr('href');
                //console.log('url:'+url);
                //if (index == 1){
                //parse detail
                c.queue([{
                    uri: url,
                    callback: function (error, result, $) {
                        if (error) {
                            console.error(chalk.red('Crawl error: ', error));
                        } else {
                            //if (index === 0){
                                $('[id^=postmessage]').each(function (index, a) {
                                    //console.log('img:' + img);
                                    //console.log('subject:' + subject);
                                    //console.log('content:' + $(a).text());



                                });

//attachment
                            $('[id^=aid]').each(function (index, a) {
                                var attachment = $(a).attr('href');
                                console.log('attachment:' + attachment);

                            });


                            //}
                        }
                    }
                }]);
                //}
            }
        );

         console.log('Grabbed', result.body.length, 'bytes');

    }
});


//parse head	
c.queue([{
    uri: 'http://www.dioguitar23.net/forum.php?mod=forumdisplay&fid=135&page=1'

}]);

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
