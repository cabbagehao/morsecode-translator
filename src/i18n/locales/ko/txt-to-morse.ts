export const txtToMorse = {
  title: "텍스트 파일 모스 부호 번역기 – 텍스트 파일을 모스로 변환",
  description: "오디오 재생, 시각적 플래시, 다운로드 옵션과 함께 텍스트 파일을 모스 부호로 변환하세요. 사운드 생성과 함께 문서의 일괄 처리.",
  
  mainHeading: "텍스트 파일을 모스 부호 변환기",
  subtitle: "텍스트 파일을 업로드하고 오디오 재생 및 다운로드 옵션과 함께 모스 부호로 변환하세요",
  
  uploadSection: {
    title: "텍스트 파일 업로드",
    dragAndDrop: "텍스트 파일을 여기에 끌어다 놓거나 클릭하여 선택하세요",
    supportedFormats: "TXT 및 기타 텍스트 형식 지원 (최대 5MB)",
    selectFile: "텍스트 파일 선택",
    removeFile: "파일 제거",
    removing: "제거 중...",
    processing: "파일 처리 중...",
    analyzing: "텍스트 분석 중..."
  },
  
  fileInfo: {
    fileName: "파일 이름",
    fileSize: "파일 크기",
    wordsCount: "단어 수",
    charactersCount: "문자 수"
  },
  
  controls: {
    playMorse: "모스 부호 재생",
    pause: "일시정지",
    resume: "재개",
    preparingAudio: "오디오 준비 중...",
    repeatMode: "반복 모드",
    repeatModeOn: "반복 모드 켜짐",
    repeatModeOff: "반복 모드 꺼짐",
    audioSettings: "오디오 설정",
    copyToClipboard: "클립보드에 복사",
    downloadOptions: "다운로드 옵션",
    copiedToClipboard: "클립보드에 복사되었습니다!"
  },
  
  results: {
    title: "변환 결과",
    originalText: "원본 텍스트",
    morseCode: "모스 부호",
    downloadText: "텍스트 다운로드 (.txt)",
    downloadMorse: "모스 다운로드 (.txt)",
    downloadAudio: "오디오 다운로드 (.wav)",
    noContent: "표시할 내용이 없습니다",
    processingComplete: "처리 완료!"
  },
  
  instructions: {
    title: "텍스트 파일을 모스 변환기 사용법",
    step1: {
      title: "텍스트 파일 업로드",
      description: "모스 부호로 변환하려는 내용이 포함된 텍스트 파일(.txt 형식 권장)을 선택하세요."
    },
    step2: {
      title: "자동 변환",
      description: "시스템이 자동으로 텍스트를 모스 부호로 변환하고 오디오 재생 기능을 제공합니다."
    },
    step3: {
      title: "오디오 재생",
      description: "주파수, 속도, 반복 모드 등 사용자 정의 가능한 오디오 설정으로 모스 부호를 들어보세요."
    },
    step4: {
      title: "결과 다운로드",
      description: "오프라인 사용 및 공유를 위해 원본 텍스트, 모스 부호 또는 생성된 오디오 파일을 다운로드하세요."
    },
    tips: {
      title: "최상의 결과를 위한 팁:",
      tip1: "최상의 호환성을 위해 일반 텍스트 파일 사용",
      tip2: "최적의 성능을 위해 파일 크기를 5MB 이하로 유지",
      tip3: "편안한 청취를 위해 오디오 설정 조정",
      tip4: "모스 부호 연습을 위해 반복 모드 사용",
      tip5: "휴대용 모스 훈련을 위해 오디오 파일 다운로드"
    }
  },
  
  errors: {
    fileTooBig: "파일 크기가 5MB 제한을 초과했습니다",
    unsupportedFormat: "지원되지 않는 파일 형식입니다",
    processingError: "텍스트 파일 처리 중 오류 발생",
    uploadError: "파일 업로드 중 오류 발생",
    conversionError: "모스 부호 변환 중 오류 발생"
  }
};