import { useState } from 'react';

interface UploadedFile {
    id: string;
    name: string;
    size: number;
    type: string;
    uploadedAt: Date;
    file: File;
}

interface FileUploadProps {
    trendId: string;
    trendTitle: string;
}

export default function FileUpload({ trendId, trendTitle }: FileUploadProps) {
    const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
    const [isDragging, setIsDragging] = useState(false);

    const handleFileSelect = (files: FileList | null) => {
        if (!files) return;

        const newFiles: UploadedFile[] = Array.from(files).map(file => ({
            id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
            name: file.name,
            size: file.size,
            type: file.type,
            uploadedAt: new Date(),
            file: file
        }));

        setUploadedFiles(prev => [...prev, ...newFiles]);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        handleFileSelect(e.dataTransfer.files);
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const removeFile = (id: string) => {
        setUploadedFiles(prev => prev.filter(f => f.id !== id));
    };

    const downloadFile = (uploadedFile: UploadedFile) => {
        const url = URL.createObjectURL(uploadedFile.file);
        const link = document.createElement('a');
        link.href = url;
        link.download = uploadedFile.name;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    };

    const formatFileSize = (bytes: number): string => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
    };

    const getFileIcon = (type: string): string => {
        if (type.includes('pdf')) return '📄';
        if (type.includes('word') || type.includes('doc')) return '📝';
        if (type.includes('excel') || type.includes('sheet')) return '📊';
        if (type.includes('powerpoint') || type.includes('presentation')) return '📑';
        if (type.includes('image')) return '🖼️';
        return '📎';
    };

    return (
        <div className="card-glass p-8 no-print">
            <h3 className="text-2xl font-bold text-white mb-4">📎 자료 업로드</h3>
            <p className="text-gray-400 mb-6 text-sm">
                관련 문서, 자료를 업로드하여 팀원들과 공유하세요
            </p>

            {/* Drop Zone */}
            <div
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                className={`border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300 mb-6 ${isDragging
                        ? 'border-primary bg-primary/10 scale-105'
                        : 'border-gray-600 hover:border-primary/50 hover:bg-white/5'
                    }`}
            >
                <div className="text-5xl mb-4">{isDragging ? '📥' : '📤'}</div>
                <p className="text-white font-semibold mb-2">
                    {isDragging ? '파일을 놓아주세요' : '파일을 드래그하거나 클릭하여 업로드'}
                </p>
                <p className="text-gray-400 text-sm mb-4">
                    PDF, DOC, DOCX, XLS, XLSX, PPT, PPTX, 이미지 파일 지원
                </p>
                <label className="inline-block">
                    <input
                        type="file"
                        multiple
                        accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.jpg,.jpeg,.png,.gif"
                        onChange={(e) => handleFileSelect(e.target.files)}
                        className="hidden"
                    />
                    <span className="bg-primary hover:bg-primary/80 text-white px-6 py-2 rounded-lg cursor-pointer transition-colors inline-block">
                        파일 선택
                    </span>
                </label>
            </div>

            {/* Uploaded Files List */}
            {uploadedFiles.length > 0 && (
                <div>
                    <h4 className="text-lg font-semibold text-white mb-4">
                        업로드된 파일 ({uploadedFiles.length})
                    </h4>
                    <div className="space-y-3">
                        {uploadedFiles.map((file) => (
                            <div
                                key={file.id}
                                className="bg-slate-800/50 rounded-lg p-4 flex items-center justify-between hover:bg-slate-700/50 transition-colors group"
                            >
                                <div className="flex items-center gap-3 flex-1 min-w-0">
                                    <span className="text-3xl flex-shrink-0">{getFileIcon(file.type)}</span>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-white font-medium truncate">{file.name}</p>
                                        <p className="text-gray-400 text-sm">
                                            {formatFileSize(file.size)} • {file.uploadedAt.toLocaleString()}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex gap-2 flex-shrink-0">
                                    <button
                                        onClick={() => downloadFile(file)}
                                        className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-colors text-sm"
                                        title="다운로드"
                                    >
                                        ⬇️ 다운로드
                                    </button>
                                    <button
                                        onClick={() => removeFile(file.id)}
                                        className="px-3 py-2 bg-red-600 hover:bg-red-500 text-white rounded-lg transition-colors text-sm"
                                        title="삭제"
                                    >
                                        ✕
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
