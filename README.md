# moebius

A synchronized animation first countdown timer with IANA timezone support that might count to infinity and beyond.

![img](https://47235-3000.2.codesphere.com/img/theme_astronaut.webp)

## *WIP*

This repository is a work in progress

## Demo

You can find a live demo here: [https://47235-3000.2.codesphere.com](https://47235-3000.2.codesphere.com) (hosted on [Codesphere](https://codesphere.com)).

## Framework

moebius is written in [typescript](https://www.typescriptlang.org/) using [Nuxt3](https://nuxt.com/) and [Tailwind](https://tailwindcss.com/).

## Deployment

moebius is generated as SPA (static site) and does neither rely on a database nor a backend.

## Features

- Theme support
- Configurable
- Synchronized
  - Does not depend on correct system clock
  - Executes at full seconds (unix cron like)
- IANA Timezone support
  - Countdown will wordlwide end at the same moment, no matter the timezone a user has

## TODO
- Add optional callback URL on finish
- Refactor default values 
  - Defaults to `2024-01-01 00:00:00`

## Configuration

moebius can be configured using query strings. \
The following query strings are available:
- endDate: DateTime = the date time to countdown towards in a [supported](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date?retiredLocale=de#date_time_string_format) format, defaults to `2024-01-01 00:00:00`
- debug: Boolean = show debug information, defaults to `false`
- timezone: String = any IANA timezone, defaults to `local timezone` of the client
  - Defines the timezone of the given date

## Synchronization

The current date-time is synchronized before the timer starts using [nptjs.org](https://www.ntpjs.org/) against trusted servers. \
It is therewith independent from the local systems time.

### Heat up

The timer may starts delayed (heat-up) as it is synchronizing to the next exact second like a unix cron would do.

## Themes

moebius comes with support to create 'Themes' (not really a theme engine) in form of a Nuxt component. \
It does however come with a default theme:

### Astronaut

The Astronaut has been downloaded from [uhdpaper.com](https://www.uhdpaper.com/2023/07/astronaut-4k-7111l.html). \
It has been slightly modified by removing the Stars in favor of the self-animated 'space-dust'.

The head of the Astronaut is masked and doubled to give the Theme more depth. This way, the dust randomly moves in before and behind the head itself.