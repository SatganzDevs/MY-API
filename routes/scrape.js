import axios from 'axios';
import cheerio from 'cheerio';



export const getUrl= async(url) => {
try {
const res = await axios.get(url);
const $ = cheerio.load(res.data);
let hrefs = [];
$('.overlay-s').each((index, element) => {
const href = $(element).parent().attr('href');
hrefs.push(href);
});
return hrefs;
} catch (error) {
console.error('Error getting token:', error);
throw error;
}
}


export const getVidWm = async(url) => {
try {
const hrefs = await getUrl(url);
const randomIndex = Math.floor(Math.random() * hrefs.length);
const randomVid = hrefs[randomIndex];
const res = await axios.get(randomVid);
const $ = cheerio.load(res.data);
const href = $('video').attr('src');
return {
        status: true,
        creator: 'satzz',
        video: href
    }
} catch (error) {
console.error('Error scraping:', error);
}
}

export const tiktokdls = async(url) => {
    let host = 'https://www.tikwm.com/';
    let res = await axios.post(host+'api/', {}, {
        headers: {
            'accept': 'application/json, text/javascript, */*; q=0.01',
            'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
            'sec-ch-ua': '"Chromium";v="104", " Not A;Brand";v="99", "Google Chrome";v="104"',
            'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.0.0 Safari/537.36'
        },
        params: {
            url: url,
            count: 12,
            cursor: 0,
            web: 1,
            hd: 1
        }
    })

    return {
        status: true,
        wm: host+res.data.data.wmplay,
        music: host+res.data.data.music,
        video: host+res.data.data.play
    }
}
// Export fungsi ssweb
export const ssweb = (url, device = 'desktop') => {
     return new Promise((resolve, reject) => {
          const base = 'https://www.screenshotmachine.com'
          const param = {
            url: url,
            device: device,
            cacheLimit: 0
          }
          axios({url: base + '/capture.php',
               method: 'POST',
               data: new URLSearchParams(Object.entries(param)),
               headers: {
                    'content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
               }
          }).then((data) => {
               const cookies = data.headers['set-cookie']
               if (data.data.status == 'success') {
                    axios.get(base + '/' + data.data.link, {
                         headers: {
                              'cookie': cookies.join('')
                         },
                         responseType: 'arraybuffer'
                    }).then(({ data }) => {
                        result = {
                            status: 200,
                            result: data
                        }
                         resolve(result)
                    })
               } else {
                    reject(new Error({ status: 404, statuses: `Link Error`, message: data.data }))
               }
          }).catch(reject)
     })
}

// Export fungsi stickersearch
export const stickersearch = async (query) => {
  return new Promise((resolve, reject) => {
    axios.get(`https://getstickerpack.com/stickers?query=${query}`)
      .then(({ data }) => {
        const $ = cheerio.load(data)
        const link = [];
        $('#stickerPacks > div > div:nth-child(3) > div > a').each(function(a, b) {
          link.push($(b).attr('href'))
        })
        rand = link[Math.floor(Math.random() * link.length)]
        axios.get(rand)
          .then(({ data }) => {
            const $$ = cheerio.load(data)
            const url = [];
            $$('#stickerPack > div > div.row > div > img').each(function(a, b) {
              url.push($$(b).attr('src').split('&d=')[0])
            })
            resolve({
              creator: 'Kayla Bot',
              title: $$('#intro > div > div > h1').text(),
              author: $$('#intro > div > div > h5 > a').text(),
              author_link: $$('#intro > div > div > h5 > a').attr('href'),
              sticker: url
            })
          })
      })
  })
}

// Export fungsi nickff
export const nickff = (userId) => {
  if (!userId) return reject(new Error("no userId"));
  return new Promise((resolve, reject) => {
    let body = {
      "voucherPricePoint.id": 8050,
      "voucherPricePoint.price": "",
      "voucherPricePoint.variablePrice": "",
      "n": "",
      "email": "",
      "userVariablePrice": "",
      "order.data.profile": "",
      "user.userId": userId,
      "voucherTypeName": "FREEFIRE",
      "affiliateTrackingId": "",
      "impactClickId": "",
      "checkoutId": "",
      "tmwAccessToken": "",
      "shopLang": "in_ID"
    };
    axios({
      "url": "https://order.codashop.com/id/initPayment.action",
      "method": "POST",
      "data": body,
      "headers": {
        "Content-Type": "application/json; charset/utf-8",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36"
      }
    }).then(({ data }) => {
      resolve({
        "username": data.confirmationFields.roles[0].role,
        "userId": userId,
        "country": data.confirmationFields.country
      });
    }).catch(reject);
  });
}

// Export fungsi nickml
export const nickml = (id, zoneId) => {
  return new Promise(async (resolve, reject) => {
    axios.post(
      'https://api.duniagames.co.id/api/transaction/v1/top-up/inquiry/store',
      new URLSearchParams(Object.entries({
        productId: '1',
        itemId: '2',
        catalogId: '57',
        paymentId: '352',
        gameId: id,
        zoneId: zoneId,
        product_ref: 'REG',
        product_ref_denom: 'AE',
      })),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Referer: 'https://www.duniagames.co.id/',
          Accept: 'application/json',
        },
      }
    ).then((response) => {
      resolve(response.data.data.gameDetail)
    }).catch((err) => {
      reject(err)
    })
  })
}
