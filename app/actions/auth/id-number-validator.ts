/**
 * Verify the input is a valid National identification number (中華民國身分證字號)
 *
 * @param { string } input National identification number
 * @returns { boolean } is `input` a valid national ID number
 */
export function isNationalIdentificationNumberValid(input: string): boolean {
  if (typeof input !== 'string') return false

  const regex = /^[A-Z][1,2]\d{8}$/

  return regex.test(input) && verifyTaiwanIdIntermediateString(input)
}

/**
 * Verify the intermediate string for isNationalIdentificationNumberValid and isResidentCertificateNumberValid
 *
 * @param { string } input String to verify
 * @returns { boolean } is `input` a valid Taiwan ID intermediate string
 */
function verifyTaiwanIdIntermediateString(input: string): boolean {
  const intRadix = 10

  /**
   *  A=10 台北市     J=18 新竹縣     S=26 高雄縣
   *  B=11 台中市     K=19 苗栗縣     T=27 屏東縣
   *  C=12 基隆市     L=20 台中縣     U=28 花蓮縣
   *  D=13 台南市     M=21 南投縣     V=29 台東縣
   *  E=14 高雄市     N=22 彰化縣     W=32 金門縣*
   *  F=15 台北縣     O=35 新竹市*    X=30 澎湖縣
   *  G=16 宜蘭縣     P=23 雲林縣     Y=31 陽明山
   *  H=17 桃園縣     Q=24 嘉義縣     Z=33 連江縣*
   *  I=34 嘉義市*    R=25 台南縣
   *
   *  Step 1: 英文字母按照上表轉換為數字之後，十位數 * 1 + 個位數 * 9 相加
   */
  const TAIWAN_ID_LOCALE_CODE_LIST = [
    1, // A -> 10 -> 1 * 1 + 9 * 0 = 1
    10, // B -> 11 -> 1 * 1 + 9 * 1 = 10
    19, // C -> 12 -> 1 * 1 + 9 * 2 = 19
    28, // D
    37, // E
    46, // F
    55, // G
    64, // H
    39, // I -> 34 -> 1 * 3 + 9 * 4 = 39
    73, // J
    82, // K
    2, // L
    11, // M
    20, // N
    48, // O -> 35 -> 1 * 3 + 9 * 5 = 48
    29, // P
    38, // Q
    47, // R
    56, // S
    65, // T
    74, // U
    83, // V
    21, // W -> 32 -> 1 * 3 + 9 * 2 = 21
    3, // X
    12, // Y
    30 // Z -> 33 -> 1 * 3 + 9 * 3 = 30
  ]

  const RESIDENT_CERTIFICATE_NUMBER_LIST = [
    0, // A
    1, // B
    2, // C
    3, // D
    4, // E
    5, // F
    6, // G
    7, // H
    4, // I
    8, // J
    9, // K
    0, // L
    1, // M
    2, // N
    5, // O
    3, // P
    4, // Q
    5, // R
    6, // S
    7, // T
    8, // U
    9, // V
    2, // W
    0, // X
    1, // Y
    3 // Z
  ]

  const getCharOrder = (s: string, i: number) =>
    s.charCodeAt(i) - 'A'.charCodeAt(0)

  const firstDigit = TAIWAN_ID_LOCALE_CODE_LIST[getCharOrder(input, 0)]

  const secondDigit = isNaN(parseInt(input[1], intRadix)) // if is not a number (舊版居留證編號)
    ? RESIDENT_CERTIFICATE_NUMBER_LIST[getCharOrder(input, 1)]
    : parseInt(input[1], intRadix)

  const rest = input
    .substring(2)
    .split('')
    .map(n => parseInt(n, intRadix))

  const idInDigits = [firstDigit, secondDigit, ...rest]

  // Step 2: 第 1 位數字 (只能為 1 or 2) 至第 8 位數字分別乘上 8, 7, 6, 5, 4, 3, 2, 1 後相加，再加上第 9 位數字

  const ID_COEFFICIENTS = [1, 8, 7, 6, 5, 4, 3, 2, 1, 1]
  const sum = zipWith(idInDigits, ID_COEFFICIENTS, multiply).reduce(add, 0)

  // Step 3: 如果該數字為 10 的倍數，則為正確身分證字號

  return sum % 10 === 0
}

function zipWith<T, R>(a1: T[], a2: T[], f: (v1: T, v2: T) => R): R[] {
  const length = Math.min(a1.length, a2.length)
  const result: R[] = []

  for (let i = 0; i < length; i++) result[i] = f(a1[i], a2[i])

  return result
}

function multiply(a: number, b: number) {
  return a * b
}

function add(a: number, b: number) {
  return a + b
}
