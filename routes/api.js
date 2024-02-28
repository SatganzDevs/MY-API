import { Router } from "express";
import axios from "axios"
import cheerio from "cheerio"
import fetch from "node-fetch"
import fs from "fs"
import zrapi from "zrapi"
import FormData from "form-data"
import qs from "qs"
import request from "request"
import path from "path"
import { fileURLToPath } from "url";
import { Wcard } from "wcard-gen";
import { snapsave } from './snapsave.js';
import { TiktokDL } from "@tobyg74/tiktok-api-dl"
import { remini } from './remini.js';
import translate from '@iamtraction/google-translate';
import { creator, pickRandom, nomorRandom, Lyrics, xnxxdl, pindl, scdl, pinterest } from "./scraper.js"
import util from "util"
const router = new Router();



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

router.get('/api/pinterest', async (req, res) => {
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
if(!Apikey) return res.json(loghandler.notparam)
if (!listkey.includes(Apikey)) return res.json(loghandler.invalidKey)
if (!url) {
return res.status(400).json({ error: 'Missing URL parameter' });
}
if (!ytdl.validateURL(url)) {
return res.status(400).json({ error: 'Invalid YouTube URL' });
}   
const audioStream = await ytdl(url,  { filter: "audioonly" });
res.setHeader('content-type', 'audio/mpeg');
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
console.log(error);
res.status(500).json({ error: 'Internal server error' });
}
})


router.get('/remini', async (req, res) => {
try {
const result = `Metode ini ditolak. Contoh penggunaan dengan curl: 
curl -X POST https://api.satganzdevs.tech/api/remini \
-H "Content-Type: application/json" \
-H "x-api-key: YOUR_API_KEY" \
-d '{
"imageData": "data_gambar_di_sini",
"processingType": "enhance"
}'`;
res.status(405).json(result); // Status 405 menunjukkan method not allowed
} catch (error) {
res.status(500).json({ error: error.message });
}
});

router.post('/remini', validateApiKey, async (req, res) => {
try {
const { imageData, processingType } = req.body; 
const result = await remini(imageData, processingType);
res.send(result);
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
translate(text, { to: lang }).then(ress => {res.json(ress.text) 
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


export default router;
