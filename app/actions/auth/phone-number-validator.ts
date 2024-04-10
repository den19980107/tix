export function isPhoneNumberValid(phoneNumber: string): boolean {
  if (phoneNumber.length != 10) {
    return false
  }

  if (!phoneNumber.startsWith("09")) {
    return false
  }

  return true
}
