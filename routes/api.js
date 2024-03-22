import { Router } from "express";
import axios from "axios"
import cheerio from "cheerio"
import fetch from "node-fetch"
import { Wcard } from "wcard-gen";
import { snapsave } from './snapsave.js';
import { tiktokdls } from './scrape.js'
import { TiktokDL } from "@tobyg74/tiktok-api-dl"
import { remini } from './remini.js';
import ytdl from "ytdl-core";
import { BingImageClient } from 'bing-images'
const ffmpegPath = (await import('@ffmpeg-installer/ffmpeg')).path;
import translate from '@iamtraction/google-translate';



/**
 * Fungsi untuk melakukan konversi menggunakan ffmpeg
 * @param {Buffer} buffer Buffer audio atau video yang akan dikonversi
 * @param {string[]} args Argumen tambahan untuk ffmpeg
 * @param {string} ext Ekstensi file asli
 * @param {string} ext2 Ekstensi file output
 * @returns {Promise<Buffer>} Buffer hasil konversi
 */
function ffmpegConvert(buffer, args = [], ext = '', ext2 = '') {
  return new Promise(async (resolve, reject) => {
    try {
      let tmpInputFile = path.join(__dirname, `input_${Date.now()}.${ext}`);
      let tmpOutputFile = path.join(__dirname, `output_${Date.now()}.${ext2}`);
      
      // Menulis buffer ke file sementara
      await fs.promises.writeFile(tmpInputFile, buffer);
      
      // Menjalankan ffmpeg
      spawn(ffmpegPath, [
        '-y',
        '-i', tmpInputFile,
        ...args,
        tmpOutputFile
      ])
      .on('error', reject)
      .on('close', async (code) => {
        try {
          // Menghapus file sementara input
          await fs.promises.unlink(tmpInputFile);
          
          if (code !== 0) {
            reject(new Error(`ffmpeg process exited with code ${code}`));
            return;
          }
          
          // Membaca hasil konversi dari file sementara output
          const convertedBuffer = await fs.promises.readFile(tmpOutputFile);
          
          // Menghapus file sementara output
          await fs.promises.unlink(tmpOutputFile);
          
          resolve(convertedBuffer);
        } catch (e) {
          reject(e);
        }
      });
    } catch (e) {
      reject(e);
    }
  });
}



import { creator, pickRandom, nomorRandom, Lyrics, xnxxdl, pindl, scdl } from "./scraper.js"
import util from "util"
const router = new Router();
const client = new BingImageClient({
token:"EAAGNO4a7r2wBO8zweAanda5F84csd0bIGpIG2ZAgxjZCMgVkEuecwJHusiwJWWyfLS1OTglysDJgBxLJjOkhAZArlBKT3ZCwDE5uaEjzH0Rsox2P1NOj6Ra1hSOSyYgOe4r6fteZAxJPuHVmwnzcB8PxmSOZC98zsKn6lCkNyQbgSzJhfo9YI5HkoiAG1KcVuMxGDMIASBTwZDZD", 
notify: false});

