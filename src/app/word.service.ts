import { Injectable } from '@angular/core';

@Injectable()
export class WordService {

  dictionary;
  sampleTexts=[];
  categories = {
    spam: 0,
    noSpam: 0
  };
  constructor() {
    this.dictionary = [];
    let texts=[
      ['Viagra a buen precio','spam'],
      ['Quedamos mañana lunes para ir al cine', 'spam'],
      ['Replicas de relojes y viagra a precios de risa', 'noSpam'],
      ['Disponga de sus productos farmaceuticos en 24 horas', 'spam'],
      ['La inteligencia artificial es una disciplina muy interesante', 'noSpam']
    ];
    texts.forEach(v => {
      if(v[1]==='spam') {
        this.spam(v[0]);
      }else {
        this.noSpam(v[0]);
      }
    });
    console.log(this.dictionary);
  }
  static getWords(text:string) {
    return text.split(' ').filter(value => value.length>2);
  }
  noSpam(phrase: string) {
    this.categories.noSpam++;
    this.sampleTexts.push([phrase,'noSpam']);
    WordService.getWords(phrase).forEach(word => {
      let found = this.dictionary.find(value => value.word.toLowerCase() === word.toLowerCase());
      if(found) {
        found.clasifications.noSpam++;
      }else {
        found = new Word(word);
        found.clasifications.noSpam++;
        this.dictionary.push(found);
      }
    });

  }

  spam(phrase: string) {
    this.categories.spam++;
    this.sampleTexts.push([phrase,'spam']);
    WordService.getWords(phrase).forEach(word => {
      let found = this.dictionary.find(value => value.word.toLowerCase() === word.toLowerCase());
      if(found) {
        found.clasifications.spam++;
      }else {
        found = new Word(word);
        found.clasifications.spam++;
        this.dictionary.push(found);
      }
    });
  }
  findWord(word:string) {
    return this.dictionary.find(w => w.word.toLowerCase()===word.toLowerCase());
  }
  guess(phrase: string) {
    let category;
    let probability=0;
    for(let cat in this.categories) {
      const categoryProbability =this.categories[cat]/this.sampleTexts.length;
      const words = WordService.getWords(phrase);
      let totalProbability = categoryProbability;
      for(let word of words) {
        const found = this.findWord(word);
        if(found) {
          const wordProbability = found.clasifications[cat]/this.dictionary.length;
          const conditionProbability = wordProbability/categoryProbability;
          totalProbability *=(conditionProbability * wordProbability) / categoryProbability;
        }
        if (probability<totalProbability) {
          category = cat;
          probability = categoryProbability;
        }
      }
    }
    return {category, probability };
  }
}
class Word {
  word: string='';
  clasifications;
  constructor(word) {
    this.word = word;
    this.clasifications = {
      spam:0,
      noSpam:0
    };
  }
}
