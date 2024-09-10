import { Component, OnInit } from '@angular/core';
import { SurveyCreatorModel } from 'survey-creator-core';
import 'survey-core/survey.i18n.js';
import 'survey-creator-core/survey-creator-core.i18n.js';
import 'survey-core/defaultV2.css';
import 'survey-creator-core/survey-creator-core.css';
import { Model } from 'survey-core';
import { QuillComponent } from '../quill/quill.component';
import 'quill/dist/quill.snow.css';
import 'quill/dist/quill.bubble.css';

function applyHtml(_:any, options:any) {
  let str = options.text;
  if (str.indexOf('<p>') === 0) {
    str = str.substring(3);
    str = str.substring(0, str.length - 4);
  }
  options.html = str;
}

@Component({
  selector: 'app-creator',
  templateUrl: './creator.component.html',
  styleUrls: ['./creator.component.scss'],
})
export class CreatorComponent implements OnInit {
  static declaration = [QuillComponent];
  surveyCreatorModel!: SurveyCreatorModel;
  surveyModel!: Model;

  ngOnInit() {
    const creator = new SurveyCreatorModel({
      showLogicTab: true,
      isAutoSave: false,
    });

    // Spostare il tipo di domanda Quill nella prima posizione della toolbox
    const toolboxItems = creator.toolbox.items;
    const quillIndex = toolboxItems.findIndex((item) => item.name === 'quill');
    if (quillIndex !== -1) {
      const quillItem = toolboxItems.splice(quillIndex, 1)[0];
      quillItem.title = 'Rich Text Editor';
      quillItem.iconName = 'icon-comment';
      toolboxItems.unshift(quillItem);
    }

    // Applicare markup HTML al contenuto del sondaggio
    creator.survey.onTextMarkdown.add(applyHtml);
    creator.onSurveyInstanceCreated.add((_, options) => {
      if (options.area === 'designer-tab' || options.area === 'preview-tab') {
        options.survey.onTextMarkdown.add(applyHtml);
      }
    });

   

    this.surveyCreatorModel = creator;

    creator.saveSurveyFunc = (saveNo: number, callback: Function) => {
      window.localStorage.setItem('survey-json', creator.text);
      const survey = new Model(creator.text);
      this.surveyModel = survey;
      callback(saveNo, true);
    };
  }
}