function pinterest(querry) {
return new Promise(async(resolve,reject) => {
axios.get('https://id.pinterest.com/search/pins/?autologin=true&q=' + querry, {
headers: {
"cookie" : "_auth=1; _b=\"datr=dgHRZPXP9znuQccJISuqXCVY;sb=iFbSZJl9p5Fft_D6ybT-p152;c_user=100027826357661;xs=32%3ADmebA0mr3Id53g%3A2%3A1691506316%3A-1%3A10820%3A%3AAcW9BndOiNTsz3YWfnUcIMhyeASVA-t1M9FSlSH4dg;fr=1c8f5S30ou827667r.AWUND2xkpi206cUhNYV9NcHJySw.BlbHJ0.77.AAA.0.0.BlbHJ0.AWXWoWLxjCc;wd=1280x598;presence=EDvF3EtimeF1703191540EuserFA21B27826357661A2EstateFDutF0CEchF_7bCC;usida=eyJ2ZXIiOjEsImlkIjoiQXM2MWIxdTExajNiOTgiLCJ0aW1lIjoxNzAzMTkxNjAyfQ%3D%3D;\"; _pinterest_sess=TWc9PSZDaXFJNUhjd2FkSDA5UmRqUldtVStVcDV2NFlFcGdZU3ovVkxsWXdIbUVsSlUzVW9xUlk0SXF6YzJUaXhDZWpNV0x3VTluNVdhREl5S2ttNjl5SzJuY2gvN3ZwaXpGOVJocUhpSGVMTXBhamxRMGsrN2F3WUljZGFLSFh3MDAxL0lMc1VORkVRNjA3eDU4Y3VQTWNta1E5Y1huaGxwVmpsVmUxVmN3SkRJOWNJVkhSR2R6ekdVNjBLTEV1ZE5HekErQitKVHlmcGdxRnl2aWNYR014Y0U2SXRuS3g3NDdKdExxUDNmUXFWRXJxMkpVVjloTDltMGJVRkZqY256eGR4blcwdUVjcmRuWExyRHVabWpIN0lQbzlhdGdhRmFGZUpVeExzQ1RBMnIrR2txR3UwdGQwK1UxVkVwcytWMmd5UFlVdFIvbmRMM0h6U2MwanFidHU5eG8xUTkwK2hrazhBTE1tNU93d1Vqcmg1dTg4RG9oS3g4cUVEenVvV2VzTlJUdGZ6aDh0ZnhLV0hobSt0bHN0Y2tBPT0mWGFkMUE2NGlmcjZxVThoaDdNNXh3dkJhbTJJPQ==; _ir=0"
}
}).then(({ data }) => {
const $ = cheerio.load(data)
const result = [];
const hasil = [];
$('div > a').get().map(b => {
const link = $(b).find('img').attr('src')
result.push(link)
});
result.forEach(v => {
if(v == undefined) return
hasil.push(v.replace(/236/g,'736'))
})
hasil.shift();
resolve(hasil)
})
})
}
/*
* @Pesan Error
*/
global.loghandler = {
notparam: {
status: false,
creator: `${creator}`,
code: 406,
message: 'masukan parameter apikey'
},
noturl: {
status: false,
creator: `${creator}`,
code: 406,
message: 'masukan parameter url'
},
notgcname: {
status: false,
creator: `${creator}`,
code: 406,
message: 'masukkan paramer gcname'
},
notgcicon: {
status: false,
creator: `${creator}`,
code: 406,
message: 'masukkan paramer gcicon'
},
notpp: {
status: false,
creator: `${creator}`,
code: 406,
message: 'masukkan paramer pp'
},
notbg: {
status: false,
creator: `${creator}`,
code: 406,
message: 'masukkan paramer bg'
},
notmemberCount: {
status: false,
creator: `${creator}`,
code: 406,
message: 'masukkan paramer memberCount'
},
notquery: {
status: false,
creator: `${creator}`,
code: 406,
message: 'masukkan parameter query'
},
notkata: {
status: false,
creator: `${creator}`,
code: 406,
message: 'masukan parameter kata'
},
nottext: {
status: false,
creator: `${creator}`,
code: 406,
message: 'masukan parameter text'
},
nottext2: {
status: false,
creator: `${creator}`,
code: 406,
message: 'masukan parameter text2'
},
notnabi: {
status: false,
creator: `${creator}`,
code: 406, 
message: 'masukan parameter nabi'
},
nottext3: {
status: false,
creator: `${creator}`,
code: 406,
message: 'masukan parameter text3'
},
nottheme: {
status: false,
creator: `${creator}`,
code: 406,
message: 'masukan parameter theme'
},
notusername: {
status: false,
creator: `${creator}`,
code: 406,
message: 'masukan parameter username'
},
notvalue: {
status: false,
creator: `${creator}`,
code: 406,
message: 'masukan parameter value'
},
invalidKey: {
status: false,
creator: `${creator}`,
code: 406,
message: 'apikey invalid'
},
invalidlink: {
status: false,
creator: `${creator}`,
message: 'error, mungkin link anda tidak valid.'
},
invalidkata: {
status: false,
creator: `${creator}`,
message: 'error, mungkin kata tidak ada dalam api.'
},
error: {
status: false,
creator: `${creator}`,
message: '404 ERROR'
}
}

