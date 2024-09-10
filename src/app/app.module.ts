import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { SurveyModule } from 'survey-angular-ui';
import { CreatorComponent } from './creator/creator.component';
import { FormsModule } from '@angular/forms';
import { QuillModule } from 'ngx-quill';
import { QuillComponent } from './quill/quill.component';
import { SurveyCreatorModule } from 'survey-creator-angular';
import { NgIf } from '@angular/common';
import Counter from './quill/counter';

@NgModule({
  declarations: [AppComponent, QuillComponent, CreatorComponent],
  imports: [
    BrowserModule,
    SurveyModule,
    FormsModule,
    SurveyCreatorModule,
    SurveyModule,
    NgIf,

    QuillModule.forRoot({
      modules: {
        toolbar: [
          [{ header: [1, 2, 3, false] }],
          ['bold', 'italic', 'underline', 'link'],
          [{ list: 'ordered' }, { list: 'bullet' }],
          ['clean'],
        ],                                                                                                                                                    

        counter: {
          container: '.counter',
          unit: 'char',
        },
      },
      customModules: [
        {
          implementation: Counter,
          path: 'modules/counter',
        },
      ],
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
