---
slug: "231012-1"
title: "Selenium으로 반복 작업 줄이기"
description: ""
summary: ""
date: 2023-10-12T00:00:00+09:00
lastmod: 2023-10-12T00:00:00+09:00
draft: false
weight: 50
images: []
categories: ["Dev - Business"]
tags: ["Python", "Selenium"]
contributors: ["LHU"]
pinned: false
homepage: false
---

업무 관련으로 작성하는 첫 글입니다.   
예전에는 업무 관련 내용을 Medium에 프로젝트 후기 비슷하게 작성을 했는데, 아니다 싶어 다 날렸습니다. 다시 Remind해가며 중요한 것들은 기록해야 할 것 같습니다.   
우선은 현재 사용중이고, 비교적 가벼운 내용으로 시작하려고 합니다.

#### [Selenium][ref1] ??
Selenium은 Web App 자동화, 테스트를 위한 Framework입니다.   
저는 Python으로 사용중이지만, JS나 Java, C# 등에서도 사용할 수 있습니다.   

Selenium은 처음에는 Web Test를 위해 만들어졌지만, 다른 용도로도 많이 사용되고 있습니다. Selenium을 사용하면 웹사이트와 직접 interaction을 할 수 있기 때문에, 수행 가능한 작업의 폭이 매우 넓어집니다.

{{< zoomimg src="/231012-1/1.png" caption="공식 홈페이지에서도 다양한 사용성을 언급하고 있습니다.">}}

<br>

#### Selenium과 [BeautifulSoup4][ref2]
Selenium하면 같이 언급이 많이 되는 것으로 BeautifulSoup4, 일명 bs4가 있습니다.

대상 웹페이지가 정적 페이지이거나, 따로 상호작용이 필요없다면 bs4로 충분합니다.   
오히려 Selenium 구동에는 webdriver가 필요하기 때문에, bs4로 100% 가능한 것을 Selenium으로 수행하는 것은 다소 낭비라고 할 수도 있겠습니다.   

다만 동적 페이지를 다루게 되면 상황이 달라집니다. 정보를 얻기 위해 로그인을 수행해야 한다거나, 버튼을 누르는 등 상호작용을 하지 않으면 페이지가 로드되지 않는 등의 상황에 놓이게 되면 Selenium을 사용해야 합니다. 이런 경우 Selenium을 단독으로 사용하거나, Selenium으로 작업을 끝낸 페이지를 bs4 Object로 만들어 정보를 얻어내는 식으로 같이 사용합니다.

<br>

#### Selenium 2% 더 사용하기
이 글에서는 Selenium Python의 자세한 사용법을 하나하나 설명하지는 않습니다.   
대신 사용을 하면서 몇 가지 유용했던 내용을 적어 놓으려 합니다.

- **`driver.quit()` 적절히 사용하기**    
Selenium의 webdriver를 완전히 종료하는 함수입니다.   
`driver.close()`도 많이 쓰게 될텐데, 이는 현재 세션을 종료시키는 함수입니다.   
로컬 환경이나 여유로운 리소스에서 Selenium을 돌린다면 중요한 내용이 아닐 수 있습니다. 하지만 **작업이 길어질 때, 한정된 리소스에서 프로세스를 돌려야 할 때, 로컬이 아닌 VM 상에서 돌려야 할 때**는 `driver.quit()`을 적절히 사용해 사용하지 않는 프로세스를 없애 주어야 OOM을 방지할 수 있습니다.   
단, `driver.quit()`을 사용할 경우 여러 개의 세션을 사용중이었다면 모든 세션을 날려 버리기 때문에, 일부 작업만을 종료시키고 다른 작업을 계속 진행해야 한다면 그 때는 `driver.close()`를 사용해야 합니다.
- **드라이버 버전 자동 관리하기**   
Selenium은 구동 시 사용할 브라우저의 webdriver를 필요로 합니다.   
문제는 브라우저와 webdriver 버전이 다를 경우 오류가 발생하기 때문에 이를 맞춰 주어야 합니다. 방법은 크게 2가지가 있습니다.
  - `webdriver-manager` 등의 추가 package를 사용합니다.   
  - [Selenium 4.6.0 이상에서 자체 지원하는 Selenium Manager를 사용합니다.][ref3]
- Chrome의 경우, 버전 115 이상부터 Google에서 [Chrome for Testing][ref4]을 새로 공개하여 이 곳에서 최신 드라이버를 받도록 변경되었습니다. 다운로드 링크가 변경된 덕분에 과도기 시점에 webdriver 다운로드가 되지 않아 Selenium을 구동하려면 강제로 낮은 버전에서 구동해야 하는 문제가 있었습니다.   
현재는 시간이 어느 정도 경과되었기 때문에 package들이 모두 대응을 완료한 것으로 알고 있습니다. 혹시 Chrome 구동에 문제가 있다면 드라이버 관리 패키지가 해당 시점 이후 release된 버전인지 확인해 보시기 바랍니다.
- Selenium에서 상호작용을 한 뒤에, 대기를 해야 하는 경우가 있습니다.   
가장 이상적인 것은 Selenium에서 제공하는 [Waiting Strategy][ref5]를 사용하는 것입니다.   
Implicit Waits는 전역으로 적용되고, 페이지 로딩이 완료될 때까지 설정한 시간만큼 대기합니다. 반면에 Explicit Waits는 대기할 시점을 정할 수 있고, timeout 내 특정 조건이 만족될 때까지 대기합니다.
다만, 주의해야 할 점이 있습니다.
  - 둘을 동시에 사용하면 두 Waiting Process가 모두 작동해 예상보다 긴 대기시간이 생길 수도 있습니다.
  - Wait은 확실하게 설정해야 합니다. **특히 Explicit Waits은 자신이 원하는 확실한 진행 조건을 알고 있을 때 사용하는 것이 좋습니다.** 그렇지 않다면 오히려 `time.sleep()`을 사용하는 것보다 Process의 안정성이 떨어지는 경우가 생길 수도 있습니다.

<br>

#### 실무 사용 사례
현재 실제로 Selenium Python을 실무에 사용중입니다.   

ES나 Grafana, 기타 로그 등을 매일 모니터링하는 업무가 있는데, 전임자에게 인수인계를 받을 때에는 모든 작업이 수동이었습니다. 인계를 받은 이후 ES, Grafana에 접속해야 하는 것들은 Selenium으로 처리하고, 그 외는 ES Query나 API를 직접 호출해 데이터를 얻는 방식으로 변경하였습니다. HTML에서 추출할 데이터는 많지 않아 bs4는 따로 사용하지 않았습니다.  
변경 이전에는 20~30분 이상 걸렸던 작업이 지금은 10분 이내로 단축되었고, Process가 돌아가는 동안 다른 작업도 할 수 있게 되었습니다.   

그 외에도 개인적인 자동화 프로세스에서 Selenium을 잘 사용하는 중입니다.   
다만 무료 VM에서 Selenium을 몇 번 구동시켜 본 결과 버거운 느낌이 있어서 (Chrome 자체가 많이 무겁습니다) 당분간은 Local 환경에서 많이 사용하게 될 것 같네요.

[ref1]: https://www.selenium.dev/
[ref2]: https://pypi.org/project/beautifulsoup4/
[ref3]: https://www.selenium.dev/blog/2022/selenium-4-6-0-released/
[ref4]: https://github.com/GoogleChromeLabs/chrome-for-testing
[ref5]: https://www.selenium.dev/documentation/webdriver/waits/