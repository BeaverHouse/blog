---
slug: "231105-1"
title: "Python으로 카드내역 작성 자동화하기"
description: ""
summary: "수작업을 줄이기 위한 작은 시도"
date: 2023-11-05T00:00:00+09:00
lastmod: 2023-11-05T00:00:00+09:00
draft: false
weight: 50
images: []
categories: ["Dev - Personal"]
tags: ["Python", "Selenium"]
contributors: ["LHU"]
pinned: false
homepage: false
---

---

<br>

글을 쓰는 시점 회사에서 법인카드를 사용하는데, 달마다 사용내역을 제출해야 합니다.  
물론 카드사에서 직접 엑셀을 제공해 주는 경우도 있지만, 지금은 그렇지 않아 수기로 작성해야 하는데 사용내역을 핸드폰으로 확인해 엑셀에 옮겨 적는 게 여간 귀찮은 게 아니었습니다.

그래서 **어떻게든 엑셀을 쓰지 말자**라는 생각으로 자동화를 열심히 진행했었습니다.  
이전 포스트에서도 조금 언급했었습니다만, 해당 내용 관해 좀 더 기술해 보려고 합니다.

<br>

#### OCR 사용하기

앱에서 카드 사용내역 정보를 빼내는 방법은 크게 2가지 정도가 생각났습니다.  
첫 번째는 카드승인이 될 때 뜨는 알림 등에서 패킷을 긁어 정보를 빼내는 건데... 패킷 관련 작업에는 자신이 없고 설사 가능하더라도 보안을 뚫는 거랑 비슷하니 바람직한 방법은 아니라고 생각했습니다. 그래서 다른 방법을 생각했고 그 방법은 바로 **스크린샷을 찍어 OCR 인식으로 내역을 추출**하는 것이었습니다.

문제는 오픈소스(무료) 선에서 OCR Tool을 찾아보면 한글 인식이 영 좋지 않다는 점이었습니다. 여러 글들을 찾아 가며 시행착오를 거쳐 보았지만 번거롭고 리턴도 그리 만족스럽지 않았습니다. 결국 생각나는 것은 네이버/카카오 등에서 제공하는 OCR인데, 유료라는 점이 역시 걸렸습니다.  
그러던 중 [Naver Clova 체험 페이지][ref1]을 찾게 되었는데, 체험 명목으로 적은 양이지만 무료로 사진 몇 개를 업로드해 OCR 결과를 받을 수 있었습니다. 그래서 해당 페이지를 Selenium으로 조작해서 OCR 결과를 얻으면 되겠다는 생각을 하였고, 실제로 해 보니 만족스러운 결과를 얻었습니다.

<br>

#### Old : FastAPI 사용하기

이제 OCR 문제는 해결되었고, 이제 스크린샷을 처리할 방법만 생각하면 되었습니다.  
스크린샷은 모바일에서 찍을텐데, **처리를 위해 PC에 옮기는 것도 하나의 일이라고 생각했습니다.**  
그래서 가장 먼저 생각나는 것은 REST API로 처리하는 것이었습니다.

그래서 FastAPI로 파일을 받아, OCR로 처리하고 엑셀까지 작성해서, 다운로드받을 수 있도록 작업을 했습니다. 작업에 시간이 오래 걸릴 것이니, [Background Task][ref2]로 처리하도록 하였습니다. 문제 없이 동작하기는 했는데, 몇 가지 문제가 있었습니다.

- 사용량이 적었습니다. 이를 위해 VM을 올리는 것은 다소 낭비였습니다.
- Selenium은 브라우저까지 돌려야 하기 때문에 Free VM으로는 버거운 편이었습니다.
- daemon으로 돌리다 보니 에러 로깅이 쉽지 않았습니다. 파일로 저장하는 등 방법은 당연히 있지만 배보다 배꼽이 더 크기도 하고...

결국 기존에 VM을 띄워 놓았던 Oracle Cloud 계정이 개인적인 문제로 터지면서(...)  
API를 통한 처리는 폐기하게 되었습니다.

<br>

#### Now : Google Drive 사용하기

결국 생각한 것은, 엑셀을 어차피 메일을 통해 보내기도 하고 이래저래 개인PC에서 코드를 돌리는 것은 상관없겠다 싶었습니다.  
그리고 모바일로 파일을 올리고 원격으로 처리를 할 수 있어야 하니 클라우드 스토리지를 활용해야겠다는 생각이 들었습니다. 이를 가장 잘 활용할 방법으로 Google Drive가 떠올랐습니다.

그래서 다음과 같은 식으로 코드를 작성했습니다.

```python
## main.py
import os
import shutil
import config
from func.gdrive import gdrive_down, gdrive_up_excel
from func.img_process import crop_and_save
from func.ocr import make_excel_ocr

IMG_FOLDER = "download"

# 폴더 세팅
if os.path.exists(IMG_FOLDER):
    shutil.rmtree(IMG_FOLDER)
os.makedirs(IMG_FOLDER, exist_ok=True)

# 파일 다운로드
gdrive_down(folderName=config.GDRIVE_FOLDER_NAME)

# 파일 전처리
for file in os.listdir(IMG_FOLDER):
    crop_and_save(fileName=file, folder=IMG_FOLDER)

# 파일 CLOVA로 OCR 처리해서 엑셀 작성
fileName = make_excel_ocr(
    folderName=IMG_FOLDER,
    cardName=config.CARD_NAME,
    name=config.NAME,
    year=config.YEAR,
    month=config.MONTH
)

# 엑셀 파일 업로드
gdrive_up_excel(fileName=fileName)
```

여기서 파일 전처리는 간단히 `Pillow`를 사용해 이미지를 자르는 거고,  
OCR 처리는 위에서 설명한 그대로 Selenium을 활용했습니다.

Google Drive API를 사용하기 위해서는 초기 설정을 해야 하는데, 이 부분은 [Docs][ref3]에 잘 설명이 되어 있습니다. 오히려 이후에 Python 패키지를 사용하는 과정이 조금 번거로웠습니다. 구글에서 제공하는 Sample Code가 2% 부족하고, 버전도 v2, v3 등으로 나누어져서(현재는 v3) 정보가 혼재해 있었기 때문입니다. 그래도 간단한 다운로드/업로드만 하면 되는 거라서 몇 가지 ref를 찾아서 진행했습니다.

- [다운로드][ref4]
- [업로드][ref5]
- [Sample Code on Github][ref6]

핵심 로직은 변경사항이 없었기 때문에 현재 문제없이 사용하는 중입니다.  
이 정도면 소기의 목적을 달성해서 만족스럽게 사용할 수 있을 것 같네요.

[ref1]: https://clova.ai/ocr/
[ref2]: https://fastapi.tiangolo.com/tutorial/background-tasks/
[ref3]: https://developers.google.com/drive/api/quickstart/python?hl=ko
[ref4]: https://stackoverflow.com/a/55989689
[ref5]: https://stackoverflow.com/a/50674639
[ref6]: https://github.com/googleworkspace/python-samples
