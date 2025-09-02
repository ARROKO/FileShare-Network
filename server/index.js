import express from 'express';
import multer from 'multer';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 4001;

// Créer le dossier uploads
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// ✅ CORS CORRIGÉ - Autorise toutes les origins
app.use(cors({
  origin: true, // Autorise toutes les origins
  credentials: true
}));

app.use(express.json());

// Configuration Multer (inchangé)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + '-' + file.originalname);
  }
});

const upload = multer({ 
  storage,
  limits: { fileSize: 50 * 1024 * 1024 }
});

// Routes API (inchangées)
app.get('/api/files', (req, res) => {
  try {
    const files = fs.readdirSync(uploadsDir);
    const fileList = files.map(filename => {
      const filePath = path.join(uploadsDir, filename);
      const stats = fs.statSync(filePath);
      
      return {
        id: filename,
        name: filename.substring(filename.indexOf('-', filename.indexOf('-') + 1) + 1),
        originalName: filename,
        size: stats.size,
        uploadDate: stats.ctime,
        type: path.extname(filename).slice(1)
      };
    });
    
    res.json(fileList);
  } catch (error) {
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

app.post('/api/upload', upload.single('file'), (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: 'Aucun fichier fourni' });

    const fileInfo = {
      id: req.file.filename,
      name: req.file.originalname,
      originalName: req.file.filename,
      size: req.file.size,
      uploadDate: new Date(),
      type: path.extname(req.file.originalname).slice(1)
    };

    res.json({ message: 'Fichier uploadé avec succès', file: fileInfo });
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de l\'upload' });
  }
});

app.get('/api/download/:filename', (req, res) => {
  try {
    const filename = req.params.filename;
    const filePath = path.join(uploadsDir, filename);
    
    if (!fs.existsSync(filePath)) return res.status(404).json({ error: 'Fichier non trouvé' });

    const originalName = filename.substring(filename.indexOf('-', filename.indexOf('-') + 1) + 1);
    
    res.setHeader('Content-Disposition', `attachment; filename="${originalName}"`);
    res.download(filePath, originalName);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors du téléchargement' });
  }
});

app.delete('/api/files/:filename', (req, res) => {
  try {
    const filename = req.params.filename;
    const filePath = path.join(uploadsDir, filename);
    
    if (!fs.existsSync(filePath)) return res.status(404).json({ error: 'Fichier non trouvé' });

    fs.unlinkSync(filePath);
    res.json({ message: 'Fichier supprimé avec succès' });
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la suppression' });
  }
});

app.use('/uploads', express.static(uploadsDir));

// ✅ ÉCOUTE CORRIGÉE - sur toutes les interfaces
app.listen(PORT, '0.0.0.0', () => {
  console.log(`✅ Serveur fichiers démarré :`);
  console.log(`📍 Local:    http://localhost:${PORT}`);
  console.log(`🌐 Réseau:  http://172.16.1.15:${PORT} (Wi-Fi)`);
  console.log(`🌐 Réseau:  http://172.21.160.1:${PORT} (WSL)`);
  console.log('─'.repeat(50));
});