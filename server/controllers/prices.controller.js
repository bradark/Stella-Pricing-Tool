const axios = require('axios');
const cheerio = require('cheerio');

async function getPriceList(req, res){
console.log("Searching Ebay -> " + String(req.params.item));
  var url = "https://www.ebay.com/sch/i.html?_from=R40&_sacat=0&LH_Sold=1&LH_Complete=1&_fosrp=1&_nkw=" + req.params.item + "&_pppn=r1&scp=ce0";
  res.set('Access-Control-Allow-Origin', '*');
  headers = {headers: {'Accept':'*/*' , 'Accept-Encoding':'gzip, deflate, br' , 'Accept-Language':'en-US,en;q=0.5' , 'Host':'www.ebay.com' , 'Referer':'https://www.ebay.com/sch/i.html?_from=R40&_nkw=ps5&_in_kw=1&_ex_kw=&_sacat=0&LH_Sold=1&LH_Complete=1&_fosrp=1' , 'User-Agent':'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:87.0) Gecko/20100101 Firefox/87.0'}}
  axios.get(url, headers).then((response) => {

    const $ = cheerio.load(response.data)

    let soldList = [];

    $('ul[class="srp-results srp-list clearfix"]').find('li.s-item').each(function (index, element) {
        var title = ($(element).find('div.s-item__title').text().trim());
        var raw_price = ($(element).find('span.POSITIVE').text().trim());
        var img = ($(element).find('img').attr('src'));

        let split_raw_price = raw_price.split('$');

        let date = split_raw_price[0]; 
        let price = split_raw_price[1];

        let itemJson = {
            "title":title,
            "date":date,
            "price":"  $" + price,
            "img":img
        }
        soldList.push(itemJson)
    });

//    console.log(boPriceList);
/*
    console.log(req.body.exclude);
    for (let i = 0; i < priceList.length; i++) {
      if(req.body.exclude[0] == ''){
        console.log("pushing, no exclude");
        tableData.push({"id" : i+1,
                      "name" : titleList[i],
                      "listingid" : idList[i],
                      "price" : priceList[i],
                      "format" : listingFormatList[i],
                      "date" : dateList[i],
                      "img" : imgLinkList[i]
                    });
      }else{
        includesKeyword = false;
        for(let j = 0; j < (req.body.exclude).length; j++){
          console.log("checking excluded " + (String(req.body.exclude[j])));
          if(((titleList[i].toLowerCase()).includes(String((req.body.exclude[j]).toLowerCase())))){
            includesKeyword = true;
          }
        }
        if(includesKeyword == false){
          tableData.push({"id" : i+1,
                      "name" : titleList[i],
                      "listingid" : idList[i],
                      "price" : priceList[i],
                      "format" : listingFormatList[i],
                      "date" : dateList[i],
                      "img" : imgLinkList[i]
                    });
        }
      }
    }
    */
    res.send(soldList);
  });
}

module.exports = {
    getPriceList,
}