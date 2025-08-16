export const decodeImage = {
  title: "모스 부호 이미지 번역기 – 사진, 이미지 디코딩",
  description: "고급 OCR 기술을 사용하여 이미지에서 모스 부호를 디코딩하세요. 사진, 스캔된 문서, 시각적 신호에서 점과 대시를 즉시 추출합니다.",
  
  mainHeading: "모스 부호 이미지 디코더",
  subtitle: "고급 OCR 기술을 사용하여 사진과 이미지에서 모스 부호 추출",
  
  uploadSection: {
    title: "이미지 파일 업로드",
    dragAndDrop: "클릭하여 업로드하거나 끌어서 놓기",
    supportedFormats: "JPG, PNG, GIF, WebP 및 기타 이미지 형식 지원 (최대 10MB)",
    selectFile: "이미지 파일 선택",
    removeFile: "파일 제거",
    processing: "이미지 처리 중...",
    analyzing: "이미지 분석 중..."
  },
  
  imagePreview: {
    show: "이미지 미리보기 표시",
    hide: "이미지 미리보기 숨기기",
    togglePreview: "이미지 미리보기 전환"
  },
  
  processing: {
    status: "처리 상태",
    ocrProcessing: "OCR 처리 중...",
    extractingMorse: "모스 패턴 추출 중...",
    analyzingText: "텍스트 분석 중...",
    progress: "진행률"
  },
  
  results: {
    title: "추출 결과", 
    extractedMorse: "추출된 모스 부호",
    decodedText: "디코딩된 텍스트",
    rawOcrText: "원시 OCR 텍스트",
    showRawText: "원시 OCR 텍스트 표시",
    hideRawText: "원시 OCR 텍스트 숨기기",
    noResults: "이미지에서 모스 부호가 감지되지 않았습니다",
    tryDifferent: "다른 이미지를 시도하거나 이미지 품질을 조정해보세요",
    copyMorse: "모스 부호 복사",
    downloadMorse: "모스 부호 다운로드", 
    copyText: "디코딩된 텍스트 복사",
    downloadText: "디코딩된 텍스트 다운로드",
    downloadOptions: "다운로드 옵션",
    copiedToClipboard: "클립보드에 복사되었습니다!"
  },
  
  manualInput: {
    title: "수동 모스 부호 입력",
    description: "OCR이 올바르게 감지하지 못한 경우 모스 부호를 수동으로 입력할 수 있습니다:",
    placeholder: "모스 부호를 수동으로 입력하세요 (점과 대시)",
    showInput: "수동 입력 표시",
    hideInput: "수동 입력 숨기기",
    process: "수동 입력 처리"
  },
  
  aiAssistant: {
    title: "AI 어시스턴트 분석",
    description: "OCR이 놓칠 수 있는 모스 부호 패턴을 추출하기 위해 AI를 사용하세요:",
    analyze: "AI로 분석",
    analyzing: "AI가 이미지를 분석하고 있습니다...", 
    showOutput: "AI 분석 표시",
    hideOutput: "AI 분석 숨기기",
    error: "AI 분석이 실패했습니다. 나중에 다시 시도해주세요."
  },
  
  instructions: {
    title: "이미지 모스 부호 디코더 사용법",
    step1: {
      title: "이미지 업로드",
      description: "모스 부호 패턴이 포함된 선명한 이미지를 선택하세요. 고대비 이미지에서 최상의 결과를 얻을 수 있습니다."
    },
    step2: {
      title: "자동 OCR 처리",
      description: "시스템이 OCR 기술을 사용하여 자동으로 이미지를 스캔하고 텍스트 패턴을 감지합니다."
    },
    step3: {
      title: "모스 부호 추출", 
      description: "고급 알고리즘이 감지된 텍스트에서 모스 부호 패턴을 식별하고 추출합니다."
    },
    step4: {
      title: "결과 검토 및 다운로드",
      description: "추출된 모스 부호와 디코딩된 텍스트를 검토하세요. 결과를 다운로드하거나 클립보드에 복사할 수 있습니다."
    },
    tips: {
      title: "더 나은 결과를 위한 팁:",
      tip1: "명확한 점과 대시가 있는 고대비 이미지 사용",
      tip2: "사진에서 적절한 조명과 초점 보장",
      tip3: "과도하게 압축되거나 저해상도 이미지 피하기",
      tip4: "복잡하거나 불분명한 패턴에 대해 AI 어시스턴트 시도",
      tip5: "OCR 결과가 부정확한 경우 수동 입력 사용"
    }
  },
  
  errors: {
    fileTooBig: "파일 크기가 10MB 제한을 초과했습니다",
    unsupportedFormat: "지원되지 않는 이미지 형식입니다",
    processingError: "이미지 파일 처리 중 오류 발생",
    ocrError: "OCR 처리 실패",
    uploadError: "파일 업로드 중 오류 발생",
    aiError: "AI 분석 실패"
  }
};