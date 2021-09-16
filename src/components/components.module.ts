import {NgModule} from '@angular/core';
import {MainMenuComponent} from './main-menu/main-menu';
import {CommonModule} from "@angular/common";
import {HomeTaskComponent} from './home-task/home-task';
import {PipesModule} from "../pipes/pipes.module";
import {FormsModule} from "@angular/forms";
import {LessonComponent} from './lesson/lesson';
import {AdditionalComponent} from './additional/additional';
import {CourseComponent} from './course/course';
import {TrumbowygComponent} from './trumbowyg/trumbowyg';
import {ListComponent} from './list/list';
import {BuyCourseComponent} from './buy-course/buy-course';
import {MessageComponent} from './message/message';
import {CabinetMenuComponent} from './cabinet-menu/cabinet-menu';

@NgModule({
  declarations: [
    MainMenuComponent,
    HomeTaskComponent,
    LessonComponent,
    AdditionalComponent,
    CourseComponent,
    TrumbowygComponent,
    ListComponent,
    BuyCourseComponent,
    MessageComponent,
    CabinetMenuComponent,
  ],
  imports: [
    CommonModule,
    PipesModule,
    FormsModule
  ],
  exports: [
    MainMenuComponent,
    HomeTaskComponent,
    LessonComponent,
    AdditionalComponent,
    CourseComponent,
    TrumbowygComponent,
    ListComponent,
    BuyCourseComponent,
    MessageComponent,
    CabinetMenuComponent,
  ]
})
export class ComponentsModule {
}
