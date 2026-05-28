(function () {
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));

  const supportedLanguages = {
    en: "English",
    zh: "中文",
    es: "Español",
    fr: "Français",
    de: "Deutsch",
    ja: "日本語",
    ko: "한국어",
    pt: "Português",
    ru: "Русский",
    ar: "العربية"
  };

  const translations = {
    en: {
      navTools: "Tools", navPrivacy: "Privacy", navHelp: "Help", eyebrow: "Free browser-based PDF tools",
      heroTitle: "Everyday PDF work, ready in one click.", heroText: "Merge, split, rotate, remove pages, watermark and convert files directly in your browser. No registration required.",
      startTool: "Start with Merge PDF", imageTool: "JPG to PDF", readyOutput: "Ready file", adLabel: "Advertisement",
      popularTools: "Popular tools", toolsTitle: "Choose a PDF tool", filterAll: "All", filterOrganize: "Organize", filterConvert: "Convert", filterEdit: "Edit",
      privacyTitle: "Privacy first", privacyText: "Most tools run locally in your browser with client-side JavaScript. Your selected files are not uploaded to a VagaPDF server by this static website.",
      helpTitle: "How it works", helpText: "Pick a tool, add your files, adjust options and download the result. For very large files, keep the tab open while the browser finishes processing.",
      footerText: "Free PDF tools for pdf.vagatools.com", chooseFiles: "Choose or drop files", dropHint: "Files stay in this browser tab", process: "Process", clear: "Clear", download: "Download result",
      pages: "Pages", pagesHint: "Examples: 1-3,5 or 2", angle: "Angle", watermarkText: "Watermark text", opacity: "Opacity", quality: "Image quality", working: "Working...", noFiles: "Please add files first.", done: "Done. Your download is ready.", error: "Something went wrong. Try a smaller file or refresh this page.", privacyNote: "No account, no upload queue. Processing happens in your browser when possible.", ad: "Advertisement"
    },
    zh: {
      navTools: "工具", navPrivacy: "隐私", navHelp: "帮助", eyebrow: "免费浏览器端 PDF 工具",
      heroTitle: "日常 PDF 处理，一点就能用。", heroText: "合并、拆分、旋转、删除页面、加水印和图片转换都在浏览器里完成，无需注册。",
      startTool: "从合并 PDF 开始", imageTool: "JPG 转 PDF", readyOutput: "文件已就绪", adLabel: "广告",
      popularTools: "常用工具", toolsTitle: "选择一个 PDF 工具", filterAll: "全部", filterOrganize: "整理", filterConvert: "转换", filterEdit: "编辑",
      privacyTitle: "隐私优先", privacyText: "大多数工具通过客户端 JavaScript 在浏览器本地运行。这个静态网站不会把你选择的文件上传到 VagaPDF 服务器。",
      helpTitle: "使用方式", helpText: "选择工具，添加文件，调整选项，然后下载结果。处理大文件时，请保持当前标签页打开直到完成。",
      footerText: "pdf.vagatools.com 免费 PDF 工具", chooseFiles: "选择或拖放文件", dropHint: "文件保留在当前浏览器标签页", process: "开始处理", clear: "清空", download: "下载结果",
      pages: "页码", pagesHint: "例如：1-3,5 或 2", angle: "角度", watermarkText: "水印文字", opacity: "透明度", quality: "图片质量", working: "处理中...", noFiles: "请先添加文件。", done: "完成，可以下载了。", error: "处理失败。请尝试较小文件或刷新页面。", privacyNote: "无需账户，也没有上传队列。支持的处理会在浏览器内完成。", ad: "广告"
    }
  };

  for (const lang of Object.keys(supportedLanguages)) {
    translations[lang] = Object.assign({}, translations.en, translations[lang] || {});
  }

  const toolText = {
    "merge-pdf": {
      icon: "combine", category: "organize", accept: "application/pdf", multiple: true,
      en: ["Merge PDF", "Combine multiple PDF files into one clean document.", "Arrange files by choosing them in the order you want."],
      zh: ["合并 PDF", "把多个 PDF 文件合成为一个整洁文档。", "按想要的顺序选择文件即可。"]
    },
    "split-pdf": {
      icon: "scissors", category: "organize", accept: "application/pdf", multiple: false,
      en: ["Split PDF", "Extract a page range into a new PDF file.", "Enter pages like 1-3,5."],
      zh: ["拆分 PDF", "按页码范围提取成新的 PDF 文件。", "输入类似 1-3,5 的页码。"]
    },
    "remove-pages": {
      icon: "trash-2", category: "organize", accept: "application/pdf", multiple: false,
      en: ["Remove Pages", "Delete selected pages from a PDF.", "Enter pages to remove, then download the cleaned file."],
      zh: ["删除页面", "从 PDF 中删除指定页面。", "输入要删除的页码后下载新文件。"]
    },
    "rotate-pdf": {
      icon: "rotate-cw", category: "organize", accept: "application/pdf", multiple: false,
      en: ["Rotate PDF", "Rotate every page by 90, 180 or 270 degrees.", "Useful for scanned documents and sideways pages."],
      zh: ["旋转 PDF", "将全部页面旋转 90、180 或 270 度。", "适合扫描件和方向错误的页面。"]
    },
    "watermark-pdf": {
      icon: "stamp", category: "edit", accept: "application/pdf", multiple: false,
      en: ["Watermark PDF", "Add a centered text watermark to every page.", "Set the text and opacity before processing."],
      zh: ["PDF 加水印", "给每一页添加居中的文字水印。", "可设置水印文字和透明度。"]
    },
    "jpg-to-pdf": {
      icon: "image-plus", category: "convert", accept: "image/jpeg,image/png,image/webp", multiple: true,
      en: ["JPG to PDF", "Convert images into a single PDF.", "Supports JPG, PNG and WebP images."],
      zh: ["JPG 转 PDF", "把图片转换为一个 PDF 文件。", "支持 JPG、PNG 和 WebP 图片。"]
    },
    "pdf-to-jpg": {
      icon: "file-image", category: "convert", accept: "application/pdf", multiple: false,
      en: ["PDF to JPG", "Render the first PDF page to a JPG image.", "Fast preview export for simple documents."],
      zh: ["PDF 转 JPG", "将 PDF 首页渲染为 JPG 图片。", "适合快速导出预览图。"]
    },
    "extract-pages": {
      icon: "copy-plus", category: "organize", accept: "application/pdf", multiple: false,
      en: ["Extract Pages", "Create a new PDF from selected pages.", "Works like split, with flexible page selections."],
      zh: ["提取页面", "用选中的页面生成新 PDF。", "支持灵活页码选择。"]
    }
  };

  let lang = detectLanguage();
  let activeFilter = "all";

  document.addEventListener("DOMContentLoaded", () => {
    buildLanguageSelect();
    applyLanguage();
    buildToolGrid();
    bindUi();
    route();
    initAds();
    if (window.lucide) window.lucide.createIcons();
  });

  window.addEventListener("hashchange", route);

  function detectLanguage() {
    const stored = localStorage.getItem("vagaPdfLang");
    if (stored && supportedLanguages[stored]) return stored;
    const browser = (navigator.language || "en").toLowerCase().split("-")[0];
    return supportedLanguages[browser] ? browser : "en";
  }

  function t(key) {
    return translations[lang][key] || translations.en[key] || key;
  }

  function toolLabel(id, index) {
    const entry = toolText[id];
    const localized = entry[lang] || entry.en;
    return localized[index];
  }

  function buildLanguageSelect() {
    const select = $("#languageSelect");
    select.innerHTML = Object.entries(supportedLanguages).map(([code, name]) => `<option value="${code}">${name}</option>`).join("");
    select.value = lang;
  }

  function applyLanguage() {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    $$("[data-i18n]").forEach((node) => {
      node.textContent = t(node.dataset.i18n);
    });
    document.title = lang === "zh" ? "VagaPDF - 免费在线 PDF 工具，PDF合并拆分转换" : "Free Online PDF Tools - Merge, Split, Rotate, Watermark PDF | VagaPDF";
    buildToolGrid();
    if (location.hash && location.hash !== "#home") route();
  }

  function bindUi() {
    $("#languageSelect").addEventListener("change", (event) => {
      lang = event.target.value;
      localStorage.setItem("vagaPdfLang", lang);
      applyLanguage();
    });

    $("#themeToggle").addEventListener("click", () => {
      document.documentElement.classList.toggle("dark");
      const icon = document.documentElement.classList.contains("dark") ? "moon" : "sun";
      $("#themeToggle").innerHTML = `<i data-lucide="${icon}"></i>`;
      if (window.lucide) window.lucide.createIcons();
    });

    $$(".filter").forEach((button) => {
      button.addEventListener("click", () => {
        activeFilter = button.dataset.filter;
        $$(".filter").forEach((item) => item.classList.toggle("active", item === button));
        buildToolGrid();
      });
    });
  }

  function buildToolGrid() {
    const grid = $("#toolGrid");
    if (!grid) return;
    const template = $("#toolCardTemplate");
    grid.innerHTML = "";
    Object.keys(toolText)
      .filter((id) => activeFilter === "all" || toolText[id].category === activeFilter)
      .forEach((id) => {
        const node = template.content.firstElementChild.cloneNode(true);
        node.href = `#${id}`;
        node.dataset.category = toolText[id].category;
        $("i", node).dataset.lucide = toolText[id].icon;
        $("strong", node).textContent = toolLabel(id, 0);
        $("small", node).textContent = toolLabel(id, 1);
        grid.appendChild(node);
      });
    if (window.lucide) window.lucide.createIcons();
  }

  function route() {
    const id = (location.hash || "#home").replace("#", "");
    $("#heroSection").classList.toggle("hidden", id !== "home");
    $("#topAd").classList.toggle("hidden", id !== "home");
    $("#seoContent").classList.toggle("hidden", id !== "home");
    $("#home").classList.toggle("hidden", id !== "home");
    $("#toolPage").classList.toggle("hidden", !toolText[id]);
    $("#privacy").classList.toggle("hidden", id !== "privacy");
    $("#help").classList.toggle("hidden", id !== "help");
    $$(".nav a").forEach((link) => link.classList.toggle("active", link.getAttribute("href") === `#${id}` || (toolText[id] && link.getAttribute("href") === "#home")));
    if (toolText[id]) renderTool(id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function renderTool(id) {
    const tool = toolText[id];
    const needsPages = ["split-pdf", "extract-pages", "remove-pages"].includes(id);
    const needsAngle = id === "rotate-pdf";
    const needsWatermark = id === "watermark-pdf";
    const needsQuality = id === "pdf-to-jpg";
    $("#toolPage").innerHTML = `
      <div class="tool-layout">
        <section class="tool-workspace">
          <div class="tool-header">
            <p class="eyebrow">${tool.category}</p>
            <h2>${toolLabel(id, 0)}</h2>
            <p>${toolLabel(id, 1)}</p>
          </div>
          <form id="toolForm">
            <label class="dropzone">
              <input id="fileInput" type="file" accept="${tool.accept}" ${tool.multiple ? "multiple" : ""}>
              <span>
                <i data-lucide="upload-cloud"></i>
                <strong>${t("chooseFiles")}</strong>
                <span>${t("dropHint")}</span>
              </span>
            </label>
            <div id="fileList" class="file-list"></div>
            <div class="options">
              ${needsPages ? optionField("pagesInput", t("pages"), t("pagesHint")) : ""}
              ${needsAngle ? selectField("angleInput", t("angle"), [["90", "90°"], ["180", "180°"], ["270", "270°"]]) : ""}
              ${needsWatermark ? optionField("watermarkInput", t("watermarkText"), "VagaPDF") + rangeField("opacityInput", t("opacity"), "0.25", "0.05", "0.8", "0.05") : ""}
              ${needsQuality ? rangeField("qualityInput", t("quality"), "0.9", "0.45", "1", "0.05") : ""}
            </div>
            <div class="hero-actions">
              <button class="tool-action" type="submit"><i data-lucide="play"></i>${t("process")}</button>
              <button class="secondary-action" id="clearFiles" type="button"><i data-lucide="x"></i>${t("clear")}</button>
            </div>
            <p id="result" class="result"></p>
          </form>
        </section>
        <aside class="side-panel">
          <strong>${toolLabel(id, 2)}</strong>
          <p>${t("privacyNote")}</p>
          <div class="side-ad">${t("ad")}</div>
        </aside>
      </div>
    `;
    bindToolForm(id);
    if (window.lucide) window.lucide.createIcons();
  }

  function optionField(id, label, placeholder) {
    return `<div class="option-group"><label for="${id}">${label}</label><input class="field" id="${id}" placeholder="${placeholder}"></div>`;
  }

  function selectField(id, label, options) {
    return `<div class="option-group"><label for="${id}">${label}</label><select id="${id}">${options.map(([value, text]) => `<option value="${value}">${text}</option>`).join("")}</select></div>`;
  }

  function rangeField(id, label, value, min, max, step) {
    return `<div class="option-group"><label for="${id}">${label}</label><input id="${id}" type="range" value="${value}" min="${min}" max="${max}" step="${step}"></div>`;
  }

  function bindToolForm(id) {
    const input = $("#fileInput");
    const list = $("#fileList");
    const form = $("#toolForm");
    const clear = $("#clearFiles");
    input.addEventListener("change", () => renderFileList(input.files, list));
    clear.addEventListener("click", () => {
      input.value = "";
      list.innerHTML = "";
      $("#result").textContent = "";
    });
    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      const files = Array.from(input.files || []);
      if (!files.length) return setResult(t("noFiles"));
      setResult(t("working"));
      try {
        const blob = await runTool(id, files);
        const ext = id === "pdf-to-jpg" ? "jpg" : "pdf";
        setDownload(blob, `${id}-vagapdf.${ext}`);
      } catch (error) {
        console.error(error);
        setResult(t("error"));
      }
    });
  }

  function renderFileList(files, list) {
    list.innerHTML = Array.from(files).map((file) => `
      <div class="file-row">
        <div><strong>${escapeHtml(file.name)}</strong><br><small>${formatBytes(file.size)}</small></div>
        <i data-lucide="file"></i>
      </div>
    `).join("");
    if (window.lucide) window.lucide.createIcons();
  }

  async function runTool(id, files) {
    if (!window.PDFLib) await waitFor(() => window.PDFLib);
    switch (id) {
      case "merge-pdf": return mergePdf(files);
      case "split-pdf":
      case "extract-pages": return extractPages(files[0], parsePages($("#pagesInput").value));
      case "remove-pages": return removePages(files[0], parsePages($("#pagesInput").value));
      case "rotate-pdf": return rotatePdf(files[0], Number($("#angleInput").value));
      case "watermark-pdf": return watermarkPdf(files[0], $("#watermarkInput").value || "VagaPDF", Number($("#opacityInput").value));
      case "jpg-to-pdf": return imagesToPdf(files);
      case "pdf-to-jpg": return pdfToJpg(files[0], Number($("#qualityInput").value));
      default: throw new Error("Unknown tool");
    }
  }

  async function mergePdf(files) {
    const out = await PDFLib.PDFDocument.create();
    for (const file of files) {
      const src = await PDFLib.PDFDocument.load(await file.arrayBuffer());
      const pages = await out.copyPages(src, src.getPageIndices());
      pages.forEach((page) => out.addPage(page));
    }
    return pdfBlob(out);
  }

  async function extractPages(file, pages) {
    const src = await PDFLib.PDFDocument.load(await file.arrayBuffer());
    const out = await PDFLib.PDFDocument.create();
    const indices = normalizePages(pages, src.getPageCount());
    const copied = await out.copyPages(src, indices);
    copied.forEach((page) => out.addPage(page));
    return pdfBlob(out);
  }

  async function removePages(file, pages) {
    const src = await PDFLib.PDFDocument.load(await file.arrayBuffer());
    const remove = new Set(normalizePages(pages, src.getPageCount()));
    const keep = src.getPageIndices().filter((index) => !remove.has(index));
    const out = await PDFLib.PDFDocument.create();
    const copied = await out.copyPages(src, keep);
    copied.forEach((page) => out.addPage(page));
    return pdfBlob(out);
  }

  async function rotatePdf(file, angle) {
    const doc = await PDFLib.PDFDocument.load(await file.arrayBuffer());
    doc.getPages().forEach((page) => {
      const current = page.getRotation().angle || 0;
      page.setRotation(PDFLib.degrees((current + angle) % 360));
    });
    return pdfBlob(doc);
  }

  async function watermarkPdf(file, text, opacity) {
    const doc = await PDFLib.PDFDocument.load(await file.arrayBuffer());
    const font = await doc.embedFont(PDFLib.StandardFonts.HelveticaBold);
    doc.getPages().forEach((page) => {
      const { width, height } = page.getSize();
      const size = Math.max(28, Math.min(width, height) / 10);
      page.drawText(text, {
        x: width * 0.18,
        y: height * 0.48,
        size,
        font,
        color: PDFLib.rgb(0.9, 0.12, 0.08),
        opacity,
        rotate: PDFLib.degrees(-28)
      });
    });
    return pdfBlob(doc);
  }

  async function imagesToPdf(files) {
    const doc = await PDFLib.PDFDocument.create();
    for (const file of files) {
      const bytes = await file.arrayBuffer();
      const image = file.type.includes("png") ? await doc.embedPng(bytes) : await doc.embedJpg(await imageToJpegBytes(file));
      const page = doc.addPage([image.width, image.height]);
      page.drawImage(image, { x: 0, y: 0, width: image.width, height: image.height });
    }
    return pdfBlob(doc);
  }

  async function pdfToJpg(file, quality) {
    await waitFor(() => globalThis.pdfjsLib);
    globalThis.pdfjsLib.GlobalWorkerOptions.workerSrc = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.10.38/pdf.worker.min.mjs";
    const pdf = await globalThis.pdfjsLib.getDocument({ data: new Uint8Array(await file.arrayBuffer()) }).promise;
    const page = await pdf.getPage(1);
    const viewport = page.getViewport({ scale: 2 });
    const canvas = document.createElement("canvas");
    canvas.width = viewport.width;
    canvas.height = viewport.height;
    await page.render({ canvasContext: canvas.getContext("2d"), viewport }).promise;
    return new Promise((resolve) => canvas.toBlob(resolve, "image/jpeg", quality));
  }

  async function imageToJpegBytes(file) {
    if (file.type === "image/jpeg") return file.arrayBuffer();
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.src = url;
    await img.decode();
    const canvas = document.createElement("canvas");
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    canvas.getContext("2d").drawImage(img, 0, 0);
    URL.revokeObjectURL(url);
    return new Promise((resolve) => canvas.toBlob((blob) => blob.arrayBuffer().then(resolve), "image/jpeg", 0.92));
  }

  function parsePages(value) {
    return String(value || "1").split(",").flatMap((part) => {
      const [start, end] = part.trim().split("-").map((number) => Number(number.trim()));
      if (!start) return [];
      if (!end) return [start];
      const length = Math.max(0, end - start + 1);
      return Array.from({ length }, (_, index) => start + index);
    });
  }

  function normalizePages(pages, total) {
    const unique = Array.from(new Set(pages.map((page) => page - 1).filter((index) => index >= 0 && index < total)));
    return unique.length ? unique : [0];
  }

  async function pdfBlob(doc) {
    const bytes = await doc.save();
    return new Blob([bytes], { type: "application/pdf" });
  }

  function setResult(text) {
    $("#result").textContent = text;
  }

  function setDownload(blob, filename) {
    const url = URL.createObjectURL(blob);
    $("#result").innerHTML = `${t("done")} <a download="${filename}" href="${url}">${t("download")}</a>`;
  }

  function formatBytes(bytes) {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
  }

  function escapeHtml(value) {
    return String(value).replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "\"": "&quot;", "'": "&#039;" }[char]));
  }

  function waitFor(check) {
    return new Promise((resolve, reject) => {
      const started = Date.now();
      const timer = setInterval(() => {
        if (check()) {
          clearInterval(timer);
          resolve();
        } else if (Date.now() - started > 10000) {
          clearInterval(timer);
          reject(new Error("Dependency timed out"));
        }
      }, 50);
    });
  }

  function initAds() {
    window.adsbygoogle = window.adsbygoogle || [];
  }
})();
