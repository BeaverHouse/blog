---
slug: "231203-1"
title: "Docusaurus를 사용해 보았습니다."
description: ""
summary: ""
date: 2023-12-03T00:00:00+09:00
lastmod: 2023-12-03T00:00:00+09:00
draft: false
weight: 50
images: []
categories: ["Dev - Personal"]
tags: ["Docusaurus"]
contributors: ["LHU"]
pinned: false
homepage: false
---

---

최근에 새롭게 공부할 거리가 생겼는데, 공부한 내용을 어떻게 정리할지에 대한 고민이 있었습니다. 블로그에 여러 개의 글을 써 가면서 진행하는 방법이 가장 간단하기는 하지만, 개인적으로 코드를 늘어놓으며 매뉴얼처럼 작성하는 포스트를 선호하지 않아서 다른 곳에 분리해 두고 싶었습니다. 그러다가 이전에 [Sphinx][sphinx] 같은 문서 template를 사용해 보려다 제대로 활용하지 못했던 경험이 생각나서, 이번에 새로운 template을 찾아 활용해 보기로 결정하였습니다.

<br>

## [Docusaurus][ref1]

간단하게 조사를 해 본 결과로는 [MkDocs][ref2]와 Docusaurus가 가장 많이 보였는데, 둘 중에서 Docusaurus를 사용하기로 결정했습니다. 이유는 다음과 같았습니다.

- 디자인적으로 더 마음에 들었습니다.
- 제가 인상적으로 보았던 매뉴얼 중 [MLOps for ALL][ref7]이라는 문서가 있는데,  
  이 문서가 Docusaurus로 되어 있었습니다.

사용해 본 결과를 바로 이야기하자면, React 기반이라서 어느 정도 Custom을 하는 데에도 무리가 없었고, 여러 편의기능이 잘 되어 있어서 만족스럽게 세팅이 가능했습니다.

다만 주의해야 할 점이 비교적 [최근에 3.0 버전이 출시][ref3]되었는데, 이로 인해 Custom을 위해 검색을 할 때 이전 버전의 내용이 섞여 나오는 경우가 많았습니다. 그래도 [Docs][ref4]가 꽤나 안정되어 있는 편이기 때문에, Docs를 위주로 참고하면 대부분의 문제는 해결 가능할 것이라고 생각됩니다.

<br>

## Simple Progress & View

- 저는 제품이나 소스에 대한 문서를 작성할 목적이 아니라서 버전 관리는 필요없었고, 해당 기능은 관련 코드를 지우고 비활성화시켰습니다.
- 다국어는 영어/한국어로 세팅을 했습니다.  
  Docs의 Internationalization(국제화) 파트에 친절하게 설명이 되어 있습니다.  
  단순히 Markdown 문서만 번역할 거라면 폴더만 분리하고 번역 파일을 배치하면 되지만, 세부 content나 subtitle까지 모두 번역하고 싶다면 페이지 소스를 알맞게 수정하고 `yarn write-translations` 명령어로 다국어 파일도 생성해 주어야 합니다.  
  다만 그래도 완전히 100% 번역이 되지는 않습니다. 대표적으로 카테고리 항목을 넘기는 Prev/Next 버튼이 완전히 번역되지 않고 기본 코드명으로 표기되는 문제가 있는데, 해결이 불가능하지는 않겠습니다만 저는 그냥 카테고리는 1 depth로 하고 따로 index 페이지를 두지 않기로 했습니다.

{{< zoomimg src="images/231203-1/1.png" caption="공식 문서에도 이런 문제가 있습니다.">}}

- 기본 Docusaurus 템플릿에는 Docs와 Blog만 세팅이 되어 있는데, 본인이 직접 섹션을 만들고 배치할 수도 있습니다. 공식 문서에 관련 내용이 있기는 한데, 저는 세팅 과정에서 조금 헤맸어서 [제가 작업한 commit 내역][ref5]을 첨부해 두겠습니다.
  - [MLOps for ALL][ref6]의 코드가 많은 도움이 되었습니다.
- 그 외에도 스크롤 시 상단 바 숨기기, 최종 수정일/작업자 표시 등 여러 기능을 설정할 수 있어 좋았습니다. 최종 수정일은 문서 전체에 마지막 commit 날짜로 일괄 표기되는 것 같은데 이 부분은 살짝 아쉽습니다. Critical한 부분은 아니라서 저는 넘어갔습니다.
- MDX + 확장 문법을 지원하고 MDX 내에서 React 컴포넌트를 import하거나 만들어 사용하는 것도 가능합니다. 남용하면 오히려 문서를 보기 힘들어질 수도 있지만 확실히 시각화 면에서는 좋다고 생각되었습니다.
- 로컬 환경에서는 MDX Code Block이 제대로 동작하지 않거나 일부 JS가 에러를 발생하는 등의 문제가 있습니다. 문법에 맞춰 작성하면 Production에서는 따로 문제가 없었습니다.

<br>

위의 내용을 바탕으로 간단한 Docusaurus 템플릿을 생성해 두었습니다.  
위 내용 중 일부 템플릿에 없는 내용도 있습니다만 어느 정도 참고가 되었으면 합니다.  
이를 바탕으로 문서 작업도 하고 있는데, 이제 시작 단계라서 나중에 기회가 되면 공개하는 게 좋을 것 같습니다.

[docusaurus-template (Github)][ref8]

[ref1]: https://docusaurus.io/
[ref2]: https://www.mkdocs.org/
[ref3]: https://docusaurus.io/blog/releases/3.0
[ref4]: https://docusaurus.io/docs
[ref5]: https://github.com/BeaverHouse/dive-argo/commit/29aaab72abb56f04536174af672762671e622a90
[ref6]: https://github.com/mlops-for-all/mlops-for-all.github.io
[ref7]: https://mlops-for-all.github.io/
[ref8]: https://github.com/BeaverHouse/docusaurus-template
[sphinx]: https://www.sphinx-doc.org/en/master/
