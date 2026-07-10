# IsraelTec — Site Portfólio

Site estático (HTML + CSS + JS puro, sem build) que replica o layout da referência
`Zumba.png` com o conteúdo e a identidade do Israel Souza.

## Estrutura

```
site/
  index.html            página única com todas as seções
  assets/css/style.css  estilos (paleta magenta + verde-neon + escuro)
  assets/js/main.js     carrossel automático das telas dos projetos
  assets/img/           fotos recortadas (fundo transparente) e prints otimizados
```

## Rodar localmente

```bash
cd site
python -m http.server 4173
# abra http://localhost:4173
```

## Publicar no GitHub + Vercel

1. Copie o conteúdo da pasta `site/` para o repositório
   `https://github.com/israelcruzeiro-boop/israeltec` (pode ser na raiz).
2. Faça commit e push:
   ```bash
   git add .
   git commit -m "Site portfólio IsraelTec"
   git push
   ```
3. Na [Vercel](https://vercel.com), importe o repositório `israeltec`.
   Framework: **Other** (site estático). Nenhuma configuração extra é necessária.

## Contatos configurados no site

- WhatsApp: (61) 99659-3376 → links `wa.me/5561996593376`
- E-mail: israel.souza@ent.app.br
- Instagram: @israelcmadf
- GitHub: israelcruzeiro-boop/israeltec
