---
slug: "231007-1"
title: "Google Cloud Platform을 사용해 보았습니다."
description: ""
summary: ""
date: 2023-10-07T00:00:00+09:00
lastmod: 2023-10-07T00:00:00+09:00
draft: false
weight: 50
images: []
categories: ["Dev - Personal"]
tags: ["Backend", "Hosting", "GCP"]
contributors: ["LHU"]
pinned: false
homepage: false
---

---

GCP의 무료 VM을 사용하기 위해 가입을 했습니다.  
원래는 AWS, Oracle Cloud 정도를 사용했는데, 역시 환경이 달라지니 시행착오가 어느 정도 있었습니다.

<br>

#### [GCP][ref0] 사용해 보기

가입 절차는 생략하겠습니다.  
다른 곳에서 사용했던 Google 결제 프로필이 있으면 단계가 더 줄어들어 진행이 빨랐습니다.

VM 생성도 UI를 따라 그대로 진행했습니다.  
다만, 저처럼 Free VM을 생성하려는 경우 몇 가지 조건이 있습니다.  
**[구글 문서에 지역, 머신 유형, 디스크 등의 제한이 있는데][ref1]**, 참고해서 만드셔야 합니다.

{{< zoomimg src="/231007-1/gcp1.png" caption="Free 설정을 했지만 요금이 뜨는 상태">}}
제대로 설정을 하고도 요금이 0으로 뜨지 않았는데,  
찾아보니 **표시는 이렇게 되지만 추후에 정산이 되지 않는다고 합니다.**  
일단 3개월간은 체험용 Credit이 대신 나갈 테니... 추후에 확인해야 할 것 같습니다.

만들어진 VM에는 따로 접속 설정을 하여 PuTTY 등의 프로그램으로 접속해도 되고,  
Google Web을 통해서도 자체 SSH로 접속이 가능합니다.

방화벽은 **VPC 네트워크 - 방화벽 - 방화벽 규칙** 부분을 수정하면 됩니다.  
특정 포트를 개방하거나 접속 IP 대역을 제한하는 등, 타 Platform에도 있는 기능입니다.

생성된 VM에는 임시 외부 IP가 설정되어 있는데, 배포와 지속적인 사용을 위해서는 고정 IP를 설정해야 합니다.  
**VPC 네트워크 - IP 주소**에서 외부 고정 IP를 예약하면 됩니다.  
기본적으로 고정 IP에는 요금이 부과되지만, [Free VM은 예외입니다.][ref1]

{{< zoomimg src="/231007-1/gcp2.png" caption="도메인 설정까지 하고 1주일만에 살아난 API">}}

<br>

#### 개인적인 GCP의 장단점

**※ 장점**

- VM + External IP를 무료로 하나 제공해 주는 것은 역시 매력적입니다.  
  기기 사양이 조금 떨어져도 가벼운 Python app 정도는 문제가 없었습니다.
- 직접 작성해 놓은 Docs가 많습니다. Google 전반의 특징이기도 한 것 같습니다.
- 타 Platform에 비해 UI와 Web Console이 사용하기 편했습니다.

**※ 단점**

- 아무래도 Azure와 함께 인지도와 사용 사례가 적은 느낌이 있습니다.  
  역시 가장 많은 ref를 가진 건 AWS...
- Docs가 많긴 한데, 원하는 내용을 찾는 것이 간단하지는 않았습니다. GCP뿐만이 아닌 대규모 Cloud Platform 전반의 문제라고 생각하긴 합니다.  
  그리고 Firebase를 사용하면서도 느낀 점이지만 자체 CLI를 사용하는 가이드가 상당 부분 섞여 있어 Standard한 방법을 찾는 데 방해가 되는 것도 저에게는 마이너스 요소였습니다.
- 무료 VM 외에 Free Tier가 강력한지는 개인 레벨에서 느끼기 쉽지 않은 것 같습니다.  
  소규모라면 Oracle Cloud(평생) / AWS(1년)이 더 쓰기 좋다고 생각합니다.  
  3개월간 $300 Free Credit이기 때문에, 조직 이상 레벨에서 시스템을 구축하기 전 운용 테스트를 할 때는 도움될 것 같습니다.

<br>

#### 기타 여담

- 서비스 재배포를 하는 김에, 배포할 app의 code cleaning도 약간 했습니다.
- 사실 가장 애를 먹었던 부분은, GCP 자체보다는 VM Linux 세팅이었습니다.  
  Cloud Service별로, OS별로 Git/Python 기본설치 여부, 지원 버전, default 버전값 등이 모두 달라서 생기는 문제였습니다.
  예를 들어, 저는 Python3.9로 개발을 했는데, GCP의 Ubuntu20.04의 경우 `python3`, `python3-pip` 버전 명시를 하지 않으면 3.8이 설치되었고 3.9를 지정해서 설치하려고 했더니 `python3.9-distutils`이 지원되지 않았습니다.  
  생각해보니 이전 VM이 Oracle이었는데 그 때는 Ubuntu22.04였고 Python 3.9가 기본적으로 깔려 있어서 편하게 했던 것 같네요...  
  덕분에 한번에 package를 설치하는 shell script를 짜놓고도 제대로 사용하지 못했고 결국 수동 <span style="color: gray">clean/install/불필요 package 주석처리</span> 등으로 해결했습니다. 기본적인 숙련도를 높이고, dev/prd 환경을 최대한 맞추려는 노력이 필요할 것 같습니다.
- https는 `certbot`으로 적용했습니다. GCP에서도 LB로 설정 가능하긴 합니다.  
  ref가 많지만, 소규모 앱을 사용할 때는 많이 사용하니 따로 조용히 정리해 두려고 합니다.

[ref0]: https://cloud.google.com/?hl=ko
[ref1]: https://cloud.google.com/free/docs/free-cloud-features?hl=ko#compute
