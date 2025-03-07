export function generatePDFContent(file: FileItem): string {
  return `%PDF-1.4
1 0 obj
<< /Type /Catalog
/Pages 2 0 R
>>
endobj
2 0 obj
<< /Type /Pages
/Kids [3 0 R]
/Count 1
>>
endobj
3 0 obj
<< /Type /Page
/Parent 2 0 R
/Resources << /Font << /F1 4 0 R >> >>
/MediaBox [0 0 612 792]
/Contents 5 0 R
>>
endobj
4 0 obj
<< /Type /Font
/Subtype /Type1
/BaseFont /Helvetica
>>
endobj
5 0 obj
<< /Length 68 >>
stream
BT
/F1 24 Tf
72 720 Td
(${file.name}) Tj
/F1 12 Tf
0 -20 Td
(Generated at: ${new Date().toLocaleString()}) Tj
0 -20 Td
(Type: ${file.type}) Tj
ET
endstream
endobj
xref
0 6
0000000000 65535 f
0000000009 00000 n
0000000058 00000 n
0000000115 00000 n
0000000217 00000 n
0000000285 00000 n
trailer
<< /Size 6
/Root 1 0 R
>>
startxref
406
%%EOF`;
}
