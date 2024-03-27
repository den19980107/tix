# Tix

A simple app for automatically booking tickets.

## Table of Contents

- [About the Project](#about-the-project)
- [Features](#features)
- [Demo](#demo)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)

## Features

This project supports automatically booking the following types of tickets

- [x] [THSRC](https://www.thsrc.com.tw/) 台灣高鐵
- [ ] [TRA](https://www.railway.gov.tw/tra-tip-web/tip) 台鐵
- [ ] [inline](https://inline.app/)
- [ ] [Tixcraft](https://tixcraft.com/) 拓元

## Demo

* Home page![截圖 2024-03-27 下午5.10.43](https://i.imgur.com/pmepya5.png)

* Booking page
  
  ![截圖 2024-03-27 下午5.11.24](https://i.imgur.com/WvBsDun.png)

* Settubg page
  
  ![截圖 2024-03-27 下午5.11.57](https://i.imgur.com/SaS5APi.png)

* Booking result
  
  ![IMG_5619](https://i.imgur.com/U4ALDNO.png)

## Getting Started

### Prerequisites

this repo is only the font end of `tix`, you should running the [tix-worker](https://github.com/den19980107/tix-worker) to do the booking jobs

### Installation

1. clone this project
   
   ```shell
   git clone https://github.com/den19980107/tix.git
   ```

2. install dependency
   
   ```shell
   npm install or yarn install
   ```

3. running locally
   
   ```shell
   npm run dev
   ```

4. build
   
   ```shell
   docker build --platform=linux/amd64  -t den19980107/tix .
   docker push den19980107/tix:latest
   ```

### 
