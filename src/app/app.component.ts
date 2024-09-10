import { Component, OnInit } from '@angular/core';
import { SurveyModule } from 'survey-angular-ui';
import { Model } from 'survey-core';
import 'survey-core/defaultV2.css';
import { CreatorComponent } from './creator/creator.component';

const surveyJson = {
  elements: [
    {
      name: 'FirstName',
      title: 'Enter your first name:',
      type: 'text',
    },
    {
      name: 'LastName',
      title: 'Enter your last name:',
      type: 'text',
    },
    {
      type: 'panel',
      name: 'Contacts',
      state: 'collapsed',
      title: 'Contacts (optional)',
      elements: [
        {
          type: 'text',
          name: 'Telegram',
          title: 'Telegram:',
        },
        {
          type: 'text',
          name: 'GitHub',
          title: 'GitHub username:',
        },
      ],
    },
  ],
};

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  
})
export class AppComponent implements OnInit {
  title = 'My First Survey';
  surveyModel!: Model;
  ngOnInit() {
    const survey = new Model(surveyJson);
    this.surveyModel = survey;
    // Add a PersonalDetails page to the model
    const page = survey.addNewPage('PersonalDetails');
    // Add a FirstName question to the page
    const firstName = page.addNewQuestion('text', 'FirstName');
  }
}
