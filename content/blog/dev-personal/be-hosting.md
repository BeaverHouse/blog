---
slug: "231004-1"
title: "Backend Hosting에 대하여"
description: ""
summary: "너무나도 적은 선택지"
date: 2023-10-04T00:00:00+09:00
lastmod: 2023-10-04T00:00:00+09:00
draft: false
weight: 50
images: []
categories: ["Dev - Personal"]
tags: ["Backend", "Hosting"]
contributors: ["LHU"]
pinned: false
homepage: false
---

---

<br>

최근에 이것저것 정리하면서 어릴 때부터 쓰던 메일 하나를 변경했는데,  
해당 메일로 가입한 Oracle Cloud 계정이 비활성화된 것을 확인했습니다.

처음에는 단순히 비밀번호를 잊어버려서 그런 거라 생각했는데,  
VM으로 띄운 API까지 접근이 안 되는 것을 확인했고  
아마도 계정과 VM 자원이 회수 or 비활성화된 것으로 보입니다.  
( 주기적으로 작동하는 코드가 있어 계정이 살아 있으면 회수 대상은 아니었을텐데... )

이로 인해 Hosting Service 관련 고민을 하면서, 찾아본 내용과 결론을 적은 글입니다.

{{< callout context="caution" title="주의" icon="alert-triangle" >}}
<small>이 글에서 이야기하는 Hosting은 개인 레벨, 소규모 서비스에 해당되며
<br/>대규모 서비스의 경우 이야기가 다를 수 있습니다.</small>
{{< /callout >}}

<br>

#### Hosting Service?

서버 컴퓨터의 일부, 혹은 전체를 사용자에게 임대해 주는 서비스를 말합니다.  
Hosting Service도 여러 분류가 있지만, 논점에서 벗어나기 때문에 생략하겠습니다.

개인이 직접 서버 자원을 구해서 서비스를 구축하는 것은 여러 제한사항이 걸리기 때문에 많은 사람들, 더 나가면 기업 레벨까지도 Hosting Service를 사용합니다. 이 블로그를 포함한 수많은 Github Pages도 Github가 제공하는 Web Hosting Service를 이용하고 있는 것입니다.

#### 널널한 Web Hosting, 빡빡한 Backend Hosting

개인 레벨에서 Web Hosting을 이용해 사이트를 띄우는 것은 어렵지 않습니다. major한 Service 한두개만 알고 있어도, 아무 문제가 없습니다. 저도 [Github Pages][ref0]와 [Netlify][ref1] 선에서 대부분의 F/E 배포 문제를 해결하고 있습니다.  
하지만 이제 B/E로 넘어가면, 사정이 달라집니다. 서버 + 더 나아가면 DB도 필요할 수 있는데, 제한적으로라도 무료 제공하는 곳이 많지 않습니다.

[무료 Backend Hosting Service 목록][ref2]  
( 최신화가 덜 되었을 수 있습니다. 댓글도 참조하면 좋습니다. )

AWS/GCP/Azure 에서도 Free Tier를 제공하긴 하는데, 기간제입니다.  
사실상 평생 무료는 Oracle Cloud 정도... VM 2대까지 무료입니다. GCP가 VM 하나를 제공하긴 하는데, 사양이 좋지는 않습니다.  
그리고 무료 서비스는 항상 정책이 바뀔 가능성이 있습니다. VM 사양이 변할 수도 있고, Heroku의 경우 Free Service를 제공하다가 2022년 완전 유료로 전환되었습니다.

<br>

#### Recommendation

Web을 배포할 방법은 많습니다. 저는 Github Pages와 Netlify만 쓰고 있지만, 본인 상황에 따라 골라 쓰면 됩니다.

B/E를 배포하는 방법은 다소 제한적입니다.

- 간단한 설정으로 작은 B/E 서버를 띄우는 게 목적이라면 (ex. 포트폴리오용), 여전히 일부 서비스들이 제한적인 Free Plan을 제공하고 있습니다. 앱만 작성하면 유지보수에 큰 공수가 들어가지 않는 것도 장점입니다. 예전에는 Heroku를 많이 사용했는데, 유료화 이후의 대체 수단으로 [Qoddi][ref3]나 [Fly.io][ref4] 정도가 많이 언급되는 것 같습니다.
- 정말 가벼운 앱이고 인지도 있는 쪽을 선택하고 싶다면, [GCP에서 작은 VM 하나를 무료로 제공][ref5]하긴 합니다.
- 무료 + 제한 없는 서버를 원한다면, 지금은 사실상 [Oracle Cloud][ref6]가 거의 유일하게 부합하는 서비스가 아닐까 생각됩니다.
- 사실 가장 편한 건 유료로 AWS/GCP/Azure를 사용하는 것이 아닐까 싶기도...

<br>

#### 개인적인 결론

다시 제 이야기로 돌아와서, 다시 Hosting을 해야 할지 고민을 해 봤습니다.

- Oracle을 지금까지 잘 써 오기는 했는데, 이번 일을 제외하더라도  
  올해 들어 틈나면 지속적으로 VM을 회수하려는 메일이 날아와서 꽤나 거슬렸습니다.
- 직접 개인 서버를 만들까도 생각해 보았지만, 아무래도 보안성이 걸렸습니다. Kubernetes 기반으로 구축해서 공유기 Port-forwarding까지 해본 적은 있는데, 인증서 + 외부 접속 제한 등은 처리해 본 적도 없고 하더라도 개인 레벨에서는 리스크가 크다고 생각해서...
- AWS Lambda 등의 Serverless Function도 선택지에 있었습니다. 사용해 본 경험도 있었습니다. 하지만 내려간 앱 중에 하나는 API 호출 최소화를 위해 schedule이 돌고 있었고, 다른 하나는 selenium을 사용해서 비교적 저사양인 Lambda 등에 올리기는 부적합했습니다.

이외에도 크고 작은 고민을 해 보고 결론을 내렸습니다.

- schedule이 있는 앱 하나는 가벼운 편이니 GCP Free VM으로 띄워 보고,  
  안 되면 서비스 종료를 하기로 했습니다.  
  ( 게임 관련 사이트인데, 대체할 수단이 많아서 괜찮을 듯...? )
- 다른 하나는 예전에도 selenium 때문에 무겁지만, 사용량은 적어서 VM에 올리는 건 부적합하다는 생각이 들긴 했습니다. 따로 local에서 최대한 편하게 자동화할 방법을 찾아 보기로 했습니다.

이 외에 더 필요하다면 Qoddi / Fly.io 등 새로운 Tool 위주로 사용하고,  
Oracle Cloud로 회귀하는 것은 최후의 수단이 될 것 같습니다.  
B/E Hosting Service가 상대적으로 접근성이 떨어질 수밖에 없다는 걸 머리로 알고는 있는데, 좀 더 제한이 적고 friendly한 서비스가 하나 정도는 나와 줬으면 하는 바람이 있네요.

[ref0]: https://pages.github.com/
[ref1]: https://www.netlify.com/
[ref2]: https://gist.github.com/bmaupin/d2d243218863320b01b0c1e1ca0cf5f3
[ref3]: https://qoddi.com/
[ref4]: https://fly.io/
[ref5]: https://cloud.google.com/free?hl=ko
[ref6]: https://www.oracle.com/kr/cloud/free/
