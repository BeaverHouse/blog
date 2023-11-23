---
slug: "231123-1"
title: "Multipass + K3S로 K8S 환경 구축하기"
description: ""
summary: ""
date: 2023-11-23T00:00:00+09:00
lastmod: 2023-11-23T00:00:00+09:00
draft: false
weight: 50
images: []
categories: ["Dev - Personal"]
tags: ["K3S", "Kubernetes", "Multipass"]
contributors: ["LHU"]
pinned: false
homepage: false
---

---

개인 환경에서 K8S(Kubernetes) 환경을 구축하는 방법은 많습니다. 저는 한두 달 전까지 Window 환경에서 100% 작업을 했었고, AWS/GCP/Azure 등의 클라우드 공급자를 사용하지 않는다는 가정 하에 VirtualBox나 Hyper-V 등을 활용하여 환경을 구축했던 경험이 있습니다. 하지만 이 경우 일부 과정에서 프로그램 혹은 Windows 기능에 의존을 해야 한다는 문제점이 있었습니다. VirtualBox는 초기 세팅이나 포트포워딩 등의 작업을 UI 상에서 진행했고, Hyper-V 역시 가상 스위치 등 Windows에서만 사용되는 개념을 이용해야 한다는 것이 껄끄러웠습니다.  
최근에 맥북을 구매한 뒤로 K8S 환경을 구축할 방법을 찾던 중 `multipass`를 알게 되었습니다. 실제로 환경을 구축해 본 결과 이전 방법보다 확실히 만족스러운 경험을 할 수 있었고, 제가 거쳤던 과정을 간단히 적어 보려고 합니다.

<br>

#### Why [Multipass][ref0]?

Multipass는 Canonical에서 만든 Ubuntu VM 구성 프로그램입니다.  
Multipass를 사용하고 느꼈던 장점은 다음과 같습니다.

- CLI를 통한 편리한 사용과 간소화된 작업이 가능합니다.
- Mac과 Windows 모두 지원되며 사용방법도 거의 동일합니다.
- 지금까지 거쳤던 방법들 중 가장 실무와 가깝다고 느꼈습니다.

자세한 사용법은 다른 글이나 문서에도 잘 나와 있기 때문에, 간단하게만 기술하려 합니다.

#### Why [K3S][ref1]?

K8S를 구축하는 데에는 K3S를 사용하기로 하였습니다. 사실 이 부분은 구성 Tool에 따라 모두 장단점이 있고, 어떤 것을 골라도 무방하다고 생각합니다. 그럼에도 K3S를 선택한 이유는 다음과 같습니다.

- **가볍습니다** (중요)
- 기본으로 `containerd`를 사용하기 때문에 Docker 없이도 구동이 가능합니다.  
  특히 Windows에서 Docker Desktop이 개발 외 작업을 할 때 다른 앱과 충돌할 때도 있고, 개인적으로 사용 경험이 그리 좋지 않아서 큰 가산점 요소가 되었습니다. 물론 Docker로 설정 변경도 가능합니다.
- 주변에서도 사용 사례가 있어서, 이 기회에 써 보고 싶었습니다.

<br>

#### 실제로 체험해 보기

우선 Multipass를 설치합니다. 윈도우는 설치 파일이 따로 있고, Mac은 `homebrew`로 쉽게 설치할 수 있습니다.

```
brew install —cask multipass
```

`multipass find` 명령어로 설치 가능한 Ubuntu 이미지들을 조회할 수 있습니다.  
저는 가장 최신 버전인 23.04(lunar)를 설치하기로 했습니다. 아래 명령어에서 자원 설정은 환경에 맞게 변경하시면 됩니다.

```
multipass launch --name k3s-master --memory 2G --disk 10G --cpus 2 lunar
```

VM 세팅 조정이 필요하다면 VM을 멈추고 설정값을 바꾸어 재기동시키면 됩니다. ([Docs][ref2])  
이외에도 Multipass 명령어에 대해서는 문서에서 친절하게 설명되어 있습니다.

이제 만들어진 VM에 접속하여 K3S를 설치합니다. 특별히 커스텀을 하지는 않았습니다.

```
multipass shell k3s-master

# now on k3s-master VM
curl -sfL https://get.k3s.io | sh -

k3s --version

(ctrl + D to logout)
```

이렇게 설정한 K3S 환경은 기본적으로 VM 내에서만 접근이 가능합니다.  
이 상태는 너무 불편하기 때문에, K8S config 파일을 호스트 컴퓨터 설정 파일로 옮겨 VM 외부에서도 접근 가능하도록 했습니다. K3S의 경우 `/etc/rancher/k3s/k3s.yaml`에 설정 파일이 존재하는데 이를 호스트 컴퓨터로 옮겼습니다.

```
sudo cp /etc/rancher/k3s/k3s.yaml /tmp
cd tmp
chmod 777 k3s.yaml

sudo multipass copy-files k3s-master:/tmp/k3s.yaml Downloads/1.yaml
```

`.yaml` 파일을 열어 보면 config 정보가 나오는데, `localhost`나 `127.0.0.1`로 되어 있는 연결 정보는 VM에 할당된 IP로 변경한 후, 호스트 컴퓨터의 config에 반영해 주시면 됩니다. context, user 등의 정보도 자유롭게 변경하시면 됩니다.

{{< zoomimg src="/231123-1/ip.jpg" caption="VM list에 나오는 IP를 적으시면 됩니다.">}}

<br>

이제는 `kubectl`, `helm` 등 호스트에 설치된 Tool로 VM 환경을 관리할 수 있습니다.  
저는 테스트를 위해 Mac에서는 [OpenSearch][opensearch], Windows에서는 [ArgoWorkflows][argowf]를 기동시켜 보았습니다. Helm Chart는 검색으로 쉽게 찾을 수 있기 때문에 이 글에서는 생략하겠습니다.

{{< zoomimg src="/231123-1/multipass-win.jpg" caption="Windows에서 실행된 Argo">}}
{{< zoomimg src="/231123-1/multipass-mac2.jpg" caption="Mac에서 실행된 OpenSearch">}}

<br>

이렇게 아주 기본적인 세팅이 완료되었습니다. 이후의 활용성은 무궁무진합니다. 컴퓨터 사양이 허락하는 하에서 여러 개의 VM을 띄워서 Multi-cluster 환경을 구축할 수도 있고, [MetalLB][metallb]를 설정한 뒤 공유기 포트포워딩, IP/도메인 할당 등의 과정을 거치면 실제 서비스 노출도 이론상 가능합니다. 저도 아직 K8S 기반 환경에 대해서는 배울 내용이 많기 때문에, 활용할 방법을 모색해 보아야 할 것 같습니다.

[ref0]: https://multipass.run
[ref1]: https://k3s.io
[ref2]: https://multipass.run/docs/modify-an-instance
[opensearch]: https://opensearch.org
[argowf]: https://argoproj.github.io/argo-workflows/
[metallb]: https://metallb.universe.tf
