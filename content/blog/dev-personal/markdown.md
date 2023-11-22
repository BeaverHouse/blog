---
slug: "231008-1"
title: "Markdown 2% 더 사용하기"
description: ""
summary: ""
date: 2023-10-08T00:00:00+09:00
lastmod: 2023-10-08T00:00:00+09:00
draft: false
weight: 50
images: []
categories: ["Dev - Personal"]
tags: ["Markdown"]
contributors: ["LHU"]
pinned: false
homepage: false
---

---

Markdown은 코딩을 하면서 무시하기 힘든 요소입니다. 이 블로그도 Markdown으로 작성중이고, 수많은 개발 관련 사이트들이 글을 작성할 때 기반으로 Markdown을 사용하는 경우가 많습니다.  
`Readme.md`를 잘 활용한다면 딱히 추가 Docs가 필요없는, 그 자체로 Docs 역할을 하는 훌륭한 Repo를 만들어낼 수도 있습니다.

원래는 Markdown을 무작정 사용했던 느낌이 강했는데,  
계속 사용해 온 것들, 또 최근에 잘 사용하고 있는 몇 가지를 적어보려 합니다.  
다른 글도 그렇지만, 제가 참고할 All-in-One 문서를 만드려는 목적도 있습니다 ^^;

<br>

#### 기본 기능은 의외로 많다

물론 Markdown이 만능은 아니고 제한적인 것은 맞습니다만,  
그래도 기본적인 문서 작성에는 큰 무리가 없는 편입니다.

수많은 [Cheatsheet 중 하나][ref1]를 첨부했는데, 이를 포함해 혹시나 Markdown에서 무언가를 구현하고 싶다면 일단 검색을 해 보는 것을 추천합니다. 순정에서 해결이 가능할 수도 있으니까요.  
Hugo나 Jekyll, 기타 Markdown를 기본 템플릿으로 사용하는 경우 Docs에서 [간단한 사용법을 제공해 주는 경우도 많습니다.][ref2]

#### 약간의 HTML 첨가하기

Markdown으로 작성된 문서는 최종적으로 HTML로 변환됩니다.  
그리고 파일의 일부를 HTML로 작성해도, 전혀 문제가 없습니다.

저도 많이 사용하지는 않지만, 몇몇 상황에서 HTML을 사용중입니다.

- 글에 여백이 있는 걸 선호해서 간격을 추가로 줄 때 `<br>` 태그를 많이 이용합니다.
- 특수한 경우 폰트 수정에 이용합니다. 여러 번 사용할 것이 아니라면 간단하게 HTML로 처리하는 것이 나을 때도 있는 것 같습니다. 주로 `<span>` 태그로 색깔을 조절하거나, 폰트 크기를 변경하기도 합니다.

이외에도 Markdown으로 적용이 껄끄러운 case가 있다면, HTML이 답이 될 수 있습니다.  
다만 Hugo 등 개발 블로그 + 기타 Platform의 경우, 아래에서 설명할 shortcode를 활용할 수도 있습니다.

#### Reference 사용하기

보통의 이미지/링크 Markdown 문법은 다음과 같습니다.

```markdown
[Link](http://example.com)
![Image](http://some/pathorurl/image.png)
```

이렇게 사용하게 될 경우, 첨부할 링크나 파일이 많아지면 상당히 파일을 관리하기 곤란해집니다. 제가 Markdown을 선호하지 않는 이유 중 하나이기도 했습니다.  
하지만 다음과 같이 Reference를 정의하여 사용한다면 재사용도 가능하고, 깔끔하게 Markdown을 관리할 수 있습니다.

```markdown
[Link][ref1]
![Image][img1]
[Reuse Link][ref1]

[ref1]: http://example.com
[img1]: http://some/pathorurl/image.png
```

#### Shortcode (일부)

Hugo의 경우, shortcode 기능을 지원합니다.  
[built-in shortcode][ref3]들이 있고, [Doks에서 따로 제공하는 common shortcode][ref4]도 있습니다.  
예를 들어, Hugo에서는 아래와 같은 gist shortcode를 기본 제공합니다.

<br>

<sub>(해당 gist는 무작위로 가져온 것입니다.)</sub>
{{< gist anvicode f95f07566d9fd0ad21506c9db2c77dcd merging-two-dictionaries.py >}}

<br>

원하는 기능이 없다면, 직접 shortcode를 제작해 사용할 수도 있습니다. 실제로 저도 이미지 UI 개선을 위해, `medium-zoom`을 사용한 [zoomimg shortcode][ref5]를 따로 만들어서 사용 중입니다.  
다른 Tool도 [비슷하게 적용할 수 있는 경우가 있으니][ref6], 한번 찾아보시길 권해 드립니다.

<br>

#### 그 외

- Github Markdown에서는 새 탭에서 열기를 지원하지 않습니다.  
  target 속성을 따로 처리하지 않는 것으로 보입니다.
- emoji를 사용하려는 경우, [이 곳에서 검색하실 수 있습니다.][ref7] 🚀

[ref1]: https://www.markdownguide.org/cheat-sheet/
[ref2]: https://getdoks.org/docs/guides/authoring-content-in-markdown/
[ref3]: https://gohugo.io/content-management/shortcodes/#use-hugos-built-in-shortcodes
[ref4]: https://getdoks.org/docs/guides/shortcodes/
[ref5]: https://github.com/BeaverHouse/blog/commit/f0f23140ade8321860e28b8cf95e6a05d20bd770
[ref6]: https://talk.jekyllrb.com/t/are-there-short-codes-in-jekyll/2910/2
[ref7]: https://html-css-js.com/html/character-codes/
