const fs = require('fs');
const path = require('path');

const distDir = path.join(__dirname, 'backend2', 'dist');

// Função para corrigir os imports
function fixImports(filePath) {
  if (fs.statSync(filePath).isDirectory()) {
    return; // Ignora diretórios
  }

  let content = fs.readFileSync(filePath, 'utf-8');
  
  // Adiciona .js nos imports que não possuem a extensão
  const updatedContent = content.replace(/(['"](?:\.\/|\.\.\/)[^'"]+)(?=['"])/g, (match) => {
    // Verifica se já possui a extensão .js
    if (!match.endsWith('.js')) {
      return match + '.js'; // Adiciona .js ao final
    }
    return match;
  });

  // Verifica se houve modificação
  if (updatedContent !== content) {
    fs.writeFileSync(filePath, updatedContent, 'utf-8');
    console.log(`Alterado em: ${filePath}`);
  } else {
    console.log(`Nenhuma alteração em: ${filePath}`);
  }
}

// Função recursiva para percorrer diretórios e arquivos
function processDirectory(dirPath) {
  const files = fs.readdirSync(dirPath);

  files.forEach((file) => {
    const filePath = path.join(dirPath, file);

    if (fs.statSync(filePath).isDirectory()) {
      // Se for um diretório, chama a função recursivamente
      processDirectory(filePath);
    } else if (file.endsWith('.js')) {
      // Se for um arquivo .js, faz a alteração
      fixImports(filePath);
    }
  });
}

// Começa a correção a partir do diretório dist
processDirectory(distDir);
