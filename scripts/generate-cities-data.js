/**
 * 全国の市町村データを生成するスクリプト
 * すべての市、東京23区、主要な町村を含む
 */

const fs = require('fs');
const path = require('path');

// 地方区分のマッピング
const regions = {
  hokkaido: 'hokkaido',
  tohoku: 'tohoku',
  kanto: 'kanto',
  chubu: 'chubu',
  kinki: 'kinki',
  chugoku: 'chugoku',
  shikoku: 'shikoku',
  kyushu: 'kyushu'
};

// 全国の市町村データ（すべての市を含む）
const cities = [
  // 北海道（35市）
  {prefecture_id: 1, name: "札幌市", description: "北海道の中心都市、雪まつりで有名"},
  {prefecture_id: 1, name: "函館市", description: "夜景と海鮮が美しい港町"},
  {prefecture_id: 1, name: "小樽市", description: "運河とガラス工芸の街"},
  {prefecture_id: 1, name: "旭川市", description: "旭山動物園がある北海道第二の都市"},
  {prefecture_id: 1, name: "室蘭市", description: "工業都市、夜景が美しい"},
  {prefecture_id: 1, name: "釧路市", description: "釧路湿原と海産物の街"},
  {prefecture_id: 1, name: "帯広市", description: "十勝平野の中心、農業と畜産"},
  {prefecture_id: 1, name: "北見市", description: "玉ねぎとカーリングの街"},
  {prefecture_id: 1, name: "夕張市", description: "メロンと炭鉱の街"},
  {prefecture_id: 1, name: "岩見沢市", description: "豪雪地帯、農業の街"},
  {prefecture_id: 1, name: "網走市", description: "流氷とオホーツク海"},
  {prefecture_id: 1, name: "留萌市", description: "日本海に面した港町"},
  {prefecture_id: 1, name: "苫小牧市", description: "北海道の海の玄関口"},
  {prefecture_id: 1, name: "稚内市", description: "日本最北端の街"},
  {prefecture_id: 1, name: "美唄市", description: "炭鉱の街から芸術の街へ"},
  {prefecture_id: 1, name: "芦別市", description: "カナディアンワールド"},
  {prefecture_id: 1, name: "江別市", description: "札幌近郊の住宅都市"},
  {prefecture_id: 1, name: "赤平市", description: "炭鉱の歴史"},
  {prefecture_id: 1, name: "紋別市", description: "流氷とカニの街"},
  {prefecture_id: 1, name: "士別市", description: "羊と士別サフォークラム"},
  {prefecture_id: 1, name: "名寄市", description: "もち米とひまわり"},
  {prefecture_id: 1, name: "三笠市", description: "化石とワイン"},
  {prefecture_id: 1, name: "根室市", description: "日本最東端、納沙布岬"},
  {prefecture_id: 1, name: "千歳市", description: "新千歳空港がある空の玄関口"},
  {prefecture_id: 1, name: "滝川市", description: "ジンギスカンの街"},
  {prefecture_id: 1, name: "砂川市", description: "甘いもの文化"},
  {prefecture_id: 1, name: "歌志内市", description: "日本一人口が少ない市"},
  {prefecture_id: 1, name: "深川市", description: "米どころ"},
  {prefecture_id: 1, name: "富良野市", description: "ラベンダーとスキーリゾート"},
  {prefecture_id: 1, name: "登別市", description: "温泉と地獄谷"},
  {prefecture_id: 1, name: "恵庭市", description: "花のまち"},
  {prefecture_id: 1, name: "伊達市", description: "北の湘南、温暖な気候"},
  {prefecture_id: 1, name: "北広島市", description: "日本ハムファイターズの本拠地"},
  {prefecture_id: 1, name: "石狩市", description: "石狩鍋と海水浴"},
  {prefecture_id: 1, name: "北斗市", description: "北海道新幹線の駅"},

  // 青森県（10市）
  {prefecture_id: 2, name: "青森市", description: "ねぶた祭りで有名な県庁所在地"},
  {prefecture_id: 2, name: "弘前市", description: "桜の名所、弘前城がある城下町"},
  {prefecture_id: 2, name: "八戸市", description: "港町、新鮮な海の幸"},
  {prefecture_id: 2, name: "黒石市", description: "こみせ通りと温泉"},
  {prefecture_id: 2, name: "五所川原市", description: "立佞武多祭り"},
  {prefecture_id: 2, name: "十和田市", description: "十和田湖と奥入瀬渓流"},
  {prefecture_id: 2, name: "三沢市", description: "米軍基地と航空科学館"},
  {prefecture_id: 2, name: "むつ市", description: "本州最北端の市、恐山"},
  {prefecture_id: 2, name: "つがる市", description: "縄文遺跡と農業"},
  {prefecture_id: 2, name: "平川市", description: "りんごと温泉"},

  // 岩手県（14市）
  {prefecture_id: 3, name: "盛岡市", description: "冷麺とわんこそばの街"},
  {prefecture_id: 3, name: "宮古市", description: "三陸海岸の港町"},
  {prefecture_id: 3, name: "大船渡市", description: "リアス式海岸と水産業"},
  {prefecture_id: 3, name: "花巻市", description: "宮沢賢治の故郷"},
  {prefecture_id: 3, name: "北上市", description: "桜の名所、北上展勝地"},
  {prefecture_id: 3, name: "久慈市", description: "琥珀と海女の街"},
  {prefecture_id: 3, name: "遠野市", description: "民話の里、遠野物語"},
  {prefecture_id: 3, name: "一関市", description: "厳美渓と餅文化"},
  {prefecture_id: 3, name: "陸前高田市", description: "高田松原と復興の街"},
  {prefecture_id: 3, name: "釜石市", description: "製鉄の街、ラグビーの聖地"},
  {prefecture_id: 3, name: "二戸市", description: "九戸城と漆器"},
  {prefecture_id: 3, name: "八幡平市", description: "高原リゾートと温泉"},
  {prefecture_id: 3, name: "奥州市", description: "平泉と前沢牛"},
  {prefecture_id: 3, name: "滝沢市", description: "盛岡近郊の住宅都市"},

  // 宮城県（14市）
  {prefecture_id: 4, name: "仙台市", description: "東北最大の都市、杜の都"},
  {prefecture_id: 4, name: "石巻市", description: "港町、石巻マンガミュージアム"},
  {prefecture_id: 4, name: "塩竈市", description: "塩竈神社と港"},
  {prefecture_id: 4, name: "気仙沼市", description: "カツオとサンマの水揚げ"},
  {prefecture_id: 4, name: "白石市", description: "白石城と温麺"},
  {prefecture_id: 4, name: "名取市", description: "仙台空港がある街"},
  {prefecture_id: 4, name: "角田市", description: "航空宇宙産業"},
  {prefecture_id: 4, name: "多賀城市", description: "古代東北の拠点、多賀城跡"},
  {prefecture_id: 4, name: "岩沼市", description: "竹駒神社と千貫神社"},
  {prefecture_id: 4, name: "登米市", description: "教育資料館と油麩"},
  {prefecture_id: 4, name: "栗原市", description: "伊豆沼と農業"},
  {prefecture_id: 4, name: "東松島市", description: "松島基地と復興の街"},
  {prefecture_id: 4, name: "大崎市", description: "鳴子温泉とこけし"},
  {prefecture_id: 4, name: "富谷市", description: "仙台近郊の新しい街"},

  // 秋田県（13市）
  {prefecture_id: 5, name: "秋田市", description: "竿燈まつりとなまはげの地"},
  {prefecture_id: 5, name: "能代市", description: "バスケの街、能代工業"},
  {prefecture_id: 5, name: "横手市", description: "かまくらと横手焼きそば"},
  {prefecture_id: 5, name: "大館市", description: "秋田犬と曲げわっぱ"},
  {prefecture_id: 5, name: "男鹿市", description: "なまはげと男鹿半島"},
  {prefecture_id: 5, name: "湯沢市", description: "小町伝説と稲庭うどん"},
  {prefecture_id: 5, name: "鹿角市", description: "十和田湖と花輪ばやし"},
  {prefecture_id: 5, name: "由利本荘市", description: "鳥海山の麓"},
  {prefecture_id: 5, name: "潟上市", description: "八郎潟の干拓地"},
  {prefecture_id: 5, name: "大仙市", description: "大曲の花火"},
  {prefecture_id: 5, name: "北秋田市", description: "森吉山と秋田杉"},
  {prefecture_id: 5, name: "にかほ市", description: "鳥海山と日本海"},
  {prefecture_id: 5, name: "仙北市", description: "角館の武家屋敷と田沢湖"},

  // 山形県（13市）
  {prefecture_id: 6, name: "山形市", description: "蔵王温泉とさくらんぼ"},
  {prefecture_id: 6, name: "米沢市", description: "上杉家と米沢牛"},
  {prefecture_id: 6, name: "鶴岡市", description: "庄内地方の中心、出羽三山"},
  {prefecture_id: 6, name: "酒田市", description: "港町、山居倉庫"},
  {prefecture_id: 6, name: "新庄市", description: "新庄まつりと雪国"},
  {prefecture_id: 6, name: "寒河江市", description: "さくらんぼの里"},
  {prefecture_id: 6, name: "上山市", description: "上山城と温泉"},
  {prefecture_id: 6, name: "村山市", description: "バラの街"},
  {prefecture_id: 6, name: "長井市", description: "水と緑と花の街"},
  {prefecture_id: 6, name: "天童市", description: "将棋駒の生産日本一"},
  {prefecture_id: 6, name: "東根市", description: "さくらんぼと空港"},
  {prefecture_id: 6, name: "尾花沢市", description: "銀山温泉とスイカ"},
  {prefecture_id: 6, name: "南陽市", description: "赤湯温泉とぶどう"},

  // 福島県（13市）
  {prefecture_id: 7, name: "福島市", description: "果物王国、花見山が美しい"},
  {prefecture_id: 7, name: "会津若松市", description: "会津の歴史と鶴ヶ城"},
  {prefecture_id: 7, name: "郡山市", description: "経済の中心地"},
  {prefecture_id: 7, name: "いわき市", description: "常磐炭田とハワイアンズ"},
  {prefecture_id: 7, name: "白河市", description: "白河の関と小峰城"},
  {prefecture_id: 7, name: "須賀川市", description: "牡丹園と円谷英二"},
  {prefecture_id: 7, name: "喜多方市", description: "蔵の街とラーメン"},
  {prefecture_id: 7, name: "相馬市", description: "相馬野馬追"},
  {prefecture_id: 7, name: "二本松市", description: "智恵子抄と菊人形"},
  {prefecture_id: 7, name: "田村市", description: "あぶくま洞"},
  {prefecture_id: 7, name: "南相馬市", description: "相馬野馬追の舞台"},
  {prefecture_id: 7, name: "伊達市", description: "桃の産地"},
  {prefecture_id: 7, name: "本宮市", description: "安達太良山の麓"},

  // ... 続く（残りの市を追加）
];

