---
slug: "231222-1"
title: "Flutter API key에 대한 갑론을박"
description: ""
summary: ""
date: 2023-12-22T00:00:00+09:00
lastmod: 2023-12-22T00:00:00+09:00
draft: false
weight: 50
images: []
categories: ["Dev - Personal"]
tags: ["Flutter", "Security"]
contributors: ["LHU"]
pinned: false
homepage: false
---

---

최근에 전체적으로 개인 Repository의 코드 클리닝을 진행 중입니다.  
이 부분은 할 이야기가 많기 때문에, 기회가 되면 따로 글을 작성하려 합니다.

그렇게 코드를 열심히 살피던 중, 이전에 작업했던 Flutter 코드에서 보안 취약점이 감지되었다는 알림을 발견했습니다.

{{< zoomimg src="images/231222-1/1.png" caption="Github에서 감지한 보안 문제">}}

확인해 보니 Firebase 액세스에 필요한 API key였습니다.  
사실 작업한지 거의 1년 정도 된 코드라서 영향도는 거의 없겠지만 그래도 이 부분을 어떻게 처리할지 궁금해져서 조사해 보았는데, 이와 관련해서 수많은 논쟁이 오간 기록이 있었습니다. 그 내용이 꽤 흥미롭다고 생각해서, 간단하게나마 내용을 적어 보려고 합니다.

사실 Flutter를 계기로 이 내용을 찾게 되었지만, 다른 케이스에서도 통용되는 이야기일 것 같네요.

<br>

#### key로 인한 공격을 막는 법

[이 stackoverflow 질문][ref1]을 중심으로 거대한 폭풍(...)이 휩쓸고 간 흔적이 남아 있었습니다.

페이지를 살펴 보면 여러 의견이 있지만 대부분 동의할 만한 내용은 다음과 같았습니다.

1. key 정보는 Repository에 공개하지 않아도 앱 코드를 분석하여 얻어낼 수 있습니다.  
   사실상 완전히 가리는 것은 매우 힘들거나 불가능합니다.

   - 댓글에 의하면 Telegram 등 유명 앱도 API key 등이 하드코딩된 경우가 있다고 합니다.

2. 1번에 의해 누군가 악의를 가지고 접근한다면 어떻게든 공격 가능성은 있습니다.
3. 이를 막는 가장 좋은 방법은 **최대한 제약을 걸고, 최소한의 권한만을 부여하는 것**입니다. [API key의 경우 제한을 설정][ref2]할 수 있고, Firebase에서는 [보안 규칙][ref3]을 설정할 수 있습니다. Google이 아닌 다른 서비스에서도 비슷한 옵션을 최대한 활용하는 것이 좋습니다.

결론은, 작정하고 key를 통한 공격을 **시도부터 막을 방법은 사실상 없습니다.**  
그래서 대신 key의 용도와 권한을 최대한 제한하여 알맞은 용도로만 사용될 수 있도록 제어해야 합니다.

<br/>

#### API key 공개하면 망하는 거 아닌가요?

사실 위의 내용보다도 많은 부분이 신경쓰실 내용입니다. 저도 그렇고요.

저 명제에 동의를 하시는 분들도 국내외 막론하고 많습니다.  
당연히 숨겨야 하는 거다, 최소한 올릴 거면 암호화를 해야 한다부터 시작해서 극단적으로 API key를 올린 순간 잘못된 것이기 때문에 즉시 Repository를 삭제하고 새로 만들어야 한다는 의견도 있습니다.  
여러 커뮤니티에서도 위 stackoverflow 링크와, [다른 질문][ref4] 그리고 아주 많은 곳에서 아주 열띤 논쟁이 오간 것을 볼 수 있습니다. 모든 링크와 reference를 모두 보여 드리려면 끝도 없기 때문에 이는 생략하기로 하고, 어느 정도 읽어 본 뒤의 저의 생각은 **일단 "망했다"까지는 너무 갔다는 입장입니다.**

이 부분에서 key 공개를 옹호하는 측의 이야기를 정리해 보면 다음과 같습니다.

- 위에서 말했듯이, key를 공개하지 않아도 다른 수단을 통해 얼마든지 찾을 수 있습니다.  
  반대 의견이나 예방책 중에서 서버에서 key를 받아 쓰거나 빌드할 때마다 key를 갈아끼우는 등 dynamic하게 변경한다, 다른 적당한 곳에 따로 저장한다 등의 이야기를 볼 수 있는데 이것도 엄밀히 따져 보면 근본적인 해결책이 될 수는 없습니다. 통신 중간에 key를 가로챌 수도 있을 것이고 마음만 먹으면 key를 가로챌 방법은 너무 많습니다.  
  그래서 key를 공개하지 않는 것이 노출을 줄이고 트집거리를 없애는 것은 분명히 맞지만, 공격 가능성을 없애 주지는 않고 key 하나 숨긴다고 공격을 포기하지도 않을 겁니다.
