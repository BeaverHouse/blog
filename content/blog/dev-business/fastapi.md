---
slug: "231029-1"
title: "Why FastAPI?"
description: ""
summary: ""
date: 2023-10-29T00:00:00+09:00
lastmod: 2023-10-29T00:00:00+09:00
draft: false
weight: 50
images: []
categories: ["Dev - Business"]
tags: ["Python", "FastAPI"]
contributors: ["LHU"]
pinned: false
homepage: false
---

FastAPI를 회사에서 처음 입문하고, 이를 사용한 지도 2년 반이 넘었습니다.   
제일 친근한 Python Web Framework이고, 개인적으로도 실무에서도 유용하게 사용 중입니다.   
그리고 FastAPI 생태계도 많이 성장해서, 당당한 주류 Pick으로 자리잡은 것 같습니다.

{{< zoomimg src="/231029-1/1.png" caption="Flask, Django와 어깨를 나란히 하는 FastAPI">}}

이 글을 작성하게 된 계기는, 저 나름대로 정리를 하기 위해서입니다.   
리마인드를 하려는 목적도 있고, 제 이해도를 상대적으로 높이고 싶다는 목적도 있습니다.   
지금도 FastAPI는 빠르고, 배포는 `gunicorn`으로 해야 하고... 이런 내용을 늘어놓을 수는 있습니다. 하지만 깊게 들어가면 정확한 내용을 설명할 수 있을까?에는 조금 의문이 들었습니다.   
물론 지금도 완전하지 않을 수 있지만, 나름대로 왜 FastAPI를 사용하는지 정리해 보았습니다.

#### FastAPI는 빠르다
FastAPI는 [공식 문서][ref1]에서부터 빠르다를 강조하고 있습니다.   

우선 FastAPI가 왜 빠른지에 대해 알아볼 필요가 있습니다.   
- FastAPI는 `starlette` 기반으로 되어 있습니다.
- 그 `starlette`은 다시 `uvicorn`을 뿌리로 하고 있습니다.
- `uvicorn`은 `uvloop`을 기반으로 한 ASGI입니다.
- `uvloop`은 Cython으로 작성이 되어 있고,   
일반적인 비동기 처리에 사용하는 `asyncio` loop에 비해 훨씬 좋은 성능을 냅니다.

여기서 더 들어가면 `libuv` 등 계속 기원을 찾아 올라가서 아키텍쳐 분석까지 해야 하는데, 해당 부분을 Deep Dive할 정도는 되지 않아 넘어가도록 하겠습니다. **핵심은, FastAPI는 당시 가장 고성능의 Python loop를 기반으로 Wrapping을 거듭해 만들어진 Framework라는 것입니다.** 실제로, FastAPI의 당시 벤치마크 성능을 테스트했을 때 Python에서 FastAPI를 앞서는 것은 모체에 해당하는 `starlette`와 `uvicorn`뿐이었습니다.   
물론, FastAPI가 모든 언어를 통틀어 제일 빠르다! 이것은 아닙니다. Node.js와 Go의 성능에 근접했지만 결국 밀렸고, 시간이 지난 지금 시점에서 FastAPI를 벤치마크 성능 상으로 앞서는 경쟁자는 많습니다. Python 내에서도, 지금은 FastAPI의 성능을 넘어선다는 Framework가 존재합니다. 하지만, **주류 Python Web Framework 중에서는** 여전히 FastAPI는 강력한 성능을 자랑하고 있습니다. 이제는 충분히 검증되었기 때문에, 실무에서도 무리 없이 사용할 수 있는 선택지가 되었습니다.

##### 대충 무슨 말인지는 알겠는데... ASGI가 뭔가요?
사실 저도 이 부분을 제대로 설명하지 못했고, 최대한 제가 쉽게 이해할 수 있도록 정리를 했습니다.

ASGI의 기원을 타고 들어가면 다음과 같습니다.
- ASGI는 WSGI에서 파생된 개념입니다.
- WSGI는 CGI의 한 종류입니다.

결국 CGI(Common Gateway Interface)라는 개념부터 알아야 하는데, 아주 간단하게 이해하자면 웹서버와 실제 코드가 서로의 요청을 이해할 수 있도록 중개해 주는 역할이라고 생각하시면 됩니다. 웹 서버에 요청이 들어오면 CGI가 이를 해석해서 프로그램에 전달하고, 프로그램이 연산을 해서 결과를 내놓으면 이를 CGI가 다시 웹 서버가 내보낼 수 있도록 전달을 해 주는 방식이죠. 이러한 CGI가 도입됨으로 인해서 동적인 페이지를 처리할 수 있게 되었습니다.   
WSGI(Web Server Gateway Interface)는, **Python을 위해 고안된 CGI**라고 생각하시면 됩니다. 기존 CGI에는 큰 문제점이 하나 있는데, 요청이 여러 개 들어오면 그만큼 프로세스를 생성해야 한다는 것입니다. 이러한 특성은 스크립트 언어에게 치명적이었고, Python도 이 문제를 피할 수 없었습니다. 그래서 WSGI는 이를 개선하기 위해 요청 처리에 Callable Object를 사용하는데, 이는 재사용도 가능하고 무엇보다 요청이 들어올 때마다 새로운 프로세스를 생성할 필요가 없습니다. 그래서 이 WSGI는 Python 웹 개발 표준으로 채택이 되었습니다.   
하지만 이 WSGI에도 약점이 있는데 바로 비동기 처리입니다. WSGI는 동기 처리만을 지원하기 때문에 실시간 작업, 동시작업, 긴 연결시간을 필요로 하는 기능을 처리할 때 한계가 있습니다. 물론 다른 여러 도구를 붙여서 어느 정도 개선이 가능하지만 그것도 결국에는 공수가 들어가는 일입니다. 그래서 등장한 개념이 ASGI(Asynchronous Server Gateway Interface)입니다. **ASGI는 WSGI의 기본적인 뼈대를 계승한 대신, 기본적인 요청을 비동기로 처리합니다.**   

위에서 말한 WSGI의 대표적인 예시는 `gunicorn`과 `uWSGI`, ASGI의 대표는 `uvicorn`입니다.   
`uvicorn`은 ASGI로 비동기 처리에 강점이 있고, 또 위에서 말한 대로 좋은 성능을 가지고 있어 이를 계승한 FastAPI 역시 준수한 퍼포먼스를 보이게 되었습니다.

<br>

#### FastAPI는 쉽다
사실 이 부분은 직접 사용을 해 봐야 공감할 수 있는 부분이지만, 제 입장에서는 200% 맞는 문장이라 생각합니다.

<br>

#### 기타
벤치마크 성능은 해당 Github에서 계속 업데이트되고 있습니다.   
벤치마크가 항상 정답은 아니지만, 어느 정도 참고는 할 만 합니다.   
[TechEmpower/FrameworkBenchmarks][ref10]

[ref1]: https://fastapi.tiangolo.com/

[ref10]: https://github.com/TechEmpower/FrameworkBenchmarks