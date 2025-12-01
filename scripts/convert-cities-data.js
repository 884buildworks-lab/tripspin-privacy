/**
 * ダウンロードした地方公共団体コードデータをアプリ用の形式に変換
 */

const fs = require('fs');
const path = require('path');

// 都道府県コードから都道府県IDへのマッピング
const prefCodeToId = {
  '010006': 1,  // 北海道
  '020001': 2,  // 青森県
  '030007': 3,  // 岩手県
  '040002': 4,  // 宮城県
  '050008': 5,  // 秋田県
  '060003': 6,  // 山形県
  '070009': 7,  // 福島県
  '080004': 8,  // 茨城県
  '090000': 9,  // 栃木県
  '100005': 10, // 群馬県
  '110001': 11, // 埼玉県
  '120006': 12, // 千葉県
  '130001': 13, // 東京都
  '140007': 14, // 神奈川県
  '150002': 15, // 新潟県
  '160008': 16, // 富山県
  '170003': 17, // 石川県
  '180009': 18, // 福井県
  '190004': 19, // 山梨県
  '200000': 20, // 長野県
  '210005': 21, // 岐阜県
  '220001': 22, // 静岡県
  '230006': 23, // 愛知県
  '240001': 24, // 三重県
  '250007': 25, // 滋賀県
  '260002': 26, // 京都府
  '270008': 27, // 大阪府
  '280003': 28, // 兵庫県
  '290009': 29, // 奈良県
  '300004': 30, // 和歌山県
  '310000': 31, // 鳥取県
  '320005': 32, // 島根県
  '330001': 33, // 岡山県
  '340006': 34, // 広島県
  '350001': 35, // 山口県
  '360007': 36, // 徳島県
  '370002': 37, // 香川県
  '380008': 38, // 愛媛県
  '390003': 39, // 高知県
  '400009': 40, // 福岡県
  '410004': 41, // 佐賀県
  '420000': 42, // 長崎県
  '430005': 43, // 熊本県
  '440001': 44, // 大分県
  '450006': 45, // 宮崎県
  '460001': 46, // 鹿児島県
  '470007': 47, // 沖縄県
};

// 都道府県IDから地方区分へのマッピング
const prefIdToRegion = {
  1: 'hokkaido',
  2: 'tohoku', 3: 'tohoku', 4: 'tohoku', 5: 'tohoku', 6: 'tohoku', 7: 'tohoku',
  8: 'kanto', 9: 'kanto', 10: 'kanto', 11: 'kanto', 12: 'kanto', 13: 'kanto', 14: 'kanto',
  15: 'chubu', 16: 'chubu', 17: 'chubu', 18: 'chubu', 19: 'chubu', 20: 'chubu', 21: 'chubu', 22: 'chubu', 23: 'chubu',
  24: 'kinki', 25: 'kinki', 26: 'kinki', 27: 'kinki', 28: 'kinki', 29: 'kinki', 30: 'kinki',
  31: 'chugoku', 32: 'chugoku', 33: 'chugoku', 34: 'chugoku', 35: 'chugoku',
  36: 'shikoku', 37: 'shikoku', 38: 'shikoku', 39: 'shikoku',
  40: 'kyushu', 41: 'kyushu', 42: 'kyushu', 43: 'kyushu', 44: 'kyushu', 45: 'kyushu', 46: 'kyushu', 47: 'kyushu',
};

// シンプルな説明文を生成
function generateDescription(cityName, prefName) {
  return `${prefName}の${cityName}`;
}

// データを変換
function convertData() {
  const inputPath = path.join(__dirname, '../data/local_gov_cities.json');
  const outputPath = path.join(__dirname, '../data/cities.json');

  console.log('Reading local government codes data...');
  const rawData = JSON.parse(fs.readFileSync(inputPath, 'utf-8'));

  console.log(`Processing ${rawData.length} cities...`);

  let id = 1;
  const convertedData = [];

  for (const city of rawData) {
    const prefectureId = prefCodeToId[city.pref_code];

    if (!prefectureId) {
      console.warn(`Warning: Unknown prefecture code ${city.pref_code} for ${city.name}`);
      continue;
    }

    const region = prefIdToRegion[prefectureId];

    if (!region) {
      console.warn(`Warning: No region mapping for prefecture ID ${prefectureId}`);
      continue;
    }

    convertedData.push({
      id: id++,
      name: city.city_name,
      prefecture_id: prefectureId,
      prefecture_name: city.pref_name,
      region: region,
      description: generateDescription(city.city_name, city.pref_name)
    });
  }

  console.log(`Converted ${convertedData.length} cities`);

  fs.writeFileSync(outputPath, JSON.stringify(convertedData, null, 2), 'utf-8');

  console.log(`✓ Successfully converted data`);
  console.log(`✓ Saved to: ${outputPath}`);
  console.log(`\nStats:`);
  console.log(`  Total cities: ${convertedData.length}`);

  // 地方ごとの統計
  const regionStats = {};
  for (const city of convertedData) {
    regionStats[city.region] = (regionStats[city.region] || 0) + 1;
  }

  console.log(`\n  By region:`);
  for (const [region, count] of Object.entries(regionStats)) {
    console.log(`    ${region}: ${count}`);
  }
}

// 実行
try {
  convertData();
} catch (error) {
  console.error('Error:', error.message);
  process.exit(1);
}
