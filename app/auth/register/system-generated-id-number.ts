export class TaiwanIdNumberGenerator {
  public sex: { [key: string]: number } = {
    "male": 1,
    "female": 2,
  };

  public cities: { [key: string]: string } = {
    "臺北市": "10A",
    "臺中市": "11B",
    "基隆市": "12C",
    "臺南市": "13D",
    "高雄市": "14E",
    "臺北縣": "15F",
    "宜蘭縣": "16G",
    "桃園縣": "17H",
    "新竹縣": "18J",
    "苗栗縣": "19K",
    "臺中縣": "20L",
    "南投縣": "21M",
    "彰化縣": "22N",
    "雲林縣": "23P",
    "嘉義縣": "24Q",
    "臺南縣": "25R",
    "高雄縣": "26S",
    "屏東縣": "27T",
    "花蓮縣": "28U",
    "臺東縣": "29V",
    "澎湖縣": "30X",
    "陽明山": "31Y",
    "金門縣": "32W",
    "連江縣": "33Z",
    "新竹市": "35O",
    "嘉義市": "34I",
  };

  private _generated: { [key: string]: boolean } = {};

  public newRandomSerialNumber(): string {
    return Math.floor(Math.random() * 10000000).toString().padStart(7, "0");
  }

  public getCityCode(cityName: string): string | undefined {
    cityName = cityName.replace('台', '臺');
    return this.cities[cityName];
  }

  public getSexCode(sex: string): number | undefined {
    return this.sex[sex];
  }

  public calculateSerialChecksum(serial: string): number {
    let sum = 0;
    for (let i = 0; i < serial.length; i++) {
      const c = parseInt(serial[i]);
      sum += (7 - i) * c;
    }
    return sum;
  }

  public calculateCityChecksum(cityCode: string): number {
    return parseInt(cityCode.charAt(0)) + parseInt(cityCode.charAt(1)) * 9;
  }

  public calculateSexChecksum(sex: number): number {
    return sex * 8;
  }

  public calculateChecksum(cityCode: string, sex: number, serial: string): number {
    const ret = this.calculateCityChecksum(cityCode) + this.calculateSexChecksum(sex) + this.calculateSerialChecksum(serial);
    return (10 - (ret % 10)) % 10;
  }

  public generate(cityName: string | null = null, sex: string | null = null, serial: string | null = null): string {
    if (!cityName) {
      const cityKeys = Object.keys(this.cities);
      cityName = cityKeys[Math.floor(Math.random() * cityKeys.length)];
    }
    cityName = cityName.replace('台', '臺');

    if (!this.cities[cityName]) {
      throw new Error(`The City name ${cityName} does not exist in the city table.`);
    }

    const cityCode = this.cities[cityName];

    let sexCode: number;
    if (sex) {
      sexCode = this.sex[sex] ?? 0;
    } else {
      sexCode = Math.floor(Math.random() * 2) + 1;
    }

    if (!serial) {
      serial = this.newRandomSerialNumber();
    }

    const sum = this.calculateChecksum(cityCode, sexCode, serial);
    return cityCode.charAt(2) + sexCode.toString() + serial + sum.toString();
  }

  public generateUnique(cityName: string | null = null, sex: string | null = null, serial: string | null = null): string {
    let idNumber = this.generate(cityName, sex, serial);
    while (this._generated[idNumber]) {
      idNumber = this.generate(cityName, sex, serial);
    }
    this._generated[idNumber] = true;
    return idNumber;
  }
}
