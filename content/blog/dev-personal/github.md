---
slug: "231014-01"
title: "Github 2% 더 사용하기"
description: ""
summary: ""
date: 2023-10-14T00:00:00+09:00
lastmod: 2023-10-14T00:00:00+09:00
draft: false
weight: 50
images: []
categories: ["Dev - Personal"]
tags: ["Github", "Github Actions", "Gist", "Branch Protection"]
contributors: ["LHU"]
pinned: false
homepage: false
---

---

블로깅 외에도, 현재 계속 배웠던 것들을 정리하고   
기존 코드나 사용하던 Tool을 다시 보는 시간을 가지고 있습니다.

Github도 거의 Repo 용도로만 사용했는데, 최근부터 여러 편의기능들을 쓰고 있습니다.   
최근에 사용하는 몇 가지 기능을 적어 보려고 합니다.

<br>

#### [Github Gist][ref1]
짧은 코드, 메모 등을 기록 또는 공유하기 위한 서비스입니다.   
평소에도 짧은 메모를 여러 개 남겨 놓는 스타일이기 때문에, 유용할 것 같다고 판단하여 사용하게 되었습니다. Markdown으로 짧은 메모를 남기거나, 폐기할 코드에서 일부 코드만 빼내서 기록해 두고 싶을 때 활용할 수 있을 것 같습니다.

다만, 몇 가지 아쉬운 점은 있습니다.
- Gist 일괄 다운로드 기능이 없습니다.   
이는 찾아보니 API를 통해 따로 코드를 작성해야 하는 것 같아 작업할 예정입니다.
- 접근성 면에서는 아직 물음표입니다.   
Github 홈에서 Gist는 메뉴 구석에 있고, Web에서 검색이 편한 것도 아닌 것 같고...
- 사적인 이유지만, 직장에서 Gist가 막혀 있습니다...

첫인상에 비해서 다소 애매해진 느낌은 있지만, 그래도 당분간은 사용하려고 합니다.

<br>

#### 브랜치 보호하기
{{< zoomimg src="/231014-1/1.png">}}

최근에 Github를 사용하신 분들이라면 한번쯤은 보셨을 화면입니다.   
`main` 브랜치를 포함해서, Repo마다 브랜치 보호 규칙을 설정할 수 있습니다.

Protection Rule에 관한 자세한 내용은 [공식 Docs][ref2]에 있습니다.   
merge 전에 PR를 강제하거나, Deploy 성공 등을 검사하는 등 여러 제한을 걸 수 있고   
기존적으로 Repo의 관리자나 권한이 부여된 유저들은 Rule을 우회할 수 있지만, 이 예외도 허용하지 않을 수 있습니다.   

개인 Repo에 와서 함부로 타인이 코드를 Push하는 경우가 많지는 않겠지만...   
저는 일단 주요 Repo의 `main` 브랜치에 Lock을 걸었습니다. 이렇게 하면 저만 Push가 가능합니다. 몇몇 Repo는 페이지 배포를 위해 `gh-pages` 브랜치를 사용하는데, 여기에 Protection을 걸면 권한 문제로 Action이 막히는 문제가 있어 따로 설정하지 않았습니다.

개인보다는 협업을 할 때 유용한 기능이라서 알아 두는 데 의의가 있을 것 같습니다.

<br>

#### Github Action
Github Repo를 기반으로 자동화 프로세스를 구현할 수 있는 기능입니다.   

존재는 예전부터 알고 있었지만 계속 써야겠다 생각만 하고 실행을 못 하고 있었는데,   
몇 가지 이유로 이번에 꼭 써 보아야겠다고 결심하게 되었습니다. 
- 올해부터 회사에서 Gitlab CI를 사용하기 시작했습니다.   
(제가 구축한 건 아니지만)
- 이 블로그를 구축할 때도 배포 가이드가 Github Action 기반이었습니다.   
- 그 외 업무에서 CI/CD + 자동화를 많이 접하면서 관심도가 높아졌습니다.

구성한 Action의 대부분은 Github Pages를 쉽게 관리하기 위한 것이었습니다.   
관리 중인 Repo 중 B/E도 있긴 하지만, 유지관리만 하고 있어서 필요가 없었습니다.   
(그리고 실제로 체험을 해 보니, 하려면 언제든 할 수 있을 것 같습니다.)