// 都道府県情報
const prefectures = [
  {id: 1, name: "北海道", region: "hokkaido"},
  {id: 2, name: "青森県", region: "tohoku"},
  {id: 3, name: "岩手県", region: "tohoku"},
  {id: 4, name: "宮城県", region: "tohoku"},
  {id: 5, name: "秋田県", region: "tohoku"},
  {id: 6, name: "山形県", region: "tohoku"},
  {id: 7, name: "福島県", region: "tohoku"},
  {id: 8, name: "茨城県", region: "kanto"},
  {id: 9, name: "栃木県", region: "kanto"},
  {id: 10, name: "群馬県", region: "kanto"},
  {id: 11, name: "埼玉県", region: "kanto"},
  {id: 12, name: "千葉県", region: "kanto"},
  {id: 13, name: "東京都", region: "kanto"},
  {id: 14, name: "神奈川県", region: "kanto"},
  {id: 15, name: "新潟県", region: "chubu"},
  {id: 16, name: "富山県", region: "chubu"},
  {id: 17, name: "石川県", region: "chubu"},
  {id: 18, name: "福井県", region: "chubu"},
  {id: 19, name: "山梨県", region: "chubu"},
  {id: 20, name: "長野県", region: "chubu"},
  {id: 21, name: "岐阜県", region: "chubu"},
  {id: 22, name: "静岡県", region: "chubu"},
  {id: 23, name: "愛知県", region: "chubu"},
  {id: 24, name: "三重県", region: "kinki"},
  {id: 25, name: "滋賀県", region: "kinki"},
  {id: 26, name: "京都府", region: "kinki"},
  {id: 27, name: "大阪府", region: "kinki"},
  {id: 28, name: "兵庫県", region: "kinki"},
  {id: 29, name: "奈良県", region: "kinki"},
  {id: 30, name: "和歌山県", region: "kinki"},
  {id: 31, name: "鳥取県", region: "chugoku"},
  {id: 32, name: "島根県", region: "chugoku"},
  {id: 33, name: "岡山県", region: "chugoku"},
  {id: 34, name: "広島県", region: "chugoku"},
  {id: 35, name: "山口県", region: "chugoku"},
  {id: 36, name: "徳島県", region: "shikoku"},
  {id: 37, name: "香川県", region: "shikoku"},
  {id: 38, name: "愛媛県", region: "shikoku"},
  {id: 39, name: "高知県", region: "shikoku"},
  {id: 40, name: "福岡県", region: "kyushu"},
  {id: 41, name: "佐賀県", region: "kyushu"},
  {id: 42, name: "長崎県", region: "kyushu"},
  {id: 43, name: "熊本県", region: "kyushu"},
  {id: 44, name: "大分県", region: "kyushu"},
  {id: 45, name: "宮崎県", region: "kyushu"},
  {id: 46, name: "鹿児島県", region: "kyushu"},
  {id: 47, name: "沖縄県", region: "kyushu"},
];

// 都道府県情報を取得
function getPrefectureInfo(prefectureId) {
  return prefectures.find(p => p.id === prefectureId);
}

// JSONデータを生成
function generateCitiesData() {
  let id = 1;
  const citiesData = cities.map(city => {
    const prefecture = getPrefectureInfo(city.prefecture_id);
    return {
      id: id++,
      name: city.name,
      prefecture_id: city.prefecture_id,
      prefecture_name: prefecture.name,
      region: prefecture.region,
      description: city.description
    };
  });

  return citiesData;
}

// ファイルに書き出し
function saveCitiesData() {
  const citiesData = generateCitiesData();
  const outputPath = path.join(__dirname, '../data/cities.json');

  fs.writeFileSync(
    outputPath,
    JSON.stringify(citiesData, null, 2),
    'utf-8'
  );

  console.log(`✓ Generated ${citiesData.length} cities`);
  console.log(`✓ Saved to: ${outputPath}`);
}

// 実行
saveCitiesData();
