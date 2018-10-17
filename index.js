var request = require('request')
var cheerio = require('cheerio')
var fs = require('fs')

var pages = []

for(var i = 1; i <= 23; i++) {
    pages.push('http://www.terrazero.com.br/category/comicpod-podcast-quadrinhos/page/' + i);
}

console.log(pages);

pages.forEach(function(url){
    request(url, function(err, res, body) {
            if (err) console.log(`Erro: ${err}`)

            var $ = cheerio.load(body)

            var arrayResponse = []

            var objPodcast = {}

            $('.herald-posts article').each(function() {

                var postPodcast = $(this).find('a').attr('href')

                request(postPodcast, function(err, res, body) {
                    if (err) console.log(`Erro: ${err}`)
                    var $ = cheerio.load(body)

                    var tituloPodcast = $('.entry-title').first().text()
                    console.log(tituloPodcast)
                    var descPodcast = $('.entry-content p').first().text()

                    var linkPodcast = $('.powerpress_links_mp3').first().find("a").first().attr('href')

                    objPodcast = {
                        "titulo": tituloPodcast,
                        "descricao": descPodcast,
                        "link": linkPodcast
                    }

                    arrayResponse.push(objPodcast)

                })

                // console.log(arrayResponse);

            })
        // fs.appendFile('podcasts.json', JSON.stringify(arrayResponse))

        // $('.herald-posts article').each(function(){

        //     var postPodcast = $(this).find('a').attr('href')

        //     request(postPodcast, function(err, res, body) {
        //         if (err) console.log(`Erro: ${err}`)

        //         var $ = cheerio.load(body)

        //         var tituloPodcast = $('.entry-title').first().text()
        //         var tituloPodcast = $('.entry-title').first().text()

        //         console.log(`Titulo: ${tituloPodcast}`)

        //     })

        //     //

        })
});