기본적인 Github 관련 기능이나 자주 사용할 법한 기능들은, 이미 공유되고 있는 Tool들이 있습니다. [Repo Checkout][ref3]의 경우에는 Github에서 공식 제공하고, `gh-pages` 브랜치 기반 배포를 쉽게 할 수 있는 [사용자 Action][ref4]도 있습니다. 간단한 작업들은 이 정도만 잘 활용해도 Workflow 구축에 문제가 없고, 실제로 몇 개의 Repo는 간단히 자동화시킬 수 있었습니다.   
하지만, 저는 한 가지를 더 하고 싶었습니다. Side Project 중에 제가 직접 원본 데이터를 수기로 입력해야 하는 게 있는데, 이러한 프로젝트들은 Data 전용 Repo를 따로 두고, F/E에서 따로 B/E와의 통신 없이 json 파일을 데이터로 활용하고 있습니다. 기존에는 변경점이 생기면 Data Repo에서 작업을 하고, 작업한 json 파일을 Frontend Repo로 옮기고, 이를 다시 Github Pages로 배포하는 과정을 거쳤습니다. 여기서 Github Action을 사용한다면 이 과정을 자동화시킬 수 있겠다는 생각이 들었습니다.

```
Data Repo에 push
→ Data Repo의 Github Action이 작동하여 Frontend Repo에 data push
→ Frontend Repo의 Github Action이 작동하여 자동 페이지 배포
→ Profit!
```

검색을 해 본 결과, 원하는 기능과 매우 비슷한 Action을 발견할 수 있었습니다.   
[cpina/github-action-push-to-another-repository][ref5]   
하지만 이걸로는 단일 폴더만 옮길 수 있는 듯했고, 저는 여러 곳에 퍼져 있는 데이터 여러 단위를 옮기는 것이 목적이었습니다. 따라서, 이를 기반으로 제 custom Action을 만들기로 했습니다.   
[Github Docs][ref6]와 Repo를 참고해서, 어렵지 않게 Action을 만들 수 있었습니다. yaml 파일로 작성한다는 점을 제외하면 Dockerfile을 짜는 것과 비슷해서 수월하게 진행한 것도 있는 듯 합니다.   

[**만들어진 Custom Action**][ref7]   
하드코딩 되었다는 점이 흠이긴 하지만, 어차피 혼자 쓸 Action이니 큰 상관은 없다고 생각했습니다. shell script를 조금만 손본다면, 일반적인 Action을 만드는 것도 가능할 것입니다. 이를 기반으로 **Data Repo - Frontend Repo - Github Pages**의 Workflow가 정상적으로 구동되는 것을 확인했습니다.   
모든 자동화가 그렇지만, 적용하고 나니 상당히 편했습니다. 유일하게 불편한 점은 Data 업데이트 후 실제 소스를 작업하려면 그 전에 `git pull`을 해야 한다는 건데 (이전에는 local에서 수동으로 다 처리했으니...) 이건 실무였다면 당연히 가져야 할 습관이기 때문에 적응의 문제인 것 같습니다.

그 외 몇 가지 이슈가 있긴 했는데, critical한 건이 아니라 간단히만 적어 두겠습니다.
- [entrypoint.sh는 execute 권한이 있어야 합니다.][ref8]
- [간헐적으로 Action이 멈출 때가 있는데, 다시 run하면 되는 듯 합니다.][ref9]

<br>

#### 그 외
- 저번에 Hugo 블로그를 구축하며 발견했던 Issue를 제보했습니다. [링크][ref10]   
이전에도 Issue를 사용한 적은 있지만, 제보를 한 적은 처음입니다.   
이 건은 Doks 사용자 수가 적어서 직접 제보하게 되었는데, 성향상 critical하지 않으면 직접 제보하는 일이 많지 않을 것 같긴 합니다. 하지만, 이렇게 Issue를 제기하고 각종 Contribution을 하는 것도 Github를 잘 사용하는 방법 중 하나일 것입니다.   
- 직접 사용하고 있지는 않지만, [Github Discussion][ref11]도 눈여겨 보고 있습니다. Github를 주로 사용하는 그룹이 Discussion도 활용한다면 타 플랫폼 의존도를 상당히 줄일 수 있을 것 같습니다.





[ref1]: https://gist.github.com/
[ref2]: https://docs.github.com/ko/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches/about-protected-branches
[ref3]: https://github.com/actions/checkout
[ref4]: https://github.com/peaceiris/actions-gh-pages
[ref5]: https://github.com/cpina/github-action-push-to-another-repository
[ref6]: https://docs.github.com/ko/actions/creating-actions/creating-a-docker-container-action
[ref7]: https://github.com/BeaverHouse/migrate-github-actions
[ref8]: https://github.com/orgs/community/discussions/26891
[ref9]: https://github.com/orgs/community/discussions/49074
[ref10]: https://github.com/gethyas/hyas/issues/434
[ref11]: https://docs.github.com/ko/discussions