/*
Akhir Pesan Error
*/

// first of routes 
let listkey = ["satganzdevs", "satria", "siesta"];

router.post("/apikey", async (req, res, next) => {
const key = req.query.key;
if(listkey.includes(key)) {
res.json({message: 'apikey sudah terdaftar'});
} else {
listkey.push(key);
res.json({message: `berhasil mendaftarkan ${key} Kedatabase apikey`});
}
});


router.delete("/apikey", async(req, res, next) => {
const key = req.query.delete;
if(listkey.includes(key)) {
res.json({message: 'apikey tidak ada sebelumnya'})
} else {
listkey.splice(key, 1)
res.json({message: 'apikey berhasil dihapus'});
}
});

const validateApiKey = (req, res, next) => {
const apiKey = req.headers['x-api-key'];
if (apiKey.includes(listkey)) {
next(); // Lanjutkan ke handler jika API Key valid
} else {
res.status(401).json({ error: 'Unauthorized. Invalid API Key' });
}
};











 
router.get('/tool/greetingcard', async (req, res, next) => {
var Apikey = req.query.apikey
if(!Apikey) return res.json(loghandler.notparam)
if (!listkey.includes(Apikey)) return res.json(loghandler.invalidKey)
try {

const welcomecard = new Wcard()
.setName(req.query.name) 
.setAvatar(req.query.avatar) 
.setTitle(req.query.title)
.setColor(req.query.color) 
.setBackground(req.query.background); 
const card = await welcomecard.build();

res.setHeader('content-type', 'image/png');
res.end(card);
} catch (error) {
console.error(error);
res.status(500).json({ error: 'Internal server error' });
}
});

router.get('/pinterest', async (req, res) => {
const { query } = req.query;
var Apikey = req.query.apikey
if(!Apikey) return res.json(loghandler.notparam)
if (!listkey.includes(Apikey)) return res.json(loghandler.invalidKey)
if (!query) {
return res.status(400).json({ error: 'Query parameter is required' });
}
const result = await pinterest(query);
res.json(result);
})

