const axios = require('axios');
const cheerio = require('cheerio');
const fetch = require('node-fetch');
const createHttpsProxyAgent = require('https-proxy-agent')

//Proxy Credentials
const username = '';
const password = '';
const proxy = ''

async function getPriceList(req, res){
  console.log("Searching Ebay -> " + String(req.params.item));
  var url = "https://www.ebay.com/sch/i.html?_from=R40&_sacat=0&LH_Sold=1&LH_Complete=1&_fosrp=1&_nkw=" + req.params.item + "&_pppn=r1&scp=ce0";
  res.set('Access-Control-Allow-Origin', '*');
  headers = {headers: {'Accept':'*/*' , 'Accept-Encoding':'gzip, deflate, br' , 'Accept-Language':'en-US,en;q=0.5' , 'Host':'www.ebay.com' , 'Referer':'https://www.ebay.com/sch/i.html?_from=R40&_nkw=ps5&_in_kw=1&_ex_kw=&_sacat=0&LH_Sold=1&LH_Complete=1&_fosrp=1' , 'User-Agent':'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:87.0) Gecko/20100101 Firefox/87.0'}}

  const agent = createHttpsProxyAgent(
    `http://${username}:${password}@${proxy}`
  );

  const response = await fetch(url, {
    headers: headers.headers,
    method: 'get',
    agent: agent,
  });
  
  let html = await response.text();

  console.log(html)

  const $ = cheerio.load(html)

    let finalResp = [];

    let soldList = [];

    let chartDataList = [];

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

        let chartJsonData = {
          "price":parseInt(price),
          "id":index,
        }

        chartDataList.push(chartJsonData);

        soldList.push(itemJson);
    });

    finalResp.push(soldList);
    finalResp.push(chartDataList);

    res.send(finalResp);

}

module.exports = {
    getPriceList,
}