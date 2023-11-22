---
slug: "231123-1"
title: "Multipass + k3s로 쿠버네티스 환경 구축하기"
description: ""
summary: ""
date: 2023-11-23T00:00:00+09:00
lastmod: 2023-11-23T00:00:00+09:00
draft: false
weight: 50
images: []
categories: ["Dev - Personal"]
tags: ["k3s", "kubernetes"]
contributors: ["LHU"]
pinned: false
homepage: false
---

---

개인 환경에서 쿠버네티스 환경을 구축하는 방법은 많습니다. 저는 한두 달 전까지 Window 환경에서 100% 작업을 했었고, AWS/GCP/Azure 등의 클라우드 공급자를 사용하지 않는다는 가정 하에 VirtualBox나 Hyper-V 등을 활용하여 환경을 구축했던 경험이 있습니다. 하지만 이 경우 일부 과정에서 프로그램 혹은 Windows 기능에 의존을 해야 한다는 문제점이 있었습니다. VirtualBox는 초기 세팅이나 포트포워딩 등의 작업을 UI 상에서 진행했었고, Hyper-V 역시 가상 스위치 등 Windows에서만 사욛되는 개념을 이용해야 한다는 것이 껄끄러웠습니다.  
최근에 맥북을 구매한 뒤로 K8S 환경을 구축할 방법을 찾아보던 중 `multipass`를 활용하는 방법을 발견하게 되었습니다. 실제로 환경을 구축해 본 결과 이전 방법보다 확실히 만족스러운 경험을 할 수 있었고, 제가 거쳤던 과정을 간단히 적어 보려고 합니다.

<br>

Content