- [Firebase 공식 문서][ref5]에서 이러한 파일이 unique한 값은 포함하지만, 보안 비밀은 아니라고 언급하고 있습니다. [Firebase 엔지니어가 직접 큰 문제가 아니라고 언급한 전적][ref6]도 있습니다.
- 몇몇 반대 의견은 key를 별도의 extra key로 암호화해야 한다는 주장을 펼치기도 하는데, 그렇게 하면 암호화된 것은 보호할 수 있겠지만 extra key에 대해 똑같은 문제가 남게 됩니다. 사실상 도돌이표인 셈입니다. 오히려 잘못 관리한다면 암호화 방법까지 외부에 노출하는 셈이 되어 버리기 때문에 더 상황이 나빠질 수도 있습니다.

옹호하는 측도 이걸 무조건 Repository에 올려라! 주장하는 것은 아닙니다. **오픈소스 프로젝트를 비롯한 공개 범위가 넓은 곳에 자신의 key를 버젓이 올리는 것은 당연히 피해야 합니다. 만약에 key를 서버 등에 저장할 수 있다면, 그 쪽에 저장하는 게 무조건 좋습니다.** 이런 기초적인 부분까지 부정하는 것이 아닙니다. 다만 Firebase가 제공하는 방식이 API key를 client에서 노출하기 쉬운 환경을 초래하기 때문에 어쩔 수 없는 부분이 있고, 그래서 Firebase 측에서도 민감 정보를 담지 않았습니다. 그리고 이에 대한 대비책은 보안 규칙, API key 권한 제한, 기타 다른 방어기제로 막아야 하는 것이지 key를 자신의 개인 Repository에 올린다고 해서 대세에 큰 영향을 미치지 않는다는 맥락으로 저는 해석했습니다.

<br/>

#### 개인적인 생각, 결론

보안은 언제나 신경을 많이 써야 할 요소입니다. 실제 서비스라면 더더욱 그렇습니다.  
만약에 회사 프로젝트라거나, 더 큰 스케일의 내용이었다면 이 부분에 대해 진지하게 고민해야 했을 것입니다. 특히나 API 권한 설정이나 보안 규칙 같은 것은 기본적인 제약만 걸어 보았는데, 사실상 이쪽이 가장 효과적인 방어책이기 때문에 공부를 더 많이 해야 할 것입니다. API key를 가리는 문제에 대해서도 한 두번 더 생각을 했을 것 같습니다. 너무 과도할 수 있고, 호들갑일 수 있는데 **그래도 당하고 후회하는 것보다는 낫기 때문입니다.**

하지만 저와 같은 **소규모 개인 프로젝트에서의 API key 노출에 대해서는 일단 저는 critical하지 않다는 결론을 내렸습니다.** 공개하는 것이 좋다는 뜻이 아닙니다. API key를 포함한 Secret 정보의 중요성을 부정하지도 않습니다. 다만 이런 케이스처럼 의도치 않게 노출되는 정보가 존재하는데, 프로젝트의 규모가 커지면 모르겠습니다만 적어도 소규모 앱에서 이로 인한 문제는 크지 않다는 것입니다. Firebase 개발자들도 바보가 아니기 때문에 여기에 민감 정보를 넣어 두지 않았고, 특히나 이런 프로젝트를 대상으로 "굳이" 보안 취약점을 찾아내 공격할 이유도 없습니다. 업보가 쌓인 게 아니라면 말이죠...

이것과 별개로 Repository에 있는 key 정보는 삭제를 할 예정입니다.  
이미 관리를 안 하고 있는 프로젝트에서 민감 정보를 남길 이유도 없기 때문입니다. 급하지는 않으니 주말에 천천히 작업할 예정입니다.

개인적으로 여러 의견들을 살펴 보고, 방어책도 찾으면서 나름대로 앞으로 어떻게 해야겠다는 결론을 내렸기 때문에 의미있었던 것 같습니다.

[ref1]: https://stackoverflow.com/q/45508516
[ref2]: https://cloud.google.com/docs/authentication/api-keys?hl=ko#api_key_restrictions
[ref3]: https://firebase.google.com/docs/rules?hl=ko
[ref4]: https://stackoverflow.com/q/37358340
[ref5]: https://firebase.google.com/docs/android/setup?hl=ko#add-config-file
[ref6]: https://groups.google.com/g/firebase-talk/c/bamCgTDajkw
