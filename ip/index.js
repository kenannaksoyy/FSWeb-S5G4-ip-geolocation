//axios import buraya gelecek
import axios from "axios";

var benimIP = "95.70.132.107";


// ------------ değiştirmeyin --------------
// licensed to Ergineer 2022
require("babel-core/register");
require("babel-polyfill");
async function ipAdresimiAl(){
	await axios({
		method: 'get',
		url: 'https://apis.ergineer.com/ipadresim',
	})
	.then(function (response) {
		return response.data
	})
	.then(function (a) {
		benimIP=a
	});
}				
// ------------ değiştirmeyin --------------


/*
	ADIM 1: axios kullanarak, aşağıdaki URL'ye GET sorgusu atacağız
    (tag içindeki yere kendi ipnizi yazarak URL'yi oluşturun):
    https://apis.ergineer.com/ipgeoapi/<ipniz>
	
	NOT: Bilgisayarın IP adresini öğrenmek için: https://apis.ergineer.com/ipadresim 
	ADIM 5'e gelene kadar fonksiyonunuzu test etmek için ip nizi URL'ye manuel olarak ekleyebilirsiniz.
*/

const getData = async function (){
	await ipAdresimiAl(); //asenkron sonucu beklemek için await kullandık
	axios.get(`https://apis.ergineer.com/ipgeoapi/${benimIP}`) //veri almak için get
	.then(function(response){
		return response.data;
	})
	.then(function(ipDatasi){
		document.querySelector("div.cards").appendChild(cardOlustur(ipDatasi));
	})
};
getData();

/*
	ADIM 2: Geri döndürülen verileri inceleyin, bu sizin ip bilgileriniz! Bileşen fonksiyonunuzu geliştirmek içindeki bu veri yapısını
	iyice anlamanız gerekmektedir.
	{
    "sorgu": "95.70.132.107",
    "durum": "OK",
    "kıta": "Asia",
    "ülke": "Turkey",
    "ülkeKodu": "TR",
    "ülkebayrağı": "https://apis.ergineer.com/ulkebayraklari/TR",
    "bölge": "34",
    "bölgeAdı": "Istanbul",
    "şehir": "Istanbul",
    "zip": "34010",
    "enlem": 41.0247,
    "boylam": 28.9252,
    "saatdilimi": "Europe/Istanbul",
    "parabirimi": "TRY",
    "isp": "TurkNet Iletisim Hizmetleri",
    "organizasyon": "TurkNet Iletisim Hizmetleri A.S.",
    "as": "AS12735 TurkNet Iletisim Hizmetleri A.S."
}
	
*/
/*
	ADIM 3: Argümanı sadece 1 nesne kabül eden bir fonksiyon oluşturun.
    DOM metotlarını ve özelliklerini kullanarak, şunları gerçekleştirin:
	
	<div class="card">
	<img src={ülke bayrağı url} />
	<div class="card-info">
		<h3 class="ip">{ip adresi}</h3>
		<p class="ulke">{ülke bilgisi (ülke kodu)}</p>
		<p>Enlem: {enlem} Boylam: {boylam}</p>
		<p>Şehir: {şehir}</p>
		<p>Saat dilimi: {saat dilimi}</p>
		<p>Para birimi: {para birimi}</p>
		<p>ISP: {isp}</p>
	</div>
    </div>
*/
function cardOlustur(veri){
	const _div=document.createElement("div");
	_div.classList.add("card");

	const _img=document.createElement("img");
	_img.src=veri["ülkebayrağı"];
	_div.appendChild(_img);

	const _infoDiv=document.createElement("div");
	_infoDiv.classList.add("card-info");

	const _h3=document.createElement("h3");
	_h3.classList.add("ip");
	_h3.textContent=veri["sorgu"];
	_infoDiv.appendChild(_h3);

	const p_ulke=document.createElement("p");
	p_ulke.classList.add("ulke");
	p_ulke.textContent=`${veri["ülke"]} (${veri["ülkeKodu"]})`;
	_infoDiv.appendChild(p_ulke);

	let dizi=[`Enlem: ${veri["enlem"]} Boylam: ${veri["boylam"]}`,
	`Şehir: ${veri["şehir"]}`,
	`Saat Dilimi: ${veri["saatdilimi"]}`,
	`Para Birimi: ${veri["parabirimi"]}`,
	`ISP: ${veri["isp"]}`];

	dizi.forEach(p_dizi => {
		let _p=document.createElement("p");
		_p.textContent=p_dizi;
		_infoDiv.appendChild(_p);
	});
	_div.appendChild(_infoDiv);


	return _div;
}

/*
	ADIM 4: API'den alınan verileri kullanarak ADIM 3'te verilen yapıda bir kart oluşturun ve 
	bu kartı DOM olarak .cards elementinin içine ekleyin. 
*/


/*
	ADIM 5: Manuel olarak eklediğiniz IP adresini dinamiğe dönüştürün. 
	Sayfanın en üstünde ---değiştirmeyin--- etiketleri arasında yer alan asenkron ipAdresimiAl() fonksiyonuna 
	sorgu atarak bilgisayarınız IP adresini dinamik olarak aldıracaksınız. Bu fonksiyon asenkron olarak çağırıldığında `benimIP` değişkenine 
	bilgisayarınızın IP adresini atayacaktır. 
	Örnek dinamik URL kullanımı: var url = "https://apis.ergineer.com/ipgeoapi/"+benimIP; 
*/



//kodlar buraya gelecek