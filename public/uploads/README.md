# Pasta de uploads de arquivos

Esta pasta contém os arquivos enviados através do formulário de contato.

## Estrutura
- Arquivos são salvos com nomes únicos (timestamp + random)
- Máximo de 10MB por arquivo
- Tipos permitidos: PDF, DOC, DOCX, XLS, XLSX, PPT, PPTX, TXT, JPG, JPEG, PNG, GIF, ZIP, RAR

## Segurança
- Arquivos são validados antes do upload
- Nomes originais são preservados para referência
- Limpeza automática de arquivos antigos (implementar futuramente)

## Acesso
- Arquivos são servidos estaticamente via `/uploads/filename`
- Acesso restrito pode ser implementado no futuro
