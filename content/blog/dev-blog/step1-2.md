---
slug: "231125-2"
title: "블로그 Custom Phase 1-2"
description: ""
summary: ""
date: 2023-11-25T01:00:00+09:00
lastmod: 2023-11-25T01:00:00+09:00
draft: false
weight: 50
images: []
categories: ["Dev - Blog"]
tags: ["Github Blog", "Hugo", "Doks", "giscus", "medium-zoom"]
contributors: ["LHU"]
pinned: false
homepage: false
---

---

이미 블로그 메인 기능은 거의 완성이 된 상태에서  
2달이 약간 안 되는 기간 동안 변경사항들을 모아 보았습니다.

<br>

#### Profile 추가

자세한 내용은 [이전 게시글][ref1]을 참고해 주세요.

<br>

#### [giscus][giscus]로 댓글 변경하기

원래 [utterances][utterances]를 댓글로 사용했는데, 웹 서핑을 하던 중 몇몇 블로그가 giscus를 사용하는 것을 보고 변경하기로 했습니다. 마음에 들었던 몇 가지를 꼽자면,

- Discussion 기반
- 댓글을 달지 않고 포스트에 반응이 가능
- 그 외 댓글 정렬, 더 많은 테마 지원 등 utterances에 비해 확대된 편의성과 기능
- 현재 utterance보다 활발하게 업데이트가 진행 중

이 정도가 있었습니다. 쓰고 보니 후발주자의 불안정성만 일정 기간 감내 가능하다면 상위호환으로 보이긴 합니다.

[giscus 토큰 관리 서버가 먹통이 되어][ref2] 진행을 못 했던 억까가 있었긴 한데, 그걸 빼면 전체적으로 utterances와 거의 유사하게 세팅을 할 수 있어 Migration은 간단한 편이었습니다. 기존에 있었던 코멘트도 Issue에서 Discussion으로 전환이 어렵지 않기 때문에 수월합니다. 저는 댓글이 거의 없어서 그냥 클릭 몇 번으로 작업이 끝났는데, 옮길 댓글의 수가 많아도 [label 기능으로 편하게 mig할 수 있습니다.][ref2-2]  
[다크 모드 여부에 따른 테마 전환][ref2-3]도 기존 utterances와 거의 동일하게 할 수 있었습니다.

<br>

#### 기타 변경사항 등

- Pagination 스타일이 깨지는 문제가 있어서 [Discussion][ref3]을 찾아 해결하였습니다.
- `medium-zoom`을 계속 사용하면서 상호작용을 짧은 시간 내에 반복하면 overlay가 사라지지 않아 먹통이 되는 문제가 있었습니다. 일단은 vanilla JS로 zoom을 닫을 때 강제로 DOM을 삭제하고 이벤트를 다시 설정하도록 했습니다. 더 좋은 방법이 있는지는 모르겠네요. ([commit][ref3-2])
- 그 외 `slug`를 통일하고 스타일을 조정했습니다. 아직 블로그가 작아서 다행인 듯...
- Hugo와 Doks 버전이 꾸준히 올라가고 있어서 대응해서 올려볼까 했습니다만 생각보다 공수가 많을 것 같아 실행하지 않았습니다. 기존에 파일 형식이 흩어져 있던 것들을 `.toml` 파일로 통일하고 그 외에도 설정값이나 favicon 등의 위치가 많이 변경되었습니다. 일단 지금은 불편함이 없어서 추후에 필요시 올려도 될 것 같습니다.

[ref1]: /blog/231107-1
[ref2]: https://github.com/giscus/giscus/issues/1250#issuecomment-1826294160
[ref2-2]: https://shipit.dev/posts/from-utterances-to-giscus.html#migrating-comments-of-multiple-pages
[ref2-3]: https://github.com/giscus/giscus/issues/336
[ref3]: https://github.com/gethyas/doks/discussions/234
[ref3-2]: https://github.com/BeaverHouse/blog/commit/5346d0ad4eba6d74f784c5e9622811e6f2ce0f22
[giscus]: https://giscus.app
[utterances]: https://utteranc.es/
