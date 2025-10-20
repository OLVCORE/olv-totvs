'use client';

import { useState, useRef } from 'react';
import { Upload, X, File, FileText, Image, Archive } from 'lucide-react';

interface FileUploadProps {
  onFilesChange: (files: File[]) => void;
  maxFiles?: number;
  maxSizePerFile?: number; // em MB
}

interface FileWithPreview extends File {
  id: string;
  preview?: string;
}

export function FileUpload({ onFilesChange, maxFiles = 5, maxSizePerFile = 10 }: FileUploadProps) {
  const [files, setFiles] = useState<FileWithPreview[]>([]);
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getFileIcon = (file: File) => {
    const type = file.type;
    if (type.startsWith('image/')) return <Image className="w-4 h-4" />;
    if (type.includes('pdf') || type.includes('document')) return <FileText className="w-4 h-4" />;
    if (type.includes('zip') || type.includes('rar')) return <Archive className="w-4 h-4" />;
    return <File className="w-4 h-4" />;
  };

  const handleFiles = (newFiles: FileList | File[]) => {
    const fileArray = Array.from(newFiles);
    const validFiles: FileWithPreview[] = [];
    
    fileArray.forEach((file) => {
      // Verificar tamanho
      if (file.size > maxSizePerFile * 1024 * 1024) {
        alert(`Arquivo ${file.name} é muito grande. Máximo permitido: ${maxSizePerFile}MB`);
        return;
      }

      // Verificar se já existe
      if (files.some(f => f.name === file.name && f.size === file.size)) {
        alert(`Arquivo ${file.name} já foi adicionado`);
        return;
      }

      // Verificar limite de arquivos
      if (files.length + validFiles.length >= maxFiles) {
        alert(`Máximo de ${maxFiles} arquivos permitidos`);
        return;
      }

      const fileWithId = Object.assign(file, {
        id: Math.random().toString(36).substr(2, 9),
      }) as FileWithPreview;

      // Criar preview para imagens
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          fileWithId.preview = e.target?.result as string;
        };
        reader.readAsDataURL(file);
      }

      validFiles.push(fileWithId);
    });

    const updatedFiles = [...files, ...validFiles];
    setFiles(updatedFiles);
    onFilesChange(updatedFiles);
  };

  const removeFile = (fileId: string) => {
    const updatedFiles = files.filter(f => f.id !== fileId);
    setFiles(updatedFiles);
    onFilesChange(updatedFiles);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const droppedFiles = e.dataTransfer.files;
    handleFiles(droppedFiles);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      handleFiles(e.target.files);
    }
  };

  return (
    <div className="space-y-4">
      {/* Área de Upload */}
      <div
        className={`
          relative border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300
          ${isDragOver 
            ? 'border-blue-500 bg-blue-500/10' 
            : 'border-slate-600 hover:border-blue-400 hover:bg-slate-800/30'
          }
        `}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          className="hidden"
          onChange={handleFileInput}
          accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt,.jpg,.jpeg,.png,.gif,.zip,.rar"
        />
        
        <div className="space-y-4">
          <div className="w-16 h-16 mx-auto bg-gradient-to-br from-blue-500 to-cyan-600 rounded-2xl flex items-center justify-center">
            <Upload className="w-8 h-8 text-white" />
          </div>
          
          <div>
            <h3 className="text-lg font-bold text-white mb-2">
              Envie seus arquivos
            </h3>
            <p className="text-slate-400 mb-4">
              Arraste e solte arquivos aqui ou clique para selecionar
            </p>
            <p className="text-xs text-slate-500">
              Máximo {maxFiles} arquivos • {maxSizePerFile}MB por arquivo
            </p>
          </div>
          
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="bg-gradient-to-r from-blue-500 to-cyan-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-glow transition-all duration-300 hover:scale-105"
          >
            Selecionar Arquivos
          </button>
        </div>
      </div>

      {/* Lista de Arquivos */}
      {files.length > 0 && (
        <div className="space-y-3">
          <h4 className="text-sm font-bold text-slate-300">
            Arquivos Selecionados ({files.length}/{maxFiles})
          </h4>
          
          <div className="space-y-2">
            {files.map((file) => (
              <div
                key={file.id}
                className="flex items-center gap-3 p-3 bg-slate-800/50 rounded-xl border border-slate-600"
              >
                <div className="w-10 h-10 bg-slate-700 rounded-lg flex items-center justify-center text-slate-300">
                  {getFileIcon(file)}
                </div>
                
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white truncate">
                    {file.name}
                  </p>
                  <p className="text-xs text-slate-400">
                    {formatFileSize(file.size)}
                  </p>
                </div>
                
                <button
                  type="button"
                  onClick={() => removeFile(file.id)}
                  className="w-8 h-8 bg-red-500/20 hover:bg-red-500/30 rounded-lg flex items-center justify-center text-red-400 hover:text-red-300 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
