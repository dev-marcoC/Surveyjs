import 'quill';

export interface Config {
  container: string;
  unit: 'word' | 'char';
}

export interface QuillInstance {
  on: any;
  getText: any;
  getSemanticHTML: any
}

export default class Counter {
  quill: QuillInstance;
  options: Config;

  constructor(quill: QuillInstance, options: Config) {
    debugger
    this.quill = quill;
    this.options = options;

    const container = document.querySelector(this.options.container);

    if (!container) {
      console.error("Container not found: ${this.options.container}");
      return;
    }
    this.quill.on('text-change', () => {
      const length = this.calculate();
      container.innerHTML = length + ' ' + this.options.unit + 's';
    });
  }

  removeHtmlTags(str:string) {
    // Crea un elemento div temporaneo
    var tempDiv = document.createElement('div');
    // Imposta il contenuto HTML dell'elemento div
    tempDiv.innerHTML = str;
    // Restituisce il testo puro (senza tag HTML)
    return tempDiv.textContent || tempDiv.innerText || '';
}
  calculate() {
    debugger
    // Ottieni il testo puro senza tag HTML
    const text = this.removeHtmlTags(this.quill.getText().trim());
    const prova = this.quill.getSemanticHTML()

    // Se l'opzione scelta è 'word', conta le parole
    if (this.options.unit === 'word') {
      return !text ? 0 : text.split(/\s+/).length;
    }

    // Conta i caratteri escludendo spazi
    return text.replace(/\s/g, '').length;
  }
}

