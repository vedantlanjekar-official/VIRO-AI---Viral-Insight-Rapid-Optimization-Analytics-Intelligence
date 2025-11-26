// File validation utilities

export const ALLOWED_FILE_TYPES = {
  csv: '.csv',
  fasta: '.fasta',
  json: '.json',
  txt: '.txt',
};

export const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

export const validateFile = (file) => {
  const errors = [];

  // Check if file exists
  if (!file) {
    errors.push('No file provided');
    return { valid: false, errors };
  }

  // Check file size
  if (file.size > MAX_FILE_SIZE) {
    errors.push(`File size exceeds maximum of ${MAX_FILE_SIZE / (1024 * 1024)}MB`);
  }

  // Check file type
  const fileExt = '.' + file.name.split('.').pop().toLowerCase();
  const allowedExtensions = Object.values(ALLOWED_FILE_TYPES);
  
  if (!allowedExtensions.includes(fileExt)) {
    errors.push(`Invalid file type. Allowed types: ${allowedExtensions.join(', ')}`);
  }

  // Check file name
  if (file.name.length > 255) {
    errors.push('File name too long (max 255 characters)');
  }

  return {
    valid: errors.length === 0,
    errors,
    fileInfo: {
      name: file.name,
      size: file.size,
      type: file.type,
      extension: fileExt,
    },
  };
};

export const parseFileContent = async (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      try {
        const content = event.target.result;
        const fileExt = '.' + file.name.split('.').pop().toLowerCase();

        let parsedData = null;

        switch (fileExt) {
          case '.json':
            parsedData = JSON.parse(content);
            break;
          case '.csv':
            parsedData = parseCSV(content);
            break;
          case '.fasta':
            parsedData = parseFASTA(content);
            break;
          case '.txt':
            parsedData = { text: content };
            break;
          default:
            parsedData = { raw: content };
        }

        resolve({
          success: true,
          data: parsedData,
          fileInfo: {
            name: file.name,
            size: file.size,
            type: file.type,
          },
        });
      } catch (error) {
        reject({
          success: false,
          error: `Failed to parse file: ${error.message}`,
        });
      }
    };

    reader.onerror = () => {
      reject({
        success: false,
        error: 'Failed to read file',
      });
    };

    reader.readAsText(file);
  });
};

// Simple CSV parser
const parseCSV = (content) => {
  const lines = content.trim().split('\n');
  const headers = lines[0].split(',').map(h => h.trim());
  
  const data = lines.slice(1).map(line => {
    const values = line.split(',').map(v => v.trim());
    const row = {};
    headers.forEach((header, index) => {
      row[header] = values[index];
    });
    return row;
  });

  return { headers, data, rowCount: data.length };
};

// Simple FASTA parser
const parseFASTA = (content) => {
  const sequences = [];
  const lines = content.trim().split('\n');
  
  let currentSeq = null;

  for (const line of lines) {
    if (line.startsWith('>')) {
      if (currentSeq) {
        sequences.push(currentSeq);
      }
      currentSeq = {
        header: line.substring(1).trim(),
        sequence: '',
      };
    } else if (currentSeq) {
      currentSeq.sequence += line.trim();
    }
  }

  if (currentSeq) {
    sequences.push(currentSeq);
  }

  return { sequences, count: sequences.length };
};

export const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
};