router.get('/lirik', async (req, res) => {
try {
const Buscar = require("lyria-npm")
var Apikey = req.query.apikey
if(!Apikey) return res.json(loghandler.notparam)
if (!listkey.includes(Apikey)) return res.json(loghandler.invalidKey)
const { judul } = req.query;
if (!judul) {
return res.status(400).json({ error: 'Judul musik tidak ditemukan' });
}
let ss = await Buscar(judul)
let bro = {
title: ss.titulo,
artist: ss.artista,
album: ss.albulm,
release: ss.fecha,
genre: ss.Generos,
listen: ss.Escuchar,
lyrics: ss.letra
}
res.json(bro);
} catch (error) {
console.log('[lyric-api]:', error.message, error.stack)
}
})
router.get('/ytv', async (req, res) => {
try {
var Apikey = req.query.apikey
if(!Apikey) return res.json(loghandler.notparam)
if (!listkey.includes(Apikey)) return res.json(loghandler.invalidKey)
const { url } = req.query;
if (!url) { return res.status(400).json({ error: 'Missing URL parameter' }) }
if (!ytdl.validateURL(url)) { return res.status(400).json({ error: 'Invalid YouTube URL' }) }
const videoStream = await ytdl(url);
res.setHeader('content-type', 'video/mp4');
videoStream.pipe(res);
} catch (error) {
console.error(error);
res.status(500).json({ error: 'Internal server error' });
}
});
router.get('/yta', async (req, res) => {
  try {
    const { url } = req.query;
    var Apikey = req.query.apikey
    if (!Apikey) return res.json(loghandler.notparam)
    if (!listkey.includes(Apikey)) return res.json(loghandler.invalidKey)
    if (!url) {
      return res.status(400).json({ error: 'Missing URL parameter' });
    }
    if (!ytdl.validateURL(url)) {
      return res.status(400).json({ error: 'Invalid YouTube URL' });
    }

    const audioStream = ytdl(url, { filter: "audioonly" });

    res.setHeader('content-type', 'audio/mp3');
    audioStream.pipe(res);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/snapsave', async (req, res) => {
try {
const { url } = req.query;
var Apikey = req.query.apikey
if(!Apikey) return res.json(loghandler.notparam)
if (!listkey.includes(Apikey)) return res.json(loghandler.invalidKey)
if (!url) {
return res.status(400).json({ error: 'Missing URL parameter' });
}
const result = await snapsave(url);
res.json(result);
} catch (error) {
console.log(error);
res.status(500).json({ error: 'Internal server error' });
}
})
router.get('/tiktok', async (req, res) => {
try {
const { url } = req.query;
var Apikey = req.query.apikey
if(!Apikey) return res.json(loghandler.notparam)
if (!listkey.includes(Apikey)) return res.json(loghandler.invalidKey)
if (!url) {
return res.status(400).json({ error: 'Missing URL parameter' });
}
const result = await TiktokDL(url, {version: "v3"})
res.json(result);
} catch (error) {
try {
const resul = await tiktokdls(url)
res.json(resul);
} catch (error) {
res.json.status(500).json({ error: 'Internal server error' });
}
}
})


router.get('/remini', async (req, res) => {
try {
let {url} = req.query;
const response = await axios.get(url, { responseType: 'arraybuffer' });
const imageContent = response.data;
const result = await remini(imageContent, 'enhance')
res.setHeader('content-type', 'image/png');
res.end(result);
} catch (error) {
res.status(500).json({ error: error.message });
}
});

router.post('/remini', async (req, res) => {
try {
const { imageData, processingType } = req.body; 
const result = await remini(imageData, processingType);
res.setHeader('content-type', 'image/png');
res.end(result);
} catch (error) {
res.status(500).send({ error: error.message });
}
});






router.get('/translate', async (req, res) => {
var Apikey = req.query.apikey
if(!Apikey) return res.json(loghandler.notparam)
if (!listkey.includes(Apikey)) return res.json(loghandler.invalidKey)
let {text, lang} = req.query;
if (!text) return res.json('input text')
if (!lang) return res.json('input lang')
translate(text, { to: lang }).then(ress => {res.json({creator: "SatganzDevs", result: ress.text}) 
}).catch(err => {
res.status(500).json(`The language *${lang} is not supported, type .tr -help to show support language.`)
});
})
router.get("/random/meme", async (req, res) => {
let asu = await fetch('https://meme-api.com/gimme')
let result = await asu.json()
try {
var Apikey = req.query.apikey
if(!Apikey) return res.json(loghandler.notparam)
if (!listkey.includes(Apikey)) return res.json(loghandler.invalidKey)
const response = await axios.get(result.url, { responseType: 'arraybuffer' });
const imageContent = response.data;
res.setHeader('Content-Type', 'image/jpeg');
res.send(imageContent);
} catch (error) {
console.error('Error:', error);
res.status(500).send('Internal Server Error');
}
})  

router.get("/random/darkjokes", async (req, res) => {
let asu = await fetch('https://raw.githubusercontent.com/SatganzDevs/scrape/main/darkjoke.json')
let resu = await asu.json()
let result = resu[Math.floor(Math.random() * resu.length)]
try {
var Apikey = req.query.apikey
if(!Apikey) return res.json(loghandler.notparam)
if (!listkey.includes(Apikey)) return res.json(loghandler.invalidKey)
const response = await axios.get(result, { responseType: 'arraybuffer' });
const imageContent = response.data;
res.setHeader('Content-Type', 'image/jpeg');
res.send(imageContent);
} catch (error) {
console.error('Error:', error);
res.status(500).send('Internal Server Error');
}
})

router.get('/random/sound', async (req, res) => {
var Apikey = req.query.apikey
if(!Apikey) return res.json(loghandler.notparam)
if (!listkey.includes(Apikey)) return res.json(loghandler.invalidKey)
try {
const randomNumber = Math.floor(Math.random() * 1000);
const url = pickRandom([`https://github.com/DGXeon/Tiktokmusic-API/raw/master/tiktokmusic/sound${nomorRandom(1, 161)}.mp3`,`https://github.com/Aisyah-Aldi/Sound/raw/main/sound${nomorRandom(1, 119)}.mp3`])
const response = await axios.get(url, { responseType: 'stream' });
res.setHeader('Content-Type', 'audio/mpeg');
res.setHeader('Content-Disposition', `attachment; filename=random_sound_${randomNumber}.mp3`);
response.data.pipe(res);
} catch (error) {
console.error('Error:', error);
res.status(500).send('Internal Server Error');
}
});

//end







// Downloader
router.get("/xnxxdl", async(req, res) => {
var Apikey = req.query.apikey
let url = req.query.url
if(!Apikey) return res.json(loghandler.notparam)
if(listkey.includes(Apikey)){
if (!url) {
return res.status(500).json({
status: 500,
message: 'masukan url video!'
})
}
let result = await xnxxdl(url)
res.json({result})
} else {
res.json(loghandler.invalidKey)
}
}) 

router.get("/pinterestdl", async(req, res) => {
var Apikey = req.query.apikey
let url = req.query.url
if(!Apikey) return res.json(loghandler.notparam)
if(listkey.includes(Apikey)){
if (!url) {
return res.status(500).json({
status: 500,
message: 'masukan url video!'
})
}
let result = await pindl(url)
res.json({result})
} else {
res.json(loghandler.invalidKey)
}
}) 

router.get("/scdl", async(req, res) => {
let url = req.query.url
var Apikey = req.query.apikey
if(!Apikey) return res.json(loghandler.notparam)
if (!listkey.includes(Apikey)) return res.json(loghandler.invalidKey)
if (!url) {
return res.status(500).json({
status: 500,
message: 'masukan url Musik!'
})
}
let result = await scdl(url)
res.json({result})
}) 



router.get("/simsimi", async(req, res) => {
var Apikey = req.query.apikey
if(!Apikey) return res.json(loghandler.notparam)
if (!listkey.includes(Apikey)) return res.json(loghandler.invalidKey)
let { text, lang} = req.query
if (!text) return res.json('masukan text')
if (!lang) return res.json('masukan language')
const options = new URLSearchParams();
options.append('text', text);
options.append('lc', lang);
const response = await axios.post('https://api.simsimi.vn/v2/simtalk', options);
let receipt = await response.data;
res.json({
status: true,
creator: `${creator}`,
result: receipt.message
})
})

router.get("/bing-image", async(req, res) => {
try {
var Apikey = req.query.apikey
if(!Apikey) return res.json(loghandler.notparam)
if (!listkey.includes(Apikey)) return res.json(loghandler.invalidKey)
let { prompt } = req.query
if (!prompt) return res.json('masukan promptnya')
const result = await client.getImages(prompt)
res.json({
status: true,
creator: `${creator}`,
result: result
})
} catch (err) {
console.log(err)
res.status(500).send('Internal Server Error');
}
})
export default router;
