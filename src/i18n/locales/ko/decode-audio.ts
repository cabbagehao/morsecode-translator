export const decodeAudio = {
  title: "오디오 모스 부호 번역기: 음성 파일에서 신호 추출",
  description: "고급 신호 처리로 오디오 파일에서 모스 부호를 디코딩하세요. 녹음파일을 업로드하고, 비프음과 톤을 감지하여 자동으로 텍스트로 변환합니다.",
  
  mainHeading: "오디오 모스 부호 디코더",
  subtitle: "고급 신호 처리를 사용하여 오디오 녹음에서 모스 부호 추출",
  
  uploadSection: {
    title: "오디오 파일 업로드",
    dragAndDrop: "오디오 파일을 여기에 끌어다 놓거나 클릭하여 탐색하세요",
    supportedFormats: "지원 형식: MP3, WAV, M4A, AAC, OGG",
    maxFileSize: "최대 파일 크기: 50MB",
    selectFile: "오디오 파일 선택",
    removeFile: "파일 제거",
    processing: "처리 중...",
    analyzing: "오디오 분석 중..."
  },
  
  audioPlayer: {
    play: "재생",
    pause: "일시정지", 
    stop: "정지",
    volume: "볼륨",
    currentTime: "현재 시간",
    duration: "재생 시간"
  },
  
  analysisSettings: {
    title: "분석 설정",
    showSettings: "설정 표시",
    hideSettings: "설정 숨기기",
    minFrequency: "최소 주파수",
    maxFrequency: "최대 주파수",
    dotThreshold: "점 임계값",
    dashThreshold: "대시 임계값",
    silenceThreshold: "무음 임계값", 
    noiseFloor: "노이즈 플로어",
    charSeparation: "문자 분리",
    wordSeparation: "단어 분리",
    autoAddSpaces: "자동 공백 추가",
    hz: "Hz",
    seconds: "초",
    db: "dB",
    multiplier: "배수",
    presets: {
      fastMorse: "빠른 모스",
      standard: "표준",
      slowMorse: "느린 모스"
    },
    labels: {
      noiseFloorDb: "노이즈 플로어 (dB)",
      charSeparationMultiplier: "문자 분리 배수",
      wordSeparationMultiplier: "단어 분리 배수"
    }
  },
  
  results: {
    title: "분석 결과",
    detectedMorse: "감지된 모스 부호",
    decodedText: "디코딩된 텍스트",
    confidence: "신뢰도",
    noResults: "오디오 파일에서 모스 부호가 감지되지 않았습니다",
    tryAdjusting: "더 나은 결과를 위해 분석 설정을 조정해 보세요",
    copyMorse: "모스 부호 복사",
    downloadMorse: "모스 부호 다운로드",
    copyText: "디코딩된 텍스트 복사", 
    downloadText: "디코딩된 텍스트 다운로드",
    copiedToClipboard: "클립보드에 복사되었습니다!",
    segments: "신호 세그먼트"
  },
  
  instructions: {
    title: "오디오 모스 부호 디코더 사용법",
    step1: {
      title: "오디오 파일 업로드",
      description: "모스 부호 신호가 포함된 오디오 파일을 선택하세요. MP3, WAV, M4A, AAC, OGG 등의 형식을 지원합니다."
    },
    step2: {
      title: "설정 조정 (선택사항)",
      description: "오디오 특성에 따라 분석 매개변수를 미세 조정하세요. 주파수 범위와 타이밍 임계값은 감지 정확도에 크게 영향을 줄 수 있습니다."
    },
    step3: {
      title: "자동 처리", 
      description: "시스템이 고급 신호 처리를 사용하여 자동으로 오디오를 분석하고 모스 부호 패턴을 감지하여 텍스트로 변환합니다."
    },
    step4: {
      title: "결과 검토",
      description: "감지된 모스 부호와 디코딩된 텍스트를 검토하세요. 신뢰도 점수를 사용하여 감지 정확도를 평가하세요."
    },
    tips: {
      title: "더 나은 결과를 위한 팁:",
      tip1: "명확한 신호 대 잡음비를 가진 고품질 녹음 사용",
      tip2: "녹음 전체에서 일관된 주파수 보장",
      tip3: "배경 소음과 간섭 최소화",
      tip4: "신호 특성에 맞게 주파수 범위 조정",
      tip5: "다양한 전송 속도에 맞게 타이밍 임계값 미세 조정"
    }
  },
  
  errors: {
    fileTooBig: "파일 크기가 50MB 제한을 초과했습니다",
    unsupportedFormat: "지원되지 않는 오디오 형식입니다",
    processingError: "오디오 파일 처리 중 오류 발생",
    analysisError: "오디오 신호 분석 중 오류 발생",
    uploadError: "파일 업로드 중 오류 발생"
  }
};