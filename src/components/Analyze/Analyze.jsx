import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { useLanguage } from '../LanguageContext/LanguageContext';

const HF_API_URL = 'https://mostafaelgendy-avir1.hf.space/predict';

// ============================================
// BACKEND API CONFIGURATION
// ============================================
const API_BASE = 'http://avir.runasp.net'; 
const USER_ID = 1;

const ENDPOINTS = {
  POST_IMAGE: `${API_BASE}/users/${USER_ID}/images`,
  GET_IMAGES: `${API_BASE}/users/${USER_ID}/images`,
  DELETE_IMAGE: (id) => `${API_BASE}/users/${USER_ID}/images/${id}`
};

const MedicalAnalysis = () => {
  const { lang } = useLanguage();
  const [labFile, setLabFile] = useState(null);
  const [scanFile, setScanFile] = useState(null);
  const [isDraggingLab, setIsDraggingLab] = useState(false);
  const [isDraggingScan, setIsDraggingScan] = useState(false);
  const [uploadProgress, setUploadProgress] = useState({ lab: 0, scan: 0 });
  const [isHoveringLab, setIsHoveringLab] = useState(false);
  const [isHoveringScan, setIsHoveringScan] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadResult, setUploadResult] = useState(null);
  const [error, setError] = useState(null);
  const [scanResult, setScanResult] = useState(null);
  const [isScanLoading, setIsScanLoading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(null);

  // States جديدة خاصة بالباك إند لإدارة الصور المرفوعة مسبقاً
  const [uploadedImages, setUploadedImages] = useState([]);
  const [isFetchImagesLoading, setIsFetchImagesLoading] = useState(false);

  const t = {
    en: {
      lab: {
        title: "Analyze Your Lab Tests",
        description: "Upload your medical test report (blood test, tumor markers, hormones, etc.) and get AI-based analysis of abnormal values.",
        dropText: "Drop your files here or click to browse",
        supports: "Supports PDF, JPG, PNG",
        button: "Analyze Lab Report",
        uploading: "Uploading...",
        success: "Lab report uploaded successfully!"
      },
      scan: {
        title: "Analyze Your Scan",
        description: "Upload your mammogram, ultrasound, or MRI image. The AI will highlight areas of concern and compare with benign/malignant samples.",
        dropText: "Drop your scan images here or click to browse",
        supports: "Supports JPG, PNG",
        button: "Analyze Scan Image",
        uploading: "Analyzing...",
        success: "Scan analyzed and saved successfully!",
        resultTitle: "Analysis Result",
        original: "Original Image",
        mask: "Segmentation Mask",
        label: "Diagnosis",
        malignant: "Malignant",
        benign: "Benign",
        historyTitle: "Your Uploaded Scans",
        deleteConfirm: "Are you sure you want to delete this image?"
      },
      common: {
        ready: "Ready",
        disclaimer: "Disclaimer:",
        disclaimerText: "This is not a medical diagnosis. Please consult your healthcare provider.",
        error: "Upload failed. Please try again.",
        corsError: "Connection error. The server may be waking up — please wait 30 seconds and try again."
      }
    },
    ar: {
      lab: {
        title: "تحليل نتائج المختبر",
        description: "ارفعي تقرير الفحص الطبي (تحليل الدم، ماركرات الورم، الهرمونات، إلخ) واحصلي على تحليل ذكي للقيم غير الطبيعية.",
        dropText: "أسقطي الملفات هنا أو انقري للتصفح",
        supports: "يدعم PDF, JPG, PNG",
        button: "تحليل تقرير المختبر",
        uploading: "جاري الرفع...",
        success: "تم رفع تقرير المختبر بنجاح!"
      },
      scan: {
        title: "تحليل الأشعة",
        description: "ارفعي صورة الماموجرام أو الأشعة فوق الصوتية أو الرنين المغناطيسي. سيسلط الذكاء الاصطناعي الضوء على مناطق القلق ويقارنها بعينات حميدة/خبيثة.",
        dropText: "أسقطي صور الأشعة هنا أو انقري للتصفح",
        supports: "يدعم JPG, PNG",
        button: "تحليل صورة الأشعة",
        uploading: "جاري التحليل...",
        success: "تم تحليل الأشعة وحفظها بنجاح!",
        resultTitle: "نتيجة التحليل",
        original: "الصورة الأصلية",
        mask: "خريطة التجزئة",
        label: "التشخيص",
        malignant: "خبيث",
        benign: "حميد",
        historyTitle: "الأشعة المرفوعة مسبقاً",
        deleteConfirm: "هل أنتِ متأكدة من حذف هذه الصورة؟"
      },
      common: {
        ready: "جاهز",
        disclaimer: "تنبيه:",
        disclaimerText: "هذا ليس تشخيصاً طبياً. يرجى استشارة مقدم الرعاية الصحية الخاص بك.",
        error: "فشل التحليل. يرجى المحاولة مرة أخرى.",
        corsError: "خطأ في الاتصال. السيرفر ممكن يكون نايم — استنى 30 ثانية وجرب تاني."
      }
    }
  }[lang];

  const labInputRef = useRef(null);
  const scanInputRef = useRef(null);
  const LAB_API_URL = 'https://avir1.runasp.net/api/Upload/user/125';

  // جلب الصور المرفوعة أول ما الصفحة تفتح
  useEffect(() => {
    fetchBackendImages();
  }, []);

  // ============================================
  // BACKEND API FUNCTIONS
  // ============================================

  // 1. GET /users/1/images
  const fetchBackendImages = async () => {
    setIsFetchImagesLoading(true);
    try {
      const response = await fetch(ENDPOINTS.GET_IMAGES);
      if (!response.ok) throw new Error(`HTTP error ${response.status}`);
      const data = await response.json();
      setUploadedImages(data || []);
    } catch (err) {
      console.error("Error fetching images from backend:", err);
    } finally {
      setIsFetchImagesLoading(false);
    }
  };

  // 2. DELETE /users/1/images/{id}
  const deleteBackendImage = async (id) => {
    if (!window.confirm(t.scan.deleteConfirm)) return;
    try {
      const response = await fetch(ENDPOINTS.DELETE_IMAGE(id), {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error(`HTTP error ${response.status}`);
      
      // تحديث الواجهة وحذف الصورة من الستيت فوراً بعد الحذف الناجح
      setUploadedImages(prev => prev.filter(img => img.id !== id));
    } catch (err) {
      console.error("Error deleting image:", err);
      setError(lang === 'ar' ? 'فشل حذف الصورة من السيرفر' : 'Failed to delete image from server');
    }
  };

  // 3. POST /users/1/images (يتم استدعاؤها تلقائياً داخل الـ uploadScan)
  const saveImageToBackend = async (fileToUpload) => {
    const backendFormData = new FormData();
    backendFormData.append('image', fileToUpload); 

    try {
      const response = await axios.post(ENDPOINTS.POST_IMAGE, backendFormData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      // إعادة تحديث قائمة الصور عشان تظهر الصورة الجديدة تحت
      fetchBackendImages();
      return response.data;
    } catch (err) {
      console.error("Failed to save image to backend:", err);
    }
  };


  // ============================================
  // FILE HANDLERS
  // ============================================
  const handleLabFileChange = (e) => {
    const file = e.target.files[0];
    if (file && (file.type === 'application/pdf' || file.type.startsWith('image/'))) {
      setLabFile(file);
      setUploadProgress(prev => ({ ...prev, lab: 100 }));
    }
  };

  const handleScanFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
      setPreviewUrl(URL.createObjectURL(file));
      setScanFile(file);
      setScanResult(null);
      setError(null);
      setUploadResult(null);
      setUploadProgress(prev => ({ ...prev, scan: 100 }));
    }
  };

  const handleLabDragOver = (e) => { e.preventDefault(); setIsDraggingLab(true); };
  const handleLabDragLeave = () => setIsDraggingLab(false);
  const handleLabDrop = (e) => {
    e.preventDefault(); setIsDraggingLab(false);
    const file = e.dataTransfer.files[0];
    if (file && (file.type === 'application/pdf' || file.type.startsWith('image/'))) {
      setLabFile(file);
      setUploadProgress(prev => ({ ...prev, lab: 100 }));
    }
  };

  const handleScanDragOver = (e) => { e.preventDefault(); setIsDraggingScan(true); };
  const handleScanDragLeave = () => setIsDraggingScan(false);
  const handleScanDrop = (e) => {
    e.preventDefault(); setIsDraggingScan(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
      setPreviewUrl(URL.createObjectURL(file));
      setScanFile(file);
      setScanResult(null);
      setError(null);
      setUploadResult(null);
      setUploadProgress(prev => ({ ...prev, scan: 100 }));
    }
  };

  const removeLabFile = () => { setLabFile(null); setUploadProgress(prev => ({ ...prev, lab: 0 })); setError(null); };
  const removeScanFile = () => {
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setPreviewUrl(null); setScanFile(null); setScanResult(null);
    setUploadProgress(prev => ({ ...prev, scan: 0 })); setError(null);
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = lang === 'ar' ? ['بايت', 'كيلوبايت', 'ميجابايت', 'جيجابايت'] : ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const uploadLab = async () => {
    if (!labFile) return;
    setIsUploading(true); setError(null); setUploadResult(null);
    const formData = new FormData();
    formData.append('file', labFile);
    formData.append('type', 'lab');
    try {
      const response = await axios.post(LAB_API_URL, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        onUploadProgress: (e) => {
          const pct = Math.round((e.loaded * 100) / e.total);
          setUploadProgress(prev => ({ ...prev, lab: pct }));
        },
      });
      setUploadResult({ success: true, data: response.data, message: t.lab.success });
    } catch (err) {
      setError(err.response?.data?.message || err.response?.data?.error || t.common.error);
    } finally {
      setIsUploading(false);
    }
  };

  // ============================================
  // CORE SCAN LOGIC (AI CORE + BACKEND SYNC)
  // ============================================
  const uploadScan = async () => {
    if (!scanFile) return;
    setIsScanLoading(true); setError(null); setScanResult(null); setUploadResult(null);

    const formData = new FormData();
    formData.append('image', scanFile);

    try {
      // 1. إرسال الصورة لموديل الـ AI على Hugging Face
      const response = await fetch(HF_API_URL, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw new Error(`Server error ${response.status}`);

      const contentType = response.headers.get('content-type') || '';

      // معالجة استجابة الـ AI
      if (contentType.includes('application/json')) {
        const data = await response.json();
        const label = data.label || data.prediction || data.class || 'Result';
        const maskUrl = data.mask_base64
          ? `data:image/png;base64,${data.mask_base64}`
          : data.mask_url || null;
        setScanResult({ label, maskUrl, originalUrl: previewUrl });

      } else if (contentType.includes('image/')) {
        const blob = await response.blob();
        const maskUrl = URL.createObjectURL(blob);
        setScanResult({ label: 'Result', maskUrl, originalUrl: previewUrl });

      } else {
        const text = await response.text();
        try {
          const data = JSON.parse(text);
          const label = data.label || data.prediction || 'Result';
          const maskUrl = data.mask_base64 ? `data:image/png;base64,${data.mask_base64}` : null;
          setScanResult({ label, maskUrl, originalUrl: previewUrl });
        } catch {
          throw new Error('Unexpected response format');
        }
      }

      // 2. حفظ الصورة بنجاح في الباك إند بعد استجابة الـ AI
      await saveImageToBackend(scanFile);

      setUploadResult({ success: true, message: t.scan.success });

    } catch (err) {
      console.error('❌ Scan Error:', err);
      if (err instanceof TypeError) {
        setError(t.common.corsError);
      } else {
        setError(err.message || t.common.error);
      }
    } finally {
      setIsScanLoading(false);
    }
  };

  // Icons Components
  const UploadIcon = () => (<svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" /></svg>);
  const ImageIcon = ({ className = "w-7 h-7 text-white" }) => (<svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>);
  const XIcon = () => (<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>);
  const CheckIcon = () => (<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>);
  const AlertIcon = () => (<svg className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>);
  const ScanIcon = () => (<svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>);
  const ArrowIcon = () => (<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8 font-sans mt-15 pt-20">
      <div className="max-w-2xl mx-auto space-y-8">

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-center gap-3">
            <AlertIcon />
            <p className="text-red-700 text-sm font-medium">{error}</p>
          </div>
        )}
        {uploadResult?.success && (
          <div className="bg-green-50 border border-green-200 rounded-xl p-4 flex items-center gap-3">
            <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center"><CheckIcon /></div>
            <p className="text-green-700 text-sm font-medium">{uploadResult.message}</p>
          </div>
        )}

        {/* Scan Card */}
        <div className="group bg-white rounded-3xl shadow-sm border border-gray-100 p-8 hover:shadow-2xl hover:shadow-pink-100/50 hover:-translate-y-1 transition-all duration-500 ease-out relative overflow-hidden"
          onMouseEnter={() => setIsHoveringScan(true)} onMouseLeave={() => setIsHoveringScan(false)}>
          <div className="relative flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center shadow-lg shadow-pink-200 group-hover:scale-110 transition-all duration-500"><ScanIcon /></div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-900 group-hover:text-pink-900 transition-colors duration-300">{t.scan.title}</h2>
              <div className={`h-0.5 bg-gradient-to-r from-pink-500 to-transparent mt-2 rounded-full transition-all duration-500 origin-left ${isHoveringScan ? 'w-full' : 'w-0'}`}></div>
            </div>
          </div>
          <p className="relative text-gray-500 text-sm mb-8 leading-relaxed">{t.scan.description}</p>
          {!scanFile ? (
            <div onClick={() => scanInputRef.current?.click()} onDragOver={handleScanDragOver} onDragLeave={handleScanDragLeave} onDrop={handleScanDrop}
              className={`relative border-2 border-dashed rounded-2xl p-10 text-center cursor-pointer transition-all duration-500 ${isDraggingScan ? 'border-pink-500 bg-pink-50' : 'border-gray-200 hover:border-pink-300 hover:bg-pink-50/30'}`}>
              <input ref={scanInputRef} type="file" accept="image/*" onChange={handleScanFileChange} className="hidden" />
              <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-pink-50 flex items-center justify-center"><ImageIcon className="w-10 h-10" /></div>
              <p className="text-gray-700 font-semibold mb-2">{t.scan.dropText}</p>
              <p className="text-gray-400 text-sm">{t.scan.supports}</p>
            </div>
          ) : (
            <div className="border-2 border-pink-200 rounded-2xl p-6 bg-gradient-to-br from-pink-50 to-white">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center shadow-lg shadow-pink-200"><ImageIcon /></div>
                  <div><p className="font-bold text-gray-900 text-sm truncate max-w-[200px]">{scanFile.name}</p><p className="text-gray-500 text-xs mt-1">{formatFileSize(scanFile.size)}</p></div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1 text-green-500 bg-green-50 px-3 py-1 rounded-full"><CheckIcon /><span className="text-xs font-semibold">{t.common.ready}</span></div>
                  <button onClick={removeScanFile} className="p-2 hover:bg-red-50 rounded-xl transition-all" disabled={isScanLoading}><XIcon /></button>
                </div>
              </div>
              {!scanResult && previewUrl && (
                <div className="relative overflow-hidden rounded-xl">
                  <img src={previewUrl} alt="Scan preview" className="w-full h-56 object-cover" />
                </div>
              )}
            </div>
          )}

          <button onClick={uploadScan} disabled={!scanFile || isScanLoading}
            className={`w-full mt-6 py-4 px-6 rounded-xl font-semibold text-sm transition-all duration-500 flex items-center justify-center gap-2 ${scanFile && !isScanLoading ? 'bg-gradient-to-r from-pink-500 to-rose-600 text-white shadow-lg shadow-pink-200 hover:-translate-y-0.5' : 'bg-gray-100 text-gray-400 cursor-not-allowed'}`}>
            {isScanLoading ? (<><div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div><span>{t.scan.uploading}</span></>) : (<><span>{t.scan.button}</span><ArrowIcon /></>)}
          </button>

          {scanResult && (
            <div className="mt-6 rounded-2xl border border-pink-100 overflow-hidden bg-gradient-to-br from-white to-pink-50">
              <div className="px-6 py-4 border-b border-pink-100 flex items-center justify-between">
                <h3 className="font-bold text-gray-900 text-base">{t.scan.resultTitle}</h3>
                <div className={`px-4 py-1.5 rounded-full text-sm font-bold ${scanResult.label === 'Malignant' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                  {scanResult.label === 'Malignant' ? t.scan.malignant : t.scan.benign}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-0">
                <div className="p-4 border-r border-pink-100">
                  <p className="text-xs font-semibold text-gray-500 mb-2 text-center uppercase tracking-wide">{t.scan.original}</p>
                  <div className="rounded-xl overflow-hidden bg-black"><img src={scanResult.originalUrl} alt="Original scan" className="w-full h-48 object-cover" /></div>
                </div>
                <div className="p-4">
                  <p className="text-xs font-semibold text-gray-500 mb-2 text-center uppercase tracking-wide">{t.scan.mask}</p>
                  <div className="rounded-xl overflow-hidden bg-black"><img src={scanResult.maskUrl} alt="Segmentation mask" className="w-full h-48 object-cover" /></div>
                </div>
              </div>
            </div>
          )}

          {/* ============================================
              [قسم عرض الصور المرفوعة مسبقاً من الباك إند]
             ============================================ */}
          {uploadedImages?.length > 0 && (
            <div className="mt-8 pt-6 border-t border-gray-100">
              <h3 className="text-lg font-bold text-gray-800 mb-4">{t.scan.historyTitle}</h3>
              <div className="grid grid-cols-3 gap-3">
                {uploadedImages.map((img) => (
                  <div key={img?.id} className="relative group/img rounded-xl overflow-hidden bg-gray-100 aspect-square border border-gray-200">
                    <img 
                      src={img?.filePath ? `${API_BASE}${img.filePath}` : ''} 
                      alt="Uploaded Medical Scan" 
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        if (img?.filePath) e.target.src = img.filePath;
                      }}
                    />
                    <button
                      onClick={() => deleteBackendImage(img?.id)}
                      className="absolute top-1.5 right-1.5 bg-red-500 text-white p-1.5 rounded-lg opacity-0 group-hover/img:opacity-100 transition-opacity duration-200 hover:bg-red-600 shadow-sm"
                    >
                      <XIcon />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="flex items-start gap-3 mt-6 p-4 bg-yellow-50 rounded-xl border border-yellow-100">
            <AlertIcon /><p className="text-xs text-gray-600 leading-relaxed"><span className="font-semibold text-yellow-700">{t.common.disclaimer}</span> {t.common.disclaimerText}</p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default MedicalAnalysis;