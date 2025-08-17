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
    },
    processing: {
      detectingSignalPatterns: "신호 패턴 감지 중...",
      calculatingOptimalParameters: "최적 매개변수 계산 중...",
      noClearSignalsDetected: "명확한 신호가 감지되지 않음 - 기본 설정 사용",
      analysisComplete: "분석 완료",
      preAnalysisFailed: "사전 분석 실패 - 기본 설정 사용"
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
    segments: "신호 세그먼트",
    dots: "점",
    dashes: "대시",
    total: "총계",
    spacesDetected: "감지된 공백",
    recognitionNotAccurate: "인식이 정확하지 않나요?",
    helpImproveMessage: "오디오 소스와 품질에 대한 이메일을 통해 피드백을 보내 개선에 도움을 주세요.",
    sendFeedback: "피드백 보내기"
  },
  
  instructions: {
    title: "오디오 모스 부호 디코더 사용법",
    steps: [
      {
        number: "1",
        text: "드래그 앤 드롭 또는 파일 선택을 사용하여 오디오 파일(MP3, WAV, M4A 지원)을 업로드하세요"
      },
      {
        number: "2",
        text: "녹음 특성에 맞게 주파수 범위와 타이밍 설정을 조정하세요"
      },
      {
        number: "3",
        text: "'모스 부호 분석'을 클릭하여 오디오를 처리하고 모스 패턴을 추출하세요"
      },
      {
        number: "4",
        text: "신뢰도 점수와 함께 감지된 모스 부호와 디코딩된 텍스트 결과를 검토하세요"
      }
    ],
    tips: {
      title: "더 나은 결과를 위한 팁:",
      tip1: "명확한 신호 대 잡음비를 가진 고품질 녹음 사용",
      tip2: "녹음 전체에서 일관된 주파수 보장",
      tip3: "배경 소음과 간섭 최소화",
      tip4: "신호 특성에 맞게 주파수 범위 조정",
      tip5: "다양한 전송 속도에 맞게 타이밍 임계값 미세 조정",
      tip6: "공백이 감지되지 않으면 \"자동 공백 추가\"를 활성화하거나 분리 배수를 조정하세요",
      tip7: "문자 분리 배수: 글자 간격을 제어합니다 (1.0-5.0)",
      tip8: "단어 분리 배수: 단어 간격을 제어합니다 (2.0-10.0)"
    },
    userActions: {
      clickAnalyzeMorseCode: "\"모스 부호 분석\"을 클릭하여 신호를 추출하고 디코딩하세요"
    }
  },
  
  errors: {
    fileTooBig: "파일 크기가 50MB 제한을 초과했습니다",
    unsupportedFormat: "지원되지 않는 오디오 형식입니다",
    processingError: "오디오 파일 처리 중 오류 발생",
    analysisError: "오디오 신호 분석 중 오류 발생",
    uploadError: "파일 업로드 중 오류 발생"
  },
  
  seoContent: {
    professionalTechnology: {
      title: "전문 오디오 기반 모스 부호 해독 기술",
      description: "당사의 고급 **모스 오디오 디코더** 시스템은 정교한 오디오 신호 처리 알고리즘을 활용하여 녹음된 오디오 파일에서 모스 부호 패턴을 자동으로 감지, 분석 및 디코딩합니다. 이 첨단 **모스 부호 해독** 기술은 오디오 신호를 읽을 수 있는 텍스트로 변환하여 아마추어 무선 운영자, 응급 통신 전문가 및 디지털 신호 처리 애호가에게 귀중한 도구가 됩니다.",
      mainTranslatorLink: "기본 텍스트 변환을 위해서는 <a href=\"/\" className=\"text-blue-600 dark:text-blue-400 hover:underline\">모스 부호 번역기</a>를 사용해보세요.",
      
      advancedProcessing: {
        title: "고급 오디오 처리:",
        items: [
          "실시간 주파수 분석 및 톤 감지",
          "적응형 노이즈 필터링 및 신호 향상",
          "가변 속도를 위한 자동 타이밍 보정",
          "다중 형식 오디오 파일 지원 (MP3, WAV, M4A)",
          "최적 정확도를 위한 동적 임계값 조정"
        ]
      },
      
      professionalUseCases: {
        title: "전문적 사용 사례:",
        items: [
          "응급 통신 분석 및 문서화",
          "아마추어 무선 콘테스트 녹음 전사",
          "역사적 오디오 아카이브 디지털화",
          "교육 자료 준비 및 평가",
          "해상 및 항공 통신 연구"
        ]
      },
      
      conclusion: "빈티지 무선 녹음을 해독하든, 응급 전송을 분석하든, 교육 자료를 처리하든, 당사의 오디오 기반 모스 부호 해독기는 전문적 응용 프로그램에 필요한 정확성과 신뢰성을 제공합니다."
    }
  },
  
  relatedTools: {
    title: "관련 모스 부호 오디오 도구",
    soundPlayer: {
      title: "🔊 모스 부호 사운드 플레이어",
      description: "정통 모스 부호 비프음과 오디오 효과를 경험하세요. SOS 신호를 듣고, 사운드 파일을 다운로드하고, 모스 부호가 어떻게 들리는지 배우세요.",
      linkText: "사운드 플레이어 사용 →"
    },
    mainTranslator: {
      title: "📱 메인 번역기",
      description: "오디오 재생 및 시각적 플래시 패턴이 포함된 메인 번역 도구로 텍스트를 모스 부호로 변환하거나 그 반대로 변환하세요.",
      linkText: "번역기로 이동 →"
    }
  }
};