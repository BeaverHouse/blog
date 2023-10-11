---
slug: "231002-1"
title: "블로그 Custom Phase 1-1"
description: ""
summary: "utterances와 Github Action, Image Zoom"
date: 2023-10-02T00:00:00+09:00
lastmod: 2023-10-02T00:00:00+09:00
draft: false
weight: 50
images: []
categories: ["Dev - Blog"]
tags: ["Github Blog", "Hugo", "Doks", "utterances", "Github Action", "medium-zoom"]
contributors: ["LHU"]
pinned: false
homepage: false
---

---

<br>

아무리 숨은 블로그여도, 편의기능은 필요하다고 생각해 작업을 했습니다.   
그리고 custom domain 관련 문제가 있어서 deploy option을 수정했습니다.

<br>

#### 댓글 - [utterances][ref1]
같이 많이 거론되는 [Disqus][ref2]는 UI가 마음에 들지 않았습니다.   
[Guest Comment 기능 구현이 가능하다고 하지만][ref3], 개발자로서 댓글을 구현하는데 Github Auth 정도의 제한은 괜찮다고 생각했습니다.

공식 Readme에도 나와 있지만, Github Issues 기능을 댓글로 활용합니다.   
실제로 [Github Issues API][ref4]를 소스 내에서 호출하는 것을 확인할 수 있었습니다.   
GitLab, Bitbucket 등 다른 서비스에서도 비슷한 API를 활용할 수 있는데,   
정책을 잘 수립하고 주의해서 사용한다면 유용하다고 생각합니다. 

{{< zoomimg src="/231002-1/1.png" >}}

#### utterances 적용하기
적용은 정말 쉽습니다. ref도 많고 [공식 가이드][ref5]도 친절합니다.   
하지만 저는 Dark Mode 여부에 따라 테마를 변경시키고 싶었습니다.

같은 고민을 했던 흔적을 [Issue][ref6]에서 발견할 수 있었습니다.   
utterances는 댓글을 `iframe` 형태로 가져오기 때문에, 따로 event를 발생시키는 것이 해법이었습니다.   
댓글에 Hugo에 적용하기 위한 Vanilla JS 코드도 있어서 수정하여 적용했습니다.

<br>

#### 도메인 배포 자동화하기
저번에 개인 도메인을 구매해서 배포했었는데,   
게시글을 업데이트하고 push를 하니 도메인이 풀려 있었습니다.

지난번에 참고했던 [Doks Repo][ref7]에서는 `gh-pages` 브랜치에 빌드 결과를 올리고   
이를 페이지로 올리는 방식이었는데,   
[Hugo Docs][ref8]에서는 Github Action으로 Deploy를 하고, 설정한 baseURL을 따라 빌드가 되는 것을 시행착오를 거치면서 확인했습니다.   
( yaml 파일에서도 해당 값을 읽는 것을 확인 가능합니다. )

그래서 Doks의 build process와 Hugo의 deploy process를 합쳐 새로 `deploy.yaml`을 작성하였고 추가 작업 없이 도메인이 유지되도록 하였습니다.

커밋 내역도 첨부해 두도록 하겠습니다.   
[commit1][com1] / [commit2][com2]

<br>

#### Image Zoom
Markdown에 이미지를 넣어 보니, 게시글 section의 너비를 넘으면 따로 처리가 되어 사이즈와 화질이 줄어드는 것을 확인하였습니다.   
이대로면 이미지를 업로드해도 제대로 확인하기 힘들어 조정이 필요했습니다.

[Doks Discussion][ref9]에서 [medium-zoom][ref10]으로 확대 기능을 넣는 것을 발견할 수 있었습니다.   
참고해서 적용을 했는데, 시행착오가 생각보다 많았습니다.

- module mount 옵션 추가 방식이 달랐습니다.   
  - 저는 `config/_default/module.toml`에 추가를 했습니다.   
  - Doks와 Hugo는 꾸준히 업데이트를 하고 있기 때문에, 변경 가능성이 있습니다.
- module 추가를 위해 `yarn add`를 한 이후 `gethyas`의 Hugo executable 파일이 날아가는 문제가 있어, clean install을 해야 했습니다.
- image width 등 관련 데이터를 가져오는 방식이 달라서 nil pointer 에러가 발생했습니다. 자세히는 모르겠지만 Hugo 또는 Doks가 업데이트를 거치며 변경사항이 생긴 것으로 보입니다.   
( 참고한 Issue는 2021~2022년에 올라왔고, 다른 기능을 적용하면서도 문법이나 config param 등이 미묘하게 달랐습니다. )   
[Hugo Docs][ref11]를 참고하여 해결하였습니다.
- 이미지가 여러 개일 때, overlay가 여러 번 rendering되는 문제가 있었습니다.   
이미지 개수만큼 `addEventListener`가 호출되고 있어 임시방편으로 `once: true` 옵션을 주어 해결했는데, 완전한 해결책인지는 모르겠습니다.
- 그 외 스타일 등 custom한 조정이 있었습니다.

<br>

#### 마치며
원래는 댓글만 생각을 했었는데... 이것저것 꼬리를 물고 task가 늘어나 버렸습니다.   
간단히 테스트를 거치면 마무리가 될 것 같네요.

※ 해당 게시글도 테스트를 겸합니다.

{{< zoomimg src="/231002-1/test.jpg" caption="Test" width="200">}}

[ref1]: https://github.com/utterance/utterances
[ref2]: https://disqus.com/
[ref3]: https://help.disqus.com/en/articles/1717211-guest-commenting
[ref4]: https://docs.github.com/en/rest/issues?apiVersion=2022-11-28

[ref5]: https://utteranc.es/
[ref6]: https://github.com/utterance/utterances/issues/549

[ref7]: https://github.com/h-enk/doks-gh-pages
[ref8]: https://gohugo.io/hosting-and-deployment/hosting-on-github/

[ref9]: https://github.com/gethyas/doks/discussions/545
[ref10]: https://github.com/francoischalifour/medium-zoom
[ref11]: https://gohugo.io/content-management/image-processing/#global-resource

[com1]: https://github.com/BeaverHouse/blog/commit/a7d201821f3c1cae3d60bf53ee55c635080911cc
[com2]: https://github.com/BeaverHouse/blog/commit/4ba99cd1c568e06b550feffd95936b4aad381f07