---
slug: "231001-1"
title: "Hugo로 Github Blog 구축하기"
description: ""
summary: ""
date: 2023-10-01T00:00:00+09:00
lastmod: 2023-10-01T00:00:00+09:00
draft: false
weight: 50
images: []
categories: ["Dev - Private"]
tags: ["Hugo", "Github Blog"]
contributors: ["LHU"]
pinned: false
homepage: false
---

[Hugo][ref0]로 Github Blog를 새로 구축했습니다.   
왜 Github Blog로 새로 구축했는지는 따로 작성할 것입니다.    

따라서 Github Blog로 결정한 이후 시점을 기술하려고 합니다.

#### Why Hugo?
Github Blog를 만들 수 있는 방법은 많습니다.    
Ruby 기반의 [Jekyll][ref1]도 있고, React 기반의 [Gatsby][ref2]도 있습니다.    
요즘 뜨고 있는 강력한 [Next.js][ref3]를 사용해도 될 것입니다.    
모두 Hugo에 비해 인지도도 높습니다.

하지만 다음과 같은 이유로 Hugo를 선택했습니다.

- Go로 작성되었다는 게 좋았습니다.   
아직 실무에서 사용할 기회는 없었지만 매력적인 언어라고 생각합니다.   
성향상 블로그에 Deep Dive할 일은 적을 것 같지만,   
혹시나 문제 상황이 생기면 해결 과정에서 Ruby, JS 기반의 다른 Tool에 비해 도움이 될 거라 생각했습니다.
- 그냥 minor해서 써보고 싶었습니다.   
ref가 적지만 후기가 좋아서, 괜찮다고 판단했습니다.   
원하는 기능이 많지 않아서, 넓은 생태계와 ref도 필요성이 적었습니다.

<br>

#### 구축 과정
최대한 깔끔하게, 필요한 기능만, 빠르게 만들고 싶었습니다.

여러 테마를 찾아본 결과, [Doks][ref4]가 가장 마음에 들었습니다.

Doks 테마는 `yarn`으로 빠르게 세팅할 수 있었습니다.   
(다른 테마처럼 Hugo를 따로 설치했는데 결과적으로 사용하지 않았습니다.)

```
★ Docs와 살짝 다르게 명령어를 실행했습니다.
yarn create hyas -- --template doks

★ 프로젝트 세팅 후
yarn
yarn dev
```

그 뒤로 기본 세팅, Test를 거쳤습니다.
- config에서 불필요한 세팅은 지우고 custom하게 변경했습니다.   
  - 다국어 설정이 눈에 띄었는데, 따로 생각은 없어 한국어로만 세팅했습니다.
- 게시글 작성도 진행해 보았습니다. 
  - Markdown을 사용합니다.   
  - 도구에 따라 게시글의 path가 폴더 경로에 의존하는 경우가 있어 별도 세팅이 불편했던 기억이 있는데, 여기서는 `slug`로 설정하는 것이 소소하게 편했습니다.
- HTML, Markdown 기본 설정을 변경했습니다.   
  - 기본 template에서 themes 폴더에 있는 Readme에 설명이 있습니다.   
  - 새 탭에서 링크를 띄우기 위해 `target="_blank"` 태그를 붙이고,   
  그 외 간단한 변경만 수행하였습니다.

```
★ From /themes/my-doks-theme/README.md

Copy the file(s) you'd like to override from `./node_modules/@hyas/doks-core/` and paste to `./themes/my-doks-theme/`. Make sure to keep the folder structure.

Supported folders are: `archetypes`, `assets`, `data`, and `layouts`.
```

배포는 Github Pages로 결정했습니다.   
Netlify도 선택지에 있었지만, 의존하는 플랫폼을 줄이고 싶었습니다.   
(특별한 이유는 없습니다)

해당 [링크][ref5]를 참고해 진행했습니다.   
**Doks 테마는 Hugo 구동을 위해 [Hyas][ref6]라는 Framework를 따로 사용중입니다.**   
그래서 일반적인 Hugo 빌드 방식으로는 블로그가 배포되지 않았고,   
Doks 테마 원작자의 Repo를 참고하였습니다.

<br>

이렇게 기본적인 세팅이 완료되었고, 도메인까지 구입해 배포했습니다.   
필요한 것은 차차 추가할 계획입니다.

<br>

#### 그 외
Hugo, Doks는 minor해서 관련 문서 등이 매우 적습니다.   
따라서 참고용 링크 몇 개를 첨부해 두겠습니다.

- [Doks Github][etc0]
- [Doks Discussion][etc1]    
  - 이 곳을 참고해 새 탭에서 링크 열기를 default로 설정했습니다.
- [Doks Documentation][etc2]
- [Hugo Documentation][etc3]
- [Doks on Github Pages][etc4]

[ref0]: https://gohugo.io/
[ref1]: https://jekyllrb.com/
[ref2]: https://www.gatsbyjs.com/
[ref3]: https://nextjs.org/
[ref4]: https://themes.gohugo.io/themes/doks/
[ref5]: https://github.com/h-enk/doks-gh-pages
[ref6]: https://gethyas.com/

[etc0]: https://github.com/gethyas/doks
[etc1]: https://github.com/gethyas/doks/discussions
[etc2]: https://getdoks.org/docs/start-here/getting-started/
[etc3]: https://gohugo.io/documentation/
[etc4]: https://github.com/h-enk/doks-gh-pages