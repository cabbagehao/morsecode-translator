export const decodeImage = {
  // Page metadata
  title: "모스 부호 이미지 디코더 – 이미지에서 모스 부호 추출",
  description: "OCR 기술을 사용하여 이미지에서 모스 부호를 즉시 디코딩하세요. 점-대시 패턴이 포함된 사진을 업로드하고 AI 기반 인식으로 읽기 쉬운 텍스트로 변환하세요.",
  
  // Main heading
  mainHeading: "이미지 모스 부호 디코더",
  pageTitle: "이미지 모스 부호 디코더",
  subtitle: "고급 OCR 기술을 사용하여 사진과 이미지에서 모스 부호를 추출하세요",
  
  // Upload section
  uploadSection: {
    title: "모스 부호가 포함된 이미지 업로드",
    dragAndDrop: "이미지를 여기에 끌어다 놓거나 클릭하여 검색",
    supportedFormats: "PNG, JPG, JPEG, GIF, BMP 및 기타 일반 이미지 형식 지원",
    selectFile: "이미지 파일 선택",
    processing: "처리 중...",
    analyzing: "이미지 분석 중...",
    removeFile: "파일 제거"
  },
  
  // Image preview
  imagePreview: {
    show: "미리보기 표시",
    hide: "미리보기 숨기기",
    togglePreview: "이미지 미리보기 전환",
    alt: "Image preview"
  },
  
  // Processing section
  processing: {
    status: "처리 상태",
    extractingMorse: "모스 부호 추출",
    preparingImage: "이미지 준비 중...",
    compressingImage: "더 나은 성능을 위해 이미지 압축 중...",
    performingOCR: "이미지에서 OCR 수행 중...",
    processingText: "인식된 텍스트 처리 중...",
    decodingMorse: "모스 부호 디코딩 중...",
    complete: "완료!",
    progress: "진행률",
    ocrProcessing: "OCR 처리 중...",
    analyzingText: "텍스트 분석 중...",
    
    // Processing stages
    stages: {
      initializing: "이미지 프로세서 초기화 중...",
      analyzingStructure: "이미지 구조 분석 중...",
      detectingPatterns: "텍스트 패턴 감지 중...",
      recognizingCharacters: "모스 문자 인식 중...",
      optimizingResults: "인식 결과 최적화 중...",
      finalizingExtraction: "텍스트 추출 완료 중...",
      processingComplete: "처리 완료!"
    }
  },
  
  // Manual input section
  manualInput: {
    title: "수동 모스 부호 입력",
    description: "OCR이 올바르게 감지하지 못한 경우 모스 부호를 수동으로 입력할 수 있습니다:",
    hideInput: "입력 숨기기",
    showInput: "수동 입력 표시",
    placeholder: "이미지에서 모스 부호를 입력하세요 (예: .... . .-.. .-.. ---)",
    helpText: "자동 인식이 잘 되지 않았다면, 이미지에서 보이는 모스 부호를 수동으로 입력할 수 있습니다.",
    tryManualInput: "수동 입력 시도",
    process: "수동 입력 처리",
    tipTitle: "팁",
    tipText: "점(.)과 대시(-)를 사용하고 글자 사이에는 공백, 단어 사이에는 \" / \"을 넣으세요",
    stillTrouble: "여전히 문제가 있나요? AI 기반 인식을 시도해보세요:",
    cantUseOcr: "OCR을 사용할 수 없나요? 수동 입력을 시도해보세요",
    manualInputAvailable: "수동 입력 사용 가능"
  },
  
  // Results section
  results: {
    title: "추출 결과",
    extractedMorse: "추출된 모스 부호",
    decodedText: "디코딩된 텍스트",
    rawOcrText: "원시 OCR 텍스트 (디버그)",
    showRawText: "원시 텍스트 표시",
    hideRawText: "원시 텍스트 숨기기",
    noResults: "이미지에서 모스 부호를 감지하지 못했습니다",
    tryDifferent: "다른 이미지를 사용하거나 이미지 품질을 조정해보세요",
    copyMorse: "모스 부호 복사",
    copyText: "디코딩된 텍스트 복사",
    copiedMorse: "복사됨!",
    copiedText: "복사됨!",
    copiedToClipboard: "클립보드에 복사됨!",
    downloadText: "다운로드",
    downloadOptions: "다운로드 옵션",
    downloadMorseCode: "모스 부호",
    downloadDecodedText: "디코딩된 텍스트",
    rawOcrOutputPlaceholder: "원시 OCR 출력이 여기에 나타납니다...",
    extractedMorseCodePlaceholder: "추출된 모스 부호가 여기에 나타납니다...",
    decodedTextPlaceholder: "디코딩된 텍스트가 여기에 나타납니다...",
    downloadDecodedTextFile: "디코딩된 텍스트 다운로드 (.txt)",
    downloadMorseCodeFile: "모스 부호 다운로드 (.txt)",
    recognitionNotAccurate: "인식이 정확하지 않나요?",
    helpImproveMessage: "이미지 소스와 형식에 대한 이메일을 통해 피드백을 보내 개선에 도움을 주세요.",
    sendFeedback: "피드백 보내기",
    
    // Simple text
    copied: "복사됨!"
  },
  
  // ChatGPT/AI section
  aiAssistant: {
    title: "AI 어시스턴트 분석",
    description: "OCR이 놓칠 수 있는 모스 부호 패턴을 추출하는 데 AI를 사용하세요:",
    analyze: "AI로 분석",
    analyzing: "AI가 이미지를 분석하고 있습니다...",
    processing: "ChatGPT-4로 처리 중...",
    tryDecode: "ChatGPT-4 디코딩 시도",
    result: "GPT-4 결과:",
    error: "AI 분석이 실패했습니다. 나중에 다시 시도해주세요.",
    showOutput: "AI 분석 표시",
    hideOutput: "AI 분석 숨기기",
    chatgptAnalysisResults: "ChatGPT-4 분석 결과",
    hideGptOutput: "GPT 출력 숨기기",
    chatgptProcessing: "ChatGPT-4 처리 중...",
    chatgptError: "ChatGPT-4 오류:"
  },
  
  // ChatGPT specific
  chatGPT: {
    error: "ChatGPT-4 오류:",
    failedToConnect: "ChatGPT-4 서비스에 연결하지 못했습니다. 나중에 다시 시도해주세요.",
    failedToDecode: "ChatGPT-4로 이미지 디코딩에 실패했습니다"
  },
  
  // Feedback section
  feedback: {
    subject: "모스 부호 이미지 인식에 대한 피드백",
    emailBody: `안녕하세요,

모스 부호 이미지 디코더를 사용하고 피드백을 제공하고 싶습니다:

원본 이미지: [업로드한 이미지를 설명해주세요]
예상 모스 부호: [모스 부호가 어떻게 나와야 하는지]
실제 OCR 결과: [시스템이 감지한 내용]
예상 디코딩된 텍스트: [텍스트가 어떻게 나와야 하는지]

추가 의견:

감사합니다!`
  },
  
  // Error messages
  errors: {
    invalidFileType: "이미지 파일을 업로드해주세요 (PNG, JPG, JPEG, GIF, BMP 등)",
    fileTooLarge: "파일 크기는 10MB 미만이어야 합니다. 큰 이미지는 더 빠른 처리를 위해 자동으로 압축됩니다.",
    fileTooBig: "파일 크기가 10MB 제한을 초과합니다",
    unsupportedFormat: "지원되지 않는 이미지 형식",
    processingError: "이미지 파일 처리 오류",
    ocrError: "OCR 처리 실패",
    uploadError: "파일 업로드 오류",
    aiError: "AI 분석 실패",
    imageCompressionFailed: "이미지 압축 실패",
    failedToLoadImage: "압축을 위한 이미지 로드 실패",
    ocrProcessingFailed: "OCR 처리 실패.",
    httpError: "HTTP 오류! 상태:",
    timeout: "처리 시간 초과. 수동 입력을 시도하거나 더 선명한 이미지를 사용하세요.",
    networkError: "OCR 엔진 로딩 네트워크 오류. 연결을 확인하거나 수동 입력을 사용하세요.",
    memoryError: "이미지 처리 실패. 다음을 시도해보세요:\n\n• 아래의 수동 입력 사용\n• 더 작은 이미지 파일 시도\n• 더 선명하고 대비가 좋은 이미지 사용",
    generalError: "다음을 시도해보세요:\n\n• 아래의 수동 입력\n• 다른 이미지\n• 사진의 더 나은 조명/대비",
    noMorseDetected: "모스 부호 패턴이 감지되지 않았습니다 - 수동 입력을 시도해보세요",
    ocrFailedManualAvailable: "OCR 실패 - 수동 입력 사용 가능",
    recognitionFailedMessage: "인식 실패. 아래의 수동 입력을 시도하거나 더 선명한 이미지를 사용하세요.",
    
    // Timeout and performance messages
    timeoutLongerForLarge: "• 큰 이미지의 경우 시간이 더 오래 걸릴 수 있습니다",
    compressionNote: "이미지가 {originalSize}MB에서 {compressedSize}MB로 압축되었습니다",
    compressionWarning: "큰 파일이 감지되었습니다 ({fileSize}MB) - 더 나은 OCR 성능을 위해 압축됩니다",
    
    // Alert messages
    timeoutMessage: "예상보다 처리 시간이 오래 걸렸습니다 (>{timeoutSeconds}s). 다음 해결책을 시도해보세요:\n\n• 아래의 수동 입력 사용 (권장)\n• 더 작거나 낮은 해상도의 이미지 시도\n• 모스 부호 영역에 초점을 맞춘 이미지 크롭\n• 좋은 대비 확보 (흰 배경에 검은 텍스트)",
    networkErrorMessage: "OCR 엔진 로딩 네트워크 오류. 연결을 확인하거나 수동 입력을 사용하세요.",
    imageProcessingFailed: "이미지 처리 실패. 다음을 시도해보세요:\n\n• 아래의 수동 입력 사용\n• 더 작은 이미지 파일 시도\n• JPEG 대신 PNG 형식 사용",
    unexpectedError: "예상치 못한 오류. 아래의 수동 입력을 시도해보세요."
  },
  
  // Instructions section
  instructions: {
    title: "이미지 모스 부호 디코더 사용법",
    step1: {
      title: "이미지 업로드",
      description: "모스 부호 패턴이 포함된 선명한 이미지를 선택하세요. 고대비 이미지로 최상의 결과를 얻을 수 있습니다."
    },
    step2: {
      title: "자동 OCR 처리",
      description: "시스템이 OCR 기술을 사용하여 자동으로 이미지를 스캔하고 텍스트 패턴을 감지합니다.",
      userAction: "\"모스 부호 추출\"을 클릭하여 OCR 기술로 이미지를 처리하세요"
    },
    step3: {
      title: "모스 부호 추출",
      description: "고급 알고리즘이 감지된 텍스트에서 모스 부호 패턴을 식별하고 추출합니다."
    },
    step4: {
      title: "검토 및 다운로드",
      description: "추출된 모스 부호와 디코딩된 텍스트를 검토하세요. 결과를 다운로드하거나 클립보드에 복사하세요.",
      userAction: "결과를 복사하거나 다운로드하여 사용하세요"
    },
    tips: {
      title: "더 나은 결과를 위한 팁:",
      tip1: "점과 대시가 선명한 고대비 이미지 사용",
      tip2: "사진에서 적절한 조명과 초점 확보",
      tip3: "과도하게 압축되거나 저해상도 이미지 피하기",
      tip4: "복잡하거나 불분명한 패턴에 대해 AI 어시스턴트 시도",
      tip5: "OCR 결과가 부정확한 경우 수동 입력 사용",
      manualInputHelp: "수동 입력 사용 가능: OCR이 실패하면 이미지를 보면서 모스 부호를 수동으로 입력할 수 있습니다"
    }
  },
  
  // File size formatting
  fileSize: {
    bytes: "바이트",
    kb: "KB",
    mb: "MB",
    gb: "GB"
  },
  
  // SEO content section
  seoContent: {
    title: "고급 모스 부호 이미지 인식",
    description: "모스 부호 패턴이 포함된 이미지를 업로드하고 고급 OCR 및 AI 기술을 사용하여 즉시 디코딩하세요. 역사적 문서, 교육 자료 및 연습 문제에 완벽합니다.",
    
    // Main sections
    revolutionary: {
      title: "혁신적인 이미지 모스 부호 번역기 - 고급 OCR 기술",
      description: "우리의 최첨단 사진 모스 부호 번역기는 광학 문자 인식 기술의 획기적인 발전을 대표하며, 디지털 이미지에서 모스 부호 패턴을 전례 없는 정확도로 추출하고 디코딩하도록 특별히 설계되었습니다.",
      capabilities: "역사적 전신 문서, 빈티지 군사 통신, 아마추어 무선 참고 자료 또는 교육 콘텐츠와 함께 작업하든, 우리의 최첨단 도구는 사진을 모스 부호로 정확하게 변환하고 이미지 내의 숨겨진 메시지를 즉시 디코딩할 수 있습니다.",
      comprehensive: "포괄적인 이미지 처리 기능:",
      
      imageTypes: {
        title: "이미지 유형 지원:",
        scannedDocuments: "스캔된 문서: 역사적 전신, 훈련 매뉴얼 및 참고 자료",
        photographs: "사진: 모스 부호 차트, 손으로 쓴 메모 및 디스플레이의 사진",
        screenshots: "스크린샷: 디지털 디스플레이, 소프트웨어 출력 및 온라인 콘텐츠",
        handwritten: "손으로 쓴 자료: 개인 메모, 연습 문제 및 학습 가이드",
        printed: "인쇄 자료: 책, 잡지, 포스터 및 교육 자료"
      },
      
      applications: {
        title: "전문 응용 분야:",
        historical: "역사 연구: 빈티지 전신 통신과 군사 아카이브 디지털화",
        educational: "교육 기관: 교과서 연습 문제와 시험 자료 처리",
        amateur: "아마추어 무선 커뮤니티: 인쇄된 참고 자료와 콘테스트 로그 변환",
        museum: "박물관 컬렉션: 해양 및 항공 통신 기록 보존",
        emergency: "응급 서비스: 훈련 자료 준비 및 문서화"
      }
    },
    
    professional: {
      title: "전문급 이미지 모스 부호 번역기 - 향상된 인식 엔진",
      description: "고급 기계 학습 알고리즘으로 구동되는 지능형 OCR 시스템으로 이미지에서 모스 부호를 추출하는 가장 정교한 솔루션을 경험하세요. 향상된 인식 엔진은 PNG, JPEG, GIF, TIFF 파일을 포함한 다양한 이미지 형식을 처리할 수 있으며, 시각적 모스 패턴을 업계 최고 수준의 정밀도로 정확한 읽기 가능한 텍스트로 자동 변환합니다.",
      capabilities: "시스템은 다양한 이미지 조건에서 최적의 결과를 보장하기 위해 이미지 전처리, 노이즈 제거, 문자 분할 및 패턴 매칭을 포함한 다단계 처리 기법을 사용합니다. 저해상도 역사적 사진부터 고화질 스캔 문서까지, 우리의 사진 모스 부호 디코더 도구는 소스 자료 품질에 관계없이 일관된 성능을 제공하도록 적응합니다.",
      
      features: {
        ocrTitle: "고급 OCR 기능",
        ocrItems: [
          "95% 이상의 정확도를 가진 지능형 문자 인식",
          "자동 점과 대시 구별 알고리즘",
          "단어 경계를 위한 스마트 간격 감지",
          "노이즈 필터링 및 이미지 향상",
          "다국어 OCR 엔진 지원",
          "실시간 처리 진행 상황 추적"
        ],
        
        optimizationTitle: "이미지 품질 최적화",
        optimizationItems: [
          "자동 대비 및 밝기 조정",
          "기울어진 이미지의 원근 보정",
          "배경 노이즈 제거 및 격리",
          "가장자리 감지 및 문자 경계 식별",
          "저품질 이미지의 해상도 향상",
          "색 공간 변환 및 그레이스케일 최적화"
        ],
        
        outputTitle: "출력 및 통합",
        outputItems: [
          "즉시 텍스트 변환 및 검증",
          "다중 내보내기 형식 (TXT, CSV, JSON)",
          "클립보드 복사 기능",
          "타임스탬프가 있는 다운로드 가능한 결과",
          "오류 감지 및 수정 제안",
          "에지 케이스를 위한 수동 입력 백업"
        ]
      }
    },
    
    instructions: {
      title: "이미지 모스 디코더 사용법",
      step1: "모스 부호 패턴(점과 대시)이 포함된 이미지 파일을 업로드하세요",
      step3: "추출된 모스 부호와 디코딩된 텍스트 번역을 확인하세요",
      
      tips: {
        title: "더 나은 결과를 위한 팁"
      },
      
      troubleshooting: {
        title: "OCR 문제 해결"
      }
    },
    
    features: {
      title: "인식 기능:",
      items: [
        "정확한 텍스트 인식을 위한 고급 OCR 기술",
        "향상된 탐지를 위한 AI 기반 ChatGPT-4 통합",
        "다양한 이미지 형식 지원 (PNG, JPG, GIF, BMP)",
        "최적 처리를 위한 자동 이미지 압축",
        "어려운 이미지를 위한 수동 입력 옵션",
        "진행 표시기가 있는 실시간 처리"
      ]
    },
    
    capabilities: {
      title: "처리 기능:",
      items: [
        "다양한 조명 조건과 이미지 품질 처리",
        "손으로 쓴 모스 부호와 인쇄된 모스 부호 인식",
        "역사적 문서와 사진 처리",
        "자동 압축으로 대용량 이미지 파일 지원",
        "대체 옵션이 있는 오류 처리",
        "문제 해결을 위한 원시 OCR 텍스트 디버깅"
      ]
    },
    
    useCases: {
      title: "사용 사례:",
      items: [
        "역사적 전신 문서 분석",
        "교육용 모스 부호 학습 자료",
        "아마추어 무선 연습 및 교육",
        "군사 및 응급 통신 아카이브",
        "박물관 및 도서관 문서 디지털화",
        "개인 취미 및 수집 프로젝트"
      ]
    },
    
    technology: {
      title: "기술:",
      description: "우리의 이미지 디코더는 강력한 OCR(광학 문자 인식)과 AI 향상 패턴 인식을 결합하여 사진, 스캔된 문서 및 디지털 이미지에서 모스 부호 패턴을 정확하게 식별합니다."
    }
  }
};