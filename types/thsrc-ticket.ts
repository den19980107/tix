export type ThsrcTicket = {
  id: number
  from: string
  to: string
  departureDay: Date
  startTime: string
  endTime: string
  execDay: Date
  creatorId: number
  captcha: string
  jsessionId: string
  status: ThsrcTicketStatus
}

export type CreateThsrcTicket = {
  from: string
  to: string
  departureDay: Date
  startTime: string
  endTime: string
  execDay: Date
  creatorId: number
  captcha: string
  jsessionId: string
  status: ThsrcTicketStatus
}

export enum ThsrcTicketStatus {
  pending = "pending",
  complete = "complete",
  failed = "failed"
}

export function getThsrcStatusName(status: ThsrcTicketStatus): string {
  switch (status) {
    case ThsrcTicketStatus.pending:
      return "準備中"
    case ThsrcTicketStatus.complete:
      return "完成"
    case ThsrcTicketStatus.failed:
      return "失敗"
  }
}

export function getThsrcStationName(stationId: string): string {
  switch (stationId) {
    case "1":
      return "南港"
    case "2":
      return "台北"
    case "3":
      return "板橋"
    case "4":
      return "桃園"
    case "5":
      return "新竹"
    case "6":
      return "苗栗"
    case "7":
      return "台中"
    case "8":
      return "彰化"
    case "9":
      return "雲林"
    case "10":
      return "嘉義"
    case "11":
      return "台南"
    case "12":
      return "左營"
  }

  return "未知"
}
